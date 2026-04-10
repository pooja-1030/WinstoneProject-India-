import './About.css'

const coreValues = [
  'Innovation & Technology',
  'Quality Excellence',
  'Customer-Centric Approach',
  'Sustainable Development',
  'Pan-India Expansion',
  'Community Impact',
]

const companies = [
  {
    name: 'Winstone Projects LLP',
    role: 'Real Estate Development',
    desc: 'Premium real estate development and township projects',
    link: '#',
  },
  {
    name: 'Winstone Motors',
    role: 'Automotive Excellence',
    desc: 'Luxury automotive dealership and services',
    link: '#',
  },
  {
    name: 'Winstone Foundation',
    role: 'Social Impact',
    desc: 'Social impact and community development initiatives',
    link: '#',
  },
]

const leadershipQualities = [
  'Luxury Real Estate',
  'Design-Driven Architecture',
  'Technology Integration',
  'Premium Development',
  'Pan-India Expansion',
  'Award-Winning Projects',
]

export default function About() {
  return (
    <section id="about-us" className="about-section">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <span className="about-label">About Us</span>
          <h2>The Winstone <span className="text-gold">Group</span></h2>
          <div className="section-divider">
            <div className="line" /><div className="dot" /><div className="line" />
          </div>
          <p className="about-intro">
            A diversified conglomerate committed to excellence across multiple
            industries, creating lasting value and meaningful impact in every
            venture we undertake.
          </p>
        </div>

        {/* Main content grid */}
        <div className="about-grid">
          <div className="about-text-col">
            <h3>Building Tomorrow&rsquo;s <span className="text-gold">Legacy</span></h3>
            <p>
              Founded in 2018, the Winstone Group has rapidly evolved into a
              dynamic conglomerate with a clear vision: to redefine excellence
              across diverse industries while maintaining our core values of
              innovation, quality, and customer satisfaction.
            </p>
            <p>
              From premium real estate development to luxury automotive services
              and community-focused social initiatives, we believe in creating
              comprehensive value that extends beyond business success to
              meaningful community impact.
            </p>

            <h4 className="values-heading">Our Core Values</h4>
            <div className="values-grid">
              {coreValues.map((v) => (
                <div key={v} className="value-item">{v}</div>
              ))}
            </div>
          </div>

          <div className="about-stats-col">
            <div className="about-stat-card">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div className="stat-num">6+</div>
              <div className="stat-txt">Years of Excellence</div>
            </div>
            <div className="about-stat-card">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <div className="stat-num">50+</div>
              <div className="stat-txt">Projects Completed</div>
            </div>
            <div className="about-stat-card">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
              <div className="stat-num">3</div>
              <div className="stat-txt">Group Companies</div>
            </div>
            <div className="about-stat-card">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <div className="stat-num">10+</div>
              <div className="stat-txt">Cities</div>
            </div>
          </div>
        </div>

        {/* Companies */}
        <div className="companies-block">
          <h2 className="companies-title">
            Our <span className="text-gold">Companies</span>
          </h2>
          <p className="companies-sub">Three distinct entities, one unified vision of excellence and innovation</p>
          <div className="companies-grid">
            {companies.map((c) => (
              <a key={c.name} href={c.link} className="company-card">
                <div className="company-card-header">
                  <div className="company-avatar">{c.name.charAt(0)}</div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <div className="company-info">
                  <span className="company-role">{c.role}</span>
                  <h4>{c.name}</h4>
                  <p>{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Founder + Mission */}
        <div className="founder-grid">
          <div className="founder-left">
            <div className="founder-card">
              <h3>Nayaz Faiyaz Ahmed</h3>
              <p className="founder-role">Founder &amp; Chairman</p>
            </div>
            <div className="founder-photo">
              <div className="photo-placeholder">NFA</div>
              <p className="founder-mini-quote">
                &ldquo;Excellence is not a destination, but a journey of
                continuous innovation and meaningful impact.&rdquo;
              </p>
            </div>
            <div className="founder-mini-stats">
              <div className="fstat"><span>6+</span><small>Years of Excellence</small></div>
              <div className="fstat"><span>50+</span><small>Projects Completed</small></div>
              <div className="fstat"><span>2000+</span><small>Lives Impacted</small></div>
            </div>
            <a href="#contact" className="know-more-btn">Know More</a>
          </div>

          <div className="founder-right">
            <span className="about-label">Executive Profile</span>
            <h2>Visionary <span className="text-gold">Leadership</span></h2>
            <p>
              Born in Bangalore, Nayaz Faiyaz Ahmed made an early decision to
              pursue real estate despite having a different academic background.
              Since 2017, he has dedicated himself to mastering all aspects of
              the real estate business, founding Winstone Projects LLP in 2018.
            </p>
            <p>
              Through facing competition, challenges, and various obstacles, he
              built remarkable resilience. Today, he manages property development
              and township projects in Bangalore with ambitious plans for
              pan-India growth in luxury real estate development.
            </p>

            <h4 className="values-heading">Core Leadership Qualities</h4>
            <div className="values-grid">
              {leadershipQualities.map((q) => (
                <div key={q} className="value-item">{q}</div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="mission-card">
              <div className="section-divider" style={{ marginBottom: '1rem' }}>
                <div className="line" /><div className="dot" /><div className="line" />
              </div>
              <h3 className="mission-title">Mission <span className="text-gold">Statement</span></h3>
              <blockquote>
                &ldquo;Homes should be more than just spaces to live in; they
                should be architectural experiences. We deliver modern and
                thoughtful design combined with cutting-edge technology to create
                premium properties that stand the test of time.&rdquo;
              </blockquote>
              <div className="section-divider" style={{ marginTop: '1rem' }}>
                <div className="line" /><div className="dot" /><div className="line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
