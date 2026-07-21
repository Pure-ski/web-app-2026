import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { getAllPosts, categoryOrder } from "@/lib/blog";

export const metadata: Metadata = {
  title: "滑雪專欄",
  description:
    "PURESKI 滑雪知識庫：北海道各雪場攻略、初學者指南、裝備選擇、滑雪技巧教學。住在北海道的台灣教練團隊，第一手雪場資訊分享。",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: posts.filter((p) => p.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        jp="專欄"
        en="JOURNAL"
        title="滑雪知識庫"
        sub="住在北海道的台灣教練團隊，第一手雪場資訊分享。從入門到進階，全方位滑雪資訊都在這裡。"
       watermark="c" big="physics" bigOpacity={0.12} />

      <div className="mx-auto max-w-4xl px-6 pb-28">
        {grouped.map((g) => (
          <Reveal key={g.cat} className="mb-12">
            <h2 className="serif-line mb-5 border-b border-ink/15 pb-3 text-2xl font-semibold tracking-wide">
              {g.cat}
            </h2>
            <div className="space-y-3">
              {g.items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="group block rounded-[4px] border border-ink/15 bg-card/70 px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-pink/60"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold leading-8 tracking-wide text-ink group-hover:text-pink-deep">
                      {p.title}
                    </h3>
                    <span className="shrink-0 text-pink" aria-hidden>
                      →
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-7 text-ink-soft">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </>
  );
}
