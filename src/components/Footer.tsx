import Image from "next/image";
import Link from "next/link";
import { site, LINE_URL } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-zh.png"
            alt="PURE SKI 滑雪純愛組"
            width={220}
            height={90}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-7 text-cream/70">
            北海道中文滑雪學校｜ISIA 認證教練
            <br />
            Ski 雙板／Snowboard 單板 全階段教學
            <br />
            Ground Trick 平花｜Carving 刻滑｜Powder 粉雪
          </p>
          <p className="mt-4 font-display text-sm font-bold tracking-widest text-pink">
            PURE LOVE FOR SNOW — SINCE 2023
          </p>
        </div>

        <nav aria-label="網站導覽">
          <h3 className="mb-4 text-sm font-bold tracking-wider text-cream/50">網站導覽</h3>
          <ul className="space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/85 transition-colors hover:text-pink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-bold tracking-wider text-cream/50">聯絡我們</h3>
          <ul className="space-y-2.5 text-sm text-cream/85">
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
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.instagram}
              className="rounded-full border border-cream/25 px-4 py-2 text-xs font-bold tracking-wider transition-colors hover:border-pink hover:text-pink"
              target="_blank"
              rel="noopener noreferrer"
            >
              INSTAGRAM
            </a>
            <a
              href={site.social.facebook}
              className="rounded-full border border-cream/25 px-4 py-2 text-xs font-bold tracking-wider transition-colors hover:border-pink hover:text-pink"
              target="_blank"
              rel="noopener noreferrer"
            >
              FACEBOOK
            </a>
            <a
              href={LINE_URL}
              className="rounded-full border border-cream/25 px-4 py-2 text-xs font-bold tracking-wider transition-colors hover:border-brand-green hover:text-brand-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINE
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {site.company.legalName}｜会社法人等番号 {site.company.corporateNumber}
      </div>
    </footer>
  );
}
