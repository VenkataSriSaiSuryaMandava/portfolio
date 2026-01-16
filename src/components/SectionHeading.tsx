"use client";

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

/**
 * SectionHeading renders a heading and optional subtitle with a simple fade
 * animation.  The `align` prop can be used to left align the text instead of
 * centring it.
 */
export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}> 
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}