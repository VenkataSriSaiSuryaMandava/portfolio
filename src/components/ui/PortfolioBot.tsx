"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

export default function PortfolioBot() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-52 rounded-2xl border border-white/10 bg-black/70 p-3 shadow-2xl backdrop-blur-xl"
          >
            <p className="mb-1 text-sm font-semibold text-white">
              Hi, I’m Sai 🤖
            </p>
            <p className="mb-3 text-[11px] text-gray-300">
              Quick shortcuts
            </p>

            <div className="grid grid-cols-2 gap-2">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-gray-200 transition hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-gray-200 transition hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Sai assistant"
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-500/80 via-violet-500/70 to-sky-500/70 shadow-[0_0_30px_rgba(99,102,241,0.45)] backdrop-blur-md"
        animate={
          reduce
            ? undefined
            : {
                y: [0, -6, 0],
                rotate: [0, 4, -4, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1020]">
          <div className="absolute top-3 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          </div>
          <div className="absolute bottom-3 h-1.5 w-5 rounded-full bg-white/80" />
        </div>

        {!open && (
          <motion.span
            className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-black"
            animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            !
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}