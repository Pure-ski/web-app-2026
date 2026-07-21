import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { aboutFeatures, aboutTrust } from "@/content/pages";
import { site, LINE_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "PURE SKI 滑雪純愛組是北海道合法註冊的專業滑雪學校，持有正式工作簽證與國際證照的教練團隊，服務手稻、札幌國際、留壽都、星野 TOMAMU 等雪場。我們的名字在日文裡聽起來就像「ピュア好き」——純粹的喜歡。",
  alternates: { canonical: "/about" },
};

function Hl({ children }: { children: React.ReactNode }) {
  return <span className="brush-underline font-semibold text-ink">{children}</span>;
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        jp="純愛"
        en="ABOUT"
        title="純粹的喜歡，ピュア好き"
        sub="北海道專業滑雪學校 PURE SKI 滑雪純愛組"
       watermark="c" big="brand" bigOpacity={0.08} bigSize="compact" />

      <div className="mx-auto max-w-4xl px-6 pb-28">
        <Reveal>
          <p className="serif-line text-xl font-semibold leading-9 tracking-wide md:text-2xl md:leading-10">
            還記得第一次愛上某件事的感覺嗎？
          </p>
          <p className="mt-6 text-base leading-9 tracking-wide text-ink-soft md:text-lg md:leading-10">
            那種純粹的、不假思索的喜悅——風在耳邊呼嘯，雪在板下流動，全世界只剩下你和眼前這片山。
          </p>
          <p className="mt-6 text-base leading-9 tracking-wide text-ink-soft md:text-lg md:leading-10">
            這份愛，就是 PURE SKI 的初衷。
          </p>
          <p className="mt-6 text-base leading-9 tracking-wide text-ink-soft md:text-lg md:leading-10">
            我們的名字，在日文裡聽起來就像「ピュア好き」（Pure Suki）——「
            <Hl>純粹的喜歡</Hl>
            」。我們想做的，就是把這份對滑雪最真誠的熱愛，原封不動地分享給每一位來到這裡的您。
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">
            <Hl>專業</Hl>，是我們對這份熱愛死守的承諾
          </h2>
          <p className="mt-6 leading-9 tracking-wide text-ink-soft">
            PURE SKI 滑雪純愛組是在日本北海道合法註冊的專業滑雪學校（PURE SKI
            株式会社）。從一開始，我們就致力滿足日本政府的各項要求，無論是資本額
            3000
            萬、聘請負責稅務的税理士、負責員工福利的社勞士、和雪場簽署正式合作合約、聘請日本員工、事務主管具有日文
            N1 資格等等，這些在我們眼中是必要的支出、而非可以妥協的成本。很不容易，但我們必須堅持。
          </p>
          <p className="mt-6 leading-9 tracking-wide text-ink-soft">
            我們很清楚，唯有完全<Hl>合法合規</Hl>
            ，我們才對得起每一位來到這裡的學員。而我們從一開始，就希望這是一個沒有終點的事業，一份讓我們可以陪伴大家到沒有雪滑為止的事業。
          </p>
          <p className="mt-6 leading-9 tracking-wide text-ink-soft">
            PURE SKI 有多位單、雙板的專業教練，每一位都持有日本<Hl>正式工作簽證</Hl>
            及滑雪國際認證執照，以北海道為主要服務範圍——手稻、札幌國際、留壽都、星野
            TOMAMU、Kiroro 等多座雪場。
          </p>
          <p className="mt-6 leading-9 tracking-wide text-ink-soft">
            無論您是第一次踏上雪板的新手，還是想突破瓶頸的滑雪愛好者，我們都希望
            <Hl>和純愛一起的旅程，能成為您愛上雪地的起點</Hl>。
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">我們的特色</h2>
          <ul className="mt-6 space-y-3">
            {aboutFeatures.map((f) => (
              <li key={f} className="flex gap-3 leading-8 text-ink-soft">
                <span className="mt-0.5 text-pink" aria-hidden>
                  ❄
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="serif-line mt-10 text-lg font-semibold leading-9 tracking-wide">
            從第一堂課到最後一個轉彎，我們陪您一起，抓住那份最純粹的喜歡。
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <h2 className="serif-line text-2xl font-semibold tracking-wide">
            最高規格的安全與服務
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {aboutTrust.map((t) => (
              <div key={t.title} className="rounded-[4px] border border-ink/15 bg-card/70 p-6">
                <h3 className="font-bold tracking-wide text-pink-deep">{t.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
                  {t.items.map((i) => (
                    <li key={i}>・{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap items-center justify-between gap-8 rounded-[4px] border border-ink/15 bg-card/70 p-8">
          <div>
            <h2 className="serif-line text-xl font-semibold tracking-wide">公司資訊</h2>
            <p className="mt-4 text-sm leading-8 text-ink-soft">
              {site.company.legalName}
              <br />
              {site.company.address}
              <br />
              Email：{site.company.email}
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-pink-cta px-6 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-pink-cta-hover"
            >
              官方 LINE 加入好友
            </a>
          </div>
          <Image
            src="/brand/logo-zh.png"
            alt="滑雪純愛組"
            width={260}
            height={107}
            className="h-auto w-48"
          />
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
