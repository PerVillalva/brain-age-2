import React from 'react';
import type { TrialData } from '../types/experiment';
import { STIMULUS_CONFIG } from '../types/experiment';
import './Stimulus.css';

interface StimulusProps {
    trial: TrialData;
    isFadingOut?: boolean;
}

export const Stimulus: React.FC<StimulusProps> = ({
    trial,
    isFadingOut = false,
}) => {
    const stimulusColor = STIMULUS_CONFIG[trial.stimulus].color;

    return (
        <div className='stimulus-container'>
            <div
                className={`stimulus-circle ${isFadingOut ? 'fading-out' : ''}`}
                style={{ backgroundColor: stimulusColor }}
            />
        </div>
    );
};
