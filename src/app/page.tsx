import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import MountainWorld from "@/components/MountainWorld";
import FloatingWeather from "@/components/FloatingWeather";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import {
  Manifesto,
  Products,
  Testimonials,
  FinalCta,
} from "@/components/home/Sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <h1 className="sr-only">PURE SKI 滑雪純愛組｜北海道中文滑雪學校 Ski &amp; Snowboard 專業教學</h1>
      {/* kitamura1923 式固定演變世界（EdgeObjects / CarveLine 保留檔案，可疊加或替換） */}
      <MountainWorld />
      <FloatingWeather />
      <Hero />
      <div className="relative">
        <Manifesto />
        <Products />
        <Testimonials />
        <FinalCta />
      </div>
    </>
  );
}
