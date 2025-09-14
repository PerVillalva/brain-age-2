import { useState, useCallback } from 'react';
import type {
    StroopExperimentState,
    StroopTrialData,
    StroopPerformanceMetrics,
    StroopDifficulty,
} from '../types/experiment';
import { STROOP_CONFIG } from '../types/experiment';
import { StroopAgePredictionModel } from '../utils/stroopAgePrediction';

export const useStroopExperiment = () => {
    const [state, setState] = useState<StroopExperimentState>({
        phase: 'welcome',
        currentTrial: 0,
        trialData: [],
        showingStimulus: false,
    });

    // Color options for buttons
    const colorOptions = STROOP_CONFIG.colorChoices.map((color) => ({
        name: color === '#DAA520' ? 'yellow' : color,
        value: color,
    }));

    // Get current trial info
    const currentTrialInfo = state.trialData[state.currentTrial]?.stimulus;

    // Generate trial sequence based on difficulty
    const generateTrials = useCallback(
        (difficulty: StroopDifficulty): StroopTrialData[] => {
            const stimuli =
                difficulty === 'easy'
                    ? STROOP_CONFIG.easyStimuli
                    : STROOP_CONFIG.hardStimuli;
            const trials: StroopTrialData[] = stimuli.map((stimulus) => ({
                stimulus,
                timestamp: Date.now(),
            }));

            // Randomize order
            for (let i = trials.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [trials[i], trials[j]] = [trials[j], trials[i]];
            }

            return trials;
        },
        []
    );

    // Get random fixation duration
    const getRandomFixationDuration = useCallback(() => {
        const durations = STROOP_CONFIG.fixationDurations;
        return durations[Math.floor(Math.random() * durations.length)];
    }, []);

    // Start experiment
    const startExperiment = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: 'difficulty',
        }));
    }, []);

    // Set difficulty and generate trials
    const setDifficulty = useCallback(
        (difficulty: StroopDifficulty) => {
            const trials = generateTrials(difficulty);
            setState((prev) => ({
                ...prev,
                phase: 'instructions',
                difficulty,
                trialData: trials,
                experimentStartTime: Date.now(),
            }));
        },
        [generateTrials]
    );

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
        }));

        const duration = getRandomFixationDuration();
        setTimeout(() => {
            setState((prev) => ({
                ...prev,
                phase: 'stimulus',
                showingStimulus: true,
                stimulusStartTime: Date.now(),
            }));
        }, duration);
    }, [getRandomFixationDuration]);

    // Handle color selection during stimulus
    const handleResponse = useCallback(
        (colorIndex: number) => {
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
                colorIndex === currentTrialData.stimulus.correctResponse;

            const updatedTrial: StroopTrialData = {
                ...currentTrialData,
                response: colorIndex,
                reactionTime,
                correct,
                timestamp: Date.now(),
            };

            const updatedTrialData = [...state.trialData];
            updatedTrialData[state.currentTrial] = updatedTrial;

            setState((prev) => ({
                ...prev,
                trialData: updatedTrialData,
                showingStimulus: false,
            }));

            // Move to next trial or results
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
            }, 500); // Brief delay between trials
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
    const getPerformanceMetrics = useCallback((): StroopPerformanceMetrics => {
        const completedTrials = state.trialData.filter(
            (trial) => trial.response !== undefined
        );
        const correctTrials = completedTrials.filter(
            (trial) => trial.correct === true
        );
        const incorrectTrials = completedTrials.filter(
            (trial) => trial.correct === false
        );

        // Calculate overall metrics
        const accuracy =
            completedTrials.length > 0
                ? (correctTrials.length / completedTrials.length) * 100
                : 0;

        const meanReactionTime =
            correctTrials.length > 0
                ? Math.round(
                      correctTrials.reduce(
                          (sum, trial) => sum + (trial.reactionTime || 0),
                          0
                      ) / correctTrials.length
                  )
                : 0;

        // Calculate condition-specific metrics
        const congruentTrials = completedTrials.filter(
            (trial) =>
                trial.stimulus.condition === 'congruent' ||
                trial.stimulus.condition === 'word_congruent' ||
                trial.stimulus.condition === 'color_congruent'
        );
        const congruentCorrect = congruentTrials.filter(
            (trial) => trial.correct === true
        );
        const congruentAccuracy =
            congruentTrials.length > 0
                ? (congruentCorrect.length / congruentTrials.length) * 100
                : 0;
        const congruentMeanRT =
            congruentCorrect.length > 0
                ? Math.round(
                      congruentCorrect.reduce(
                          (sum, trial) => sum + (trial.reactionTime || 0),
                          0
                      ) / congruentCorrect.length
                  )
                : 0;

        const incongruentTrials = completedTrials.filter(
            (trial) =>
                trial.stimulus.condition === 'incongruent' ||
                trial.stimulus.condition === 'word_incongruent' ||
                trial.stimulus.condition === 'color_incongruent'
        );
        const incongruentCorrect = incongruentTrials.filter(
            (trial) => trial.correct === true
        );
        const incongruentAccuracy =
            incongruentTrials.length > 0
                ? (incongruentCorrect.length / incongruentTrials.length) * 100
                : 0;
        const incongruentMeanRT =
            incongruentCorrect.length > 0
                ? Math.round(
                      incongruentCorrect.reduce(
                          (sum, trial) => sum + (trial.reactionTime || 0),
                          0
                      ) / incongruentCorrect.length
                  )
                : 0;

        // Calculate Stroop effect (difference in RT between conditions)
        const stroopEffect = incongruentMeanRT - congruentMeanRT;

        // Calculate total time and age prediction
        const totalErrors = incorrectTrials.length;
        const totalTimeMs = completedTrials.reduce(
            (sum, trial) => sum + (trial.reactionTime || 0),
            0
        );
        const totalTimeSeconds = totalTimeMs / 1000;

        const ageModel = new StroopAgePredictionModel();
        const predictedAge = ageModel.predictAge(
            totalTimeSeconds,
            totalErrors,
            state.difficulty || 'easy'
        );

        return {
            accuracy,
            meanReactionTime,
            correctTrials: correctTrials.length,
            totalTrials: completedTrials.length,
            congruentAccuracy,
            incongruentAccuracy,
            congruentRT: congruentMeanRT,
            incongruentRT: incongruentMeanRT,
            stroopEffect,
            totalErrors,
            totalTimeSeconds,
            difficulty: state.difficulty || 'easy',
            predictedAge,
        };
    }, [state.trialData, state.difficulty]);

    // Reset experiment
    const resetExperiment = useCallback(() => {
        setState({
            phase: 'welcome',
            currentTrial: 0,
            trialData: [],
            showingStimulus: false,
        });
    }, []);

    return {
        state,
        currentTrialInfo,
        startExperiment,
        setDifficulty,
        startTest,
        startFixation,
        handleResponse,
        getPerformanceMetrics,
        resetExperiment,
        colorOptions,
    };
};
