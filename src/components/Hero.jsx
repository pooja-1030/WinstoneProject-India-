import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from './ui/CountUp';
import './Hero.css';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const stats = [
  { v: '42+',    l: 'Projects'  },
  { v: '1,200+', l: 'Families'  },
  { v: '850+',   l: 'Acres'     },
  { v: '6+',     l: 'Years'     },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img src="/hero_villa.png" alt="Luxury Villa Bangalore" className="hero__bg-img" />
        <div className="hero__overlay" />
        <div className="hero__overlay-gradient" />
      </div>

      {/* Animated side line */}
      <motion.div
        className="hero__scroll-line"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Content */}
      <motion.div
        className="hero__content container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div className="hero__label" variants={item}>
          <MapPin size={12} />
          <span>Bangalore, India · Est. 2018</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero__title" variants={item}>
          Redefining Luxury<br />
          <span className="hero__title-gold">Living in Bangalore</span>
        </motion.h1>

        {/* Ornament */}
        <motion.div className="hero__ornament" variants={item}>
          <motion.div
            className="hero__ornament-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            style={{ transformOrigin: 'left' }}
          />
          <div className="hero__ornament-diamond" />
          <motion.div
            className="hero__ornament-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p className="hero__subtitle" variants={item}>
          Premium villas and developments crafted for modern Indian lifestyles
        </motion.p>

        {/* Buttons */}
        <motion.div className="hero__actions" variants={item}>
          <Link to="/projects" className="hero__btn hero__btn--gold">
            View Projects <ArrowRight size={18} />
          </Link>
          <Link to="/portfolio" className="hero__btn hero__btn--ghost">
            View Portfolio
          </Link>
          <Link to="/contact" className="hero__btn hero__btn--outline">
            Contact Us
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div className="hero__stats" variants={item}>
          {stats.map((s) => (
            <div key={s.l} className="hero__stat">
              <CountUp value={s.v} className="hero__stat-value" />
              <span className="hero__stat-label">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
