import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env.public";

/**
 * Supabase client for Server Components, Server Actions, and Route Handlers.
 * Server Components can't write cookies, so `setAll` is wrapped in a
 * try/catch: it's a no-op there, and relies on `proxy.ts` having
 * already refreshed the session for the request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — safe to ignore, see comment above.
        }
      },
    },
  });
}
