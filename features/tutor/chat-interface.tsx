"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ExplanationLevel } from "@/lib/ai-tutor/system-prompt";
import { ExplanationLevelToggle } from "./explanation-level-toggle";
import { QuickActions } from "./quick-actions";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface({
  conversationId,
  initialMessages,
  defaultExplanationLevel,
}: {
  conversationId: string;
  initialMessages: ChatMessage[];
  defaultExplanationLevel: ExplanationLevel;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [explanationLevel, setExplanationLevel] = useState<ExplanationLevel>(
    defaultExplanationLevel,
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: trimmed, explanationLevel }),
      });

      if (!response.ok || !response.body) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? "The tutor couldn't respond right now.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let streamDone = false;
      while (!streamDone) {
        const result = await reader.read();
        streamDone = result.done;
        if (result.value) {
          const chunk = decoder.decode(result.value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: last.content + chunk };
            }
            return next;
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      // Drop the empty assistant placeholder we optimistically added.
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-14rem)] min-h-[28rem] flex-col gap-4">
      <ExplanationLevelToggle value={explanationLevel} onChange={setExplanationLevel} />

      <div className="flex-1 overflow-y-auto rounded-lg border border-border p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ask a question, or use one of the quick actions below to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-2.5 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {message.content || (isStreaming && i === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <QuickActions disabled={isStreaming} onSelect={sendMessage} />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage(input);
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the tutor anything…"
          disabled={isStreaming}
          className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
        <Button type="submit" disabled={isStreaming || !input.trim()} size="icon">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
