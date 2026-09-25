"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export interface AuthActionState {
  error?: string;
}

function safeNextPath(value: FormDataEntryValue | null): string {
  // Only ever redirect to a relative in-app path — never trust this as a
  // full URL, or a signed-in redirect becomes an open-redirect vector.
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
}

/** The request's own origin, so email links work correctly on localhost
 * during development and on the real domain once deployed, without a
 * hardcoded site-URL setting to keep in sync. */
async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

const signUpSchema = z.object({
  displayName: z.string().trim().min(2, "Enter at least 2 characters.").max(60),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const origin = await getOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { display_name: parsed.data.displayName },
      // Without this, Supabase falls back to its configured Site URL and
      // appends the confirmation code there instead — which means it never
      // reaches /auth/callback, and the code just sits unused in the URL.
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect(safeNextPath(formData.get("next")));
}

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    // This one specific case is worth naming: it's actionable, and knowing
    // an email is pending confirmation doesn't expose anything an attacker
    // could use the way confirming "this email exists" would. Everything
    // else stays deliberately vague.
    if (
      (error as { code?: string }).code === "email_not_confirmed" ||
      error.message === "Email not confirmed"
    ) {
      return {
        error: "Confirm your email before signing in — check your inbox for a link from Supabase.",
      };
    }
    return { error: "Incorrect email or password." };
  }

  redirect(safeNextPath(formData.get("next")));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
