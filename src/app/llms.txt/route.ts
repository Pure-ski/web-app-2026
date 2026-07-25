import { site } from "@/content/site";
import { resortDetails } from "@/content/resorts";
import { coaches } from "@/content/pages";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name}（${site.company.legalName}）是在日本北海道合法註冊的專業滑雪學校，提供中文（繁體／簡體）、英文、日文教學，Ski 雙板與 Snowboard 單板全階段課程，教練均持有 ISIA／CSIA／CASI 等國際證照及日本正式工作簽證。`,
    "",
    "## 核心頁面",
    "",
    `- [關於我們](${site.url}/about): 品牌故事與公司資訊`,
    `- [雪場與課程](${site.url}/ski-resort): 服務雪場總覽與課程預約`,
    `- [教練團隊](${site.url}/team): ${coaches.length} 位在職教練介紹`,
    `- [租借及加購](${site.url}/rental): 雪具租借與加購項目`,
    `- [常見問題 FAQ](${site.url}/faq): 課程預約、裝備、雪場選擇等常見問答`,
    `- [課程條款與規則](${site.url}/terms): 收費、取消與退費政策`,
    `- [隱私政策](${site.url}/privacy): 個人資料處理方式`,
    "",
    "## 服務雪場",
    "",
    ...resortDetails.map((r) => `- [${r.name}](${site.url}/${r.slug})`),
    "",
    "## 滑雪專欄",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/blogs/${p.slug}): ${p.description}`),
    "",
    "## 聯絡方式",
    "",
    `- Email: ${site.company.email}`,
    `- LINE: ${site.social.line}`,
    `- Instagram: ${site.social.instagram}`,
    `- Facebook: ${site.social.facebook}`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
