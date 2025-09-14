import React from 'react';
import type { StroopDifficulty } from '../../types/experiment';
import './StroopInstructions.css';

interface StroopInstructionsProps {
  difficulty: StroopDifficulty;
  onStart: () => void;
}

const StroopInstructions: React.FC<StroopInstructionsProps> = ({ difficulty, onStart }) => {
  const handleKeyPress = () => {
    onStart();
  };

  if (difficulty === 'easy') {
    return (
      <div className="stroop-instructions" tabIndex={0} onKeyDown={handleKeyPress}>
        <div className="stroop-instructions-content">
          <h2>Instructions - Easy Version</h2>
          <p>
            You will see color words (like RED, BLUE, etc.) displayed on the screen. 
            Your task is to respond to the <strong>INK COLOR</strong> of the text, not the word itself.
          </p>
          
          <p>For example, if the word <strong style={{ color: 'blue' }}>RED</strong> appears, you should choose <strong>BLUE</strong>.</p>
          
          <p>Click on the color card that matches the <strong>INK COLOR</strong> of the text:</p>
          
          <div className="color-cards">
            <div className="color-card" style={{ backgroundColor: 'red' }}></div>
            <div className="color-card" style={{ backgroundColor: 'blue' }}></div>
            <div className="color-card" style={{ backgroundColor: 'green' }}></div>
            <div className="color-card" style={{ backgroundColor: '#DAA520' }}></div>
          </div>
          <p className="color-labels">Red &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Blue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Green &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Yellow</p>
          
          <p>Try to be as fast and accurate as possible.</p>
          
          <button className="start-button" onClick={onStart}>
            Start Test
          </button>
          <p className="instruction-note">Press any key or click the button when you're ready to begin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stroop-instructions" tabIndex={0} onKeyDown={handleKeyPress}>
      <div className="stroop-instructions-content">
        <h2>Instructions - Hard Version</h2>
        <p className="attention-warning"><strong>PAY ATTENTION TO THE BACKGROUND!</strong></p>
        
        <div className="rules-section">
          <h3>Rules:</h3>
          <ul className="rules-list">
            <li><strong>Black background:</strong> Click the button that matches the <strong>WORD</strong></li>
            <li><strong>Grey background:</strong> Click the button that matches the <strong>INK COLOR</strong></li>
          </ul>
        </div>
        
        <div className="examples-section">
          <h3>Examples:</h3>
          <div className="example">
            <div className="example-stimulus black-bg">RED</div>
            <p>Black background: Answer the WORD, Click <strong>RED</strong></p>
          </div>
          
          <div className="example">
            <div className="example-stimulus grey-bg">RED</div>
            <p>Grey background: Answer the INK COLOR, Click <strong>BLUE</strong></p>
          </div>
        </div>
        
        <p>Available color choices:</p>
        <div className="color-cards">
          <div className="color-card" style={{ backgroundColor: 'red' }}></div>
          <div className="color-card" style={{ backgroundColor: 'blue' }}></div>
          <div className="color-card" style={{ backgroundColor: 'green' }}></div>
          <div className="color-card" style={{ backgroundColor: '#DAA520' }}></div>
        </div>
        <p className="color-labels">Red &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Blue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Green &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Yellow</p>
        
        <p className="challenge-warning">This is challenging! Pay close attention to the background color.</p>
        
        <button className="start-button" onClick={onStart}>
          Start Test
        </button>
        <p className="instruction-note">Press any key or click the button when you're ready to begin.</p>
      </div>
    </div>
  );
};

export default StroopInstructions;
