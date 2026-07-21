"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// 滾動連動 opacity 需經 CSS 變數（framer-motion 12 + React 19.2 workaround）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeStyle = (mv: unknown): any => ({ "--o": mv, opacity: "var(--o)" });

/**
 * 「山的一天」— kitamura1923 式固定演變世界。
 * 素材為 gpt-image-1 生成的透明底 PNG（public/world/，
 * 重生成腳本：scripts/gen_web_assets.py）：
 * - 粉紫太陽（CSS 光暈）橫越天空、緩緩下沉放大，最後落在頁尾
 * - 遠近兩層真實感雪山稜線，不同視差速度逼近
 * - 天色三段：高山藍 → 奶油日中 → 黃昏暖
 * - 兩朵寫實雲從中段飄過
 */
export default function MountainWorld() {
  const { scrollYProgress } = useScroll();

  // 天色三幕：白天（高山藍）→ 夕陽（暖橘）→ 黑夜（深藍墨）
  // 四幕時間軸（對準頁面錨點：課程標題 0.57 仍白天 → 課程卡 0.65 夕陽 → 評論 0.76 月已掛空 → CTA 0.93 破曉）
  const blueO = useTransform(scrollYProgress, [0, 0.5, 0.6], [1, 0.85, 0]);
  const warmO = useTransform(scrollYProgress, [0.58, 0.66, 0.76, 0.84], [0, 0.85, 0.85, 0]);
  const nightO = useTransform(scrollYProgress, [0.72, 0.8, 0.88, 0.97], [0, 0.85, 0.85, 0]);
  const starsO = useTransform(scrollYProgress, [0.72, 0.8, 0.9, 0.97], [0, 0.9, 0.9, 0]);
  const dawnO = useTransform(scrollYProgress, [0.88, 0.97], [0, 0.9]);

  // 太陽
  const sunX = useTransform(scrollYProgress, [0, 1], ["8vw", "-45vw"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["6vh", "72vh"]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const sunO = useTransform(scrollYProgress, [0, 0.6, 0.72], [1, 1, 0]);
  // 月亮：黑夜時從右側升起
  const moonY = useTransform(scrollYProgress, [0.6, 0.74], ["85vh", "10vh"]);
  const moonO = useTransform(scrollYProgress, [0.6, 0.66, 0.9, 0.98], [0, 1, 1, 0]);

  // 山稜視差
  const farY = useTransform(scrollYProgress, [0, 1], ["18vh", "4vh"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["36vh", "8vh"]);

  // 雲

  // 設計文件層（= kitamura 的縫紉版型圖：雪板藍圖、等高線圖、雪結晶作圖）
  const bpY = useTransform(scrollYProgress, [0, 1], ["30vh", "-60vh"]);
  const bpR = useTransform(scrollYProgress, [0, 1], [7, 12]);
  const ct2Y = useTransform(scrollYProgress, [0, 1], ["240vh", "60vh"]);

  return (
    <div className="gpu-layer pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream" aria-hidden>
      {/* 天色層 */}
      <motion.div
        style={fadeStyle(blueO)}
        className="absolute inset-0 bg-gradient-to-b from-[#b9d4ec] via-[#dcebf2] to-cream"
      />
      <motion.div
        style={fadeStyle(warmO)}
        className="absolute inset-0 bg-gradient-to-b from-[#f0a25c] via-[#f6cf9e] to-[#f8ead7]"
      />
      {/* 黑夜層 */}
      <motion.div
        style={fadeStyle(nightO)}
        className="absolute inset-0 bg-gradient-to-b from-[#141e2e] via-[#243347] to-[#3a4a61]"
      />
      {/* 破曉層：頁尾慢慢天亮 */}
      <motion.div
        style={fadeStyle(dawnO)}
        className="absolute inset-0 bg-gradient-to-b from-[#b9d4ec] via-[#dcebf2] to-cream"
      />
      {/* 星空：夜幕降臨時浮現 */}
      <motion.div style={fadeStyle(starsO)} className="absolute inset-0">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {[
            [90, 120, 1.4], [230, 60, 1], [370, 180, 1.8], [520, 90, 1.1], [660, 200, 1.4],
            [780, 70, 1], [910, 150, 2], [1050, 100, 1.2], [1180, 210, 1.5], [1320, 80, 1],
            [160, 300, 1.1], [450, 330, 1.4], [720, 320, 1], [990, 300, 1.6], [1260, 340, 1.2],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.85} />
          ))}
        </svg>
      </motion.div>

      {/* 粉紫太陽 */}
      <motion.div
        style={{ x: sunX, y: sunY, scale: sunScale, ...fadeStyle(sunO) }}
        className="gpu-layer absolute right-[4vw] top-0 h-[34vw] w-[34vw] max-h-[460px] max-w-[460px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#e394e5_0%,#d875da_55%,rgba(216,117,218,0.25)_78%,transparent_100%)]" />
      </motion.div>

      {/* 黃色暈映月亮：黑夜自右側升起 */}
      <motion.div
        style={{ y: moonY, ...fadeStyle(moonO) }}
        className="gpu-layer absolute right-[9vw] top-0 h-[13vw] w-[13vw] max-h-[190px] max-w-[190px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#fdf7dc_0%,#f6e5a2_38%,rgba(246,229,162,0.35)_62%,rgba(246,229,162,0.12)_78%,transparent_100%)] shadow-[0_0_80px_30px_rgba(246,229,162,0.25)]" />
      </motion.div>

      {/* 工藝素材層（= kitamura 的布紋版型紙）：壓凸和紙雪板、絎縫毛料雪鏡、壓凸交叉雙板
          手機隱藏（原本只為桌面設計的角落裝飾，窄螢幕上相對比例太大會很突兀），
          電腦版 lg:w-60 等數值完全不動 */}
      <motion.div style={{ y: bpY, rotate: bpR }} className="absolute right-[2vw] top-0 hidden w-48 opacity-90 mix-blend-multiply md:block lg:w-60">
        <Image src="/world/pelem-boarder.png" alt=""  width={1024} height={1024} sizes="16vw" className="w-full" />
      </motion.div>
      <motion.div style={{ y: ct2Y }} className="absolute right-[4vw] top-0 hidden w-44 rotate-[9deg] opacity-90 mix-blend-multiply md:block lg:w-56">
        <Image src="/world/pelem-flake.png" alt=""  width={1024} height={1024} sizes="15vw" className="w-full" />
      </motion.div>

      {/* 遠山（霧藍層）：手機版偏移量改小（bottom-[-2vw]），讓山露出更多；
          電腦版 md:bottom-[-6vw] 維持原本數值不變 */}
      <motion.div style={{ y: farY }} className="gpu-layer absolute inset-x-0 bottom-[-2vw] w-[105vw] md:bottom-[-6vw]">
        <Image
          src="/world/ridge-far.png"
          alt=""
          width={1536}
          height={1024}
          sizes="105vw"
          className="w-full [mask-image:linear-gradient(to_bottom,transparent,black_22%)]"
        />
      </motion.div>


      {/* 近山（白雪粉雪層，蓋在雲前）：手機版偏移量改小，電腦版 md:bottom-[-10vw] 不變 */}
      <motion.div style={{ y: nearY }} className="gpu-layer absolute inset-x-0 bottom-[-3vw] left-[-3vw] w-[108vw] md:bottom-[-10vw]">
        <Image
          src="/world/ridge-near.png"
          alt=""
          width={1536}
          height={1024}
          sizes="108vw"
          className="w-full"
        />
      </motion.div>
    </div>
  );
}
