"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

/**
 * SectionReveal
 * Scroll-triggered reveal using IntersectionObserver.
 * Keeps animations smooth and avoids heavy scroll listeners.
 */
type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
};

export default function SectionReveal({ children, className = "", delay = 0, ...rest }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      {...rest}
      initial={reduce ? undefined : { opacity: 0, y: 18 }}
      animate={reduce ? undefined : visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
