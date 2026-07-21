"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * 前景天氣層（Dan 指定：雲與雪噴濺是「網頁元件」不是背景）——
 * fixed z-30 蓋在內容之上（Header z-50 之下），真實原色、清晰不霧化。
 * 定位貼視窗邊緣出血，避開中央內容欄（文字與照片）。
 * 雲：透明 PNG 原色。噴濺：白底素材，容器掛 mix-blend-multiply
 * （blend 必須放在有 transform 的容器本身，見 memory 的 stacking 坑）。
 */
export default function FloatingWeather() {
  const { scrollYProgress } = useScroll();

  // 左右兩條線道、時間錯開 → 雲與噴濺永不重疊；全部等 Hero 滾完才進場
  // 左道：mist1 (0.2-0.45) → cloudA (0.5-0.75) → mist3 (0.8-1)
  // 右道：cloudB (0.25-0.5) → mist2 (0.55-0.85)
  const mistAY = useTransform(scrollYProgress, [0.2, 0.45], ["110vh", "-110vh"]);
  const mistAR = useTransform(scrollYProgress, [0, 1], [-6, 4]);
  const cloudAY = useTransform(scrollYProgress, [0.5, 0.75], ["110vh", "-120vh"]);
  const cloudAX = useTransform(scrollYProgress, [0, 1], ["-2vw", "3vw"]);
  const mistCY = useTransform(scrollYProgress, [0.8, 1], ["120vh", "-60vh"]);
  const cloudBY = useTransform(scrollYProgress, [0.25, 0.5], ["110vh", "-110vh"]);
  const mistBY = useTransform(scrollYProgress, [0.55, 0.85], ["120vh", "-100vh"]);

  return (
    <>
      {/* 雲層：原色、清晰（獨立容器，不混色） */}
      <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden>
        <motion.div style={{ y: cloudAY, x: cloudAX }} className="absolute left-[-14vw] top-0 w-[42vw]">
          <Image
            src="/world/cloud-a3.png"
            alt=""
            width={1536}
            height={1024}
            sizes="42vw"
            className="w-full [mask-image:linear-gradient(to_bottom,transparent,black_14%)]"
          />
        </motion.div>
        {/* 雲 B：畫布左緣裁到雲體 → 左緣漸層遮罩羽化 */}
        <motion.div style={{ y: cloudBY }} className="absolute right-[4vw] top-0 w-[30vw]">
          <Image
            src="/world/cloud-b3.png"
            alt=""
            width={1536}
            height={1024}
            sizes="30vw"
            className="w-full [mask-image:linear-gradient(to_right,transparent,black_18%)]"
          />
        </motion.div>
      </div>

      {/* 雪噴濺層：真去背粉雪，大幅出框——像從畫面外噴進來 */}
      <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden>
        <motion.div style={{ y: mistAY, rotate: mistAR }} className="absolute left-[-24vw] top-0 w-[62vw]">
          <Image src="/world/snow-in-1.png" alt="" width={1600} height={900} sizes="62vw" className="w-full [mask-image:linear-gradient(to_right,black_45%,transparent_85%)]" />
        </motion.div>
        {/* 右側：水平翻轉，讓噴射方向由右外往內 */}
        <motion.div style={{ y: mistBY }} className="absolute right-[-22vw] top-0 w-[58vw] -scale-x-100 rotate-[6deg]">
          <Image src="/world/snow-in-2.png" alt="" width={1600} height={900} sizes="58vw" className="w-full [mask-image:linear-gradient(to_right,black_45%,transparent_85%)]" />
        </motion.div>
        <motion.div style={{ y: mistCY }} className="absolute left-[-20vw] top-0 w-[52vw] -rotate-[6deg]">
          <Image src="/world/snow-in-3.png" alt="" width={1600} height={900} sizes="52vw" className="w-full [mask-image:linear-gradient(to_right,black_45%,transparent_85%)]" />
        </motion.div>
      </div>
    </>
  );
}
