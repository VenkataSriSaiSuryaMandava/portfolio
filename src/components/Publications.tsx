"use client";

import SectionHeading from '@/components/SectionHeading';
import SectionReveal from '@/components/ui/SectionReveal';
import { publications } from '@/data/data';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Publications() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get('highlight');

  const highlightId = useMemo(() => (highlight ? String(highlight) : null), [highlight]);

  useEffect(() => {
    if (!highlightId) return;
    const el = document.getElementById(`pub-${highlightId}`);
    if (!el) return;
    // Small delay so layout is stable after navigation.
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  }, [highlightId]);

  return (
    <section id="publications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionReveal>
        <SectionHeading
          title="Publications"
          subtitle="Peer-reviewed papers and technical writing"
        />
      </SectionReveal>

      <div className="mt-10 grid grid-cols-1 gap-6">
        {publications.map((pub, idx) => {
          const isHighlighted = !!highlightId && pub.id === highlightId;

          return (
            <SectionReveal key={pub.title} delay={idx * 0.03}>
              <motion.article
                id={pub.id ? `pub-${pub.id}` : undefined}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
                className={[
                  "group card-surface card-hover p-6 shadow-[0_18px_80px_-60px_rgba(0,0,0,0.35)] transition",
                  isHighlighted ? "ring-1 ring-primary/30 border-primary/40 shadow-primary/15" : ""
                ].join(" ")}
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 break-words">
                    {pub.title}
                  </h3>

                  {/* Match the certificate-style meta blocks (no truncation) */}
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Meta label="Publication" value={pub.venue} />
                    <Meta label="Date" value={pub.date} />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700/90 dark:text-gray-300/90 break-words">
                    {pub.description}
                  </p>

                  <div className="mt-5">
                    {/* Match the 'View Certificate' pill styling */}
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/40"
                      aria-label={`Read publication: ${pub.title}`}
                    >
                      Read Publication →
                    </a>
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/55 dark:bg-black/20 px-4 py-3">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 break-words">
        {value}
      </div>
    </div>
  );
}
