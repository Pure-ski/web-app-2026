import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  ogImage: string;
  html: string;
};

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    try {
      val = JSON.parse(val);
    } catch {
      /* 已是純字串 */
    }
    meta[key] = val;
  }
  return { meta, body: raw.slice(m[0].length) };
}

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => getPost(f.replace(/\.md$/, "")))
    .filter((p): p is BlogPost => p !== null);
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { meta, body } = parseFrontMatter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? "",
    category: meta.category ?? "",
    ogImage: meta.ogImage ?? "",
    html: marked.parse(body, { async: false }) as string,
  };
}

/** 分類順序（沿用官網選單） */
export const categoryOrder = [
  "入門系列",
  "親子滑雪",
  "裝備指南",
  "滑雪技術",
  "雪場攻略",
  "教練培訓",
];
