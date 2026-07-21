"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const photos = [
  {
    src: "/images/snowboard-blue.jpg",
    alt: "單板滑雪者在斜坡上滑行",
    frame: "w-[30%] rotate-[-1.6deg] aspect-[3/4] md:mt-16",
  },
  {
    src: "/images/team-summit.jpg",
    alt: "PURE SKI 教練團隊山頂合照",
    frame: "w-[38%] rotate-[0.7deg] aspect-[4/5]",
  },
  {
    src: "/images/powder-yellow.jpg",
    alt: "滑雪者在粉雪林間滑行",
    frame: "w-[24%] rotate-[1.8deg] aspect-[3/4] md:mt-28",
  },
];

/** 三張照片：大小不一、微傾、視差錯落（日式編輯的不規則感） */
export default function PhotoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yOuter = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yInner = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  return (
    <div ref={ref} className="mx-auto flex max-w-6xl items-start gap-5 px-5 md:gap-8">
      {photos.map((p, i) => (
        <motion.div
          key={p.src}
          style={{ y: i === 1 ? yInner : yOuter }}
          className={`relative overflow-hidden rounded-sm shadow-[0_10px_30px_rgba(44,62,80,0.14)] ${p.frame}`}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 38vw, 40vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
