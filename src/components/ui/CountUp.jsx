import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

function extractNumber(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
}

function formatNumber(num, original) {
  const suffix = original.replace(/[0-9,]/g, '');
  return num >= 1000 ? num.toLocaleString('en-IN') + suffix : num + suffix;
}

/**
 * React Bits-style CountUp — counts up when scrolled into view.
 * Usage: <CountUp value="1,200+" className="hero__stat-value" />
 */
export default function CountUp({ value, className = '', duration = 1800 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const target = extractNumber(value);

  useEffect(() => {
    if (!isInView || target === 0) return;
    let current = 0;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(formatNumber(Math.floor(current), value));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, target, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
