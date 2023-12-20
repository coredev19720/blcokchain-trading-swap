/* eslint-disable import/prefer-default-export */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    // CLERK_SECRET_KEY: z.string().min(1),
    // DATABASE_URL: z.string().min(1),
    // DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    // DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    // CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    //   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
