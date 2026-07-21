/**
 * 貫穿全頁的「滑行軌跡」（參考 KITE inc. 的風箏線手法）：
 * 一條粉紫 S 彎從 Hero 結束處一路延伸到 CTA，恆常存在、
 * 大膽地穿過內容之間——內容滾過這條線，就像 KITE 的風箏線。
 * （曾試過隨滾動逐漸畫出：pathLength 與 preserveAspectRatio="none"
 * 的非等比縮放相沖會碎裂，且參考站的線本來就是恆存的。）
 */
export default function CarveLine() {
  const d =
    "M56 0 C 48 4, 22 7, 16 11 C 8 16, 30 20, 55 23 C 80 26, 90 28, 86 32 C 80 38, 25 40, 14 45 C 4 49, 28 54, 58 57 C 82 60, 92 63, 85 67 C 76 72, 40 74, 32 79 C 24 84, 44 88, 58 91 C 68 94, 72 97, 70 100";

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* 軌跡的雪煙：稍寬、非常淡 */}
        <path
          d={d}
          stroke="#D875DA"
          strokeWidth={16}
          strokeOpacity={0.1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* 主軌跡線 */}
        <path
          d={d}
          stroke="#D875DA"
          strokeWidth={4}
          strokeOpacity={0.85}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
