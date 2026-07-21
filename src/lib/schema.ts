import { site } from "@/content/site";
import { resortDetails } from "@/content/resorts";
import { faqCategories, rentalItems, coaches } from "@/content/pages";
import type { BlogPost } from "@/lib/blog";

/**
 * LocalBusiness：首頁用，讓 Google/AI 搜尋認出這是一間實體登記的滑雪學校。
 *
 * 刻意不輸出 aggregateRating/review：目前站上 4 則好評是自行輸入、無第三方
 * 可查證來源（無日期、無評論連結），若標成 Review/AggregateRating 結構化資料
 * 會違反 Google 的 Review 政策並有被人工降權的風險。等 Google Business Profile
 * 累積真實評論後，再改為引用 GBP 的實際評分重新加回。
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: site.name,
    alternateName: "PURE SKI",
    url: site.url,
    description: site.description,
    telephone: site.company.tel,
    email: site.company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.company.address,
      addressCountry: "JP",
      addressRegion: "北海道",
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.line],
    areaServed: "Hokkaido, Japan",
    knowsLanguage: ["zh", "en", "ja"],
  };
}

/** Course：每個雪場介紹頁用 */
export function courseSchema(resort: (typeof resortDetails)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${resort.name} 中文滑雪課程`,
    description: resort.tagline,
    image: `${site.url}${resort.image}`,
    provider: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: resort.priceFull.replace(/[^\d]/g, ""),
      availability: "https://schema.org/InStock",
    },
  };
}

/** Product：/rental 租借加購頁用 */
export function rentalProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: rentalItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: item.name,
        image: `${site.url}${item.image}`,
        description: item.note,
        brand: { "@type": "Organization", name: site.name },
        offers: {
          "@type": "Offer",
          url: item.href,
          priceCurrency: "JPY",
          price: item.price.replace(/[^\d]/g, ""),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };
}

/** FAQPage：FAQ 頁用，最容易被 Google 精選摘要與 AI 搜尋引用 */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };
}

/** Person：/team 教練團隊頁用 */
export function coachesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: coaches.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: c.name,
        ...(c.role ? { jobTitle: c.role } : {}),
        description: c.bio,
        image: `${site.url}${c.photo}`,
        hasCredential: c.certs.split("/").map((cred) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: cred.trim(),
        })),
        worksFor: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      },
    })),
  };
}

/** BlogPosting：/blogs/[slug] 文章頁用 */
export function blogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.ogImage || undefined,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/logo-zh.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blogs/${post.slug}`,
    },
  };
}

/** BreadcrumbList：內頁用，幫助 Google 理解站內層級 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
