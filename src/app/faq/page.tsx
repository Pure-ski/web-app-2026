import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/motion";
import { faqCategories } from "@/content/pages";
import { LINE_URL } from "@/content/site";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "滑雪常見問題 FAQ",
  description:
    "北海道滑雪初學者必看！常見問題完整解答：課程預約、Ski vs Snowboard 怎麼選、裝備租借、雪場推薦、兒童滑雪、交通住宿、保險安全。PURE SKI 中文教練，全程中文溝通零障礙。",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <PageHero
        jp="問答"
        en="FAQ"
        title="常見問題與課程須知"
        sub="你想知道的，在這裡都找得到。找不到的，LINE 我們馬上答。"
       watermark="d" big="ski-boots" bigOpacity={0.12} />

      <div className="mx-auto max-w-4xl px-6 pb-28">
        {faqCategories.map((cat, ci) => (
          <Reveal key={cat.title} delay={0.05} className="mb-12">
            <h2 className="serif-line mb-5 border-b border-ink/15 pb-3 text-2xl font-semibold tracking-wide">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-[4px] border border-ink/15 bg-card/70 px-5 py-4 transition-colors open:bg-card"
                >
                  <summary className="cursor-pointer list-none font-bold leading-7 tracking-wide text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="mr-2 text-pink" aria-hidden>
                      Q
                    </span>
                    {item.q}
                  </summary>
                  <p className="mt-3 border-t border-ink/10 pt-3 text-[15px] leading-8 tracking-wide text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="mt-4 text-center">
          <p className="text-base leading-8 text-ink-soft">
            還有其他問題？
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 border-b border-pink font-bold text-ink hover:text-pink-deep"
            >
              LINE 免費諮詢
            </a>
            ，客服直接回答你。
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
