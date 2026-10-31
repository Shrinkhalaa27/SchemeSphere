import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <style>{`
        .nav { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:1rem 2.5rem; background:rgba(6,13,31,0.85); backdrop-filter:blur(24px); border-bottom:1px solid rgba(255,255,255,0.06); transition:box-shadow 0.3s; }
        .nav.scrolled { box-shadow:0 4px 30px rgba(0,0,0,0.4); }
        .nav-logo { font-family:var(--font-head); font-size:1.3rem; font-weight:800; text-decoration:none; color:var(--text); }
        .nav-logo .dot { color:var(--teal); }
        .nav-links { display:flex; gap:2rem; }
        .nav-links a { color:var(--muted); text-decoration:none; font-size:0.875rem; font-weight:500; transition:color 0.2s; border-bottom:1px solid transparent; padding-bottom:2px; }
        .nav-links a:hover { color:var(--text); border-bottom-color:var(--teal); }
        .nav-badge { display:flex; align-items:center; gap:0.4rem; background:rgba(0,212,180,0.08); border:1px solid rgba(0,212,180,0.2); color:var(--teal); font-size:0.7rem; font-weight:600; padding:0.3rem 0.8rem; border-radius:100px; }
        .live-dot { width:6px; height:6px; background:var(--teal); border-radius:50%; animation:pulse 2s infinite; }
        @media(max-width:768px) { .nav { padding:1rem 1.25rem; } .nav-links { display:none; } }
      `}</style>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo" href="#home">Scheme<span className="dot">Sphere</span></a>
        <div className="nav-links">
          <a href="#schemes">Schemes</a>
          <a href="#trending">Trending</a>
          <a href="#privacy">Privacy</a>
          <a href="#feedback">Feedback</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-badge">
          <div className="live-dot" /> Live Data
        </div>
      </nav>
    </>
  );
}