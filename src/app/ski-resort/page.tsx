import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { products } from "@/content/home";
import { resortDetails } from "@/content/resorts";
import { BOOKING_URL, LINE_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "北海道滑雪場總覽｜中文課程預約",
  description:
    "PURESKI 提供北海道滑雪場的中文教學課程：手稻、札幌國際、星野 TOMAMU、留壽都。選擇最適合你的雪場，開始你的滑雪冒險！",
  alternates: { canonical: "/ski-resort" },
};

/* 本頁課程卡改用雪場實景照（首頁書籤卡維持原照片） */
const cardSlugs = ["teine", "sapporo-kokusai", "tomamu", "rusutsu"] as const;

export default function SkiResortPage() {
  return (
    <>
      <PageHero
        jp="雪場"
        en="RESORT"
        title="雪場介紹與課程預約"
        sub="不管你想要新手友善，還是頂級粉雪，總有一座雪場適合你。"
       watermark="d" big="snowboard" />

      {/* 熱門課程 */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold tracking-[0.4em] text-pink">POPULAR</p>
            <h2 className="serif-line mt-3 text-2xl font-semibold tracking-wide">熱門課程</h2>
          </div>
          {/* 手機專屬跳轉按鈕：只在小螢幕顯示，電腦版不受影響 */}
          <a
            href="#resort-intro"
            className="mb-1 shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold tracking-wide text-ink transition-colors hover:bg-ink hover:text-cream md:hidden"
          >
            看雪場介紹 ↓
          </a>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.08} className="h-full">
              <div
                id={cardSlugs[i]}
                className="group relative flex h-full flex-col rounded-[4px] border border-ink/25 bg-[url('/world/shiori-portrait.jpg')] bg-cover bg-center p-1.5 shadow-[0_3px_18px_rgba(44,62,80,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(44,62,80,0.16)]"
              >
                <div className="flex h-full flex-col border border-ink/12 px-4 pb-5 pt-7">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-3.5 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
                  />
                  <div className="zoom-media relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-5 text-center">
                    <p className="font-display text-[10px] font-bold tracking-[0.22em] text-ink-soft/80">
                      {p.label}
                    </p>
                    <h3 className="serif-line mt-2 text-lg font-semibold tracking-wide">
                      {p.title}
                    </h3>
                    <div className="mx-auto mt-3 h-px w-8 bg-ink/20" aria-hidden />
                    <div className="mt-3 space-y-1">
                      <p className="font-display text-lg font-extrabold text-ink">{p.priceFull}</p>
                      {p.priceHalf && (
                        <p className="font-display text-lg font-extrabold text-ink">{p.priceHalf}</p>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-[13px] leading-6 text-ink-soft">{p.body}</p>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block rounded-full bg-pink px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_8px_28px_rgba(216,117,218,0.5)] transition-all hover:-translate-y-1 hover:bg-pink-deep"
                    >
                      立即預約 →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 服務雪場介紹 */}
      <div id="resort-intro" className="mx-auto max-w-6xl px-6 pb-28 scroll-mt-24">
        <Reveal>
          <h2 className="serif-line text-2xl font-semibold tracking-wide">服務雪場介紹</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {resortDetails.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/${r.slug}`}
                className="group flex h-full overflow-hidden rounded-[4px] border border-ink/15 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-pink/60 hover:shadow-[0_14px_30px_rgba(44,62,80,0.12)]"
              >
                <div className="zoom-media relative w-36 shrink-0 overflow-hidden sm:w-44">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="serif-line text-xl font-semibold group-hover:text-pink-deep">
                    {r.name}
                  </h3>
                  <p className="mt-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/70">
                    {r.nameEn}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{r.tagline}</p>
                  <span className="mt-3 text-sm font-bold tracking-widest text-pink">
                    雪場介紹 →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* LINE 諮詢卡 */}
        <Reveal delay={0.15} className="mt-8">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-6 rounded-[4px] bg-ink p-8 text-cream transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <p className="serif-line text-xl font-semibold leading-9">
                不知道選哪座雪場？
                <br />
                <span className="text-brand-green">LINE 聊聊</span>，我們幫你排。
              </p>
              <p className="mt-3 font-display text-xs font-bold tracking-widest text-cream/60">
                FREE CONSULTATION →
              </p>
            </div>
            <Image
              src="/brand/line-logo.png"
              alt="LINE"
              width={200}
              height={200}
              className="h-20 w-20 shrink-0 rounded-2xl object-contain md:h-24 md:w-24"
            />
          </a>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
