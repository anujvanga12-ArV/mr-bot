import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

/**
 * Supabase manages `auth.users` itself — we only declare enough of it here
 * to reference `id` as a foreign key from `profiles`. Never write to this
 * table directly; go through supabase.auth.* instead.
 */
const authSchema = pgSchema("auth");
/**
 * A note on the RLS policies below, since it's easy to assume more from
 * them than is actually true: `db/client.ts` connects with Supabase's
 * pooled connection string, not a per-request connection authenticated as
 * the signed-in user. That means these policies do NOT run against queries
 * issued through Drizzle (`db.query...`, `db.select()...`) in this
 * codebase today — Postgres only evaluates RLS for connections that carry
 * the user's JWT context, which this one doesn't.
 *
 * The actual authorization boundary for this app is the application layer:
 * every service function that touches user data takes a `userId` derived
 * server-side from `supabase.auth.getUser()` (never from client input), and
 * every query filters by it explicitly. See services/tutor-service.ts for
 * an example of a function that verifies ownership itself rather than
 * trusting the caller to have checked it earlier in the request.
 *
 * The policies are still worth keeping: they're correct, and they'd take
 * effect immediately if a future feature reads this data through
 * @supabase/supabase-js instead of Drizzle (which does carry the user's
 * JWT). Don't treat them as protecting today's Drizzle queries, though —
 * that would be exactly the kind of "fake security result" this project
 * explicitly rules out.
 */
export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const learningLevelEnum = pgEnum("learning_level", [
  "beginner",
  "foundations",
  "intermediate",
  "advanced",
]);

export const lessonStatusEnum = pgEnum("lesson_status", [
  "not_started",
  "in_progress",
  "completed",
]);

export const aiMessageRoleEnum = pgEnum("ai_message_role", ["user", "assistant"]);

// --- Identity & curriculum (course/module/lesson content itself lives in
// content/, these tables exist so progress/skills have something to
// reference — see the "content architecture" note in the project README) ---

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    displayName: text("display_name").notNull(),
    learningLevel: learningLevelEnum("learning_level").notNull().default("beginner"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("profiles_select_own", {
      for: "select",
      to: authenticatedRole,
      using: sql`${table.id} = auth.uid()`,
    }),
    pgPolicy("profiles_update_own", {
      for: "update",
      to: authenticatedRole,
      using: sql`${table.id} = auth.uid()`,
    }),
  ],
);

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  level: learningLevelEnum("level").notNull(),
  order: integer("order").notNull(),
});

export const modules = pgTable(
  "modules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    order: integer("order").notNull(),
  },
  (table) => [index("modules_course_id_idx").on(table.courseId)],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    order: integer("order").notNull(),
    estimatedMinutes: integer("estimated_minutes").notNull().default(10),
  },
  (table) => [index("lessons_module_id_idx").on(table.moduleId)],
);

// --- Skills ---

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  level: learningLevelEnum("level").notNull(),
  category: text("category").notNull(),
});

export const userSkills = pgTable(
  "user_skills",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.skillId] }),
    pgPolicy("user_skills_select_own", {
      for: "select",
      to: authenticatedRole,
      using: sql`${table.userId} = auth.uid()`,
    }),
  ],
);

// --- Progress & quizzes ---

export const progress = pgTable(
  "progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: lessonStatusEnum("status").notNull().default("not_started"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.lessonId] }),
    pgPolicy("progress_all_own", {
      for: "all",
      to: authenticatedRole,
      using: sql`${table.userId} = auth.uid()`,
      withCheck: sql`${table.userId} = auth.uid()`,
    }),
  ],
);

export const quizAttempts = pgTable(
  "quiz_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    // References a quiz defined in content/, not a DB row — see db/README.
    quizSlug: text("quiz_slug").notNull(),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    answers: jsonb("answers").notNull().$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("quiz_attempts_user_id_idx").on(table.userId),
    pgPolicy("quiz_attempts_all_own", {
      for: "all",
      to: authenticatedRole,
      using: sql`${table.userId} = auth.uid()`,
      withCheck: sql`${table.userId} = auth.uid()`,
    }),
  ],
);

// --- Achievements ---

export const achievements = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  criteria: jsonb("criteria").notNull().$type<Record<string, unknown>>(),
});

export const userAchievements = pgTable(
  "user_achievements",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    achievementId: uuid("achievement_id")
      .notNull()
      .references(() => achievements.id, { onDelete: "cascade" }),
    earnedAt: timestamp("earned_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.achievementId] }),
    pgPolicy("user_achievements_select_own", {
      for: "select",
      to: authenticatedRole,
      using: sql`${table.userId} = auth.uid()`,
    }),
  ],
);

// --- AI tutor ---

export const aiConversations = pgTable(
  "ai_conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonContextId: uuid("lesson_context_id").references(() => lessons.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("ai_conversations_user_id_idx").on(table.userId),
    pgPolicy("ai_conversations_all_own", {
      for: "all",
      to: authenticatedRole,
      using: sql`${table.userId} = auth.uid()`,
      withCheck: sql`${table.userId} = auth.uid()`,
    }),
  ],
);

export const aiMessages = pgTable(
  "ai_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => aiConversations.id, { onDelete: "cascade" }),
    role: aiMessageRoleEnum("role").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("ai_messages_conversation_id_idx").on(table.conversationId),
    pgPolicy("ai_messages_all_via_conversation", {
      for: "all",
      to: authenticatedRole,
      using: sql`${table.conversationId} in (select id from ai_conversations where user_id = auth.uid())`,
      withCheck: sql`${table.conversationId} in (select id from ai_conversations where user_id = auth.uid())`,
    }),
  ],
);

// --- Tools ---

export const toolResults = pgTable(
  "tool_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    toolSlug: text("tool_slug").notNull(),
    inputSummary: text("input_summary").notNull(),
    output: jsonb("output").notNull().$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("tool_results_user_id_idx").on(table.userId)],
);

// --- Relations (enables db.query.courses.findMany({ with: { modules: ... } })) ---

export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
  progress: many(progress),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  progress: many(progress),
  userSkills: many(userSkills),
  userAchievements: many(userAchievements),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(profiles, { fields: [progress.userId], references: [profiles.id] }),
  lesson: one(lessons, { fields: [progress.lessonId], references: [lessons.id] }),
}));

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(profiles, { fields: [userSkills.userId], references: [profiles.id] }),
  skill: one(skills, { fields: [userSkills.skillId], references: [skills.id] }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(profiles, { fields: [userAchievements.userId], references: [profiles.id] }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));
