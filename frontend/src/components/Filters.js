import React from "react";

const CATEGORIES = ["All", "Education", "Women", "Business", "Agriculture", "Health"];
const TARGET_GROUPS = ["All", "Girls", "Students", "Farmers", "Entrepreneurs", "Senior Citizens"];
const SCHEME_TYPES = ["All", "Central Govt", "State Govt"];

export { CATEGORIES };

export default function Filters({ filters, onChange }) {
  const { category, targetGroup, schemeType, sort } = filters;
  const upd = (k, v) => onChange({ ...filters, [k]: v });

  return (
    <>
      <style>{`
        .filters-section { max-width:1140px; margin:0 auto; padding:0 1.5rem 3rem; }
        .filters-card { background:var(--card-bg); backdrop-filter:blur(20px); border:1px solid var(--card-border); border-radius:22px; padding:1.6rem 2rem; box-shadow:0 8px 32px rgba(0,0,0,0.2); }
        .filters-row { display:flex; flex-wrap:wrap; gap:1rem; align-items:flex-end; }
        .filter-group { display:flex; flex-direction:column; gap:0.4rem; flex:1; min-width:140px; }
        .filter-label { font-size:0.68rem; font-weight:600; letter-spacing:0.07em; color:var(--muted); text-transform:uppercase; }
        .filter-select { background:rgba(255,255,255,0.05); border:1px solid var(--card-border); color:var(--text); padding:0.6rem 2.2rem 0.6rem 0.9rem; border-radius:11px; font-family:var(--font-body); font-size:0.85rem; outline:none; cursor:pointer; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237b8bb2' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; background-color:rgba(255,255,255,0.05); transition:border-color 0.2s; }
        .filter-select:focus { border-color:rgba(0,212,180,0.4); }
        .filter-select option { background:#0c1832; }
        .toggle-row { display:flex; gap:0.5rem; }
        .toggle-btn { padding:0.6rem 1.1rem; border-radius:11px; border:1px solid var(--card-border); background:transparent; color:var(--muted); font-family:var(--font-body); font-size:0.8rem; cursor:pointer; transition:all 0.2s; }
        .toggle-btn.active { background:rgba(0,212,180,0.12); border-color:rgba(0,212,180,0.3); color:var(--teal); }
        @media(max-width:768px) { .filters-row { flex-direction:column; } .filter-group { min-width:100%; } }
      `}</style>
      <div className="filters-section">
        <div className="filters-card">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">State</label>
              <select className="filter-select">
                <option>All States</option><option>Maharashtra</option><option>Delhi</option>
                <option>Karnataka</option><option>Tamil Nadu</option><option>Uttar Pradesh</option><option>Odisha</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select className="filter-select" value={category} onChange={e => upd("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Target Group</label>
              <select className="filter-select" value={targetGroup} onChange={e => upd("targetGroup", e.target.value)}>
                {TARGET_GROUPS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Scheme Type</label>
              <select className="filter-select" value={schemeType} onChange={e => upd("schemeType", e.target.value)}>
                {SCHEME_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <div className="toggle-row">
                <button className={`toggle-btn${sort === "popular" ? " active" : ""}`} onClick={() => upd("sort", "popular")}>Popular</button>
                <button className={`toggle-btn${sort === "latest" ? " active" : ""}`} onClick={() => upd("sort", "latest")}>Latest</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}