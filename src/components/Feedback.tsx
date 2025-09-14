import React from 'react';
import './Feedback.css';

interface FeedbackProps {
    message: string;
    isCorrect?: boolean;
}

export const Feedback: React.FC<FeedbackProps> = ({ message, isCorrect }) => {
    const feedbackClass =
        isCorrect === true
            ? 'correct'
            : isCorrect === false
            ? 'incorrect'
            : 'timeout';

    return (
        <div className='feedback-container'>
            <div className={`feedback-message ${feedbackClass}`}>{message}</div>
        </div>
    );
};
