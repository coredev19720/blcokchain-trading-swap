import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
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
  if (!AppConfig.locales.includes(locale)) notFound();

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
