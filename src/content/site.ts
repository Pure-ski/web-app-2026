/**
 * 全站設定檔 — 內容維護的單一入口。
 *
 * 預約平台切換：Razio 連結產生後，把 BOOKING_URL 換掉即可全站生效。
 */

export const BOOKING_URL = "https://pureski.rezio.shop/zh-TW"; // rezio 預約平台
export const LINE_URL = "https://lin.ee/VDs0ioR";

export const site = {
  name: "PURE SKI 滑雪純愛組",
  nameEn: "PURE SKI",
  slogan: "滑帥不滑快",
  tagline: "不比別人快，但陪你真的學會",
  description:
    "北海道中文滑雪學校。ISIA 國際認證教練團隊，Ski 雙板與 Snowboard 單板全階段教學，服務手稻、留壽都、星野 TOMAMU、札幌國際等北海道 7 大雪場。",
  url: "https://www.pureski-school.com",
  company: {
    legalName: "PURE SKI 株式会社",
    representative: "SHIH WEI CHUNG",
    address: "札幌市中央区南十条西九丁目１番２１号豊正マンション部屋番号１０",
    tel: "+81-80-1983-1329",
    email: "snow.purelove@gmail.com",
    corporateNumber: "4300-01-089856",
  },
  social: {
    instagram: "https://www.instagram.com/snow_pureski55/",
    facebook: "https://www.facebook.com/profile.php?id=61565629270104",
    line: LINE_URL,
  },
  nav: [
    { label: "雪場與課程", href: "/ski-resort" },
    { label: "教練團隊", href: "/team" },
    { label: "租借加購", href: "/rental" },
    { label: "滑雪專欄", href: "/blog" },
    { label: "新手 Q&A", href: "/faq" },
    { label: "關於我們", href: "/about" },
  ],
} as const;
