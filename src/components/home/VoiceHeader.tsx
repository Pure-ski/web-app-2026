"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * 評論區標題：入夜時文字由墨色轉奶油色（可倒轉）。
 * framer 更新 CSS 變數 --n，.night-adaptive 用 color-mix 混色
 * （數值型 style 屬性有逐幀更新問題，CSS 變數沒有，見 memory）。
 */
export default function VoiceHeader() {
  const { scrollYProgress } = useScroll();
  // 夜幕 0.72-0.8 降臨 → 文字同步轉亮
  const n = useTransform(scrollYProgress, [0.73, 0.8], [0, 1]);

  return (
    <motion.div
      style={{ "--n": n } as never}
      className="grid gap-10 md:grid-cols-[64px_1fr]"
    >
      <div className="hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="tategaki serif-line night-adaptive text-lg">聲音</span>
          <span
            aria-hidden
            className="h-14 w-px"
            style={{ background: "color-mix(in srgb, var(--cream) calc(var(--n, 0) * 100%), rgba(44,62,80,0.3))" }}
          />
          <span className="tategaki font-display night-adaptive-soft text-[10px] font-bold tracking-[0.4em]">
            VOICE
          </span>
        </div>
      </div>

      <div>
        <p className="font-display text-xs font-bold tracking-[0.4em] text-pink">REVIEWS</p>
        <h2 className="serif-line night-adaptive mt-5 max-w-lg text-[1.9rem] font-semibold leading-normal tracking-wide md:text-[2.6rem] md:leading-snug">
          大家的評論，
          <br />
          就是我們最好的見證。
        </h2>
      </div>
    </motion.div>
  );
}
