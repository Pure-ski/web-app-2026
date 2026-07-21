import Image from "next/image";
import { Reveal } from "@/components/motion";
import ScrollFx from "@/components/ScrollFx";
import PhotoStrip from "@/components/home/PhotoStrip";
import VoiceHeader from "@/components/home/VoiceHeader";
import Link from "next/link";
import { site, BOOKING_URL, LINE_URL } from "@/content/site";
import { products, testimonials } from "@/content/home";

/** 縱書側標（日式編輯語言，貫穿各區塊） */
function SideLabel({ jp, en }: { jp: string; en: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="tategaki serif-line text-lg text-ink/80">{jp}</span>
      <span className="h-14 w-px bg-ink/30" />
      <span className="tategaki font-display text-[10px] font-bold tracking-[0.4em] text-ink-soft/70">
        {en}
      </span>
    </div>
  );
}

/* ---------- 宣言場景：不對稱編輯排版 ---------- */

export function Manifesto() {
  return (
    /* -mt-[100vh]：蓋掉 Hero sticky 釋放後的空白屏 */
    <section className="relative z-10 -mt-[100vh] overflow-hidden py-28 md:py-40">
      <div className="relative z-40 mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[64px_1fr]">
          <Reveal className="hidden md:block">
            <SideLabel jp="物語" en="STORY" />
          </Reveal>

          <div>
            <ScrollFx y={[150, 0]} opacity={[0, 1]}>
              <h2 className="serif-line max-w-xl text-[2rem] font-semibold leading-[1.5] tracking-wide md:text-[2.9rem] md:leading-[1.45]">
                <span className="brush-underline">愛滑雪</span>，
                <br />
                是純愛之所以存在。
              </h2>
            </ScrollFx>

            <div className="mt-14 flex flex-wrap items-start gap-10 md:mt-20">
              <Reveal delay={0.15}>
                <p className="max-w-md text-base leading-9 tracking-wide text-ink-soft md:text-lg md:leading-10">
                  還記得第一次愛上某件事的感覺嗎？
                  <br />
                  <br />
                  那種純粹的、閃閃發光的喜悅——這就是 PURE SKI 的初衷。
                  <br />
                  <br />
                  我們的名字，在日文裡聽起來就像「ピュア好き」——純粹的喜歡。
                  <br />
                  <br />
                  這是在日本北海道合法註冊的專業滑雪學校（PURE SKI
                  株式会社）。我們很清楚，唯有
                  <strong className="font-bold text-ink">完全合法合規</strong>
                  ，我們才對得起每一位來到這裡的學員。
                  <strong className="font-bold text-ink">持有正式工作簽證</strong>
                  與國際滑雪證照的單雙板教練，四座主要大雪場，中文、英文、日文教學無障礙，4
                  歲到 70 歲都能找到適合的課程。
                  <br />
                  <br />
                  <span className="brush-underline font-semibold text-ink">專業</span>
                  ，是我們對這份熱愛死守的承諾。
                  <br />
                  <br />
                  我們想做的，就是把這份
                  <span className="brush-underline font-semibold text-ink">
                    對滑雪最真誠的熱愛，分享給您
                  </span>
                  。
                </p>
                <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
                  <a
                    href="/team"
                    className="inline-block translate-y-3 border-b-2 border-pink pb-1 text-base font-bold tracking-widest text-ink transition-colors hover:text-pink-deep"
                  >
                    認識 PURE SKI 教練團隊 →
                  </a>
                  {/* 粉色英文 Logo：簽名檔，與左側連結錯開高度 */}
                  <Image
                    src="/brand/logo-en-pink.png"
                    alt="Pure Ski"
                    width={445}
                    height={178}
                    className="w-40 -translate-y-5 -rotate-[3deg] drop-shadow-[0_4px_14px_rgba(216,117,218,0.3)] md:w-44"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-40 mt-20 md:mt-28">
        <PhotoStrip />
      </div>
    </section>
  );
}

/* ---------- 課程：交錯高度的卡片 ---------- */

