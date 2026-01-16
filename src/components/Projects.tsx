"use client";

import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import SectionReveal from '@/components/ui/SectionReveal';
import { projects } from '@/data/data';

/**
 * Projects (2026-level)
 * - Minimal by default: name + 1-line tagline + tech badges + links
 * - Desktop: hover/focus updates a sticky detail panel (no layout jumps)
 * - Mobile: tap to expand details (no hover required)
 */
export default function Projects() {
  const reduce = useReducedMotion();
  const items = useMemo(() => projects, []);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  const activeProject = items[Math.min(active, items.length - 1)];

  return (
    <section id="projects" className="py-24 px-6">
      <SectionReveal>
        <SectionHeading
          title="Projects"
          subtitle="Minimal by default, rich on interaction — designed for recruiters who scan fast and dive deeper when it matters."
        />
      </SectionReveal>

      <SectionReveal>
        <div className="mx-auto max-w-6xl mt-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            {/* Left: minimal list */}
            <div data-accent="0" className="card-surface card-hover overflow-hidden">
              <ul>
                {items.map((p, idx) => {
                  const isActive = idx === active;
                  const isOpenMobile = openMobile === idx;

                  return (
                    <li key={p.title} className="border-b border-gray-200/60 dark:border-gray-800/60 last:border-b-0">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onFocus={() => setActive(idx)}
                        onClick={() => setOpenMobile((prev) => (prev === idx ? null : idx))}
                        className={`w-full text-left px-5 sm:px-6 py-5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                          isActive
                            ? 'bg-primary/5'
                            : 'hover:bg-gray-50/70 dark:hover:bg-gray-900/30'
                        }`}
                        aria-expanded={isOpenMobile}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg sm:text-xl font-semibold tracking-tight break-words">
                                {p.title}
                              </h3>
                              <span className="hidden sm:inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
                                Details
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {p.tagline}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {p.tech.slice(0, 6).map((t) => (
                                <span
                                  key={t}
                                  className="text-xs px-3 py-1 rounded-full bg-gray-100/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200"
                                >
                                  {t}
                                </span>
                              ))}
                              {p.tech.length > 6 && (
                                <span className="text-xs px-3 py-1 rounded-full bg-gray-100/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200">
                                  +{p.tech.length - 6}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-3 pt-1">
                            {p.github ? (
                              <a
                                href={p.github}
                                target={p.github.startsWith('http') ? '_blank' : undefined}
                                rel={p.github.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                                aria-label={`Open ${p.title} ${p.githubLabel ?? 'GitHub'}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                GitHub
                              </a>
                            ) : null}

                            {p.demo ? (
                              <a
                                href={p.demo}
                                target={p.demo.startsWith('http') ? '_blank' : undefined}
                                rel={p.demo.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                                aria-label={`Open ${p.title} ${p.demoLabel ?? 'Demo'}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Demo
                              </a>
                            ) : null}

                            {(p.github || p.demo) ? (
                              <span className="text-gray-400" aria-hidden>
                                ▸
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* Mobile: inline expand */}
                        <div className="lg:hidden">
                          <AnimatePresence initial={false}>
                            {isOpenMobile && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: reduce ? 0 : 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-4">
                                  <p className="text-sm text-gray-700 dark:text-gray-200">{p.description}</p>
                                  {p.highlights?.length ? (
                                    <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
                                      {p.highlights.slice(0, 4).map((h) => (
                                        <li key={h}>{h}</li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: sticky hover-reveal details (desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <motion.div
                  key={activeProject.title}
                  data-accent={(active % 6).toString()}
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="card-surface card-hover shadow-sm p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs tracking-wide text-gray-500 dark:text-gray-400">Details</div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight">{activeProject.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{activeProject.description}</p>
                    </div>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
                      Hover
                    </span>
                  </div>

                  {activeProject.highlights?.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
                      {activeProject.highlights.slice(0, 5).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeProject.tech.slice(0, 10).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-gray-100/70 dark:bg-gray-900/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3">
                    {activeProject.github ? (
                      <a
                      href={activeProject.github}
                      target={activeProject.github?.startsWith("http") ? "_blank" : undefined}
                              rel={activeProject.github?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/30 p-4 hover:bg-white dark:hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <div className="text-sm font-medium">GitHub Repository</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">{activeProject.github}</div>
                    </a>
                    ) : null}

                    {activeProject.demo ? (
                      <a
                        href={activeProject.demo}
                        target={activeProject.github?.startsWith("http") ? "_blank" : undefined}
                              rel={activeProject.github?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/30 p-4 hover:bg-white dark:hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <div className="text-sm font-medium">Live Demo</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">{activeProject.demo}</div>
                      </a>
                    ) : null}
                  </div>


                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}