import { CheckCircle, Award, Clock, ShieldCheck, Users } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <>
      <div className="section section-dark" style={{ paddingTop: '150px', paddingBottom: '60px' }}>
        <div className="container text-center">
          <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>Why Choose Us</h1>
          <p className="hero-subtitle-text" style={{ margin: '0 auto' }}>
            The trusted name in Bangalore's luxury real estate market
          </p>
        </div>
      </div>

      <section className="section section-black">
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'flex-start' }}>
            
            <div>
              <span className="section-subtitle">Our Promise</span>
              <h2 className="section-title">Setting the Standard for Luxury Real Estate in India</h2>
              <p style={{ marginBottom: '30px', color: '#ccc', fontSize: '1.1rem' }}>
                Choosing Winstone Projects means partnering with a developer who understands the nuances of the local market while delivering global standards of luxury and sustainability.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <Award size={40} className="feature-icon" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Local Expertise in Bangalore</h3>
                    <p style={{ color: '#aaa' }}>Decades of combined experience navigating Karnataka's real estate sector, ensuring prime locations and smooth execution.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <ShieldCheck size={40} className="feature-icon" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Transparent Pricing</h3>
                    <p style={{ color: '#aaa' }}>An absolute commitment to honesty. No hidden fees, clear documentation, and complete financial transparency from day one.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <CheckCircle size={40} className="feature-icon" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>High-Quality Construction</h3>
                    <p style={{ color: '#aaa' }}>We source only the finest materials and employ top-tier engineers to ensure our properties stand the test of time.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <Clock size={40} className="feature-icon" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Modern Architecture</h3>
                    <p style={{ color: '#aaa' }}>Innovative designs that blend aesthetic brilliance with functional, sustainable, and smart-home ready living spaces.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <Users size={40} className="feature-icon" style={{ flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Customer-First Approach</h3>
                    <p style={{ color: '#aaa' }}>We prioritize your needs at every step, offering personalized consultation and dedicated post-handover support.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ position: 'sticky', top: '120px', padding: '40px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #333' }}>
              <h3 className="section-title" style={{ fontSize: '2rem' }}>Ready to Experience Luxury?</h3>
              <p style={{ color: '#aaa', marginBottom: '30px' }}>Join hundreds of satisfied homeowners and investors who have trusted Winstone Projects.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <a href="tel:+918012345678" className="btn btn-outline" style={{ textAlign: 'center' }}>Call Us Now</a>
                <a href="/contact" className="btn" style={{ textAlign: 'center' }}>Schedule a Consultation</a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
