'use client';
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --purple: #7B5CF0;
    --purple-light: #9B7EFF;
    --pink: #EC4899;
    --green: #10B981;
    --amber: #F59E0B;
    --bg: #0A0A0F;
    --surface: #12121A;
    --surface2: #1A1A26;
    --surface3: #20202E;
    --text: #F0F0FF;
    --muted: #8888AA;
    --border: rgba(123,92,240,0.15);
    --border2: rgba(255,255,255,0.06);
  }

  .pj-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 2.5rem 3rem;
  }

  .pj-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .pj-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .pj-sub {
    font-size: 0.875rem;
    color: var(--muted);
    margin-top: 3px;
  }

  .pj-add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--purple);
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 0.65rem 1.4rem;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 0 20px rgba(123,92,240,0.3);
  }
  .pj-add-btn:hover { background: var(--purple-light); transform: translateY(-1px); }

  /* FILTER TABS */
  .pj-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.75rem;
  }

  .pj-filter {
    padding: 0.45rem 1rem;
    border-radius: 100px;
    font-size: 0.825rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--border2);
    background: var(--surface);
    color: var(--muted);
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .pj-filter:hover { color: var(--text); border-color: var(--border); }
  .pj-filter.active {
    background: rgba(123,92,240,0.12);
    border-color: rgba(123,92,240,0.35);
    color: var(--purple-light);
  }

  /* EMPTY STATE */
  .pj-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem;
    color: var(--muted);
    text-align: center;
  }
  .pj-empty-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    opacity: 0.4;
  }
  .pj-empty h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
    opacity: 0.6;
  }
  .pj-empty p { font-size: 0.875rem; opacity: 0.5; }

  /* PROJECTS GRID */
  .pj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  .pj-card {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.4s ease both;
  }
  .pj-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--purple), var(--pink));
    opacity: 0;
    transition: opacity 0.25s;
  }
  .pj-card:hover { border-color: var(--border); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .pj-card:hover::before { opacity: 1; }

  .pj-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .pj-emoji {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: var(--surface2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .pj-status {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
  }
  .status-live { background: rgba(16,185,129,0.12); color: var(--green); }
  .status-post { background: rgba(245,158,11,0.12); color: var(--amber); }
  .status-dev { background: rgba(123,92,240,0.12); color: var(--purple-light); }

  .pj-card-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .pj-card-genre {
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: 0.875rem;
  }

  .pj-card-desc {
    font-size: 0.825rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 1.1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pj-card-meta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .pj-meta-chip {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: var(--muted);
    background: var(--surface2);
    border: 1px solid var(--border2);
    padding: 4px 10px;
    border-radius: 100px;
  }
  .pj-meta-chip svg { width: 12px; height: 12px; flex-shrink: 0; }

  /* DETAIL MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.2s ease;
    padding: 2rem;
  }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    max-width: 520px;
    position: relative;
    animation: slideUp 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;
  }
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

  /* ADD MODAL */
  .modal-title { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem; }
  .modal-field { margin-bottom: 1rem; }
  .modal-label { font-size: 0.78rem; font-weight: 600; color: var(--muted); margin-bottom: 0.4rem; letter-spacing: 0.06em; text-transform: uppercase; }
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
  .modal-cancel:hover { color: var(--text); }
  .modal-submit {
    flex: 2; padding: 0.75rem;
    background: var(--purple); border: none;
    border-radius: 12px; font-size: 0.875rem; font-weight: 600;
    color: #fff; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .modal-submit:hover { background: var(--purple-light); }

  /* DETAIL STYLES */
  .detail-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; }
  .detail-name { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 0.4rem; }
  .detail-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .detail-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem; }
  .detail-chip {
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 0.875rem;
  }
  .detail-chip-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .detail-chip-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; }
  .cast-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
  .cast-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .cast-tag {
    background: rgba(123,92,240,0.1);
    border: 1px solid rgba(123,92,240,0.2);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.8rem;
    color: var(--purple-light);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2A2A3A; border-radius: 10px; }
`;

const emptyForm = { title: "", genre: "", targetCity: "", marketingBudget: "", releaseDate: "", cast: "", description: "", link: "" };
const dummyProjects = [
    { emoji: "🎬", name: "Neon Requiem", genre: "Thriller", targetCity: "Los Angeles", status: "live", statusLabel: "Live", marketingBudget: "800000", releaseDate: "2024-11-15", cast: ["Jake Morrison", "Priya Nair"], description: "A neo-noir thriller set in the neon-soaked streets of future LA, following a detective unraveling a conspiracy." },
    { emoji: "🌊", name: "The Last Tide", genre: "Drama", targetCity: "New York", status: "post", statusLabel: "Post-Prod", marketingBudget: "500000", releaseDate: "2025-03-20", cast: ["Elena Cruz", "David Park"], description: "A deeply personal drama about a family navigating loss and renewal on the coast of Maine." },
    { emoji: "🚀", name: "Orbit Zero", genre: "Sci-Fi", targetCity: "Mumbai", status: "dev", statusLabel: "In Dev", marketingBudget: "1200000", releaseDate: "2025-08-10", cast: ["Arjun Mehta"], description: "When the last space station loses contact with Earth, its crew must decide who to trust." },
];

const filters = ["All", "Live", "Post-Prod", "In Dev"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState(dummyProjects);
    const [activeFilter, setActiveFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter(p => p.statusLabel === activeFilter);

    const handleAdd = () => {
        if (!form.title || !form.genre || !form.marketingBudget || !form.targetCity) return;
        const newProject = {
            emoji: "🎬",
            name: form.title,
            genre: form.genre,
            targetCity: form.targetCity,
            status: "dev",
            statusLabel: "In Dev",
            link: form.link,  
            description: form.description,
            marketingBudget: form.marketingBudget,
            releaseDate: form.releaseDate,
            cast: form.cast ? form.cast.split(",").map(c => c.trim()).filter(Boolean) : [],
        };
        setProjects([...projects, newProject]);
        setForm(emptyForm);
        setShowModal(false);
    };

    return (
        <>
            <style>{styles}</style>
            <div className="pj-root">

                {/* HEADER */}
                <div className="pj-header">
                    <div>
                        <div className="pj-title">My Projects</div>
                        <div className="pj-sub">{projects.length} project{projects.length !== 1 ? "s" : ""} total</div>
                    </div>
                    <button className="pj-add-btn" onClick={() => setShowModal(true)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Project
                    </button>
                </div>

                {/* FILTERS */}
                <div className="pj-filters">
                    {filters.map(f => (
                        <button key={f} className={`pj-filter ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
                    ))}
                </div>

                {/* GRID */}
                {filtered.length === 0 ? (
                    <div className="pj-empty">
                        <div className="pj-empty-icon">🎬</div>
                        <h3>No projects here yet</h3>
                        <p>Add your first project to get started.</p>
                    </div>
                ) : (
                    <div className="pj-grid">
                        {filtered.map((p, i) => (
                            <div key={i} className="pj-card" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => setSelectedProject(p)}>
                                <div className="pj-card-top">
                                    <div className="pj-emoji">{p.emoji}</div>
                                    <span className={`pj-status status-${p.status}`}>{p.statusLabel}</span>
                                </div>
                                <div className="pj-card-name">{p.name}</div>
                                <div className="pj-card-genre">{p.genre} · {p.targetCity}</div>
                                <div className="modal-field">
                                    <div className="modal-label">Link / URL</div>
                                    <input className="modal-input" placeholder="e.g. https://imdb.com/title/..." value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                                </div>
                                {p.description && <div className="pj-card-desc">{p.description}</div>}
                                <div className="pj-card-meta">
                                    {p.marketingBudget && (
                                        <div className="pj-meta-chip">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                            ${Number(p.marketingBudget).toLocaleString()}
                                        </div>
                                    )}
                                    {p.releaseDate && (
                                        <div className="pj-meta-chip">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {p.releaseDate}
                                        </div>
                                    )}
                                    {p.cast && p.cast.length > 0 && p.cast[0] !== "" && (
                                        <div className="pj-meta-chip">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            {p.cast.length} cast
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PROJECT DETAIL MODAL */}
            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-close" onClick={() => setSelectedProject(null)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <div className="detail-emoji">{selectedProject.emoji}</div>
                        <div className="detail-name">{selectedProject.name}</div>
                        <div className="detail-tags">
                            <span className="cast-tag">{selectedProject.genre}</span>
                            <span className="cast-tag" style={{ background: "rgba(236,72,153,0.1)", borderColor: "rgba(236,72,153,0.2)", color: "var(--pink)" }}>{selectedProject.targetCity}</span>
                            <span className={`pj-status status-${selectedProject.status}`}>{selectedProject.statusLabel}</span>
                        </div>
                        {selectedProject.link && (
                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--purple-light)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", marginBottom: "1.25rem" }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                Visit Link
                            </a>
                        )}
                        {selectedProject.description && <div className="detail-desc">{selectedProject.description}</div>}
                        <div className="detail-grid">
                            {selectedProject.marketingBudget && (
                                <div className="detail-chip">
                                    <div className="detail-chip-label">Marketing Budget</div>
                                    <div className="detail-chip-val" style={{ color: "var(--green)" }}>${Number(selectedProject.marketingBudget).toLocaleString()}</div>
                                </div>
                            )}
                            {selectedProject.releaseDate && (
                                <div className="detail-chip">
                                    <div className="detail-chip-label">Release Date</div>
                                    <div className="detail-chip-val" style={{ color: "var(--amber)" }}>{selectedProject.releaseDate}</div>
                                </div>
                            )}
                        </div>
                        {selectedProject.cast && selectedProject.cast.length > 0 && selectedProject.cast[0] !== "" && (
                            <div>
                                <div className="cast-label">Cast</div>
                                <div className="cast-tags">
                                    {selectedProject.cast.map((c, i) => <span key={i} className="cast-tag">{c}</span>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
                            <div className="modal-label">Link / URL</div>
                            <input className="modal-input" placeholder="e.g. https://imdb.com/title/..." value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <div className="modal-label">Description</div>
                            <textarea className="modal-input" placeholder="A short synopsis..." rows={3} style={{ resize: "none" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="modal-actions">
                            <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="modal-submit" onClick={handleAdd}>Create Project</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}