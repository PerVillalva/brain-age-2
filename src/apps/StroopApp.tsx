import React, { useEffect } from 'react';
import { useStroopExperiment } from '../hooks/useStroopExperiment';
import type {
    StroopStimulus,
    StroopPerformanceMetrics,
    StroopDifficulty,
} from '../types/experiment';

interface StroopAppProps {
    onReturnToMenu?: () => void;
}

// Simple welcome component
const StroopWelcome: React.FC<{
    onStart: () => void;
    onBackToMenu?: () => void;
}> = ({ onStart, onBackToMenu }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f5f5',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
    >
        <div
            style={{
                textAlign: 'center',
                maxWidth: '800px',
                padding: '40px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    color: '#333',
                }}
            >
                Welcome to the Stroop Test
            </h1>
            <p
                style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                    marginBottom: '30px',
                    color: '#666',
                }}
            >
                This experiment tests your ability to respond to colors while
                ignoring words.
            </p>
            <div
                style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                }}
            >
                <button
                    onClick={onStart}
                    style={{
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Continue
                </button>
                {onBackToMenu && (
                    <button
                        onClick={onBackToMenu}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Menu
                    </button>
                )}
            </div>
        </div>
    </div>
);

// Difficulty selection component matching jsPsych style
const StroopDifficulty: React.FC<{
    onSelectDifficulty: (difficulty: StroopDifficulty) => void;
    onBackToMenu?: () => void;
}> = ({ onSelectDifficulty, onBackToMenu }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f5f5f5',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px',
        }}
    >
        <div
            style={{
                maxWidth: '800px',
                fontSize: '18px',
                lineHeight: '1.6',
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: '#333',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '30px',
                }}
            >
                Choose Difficulty Level
            </h2>

            <div style={{ margin: '40px 0' }}>
                <div
                    style={{
                        backgroundColor: '#e8f5e8',
                        padding: '20px',
                        borderRadius: '10px',
                        margin: '20px 0',
                    }}
                >
                    <h3 style={{ color: '#2d5a2d', marginTop: 0 }}>
                        Easy Version
                    </h3>
                    <p>
                        <strong>Rule:</strong> Always respond to the{' '}
                        <strong>ink color</strong> of the text, ignore the word.
                    </p>
                    <p>
                        Example: If you see{' '}
                        <span style={{ color: 'blue', fontWeight: 'bold' }}>
                            RED
                        </span>
                        , click the blue button.
                    </p>
                </div>
                <div
                    style={{
                        backgroundColor: '#ffe8e8',
                        padding: '20px',
                        borderRadius: '10px',
                        margin: '20px 0',
                    }}
                >
                    <h3 style={{ color: '#8b2635', marginTop: 0 }}>
                        Hard Version
                    </h3>
                    <p>
                        <strong>Rules:</strong>
                    </p>
                    <ul>
                        <li>
                            If text has a <strong>black background</strong>{' '}
                            respond to the <strong>WORD</strong>
                        </li>
                        <li>
                            If text has a <strong>grey background</strong>{' '}
                            respond to the <strong>INK COLOR</strong>
                        </li>
                    </ul>
                    <p>
                        This requires constant attention to background color and
                        switching between word and color responses!
                    </p>
                </div>
            </div>

            <p
                style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    marginTop: '30px',
                }}
            >
                Choose your difficulty level:
            </p>

            <div
                style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    marginTop: '40px',
                }}
            >
                <button
                    onClick={() => onSelectDifficulty('easy')}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        width: '200px',
                        height: '60px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '10px',
                        margin: '20px',
                        cursor: 'pointer',
                    }}
                >
                    Easy Version
                </button>
                <button
                    onClick={() => onSelectDifficulty('hard')}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        width: '200px',
                        height: '60px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '10px',
                        margin: '20px',
                        cursor: 'pointer',
                    }}
                >
                    Hard Version
                </button>
            </div>

            {onBackToMenu && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    <button
                        onClick={onBackToMenu}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Menu
                    </button>
                </div>
            )}
        </div>
    </div>
);

