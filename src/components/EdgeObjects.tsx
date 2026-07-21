"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * kokuto-shouchu 式「去背物件釘邊」：
 * 品牌去背物件（吉祥物、氣球 Logo、雪花、米字星）固定在視窗邊緣，
 * 半裁切出血、跨所有區塊恆存，隨滾動以各自不同的速度緩慢漂移。
 * fixed + pointer-events-none，不影響操作；z-40 蓋在內容上（kokuto 同款）。
 */
export default function EdgeObjects() {
  const { scrollYProgress } = useScroll();

  // 每個物件不同速度／方向的漂移與旋轉
  const balloonY = useTransform(scrollYProgress, [0, 1], ["0vh", "26vh"]);
  const balloonR = useTransform(scrollYProgress, [0, 1], [-6, 10]);

  const boarderY = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
  const boarderR = useTransform(scrollYProgress, [0, 1], [4, -10]);

  const skierY = useTransform(scrollYProgress, [0, 1], ["0vh", "-48vh"]);
  const skierR = useTransform(scrollYProgress, [0, 1], [-4, 8]);

  const flakeY = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);
  const flakeR = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const starY = useTransform(scrollYProgress, [0, 1], ["0vh", "-22vh"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block" aria-hidden>
      {/* 氣球 P Logo：右上角出血 */}
      <motion.div
        style={{ y: balloonY, rotate: balloonR }}
        className="absolute -right-14 top-[16vh] w-40 lg:w-48"
      >
        <Image src="/brand/obj-balloon.png" alt="" width={300} height={310} className="h-auto w-full drop-shadow-[0_14px_30px_rgba(216,117,218,0.35)]" />
      </motion.div>

      {/* 單板吉祥物：左緣中段出血 */}
      <motion.div
        style={{ y: boarderY, rotate: boarderR }}
        className="absolute -left-16 top-[58vh] w-44 lg:w-52"
      >
        <Image src="/brand/obj-boarder.png" alt="" width={330} height={370} className="h-auto w-full drop-shadow-[0_14px_28px_rgba(44,62,80,0.28)]" />
      </motion.div>

      {/* 雙板吉祥物：右緣下段出血 */}
      <motion.div
        style={{ y: skierY, rotate: skierR }}
        className="absolute -right-12 top-[105vh] w-40 lg:w-48"
      >
        <Image src="/brand/obj-skier.png" alt="" width={330} height={310} className="h-auto w-full drop-shadow-[0_14px_28px_rgba(44,62,80,0.28)]" />
      </motion.div>

      {/* 薄荷雪花：左上 */}
      <motion.div style={{ y: flakeY, rotate: flakeR }} className="absolute left-[4vw] top-[34vh] w-10 text-mint lg:w-12">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
          <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
        </svg>
      </motion.div>

      {/* 螢光黃米字星：左下 */}
      <motion.div style={{ y: starY }} className="absolute left-[7vw] top-[130vh] w-8 text-brand-yellow lg:w-10">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.2 8.6L23 12l-8.8 3.4L12 24l-2.2-8.6L1 12l8.8-3.4z" />
        </svg>
      </motion.div>
    </div>
  );
}
