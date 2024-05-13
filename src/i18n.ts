import { IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: "Asia/Ho_Chi_Minh",
    onError(error) {
      console.error('"🚨 Missing translation"', error);
    },
    getMessageFallback({ namespace, key, error }) {
      return "🚨 Missing translation";
    },
  };
});
