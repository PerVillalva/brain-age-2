import React from 'react';
import type { StroopStimulus } from '../../types/experiment';
import './StroopStimulus.css';

interface StroopStimulusProps {
    stimulus: StroopStimulus;
    onResponse: (colorIndex: number) => void;
}

const colorChoices = ['red', 'blue', 'green', '#DAA520'];

export const StroopStimulusComponent: React.FC<StroopStimulusProps> = ({
    stimulus,
    onResponse,
}) => {
    const handleColorClick = (colorIndex: number) => {
        onResponse(colorIndex);
    };

    const stimulusStyle = {
        color: stimulus.color,
        backgroundColor: stimulus.background || 'transparent',
        padding: stimulus.background ? '30px' : '0',
        borderRadius: stimulus.background ? '10px' : '0',
    };

    return (
        <div className='stroop-stimulus-container'>
            <div
                className='stroop-stimulus-word'
                style={stimulusStyle}
            >
                {stimulus.word}
            </div>

            <div className='stroop-color-buttons'>
                {colorChoices.map((color, index) => (
                    <button
                        key={index}
                        className='stroop-color-button'
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(index)}
                        aria-label={`Select ${
                            color === '#DAA520' ? 'yellow' : color
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
