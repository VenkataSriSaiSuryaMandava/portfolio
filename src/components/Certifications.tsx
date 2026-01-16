"use client";

import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import SectionReveal from '@/components/ui/SectionReveal';
import { certifications } from '@/data/certifications';

/**
 * Licenses & Certifications
 * A clean, recruiter-friendly section editable via src/data/certifications.ts
 */
export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <SectionReveal>
        <SectionHeading
          title="Licenses & Certifications"
          subtitle="Industry-recognized credentials that validate hands-on skills and real-world knowledge."
        />
      </SectionReveal>

      <div className="mx-auto max-w-6xl mt-10">
        {/* One-by-one layout (no side-by-side) to ensure details never feel cramped/truncated */}
        <div className="grid gap-6">
          {certifications.map((c, idx) => {
            const href = c.credentialUrl || '#';
            const { issued, expires } = parseIssuedExpires(c.date);

            return (
              <SectionReveal key={`${c.title}-${idx}`}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-accent={(idx % 6).toString()}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: idx * 0.02 }}
                  className="group relative block card-surface card-hover p-6 shadow-[0_18px_80px_-60px_rgba(0,0,0,0.35)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={`View certificate: ${c.title}`}
                >
                  {/* Decorative rail */}
                  <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div className="h-full w-1.5 rounded-l-3xl bg-gradient-to-b from-primary/55 via-primary/15 to-secondary/30" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                          {c.title}
                        </h3>
                        {/* Details shown below in the meta grid (keeps header clean and avoids redundancy). */}
                      </div>

                      <span className="shrink-0 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
                        View Certificate →
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <Meta label="Issuer" value={c.issuer} />
                      <Meta label="Credential ID" value={c.credentialId || '—'} mono />
                      <Meta label="Date Issued" value={issued || '—'} />
                      <Meta label="Expires" value={expires || 'No Expiry'} />
                    </div>

                    {c.skills?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1 rounded-full bg-gray-100/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.a>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function parseIssuedExpires(dateText: string): { issued?: string; expires?: string } {
  // Expected formats:
  // "Issued: September 18, 2025 · Expires: September 18, 2028"
  // "Issued: February 26, 2023 · No Expiry"
  const issuedMatch = dateText.match(/Issued:\s*([^·]+)/i);
  const expiresMatch = dateText.match(/Expires:\s*(.+)$/i);

  const issued = issuedMatch?.[1]?.trim();
  const expiresRaw = expiresMatch?.[1]?.trim();
  const expires = expiresRaw && expiresRaw.length ? expiresRaw : undefined;

  return { issued, expires };
}

function Meta({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/55 dark:bg-black/20 px-4 py-3">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
      <div className={`mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 ${mono ? 'font-mono break-all' : ''}`}>
        {value}
      </div>
    </div>
  );
}
