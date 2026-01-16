"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TiltCard
 * Lightweight 3D tilt on hover using pointer position.
 * Great for project cards and skill cards. (No WebGL.)
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={"[transform-style:preserve-3d] " + className}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      onPointerMove={(e) => {
        if (!ref.current || reduce) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -10;
        const ry = (px - 0.5) * 10;
        ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }}
      onPointerLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
