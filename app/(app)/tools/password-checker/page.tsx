import { PasswordChecker } from "@/features/tools/password-checker/password-checker";

export const metadata = { title: "Password Checker" };

export default function PasswordCheckerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Password Checker</h1>
        <p className="mt-1 text-muted-foreground">
          See what makes a password strong or weak, using made-up example strings.
        </p>
      </div>
      <PasswordChecker />
    </div>
  );
}