const stagger = ["md:mt-0", "md:mt-14", "md:mt-5", "md:mt-20"];

export function Products() {
  return (
    <section className="relative py-28 md:py-36">
      {/* 上下透明的漸層底，避免硬邊界線 */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-transparent" />
      <div className="relative z-40 mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[64px_1fr]">
          <Reveal className="hidden md:block">
            <SideLabel jp="服務" en="SERVICE" />
          </Reveal>

          <ScrollFx y={[150, 0]} opacity={[0, 1]}>
            <p className="font-display text-xs font-bold tracking-[0.4em] text-pink">
              COURSE INFORMATION
            </p>
            <h2 className="serif-line mt-5 text-4xl font-semibold tracking-wide md:text-5xl">
              課程資訊
            </h2>
          </ScrollFx>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ScrollFx
              key={p.title}
              x={[i === 0 ? "-20vw" : i === 3 ? "20vw" : "0vw", "0vw"]}
              y={[i === 1 || i === 2 ? "32vh" : "0vh", "0vh"]}
              opacity={[0, 1]}
              className={`h-full ${stagger[i]}`}
            >
              {/* 栞（書籤）式卡片：雙細線框、穿繩孔、照片裱框、角落印章 */}
              <div className="group relative flex h-full flex-col rounded-[4px] border border-ink/25 bg-[url('/world/shiori-portrait.jpg')] bg-cover bg-center p-1.5 shadow-[0_3px_18px_rgba(44,62,80,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(44,62,80,0.16)]">
                <div className="flex h-full flex-col border border-ink/12 px-4 pb-5 pt-7">
                  {/* 穿繩孔 */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-3.5 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
                  />
                  <div className="zoom-media relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-5 text-center">
                    <p className="font-display text-[10px] font-bold tracking-[0.22em] text-ink-soft/80">
                      {p.label}
                    </p>
                    <h3 className="serif-line mt-2 text-lg font-semibold tracking-wide">{p.title}</h3>
                    <div className="mx-auto mt-3 h-px w-8 bg-ink/20" aria-hidden />
                    {/* 全日／半日價格均等大小 */}
                    <div className="mt-3 space-y-1">
                      <p className="font-display text-lg font-extrabold text-ink">{p.priceFull}</p>
                      {p.priceHalf && (
                        <p className="font-display text-lg font-extrabold text-ink">{p.priceHalf}</p>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-[13px] leading-6 text-ink-soft">{p.body}</p>
                    <a
                      href={BOOKING_URL}
                      className="mt-5 border-b border-pink pb-1 text-sm font-bold tracking-widest text-ink transition-colors hover:text-pink-deep"
                    >
                      詳細課程資訊 →
                    </a>
                  </div>
                </div>
              </div>
            </ScrollFx>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 md:ml-[20%]">
          <p className="text-sm leading-7 text-ink-soft">
            不確定哪種課適合你？
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 border-b border-pink font-bold text-ink hover:text-pink-deep"
            >
              LINE 免費諮詢
            </a>
            ，我們幫你排。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 學員心得：微傾的紙片 ---------- */

const tilt = ["-rotate-[1.3deg]", "rotate-[0.9deg]", "rotate-[1.1deg]", "-rotate-[0.8deg]"];

export function Testimonials() {
  return (
    <section className="relative z-40 mx-auto max-w-6xl px-5 py-28 md:py-36">
      <VoiceHeader />

      <div className="mt-16 columns-1 gap-8 sm:columns-2 [column-fill:_balance] md:pl-[64px]">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={(i % 2) * 0.12} className="mb-8 break-inside-avoid">
            {/* 一筆箋式小卡：雙細線框 + 左上穿繩孔 */}
            <figure
              className={`${tilt[i % tilt.length]} relative rounded-[4px] border border-ink/22 bg-[url('/world/shiori-landscape.jpg')] bg-cover bg-center p-1.5 shadow-[0_4px_20px_rgba(44,62,80,0.1)] ${
                i % 2 === 1 ? "sm:translate-y-6" : ""
              }`}
            >
              <div className="border border-ink/10 p-7">
                <span
                  aria-hidden
                  className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full border border-ink/30 bg-cream shadow-[inset_0_1px_2px_rgba(44,62,80,0.2)]"
                />
                <div className="flex items-baseline justify-between pl-4">
                  <span className="serif-line text-4xl leading-none text-pink" aria-hidden>
                    “
                  </span>
                  <span className="text-xs tracking-widest text-brand-yellow" aria-hidden>
                    ★★★★★
                  </span>
                </div>
                <blockquote className="mt-3 leading-8 tracking-wide text-ink">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between text-sm">
                  <span className="font-bold">— {t.author}</span>
                  <span className="text-xs font-bold tracking-wider text-pink-deep">{t.context}</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 尾段：滿版影片 + CTA + 頁尾資訊直接壓在影片上 ---------- */

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/lookout-blue.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/bottom.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-ink/25 to-ink/80" />
      </div>

      {/* 去背吉祥物隨滾動向上飛出（chase 手法） */}
      <ScrollFx
        y={["25vh", "-85vh"]}
        offset={["start end", "end start"]}
        className="pointer-events-none absolute right-[6%] top-1/3 z-20 hidden w-44 md:block lg:w-56"
      >
        <Image
          src="/brand/obj-skier.png"
          alt=""
          width={340}
          height={340}
          className="h-auto w-full rotate-[8deg] drop-shadow-[0_18px_40px_rgba(44,62,80,0.35)]"
        />
      </ScrollFx>

      <div className="relative z-40 mx-auto flex max-w-4xl flex-col items-center px-6 py-36 text-center md:py-52">
        <Reveal>
          <p className="font-display text-xs font-bold tracking-[0.45em] text-white/90 drop-shadow">
            MAKE THIS SEASON YOURS
          </p>
          <h2 className="serif-line mt-6 text-4xl font-semibold tracking-wide text-white drop-shadow-[0_2px_18px_rgba(44,62,80,0.5)] md:text-6xl">
            開啟屬於你的
            <br />
            滑雪旅程。
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href={BOOKING_URL}
            className="rounded-full bg-pink px-10 py-4 text-lg font-bold text-white shadow-[0_10px_34px_rgba(216,117,218,0.6)] transition-all hover:-translate-y-1 hover:bg-pink-deep"
          >
            立即預約課程
          </a>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-white/90 px-10 py-[14px] text-lg font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:text-ink"
          >
            LINE 諮詢
          </a>
        </Reveal>
      </div>

      {/* 頁尾資訊：直接壓在影片上 */}
      <div className="relative z-40 mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-6 text-cream md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-zh.png"
            alt="PURE SKI 滑雪純愛組"
            width={220}
            height={90}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/80">
            北海道中文滑雪學校｜ISIA 認證教練
            <br />
            Ski 雙板／Snowboard 單板 全階段教學
          </p>
          <p className="mt-3 font-display text-xs font-bold tracking-widest text-pink">
            PURE LOVE FOR SNOW — SINCE 2023
          </p>
        </div>

        <nav aria-label="網站導覽">
          <h3 className="mb-3 text-sm font-bold tracking-wider text-cream/60">網站導覽</h3>
          <ul className="space-y-2 text-sm text-cream/90">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-pink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-3 text-sm font-bold tracking-wider text-cream/60">聯絡我們</h3>
          <ul className="space-y-2 text-sm text-cream/90">
            <li>{site.company.legalName}</li>
            <li>{site.company.address}</li>
            <li>
              <a href={`mailto:${site.company.email}`} className="hover:text-pink">
                {site.company.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.company.tel}`} className="hover:text-pink">
                080-1983-1329
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-2.5">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider transition-colors hover:border-pink hover:text-pink">
              INSTAGRAM
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider transition-colors hover:border-pink hover:text-pink">
              FACEBOOK
            </a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider transition-colors hover:border-brand-green hover:text-brand-green">
              LINE
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-40 border-t border-cream/15 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {site.company.legalName}｜会社法人等番号 {site.company.corporateNumber}
      </div>
    </section>
  );
}
