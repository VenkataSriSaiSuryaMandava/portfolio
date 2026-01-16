"use client";

import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';

/**
 * About section shares a concise professional summary.  Replace the
 * placeholder text with your own story and highlights.  The paragraph
 * reveals itself smoothly as it enters the viewport.
 */
export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeading title="About Me" subtitle="Get to know me" />
      <motion.div
        className="mx-auto mt-8 max-w-[70ch] rounded-3xl p-[1px] bg-gradient-to-r from-primary/25 via-sky-300/15 to-violet-300/15 shadow-lg shadow-black/5 dark:shadow-black/30"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileHover={{ y: -2 }}
      >
        <div className="rounded-3xl bg-white/45 dark:bg-black/25 backdrop-blur-xl p-6 sm:p-8">
          <p className="text-center text-lg leading-[1.75] text-gray-800 dark:text-gray-200">
            I’m a software engineer who builds reliable, high-performance software across frontend, backend, and cloud systems, with a strong foundation in AI and machine learning. I focus on clean code, thoughtful system design, and creating products that are scalable, intuitive, and dependable in real-world use. I approach problems with ownership and discipline—breaking down complexity, learning fast, and delivering practical solutions. I’m ready to take responsibility, solve meaningful problems, and build software that teams and users trust.
          </p>
        </div>
      </motion.div>
    </section>
  );
}