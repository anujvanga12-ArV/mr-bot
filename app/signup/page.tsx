import type { Metadata } from "next";
import { SignUpForm } from "@/features/auth/signup-form";

export const metadata: Metadata = { title: "Create your account" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">Start learning</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your free MR.BOT account.
          </p>
        </div>
        <SignUpForm next={next ?? "/dashboard"} />
      </div>
    </main>
  );
}
