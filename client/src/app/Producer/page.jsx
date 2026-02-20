'use client';
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --purple: #7B5CF0;
    --purple-light: #9B7EFF;
    --pink: #EC4899;
    --green: #10B981;
    --amber: #F59E0B;
    --blue: #3B82F6;
    --bg: #0A0A0F;
    --surface: #12121A;
    --surface2: #1A1A26;
    --surface3: #20202E;
    --text: #F0F0FF;
    --muted: #8888AA;
    --border: rgba(123,92,240,0.15);
    --border2: rgba(255,255,255,0.06);
  }

  .db-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    display: flex;
    min-height: 100vh;
  }

  /* SIDEBAR */
  .db-sidebar {
    width: 240px;
    min-height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border2);
    display: flex;
    flex-direction: column;
    padding: 1.75rem 1.25rem;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 50;
  }

  .db-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    margin-bottom: 2.5rem;
    padding-left: 0.5rem;
  }
  .db-logo span { color: var(--purple-light); }

  .db-nav { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }

  .db-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  .db-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
  .db-nav-item:hover { color: var(--text); background: var(--surface2); }
  .db-nav-item.active {
    color: var(--purple-light);
    background: rgba(123,92,240,0.12);
    border-color: rgba(123,92,240,0.2);
  }

  .db-nav-section {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #3A3A55;
    padding: 1.25rem 0.85rem 0.5rem;
  }

  .db-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem;
    border-radius: 12px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    margin-top: 1rem;
  }
  .db-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--purple), var(--pink));
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.85rem; color: #fff;
    flex-shrink: 0;
  }
  .db-user-info { min-width: 0; }
  .db-user-name { font-size: 0.85rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .db-user-role { font-size: 0.75rem; color: var(--purple-light); }

  /* MAIN */
  .db-main {
    margin-left: 240px;
    flex: 1;
    padding: 2rem 2.5rem;
    min-height: 100vh;
    background: var(--bg);
  }

  /* TOPBAR */
  .db-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .db-page-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }
  .db-page-sub { font-size: 0.875rem; color: var(--muted); margin-top: 2px; }
  .db-topbar-right { display: flex; gap: 0.75rem; align-items: center; }
  .db-search {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 100px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    width: 200px;
  }
  .db-search svg { width: 16px; height: 16px; flex-shrink: 0; }
  .db-notif {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: var(--surface);
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted);
    transition: all 0.2s; position: relative;
  }
  .db-notif svg { width: 18px; height: 18px; }
  .db-notif:hover { border-color: var(--border); color: var(--text); }
  .db-notif-dot {
    width: 8px; height: 8px;
    background: var(--purple-light);
    border-radius: 50%;
    position: absolute; top: 6px; right: 6px;
    border: 2px solid var(--surface);
  }

  /* ADD PROJECT BTN */
  .db-add-btn {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--purple);
    color: #fff; border: none;
    border-radius: 100px;
    padding: 0.6rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 0 20px rgba(123,92,240,0.3);
  }
  .db-add-btn svg { width: 16px; height: 16px; }
  .db-add-btn:hover { background: var(--purple-light); transform: translateY(-1px); box-shadow: 0 0 30px rgba(123,92,240,0.5); }

  /* GRID LAYOUT */
  .db-grid { display: grid; gap: 1.5rem; }

  .db-row { display: grid; gap: 1.5rem; }
  .db-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .db-cols-3 { grid-template-columns: 2fr 1fr 1fr; }
  .db-cols-2 { grid-template-columns: 1.3fr 1fr; }
  .db-cols-2b { grid-template-columns: 1fr 1fr; }
  .db-cols-3b { grid-template-columns: 1fr 1fr 1fr; }

  /* CARD */
  .db-card {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
    animation: fadeUp 0.5s ease both;
  }
  .db-card:hover { border-color: var(--border); }

  .db-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .db-card-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 100px;
  }

  /* STAT CARDS */
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
    animation: fadeUp 0.5s ease both;
  }
  .stat-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 20px 20px 0 0;
  }
  .stat-card.purple::after { background: linear-gradient(90deg, var(--purple), transparent); }
  .stat-card.green::after { background: linear-gradient(90deg, var(--green), transparent); }
  .stat-card.pink::after { background: linear-gradient(90deg, var(--pink), transparent); }
  .stat-card.amber::after { background: linear-gradient(90deg, var(--amber), transparent); }
  .stat-card:hover { transform: translateY(-3px); border-color: var(--border); }

  .stat-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .stat-icon svg { width: 20px; height: 20px; }
  .stat-icon.purple { background: rgba(123,92,240,0.15); color: var(--purple-light); }
  .stat-icon.green { background: rgba(16,185,129,0.15); color: var(--green); }
  .stat-icon.pink { background: rgba(236,72,153,0.12); color: var(--pink); }
  .stat-icon.amber { background: rgba(245,158,11,0.15); color: var(--amber); }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
  }
  .stat-label { font-size: 0.8rem; color: var(--muted); font-weight: 500; }
  .stat-change {
    font-size: 0.78rem;
    font-weight: 600;
    display: flex; align-items: center; gap: 4px;
  }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--pink); }

  /* PROJECT CARDS */
  .project-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem;
    border-radius: 14px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 0.75rem;
  }
  .project-item:last-child { margin-bottom: 0; }
  .project-item:hover { border-color: var(--border); background: var(--surface3); }
  .project-thumb {
    width: 52px; height: 52px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
  }
  .project-info { flex: 1; min-width: 0; }
  .project-name { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .project-meta { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
  .project-status {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 100px;
    white-space: nowrap;
  }
  .status-live { background: rgba(16,185,129,0.12); color: var(--green); }
  .status-post { background: rgba(245,158,11,0.12); color: var(--amber); }
  .status-dev { background: rgba(123,92,240,0.12); color: var(--purple-light); }

  /* NEWS */
  .news-item {
    display: flex;
    gap: 0.875rem;
    padding: 0.875rem 0;
    border-bottom: 1px solid var(--border2);
  }
  .news-item:last-child { border-bottom: none; padding-bottom: 0; }
  .news-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }
  .news-cat { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 3px; }
  .news-title { font-size: 0.875rem; font-weight: 500; color: var(--text); line-height: 1.4; }
  .news-time { font-size: 0.72rem; color: var(--muted); margin-top: 4px; }

  /* INFLUENCERS */
  .influencer-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border2);
  }
  .influencer-item:last-child { border-bottom: none; }
  .inf-rank { font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--muted); width: 20px; flex-shrink: 0; }
  .inf-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .inf-info { flex: 1; min-width: 0; }
  .inf-name { font-size: 0.875rem; font-weight: 600; color: var(--text); }
  .inf-genre { font-size: 0.75rem; color: var(--muted); }
  .inf-reach { font-family: 'Syne', sans-serif; font-size: 0.875rem; font-weight: 700; color: var(--purple-light); }

  /* TRENDING MEDIA */
  .media-item {
    border-radius: 14px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }
  .media-item:hover { border-color: var(--border); transform: translateY(-2px); }
  .media-thumb {
    height: 100px;
    display: flex; align-items: center; justify-content: center;
    font-size: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .media-play {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .media-item:hover .media-play { opacity: 1; }
  .media-play svg { width: 28px; height: 28px; color: #fff; }
  .media-info { padding: 0.75rem; }
  .media-title { font-size: 0.825rem; font-weight: 600; color: var(--text); margin-bottom: 3px; }
  .media-views { font-size: 0.75rem; color: var(--muted); }

  /* PROFILE CARD */
  .profile-glow {
    position: absolute;
    width: 150px; height: 150px;
    border-radius: 50%;
    background: rgba(123,92,240,0.15);
    filter: blur(40px);
    top: -20px; right: -20px;
  }
  .profile-av {
    width: 60px; height: 60px;
    border-radius: 18px;
    background: linear-gradient(135deg, var(--purple), var(--pink));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 1rem;
  }
  .profile-name { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text); }
  .profile-tag { font-size: 0.8rem; color: var(--purple-light); margin-bottom: 1rem; }
  .profile-stats { display: flex; gap: 1rem; margin-top: 1rem; }
  .profile-stat { text-align: center; }
  .profile-stat-val { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text); }
  .profile-stat-label { font-size: 0.72rem; color: var(--muted); }
  .profile-divider { width: 1px; background: var(--border2); }

  /* CHART TOOLTIP */
  .custom-tooltip {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 0.8rem;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
  }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    position: relative;
    animation: slideUp 0.3s ease;
  }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem; }
  .modal-field { margin-bottom: 1rem; }
  .modal-label { font-size: 0.8rem; font-weight: 600; color: var(--muted); margin-bottom: 0.4rem; letter-spacing: 0.05em; text-transform: uppercase; }
  .modal-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .modal-input:focus { border-color: rgba(123,92,240,0.5); }
  .modal-input::placeholder { color: #44445A; }
  .modal-row { display: flex; gap: 1rem; }
  .modal-row .modal-field { flex: 1; }
  .modal-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
  .modal-cancel {
    flex: 1; padding: 0.75rem;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: 12px; font-size: 0.875rem; font-weight: 600;
    color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .modal-cancel:hover { color: var(--text); border-color: var(--border); }
  .modal-submit {
    flex: 2; padding: 0.75rem;
    background: var(--purple); border: none;
    border-radius: 12px; font-size: 0.875rem; font-weight: 600;
    color: #fff; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .modal-submit:hover { background: var(--purple-light); }
  .modal-close {
    position: absolute; top: 1.25rem; right: 1.25rem;
    width: 30px; height: 30px;
    border-radius: 8px; background: var(--surface2);
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted);
    transition: all 0.2s;
  }
  .modal-close:hover { color: var(--text); }
  .modal-close svg { width: 14px; height: 14px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2A2A3A; border-radius: 10px; }
`;

// Icons
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  film: "M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2zM7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5",
  analytics: "M18 20V10 M12 20V4 M6 20v-6",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
  plus: "M12 5v14 M5 12h14",
  x: "M18 6L6 18 M6 6l12 12",
  play: "M5 3l14 9-14 9V3z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  arrowUp: "M18 15l-6-6-6 6",
};

const analyticsData = [
  { month: "Aug", views: 24000, revenue: 18000 },
  { month: "Sep", views: 38000, revenue: 22000 },
  { month: "Oct", views: 31000, revenue: 25000 },
  { month: "Nov", views: 52000, revenue: 34000 },
  { month: "Dec", views: 47000, revenue: 38000 },
  { month: "Jan", views: 68000, revenue: 52000 },
];

const barData = [
  { name: "Thriller", val: 87 },
  { name: "Drama", val: 64 },
  { name: "Action", val: 52 },
  { name: "Sci-Fi", val: 43 },
  { name: "Romance", val: 31 },
];

const projects = [
  { emoji: "🎬", name: "Neon Requiem", genre: "Thriller • 2024", status: "live", statusLabel: "Live" },
  { emoji: "🌊", name: "The Last Tide", genre: "Drama • Post-Production", status: "post", statusLabel: "Post-Prod" },
  { emoji: "🚀", name: "Orbit Zero", genre: "Sci-Fi • In Dev", status: "dev", statusLabel: "In Dev" },
];

const news = [
  { cat: "Box Office", color: "#7B5CF0", title: "Domestic box office hits $2.1B in Q1 surge led by genre films", time: "2h ago" },
  { cat: "Streaming", color: "#EC4899", title: "Netflix acquires 3 indie titles in landmark $80M deal", time: "5h ago" },
  { cat: "Festival", color: "#F59E0B", title: "Sundance 2025 lineup drops — thriller category dominates", time: "1d ago" },
  { cat: "Industry", color: "#10B981", title: "SAG-AFTRA signs new AI transparency agreement with studios", time: "1d ago" },
];

const influencers = [
  { rank: 1, emoji: "🎥", name: "CinemaVault", genre: "Film Critique", reach: "4.2M", bg: "rgba(123,92,240,0.15)" },
  { rank: 2, emoji: "🍿", name: "PopcornPulse", genre: "Entertainment", reach: "3.8M", bg: "rgba(236,72,153,0.12)" },
  { rank: 3, emoji: "🎭", name: "SceneStealers", genre: "Indie Film", reach: "2.9M", bg: "rgba(245,158,11,0.12)" },
  { rank: 4, emoji: "📽️", name: "ReelTalk", genre: "Reviews & News", reach: "2.1M", bg: "rgba(59,130,246,0.12)" },
];

const media = [
  { emoji: "🎬", title: "Neon Requiem — Official Trailer", views: "1.2M views", bg: "linear-gradient(135deg,#1A0A2E,#2D1B4E)" },
  { emoji: "🎵", title: "Score Preview — Original OST", views: "340K views", bg: "linear-gradient(135deg,#0A1A2E,#1B2D4E)" },
  { emoji: "📸", title: "Behind the Scenes — Day 12", views: "892K views", bg: "linear-gradient(135deg,#1A1A0A,#2E2D1B)" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div style={{ color: "#8888AA", marginBottom: 4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {typeof p.value === "number" && p.value > 999 ? `${(p.value / 1000).toFixed(0)}K` : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProducerDashboard() {
  const emptyForm = { title: "", genre: "", targetCity: "", marketingBudget: "", releaseDate: "", cast: "", description: "" };
  const [form, setForm] = useState(emptyForm);
  const [userProjects, setUserProjects] = useState(projects); // projects = your existing dummy data
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeNav, setActiveNav] = useState("home");
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { id: "home", label: "Dashboard", icon: icons.home },
    { id: "projects", label: "Projects", icon: icons.film },
    { id: "analytics", label: "Analytics", icon: icons.analytics },
    { id: "influencers", label: "Influencers", icon: icons.users },
    { id: "trending", label: "Trending", icon: icons.trending },
    { id: "settings", label: "Settings", icon: icons.settings },
  ];

  const handleAddProject = () => {
    if (!form.title || !form.genre || !form.marketingBudget || !form.targetCity) return;
    const newProject = {
      emoji: "🎬",
      name: form.title,
      genre: `${form.genre} • ${form.targetCity}`,
      status: "dev",
      statusLabel: "In Dev",
      description: form.description,
      marketingBudget: form.marketingBudget,
      releaseDate: form.releaseDate,
      cast: form.cast.split(",").map(c => c.trim()),
    };
    setUserProjects([...userProjects, newProject]);
    setForm(emptyForm);
    setShowModal(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="db-root">

        {/* SIDEBAR */}
        <aside className="db-sidebar">
          <div className="db-logo">Film<span>Sight</span> AI</div>

          <nav className="db-nav">
            <div className="db-nav-section">Main</div>
            {navItems.slice(0, 5).map(item => (
              <div
                key={item.id}
                className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon.split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
                </svg>
                {item.label}
              </div>
            ))}

            <div className="db-nav-section">Account</div>
            <div
              className={`db-nav-item ${activeNav === "settings" ? "active" : ""}`}
              onClick={() => setActiveNav("settings")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {icons.settings.split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
              </svg>
              Settings
            </div>
          </nav>

          <div className="db-user">
            <div className="db-avatar">AJ</div>
            <div className="db-user-info">
              <div className="db-user-name">Alex Johnson</div>
              <div className="db-user-role">Producer</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="db-main">

          {/* TOPBAR */}
          <div className="db-topbar">
            <div>
              <div className="db-page-title">Good morning, Alex 👋</div>
              <div className="db-page-sub">Here's what's happening with your films today.</div>
            </div>
            <div className="db-topbar-right">
              <div className="db-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="6" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search...
              </div>
              <div className="db-notif">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div className="db-notif-dot" />
              </div>
              <button className="db-add-btn" onClick={() => setShowModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Project
              </button>
            </div>
          </div>

          <div className="db-grid" style={{ gap: "1.5rem" }}>

            {/* STAT CARDS */}
            <div className="db-row db-cols-4">
              {[
                { color: "purple", icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", val: "2.4M", label: "Total Views", change: "+18.2%", up: true },
                { color: "green", icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", val: "$148K", label: "Revenue (YTD)", change: "+31.4%", up: true },
                { color: "pink", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", val: "3", label: "Active Projects", change: "+1 new", up: true },
                { color: "amber", icon: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6", val: "87%", label: "Avg Engagement", change: "-2.1%", up: false },
              ].map((s, i) => (
                <div key={i} className={`stat-card ${s.color}`} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={`stat-icon ${s.color}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon.split(" M").map((seg, j) => <path key={j} d={j === 0 ? seg : "M" + seg} />)}
                    </svg>
                  </div>
                  <div className="stat-value">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className={`stat-change ${s.up ? "up" : "down"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={s.up ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                    </svg>
                    {s.change} this month
                  </div>
                </div>
              ))}
            </div>

            {/* ANALYTICS CHART + PROFILE */}
            <div className="db-row db-cols-2">
              <div className="db-card" style={{ animationDelay: "0.35s" }}>
                <div className="db-card-title">
                  Performance Analytics
                  <span className="db-card-badge" style={{ background: "rgba(123,92,240,0.12)", color: "#9B7EFF" }}>Last 6 months</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B5CF0" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#7B5CF0" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#3A3A55" tick={{ fill: "#8888AA", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#3A3A55" tick={{ fill: "#8888AA", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="views" name="Views" stroke="#7B5CF0" strokeWidth={2} fill="url(#gViews)" />
                    <Area type="monotone" dataKey="revenue" name="Revenue $" stroke="#EC4899" strokeWidth={2} fill="url(#gRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="db-card" style={{ animationDelay: "0.42s" }}>
                <div className="profile-glow" />
                <div className="db-card-title">My Profile</div>
                <div className="profile-av">AJ</div>
                <div className="profile-name">Alex Johnson</div>
                <div className="profile-tag">@alexjohnson · Producer</div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  Indie filmmaker based in LA. Specializing in thriller and drama productions since 2018.
                </div>
                <div className="profile-stats">
                  <div className="profile-stat">
                    <div className="profile-stat-val">3</div>
                    <div className="profile-stat-label">Projects</div>
                  </div>
                  <div className="profile-divider" />
                  <div className="profile-stat">
                    <div className="profile-stat-val">2.4M</div>
                    <div className="profile-stat-label">Total Views</div>
                  </div>
                  <div className="profile-divider" />
                  <div className="profile-stat">
                    <div className="profile-stat-val">12</div>
                    <div className="profile-stat-label">Awards</div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECTS + GENRE CHART */}
            <div className="db-row db-cols-2">
              <div className="db-card" style={{ animationDelay: "0.48s" }}>
                <div className="db-card-title">
                  My Projects
                  <span className="db-card-badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>3 Active</span>
                </div>
                {userProjects.map((p, i) => (
                  <div key={i} className="project-item" onClick={() => setSelectedProject(p)}>
                    <div className="project-thumb" style={{ background: "var(--surface3)", fontSize: "1.5rem" }}>{p.emoji}</div>
                    <div className="project-info">
                      <div className="project-name">{p.name}</div>
                      <div className="project-meta">{p.genre}</div>
                    </div>
                    <div className={`project-status status-${p.status}`}>{p.statusLabel}</div>
                  </div>
                ))}
                <button
                  onClick={() => setShowModal(true)}
                  style={{ width: "100%", marginTop: "0.75rem", padding: "0.65rem", background: "rgba(123,92,240,0.08)", border: "1px dashed rgba(123,92,240,0.3)", borderRadius: 12, color: "var(--purple-light)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
                  onMouseOver={e => e.target.style.background = "rgba(123,92,240,0.14)"}
                  onMouseOut={e => e.target.style.background = "rgba(123,92,240,0.08)"}
                >
                  + Add New Project
                </button>
              </div>

              <div className="db-card" style={{ animationDelay: "0.54s" }}>
                <div className="db-card-title">
                  Genre Performance
                  <span className="db-card-badge" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>This Month</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData} layout="vertical" barSize={10}>
                    <XAxis type="number" stroke="#3A3A55" tick={{ fill: "#8888AA", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#3A3A55" tick={{ fill: "#8888AA", fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="val" name="Score" radius={[0, 6, 6, 0]}
                      fill="url(#barGrad)"
                    />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#7B5CF0" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* NEWS + INFLUENCERS + MEDIA */}
            <div className="db-row db-cols-3b">
              {/* TRENDING NEWS */}
              <div className="db-card" style={{ animationDelay: "0.6s" }}>
                <div className="db-card-title">
                  Trending News
                  <span className="db-card-badge" style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}>Live</span>
                </div>
                {news.map((n, i) => (
                  <div key={i} className="news-item">
                    <div className="news-dot" style={{ background: n.color }} />
                    <div>
                      <div className="news-cat" style={{ color: n.color }}>{n.cat}</div>
                      <div className="news-title">{n.title}</div>
                      <div className="news-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOP INFLUENCERS */}
              <div className="db-card" style={{ animationDelay: "0.66s" }}>
                <div className="db-card-title">
                  Top Influencers
                  <span className="db-card-badge" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>Feb 2025</span>
                </div>
                {influencers.map((inf, i) => (
                  <div key={i} className="influencer-item">
                    <div className="inf-rank">{inf.rank}</div>
                    <div className="inf-avatar" style={{ background: inf.bg }}>{inf.emoji}</div>
                    <div className="inf-info">
                      <div className="inf-name">{inf.name}</div>
                      <div className="inf-genre">{inf.genre}</div>
                    </div>
                    <div className="inf-reach">{inf.reach}</div>
                  </div>
                ))}
              </div>

              {/* TRENDING MEDIA */}
              <div className="db-card" style={{ animationDelay: "0.72s" }}>
                <div className="db-card-title">
                  Trending Media
                  <span className="db-card-badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>Your Films</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {media.map((m, i) => (
                    <div key={i} className="media-item">
                      <div className="media-thumb" style={{ background: m.bg }}>
                        <span style={{ fontSize: "2rem", position: "relative", zIndex: 1 }}>{m.emoji}</span>
                        <div className="media-play">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="media-title">{m.title}</div>
                        <div className="media-views">{m.views}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ADD PROJECT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div className="modal-title">Add New Project</div>
            <div className="modal-field">
              <div className="modal-label">Project Title</div>
              <input className="modal-input" placeholder="e.g. The Last Signal" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="modal-row">
              <div className="modal-field">
                <div className="modal-label">Genre</div>
                <select className="modal-input" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })}>
                  <option value="" disabled>Select genre</option>
                  <option>Thriller</option><option>Drama</option><option>Sci-Fi</option><option>Action</option><option>Romance</option>
                </select>
              </div>
              <div className="modal-field">
                <div className="modal-label">Target City</div>
                <input className="modal-input" placeholder="e.g. Mumbai" value={form.targetCity} onChange={e => setForm({ ...form, targetCity: e.target.value })} />
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-field">
                <div className="modal-label">Marketing Budget (USD)</div>
                <input className="modal-input" type="number" placeholder="e.g. 500000" value={form.marketingBudget} onChange={e => setForm({ ...form, marketingBudget: e.target.value })} />
              </div>
              <div className="modal-field">
                <div className="modal-label">Release Date</div>
                <input className="modal-input" type="date" value={form.releaseDate} onChange={e => setForm({ ...form, releaseDate: e.target.value })} />
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-label">Cast (comma separated)</div>
              <input className="modal-input" placeholder="e.g. John Doe, Jane Smith" value={form.cast} onChange={e => setForm({ ...form, cast: e.target.value })} />
            </div>
            <div className="modal-field">
              <div className="modal-label">Description</div>
              <textarea className="modal-input" placeholder="A short synopsis..." rows={3} style={{ resize: "none" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-submit" onClick={handleAddProject}>Create Project</button>
            </div>
          </div>
        </div>
      )}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={() => setSelectedProject(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{selectedProject.emoji}</div>
            <div className="modal-title">{selectedProject.name}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span className="db-card-badge" style={{ background: "rgba(123,92,240,0.12)", color: "#9B7EFF" }}>{selectedProject.genre}</span>
              <span className={`project-status status-${selectedProject.status}`}>{selectedProject.statusLabel}</span>
            </div>
            {selectedProject.description && (
              <div style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{selectedProject.description}</div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {selectedProject.marketingBudget && (
                <div style={{ background: "var(--surface2)", borderRadius: 12, padding: "0.875rem", border: "1px solid var(--border2)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Marketing Budget</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "var(--green)" }}>${Number(selectedProject.marketingBudget).toLocaleString()}</div>
                </div>
              )}
              {selectedProject.releaseDate && (
                <div style={{ background: "var(--surface2)", borderRadius: 12, padding: "0.875rem", border: "1px solid var(--border2)" }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Release Date</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "var(--amber)" }}>{selectedProject.releaseDate}</div>
                </div>
              )}
            </div>
            {selectedProject.cast && selectedProject.cast.length > 0 && selectedProject.cast[0] !== "" && (
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Cast</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {selectedProject.cast.map((c, i) => (
                    <span key={i} style={{ background: "rgba(123,92,240,0.1)", border: "1px solid rgba(123,92,240,0.2)", borderRadius: 100, padding: "4px 12px", fontSize: "0.8rem", color: "var(--purple-light)" }}>{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}