// Instructions component matching jsPsych style
const StroopInstructions: React.FC<{
    difficulty: StroopDifficulty;
    onContinue: () => void;
    onBackToMenu?: () => void;
}> = ({ difficulty, onContinue, onBackToMenu }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f5f5f5',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px',
        }}
    >
        <div
            style={{
                maxWidth: '800px',
                fontSize: '18px',
                lineHeight: '1.6',
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '30px',
                }}
            >
                Instructions - {difficulty === 'easy' ? 'Easy' : 'Hard'} Version
            </h2>

            {difficulty === 'easy' ? (
                <>
                    <p>
                        You will see color words (like RED, BLUE, etc.)
                        displayed on the screen. Your task is to respond to the{' '}
                        <strong>INK COLOR</strong> of the text, not the word
                        itself.
                    </p>

                    <p>
                        For example, if the word{' '}
                        <strong style={{ color: 'blue' }}>RED</strong> appears,
                        you should choose <strong>BLUE</strong>.
                    </p>

                    <p>
                        Click on the color card that matches the{' '}
                        <strong>INK COLOR</strong> of the text:
                    </p>
                </>
            ) : (
                <>
                    <p>
                        <strong style={{ color: '#dc3545' }}>
                            PAY ATTENTION TO THE BACKGROUND!
                        </strong>
                    </p>

                    <div
                        style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '10px',
                            margin: '20px 0',
                        }}
                    >
                        <h3>Rules:</h3>
                        <ul style={{ fontSize: '18px', lineHeight: 2 }}>
                            <li>
                                <strong>Black background:</strong> Click the
                                button that matches the <strong>WORD</strong>
                            </li>
                            <li>
                                <strong>Grey background:</strong> Click the
                                button that matches the{' '}
                                <strong>INK COLOR</strong>
                            </li>
                        </ul>
                    </div>

                    <div style={{ margin: '30px 0' }}>
                        <h3>Examples:</h3>
                        <div
                            style={{
                                backgroundColor: 'black',
                                color: 'blue',
                                padding: '15px',
                                margin: '10px 0',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        >
                            RED
                        </div>
                        <p style={{ textAlign: 'center' }}>
                            Black background: Answer the WORD, Click{' '}
                            <strong>RED</strong>
                        </p>

                        <div
                            style={{
                                backgroundColor: '#808080',
                                color: 'blue',
                                padding: '15px',
                                margin: '10px 0',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        >
                            RED
                        </div>
                        <p style={{ textAlign: 'center' }}>
                            Grey background: Answer the INK COLOR, Click{' '}
                            <strong>BLUE</strong>
                        </p>
                    </div>

                    <p>Available color choices:</p>
                </>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    margin: '30px 0',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'red',
                        border: '3px solid #333',
                        borderRadius: '12px',
                    }}
                />
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'blue',
                        border: '3px solid #333',
                        borderRadius: '12px',
                    }}
                />
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'green',
                        border: '3px solid #333',
                        borderRadius: '12px',
                    }}
                />
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#DAA520',
                        border: '3px solid #333',
                        borderRadius: '12px',
                    }}
                />
            </div>

            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                Red &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Blue
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Green
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Yellow
            </p>

            {difficulty === 'hard' && (
                <p
                    style={{
                        textAlign: 'center',
                        color: '#dc3545',
                        fontWeight: 'bold',
                        marginTop: '20px',
                    }}
                >
                    This is challenging! Pay close attention to the background
                    color.
                </p>
            )}

            <p>Try to be as fast and accurate as possible.</p>

            <div
                style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    marginTop: '40px',
                }}
            >
                <button
                    onClick={onContinue}
                    style={{
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Begin Test
                </button>
                {onBackToMenu && (
                    <button
                        onClick={onBackToMenu}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Menu
                    </button>
                )}
            </div>
        </div>
    </div>
);

// Fixation cross component
const StroopFixation: React.FC = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f5f5',
        }}
    >
        <div style={{ fontSize: '60px', color: '#333' }}>+</div>
    </div>
);

// Stimulus component with color buttons
const StroopStimulus: React.FC<{
    trial: StroopStimulus;
    onResponse: (buttonIndex: number) => void;
    onRestart?: () => void;
    colorOptions: Array<{ name: string; value: string }>;
}> = ({ trial, onResponse, onRestart, colorOptions }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f5f5',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
    >
        {onRestart && (
            <button
                onClick={onRestart}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: '#dc3545',
                    border: '2px solid #dc3545',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c82333';
                    e.currentTarget.style.borderColor = '#c82333';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#dc3545';
                    e.currentTarget.style.borderColor = '#dc3545';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Restart Test
            </button>
        )}

        <div
            style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: trial.color,
                backgroundColor: trial.background || 'transparent',
                padding: trial.background ? '30px' : '0',
                borderRadius: trial.background ? '10px' : '0',
                margin: '50px 0',
                textAlign: 'center',
            }}
        >
            {trial.word}
        </div>

        <div
            style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
            }}
        >
            {colorOptions.map((colorInfo, index) => (
                <button
                    key={index}
                    onClick={() => onResponse(index)}
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: colorInfo.value,
                        border: '3px solid #333',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        margin: '10px',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow =
                            '0 4px 8px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />
            ))}
        </div>
    </div>
);

