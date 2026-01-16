"use client";

import { motion, useScroll } from 'framer-motion';

/**
 * ScrollProgress displays a thin progress bar at the top of the page that scales
 * horizontally as the user scrolls.  It uses Framer Motion's `useScroll` hook
 * which returns a motion value that we bind to the `scaleX` style property.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-40 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}