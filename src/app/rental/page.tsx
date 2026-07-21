import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import JsonLd from "@/components/JsonLd";
import { rentalItems } from "@/content/pages";
import { rentalProductSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "租借及加購",
  description:
    "PURESKI 滑雪裝備租借：防摔褲、面罩、雪襪，雪場現場取件。初學者必備裝備一站搞定，不用自己扛來日本。",
  alternates: { canonical: "/rental" },
};

export default function RentalPage() {
  return (
    <>
      <JsonLd data={rentalProductSchema()} />
      <PageHero
        jp="裝備"
        en="RENTAL"
        title="裝備租借及加購"
        sub="初學者必備裝備一站搞定，雪場現場取件，不用自己扛來日本。"
       watermark="a" big="snowboard-boots" />

      <div className="mx-auto max-w-5xl px-6 pb-28">
        {/* 醒目說明 */}
        <Reveal>
          <div className="relative mx-auto mb-10 max-w-xl rounded-[4px] border border-ink/25 bg-[url('/world/shiori-landscape.jpg')] bg-cover bg-center p-1.5 shadow-[0_3px_14px_rgba(44,62,80,0.1)]">
            <p className="relative border border-ink/12 px-6 py-4 text-center text-base font-bold tracking-wide text-ink">
              <span
                aria-hidden
                className="absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
              />
              🛒 請於<span className="brush-underline">訂課時直接勾選加購</span>即可
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {rentalItems.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <a
                href={r.href}
                className="relative flex h-full flex-col rounded-[4px] border border-ink/25 bg-[url('/world/shiori-portrait.jpg')] bg-cover bg-center p-1.5 shadow-[0_3px_16px_rgba(44,62,80,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(44,62,80,0.14)]"
              >
                <div className="flex h-full flex-col border border-ink/12 px-5 pb-6 pt-8 text-center">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-3.5 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
                  />
                  <div className="zoom-media relative mx-auto mb-4 aspect-square w-3/4 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      sizes="220px"
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                  <h2 className="serif-line text-lg font-semibold tracking-wide">{r.name}</h2>
                  <p className="mt-3 font-display text-2xl font-extrabold">{r.price}</p>
                  <div className="mx-auto mt-3 h-px w-8 bg-ink/20" aria-hidden />
                  {"warning" in r && r.warning && (
                    <p className="mt-3 text-xs font-bold tracking-wide text-pink">
                      {r.warning}
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{r.note}</p>
                  <span className="mt-5 border-b border-pink pb-1 text-sm font-bold tracking-widest text-ink">
                    立即預約 →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center text-sm leading-7 text-ink-soft">
          雪板、雪鞋、雪杖、安全帽等技術裝備，建議直接在各雪場租借站租借（約
          ¥5,000-7,000／日），熱門時段記得先線上預約並攜帶護照。
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
