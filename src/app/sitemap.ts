import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { resortDetails } from "@/content/resorts";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified 刻意省略：目前沒有真實的內容修改時間可用（blog frontmatter
  // 的 date 欄位全部是空字串），與其每次 build 都填入當下時間騙 Google 說內容
  // 一直在變，不如不填——lastModified 在 sitemap 規格中是選填欄位。等文章補上
  // 真實發布日期後，再把 blogRoutes 的 lastModified 接回 post.date。
  const staticRoutes = [
    "",
    "/ski-resort",
    "/team",
    "/rental",
    "/faq",
    "/about",
    "/blog",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const resortRoutes = resortDetails.map((r) => ({
    url: `${site.url}/${r.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${site.url}/blogs/${p.slug}`,
    ...(p.date ? { lastModified: new Date(p.date) } : {}),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...resortRoutes, ...blogRoutes];
}
