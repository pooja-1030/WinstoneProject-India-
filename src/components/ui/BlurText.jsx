import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * React Bits-style BlurText — animates each word in with a blur filter.
 * Usage: <BlurText text="Your Heading" className="section-title" delay={0.1} />
 */
export default function BlurText({ text, className = '', delay = 0, tag = 'span' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
