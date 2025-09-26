import React, { useState } from 'react';
import './CSS/Feedback.css'
function FeedbackForm({ addFeedback }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback({ name, email, subject, message });
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className='container'>
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit} className='container2'>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
