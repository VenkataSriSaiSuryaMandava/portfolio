"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * MeshGradient
 * Premium, lightweight background: softly animated blobs + noise overlay.
 * No canvas / three.js required, so it stays fast and mobile-friendly.
 */
export default function MeshGradient() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(99,102,241,0.35),transparent_55%),radial-gradient(900px_circle_at_90%_20%,rgba(236,72,153,0.28),transparent_55%),radial-gradient(800px_circle_at_50%_90%,rgba(34,197,94,0.18),transparent_60%)]" />

      {/* Moving blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 60, -20, 0],
                y: [0, 30, 80, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 -right-28 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, -80, 30, 0],
                y: [0, -40, -70, 0],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.5\"/%3E%3C/svg%3E')",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-black/60" />
    </div>
  );
}
