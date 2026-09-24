import type { Module } from "@/content/types";
import { whatMakesAPasswordStrong } from "./lesson-01-what-makes-a-password-strong";
import { passwordReuseAndManagers } from "./lesson-02-password-reuse-and-managers";
import { mfaAndAccountRecovery } from "./lesson-03-mfa-and-account-recovery";

export const module03PasswordsAndAccounts: Module = {
  slug: "passwords-and-accounts",
  title: "Passwords & Accounts",
  lessons: [whatMakesAPasswordStrong, passwordReuseAndManagers, mfaAndAccountRecovery],
};
