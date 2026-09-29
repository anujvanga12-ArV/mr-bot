import "server-only";
import { and, count, eq, gte } from "drizzle-orm";
import { db } from "@/db/client";
import { aiConversations, aiMessages } from "@/db/schema";

// A simple per-user hourly cap, enforced with a DB query rather than a
// dedicated rate-limiting service (e.g. Upstash Redis) — reasonable for a
// single-region MVP. Revisit with a real token-bucket store if the app ever
// scales to multiple regions/instances where this query becomes a
// bottleneck.
const MAX_USER_MESSAGES_PER_HOUR = 30;

export async function isWithinTutorRateLimit(userId: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const [row] = await db
    .select({ value: count() })
    .from(aiMessages)
    .innerJoin(aiConversations, eq(aiMessages.conversationId, aiConversations.id))
    .where(
      and(
        eq(aiConversations.userId, userId),
        eq(aiMessages.role, "user"),
        gte(aiMessages.createdAt, oneHourAgo),
      ),
    );

  return (row?.value ?? 0) < MAX_USER_MESSAGES_PER_HOUR;
}
