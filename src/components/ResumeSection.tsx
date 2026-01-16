"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * ResumeSection
 * Embedded PDF preview + download. Avoids nested anchors to prevent hydration issues.
 * Place your resume at: /public/resume.pdf
 */
export default function ResumeSection() {
  const reduce = useReducedMotion();

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionReveal>
        <SectionHeading title="Resume" subtitle="Preview & Download" />
      </SectionReveal>

      <SectionReveal>
        <motion.div
          data-accent="5"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="mt-10 card-surface card-hover shadow-xl shadow-black/5 p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-4">
            <MagneticButton>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume PDF in a new tab"
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                Download Resume
              </motion.a>
            </MagneticButton>
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30">
            {/*
              iframe is the most widely supported preview. If the browser cannot preview PDFs,
              it will show a blank area; the download button above remains available.
            */}
            <iframe
              src="/resume.pdf"
              className="w-full h-[520px] md:h-[720px]"
              title="Resume preview"
              loading="lazy"
            />
          </div>
        </motion.div>
      </SectionReveal>
    </section>
  );
}
