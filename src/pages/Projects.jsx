import { useEffect, useState } from 'react';
import { MapPin, Filter } from 'lucide-react';
import { projectsService } from '../services/supabase';
import { projects as staticProjects, projectCategories } from '../data/projects';

export default function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsService.getAll().then(({ data }) => {
      const source = (data && data.length > 0) ? data : staticProjects;
      setAllProjects(source);
      setFiltered(source);
      setLoading(false);
    }).catch(() => {
      setAllProjects(staticProjects);
      setFiltered(staticProjects);
      setLoading(false);
    });
  }, []);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setFiltered(cat === 'All' ? allProjects : allProjects.filter((p) => p.category === cat));
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header__bg">
          <img src="/project_villa_interior.png" alt="Winstone Projects" />
          <div className="page-header__overlay" />
        </div>
        <div className="page-header__content container">
          <span className="section-subtitle">Our Portfolio</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Premium Developments
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '12px', fontSize: '0.95rem' }}>
            Crafted with precision across Bangalore and South India
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', position: 'sticky', top: '68px', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Filter size={14} style={{ color: 'var(--color-gold)' }} />
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              style={{
                padding: '7px 20px',
                fontSize: '0.72rem',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: activeFilter === cat ? 'var(--color-gold)' : 'transparent',
                color: activeFilter === cat ? '#0a0a0a' : 'rgba(255,255,255,0.45)',
                border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--color-gold)' : 'rgba(255,255,255,0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <section className="section section-black">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
              Loading projects...
            </div>
          ) : (
            <div className="projects-grid" style={{ marginTop: 0 }}>
              {filtered.map((project) => (
                <div key={project.id} className="proj-card">
                  <div className="proj-card__img-wrap">
                    <img
                      src={project.image || '/hero_villa.png'}
                      alt={project.title}
                      className="proj-card__img"
                      onError={(e) => { e.target.src = '/hero_villa.png'; }}
                    />
                    <div className="proj-card__overlay" />
                    <span className="proj-card__category">{project.category}</span>
                    {project.status && (
                      <span style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: project.status === 'Available' ? 'rgba(34,197,94,0.9)' : project.status === 'Coming Soon' ? 'rgba(234,179,8,0.9)' : 'rgba(59,130,246,0.9)',
                        color: '#fff',
                        fontSize: '0.62rem', fontWeight: '700', letterSpacing: '1px',
                        textTransform: 'uppercase', padding: '4px 10px',
                      }}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="proj-card__body">
                    <div className="proj-card__location">
                      <MapPin size={13} />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="proj-card__title">{project.title}</h3>
                    <p className="proj-card__desc">{project.description?.slice(0, 130)}...</p>
                    {project.price && (
                      <p style={{ marginTop: '16px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-gold)' }}>
                        {project.price}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '60px 0' }}>
              No projects found for this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
