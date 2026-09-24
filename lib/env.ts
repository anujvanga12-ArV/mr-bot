import "server-only";
import { z } from "zod";
import { publicEnv } from "./env.public";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
});

/** A blank line in `.env` (e.g. `KEY=`) sets the value to "", not "unset" —
 * treat the two the same, or an optional field with an empty value fails
 * `.min(1)` instead of just being treated as absent. */
function emptyToUndefined(value: string | undefined) {
  return value === "" ? undefined : value;
}

const parsed = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: emptyToUndefined(process.env.SUPABASE_SERVICE_ROLE_KEY),
  ANTHROPIC_API_KEY: emptyToUndefined(process.env.ANTHROPIC_API_KEY),
});

if (!parsed.success) {
  throw new Error(
    `Invalid or missing server environment variables:\n${parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n")}\n\nCopy .env.example to .env and fill in the missing values.`,
  );
}

/**
 * Server-only environment access. Importing this file from a Client
 * Component will fail the build (see the `server-only` package) — that's
 * intentional, it's the guardrail against leaking a secret to the browser.
 */
export const env = {
  ...publicEnv,
  ...parsed.data,
};
