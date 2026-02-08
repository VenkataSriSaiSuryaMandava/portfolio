"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";
import { certifications } from "@/data/certifications";

const INITIAL_VISIBLE = 3;

export default function Certifications() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const visibleCerts = expanded
    ? certifications
    : certifications.slice(0, INITIAL_VISIBLE);

  function toggleExpanded() {
    setExpanded((prev) => {
      const next = !prev;

      // When collapsing, scroll back to the certifications section
      if (prev && sectionRef.current) {
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }

      return next;
    });
  }

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <SectionReveal>
        <SectionHeading
          title="Licenses & Certifications"
          subtitle="Industry-recognized credentials that validate hands-on skills and real-world knowledge."
        />
      </SectionReveal>

      <div className="mx-auto max-w-6xl mt-10">
        <motion.div layout className="grid gap-6">
          <AnimatePresence>
            {visibleCerts.map((c, idx) => {
              const href = c.credentialUrl || "#";
              const { issued, expires } = parseIssuedExpires(c.date);

              return (
                <SectionReveal key={`${c.title}-${idx}`}>
                  <motion.a
                    layout
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.4 }}
                    className="group relative block card-surface card-hover p-6
                               shadow-[0_18px_80px_-60px_rgba(0,0,0,0.35)]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    {/* Decorative rail */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="h-full w-1.5 rounded-l-3xl bg-gradient-to-b from-primary/55 via-primary/15 to-secondary/30" />
                    </div>

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {c.title}
                        </h3>

                        <span className="shrink-0 text-xs rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary">
                          View →
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Meta label="Issuer" value={c.issuer} />
                        <Meta label="Credential ID" value={c.credentialId || "—"} mono />
                        <Meta label="Date Issued" value={issued || "—"} />
                        <Meta label="Expires" value={expires || "No Expiry"} />
                      </div>

                      {c.skills?.length && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {c.skills.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-3 py-1 rounded-full bg-gray-100/70 dark:bg-gray-900/60"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.a>
                </SectionReveal>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Toggle */}
        {certifications.length > INITIAL_VISIBLE && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={toggleExpanded}
              className="rounded-full border border-primary/40 px-6 py-3
                         text-sm font-semibold text-primary
                         hover:bg-primary/10 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {expanded ? "Show less" : "Show more certifications"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function parseIssuedExpires(dateText: string): { issued?: string; expires?: string } {
  const issuedMatch = dateText.match(/Issued:\s*([^·]+)/i);
  const expiresMatch = dateText.match(/Expires:\s*(.+)$/i);

  return {
    issued: issuedMatch?.[1]?.trim(),
    expires: expiresMatch?.[1]?.trim(),
  };
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
    <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60
                    bg-white/55 dark:bg-black/20 px-4 py-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`mt-1 text-sm font-semibold ${mono ? "font-mono break-all" : ""}`}>
        {value}
      </div>
    </div>
  );
}
