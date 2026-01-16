"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

/**
 * MagneticButton
 * Adds a subtle "magnetic" hover feel by translating the child based on cursor position.
 * Wrap interactive elements (like <a> or <button>) to get micro-interaction.
 */
export default function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.2 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.2 });

  return (
    <motion.div
      ref={ref}
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      onMouseMove={(e) => {
        if (!ref.current || reduce) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.12);
        y.set(dy * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
