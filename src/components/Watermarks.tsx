import Image from "next/image";

// 10 句手寫字跡（ZH/JP/EN 各語言、鉛筆/鋼筆兩種筆觸），已去背成透明底
// 來源：/Users/handsomefun/Downloads/design_sketches/handwriting_text/text去背/Selected
const JP_PUROBAZ_PENCIL = "/world/wm2-jp-purobaz-pencil.png"; // プロは、バズより遠くへ。（鉛筆）
const JP_PUROBAZ_PEN = "/world/wm2-jp-purobaz-pen.png"; // 同句（鋼筆）
const JP_PIYUAZUKI_PENCIL = "/world/wm2-jp-piyuazuki-pencil.png"; // ピュア好き（鉛筆）
const JP_PIYUAZUKI_PEN = "/world/wm2-jp-piyuazuki-pen.png"; // 同句（鋼筆）
const EN_PROFESSION_PENCIL = "/world/wm2-en-profession-pencil.png"; // Profession rides better than fame（鉛筆）
const EN_PROFESSION_PEN = "/world/wm2-en-profession-pen.png"; // 同句（鋼筆）
const EN_PURESKI_PENCIL = "/world/wm2-en-pureski-pencil.png"; // Pure Ski（鉛筆）
const EN_PURESKI_PEN = "/world/wm2-en-pureski-pen.png"; // 同句（鋼筆）
const ZH_JUNAI_PENCIL = "/world/wm2-zh-junai-pencil.png"; // 純愛、滑雪（鉛筆）
const ZH_JUNAI_PEN = "/world/wm2-zh-junai-pen.png"; // 同句（鋼筆）

type Mark = { src: string; cls: string };

/**
 * 四組排版變體：ZH/JP/EN 手寫字跡散落在畫面左右兩側（避開中央的大圖區域），
 * 每組都包含三語，位置與轉角刻意不規則（不同的 top % 間距、正負交錯的旋轉角度），
 * 避免看起來像整齊排列的網格。左右側各自的 top % 間距夠大，彼此不重疊。
 */
const VARIANTS: Record<"a" | "b" | "c" | "d", Mark[]> = {
  a: [
    { src: JP_PUROBAZ_PENCIL, cls: "left-[2vw] top-[4%] w-64 -rotate-[6deg] opacity-[0.22]" },
    { src: EN_PURESKI_PEN, cls: "left-[6vw] top-[26%] w-56 rotate-[5deg] opacity-[0.2]" },
    { src: ZH_JUNAI_PENCIL, cls: "left-[3vw] top-[50%] w-60 -rotate-[4deg] opacity-[0.22]" },
    { src: JP_PIYUAZUKI_PEN, cls: "left-[7vw] top-[74%] w-52 rotate-[7deg] opacity-[0.2]" },
    { src: EN_PROFESSION_PENCIL, cls: "right-[2vw] top-[10%] w-64 rotate-[4deg] opacity-[0.22]" },
    { src: ZH_JUNAI_PEN, cls: "right-[6vw] top-[34%] w-56 -rotate-[7deg] opacity-[0.2]" },
    { src: JP_PUROBAZ_PEN, cls: "right-[3vw] top-[58%] w-60 rotate-[3deg] opacity-[0.22]" },
    { src: EN_PURESKI_PENCIL, cls: "right-[7vw] top-[82%] w-52 -rotate-[5deg] opacity-[0.2]" },
  ],
  b: [
    { src: EN_PROFESSION_PEN, cls: "left-[3vw] top-[6%] w-60 rotate-[5deg] opacity-[0.2]" },
    { src: JP_PIYUAZUKI_PENCIL, cls: "left-[7vw] top-[30%] w-56 -rotate-[6deg] opacity-[0.22]" },
    { src: ZH_JUNAI_PEN, cls: "left-[2vw] top-[54%] w-60 rotate-[4deg] opacity-[0.2]" },
    { src: EN_PURESKI_PEN, cls: "left-[6vw] top-[78%] w-52 -rotate-[8deg] opacity-[0.2]" },
    { src: JP_PUROBAZ_PENCIL, cls: "right-[3vw] top-[14%] w-64 -rotate-[5deg] opacity-[0.22]" },
    { src: ZH_JUNAI_PENCIL, cls: "right-[7vw] top-[38%] w-56 rotate-[6deg] opacity-[0.2]" },
    { src: EN_PROFESSION_PENCIL, cls: "right-[2vw] top-[62%] w-60 -rotate-[3deg] opacity-[0.22]" },
    { src: JP_PIYUAZUKI_PEN, cls: "right-[6vw] top-[86%] w-52 rotate-[5deg] opacity-[0.2]" },
  ],
  c: [
    { src: ZH_JUNAI_PENCIL, cls: "left-[3vw] top-[5%] w-60 -rotate-[7deg] opacity-[0.22]" },
    { src: EN_PURESKI_PENCIL, cls: "left-[7vw] top-[27%] w-56 rotate-[4deg] opacity-[0.2]" },
    { src: JP_PUROBAZ_PEN, cls: "left-[2vw] top-[49%] w-60 -rotate-[5deg] opacity-[0.22]" },
    { src: EN_PROFESSION_PEN, cls: "left-[6vw] top-[73%] w-52 rotate-[6deg] opacity-[0.2]" },
    { src: JP_PIYUAZUKI_PENCIL, cls: "right-[3vw] top-[12%] w-64 rotate-[5deg] opacity-[0.22]" },
    { src: EN_PURESKI_PEN, cls: "right-[7vw] top-[36%] w-56 -rotate-[6deg] opacity-[0.2]" },
    { src: ZH_JUNAI_PEN, cls: "right-[2vw] top-[60%] w-60 rotate-[4deg] opacity-[0.22]" },
    { src: JP_PUROBAZ_PENCIL, cls: "right-[6vw] top-[84%] w-52 -rotate-[4deg] opacity-[0.2]" },
  ],
  d: [
    { src: JP_PIYUAZUKI_PEN, cls: "left-[2vw] top-[7%] w-56 -rotate-[4deg] opacity-[0.22]" },
    { src: ZH_JUNAI_PEN, cls: "left-[6vw] top-[29%] w-60 rotate-[6deg] opacity-[0.2]" },
    { src: EN_PROFESSION_PENCIL, cls: "left-[3vw] top-[53%] w-64 -rotate-[6deg] opacity-[0.22]" },
    { src: JP_PUROBAZ_PENCIL, cls: "left-[7vw] top-[77%] w-56 rotate-[5deg] opacity-[0.2]" },
    { src: EN_PURESKI_PENCIL, cls: "right-[2vw] top-[15%] w-60 -rotate-[5deg] opacity-[0.22]" },
    { src: JP_PIYUAZUKI_PENCIL, cls: "right-[6vw] top-[40%] w-56 rotate-[4deg] opacity-[0.2]" },
    { src: ZH_JUNAI_PENCIL, cls: "right-[3vw] top-[64%] w-60 -rotate-[7deg] opacity-[0.22]" },
    { src: EN_PROFESSION_PEN, cls: "right-[7vw] top-[88%] w-52 rotate-[6deg] opacity-[0.2]" },
  ],
};

