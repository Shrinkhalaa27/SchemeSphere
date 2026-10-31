import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters, { CATEGORIES } from "./components/Filters";
import SchemeCard from "./components/SchemeCard";
import StatsSection from "./components/StatsSection";
import PrivacySection from "./components/PrivacySection";
import FeedbackSection from "./components/FeedbackSection";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import { fetchSchemes, fetchTrending } from "./utils/api";

export default function App() {
  const [schemes, setSchemes] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "All", targetGroup: "All", schemeType: "All", sort: "popular" });
  const [activeCategory, setActiveCategory] = useState("All");

  const loadSchemes = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.q = searchQuery;
      if (filters.category !== "All") params.category = filters.category;
      if (filters.targetGroup !== "All") params.targetGroup = filters.targetGroup;
      if (filters.schemeType !== "All") params.schemeType = filters.schemeType;
      if (filters.sort === "latest") params.sort = "latest";
      const data = await fetchSchemes(params);
      setSchemes(data.data || []);
    } catch { setSchemes([]); }
    finally { setLoading(false); }
  }, [searchQuery, filters]);

  useEffect(() => { loadSchemes(); }, [loadSchemes]);
  useEffect(() => { fetchTrending().then(d => setTrending(d.data || [])).catch(() => {}); }, []);

  const handleSearch = (q) => { setSearchQuery(q); setActiveCategory("All"); setFilters(f => ({ ...f, category: "All" })); };
  const handleCat = (cat) => { setActiveCategory(cat); setFilters(f => ({ ...f, category: cat })); setSearchQuery(""); };

  return (
    <>
      <style>{`
        .main-content { padding-top: 70px; }
        .section { max-width:1140px; margin:0 auto; padding:4rem 1.5rem; }
        .section-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2rem; gap:1rem; flex-wrap:wrap; }
        .section-title { font-family:var(--font-head); font-size:clamp(1.5rem,3vw,2.1rem); font-weight:800; }
        .section-title span { color:var(--teal); }
        .section-sub { color:var(--muted); font-size:0.875rem; margin-top:0.3rem; }
        .clear-btn { color:var(--teal); font-size:0.8rem; font-weight:600; background:none; border:none; cursor:pointer; }
        .scheme-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(310px,1fr)); gap:1.25rem; }
        .cat-pills { display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:1.75rem; }
        .cat-pill { padding:0.45rem 1.1rem; border-radius:100px; border:1px solid var(--card-border); background:var(--card-bg); color:var(--muted); font-size:0.8rem; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .cat-pill.active { background:rgba(0,212,180,0.12); border-color:rgba(0,212,180,0.35); color:var(--teal); }
        .cat-pill:hover:not(.active) { border-color:rgba(255,255,255,0.15); color:var(--text); }
        .empty-state { text-align:center; padding:5rem 2rem; color:var(--muted); }
        .empty-icon { font-size:3.5rem; margin-bottom:1rem; }
        .empty-state h3 { font-family:var(--font-head); font-size:1.2rem; color:var(--text); margin-bottom:0.5rem; }
        .empty-state button { margin-top:1rem; background:rgba(0,212,180,0.1); border:1px solid rgba(0,212,180,0.25); color:var(--teal); padding:0.5rem 1.25rem; border-radius:100px; cursor:pointer; font-size:0.85rem; }
        .loading-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(310px,1fr)); gap:1.25rem; }
        .skeleton { background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:20px; height:220px; border:1px solid var(--card-border); }
        .divider { height:1px; background:var(--card-border); max-width:1140px; margin:0 auto; }
        .trending-list { display:flex; flex-direction:column; gap:0.75rem; }
        .trending-item { display:flex; align-items:center; gap:1rem; background:var(--card-bg); border:1px solid var(--card-border); border-radius:16px; padding:1rem 1.25rem; cursor:pointer; transition:all 0.2s; animation:fadeUp 0.5s ease both; }
        .trending-item:hover { background:rgba(255,255,255,0.06); transform:translateX(4px); border-color:rgba(255,255,255,0.12); }
        .trending-num { font-family:var(--font-head); font-size:0.75rem; font-weight:800; color:var(--muted); width:22px; text-align:center; }
        .trending-icon { width:42px; height:42px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0; background:linear-gradient(135deg,#00d4b4,#4f6ef7); }
        .trending-info { flex:1; }
        .trending-name { font-family:var(--font-head); font-size:0.9rem; font-weight:700; }
        .trending-meta { color:var(--muted); font-size:0.75rem; margin-top:0.15rem; }
        .trending-arrow { color:var(--muted); transition:all 0.2s; }
        .trending-item:hover .trending-arrow { color:var(--teal); transform:translateX(3px); }
      `}</style>

      <Navbar />
      <main className="main-content">
        <Hero onSearch={handleSearch} />
        <Filters filters={filters} onChange={setFilters} />

        <section className="section" id="schemes">
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse <span>Schemes</span></h2>
              <p className="section-sub">{loading ? "Loading..." : `${schemes.length} schemes found${searchQuery ? ` for "${searchQuery}"` : ""}`}</p>
            </div>
            {searchQuery && <button className="clear-btn" onClick={() => { setSearchQuery(""); setActiveCategory("All"); setFilters(f => ({ ...f, category: "All" })); }}>Clear search ×</button>}
          </div>
          <div className="cat-pills">
            {CATEGORIES.map(c => (
              <button key={c} className={`cat-pill${activeCategory === c ? " active" : ""}`} onClick={() => handleCat(c)}>{c}</button>
            ))}
          </div>
          {loading ? (
            <div className="loading-grid">{[...Array(6)].map((_, i) => <div key={i} className="skeleton" />)}</div>
          ) : schemes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No schemes found</h3>
              <p>Try adjusting your search or filters.</p>
              <button onClick={() => { setSearchQuery(""); setFilters({ category: "All", targetGroup: "All", schemeType: "All", sort: "popular" }); setActiveCategory("All"); }}>Reset filters</button>
            </div>
          ) : (
            <div className="scheme-grid">
              {schemes.map((s, i) => <SchemeCard key={s.id} scheme={s} delay={i * 50} />)}
            </div>
          )}
        </section>

        <div className="divider" />

        <section className="section" id="trending">
          <div className="section-header">
            <div>
              <h2 className="section-title">🔥 Trending <span>Schemes</span></h2>
              <p className="section-sub">Most searched government schemes this week</p>
            </div>
          </div>
          <div className="trending-list">
            {trending.map((s, i) => (
              <div key={s.id} className="trending-item" style={{ animationDelay: `${i * 70}ms` }}
                onClick={() => { handleSearch(s.name); document.getElementById("schemes")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span className="trending-num">#{i + 1}</span>
                <div className="trending-icon">{s.icon}</div>
                <div className="trending-info">
                  <div className="trending-name">{s.name}</div>
                  <div className="trending-meta">{s.category} · {s.state} Govt · Since {s.launchedYear}</div>
                </div>
                <svg className="trending-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </section>

        <StatsSection />
        <PrivacySection />
        <FeedbackSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}