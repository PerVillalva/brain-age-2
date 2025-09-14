import React from 'react';
import './Welcome.css';

interface WelcomeProps {
    onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    const handleKeyPress = () => {
        onStart();
    };

    return (
        <div
            className='welcome-container'
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className='welcome-content'>
                <h1>Reaction Time Experiment</h1>
                <p>Welcome to the experiment. Press any key to begin.</p>
                <button onClick={onStart} className='start-button'>
                    Start Experiment
                </button>
            </div>
        </div>
    );
};
