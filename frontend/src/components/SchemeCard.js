import React, { useState } from "react";

export default function SchemeCard({ scheme, delay = 0 }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <style>{`
        .scheme-card { background:var(--card-bg); backdrop-filter:blur(12px); border:1px solid var(--card-border); border-radius:20px; padding:1.5rem; display:flex; flex-direction:column; gap:0.8rem; transition:transform 0.25s, box-shadow 0.25s, border-color 0.25s; animation:fadeUp 0.5s ease both; }
        .scheme-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,0.38); border-color:rgba(255,255,255,0.13); }
        .card-icon { width:50px; height:50px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
        .card-icon-row { display:flex; align-items:flex-start; justify-content:space-between; }
        .card-ministry { font-size:0.65rem; color:var(--muted); text-align:right; max-width:140px; line-height:1.3; }
        .scheme-badges { display:flex; gap:0.4rem; flex-wrap:wrap; }
        .badge { font-size:0.62rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; padding:0.22rem 0.6rem; border-radius:100px; }
        .badge-central { background:rgba(79,110,247,0.14); color:#8fa8f8; border:1px solid rgba(79,110,247,0.22); }
        .badge-state { background:rgba(255,153,51,0.14); color:#ffb84d; border:1px solid rgba(255,153,51,0.22); }
        .badge-cat { background:rgba(0,212,180,0.1); color:var(--teal); border:1px solid rgba(0,212,180,0.2); }
        .badge-year { background:rgba(255,255,255,0.05); color:var(--muted); border:1px solid rgba(255,255,255,0.07); }
        .scheme-name { font-family:var(--font-head); font-size:1.02rem; font-weight:700; line-height:1.3; }
        .scheme-desc { color:var(--muted); font-size:0.82rem; line-height:1.65; flex:1; }
        .card-footer { display:flex; align-items:center; justify-content:space-between; margin-top:0.25rem; gap:0.5rem; }
        .view-btn { display:inline-flex; align-items:center; gap:0.4rem; background:transparent; border:1px solid rgba(255,255,255,0.1); color:var(--text); padding:0.5rem 1rem; border-radius:10px; font-family:var(--font-body); font-size:0.78rem; cursor:pointer; transition:all 0.2s; }
        .view-btn:hover { background:rgba(0,212,180,0.1); border-color:rgba(0,212,180,0.3); color:var(--teal); }
        .official-link { color:var(--muted); font-size:0.72rem; text-decoration:none; display:flex; align-items:center; gap:0.3rem; transition:color 0.2s; }
        .official-link:hover { color:var(--teal); }
        .modal-overlay { position:fixed; inset:0; z-index:500; background:rgba(6,13,31,0.88); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:1.5rem; animation:fadeIn 0.2s ease; }
        .modal { background:var(--navy2); border:1px solid rgba(255,255,255,0.1); border-radius:24px; width:100%; max-width:600px; max-height:85vh; overflow-y:auto; animation:fadeUp 0.25s ease; }
        .modal-header { display:flex; align-items:flex-start; gap:1.25rem; padding:1.75rem; border-bottom:1px solid rgba(255,255,255,0.07); }
        .modal-icon { width:54px; height:54px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; flex-shrink:0; }
        .modal-title { font-family:var(--font-head); font-size:1.15rem; font-weight:800; margin-bottom:0.3rem; }
        .modal-meta { color:var(--muted); font-size:0.78rem; }
        .modal-close { margin-left:auto; background:rgba(255,255,255,0.06); border:none; color:var(--muted); width:32px; height:32px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s; font-size:1rem; }
        .modal-close:hover { background:rgba(255,255,255,0.1); color:var(--text); }
        .modal-body { padding:1.5rem 1.75rem; display:flex; flex-direction:column; gap:1.25rem; }
        .modal-section h4 { font-family:var(--font-head); font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:0.5rem; }
        .modal-section p { font-size:0.875rem; color:var(--text); line-height:1.7; }
        .modal-section ul { padding-left:1.2rem; display:flex; flex-direction:column; gap:0.25rem; }
        .modal-section li { font-size:0.875rem; color:var(--muted); line-height:1.6; }
        .modal-cta { display:flex; gap:0.75rem; padding:1.25rem 1.75rem; border-top:1px solid rgba(255,255,255,0.07); flex-wrap:wrap; }
        .btn-primary { flex:1; background:linear-gradient(135deg, var(--teal), #00a892); color:#060d1f; border:none; padding:0.75rem 1.5rem; border-radius:12px; font-family:var(--font-head); font-size:0.875rem; font-weight:700; cursor:pointer; transition:all 0.2s; text-decoration:none; display:flex; align-items:center; justify-content:center; }
        .btn-primary:hover { box-shadow:0 8px 24px rgba(0,212,180,0.3); transform:translateY(-1px); }
        .btn-secondary { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:var(--text); padding:0.75rem 1.25rem; border-radius:12px; font-family:var(--font-body); font-size:0.875rem; cursor:pointer; transition:all 0.2s; }
        .btn-secondary:hover { border-color:rgba(255,255,255,0.2); }
      `}</style>

      <div className="scheme-card" style={{ animationDelay: `${delay}ms` }}>
        <div className="card-icon-row">
          <div className="card-icon" style={{ background: `linear-gradient(135deg, #00d4b4, #4f6ef7)` }}>{scheme.icon}</div>
          <div className="card-ministry">{scheme.ministry}</div>
        </div>
        <div className="scheme-badges">
          <span className={`badge ${scheme.state === "Central" ? "badge-central" : "badge-state"}`}>{scheme.state} Govt</span>
          <span className="badge badge-cat">{scheme.category}</span>
          <span className="badge badge-year">{scheme.launchedYear}</span>
        </div>
        <h3 className="scheme-name">{scheme.name}</h3>
        <p className="scheme-desc">{scheme.description}</p>
        <div className="card-footer">
          <button className="view-btn" onClick={() => setShow(true)}>
            View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <a className="official-link" href={scheme.officialLink} target="_blank" rel="noreferrer">Official ↗</a>
        </div>
      </div>

      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon" style={{ background: "linear-gradient(135deg,#00d4b4,#4f6ef7)" }}>{scheme.icon}</div>
              <div>
                <div className="modal-title">{scheme.name}</div>
                <div className="modal-meta">{scheme.ministry} · Since {scheme.launchedYear}</div>
                <div className="scheme-badges" style={{ marginTop: "0.5rem" }}>
                  <span className={`badge ${scheme.state === "Central" ? "badge-central" : "badge-state"}`}>{scheme.state} Govt</span>
                  <span className="badge badge-cat">{scheme.category}</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShow(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-section"><h4>About</h4><p>{scheme.fullDescription || scheme.description}</p></div>
              {scheme.benefits?.length > 0 && (
                <div className="modal-section"><h4>Benefits</h4><ul>{scheme.benefits.map((b, i) => <li key={i}>✓ {b}</li>)}</ul></div>
              )}
              <div className="modal-section"><h4>Eligibility</h4><p>{scheme.eligibility}</p></div>
              <div className="modal-section"><h4>How to Apply</h4><p>{scheme.applicationProcess}</p></div>
            </div>
            <div className="modal-cta">
              <a className="btn-primary" href={scheme.officialLink} target="_blank" rel="noreferrer">Apply Now ↗</a>
              <button className="btn-secondary" onClick={() => setShow(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}