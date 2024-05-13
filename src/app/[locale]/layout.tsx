import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { AppConfig } from "@src/utils/AppConfig";
import ThemeRegistry from "../ThemeRegistry";
import { Providers } from "@src/redux/provider";
import Layout from "@components/common/Layout";
import TanstackProviders from "@/src/providers/TanstackProviders";
export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/images/icon/logo32.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/images/icon/logo32.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/images/icon/logo16.ico",
    },
    {
      rel: "icon",
      url: "/logo32.ico",
    },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(locale)) {
    redirect(`/${AppConfig.defaultLocale}/login`);
  }

  const messages = useMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TanstackProviders>
            <ThemeRegistry options={{ key: "mui" }}>
              <Providers>
                <Layout>{children}</Layout>
              </Providers>
            </ThemeRegistry>
          </TanstackProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
