import React, { useEffect, useCallback } from 'react';
import { useExperiment } from '../hooks/useExperiment';
import { Welcome } from './Welcome';
import { Instructions } from './Instructions';
import { Fixation } from './Fixation';
import { Stimulus } from './Stimulus';
import { Feedback } from './Feedback';
import { Results } from './Results';

interface ReactionTimeAppProps {
    onBackToMenu: () => void;
}

export const ReactionTimeApp: React.FC<ReactionTimeAppProps> = ({
    onBackToMenu,
}) => {
    const {
        state,
        startExperiment,
        startTest,
        startFixation,
        handleResponse,
        getPerformanceMetrics,
        resetExperiment,
    } = useExperiment();

    // Handle keyboard input
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (state.phase === 'stimulus' && state.showingStimulus) {
                handleResponse(event.key);
            }
        },
        [state.phase, state.showingStimulus, handleResponse]
    );

    // Set up keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Auto-start fixation when entering test phase
    useEffect(() => {
        if (state.phase === 'fixation' && !state.showingStimulus) {
            startFixation();
        }
    }, [state.phase, state.showingStimulus, startFixation]);

    const handleRestart = () => {
        resetExperiment();
    };

    const renderCurrentPhase = () => {
        switch (state.phase) {
            case 'welcome':
                return <Welcome onStart={startExperiment} />;

            case 'instructions':
                return <Instructions onContinue={startTest} />;

            case 'fixation':
                return <Fixation />;

            case 'stimulus':
                if (state.currentTrial < state.trialData.length) {
                    const currentTrial = state.trialData[state.currentTrial];
                    return (
                        <Stimulus
                            trial={currentTrial}
                            isFadingOut={state.isFadingOut || false}
                        />
                    );
                }
                return <Fixation />;

            case 'feedback':
                return (
                    <Feedback
                        message={state.feedbackMessage || ''}
                        isCorrect={state.feedbackMessage === 'Correct!'}
                    />
                );

            case 'results': {
                const metrics = getPerformanceMetrics();
                return (
                    <Results
                        metrics={metrics}
                        onRestart={handleRestart}
                        onBackToMenu={onBackToMenu}
                    />
                );
            }

            default:
                return <Welcome onStart={startExperiment} />;
        }
    };

    return <div className='reaction-time-app'>{renderCurrentPhase()}</div>;
};
