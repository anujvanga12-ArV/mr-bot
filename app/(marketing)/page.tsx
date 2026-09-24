import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PROGRESSION = [
  { level: "Beginner", description: "Passwords, phishing, and staying safe online." },
  { level: "Foundations", description: "Networking, authentication, and encryption." },
  { level: "Intermediate", description: "Network security, Linux, and incident response." },
  { level: "Advanced", description: "Security architecture, forensics, detection engineering." },
];

const FEATURES = [
  {
    title: "Interactive lessons",
    description:
      "Every concept comes with a plain-language explanation, a relatable example, and a scenario before it ever asks you to memorize a term.",
  },
  {
    title: "An AI tutor that teaches",
    description:
      "Ask it to explain something simply, quiz you on the last lesson, or walk through a scenario — it adjusts to your level instead of dumping jargon.",
  },
  {
    title: "Defensive tools you actually use",
    description:
      "Inspect a URL, check a password's strength, or see what makes a Wi-Fi connection secure — real, limited tools with honest explanations of what they can't tell you.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn how to stay safe online — then keep going.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          MR.BOT teaches cybersecurity from your very first lesson through serious technical
          depth, with interactive scenarios, real quizzes, and an AI tutor that meets you at your
          level.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Start learning free
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Sign in
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold">
            From &ldquo;I know nothing about this&rdquo; to genuinely knowledgeable
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRESSION.map((step, i) => (
              <Card key={step.level}>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Level {i + 1}</p>
                  <CardTitle>{step.level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold">Your first lesson takes ten minutes.</h2>
          <p className="mt-2 text-muted-foreground">No credit card, no prior knowledge required.</p>
          <div className="mt-6">
            <Link href="/signup" className={buttonVariants({ size: "lg" })}>
              Create your account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
