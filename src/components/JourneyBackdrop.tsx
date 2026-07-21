"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

// 見 Hero.tsx：滾動連動 opacity 需經 CSS 變數
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeStyle = (mv: unknown): any => ({ "--o": mv, opacity: "var(--o)" });

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 240" className={className} aria-hidden>
      {/* 底部陰影層：讓雲在奶油底上有立體感 */}
      <g fill="#b7cfe3">
        <ellipse cx="150" cy="168" rx="152" ry="56" />
        <ellipse cx="310" cy="132" rx="142" ry="72" />
        <ellipse cx="460" cy="174" rx="147" ry="50" />
      </g>
      <g fill="#ffffff">
        <ellipse cx="150" cy="150" rx="150" ry="58" />
        <ellipse cx="310" cy="112" rx="140" ry="74" />
        <ellipse cx="460" cy="156" rx="145" ry="52" />
      </g>
    </svg>
  );
}

/**
 * 貫穿全頁的「下山旅程」背景層（Dan 指定：像穿過雲層那樣的連續元素）。
 * 進度來自整頁滾動：
 * - 雲朵以不同速度向上掠過 = 你正在下降穿過雲層
 * - 天空的藍色調隨著下降淡出（雲層上方 → 雲層下方）
 * - 一道粉紫筆刷以慢於滾動的速度貫穿整頁漂移
 * 固定在 -z-10，只有在區塊透明處露出，不干擾內容。
 */
export default function JourneyBackdrop() {
  const { scrollYProgress } = useScroll();

  // 高空的藍色調：下降過程逐漸消失
  const skyOpacity = useTransform(scrollYProgress, [0, 0.4, 0.65], [1, 0.55, 0]);

  // 三層雲：速度不同（近的快、遠的慢），向上掠過
  const c1y = useTransform(scrollYProgress, [0.08, 0.55], ["55vh", "-150vh"]);
  const c2y = useTransform(scrollYProgress, [0.18, 0.75], ["95vh", "-130vh"]);
  const c3y = useTransform(scrollYProgress, [0.3, 1], ["120vh", "-90vh"]);
  const c1x = useTransform(scrollYProgress, [0, 1], ["-4vw", "6vw"]);
  const c3x = useTransform(scrollYProgress, [0, 1], ["5vw", "-8vw"]);

  // 貫穿全頁的粉紫筆刷：慢速漂移 + 微旋轉
  const brushY = useTransform(scrollYProgress, [0, 1], ["30vh", "-55vh"]);
  const brushRotate = useTransform(scrollYProgress, [0, 1], [-14, 4]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {/* 天空層：雲層上方的藍 */}
      <motion.div
        style={fadeStyle(skyOpacity)}
        className="absolute inset-0 bg-gradient-to-b from-[#c6dcee] via-[#e3edf2] to-cream"
      />

      {/* 粉紫筆刷：全程貫穿 */}
      <motion.div
        style={{ y: brushY, rotate: brushRotate }}
        className="absolute left-[-15%] top-1/3 h-[38vh] w-[130%]"
      >
        <div className="h-full w-full rounded-[100%] bg-gradient-to-r from-transparent via-pink/[0.13] to-transparent blur-2xl" />
      </motion.div>

      {/* 雲層：三層不同速度 */}
      <motion.div style={{ y: c1y, x: c1x }} className="absolute left-[-12%] top-0 w-[95vw] blur-md">
        <Cloud className="w-full" />
      </motion.div>
      <motion.div style={{ y: c2y }} className="absolute right-[-14%] top-0 w-[75vw] opacity-90 blur-lg">
        <Cloud className="w-full" />
      </motion.div>
      <motion.div style={{ y: c3y, x: c3x }} className="absolute left-[6%] top-0 w-[100vw] opacity-85 blur-lg">
        <Cloud className="w-full" />
      </motion.div>
    </div>
  );
}
