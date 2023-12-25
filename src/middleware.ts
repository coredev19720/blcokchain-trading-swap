import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicUrls } from "@/src/constants/routes";
const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localeDetection: false,
});

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get("NEXT_LOCALE");
  let locale = defaultLocale;
  if (localeCookie) {
    locale = localeCookie.value;
  }
  const token = req.cookies.get("token");

  let isPublic = false;
  publicUrls.forEach((x) => {
    if (`/${locale}/${x}` === req.nextUrl.pathname) {
      isPublic = true;
      return;
    }
  });

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  if (token || isPublic) {
    return intlMiddleware(req);
  }
}
export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
