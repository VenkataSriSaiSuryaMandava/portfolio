"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiFolder, FiLink, FiShield, FiZap } from 'react-icons/fi';

/**
 * Highlights
 * A compact, recruiter-friendly snapshot with subtle motion.
 */
export default function Highlights() {
  const reduce = useReducedMotion();

  const chips = useMemo(
    () => [
      'React / Next.js',
      'Backend & APIs',
      'Databases',
      'Cloud',
      'AI / Machine Learning',
      'Performance',
      'TypeScript',
      'Testing',
      'Accessibility',
    ],
    []
  );

  return (
    <section id="highlights" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Highlights
        </motion.h2>

        <motion.p
          className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          A snapshot of the work I’ve built and the impact I’ve delivered
        </motion.p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HighlightCard
            href="#projects"
            accent="0"
            icon={<FiFolder />}
            title={<CountUp7Plus reduce={reduce} />}
            description="Full-stack, academic, and personal applications"
          />

          <HighlightCard
            accent="1"
            icon={<FiLink />}
            title="End-to-End Feature Development"
            description="Frontend, backend, APIs, and database integrations"
          />

          <HighlightCard
            accent="2"
            icon={<FiShield />}
            title="Production-Oriented Engineering"
            description="Clean architecture, testing, and maintainability"
          />

          <HighlightCard
            accent="3"
            icon={<FiZap />}
            title="Performance-Focused Systems"
            description="Optimized APIs, queries, and user experience"
          />
        </div>

        <motion.div
          className="mt-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/20 backdrop-blur-xl px-4 py-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        >
          <SkillsMarquee chips={chips} reduce={reduce} />
        </motion.div>
      </div>
    </section>
  );
}

function SkillsMarquee({
  chips,
  reduce,
}: {
  chips: string[];
  reduce: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // Drag-to-scroll when paused (lets users manually explore on desktop).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const down = (e: PointerEvent) => {
      isDown = true;
      setPaused(true);
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const up = () => {
      isDown = false;
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 text-xs"
          >
            {c}
          </span>
        ))}
      </div>
    );
  }

  const row = chips.map((c) => (
    <span
      key={c}
      className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 text-xs whitespace-nowrap"
    >
      {c}
    </span>
  ));

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className={
            "flex w-max items-center gap-2 pr-2 " +
            (paused ? "[animation-play-state:paused]" : "")
          }
          style={{
            animation: 'chips-marquee 18s linear infinite',
            willChange: 'transform',
          }}
        >
          {row}
          {/* duplicate for seamless loop */}
          {row}
        </div>
      </div>
    </div>
  );
}

function HighlightCard({
  icon,
  title,
  description,
  href,
  accent = "0",
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  href?: string;
  accent?: string;
}) {
  const reduce = useReducedMotion();
  const content = (
    <motion.div
      data-accent={accent}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      whileHover={reduce ? undefined : { y: -2 }}
      className="card-surface card-hover p-5"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-2xl border border-primary/20 bg-primary/10 text-primary p-2.5">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{description}</div>
        </div>
      </div>
    </motion.div>
  );

  if (!href) return content;
  return (
    <a
      href={href}
      className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label="7+ Projects Built"
    >
      {content}
    </a>
  );
}

function CountUp7Plus({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVal(7);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    const duration = 800;
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutQuad
      const eased = 1 - (1 - p) * (1 - p);
      const next = Math.round(eased * 7);
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <span ref={ref}>
      <span className="font-extrabold">{val}+</span> Projects Built
    </span>
  );
}
