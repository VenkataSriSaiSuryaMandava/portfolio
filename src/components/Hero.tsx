"use client";

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import MeshGradient from '@/components/ui/MeshGradient';

/**
 * Hero section displays your name, professional title with a typing effect,
 * a short tagline and call‑to‑action buttons.  It uses motion animations
 * for the headline and subtitle to create a polished first impression.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const phrases = useMemo(
    () => [
      'Frontend And Backend Systems',
      'Cloud-Ready, Scalable Applications',
      'AI & Machine Learning–Driven Solutions',
    ],
    []
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const highlightKeys = useMemo(() => ['frontend', 'backend', 'cloud', 'ai'] as const, []);
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setPhraseIndex((p) => (p + 1) % phrases.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [phrases.length, reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setHighlightIndex((i) => (i + 1) % highlightKeys.length);
    }, 820);
    return () => window.clearInterval(id);
  }, [highlightKeys.length, reduce]);

  const activeKey = highlightKeys[highlightIndex];

  function Word({ children, active }: { children: string; active: boolean }) {
    return (
      <motion.span
        className="relative inline-block"
        animate={
          reduce
            ? undefined
            : active
              ? { opacity: 1, filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.35))' }
              : { opacity: 0.78, filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' }
        }
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <span className={active ? 'bg-gradient-to-r from-primary/90 via-sky-300/80 to-violet-300/70 bg-clip-text text-transparent' : ''}>
          {children}
        </span>
        <span
          aria-hidden
          className={
            active
              ? 'pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-primary/60 via-sky-300/60 to-violet-300/60 opacity-70'
              : 'pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full opacity-0'
          }
        />
      </motion.span>
    );
  }

  function AnimatedLine() {
    const current = phrases[phraseIndex];
    // Render each phrase with targeted highlight words.
    if (current === phrases[0]) {
      return (
        <span>
          <Word active={activeKey === 'frontend'}>Frontend</Word> And{' '}
          <Word active={activeKey === 'backend'}>Backend</Word> Systems
        </span>
      );
    }
    if (current === phrases[1]) {
      return (
        <span>
          <Word active={activeKey === 'cloud'}>Cloud</Word>-Ready, Scalable Applications
        </span>
      );
    }
    return (
      <span>
        <Word active={activeKey === 'ai'}>AI</Word> &amp;{' '}
        <Word active={activeKey === 'ai'}>Machine Learning</Word>–Driven Solutions
      </span>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      {/* Premium animated background */}
      <MeshGradient />

      {/* Profile photo */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full p-[2px] bg-gradient-to-br from-primary/60 via-secondary/30 to-emerald-400/30 shadow-xl shadow-primary/15">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-white/60 dark:bg-black/30 backdrop-blur">
            <Image
              src="/profile.png"
              alt="Profile photo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 128px, 144px"
            />
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Venkata Sri Sai Surya Mandava
      </motion.h1>

      {/* Primary line (static) */}
      <motion.h2
        className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        I Build Reliable, High-Performance Software
      </motion.h2>

      {/* Secondary line (animated swap + subtle keyword highlight) */}
      <div className="mt-4 min-h-[2.25rem] sm:min-h-[2.5rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <AnimatedLine />
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <MagneticButton>
          <motion.a
            href="#projects"
            aria-label="Jump to projects section"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="px-8 py-3 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            View Projects
          </motion.a>
        </MagneticButton>

        <MagneticButton>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume PDF"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="px-8 py-3 rounded-full border border-primary/50 text-primary dark:text-primary bg-white/10 dark:bg-black/10 backdrop-blur hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            Download Resume
          </motion.a>
        </MagneticButton>
      </div>

      <motion.div
        className="mt-12 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Open to Work
        </span>
        <span className="hidden sm:inline text-gray-500 dark:text-gray-400">|</span>
        <span className="hidden sm:inline">Location: <span className="font-medium">United States</span></span>
      </motion.div>
    </section>
  );
}