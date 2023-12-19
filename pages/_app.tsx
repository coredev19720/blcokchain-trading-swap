import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/app/utils/createEmoticonCache";
import lightThemes from "@/app/themes/light";
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  console.log(123);
  useEffect(() => {}, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={lightThemes}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
