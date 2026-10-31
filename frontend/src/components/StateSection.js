import React, { useEffect, useState } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { fetchStats } from "../utils/api";

function StatCard({ icon, label, value, suffix = "" }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState({ totalSchemes: 15, centralSchemes: 15, stateSchemes: 0, categories: 6, beneficiariesCrore: 85 });

  useEffect(() => {
    fetchStats().then(d => { if (d.success) setStats(d.data); }).catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .stats-section { background:linear-gradient(135deg, rgba(79,110,247,0.07), rgba(0,212,180,0.05)); border-top:1px solid var(--card-border); border-bottom:1px solid var(--card-border); padding:5rem 1.5rem; }
        .stats-inner { max-width:1140px; margin:0 auto; }
        .stats-header { text-align:center; margin-bottom:3.5rem; }
        .stats-title { font-family:var(--font-head); font-size:clamp(1.6rem,3.5vw,2.2rem); font-weight:800; }
        .stats-title span { color:var(--teal); }
        .stats-sub { color:var(--muted); font-size:0.9rem; margin-top:0.4rem; }
        .stats-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:2rem; }
        .stat-card { text-align:center; padding:2rem 1rem; background:var(--card-bg); border:1px solid var(--card-border); border-radius:20px; transition:transform 0.2s; }
        .stat-card:hover { transform:translateY(-3px); }
        .stat-icon { font-size:2rem; margin-bottom:0.75rem; }
        .stat-number { font-family:var(--font-head); font-size:clamp(2.5rem,5vw,3.2rem); font-weight:800; background:linear-gradient(135deg,var(--teal),var(--indigo)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; }
        .stat-label { color:var(--muted); font-size:0.85rem; margin-top:0.5rem; }
        @media(max-width:480px) { .stats-grid { grid-template-columns:1fr 1fr; } }
      `}</style>
      <section className="stats-section">
        <div className="stats-inner">
          <div className="stats-header">
            <h2 className="stats-title">Impact by the <span>Numbers</span></h2>
            <p className="stats-sub">Comprehensive government scheme coverage across India</p>
          </div>
          <div className="stats-grid">
            <StatCard icon="📋" label="Total Schemes Listed" value={stats.totalSchemes} />
            <StatCard icon="🏛️" label="Central Schemes" value={stats.centralSchemes} />
            <StatCard icon="🗺️" label="State Schemes" value={stats.stateSchemes} />
            <StatCard icon="🏷️" label="Categories Covered" value={stats.categories} />
            <StatCard icon="👥" label="Crore Beneficiaries" value={stats.beneficiariesCrore} suffix="Cr+" />
          </div>
        </div>
      </section>
    </>
  );
}we