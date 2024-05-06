import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicUrls } from "@src/constants/routes";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get("NEXT_LOCALE");
  let locale = localeCookie ? localeCookie.value : defaultLocale;
  const tokenCookiesName =
    process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME ?? "access_token";
  const token = req.cookies.get(tokenCookiesName);
  let isPublic = publicUrls.some(
    (x) => `/${locale}/${x}` === req.nextUrl.pathname
  );

  //not login
  if (!token) {
    if (isPublic) return intlMiddleware(req);
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  // If the user is logged in and tries to access login or the root path, redirect to the default page
  if (
    token &&
    (req.nextUrl.pathname.includes("login") || req.nextUrl.pathname === `/`)
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/${process.env.NEXT_PUBLIC_DEFAULT_PAGE}`, req.url)
    );
  }
  return intlMiddleware(req);
}
//fix me
export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
