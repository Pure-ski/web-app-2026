"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { BOOKING_URL } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Workaround：framer-motion 12 + React 19.2 下，滾動連動的數值 opacity
 * 不會逐幀更新（transform/filter 正常）。改讓 framer 更新 CSS 變數 --o，
 * opacity 靜態指到 var(--o) 即可正常連動。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeStyle = (mv: unknown): any => ({ "--o": mv, opacity: "var(--o)" });

/**
 * Dolly-through 開場（複刻 chaseforsnow 實測配方）：
 * - 背景媒體：scale 1→1.5、blur 0→60、往奶油色霧化淡出
 * - 第一層（Logo）：scale 1→2.4 朝鏡頭放大 + blur 0→28 + 淡出（穿越感）
 * - 第二層（標語）：從霧中聚焦浮現（blur 24→0、scale 0.92→1.05），
 *   再繼續放大穿過（scale →2、blur →30、淡出）
 * 所有效果與滾動位置線性連動、可倒轉。
 *
 * 手機效能簡化（電腦版不受影響，md 以上維持原本數值）：
 * 即時 blur() 濾鏡是行動裝置 GPU 合成最吃重的操作，在中階 Android
 * （如 Sony Xperia 回報）與部分 iOS 裝置上，隨滾動每格重算的大面積
 * 模糊會造成畫面卡頓、甚至圖層合成瞬間錯位。手機版把 blur 目標值
 * 鎖為 0（不跑模糊運算），故事節奏（淡入淡出、縮放穿場）完全保留。
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 背景媒體
  const bgScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.5]);
  const bgBlur = useTransform(scrollYProgress, [0.05, 0.45], isMobile ? [0, 0] : [0, 60]);
  const bgFilter = useMotionTemplate`blur(${bgBlur}px)`;
  const veil = useTransform(scrollYProgress, [0.12, 0.5], [0, 0.82]);

  // 第一層：Logo 朝鏡頭放大穿過
  const l1Scale = useTransform(scrollYProgress, [0.02, 0.38], [1, 2.4]);
  const l1Blur = useTransform(scrollYProgress, [0.05, 0.38], isMobile ? [0, 0] : [0, 28]);
  const l1Filter = useMotionTemplate`blur(${l1Blur}px)`;
  const l1Opacity = useTransform(scrollYProgress, [0.16, 0.36], [1, 0]);

  // 第二層：標語 聚焦浮現 → 放大穿過
  const l2Opacity = useTransform(
    scrollYProgress,
    [0.42, 0.58, 0.82, 0.99],
    [0, 1, 1, 0]
  );
  const l2Scale = useTransform(
    scrollYProgress,
    [0.42, 0.58, 0.82, 1],
    [0.92, 1, 1.05, 1.9]
  );
  const l2Blur = useTransform(
    scrollYProgress,
    [0.42, 0.58, 0.82, 1],
    isMobile ? [0, 0, 0, 0] : [24, 0, 0, 28]
  );
  const l2Filter = useMotionTemplate`blur(${l2Blur}px)`;

  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden [mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]">
        {/* 背景媒體：影片優先，fallback 照片 + Ken Burns */}
        <motion.div style={{ scale: bgScale, filter: bgFilter }} className="absolute inset-0">
          <div className="kenburns absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt="PURE SKI 教練與學員在北海道粉雪雪道滑行"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_40%]"
            />
            {videoOk && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onError={() => setVideoOk(false)}
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <motion.div style={fadeStyle(veil)} className="absolute inset-0 bg-cream" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-cream/50" />
        </motion.div>

        {/* 第一層：置中 Logo（dolly：朝鏡頭放大穿過） */}
        <motion.div
          style={{ ...fadeStyle(l1Opacity), scale: l1Scale, filter: l1Filter }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_38%_at_center,rgba(251,245,236,0.5),rgba(251,245,236,0.18)_55%,transparent_72%)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease }}
            className="relative"
          >
            <Image
              src="/brand/logo-zh.png"
              alt="PURE SKI 滑雪純愛組"
              width={640}
              height={264}
              priority
              className="w-[76vw] max-w-[600px] drop-shadow-[0_6px_30px_rgba(255,255,255,0.5)]"
            />
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease }}
            href={BOOKING_URL}
            className="mt-10 rounded-full bg-pink-cta px-8 py-3.5 font-bold text-white shadow-[0_8px_28px_rgba(216,117,218,0.5)] transition-transform hover:-translate-y-0.5 hover:bg-pink-cta-hover"
          >
            預約 26-27 雪季課程
          </motion.a>
        </motion.div>

        {/* 滾動提示 */}
        <motion.div
          style={fadeStyle(cueOpacity)}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-display text-[10px] font-bold tracking-[0.35em] text-ink-soft">
            SCROLL
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-ink/50"
          />
        </motion.div>

        {/* 第二層：標語（從霧中聚焦 → 放大穿過）
            pointer-events-none：這層在淡入前雖然看不見（opacity:0），
            但仍佔滿整個畫面，DOM 順序在 Logo 層之後、同 z-index，
            會蓋住並吃掉底下預約按鈕的點擊，故整層設為不接收滑鼠事件 */}
        <motion.div
          style={{ ...fadeStyle(l2Opacity), scale: l2Scale, filter: l2Filter }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="serif-line text-4xl font-semibold tracking-[0.14em] text-ink md:text-6xl">
            「ピュア好き」<span className="text-pink">純粹的喜歡</span>
          </p>
          <p className="mt-9 text-sm font-medium tracking-[0.3em] text-ink-soft md:text-lg">
            手稻 × 留壽都 × 星野TOMAMU × 札幌國際
          </p>
          <p className="mt-4 font-display text-[11px] font-bold tracking-[0.4em] text-ink-soft/70 md:text-sm">
            把對雪的熱愛，帶給每一個來到這裡的你們
          </p>
        </motion.div>
      </div>
    </section>
  );
}
