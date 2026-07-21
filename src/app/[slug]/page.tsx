import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { resortDetails } from "@/content/resorts";
import { BOOKING_URL, LINE_URL } from "@/content/site";
import JsonLd from "@/components/JsonLd";
import { courseSchema } from "@/lib/schema";

export function generateStaticParams() {
  return resortDetails.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resort = resortDetails.find((r) => r.slug === slug);
  if (!resort) return {};
  return {
    title: `${resort.name}中文教練推薦`,
    description: `${resort.name}｜${resort.tagline}。PURE SKI 提供專業中文教練私人課程，國際認證師資，${resort.priceFull}。立即預約！`,
    alternates: { canonical: `/${resort.slug}` },
    openGraph: { images: [resort.image] },
  };
}

function BookButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full bg-pink font-bold text-white shadow-[0_8px_28px_rgba(216,117,218,0.5)] transition-all hover:-translate-y-1 hover:bg-pink-deep ${
        large ? "px-10 py-4 text-lg" : "px-8 py-3.5"
      }`}
    >
      立即預約課程 →
    </a>
  );
}

export default async function ResortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resort = resortDetails.find((r) => r.slug === slug);
  if (!resort) notFound();

  return (
    <>
      <JsonLd data={courseSchema(resort)} />
      <PageHero jp="雪場" en={resort.nameEn} title={resort.name} sub={resort.tagline} watermark="b" big="snowboard" />

      <div className="mx-auto max-w-5xl px-6 pb-28">
        {/* 主視覺 + 預約 */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] border border-ink/20">
            <Image
              src={resort.image}
              alt={resort.name}
              width={1080}
              height={760}
              sizes="(min-width: 1024px) 60vw, 92vw"
              className="w-full"
              priority
            />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-0.5">
              <p className="font-display text-xl font-extrabold text-ink">{resort.priceFull}</p>
              {resort.priceHalf && (
                <p className="font-display text-xl font-extrabold text-ink">{resort.priceHalf}</p>
              )}
            </div>
            <BookButton large />
          </div>
        </Reveal>

        {/* 雪場特色 */}
        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">雪場特色</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resort.features.map((f) => (
              <div key={f.title} className="rounded-[4px] border border-ink/15 bg-card/70 p-5">
                <h3 className="font-bold tracking-wide text-pink-deep">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 介紹 */}
        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">關於{resort.name}</h2>
          <div className="mt-6 space-y-5">
            {resort.intro.map((p) => (
              <p key={p.slice(0, 12)} className="leading-9 tracking-wide text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* 雪場服務 */}
        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">雪場服務</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {resort.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/20 bg-card/70 px-4 py-1.5 text-sm font-medium text-ink"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* 裝備租借 */}
        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">裝備租借</h2>
          <ul className="mt-6 space-y-2.5">
            {resort.rental.map((r) => (
              <li key={r} className="flex gap-3 leading-8 text-ink-soft">
                <span className="mt-0.5 text-pink" aria-hidden>
                  ❄
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 交通方式 */}
        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">交通方式</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {resort.transport.map((t) => (
              <div key={t.title} className="rounded-[4px] border border-ink/15 bg-card/70 p-6">
                <h3 className="font-bold tracking-wide">{t.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
                  {t.lines.map((l) => (
                    <li key={l}>・{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-[4px] border border-ink/15 bg-card/70 p-6">
              <h3 className="font-bold tracking-wide">📍 地址</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{resort.address}</p>
            </div>
            <div className="rounded-[4px] border border-ink/15 bg-card/70 p-6">
              <h3 className="font-bold tracking-wide">🅿️ 停車場資訊</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{resort.parking}</p>
            </div>
          </div>
        </Reveal>

        {/* 尾段預約 CTA */}
        <Reveal delay={0.1} className="mt-20 rounded-[6px] border border-ink/15 bg-card/70 p-10 text-center">
          <p className="serif-line text-2xl font-semibold tracking-wide">
            準備好在{resort.name}開滑了嗎？
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <BookButton large />
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-8 py-[14px] font-bold text-ink transition-all hover:-translate-y-1 hover:bg-ink hover:text-cream"
            >
              LINE 諮詢
            </a>
          </div>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
