import React, { useState } from "react";
import { sendFeedback } from "../utils/api";

export default function FeedbackSection() {
  const [form, setForm] = useState({ name: "", email: "", type: "general", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in name, email and message."); return; }
    setError(""); setLoading(true);
    try { await sendFeedback(form); setSuccess(true); }
    catch { setError("Failed to send. Please email us directly at 2330403@kiit.ac.in"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .feedback-section { max-width:1140px; margin:0 auto; padding:5rem 1.5rem; }
        .feedback-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; }
        .fb-info h2 { font-family:var(--font-head); font-size:2rem; font-weight:800; margin-bottom:1rem; }
        .fb-info h2 span { color:var(--teal); }
        .fb-info p { color:var(--muted); font-size:0.9rem; line-height:1.8; margin-bottom:1.5rem; }
        .fb-contacts { display:flex; flex-direction:column; gap:0.75rem; }
        .fb-contact { display:flex; align-items:center; gap:0.75rem; padding:0.8rem 1.1rem; background:var(--card-bg); border:1px solid var(--card-border); border-radius:12px; }
        .fb-contact-icon { width:36px; height:36px; border-radius:10px; background:rgba(0,212,180,0.12); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .fb-contact-label { font-size:0.68rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.05em; }
        .fb-contact-email { font-size:0.85rem; font-weight:500; color:var(--text); }
        .fb-form { background:var(--card-bg); border:1px solid var(--card-border); border-radius:22px; padding:2rem; }
        .fb-form h3 { font-family:var(--font-head); font-size:1.1rem; font-weight:800; margin-bottom:1.5rem; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .form-group { display:flex; flex-direction:column; gap:0.4rem; margin-bottom:1rem; }
        .form-label { font-size:0.72rem; font-weight:600; letter-spacing:0.06em; color:var(--muted); text-transform:uppercase; }
        .form-input, .form-select, .form-textarea { background:rgba(255,255,255,0.05); border:1px solid var(--card-border); color:var(--text); padding:0.65rem 0.9rem; border-radius:11px; font-family:var(--font-body); font-size:0.875rem; outline:none; transition:border-color 0.2s; width:100%; }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color:rgba(0,212,180,0.4); }
        .form-input::placeholder, .form-textarea::placeholder { color:rgba(123,139,178,0.6); }
        .form-textarea { resize:vertical; min-height:100px; line-height:1.6; }
        .form-select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237b8bb2' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; background-color:rgba(255,255,255,0.05); padding-right:2rem; }
        .form-select option { background:#0c1832; }
        .submit-btn { width:100%; background:linear-gradient(135deg,var(--teal),#00a892); color:#060d1f; border:none; padding:0.85rem; border-radius:12px; font-family:var(--font-head); font-size:0.9rem; font-weight:700; cursor:pointer; transition:all 0.2s; margin-top:0.5rem; }
        .submit-btn:hover { box-shadow:0 8px 24px rgba(0,212,180,0.3); transform:translateY(-1px); }
        .submit-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        .success-msg { text-align:center; padding:2rem; color:var(--teal); font-family:var(--font-head); font-size:1.1rem; font-weight:700; }
        .success-msg p { color:var(--muted); font-size:0.85rem; font-family:var(--font-body); font-weight:400; margin-top:0.5rem; }
        .error-msg { color:#ff6b6b; font-size:0.78rem; margin-top:0.5rem; }
        @media(max-width:768px) { .feedback-grid { grid-template-columns:1fr; } .form-row { grid-template-columns:1fr; } }
      `}</style>
      <section className="feedback-section" id="feedback">
        <div className="feedback-grid">
          <div className="fb-info">
            <h2>Share Your <span>Feedback</span></h2>
            <p>Help us improve SchemeSphere. Found an error in scheme info? Have a suggestion? We would love to hear from you. Your input directly improves the platform for millions of Indian citizens.</p>
            <div className="fb-contacts">
              <div className="fb-contact">
                <div className="fb-contact-icon">✉️</div>
                <div><div className="fb-contact-label">Primary Contact</div><div className="fb-contact-email">2330403@kiit.ac.in</div></div>
              </div>
              <div className="fb-contact">
                <div className="fb-contact-icon">✉️</div>
                <div><div className="fb-contact-label">Secondary Contact</div><div className="fb-contact-email">2330417@kiit.ac.in</div></div>
              </div>
            </div>
          </div>
          <div className="fb-form">
            {success ? (
              <div className="success-msg">✅ Feedback Received!<p>Our team will respond within 5 working days.</p></div>
            ) : (
              <>
                <h3>Send Us a Message</h3>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Name *</label><input className="form-input" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Type</label>
                    <select className="form-select" value={form.type} onChange={e => set("type", e.target.value)}>
                      <option value="general">General Feedback</option>
                      <option value="correction">Data Correction</option>
                      <option value="new-scheme">New Scheme Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="grievance">Grievance</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Subject</label><input className="form-input" placeholder="Brief subject" value={form.subject} onChange={e => set("subject", e.target.value)} /></div>
                </div>
                <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" placeholder="Describe your feedback in detail..." value={form.message} onChange={e => set("message", e.target.value)} /></div>
                {error && <div className="error-msg">{error}</div>}
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>{loading ? "Sending..." : "Send Feedback →"}</button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}