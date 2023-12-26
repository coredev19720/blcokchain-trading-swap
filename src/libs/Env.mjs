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
    NEXT_PUBLIC_DEFAUL_SYMBOL: z.string().min(3).max(3),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TOKEN_COOKIE: process.env.NEXT_PUBLIC_TOKEN_COOKIE,
    NEXT_PUBLIC_DEFAUL_SYMBOL: process.env.NEXT_PUBLIC_DEFAUL_SYMBOL,
  },
});
