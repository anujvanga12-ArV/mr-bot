import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env.public";

/**
 * Supabase client for use in Client Components. Create a new instance where
 * needed rather than sharing a module-level singleton across renders.
 */
export function createClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
