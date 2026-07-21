import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "@/content/site";

const PRODUCTION_HOST = new URL(site.url).host;

/**
 * Vercel 預覽網址（*.vercel.app）內容與正式站幾乎一致，若被索引會與正式網域
 * 產生重複內容互相稀釋權重。只有請求 host 完全等於正式網域時才允許索引。
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const response = NextResponse.next();

  if (host !== PRODUCTION_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
