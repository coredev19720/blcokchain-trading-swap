/* eslint-disable import/prefer-default-export */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    TOKEN_AL: z.string().min(1),
    TOKEN_FORMAT: z.string().min(1),
    TOKEN_SK: z.string().min(1),
    TOKEN_IV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_TOKEN_COOKIE: z.string().min(1),
    NEXT_PUBLIC_DEFAULT_SYMBOL: z.string().min(3).max(3),
    NEXT_PUBLIC_DEFAULT_PAGE: z.string().min(1),
    NEXT_PUBLIC_LAST_SYM_KEY: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(10),
    NEXT_PUBLIC_TOKEN_AL: z.string().min(1),
    NEXT_PUBLIC_TOKEN_FORMAT: z.string().min(1),
    NEXT_PUBLIC_TOKEN_SK: z.string().min(1),
    NEXT_PUBLIC_TOKEN_IV: z.string().min(1),
    NEXT_PUBLIC_PREFIX_ACCOUNT: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TOKEN_COOKIE: process.env.NEXT_PUBLIC_TOKEN_COOKIE,
    NEXT_PUBLIC_DEFAULT_SYMBOL: process.env.NEXT_PUBLIC_DEFAULT_SYMBOL,
    NEXT_PUBLIC_DEFAULT_PAGE: process.env.NEXT_PUBLIC_DEFAULT_PAGE,
    NEXT_PUBLIC_LAST_SYM_KEY: process.env.NEXT_PUBLIC_LAST_SYM_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_TOKEN_AL: process.env.TOKEN_AL,
    NEXT_PUBLIC_TOKEN_FORMAT: process.env.TOKEN_FORMAT,
    NEXT_PUBLIC_TOKEN_SK: process.env.TOKEN_SK,
    NEXT_PUBLIC_TOKEN_IV: process.env.TOKEN_IV,
    TOKEN_AL: process.env.TOKEN_AL,
    TOKEN_FORMAT: process.env.TOKEN_FORMAT,
    TOKEN_SK: process.env.TOKEN_SK,
    TOKEN_IV: process.env.TOKEN_IV,
    NEXT_PUBLIC_PREFIX_ACCOUNT: process.env.NEXT_PUBLIC_PREFIX_ACCOUNT,
  },
});
