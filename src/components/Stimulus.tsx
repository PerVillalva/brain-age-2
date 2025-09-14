import React from 'react';
import type { TrialData } from '../types/experiment';
import { STIMULUS_CONFIG } from '../types/experiment';
import './Stimulus.css';

interface StimulusProps {
    trial: TrialData;
}

export const Stimulus: React.FC<StimulusProps> = ({ trial }) => {
    const stimulusColor = STIMULUS_CONFIG[trial.stimulus].color;

    return (
        <div className='stimulus-container'>
            <div
                className='stimulus-circle'
                style={{ backgroundColor: stimulusColor }}
            />
        </div>
    );
};
