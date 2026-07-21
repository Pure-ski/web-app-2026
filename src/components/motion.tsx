"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** 滾動進場：淡入 + 上移。delay 以秒為單位做 stagger。 */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** 逐字浮現的大標題（給 Hero 用） */
export function SplitWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: "0.6em", rotate: 2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease },
    },
  };
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span key={i} variants={child} className="inline-block" aria-hidden>
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
