import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./constants";

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
