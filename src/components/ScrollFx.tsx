"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * 滾動連動效果（複刻 chaseforsnow 的 UIkit parallax 配方）。
 * 所有屬性都跟滾動位置連動、可倒轉（linear scrub）。
 * stops 是進度停靠點（0~1），各屬性陣列長度需與 stops 相同。
 * opacity 經由 CSS 變數 --o 套用（framer-motion 12 + React 19.2 的
 * 數值 opacity 不逐幀更新，見 Hero.tsx 的說明）。
 */
export default function ScrollFx({
  children,
  className,
  stops = [0, 1],
  x,
  y,
  scale,
  opacity,
  blur,
  offset = ["start 0.95", "start 0.45"],
}: {
  children?: ReactNode;
  className?: string;
  stops?: number[];
  x?: (number | string)[];
  y?: (number | string)[];
  scale?: number[];
  opacity?: number[];
  blur?: number[];
  offset?: Offset;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const xv = useTransform(scrollYProgress, stops, x ?? stops.map(() => 0));
  const yv = useTransform(scrollYProgress, stops, y ?? stops.map(() => 0));
  const sv = useTransform(scrollYProgress, stops, scale ?? stops.map(() => 1));
  const ov = useTransform(scrollYProgress, stops, opacity ?? stops.map(() => 1));
  const bv = useTransform(scrollYProgress, stops, blur ?? stops.map(() => 0));
  const filter = useMotionTemplate`blur(${bv}px)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        {
          x: xv,
          y: yv,
          scale: sv,
          filter,
          "--o": ov,
          opacity: "var(--o)",
        } as never
      }
    >
      {children}
    </motion.div>
  );
}