/**
 * 大圖設計底稿（Dan 提供，每頁對應各自的手繪主題）：
 * 來源 /Users/handsomefun/Downloads/design_sketches/transparent
 * 固定在視窗中央區域（position:fixed，不隨頁面捲動），transparency 0.15。
 */
export type BlueprintKey = "snowboard" | "ski" | "ski-boots" | "snowboard-boots" | "physics" | "brand";

const BLUEPRINT_ASSETS: Record<BlueprintKey, string> = {
  snowboard: "/world/bp2-snowboard.png", // 雪場頁：單板結構圖
  ski: "/world/bp2-ski.png", // 教練團隊頁：雙板結構圖
  "ski-boots": "/world/bp2-ski-boots.png", // 新手 Q&A：雪靴＋物理受力圖
  "snowboard-boots": "/world/bp2-snowboard-boots.png", // 租借加購頁：單板靴
  physics: "/world/bp2-physics.png", // 滑雪專欄頁：刻滑物理圖解
  brand: "/world/bp2-brand.png", // 關於我們頁：Pure Ski 品牌雙人稿
};

// 尺寸預設：full = 950/1100/1250px（2.5x 基準），compact = 0.8x
const SIZE_CLASS: Record<"full" | "compact", string> = {
  full: "w-[950px] md:w-[1100px] lg:w-[1250px]",
  compact: "w-[760px] md:w-[880px] lg:w-[1000px]",
};

export function BigBlueprint({
  big,
  opacity = 0.22,
  size = "full",
}: {
  big: BlueprintKey;
  opacity?: number;
  size?: "full" | "compact";
}) {
  const src = BLUEPRINT_ASSETS[big];
  return (
    <div className="gpu-layer pointer-events-none fixed inset-0 -z-[2] hidden overflow-hidden md:block" aria-hidden>
      <Image
        src={src}
        alt=""
        width={1024}
        height={1536}
        style={{ opacity }}
        className={`absolute left-1/2 top-20 max-w-none -translate-x-1/2 ${SIZE_CLASS[size]}`}
      />
    </div>
  );
}

/**
 * 內頁背景手寫浮水印（kitamura1923 式）：ZH/JP/EN 手寫字跡分散在頁面
 * 左右兩側，避開中央的大圖區域，密集但不擋文字、彼此也不重疊。
 * 每頁可傳不同 variant，排版彼此不同但風格一致。
 */
export default function Watermarks({
  variant = "a",
}: {
  variant?: "a" | "b" | "c" | "d";
}) {
  const marks = VARIANTS[variant];
  return (
    <div className="gpu-layer pointer-events-none fixed inset-0 -z-[5] hidden overflow-hidden md:block" aria-hidden>
      {marks.map((m, i) => (
        <Image
          key={i}
          src={m.src}
          alt=""
          width={760}
          height={520}
          className={`absolute ${m.cls}`}
        />
      ))}
    </div>
  );
}
