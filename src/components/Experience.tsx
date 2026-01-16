"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";
import { experiences } from "@/data/data";

/**
 * Experience
 * Clean cards with expandable details (accordion-like).
 */
export default function Experience() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const bgFor = (theme?: string) => {
    // Very subtle background art per role; keeps the glass style consistent.
    if (theme === "ml") {
      return {
        backgroundImage:
          "radial-gradient(900px 500px at 15% 10%, rgba(99,102,241,0.20), transparent 55%), radial-gradient(800px 520px at 85% 25%, rgba(56,189,248,0.12), transparent 60%), radial-gradient(700px 460px at 70% 90%, rgba(168,85,247,0.10), transparent 60%)",
      };
    }
    if (theme === "fullstack") {
      return {
        backgroundImage:
          "radial-gradient(900px 520px at 20% 15%, rgba(34,197,94,0.12), transparent 58%), radial-gradient(800px 520px at 90% 20%, rgba(99,102,241,0.14), transparent 60%), radial-gradient(700px 460px at 65% 90%, rgba(56,189,248,0.10), transparent 60%)",
      };
    }
    return {
      backgroundImage:
        "radial-gradient(900px 520px at 10% 20%, rgba(56,189,248,0.12), transparent 60%), radial-gradient(800px 520px at 90% 15%, rgba(168,85,247,0.10), transparent 60%), radial-gradient(700px 460px at 65% 90%, rgba(99,102,241,0.12), transparent 60%)",
    };
  };

  return (
    <section id="experience" className="py-20 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Experience" subtitle="Work that shows scope, ownership, and outcomes" />

        <div className="mt-10 space-y-6">
          {experiences.map((exp, idx) => {
            const key = `${exp.role}-${exp.company}-${exp.period}`;
            const isOpen = openKey === key;

            // Split "City, Country · Remote/On-site" into parts.
            const [placeRaw, modeRaw] = (exp.location ?? "")
              .split("·")
              .map((s) => s.trim());
            const place = placeRaw || exp.location || "";
            const mode = modeRaw || "";

            return (
              <SectionReveal
                key={key}
                data-accent={(idx % 6).toString()}
                className="relative overflow-hidden card-surface card-hover shadow-[0_20px_80px_-50px_rgba(0,0,0,0.25)]"
              >
                {/* Subtle background art */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70 blur-2xl"
                  style={bgFor((exp as any).theme)}
                />
                <div className="p-6 sm:p-7">
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        {/* 1) Company + Location */}
                        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                          <span className="text-primary">{exp.company}</span>
                          {place ? <span className="text-gray-400 dark:text-gray-500">{" "}•{" "}{place}</span> : null}
                        </h3>

                        {/* 2) Role + Work mode */}
                        <p className="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-200">
                          {exp.role}
                          {mode ? <span className="text-gray-500 dark:text-gray-400">{" "}•{" "}{mode}</span> : null}
                        </p>

                        {/* 3) Dates */}
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{exp.period}</p>
                      </div>

                      <div className="flex items-center gap-3 sm:justify-end">
                        <span
                          className={
                            "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 text-gray-700 dark:text-gray-200 transition " +
                            (isOpen ? "rotate-180" : "")
                          }
                          aria-hidden="true"
                        >
                          <FiChevronDown />
                        </span>
                      </div>
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="mt-6">
                      {exp.skills?.length ? (
                        <div className="mb-5 flex flex-wrap gap-2">
                          {exp.skills.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 px-3 py-1 text-xs text-gray-700 dark:text-gray-200 backdrop-blur"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                      {exp.details.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
