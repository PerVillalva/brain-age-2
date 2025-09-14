import React from 'react';
import type { StroopPerformanceMetrics } from '../../types/experiment';
import './StroopResults.css';

interface StroopResultsProps {
    metrics: StroopPerformanceMetrics;
    onRestart: () => void;
    onReturnToMenu: () => void;
}

export const StroopResults: React.FC<StroopResultsProps> = ({
    metrics,
    onRestart,
    onReturnToMenu,
}) => {
    return (
        <div className='stroop-results-container'>
            <div className='stroop-results-content'>
                <h2>Results</h2>

                <div className='age-prediction-box'>
                    <h3>🧠 Age Prediction</h3>
                    <p className='predicted-age'>
                        Your predicted age is:{' '}
                        <strong>
                            {Math.round(metrics.predictedAge)} years
                        </strong>
                    </p>
                    <p className='error-details'>
                        Based on {metrics.totalErrors} errors out of{' '}
                        {metrics.totalTrials} trials (
                        {(
                            (metrics.totalErrors / metrics.totalTrials) *
                            100
                        ).toFixed(1)}
                        % error rate)
                    </p>
                    <p className='disclaimer'>
                        <em>
                            Note: This prediction is based on research by
                            Belghali et al. (2022) and is for entertainment
                            purposes only.
                        </em>
                    </p>
                </div>

                <div className='performance-section'>
                    <h3>Performance Summary</h3>
                    <div className='metrics-grid'>
                        <div className='metric'>
                            <span className='metric-label'>
                                Overall Accuracy:
                            </span>
                            <span className='metric-value'>
                                {metrics.accuracy.toFixed(1)}%
                            </span>
                        </div>
                        <div className='metric'>
                            <span className='metric-label'>
                                Average Response Time:
                            </span>
                            <span className='metric-value'>
                                {metrics.meanReactionTime}ms
                            </span>
                        </div>
                    </div>
                </div>

                <div className='condition-section'>
                    <h3>Performance by Condition</h3>
                    <div className='condition-grid'>
                        <div className='condition-result'>
                            <h4>Congruent Trials</h4>
                            <p>
                                {metrics.congruentAccuracy.toFixed(1)}% accuracy
                            </p>
                            <p>{metrics.congruentRT}ms avg. response time</p>
                        </div>
                        <div className='condition-result'>
                            <h4>Incongruent Trials</h4>
                            <p>
                                {metrics.incongruentAccuracy.toFixed(1)}%
                                accuracy
                            </p>
                            <p>{metrics.incongruentRT}ms avg. response time</p>
                        </div>
                    </div>
                    <div className='stroop-effect'>
                        <strong>Stroop Effect: {metrics.stroopEffect}ms</strong>
                        <p>
                            The difference in response time between conditions.
                            Typically, people are slower on incongruent trials
                            because the word and color mismatch, causing mental
                            interference.
                        </p>
                    </div>
                </div>

                <div className='action-buttons'>
                    <button
                        onClick={onRestart}
                        className='action-button restart-button'
                    >
                        Take Test Again
                    </button>
                    <button
                        onClick={onReturnToMenu}
                        className='action-button menu-button'
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};
