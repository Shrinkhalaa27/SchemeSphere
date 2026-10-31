import React, { useState, useRef, useEffect } from "react";
import { fetchSuggestions } from "../utils/api";

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const debRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    clearTimeout(debRef.current);
    debRef.current = setTimeout(async () => {
      try {
        const d = await fetchSuggestions(query);
        setSuggestions(d.data || []);
      } catch { setSuggestions([]); }
    }, 250);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setShowSug(false);
    onSearch(query);
    document.getElementById("schemes")?.scrollIntoView({ behavior: "smooth" });
  };

  const pick = (s) => {
    setQuery(s);
    setShowSug(false);
    onSearch(s);
    document.getElementById("schemes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8rem 1.5rem 5rem; position:relative; overflow:hidden; text-align:center; }
        .hero-bg { position:absolute; inset:0; z-index:0; background:radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,110,247,0.2) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 85%, rgba(0,212,180,0.14) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 10% 70%, rgba(255,153,51,0.08) 0%, transparent 50%); }
        .hero-grid { position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px); background-size:55px 55px; mask-image:radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%); }
        .hero-content { position:relative; z-index:1; width:100%; max-width:820px; }
        .hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(0,212,180,0.08); border:1px solid rgba(0,212,180,0.22); color:var(--teal); font-size:0.72rem; font-weight:600; letter-spacing:0.07em; text-transform:uppercase; padding:0.4rem 1.1rem; border-radius:100px; margin-bottom:1.75rem; animation:fadeUp 0.6s ease both; }
        .pulse-dot { width:6px; height:6px; background:var(--teal); border-radius:50%; animation:pulse 2s infinite; }
        .hero h1 { font-family:var(--font-head); font-size:clamp(2.4rem,6.5vw,4.8rem); font-weight:800; line-height:1.08; letter-spacing:-0.035em; animation:fadeUp 0.7s ease 0.1s both; }
        .hero h1 .grad { background:linear-gradient(135deg, var(--teal) 0%, #7b9ef7 60%, var(--indigo) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-sub { color:var(--muted); font-size:clamp(1rem,2.2vw,1.2rem); font-weight:300; margin-top:1.2rem; max-width:600px; margin-left:auto; margin-right:auto; animation:fadeUp 0.7s ease 0.2s both; }
        .search-wrap { position:relative; margin-top:2.5rem; width:100%; max-width:700px; margin-left:auto; margin-right:auto; animation:fadeUp 0.7s ease 0.3s both; }
        .search-box { display:flex; align-items:center; background:rgba(255,255,255,0.055); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.1); border-radius:18px; padding:0.6rem 0.6rem 0.6rem 1.4rem; box-shadow:0 24px 64px rgba(0,0,0,0.45); transition:border-color 0.3s, box-shadow 0.3s; }
        .search-box:focus-within { border-color:rgba(0,212,180,0.45); box-shadow:0 24px 64px rgba(0,0,0,0.45), 0 0 0 4px rgba(0,212,180,0.07); }
        .search-icon { color:var(--muted); flex-shrink:0; margin-right:0.75rem; }
        .search-input { flex:1; background:transparent; border:none; outline:none; color:var(--text); font-family:var(--font-body); font-size:0.95rem; }
        .search-input::placeholder { color:rgba(123,139,178,0.7); }
        .search-btn { background:linear-gradient(135deg, var(--teal), #00a892); color:#060d1f; border:none; padding:0.75rem 1.6rem; border-radius:13px; font-family:var(--font-head); font-size:0.875rem; font-weight:700; cursor:pointer; transition:all 0.2s; white-space:nowrap; flex-shrink:0; }
        .search-btn:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(0,212,180,0.35); }
        .suggestions-dropdown { position:absolute; top:calc(100% + 10px); left:0; right:0; z-index:100; background:rgba(10,20,44,0.97); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.1); border-radius:16px; overflow:hidden; box-shadow:0 24px 56px rgba(0,0,0,0.55); animation:slideUp 0.15s ease; }
        .suggestion-item { display:flex; align-items:center; gap:0.75rem; padding:0.8rem 1.25rem; cursor:pointer; transition:background 0.15s; font-size:0.875rem; color:var(--muted); border-bottom:1px solid rgba(255,255,255,0.04); }
        .suggestion-item:last-child { border-bottom:none; }
        .suggestion-item:hover { background:rgba(0,212,180,0.07); color:var(--text); }
      `}</style>
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge"><div className="pulse-dot" />India's Unified Scheme Discovery Platform</div>
          <h1>Find Government Schemes<br /><span className="grad">Made for You</span></h1>
          <p className="hero-sub">Search and explore central and state government schemes in seconds. Discover the benefits you deserve.</p>
          <div className="search-wrap">
            <div className="search-box">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input
                className="search-input"
                type="text"
                placeholder="Search farmer loans, girl education, startup schemes..."
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSug(true); }}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                onFocus={() => setShowSug(true)}
                onBlur={() => setTimeout(() => setShowSug(false), 160)}
              />
              <button className="search-btn" onClick={handleSearch}>Search →</button>
            </div>
            {showSug && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((s, i) => (
                  <div key={i} className="suggestion-item" onMouseDown={() => pick(s)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}