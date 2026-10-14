import React, { useState } from "react";
import api from "../api";

export default function OthercrimeList() {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const track = async (event) => {
    event.preventDefault(); setBusy(true); setError(""); setReport(null);
    try { const result = await api.post("/api/othercrime/track", { trackingId, email }); setReport(result.data); }
    catch (requestError) { setError(requestError.response?.data?.error || "Unable to look up this report."); }
    finally { setBusy(false); }
  };
  return <section className="track-card">
    <div className="section-kicker">CASE UPDATES</div><h2>Track your report</h2>
    <p className="muted">Your report details are private. Only the matching tracking ID and email can view its status.</p>
    <form className="track-form" onSubmit={track}>
      <label>Tracking ID<input value={trackingId} onChange={(e) => setTrackingId(e.target.value.toUpperCase())} required placeholder="CCS-A1B2C3D4" /></label>
      <label>Report email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email used in your report" /></label>
      <button className="secondary-button" disabled={busy}>{busy ? "Checking…" : "Check status"}</button>
    </form>
    {error && <div className="notice notice-error" role="alert">{error}</div>}
    {report && <div className="tracking-result"><div><span className="muted">Tracking ID</span><strong>{report.trackingId}</strong></div><div><span className="muted">Category</span><strong>{report.category}</strong></div><div><span className="muted">Current status</span><strong className="status-pill">{report.status}</strong></div><div><span className="muted">Submitted</span><strong>{new Date(report.createdAt).toLocaleString()}</strong></div><div className="timeline"><strong>Status history</strong>{(report.statusHistory || []).map((item, index) => <div className="timeline-item" key={`${item.status}-${index}`}><span className="timeline-dot"/><div><strong>{item.status}</strong><p>{item.note || "Status updated"}</p><small>{new Date(item.createdAt || report.createdAt).toLocaleString()}</small></div></div>)}</div></div>}
  </section>;
}
