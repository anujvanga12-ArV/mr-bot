import { WifiChecker } from "@/features/tools/wifi-checker/wifi-checker";

export const metadata = { title: "Wi-Fi & Connection Checker" };

export default function WifiCheckerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Wi-Fi & Connection Checker</h1>
        <p className="mt-1 text-muted-foreground">
          What&apos;s actually checkable about a connection from a browser, plus a guided
          self-check for the network you&apos;re on.
        </p>
      </div>
      <WifiChecker />
    </div>
  );
}
