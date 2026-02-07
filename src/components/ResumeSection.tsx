"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ResumeSection() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="resume"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionReveal>
        <SectionHeading title="Resume" subtitle="Preview & Download" />
      </SectionReveal>

      <SectionReveal>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: "easeOut" }}
          className="relative mt-14"
        >
          {/* Glow Border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary/40 via-indigo-500/30 to-cyan-400/30 blur-xl opacity-70" />

          {/* Card */}
          <div className="relative rounded-3xl bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800/60 shadow-2xl p-6 sm:p-10">
            {/* Top Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  My Professional Resume
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">
                  A concise overview of my experience, projects, skills, and
                  impact — optimized for software engineering and AI/ML roles.
                </p>
              </div>

              {/* Right – Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:justify-end">
                <MagneticButton>
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen((v) => !v)}
                    whileHover={reduce ? undefined : { scale: 1.03 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-full
                      border transition-all
                      ${
                        isOpen
                          ? "border-primary text-primary bg-primary/10"
                          : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                      }
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  >
                    {isOpen ? "Hide Preview" : "Preview Resume"}
                  </motion.button>
                </MagneticButton>

                <MagneticButton>
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduce ? undefined : { scale: 1.05 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full
                               bg-primary text-white font-medium
                               shadow-lg shadow-primary/30
                               hover:shadow-primary/50
                               focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    Download Resume
                  </motion.a>
                </MagneticButton>
              </div>
            </div>

            {/* Preview */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {isOpen && (
                <div className="mt-8 w-full rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 overflow-hidden">
                  <iframe
                    src="/resume.pdf"
                    className="w-full h-[520px] md:h-[720px]"
                    title="Resume preview"
                    loading="lazy"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
