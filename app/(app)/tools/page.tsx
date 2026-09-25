import Link from "next/link";
import { FileSearch, KeyRound, Link2, Wifi } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TOOLS = [
  {
    href: "/tools/url-analyzer",
    icon: Link2,
    title: "URL Analyzer",
    description: "Break down a URL's structure and spot common look-alike patterns.",
  },
  {
    href: "/tools/password-checker",
    icon: KeyRound,
    title: "Password Checker",
    description: "Test example passwords for strength — never enter a real one.",
  },
  {
    href: "/tools/file-analyzer",
    icon: FileSearch,
    title: "File Analyzer",
    description: "Check a file's name, extension, size, and hash before opening it.",
  },
  {
    href: "/tools/wifi-checker",
    icon: Wifi,
    title: "Wi-Fi & Connection Checker",
    description: "What's actually checkable about your connection, plus a guided self-check.",
  },
];

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Tools</h1>
        <p className="text-muted-foreground mt-1">
          Small, honest tools — each explains what it can and can&apos;t actually tell you.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="hover:bg-secondary/50 h-full transition-colors">
              <CardHeader>
                <tool.icon className="text-accent-foreground size-5" />
                <CardTitle className="mt-2">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
