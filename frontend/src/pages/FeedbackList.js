import React from 'react';
import './CSS/Feedback.css'
function FeedbackList({ feedbacks }) {
  return (
    <div className='container'>
      <h2>Feedbacks</h2>
      <div className='container4'>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index}>
            <strong>{feedback.subject}</strong> - {feedback.name} ({feedback.email})
            <br />
            {feedback.message}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default FeedbackList;
