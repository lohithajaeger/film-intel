'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .role-section {
    min-height: 100vh;
    background: #0A0A0F;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .role-bg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
  }

  .role-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7B5CF0;
    margin-bottom: 1rem;
    opacity: 0;
    animation: fadeUp 0.5s ease 0.1s forwards;
  }

  .role-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    color: #fff;
    text-align: center;
    margin-bottom: 0.75rem;
    letter-spacing: -0.03em;
    opacity: 0;
    animation: fadeUp 0.5s ease 0.2s forwards;
  }

  .role-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    color: #8888AA;
    text-align: center;
    margin-bottom: 3.5rem;
    max-width: 420px;
    line-height: 1.6;
    opacity: 0;
    animation: fadeUp 0.5s ease 0.3s forwards;
  }

  .role-cards {
    display: flex;
    gap: 2rem;
    opacity: 0;
    animation: fadeUp 0.5s ease 0.4s forwards;
  }

  @media (max-width: 600px) {
    .role-cards { flex-direction: column; gap: 1.25rem; }
  }

  .role-card {
    position: relative;
    width: 240px;
    border-radius: 24px;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    border: 2px solid transparent;
    background: #12121A;
    transition: all 0.35s ease;
    overflow: hidden;
  }

  .role-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 22px;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .role-card.producer::before {
    background: radial-gradient(ellipse at top, rgba(123,92,240,0.18) 0%, transparent 70%);
  }

  .role-card.promoter::before {
    background: radial-gradient(ellipse at top, rgba(236,72,153,0.15) 0%, transparent 70%);
  }

  .role-card:hover::before,
  .role-card.active::before {
    opacity: 1;
  }

  .role-card.producer:hover,
  .role-card.producer.active {
    border-color: #7B5CF0;
    box-shadow: 0 0 40px rgba(123,92,240,0.25), inset 0 1px 0 rgba(255,255,255,0.06);
    transform: translateY(-6px);
  }

  .role-card.promoter:hover,
  .role-card.promoter.active {
    border-color: #EC4899;
    box-shadow: 0 0 40px rgba(236,72,153,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
    transform: translateY(-6px);
  }

  .role-icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  .role-card:hover .role-icon-wrap { transform: scale(1.1); }

  .producer .role-icon-wrap { background: rgba(123,92,240,0.15); }
  .promoter .role-icon-wrap { background: rgba(236,72,153,0.12); }

  .producer .role-icon-wrap svg { color: #9B7EFF; }
  .promoter .role-icon-wrap svg { color: #F472B6; }

  .role-icon-wrap svg { width: 30px; height: 30px; }

  .role-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #F0F0FF;
    position: relative;
    z-index: 1;
  }

  .role-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: #8888AA;
    text-align: center;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }

  .role-btn {
    margin-top: 0.5rem;
    padding: 10px 28px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .producer .role-btn {
    background: rgba(123,92,240,0.15);
    color: #9B7EFF;
    border: 1px solid rgba(123,92,240,0.35);
  }

  .producer:hover .role-btn,
  .producer.active .role-btn {
    background: #7B5CF0;
    color: #fff;
    border-color: #7B5CF0;
  }

  .promoter .role-btn {
    background: rgba(236,72,153,0.12);
    color: #F472B6;
    border: 1px solid rgba(236,72,153,0.3);
  }

  .promoter:hover .role-btn,
  .promoter.active .role-btn {
    background: #EC4899;
    color: #fff;
    border-color: #EC4899;
  }

  .role-divider {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: #3A3A55;
    align-self: center;
    user-select: none;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProducerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
);

const PromoterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

export default function RoleSelection({ onSelect }) {

    const [active, setActive] = useState(null);
const router = useRouter();

const handleSelect = (role) => {
  setActive(role);
  if (role === "producer") router.push("/Producer");
  if (onSelect) onSelect(role);
};

    return (
        <>
            <style>{styles}</style>
            <section className="role-section">
                {/* Background glows */}
                <div className="role-bg-glow" style={{ width: 500, height: 500, background: "rgba(123,92,240,0.08)", top: "-10%", left: "-10%" }} />
                <div className="role-bg-glow" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.07)", bottom: "-10%", right: "-5%" }} />

                <p className="role-label">Get Started</p>
                <h2 className="role-heading">Who are you?</h2>
                <p className="role-subtext">Choose your role to unlock the tools built specifically for you.</p>

                <div className="role-cards">
                    <div
                        className={`role-card producer ${active === "producer" ? "active" : ""}`}
                        onClick={() => handleSelect("producer")}
                    >
                        <div className="role-icon-wrap"><ProducerIcon /></div>
                        <span className="role-title">Producer</span>
                        <p className="role-desc">Manage your film's full marketing lifecycle from release to revenue.</p>
                        <button className="role-btn">I'm a Producer</button>
                    </div>

                    <div className="role-divider">or</div>

                    <div
                        className={`role-card promoter ${active === "promoter" ? "active" : ""}`}
                        onClick={() => handleSelect("promoter")}
                    >
                        <div className="role-icon-wrap"><PromoterIcon /></div>
                        <span className="role-title">Promoter</span>
                        <p className="role-desc">Discover films to champion and connect audiences to great stories.</p>
                        <button className="role-btn">I'm a Promoter</button>
                    </div>
                </div>
            </section>
        </>
    );
}