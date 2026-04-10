import { useEffect, useState } from 'react';
import { MapPin, Filter, ExternalLink } from 'lucide-react';
import { portfolioService } from '../services/supabase';
import { portfolio as staticPortfolio, portfolioCategories } from '../data/portfolio';

const statusColors = {
  Completed: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80' },
  Ongoing:   { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  Upcoming:  { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
};

export default function Portfolio() {
  const [all, setAll]             = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [activeFilter, setFilter] = useState('All');
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    portfolioService.getAll()
      .then(({ data }) => {
        const source = data && data.length > 0 ? data : staticPortfolio;
        setAll(source);
        setFiltered(source);
      })
      .catch(() => {
        setAll(staticPortfolio);
        setFiltered(staticPortfolio);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setFilter(cat);
    setFiltered(cat === 'All' ? all : all.filter((p) => p.category === cat));
  };

  return (
    <>
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header__bg">
          <img src="/winstone-projects-B0mWZxEY.jpg" alt="Winstone Portfolio" />
          <div className="page-header__overlay" />
        </div>
        <div className="page-header__content container">
          <span className="section-subtitle">Our Work</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Portfolio
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '12px', fontSize: '0.95rem' }}>
            Completed and ongoing developments across Bangalore and South India
          </p>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="portfolio-filter-bar">
        <div className="container portfolio-filter-inner">
          <Filter size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`portfolio-filter-btn${activeFilter === cat ? ' portfolio-filter-btn--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section section-black">
        <div className="container">
          {loading ? (
            <div className="portfolio-loading">Loading portfolio…</div>
          ) : filtered.length === 0 ? (
            <p className="portfolio-empty">No items found for this category.</p>
          ) : (
            <div className="portfolio-grid">
              {filtered.map((item) => {
                const sc = statusColors[item.status] || statusColors.Completed;
                return (
                  <div key={item.id} className="pf-card">
                    {/* Image */}
                    <div className="pf-card__img-wrap">
                      <img
                        src={item.image || '/hero_villa.png'}
                        alt={item.title}
                        className="pf-card__img"
                        onError={(e) => { e.target.src = '/hero_villa.png'; }}
                      />
                      <div className="pf-card__img-overlay" />

                      {/* Category pill */}
                      <span className="pf-card__category">{item.category}</span>

                      {/* Status badge */}
                      {item.status && (
                        <span
                          className="pf-card__status"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {item.status}
                        </span>
                      )}

                      {/* Year */}
                      {item.year && (
                        <span className="pf-card__year">{item.year}</span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="pf-card__body">
                      <h3 className="pf-card__title">{item.title}</h3>
                      <p className="pf-card__desc">
                        {item.description?.slice(0, 130)}
                        {item.description?.length > 130 ? '…' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="cta-banner__content container">
          <h2 className="cta-banner__title">Inspired by Our Work?</h2>
          <p className="cta-banner__sub">
            Let's discuss how we can build your vision in Bangalore.
          </p>
          <div className="cta-banner__actions">
            <a href="/contact" className="btn">Get in Touch</a>
            <a href="/projects" className="btn btn-outline">See Current Projects</a>
          </div>
        </div>
      </section>
    </>
  );
}
