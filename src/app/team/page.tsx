import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import JsonLd from "@/components/JsonLd";
import { coaches } from "@/content/pages";
import { LINE_URL } from "@/content/site";
import { coachesSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "教練團隊",
  description:
    `認識 PURESKI ${coaches.length} 位專業教練！台灣人教練常駐北海道，ISIA/CASI 國際認證，中文溝通無障礙。Ski 雙板＆Snowboard 單板，找到最適合你的教練。`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <JsonLd data={coachesSchema()} />
      <PageHero
        jp="教練"
        en="TEAM"
        title="最專業，也最瘋、最愛滑雪的團隊"
        sub={"持有正式工作簽證、國際教練證照、豐富教學經驗。\n你除了愛上滑雪，沒有別的可能✌🏻"}
       watermark="b" big="ski" />

      <div className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coaches.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              {/* 栞式小卡 */}
              <div className="relative flex h-full flex-col rounded-[4px] border border-ink/25 bg-[url('/world/shiori-landscape.jpg')] bg-cover bg-center p-1.5 shadow-[0_3px_16px_rgba(44,62,80,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(44,62,80,0.14)]">
                <div className="flex h-full flex-col border border-ink/12 px-5 pb-6 pt-7">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-3.5 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
                  />
                  <div className="zoom-media relative mb-4 aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.photo}
                      alt={c.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                      style={{ objectPosition: ("pos" in c ? (c as { pos: string }).pos : "center") }}
                    />
                  </div>
                  {c.role && (
                    <p className="font-display text-[10px] font-bold tracking-[0.25em] text-pink-deep">
                      {c.role}
                    </p>
                  )}
                  <h2 className="serif-line mt-1 text-xl font-semibold tracking-wide">{c.name}</h2>
                  {c.certs && (
                    <p className="mt-2 text-xs font-bold leading-5 tracking-wide text-ink-soft/90">
                      {c.certs}
                    </p>
                  )}
                  <div className="mt-3 h-px w-8 bg-ink/20" aria-hidden />
                  <p className="mt-3 flex-1 text-sm font-bold leading-7 text-ink">{c.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <p className="text-base leading-8 text-ink-soft">
            想指定教練上課？
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 border-b border-pink font-bold text-ink hover:text-pink-deep"
            >
              LINE 諮詢
            </a>
            ，我們幫你安排。
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
