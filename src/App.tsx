import { useEffect } from 'react';
import { useExperiment } from './hooks/useExperiment';
import { Welcome } from './components/Welcome';
import { Instructions } from './components/Instructions';
import { Fixation } from './components/Fixation';
import { Stimulus } from './components/Stimulus';
import { Results } from './components/Results';
import './App.css';

function App() {
    const {
        state,
        startExperiment,
        startTest,
        startFixation,
        handleResponse,
        getPerformanceMetrics,
        resetExperiment,
    } = useExperiment();

    // Handle keyboard input globally
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            // Only process F and J keys during stimulus phase
            if (state.phase === 'stimulus' && (key === 'f' || key === 'j')) {
                event.preventDefault();
                handleResponse(key);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [state.phase, handleResponse]);

    // Auto-start fixation when test phase begins
    useEffect(() => {
        if (state.phase === 'fixation') {
            startFixation();
        }
    }, [state.phase, state.currentTrial, startFixation]);

    const renderCurrentPhase = () => {
        switch (state.phase) {
            case 'welcome':
                return <Welcome onStart={startExperiment} />;

            case 'instructions':
                return <Instructions onContinue={startTest} />;

            case 'fixation':
                return <Fixation />;

            case 'stimulus':
                if (state.trialData[state.currentTrial]) {
                    return (
                        <Stimulus trial={state.trialData[state.currentTrial]} />
                    );
                }
                return <div>Loading...</div>;

            case 'results':
                return (
                    <Results
                        metrics={getPerformanceMetrics()}
                        onRestart={resetExperiment}
                    />
                );

            default:
                return <div>Loading...</div>;
        }
    };

    return (
        <div className='App'>
            {renderCurrentPhase()}

            {/* Debug info in development */}
            {import.meta.env.DEV && (
                <div className='debug-info'>
                    <p>Phase: {state.phase}</p>
                    <p>
                        Trial: {state.currentTrial + 1} /{' '}
                        {state.trialData.length}
                    </p>
                    {state.trialData[state.currentTrial] && (
                        <p>
                            Current stimulus:{' '}
                            {state.trialData[state.currentTrial].stimulus}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
