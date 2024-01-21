import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicUrls } from "@/src/constants/routes";
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get("NEXT_LOCALE");
  let locale = localeCookie ? localeCookie.value : defaultLocale;
  const token = req.cookies.get("token");

  //redirect to default locale
  const urlLocale = req.nextUrl.pathname.split("/")[1];
  if (urlLocale !== locale) {
    const newPathname = req.nextUrl.pathname.replace(
      `/${urlLocale}/`,
      `/${locale}/`
    );
    return NextResponse.redirect(new URL(newPathname, req.url));
  }

  let isPublic = false;
  publicUrls.forEach((x) => {
    if (`/${locale}/${x}` === req.nextUrl.pathname) {
      isPublic = true;
      return;
    }
  });
  //not login

  if (!token) {
    if (isPublic) return intlMiddleware(req);
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  if (token) {
    if (req.nextUrl.pathname.includes("login")) {
      return NextResponse.redirect(
        new URL(`/${locale}/${process.env.NEXT_PUBLIC_DEFAULT_PAGE}`, req.url)
      );
    }
    if (req.nextUrl.pathname === `/`) {
      return NextResponse.redirect(
        new URL(`/${locale}/${process.env.NEXT_PUBLIC_DEFAULT_PAGE}`, req.url)
      );
    }
  }
  return intlMiddleware(req);
}
export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
