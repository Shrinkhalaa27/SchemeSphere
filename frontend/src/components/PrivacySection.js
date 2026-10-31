import React, { useState } from "react";

const TABS = ["Data Privacy", "Terms of Use", "Disclaimer", "Contact & Grievance"];
const content = {
  "Data Privacy": [
    { title: "Information We Collect", text: "SchemeSphere collects only minimum necessary information: search queries to improve suggestions, feedback form submissions including name and email, and anonymized technical data. We do NOT collect Aadhaar, PAN, or any financial information." },
    { title: "Use of Your Information", text: "Information is used solely for improving scheme search accuracy and responding to feedback. All feedback is reviewed by our team at 2330403@kiit.ac.in and 2330417@kiit.ac.in. We do NOT sell or share your data with third parties for any purpose." },
    { title: "Data Retention & Deletion", text: "Feedback submissions are retained for 12 months. Search logs are anonymized after 6 months. To request deletion of your data, email 2330403@kiit.ac.in — requests processed within 30 working days per the IT Act 2008." },
    { title: "Data Security", text: "All data transmissions are secured using TLS encryption. Servers are hosted in India. We conduct periodic security audits following OWASP guidelines. Users will be notified within 72 hours in the event of any data breach." },
  ],
  "Terms of Use": [
    { title: "Nature of Platform", text: "SchemeSphere is an informational aggregation platform only. It is NOT affiliated with, endorsed by, or an official portal of the Government of India. Users must verify all information with official government portals before taking any action." },
    { title: "Accuracy of Information", text: "While we ensure accuracy, government policies change frequently. SchemeSphere cannot guarantee the completeness or timeliness of information. Always visit official government portals linked on each scheme card for the most current information." },
    { title: "AI Chatbot Disclaimer", text: "SchemeBot AI assistant is for informational guidance only and should NOT be construed as legal, financial, or governmental advice. Always verify AI-generated scheme guidance with official government sources before making any decisions." },
    { title: "Permitted Use", text: "SchemeSphere is for personal, non-commercial, informational use only. Users may not scrape, crawl, or use the platform for commercial purposes without written permission from the development team." },
  ],
  "Disclaimer": [
    { title: "Not an Official Government Portal", text: "SchemeSphere is an independent student-developed platform and is NOT an official government website. It is NOT affiliated with the Government of India, NIC, or any ministry or department. Scheme names are used for informational purposes under fair use." },
    { title: "No Guarantee of Benefits", text: "Listing a scheme on SchemeSphere does NOT guarantee that any individual will receive benefits. Eligibility determination and benefit disbursement are solely at the discretion of the relevant government authority." },
    { title: "Financial & Legal Disclaimer", text: "Nothing on this platform constitutes financial, legal, or professional advice. Loan amounts, subsidy rates, and interest rates are subject to change by government authorities. Consult a qualified financial advisor before making financial decisions." },
    { title: "Third-Party Links", text: "SchemeSphere contains links to official government portals. We are not responsible for the content or availability of these external sites. Use of linked official portals is subject to those sites own terms and conditions." },
  ],
  "Contact & Grievance": [
    { title: "Primary Contact", text: "For all queries, feedback, data correction, and support — email us at 2330403@kiit.ac.in (Primary) or 2330417@kiit.ac.in (Secondary). We aim to respond to all genuine inquiries within 5 working days." },
    { title: "Grievance Redressal", text: "Grievances under the Information Technology Act 2000 can be submitted to 2330403@kiit.ac.in. Data privacy complaints will be addressed within 30 days as per applicable Indian law." },
    { title: "Government Helplines", text: "PM-KISAN Helpline: 155261 | Ayushman Bharat: 14555 | MUDRA Yojana: 1800-180-1111 | Startup India: 1800-11-5565 | National Scholarship Portal: 0120-6619540 | General Citizen Services: Dial 1076" },
  ],
};

export default function PrivacySection() {
  const [active, setActive] = useState("Data Privacy");

  return (
    <>
      <style>{`
        .privacy-section { max-width:1140px; margin:0 auto; padding:5rem 1.5rem; }
        .privacy-card { background:var(--card-bg); border:1px solid var(--card-border); border-radius:24px; overflow:hidden; }
        .privacy-header { padding:2.5rem; background:linear-gradient(135deg,rgba(79,110,247,0.1),rgba(0,212,180,0.06)); border-bottom:1px solid var(--card-border); }
        .privacy-header h2 { font-family:var(--font-head); font-size:1.6rem; font-weight:800; margin-bottom:0.5rem; }
        .privacy-header h2 span { color:var(--teal); }
        .privacy-header p { color:var(--muted); font-size:0.875rem; }
        .privacy-tabs { display:flex; border-bottom:1px solid var(--card-border); overflow-x:auto; }
        .ptab { padding:1rem 1.5rem; border:none; background:transparent; color:var(--muted); font-family:var(--font-body); font-size:0.82rem; cursor:pointer; transition:all 0.2s; white-space:nowrap; border-bottom:2px solid transparent; margin-bottom:-1px; }
        .ptab.active { color:var(--teal); border-bottom-color:var(--teal); background:rgba(0,212,180,0.04); }
        .ptab:hover:not(.active) { color:var(--text); }
        .privacy-body { padding:2rem 2.5rem; }
        .privacy-clause { margin-bottom:2rem; }
        .clause-num { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:rgba(0,212,180,0.12); color:var(--teal); font-family:var(--font-head); font-size:0.75rem; font-weight:800; margin-bottom:0.6rem; }
        .clause-title { font-family:var(--font-head); font-size:1rem; font-weight:700; margin-bottom:0.5rem; }
        .clause-text { color:var(--muted); font-size:0.85rem; line-height:1.8; }
        .privacy-updated { font-size:0.72rem; color:var(--muted); padding:1rem 2.5rem; border-top:1px solid var(--card-border); }
        @media(max-width:600px) { .privacy-body { padding:1.5rem; } .privacy-header { padding:1.5rem; } }
      `}</style>
      <section className="privacy-section" id="privacy">
        <div className="privacy-card">
          <div className="privacy-header">
            <h2>Privacy Policy & <span>Legal</span></h2>
            <p>Transparency about how we handle your data and operate this platform</p>
          </div>
          <div className="privacy-tabs">
            {TABS.map(t => (
              <button key={t} className={`ptab${active === t ? " active" : ""}`} onClick={() => setActive(t)}>{t}</button>
            ))}
          </div>
          <div className="privacy-body">
            {(content[active] || []).map((c, i) => (
              <div key={i} className="privacy-clause">
                <div className="clause-num">{i + 1}</div>
                <div className="clause-title">{c.title}</div>
                <div className="clause-text">{c.text}</div>
              </div>
            ))}
          </div>
          <div className="privacy-updated">Last updated: January 2025 · Version 1.2 · KIIT University</div>
        </div>
      </section>
    </>
  );
}