'use client';
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --purple: #7B5CF0;
    --purple-light: #9B7EFF;
    --purple-dark: #5B3FD0;
    --accent: #A78BFA;
    --bg: #0A0A0F;
    --surface: #12121A;
    --surface2: #1A1A26;
    --text: #F0F0FF;
    --muted: #8888AA;
    --border: rgba(123,92,240,0.2);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(123,92,240,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(91,63,208,0.15) 0%, transparent 50%),
      url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80') center/cover no-repeat;
    filter: brightness(0.25) saturate(1.5);
    z-index: 0;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 70%, var(--bg) 100%);
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(123,92,240,0.15);
    border: 1px solid rgba(123,92,240,0.4);
    border-radius: 100px;
    padding: 8px 20px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    animation: fadeUp 0.6s ease both;
  }

  .badge svg { width: 16px; height: 16px; }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #fff;
    animation: fadeUp 0.6s ease 0.1s both;
    margin-bottom: 1.25rem;
  }

  .hero h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.4rem, 4vw, 2.2rem);
    font-weight: 400;
    color: rgba(255,255,255,0.8);
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s ease 0.2s both;
  }

  .hero h2 span { color: var(--purple-light); font-weight: 700; }

  .hero p {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: var(--muted);
    max-width: 580px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
    animation: fadeUp 0.6s ease 0.3s both;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 18px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeUp 0.6s ease 0.4s both;
    box-shadow: 0 0 40px rgba(123,92,240,0.4);
    position: relative;
    overflow: hidden;
  }

  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(123,92,240,0.6); }
  .cta-btn:hover::before { opacity: 1; }

  .features-section {
    padding: 0 2rem 6rem;
    position: relative;
    z-index: 2;
  }

  .features-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 900px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .features-grid { grid-template-columns: 1fr; }
  }

  .feature-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    transition: all 0.3s ease;
    animation: fadeUp 0.6s ease both;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(123,92,240,0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover { border-color: rgba(123,92,240,0.5); transform: translateY(-4px); background: var(--surface2); }
  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    width: 44px;
    height: 44px;
    background: rgba(123,92,240,0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    color: var(--accent);
  }

  .feature-icon svg { width: 22px; height: 22px; }

  .feature-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .feature-card p {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
  }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1.25rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(20px);
    background: rgba(10,10,15,0.6);
    border-bottom: 1px solid rgba(123,92,240,0.1);
  }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .nav-logo span { color: var(--purple-light); }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--text); }

  .nav-cta {
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 10px 22px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }

  .nav-cta:hover { background: var(--purple-light); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 1;
  }
`;

const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const InfluencerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const FilmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const features = [
  { icon: <AnalyticsIcon />, title: "Content Analytics", desc: "Real-time performance insights across all your marketing channels." },
  { icon: <TargetIcon />, title: "Smart Targeting", desc: "AI-powered audience matching to reach the right viewers." },
  { icon: <InfluencerIcon />, title: "Influencer Match", desc: "Perfect creator partnerships tailored to your film's genre." },
  { icon: <BudgetIcon />, title: "Budget Optimizer", desc: "Maximize your ROI with intelligent spend allocation." },
];

export default function FilmSightLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <nav className="nav" style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none" }}>
        <div className="nav-logo">Film<span>Sight</span> AI</div>
        <ul className="nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Case Studies</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <button className="nav-cta">Get Started</button>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        {/* Glow orbs */}
        <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(123,92,240,0.2)", top: "10%", left: "60%" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(91,63,208,0.15)", bottom: "20%", left: "10%" }} />

        <div className="hero-content">
          <div className="badge">
            <SparkIcon />
            Powered by AI Intelligence
          </div>

          <h1>FilmSight AI</h1>
          <h2>From Production to <span>Discovery</span></h2>
          <p>
            Empower your film with data-driven marketing intelligence. Optimize budgets, discover influencers, and reach your perfect audience.
          </p>

          <button className="cta-btn">
            <FilmIcon />
            Analyze My Film
          </button>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}