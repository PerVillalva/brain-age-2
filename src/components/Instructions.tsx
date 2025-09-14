import React from 'react';
import './Instructions.css';

interface InstructionsProps {
    onContinue: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ onContinue }) => {
    const handleKeyPress = () => {
        onContinue();
    };

    return (
        <div
            className='instructions-container'
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className='instructions-content'>
                <p>
                    In this experiment, a circle will appear in the center of
                    the screen.
                </p>

                <p>
                    If the circle is <strong>blue</strong>, press the letter F
                    on the keyboard as fast as you can.
                </p>

                <p>
                    If the circle is <strong>orange</strong>, press the letter J
                    as fast as you can.
                </p>

                <div className='stimulus-examples'>
                    <div className='example-item'>
                        <div className='circle blue-circle'></div>
                        <p className='instruction-text'>
                            <strong>Press the F key</strong>
                        </p>
                    </div>
                    <div className='example-item'>
                        <div className='circle orange-circle'></div>
                        <p className='instruction-text'>
                            <strong>Press the J key</strong>
                        </p>
                    </div>
                </div>

                <p>Press any key to begin.</p>

                <button onClick={onContinue} className='continue-button'>
                    Continue
                </button>
            </div>
        </div>
    );
};
