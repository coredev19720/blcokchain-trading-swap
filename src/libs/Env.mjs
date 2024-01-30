/* eslint-disable import/prefer-default-export */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    // TOKEN_COOKIE: z.string().min(1),
    // DATABASE_URL: z.string().min(1),
    // DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_TOKEN_COOKIE: z.string().min(1),
    NEXT_PUBLIC_DEFAULT_SYMBOL: z.string().min(3).max(3),
    NEXT_PUBLIC_DEFAULT_PAGE: z.string().min(1),
    NEXT_PUBLIC_LAST_SYM_KEY: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(10),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TOKEN_COOKIE: process.env.NEXT_PUBLIC_TOKEN_COOKIE,
    NEXT_PUBLIC_DEFAULT_SYMBOL: process.env.NEXT_PUBLIC_DEFAULT_SYMBOL,
    NEXT_PUBLIC_DEFAULT_PAGE: process.env.NEXT_PUBLIC_DEFAULT_PAGE,
    NEXT_PUBLIC_LAST_SYM_KEY: process.env.NEXT_PUBLIC_LAST_SYM_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
});
