import { useState } from 'react'
import './Projects.css'

const projects = [
  {
    title: 'Sobha Elwood',
    category: 'Real Estate',
    year: '2021',
    status: 'Active',
    location: 'Bangalore',
    price: '₹1.8 Cr onwards',
    description:
      'Unique farm and lifestyle properties that blend luxury with nature, offering premium country living experiences with modern amenities and thoughtful design.',
    features: [
      'Premium country living',
      'Modern amenities',
      'Nature-integrated design',
      'Smart home features',
      'Gated community',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    title: 'Luxury Residential Township',
    category: 'Real Estate',
    year: '2023',
    status: 'Active',
    location: 'Bangalore',
    price: '₹1.2 Cr - ₹4 Cr',
    description:
      'Comprehensive residential township featuring modern amenities, sustainable planning, and community-focused development with luxury standards.',
    features: [
      'Integrated township',
      'Sustainable planning',
      'Community spaces',
      'World-class amenities',
      'Premium interiors',
    ],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    title: 'Smart City Project',
    category: 'Real Estate',
    year: '2024',
    status: 'Active',
    location: 'Bangalore',
    price: '₹1 Cr - ₹3 Cr',
    description:
      'A futuristic smart city development integrating IoT, green energy, and modern urban planning to create a connected, sustainable living environment.',
    features: [
      'IoT-enabled living',
      'Green energy systems',
      'Smart infrastructure',
      'Connected community',
      'Sustainable design',
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    title: 'Commercial Spaces',
    category: 'Real Estate',
    year: '2021',
    status: 'Completed',
    location: 'Bangalore',
    price: '₹50 L - ₹2 Cr',
    description:
      'Premium commercial office and retail spaces in prime Bangalore locations, designed for modern enterprises with cutting-edge facilities.',
    features: [
      'Grade-A offices',
      'Prime locations',
      'Modern facilities',
      'Ample parking',
      'Retail zones',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <h2>
            Our <span className="text-gold">Projects</span>
          </h2>
          <div className="section-divider">
            <div className="line" /><div className="dot" /><div className="line" />
          </div>
          <p className="projects-desc">
            Specialized portfolio of luxury real estate developments across
            India, focusing on residential, commercial, and leisure properties
            with premium design-driven architecture.
          </p>
        </div>

        {/* Featured Project */}
        <div className="project-featured">
          <div className="featured-image">
            <img src={project.image} alt={project.title} />
            <button className="play-btn" aria-label="Play video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </button>
            <span className="featured-tag">{project.category}</span>
          </div>
          <div className="featured-details">
            <div className="featured-meta">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <span className="meta-year">{project.year}</span>
              <span className={`meta-status status-${project.status.toLowerCase()}`}>
                &bull; {project.status}
              </span>
            </div>
            <h3 className="featured-title">{project.title}</h3>
            <p className="featured-desc">{project.description}</p>

            <ul className="featured-features">
              {project.features.map((f, i) => (
                <li key={i}>
                  <span className="feature-dot" />
                  {f}
                </li>
              ))}
            </ul>

            <a href="#contact" className="featured-btn">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Dots */}
        <div className="project-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`pdot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>

        {/* Grid Cards */}
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`project-card ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="card-top">
                <div className="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                </div>
                <div className="card-thumb">
                  <img src={p.image} alt={p.title} />
                </div>
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.description}</p>
              <span className="card-category">{p.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
