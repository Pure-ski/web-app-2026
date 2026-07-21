import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Watermarks, { BigBlueprint } from "@/components/Watermarks";
import { Reveal } from "@/components/motion";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, getPost } from "@/lib/blog";
import { blogPostingSchema } from "@/lib/schema";
import { BOOKING_URL, LINE_URL } from "@/content/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: { images: post.ogImage ? [post.ogImage] : [] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <Watermarks variant="d" />
      <BigBlueprint big="physics" opacity={0.08} />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.35em] text-pink">
            {post.category}
          </p>
          <h1 className="serif-line mt-4 text-3xl font-semibold leading-snug tracking-wide md:text-4xl md:leading-snug">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-ink-soft">
            PURESKI 教練團隊{post.date ? `・${post.date}` : ""}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="prose-pure mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Reveal>

        {/* 文末 CTA */}
        <Reveal className="mt-16 rounded-[6px] border border-ink/15 bg-card/70 p-8 text-center">
          <p className="serif-line text-xl font-semibold tracking-wide">
            想跟 PURESKI 教練一起上雪道嗎？
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-pink px-8 py-3.5 font-bold text-white shadow-[0_8px_28px_rgba(216,117,218,0.5)] transition-all hover:-translate-y-1 hover:bg-pink-deep"
            >
              立即預約課程 →
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-8 py-3 font-bold text-ink transition-all hover:-translate-y-1 hover:bg-ink hover:text-cream"
            >
              LINE 諮詢
            </a>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="border-b border-pink pb-1 text-sm font-bold tracking-widest text-ink hover:text-pink-deep"
          >
            ← 回滑雪專欄
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
}
