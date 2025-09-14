import React from 'react';
import type { PerformanceMetrics } from '../types/experiment';
import './Results.css';

interface ResultsProps {
    metrics: PerformanceMetrics;
    onRestart: () => void;
    onBackToMenu?: () => void;
}

export const Results: React.FC<ResultsProps> = ({
    metrics,
    onRestart,
    onBackToMenu,
}) => {
    return (
        <div className='results-container'>
            <div className='results-content'>
                <h2>Experiment Complete!</h2>

                <div className='metrics'>
                    <div className='metric-item'>
                        <span className='metric-label'>Accuracy:</span>
                        <span className='metric-value'>
                            {metrics.accuracy}%
                        </span>
                    </div>

                    <div className='metric-item'>
                        <span className='metric-label'>
                            Average Reaction Time:
                        </span>
                        <span className='metric-value'>
                            {metrics.meanReactionTime}ms
                        </span>
                    </div>

                    <div className='metric-item'>
                        <span className='metric-label'>Correct Responses:</span>
                        <span className='metric-value'>
                            {metrics.correctTrials} / {metrics.totalTrials}
                        </span>
                    </div>
                </div>

                <p className='completion-message'>
                    You responded correctly on {metrics.accuracy}% of the
                    trials. Your average response time was{' '}
                    {metrics.meanReactionTime}ms.
                </p>

                <p className='thank-you'>Thank you for participating!</p>

                <div className='action-buttons'>
                    <button onClick={onRestart} className='restart-button'>
                        Run Again
                    </button>
                    {onBackToMenu && (
                        <button onClick={onBackToMenu} className='menu-button'>
                            Back to Menu
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
