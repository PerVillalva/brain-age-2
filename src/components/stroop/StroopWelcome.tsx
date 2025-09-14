import React from 'react';
import './StroopWelcome.css';

interface StroopWelcomeProps {
    onStart: () => void;
}

export const StroopWelcome: React.FC<StroopWelcomeProps> = ({ onStart }) => {
    const handleKeyPress = () => {
        onStart();
    };

    return (
        <div
            className='stroop-welcome-container'
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className='stroop-welcome-content'>
                <h1>Welcome to the Stroop Test</h1>
                <p>
                    This experiment tests your ability to respond to colors
                    while ignoring words.
                </p>
                <p>Press any key to continue.</p>
                <button onClick={onStart} className='start-button'>
                    Start Test
                </button>
            </div>
        </div>
    );
};
