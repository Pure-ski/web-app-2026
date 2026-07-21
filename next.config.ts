import type { NextConfig } from "next";

/**
 * 301 對照表：舊站（WordPress）→ 新站。
 * 大部分頁面路徑相同（/teine、/team、/faq...）不需轉址，
 * 這裡只列出新站沒有對應頁面的舊網址。
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 舊分類頁 → 新專欄列表（單一分類代稱，非多層路徑）
      { source: "/category/:slug", destination: "/blog", permanent: true },
      { source: "/blog-old", destination: "/blog", permanent: true },
      // 舊 WooCommerce 商品頁 → 對應新頁或外部預約平台
      { source: "/product/instructor-overview", destination: "/team", permanent: true },
      { source: "/product/instructor-:slug", destination: "/team", permanent: true },
      { source: "/product/rental-hip-protector", destination: "/rental", permanent: true },
      { source: "/product/ski-socks", destination: "/rental", permanent: true },
      { source: "/product/face-mask", destination: "/rental", permanent: true },
      { source: "/product/teine-:slug", destination: "/teine", permanent: true },
      { source: "/product/sapporo-kokusai-:slug", destination: "/sapporo-kokusai", permanent: true },
      { source: "/product/tomamu-:slug", destination: "/tomamu", permanent: true },
      { source: "/product/rusutsu-:slug", destination: "/rusutsu", permanent: true },
      { source: "/product-category/:slug", destination: "/ski-resort", permanent: true },
      // 舊購物車／結帳頁 → 外部預約平台
      { source: "/shop", destination: "https://pureski.rezio.shop/zh-TW", permanent: true },
      { source: "/shop/:path*", destination: "https://pureski.rezio.shop/zh-TW", permanent: true },
      // WordPress 雜項頁
      { source: "/page", destination: "/about", permanent: true },
      { source: "/page-:num", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