// Results component with age prediction
const StroopResults: React.FC<{
    metrics: StroopPerformanceMetrics;
    onRestart: () => void;
    onBackToMenu?: () => void;
}> = ({ metrics, onRestart, onBackToMenu }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px',
        }}
    >
        <div
            style={{
                maxWidth: '800px',
                fontSize: '18px',
                lineHeight: '1.6',
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '30px',
                }}
            >
                Results - {metrics.difficulty === 'easy' ? 'Easy' : 'Hard'}{' '}
                Version
            </h2>

            <div
                style={{
                    backgroundColor: '#e8f4fd',
                    padding: '20px',
                    borderRadius: '10px',
                    margin: '20px 0',
                    textAlign: 'center',
                    borderLeft: '5px solid #0066cc',
                }}
            >
                <h3 style={{ color: '#0066cc', marginTop: 0 }}>
                    🧠 Age Prediction
                </h3>
                <p
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#0066cc',
                        margin: '10px 0',
                    }}
                >
                    Your predicted age is: {Math.round(metrics.predictedAge)}{' '}
                    years
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    Based on a completion time of{' '}
                    {metrics.totalTimeSeconds.toFixed(1)} seconds and{' '}
                    {metrics.totalErrors} errors ({metrics.difficulty} version)
                </p>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#888',
                        marginTop: '15px',
                    }}
                >
                    <em>
                        Note: This prediction is based on research by Belghali
                        et al. (2022) and is for entertainment purposes only.
                    </em>
                </p>
            </div>

            <h3>Performance Summary:</h3>
            <p>
                <strong>Overall Accuracy:</strong> {metrics.accuracy.toFixed(1)}
                %
            </p>
            <p>
                <strong>Total Completion Time:</strong>{' '}
                {metrics.totalTimeSeconds.toFixed(1)} seconds
            </p>
            <p>
                <strong>Average Response Time:</strong>{' '}
                {Math.round(metrics.meanReactionTime)}ms
            </p>
            <p>
                <strong>Total Errors:</strong> {metrics.totalErrors} out of{' '}
                {metrics.totalTrials} trials
            </p>
            <hr />
            <h3>Performance by Condition:</h3>
            <p>
                <strong>Congruent Trials:</strong>{' '}
                {metrics.congruentAccuracy.toFixed(1)}% accuracy,{' '}
                {Math.round(metrics.congruentRT)}ms avg. response time
            </p>
            <p>
                <strong>Incongruent Trials:</strong>{' '}
                {metrics.incongruentAccuracy.toFixed(1)}% accuracy,{' '}
                {Math.round(metrics.incongruentRT)}ms avg. response time
            </p>
            <hr />
            <p>
                The <strong>Stroop Effect</strong> is the difference in
                performance between conditions. Typically, people are faster and
                more accurate on congruent trials because the word and color
                match, causing less mental interference.
            </p>

            <div
                style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    marginTop: '40px',
                }}
            >
                <button
                    onClick={onRestart}
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Run Again
                </button>
                {onBackToMenu && (
                    <button
                        onClick={onBackToMenu}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to Menu
                    </button>
                )}
            </div>
        </div>
    </div>
);

export const StroopApp: React.FC<StroopAppProps> = ({ onReturnToMenu }) => {
    const {
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
    } = useStroopExperiment();

    // Auto-start fixation when appropriate
    useEffect(() => {
        if (state.phase === 'fixation') {
            startFixation();
        }
    }, [state.phase, state.currentTrial, startFixation]);

    const handleRestart = () => {
        resetExperiment();
    };

    const handleBackToMenu = () => {
        resetExperiment();
        onReturnToMenu?.();
    };

    const renderCurrentPhase = () => {
        switch (state.phase) {
            case 'welcome':
                return (
                    <StroopWelcome
                        onStart={startExperiment}
                        onBackToMenu={handleBackToMenu}
                    />
                );

            case 'difficulty':
                return (
                    <StroopDifficulty
                        onSelectDifficulty={setDifficulty}
                        onBackToMenu={handleBackToMenu}
                    />
                );

            case 'instructions':
                return (
                    <StroopInstructions
                        difficulty={state.difficulty || 'easy'}
                        onContinue={startTest}
                        onBackToMenu={handleBackToMenu}
                    />
                );

            case 'fixation':
                return <StroopFixation />;

            case 'stimulus':
                if (currentTrialInfo) {
                    return (
                        <StroopStimulus
                            trial={currentTrialInfo}
                            onResponse={handleResponse}
                            onRestart={handleRestart}
                            colorOptions={colorOptions}
                        />
                    );
                }
                return <div>Loading...</div>;

            case 'results':
                return (
                    <StroopResults
                        metrics={getPerformanceMetrics()}
                        onRestart={handleRestart}
                        onBackToMenu={handleBackToMenu}
                    />
                );

            default:
                return <div>Loading...</div>;
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {renderCurrentPhase()}
        </div>
    );
};

export default StroopApp;
