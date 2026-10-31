import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer { border-top:1px solid var(--card-border); padding:4rem 1.5rem 2rem; background:rgba(6,13,31,0.9); }
        .footer-inner { max-width:1140px; margin:0 auto; }
        .footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; padding-bottom:2.5rem; border-bottom:1px solid var(--card-border); }
        .footer-logo { font-family:var(--font-head); font-size:1.3rem; font-weight:800; margin-bottom:0.8rem; }
        .footer-logo span { color:var(--teal); }
        .footer-desc { color:var(--muted); font-size:0.82rem; line-height:1.8; max-width:280px; }
        .footer-col h4 { font-family:var(--font-head); font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:1rem; }
        .footer-col a { display:block; color:rgba(123,139,178,0.8); text-decoration:none; font-size:0.82rem; margin-bottom:0.55rem; transition:color 0.2s; }
        .footer-col a:hover { color:var(--text); }
        .footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:1.75rem; flex-wrap:wrap; gap:1rem; }
        .footer-copy { color:var(--muted); font-size:0.75rem; }
        .footer-copy span { color:var(--teal); }
        .footer-disclaimer { margin-top:1.5rem; padding:1rem 1.25rem; background:rgba(255,153,51,0.06); border:1px solid rgba(255,153,51,0.15); border-radius:12px; font-size:0.72rem; color:rgba(255,184,77,0.8); line-height:1.7; }
        @media(max-width:768px) { .footer-top { grid-template-columns:1fr 1fr; gap:2rem; } .footer-brand { grid-column:1/-1; } }
        @media(max-width:480px) { .footer-top { grid-template-columns:1fr; } }
      `}</style>
      <footer className="footer" id="about">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">Scheme<span>Sphere</span></div>
              <p className="footer-desc">India's unified platform to discover government welfare schemes. Empowering every citizen with knowledge of their entitlements.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#schemes">Browse Schemes</a>
              <a href="#trending">Trending</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#feedback">Contact Us</a>
            </div>
            <div className="footer-col">
              <h4>Data Sources</h4>
              <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer">MyScheme.gov.in</a>
              <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer">Digital India</a>
              <a href="https://india.gov.in" target="_blank" rel="noreferrer">India.gov.in</a>
              <a href="https://pib.gov.in" target="_blank" rel="noreferrer">PIB India</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:2330403@kiit.ac.in">2330403@kiit.ac.in</a>
              <a href="mailto:2330417@kiit.ac.in">2330417@kiit.ac.in</a>
              <a href="#feedback">Feedback Form</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <div className="footer-disclaimer">
            ⚠️ SchemeSphere is an independent informational platform and is NOT affiliated with the Government of India. Always verify information at official government websites before applying.
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 SchemeSphere · Built at <span>KIIT University</span> 🇮🇳</div>
          </div>
        </div>
      </footer>
    </>
  );
}