import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo, navLinks, socialMedia } from '../data/constants';
import './Footer.css';

// Brand social icons as inline SVG (lucide-react has no brand icons)
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socials = [
  { href: socialMedia.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { href: socialMedia.twitter,   Icon: TwitterXIcon,  label: 'Twitter / X' },
  { href: socialMedia.linkedin,  Icon: LinkedinIcon,  label: 'LinkedIn' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* ── Top CTA Bar ── */}
      <div className="footer__top">
        <div className="container footer__top-inner">
          <span className="footer__top-text">Bangalore's Most Trusted Luxury Developer</span>
          <Link to="/contact" className="footer__top-cta">Start a Conversation</Link>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="footer__main container">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/winstonelogo.jpg" alt="Winstone Projects" />
            <div>
              <span className="footer__logo-name">WINSTONE</span>
              <span className="footer__logo-sub">PROJECTS</span>
            </div>
          </Link>
          <p className="footer__brand-desc">
            Redefining luxury living in Bangalore since 2018. Premium villas,
            residential, and commercial developments across India.
          </p>

          {/* Social icons — Instagram & Twitter prominently */}
          <div className="footer__socials">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer__social-btn">
                <Icon />
              </a>
            ))}
          </div>

          {/* Social labels row */}
          <div className="footer__social-labels">
            <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="footer__social-label">
              <InstagramIcon /> @winstoneprojects
            </a>
            <a href={socialMedia.twitter} target="_blank" rel="noreferrer" className="footer__social-label">
              <TwitterXIcon /> @winstoneprojects
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__col-list">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="footer__col-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="footer__col">
          <h4 className="footer__col-title">Our Projects</h4>
          <ul className="footer__col-list">
            {[
              'Whitefield Villas',
              'Koramangala Residences',
              'Sarjapur Township',
              'Indiranagar Commercial',
              'Mysore Heritage Palms',
              'Devanahalli Plots',
            ].map((p) => (
              <li key={p}>
                <Link to="/projects" className="footer__col-link">{p}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <ul className="footer__contact-list">
            <li>
              <MapPin size={15} />
              <span>{contactInfo.address}</span>
            </li>
            <li>
              <Phone size={15} />
              <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            </li>
            <li>
              <Mail size={15} />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
          </ul>
          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="footer__whatsapp"
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Winstone Projects. All Rights Reserved.</p>
          <div className="footer__bottom-social">
            <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="footer__bottom-social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={socialMedia.twitter} target="_blank" rel="noreferrer" className="footer__bottom-social-link" aria-label="Twitter">
              <TwitterXIcon />
            </a>
          </div>
          <p>Crafted with excellence · Bangalore, India · RERA Registered</p>
        </div>
      </div>
    </footer>
  );
}
