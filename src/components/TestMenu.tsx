import React from 'react';
import './TestMenu.css';

interface TestMenuProps {
    onTestSelect: (testType: 'reaction-time' | 'stroop') => void;
}

export const TestMenu: React.FC<TestMenuProps> = ({ onTestSelect }) => {
    return (
        <div className='test-menu-container'>
            <div className='test-menu-content'>
                <h1>Brain Age Assessment</h1>
                <p className='subtitle'>
                    Choose a cognitive test to assess your brain age
                </p>

                <div className='test-cards'>
                    <div
                        className='test-card'
                        onClick={() => onTestSelect('reaction-time')}
                    >
                        <div className='test-icon'>⚡</div>
                        <h3>Reaction Time Test</h3>
                        <p>
                            Measure your reaction speed to visual stimuli. Tests
                            how quickly your brain processes and responds to
                            information.
                        </p>
                        <div className='test-stats'>
                            <span className='stat'>⏱️ ~5 minutes</span>
                            <span className='stat'>🎯 Simple responses</span>
                        </div>
                        <button className='test-button'>Start Test</button>
                    </div>

                    <div
                        className='test-card'
                        onClick={() => onTestSelect('stroop')}
                    >
                        <div className='test-icon'>🧠</div>
                        <h3>Stroop Test</h3>
                        <p>
                            Test your cognitive control and processing speed.
                            Measures your ability to inhibit automatic
                            responses.
                        </p>
                        <div className='test-stats'>
                            <span className='stat'>⏱️ ~3 minutes</span>
                            <span className='stat'>🎨 Color matching</span>
                        </div>
                        <button
                            className='test-button'
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                    'https://strooop.vercel.app/',
                                    '_blank'
                                );
                            }}
                        >
                            Start Test
                        </button>
                    </div>
                </div>

                <div className='menu-footer'>
                    <p>
                        Both tests provide age predictions based on scientific
                        research
                    </p>
                </div>
            </div>
        </div>
    );
};
