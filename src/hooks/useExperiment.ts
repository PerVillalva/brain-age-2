import { useState, useCallback } from 'react';
import type { ExperimentState, TrialData } from '../types/experiment';
import { EXPERIMENT_CONFIG } from '../types/experiment';

export const useExperiment = () => {
    const [state, setState] = useState<ExperimentState>({
        phase: 'welcome',
        currentTrial: 0,
        trialData: [],
        showingStimulus: false,
    });

    // Generate trial sequence
    const generateTrials = useCallback((): TrialData[] => {
        const baseTrials: TrialData[] = [
            { stimulus: 'blue', correctResponse: 'f', timestamp: Date.now() },
            { stimulus: 'orange', correctResponse: 'j', timestamp: Date.now() },
        ];

        const trials: TrialData[] = [];
        for (let i = 0; i < EXPERIMENT_CONFIG.repetitions; i++) {
            trials.push(
                ...baseTrials.map((trial) => ({
                    ...trial,
                    timestamp: Date.now(),
                }))
            );
        }

        // Randomize order
        for (let i = trials.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [trials[i], trials[j]] = [trials[j], trials[i]];
        }

        return trials;
    }, []);

    // Get random fixation duration
    const getRandomFixationDuration = useCallback(() => {
        const durations = EXPERIMENT_CONFIG.fixationDurations;
        return durations[Math.floor(Math.random() * durations.length)];
    }, []);

    // Start experiment
    const startExperiment = useCallback(() => {
        const trials = generateTrials();
        setState((prev) => ({
            ...prev,
            phase: 'instructions',
            trialData: trials,
        }));
    }, [generateTrials]);

    // Start test phase
    const startTest = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: 'fixation',
            currentTrial: 0,
        }));
    }, []);

    // Start fixation
    const startFixation = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: 'fixation',
            feedbackMessage: undefined,
            isFadingOut: false,
        }));

        const duration = getRandomFixationDuration();
        setTimeout(() => {
            setState((prev) => ({
                ...prev,
                phase: 'stimulus',
                showingStimulus: true,
                stimulusStartTime: Date.now(),
            }));

            // Auto-advance if no response within timeout
            setTimeout(() => {
                setState((current) => {
                    if (
                        current.phase === 'stimulus' &&
                        current.showingStimulus
                    ) {
                        const currentTrialData =
                            current.trialData[current.currentTrial];
                        const updatedTrial: TrialData = {
                            ...currentTrialData,
                            response: undefined,
                            reactionTime: EXPERIMENT_CONFIG.stimulusTimeout,
                            correct: false,
                            timestamp: Date.now(),
                        };

                        const updatedTrialData = [...current.trialData];
                        updatedTrialData[current.currentTrial] = updatedTrial;

                        // Advance immediately after feedback for timeout
                        setTimeout(() => {
                            setState((prev) => {
                                if (
                                    prev.currentTrial <
                                    prev.trialData.length - 1
                                ) {
                                    return {
                                        ...prev,
                                        currentTrial: prev.currentTrial + 1,
                                        phase: 'fixation',
                                    };
                                } else {
                                    return { ...prev, phase: 'results' };
                                }
                            });
                        }, EXPERIMENT_CONFIG.feedbackDuration);

                        return {
                            ...current,
                            trialData: updatedTrialData,
                            phase: 'feedback',
                            showingStimulus: false,
                            feedbackMessage: 'Too slow!',
                            isFadingOut: true,
                        };
                    }
                    return current;
                });
            }, EXPERIMENT_CONFIG.stimulusTimeout);
        }, duration);
    }, [getRandomFixationDuration]);

    // Handle key press during stimulus
    const handleResponse = useCallback(
        (key: string) => {
            if (
                state.phase !== 'stimulus' ||
                !state.showingStimulus ||
                !state.stimulusStartTime
            ) {
                return;
            }

            const reactionTime = Date.now() - state.stimulusStartTime;
            const currentTrialData = state.trialData[state.currentTrial];
            const correct =
                key.toLowerCase() === currentTrialData.correctResponse;

            const updatedTrial: TrialData = {
                ...currentTrialData,
                response: key.toLowerCase(),
                reactionTime,
                correct,
                timestamp: Date.now(),
            };

            const updatedTrialData = [...state.trialData];
            updatedTrialData[state.currentTrial] = updatedTrial;

            // Start fade out and show feedback
            setState((prev) => ({
                ...prev,
                trialData: updatedTrialData,
                phase: 'feedback',
                showingStimulus: false,
                feedbackMessage: correct ? 'Correct!' : 'Incorrect!',
                isFadingOut: true,
            }));

            // Move to next trial after feedback
            setTimeout(() => {
                if (state.currentTrial < state.trialData.length - 1) {
                    setState((prev) => ({
                        ...prev,
                        currentTrial: prev.currentTrial + 1,
                        phase: 'fixation',
                    }));
                } else {
                    setState((prev) => ({ ...prev, phase: 'results' }));
                }
            }, EXPERIMENT_CONFIG.feedbackDuration + EXPERIMENT_CONFIG.postTrialGap);
        },
        [
            state.phase,
            state.showingStimulus,
            state.stimulusStartTime,
            state.currentTrial,
            state.trialData,
        ]
    );

    // Calculate performance metrics
    const getPerformanceMetrics = useCallback(() => {
        const completedTrials = state.trialData.filter(
            (trial) => trial.response !== undefined
        );
        const correctTrials = completedTrials.filter(
            (trial) => trial.correct === true
        );

        return {
            accuracy:
                completedTrials.length > 0
                    ? Math.round(
                          (correctTrials.length / completedTrials.length) * 100
                      )
                    : 0,
            meanReactionTime:
                correctTrials.length > 0
                    ? Math.round(
                          correctTrials.reduce(
                              (sum, trial) => sum + (trial.reactionTime || 0),
                              0
                          ) / correctTrials.length
                      )
                    : 0,
            correctTrials: correctTrials.length,
            totalTrials: completedTrials.length,
        };
    }, [state.trialData]);

    // Reset experiment
    const resetExperiment = useCallback(() => {
        setState({
            phase: 'welcome',
            currentTrial: 0,
            trialData: [],
            showingStimulus: false,
            feedbackMessage: undefined,
            isFadingOut: false,
        });
    }, []);

    return {
        state,
        startExperiment,
        startTest,
        startFixation,
        handleResponse,
        getPerformanceMetrics,
        resetExperiment,
    };
};
