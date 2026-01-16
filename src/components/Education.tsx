"use client";

import SectionHeading from '@/components/SectionHeading';
import SectionReveal from '@/components/ui/SectionReveal';
import { education } from '@/data/data';

/**
 * Education
 * Same visual system as Experience: clean stacked cards, all details visible.
 */
export default function Education() {
  return (
    <section id="education" className="py-20 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Education" subtitle="Academic foundation & focus areas" />

        <div className="mt-10 space-y-6">
          {education.map((edu, idx) => (
            <SectionReveal
              key={`${edu.degree}-${edu.institution}`}
              data-accent={(idx % 6).toString()}
              className="card-surface card-hover shadow-[0_20px_80px_-50px_rgba(0,0,0,0.25)]"
            >
              <div className="p-6 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                      {edu.institution}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {edu.degree}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {edu.start} – {edu.end}
                      {edu.cgpa ? (
                        <>
                          {' '}
                          <span className="text-gray-400 dark:text-gray-500">•</span>{' '}
                          <span className="text-gray-700 dark:text-gray-300">CGPA:</span>{' '}
                          <span className="font-medium text-gray-900 dark:text-gray-100">{edu.cgpa}</span>
                        </>
                      ) : null}
                    </p>
                  </div>

                  {edu.location ? (
                    <span className="inline-flex w-fit items-center rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 px-3 py-1 text-xs text-gray-700 dark:text-gray-200">
                      {edu.location}
                    </span>
                  ) : null}
                </div>

                {edu.coursework?.length ? (
                  <div className="mt-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4">
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">Relevant Coursework</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center rounded-full border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/20 px-3 py-1 text-xs text-gray-700 dark:text-gray-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {edu.details?.length ? (
                  <ul className="mt-5 space-y-2 text-gray-700 dark:text-gray-200">
                    {edu.details.map((d, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
