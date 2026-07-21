import { Reveal } from "@/components/motion";
import Watermarks, { BigBlueprint, type BlueprintKey } from "@/components/Watermarks";

/** 內頁共用頁首：縱書側標 + 明朝體大標（沿用首頁日式編輯語言） */
export default function PageHero({
  jp,
  en,
  title,
  sub,
  watermark = "a",
  big,
  bigOpacity,
  bigSize,
}: {
  jp: string;
  en: string;
  title: string;
  sub?: string;
  watermark?: "a" | "b" | "c" | "d";
  big: BlueprintKey;
  bigOpacity?: number;
  bigSize?: "full" | "compact";
}) {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-36 md:pt-44">
      <Watermarks variant={watermark} />
      <BigBlueprint big={big} opacity={bigOpacity} size={bigSize} />
      <div className="grid gap-10 md:grid-cols-[64px_1fr]">
        <Reveal className="hidden md:block">
          <div className="flex flex-col items-center gap-4">
            <span className="tategaki serif-line text-lg text-ink/80">{jp}</span>
            <span className="h-14 w-px bg-ink/30" />
            <span className="tategaki font-display text-[10px] font-bold tracking-[0.4em] text-ink-soft/70">
              {en}
            </span>
          </div>
        </Reveal>
        <Reveal>
          <h1 className="serif-line text-4xl font-semibold leading-snug tracking-wide md:text-5xl md:leading-snug">
            {title}
          </h1>
          {sub && (
            <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-8 tracking-wide text-ink-soft md:text-lg">
              {sub}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
