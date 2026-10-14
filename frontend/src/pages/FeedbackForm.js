import React, { useState } from 'react';
import './CSS/Feedback.css';
function FeedbackForm({ addFeedback }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    const success = await addFeedback(form);
    if (success) setForm({ name: '', email: '', subject: '', message: '' });
    else setError('Please check your details and try again.');
    setBusy(false);
  };
  return <div className="container"><h2>Send feedback</h2><form onSubmit={handleSubmit} className="container2">
    <label>Name<input name="name" type="text" value={form.name} onChange={update} maxLength="100" required placeholder="Your name" /></label>
    <label>Email<input name="email" type="email" value={form.email} onChange={update} maxLength="254" required placeholder="you@example.com" /></label>
    <label>Subject<input name="subject" type="text" value={form.subject} onChange={update} maxLength="160" required placeholder="What is this about?" /></label>
    <label>Message<textarea name="message" value={form.message} onChange={update} maxLength="5000" required rows="5" placeholder="Tell us what we can improve…" /></label>
    {error && <p role="alert">{error}</p>}<button type="submit" disabled={busy}>{busy ? 'Submitting…' : 'Submit feedback'}</button>
  </form></div>;
}
export default FeedbackForm;
