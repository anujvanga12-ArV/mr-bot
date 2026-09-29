import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { ACHIEVEMENTS } from "./achievements";
import { COURSES } from "./registry";
import { BEGINNER_SKILLS } from "./skills";

const { achievements, courses, lessons, modules, skills } = schema;

// This script runs via `tsx`, entirely outside Next.js's bundler — so the
// `server-only` guard used by the app's normal db/client.ts is not just
// unnecessary here, it actively breaks (that package throws unconditionally
// when required outside Next's build system, since the bundler-level
// aliasing that makes it a no-op on the server never happens for a plain
// Node script). Reading DATABASE_URL directly is the correct, safe thing
// for a CLI script to do — there's no browser bundle for a secret to leak
// into.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
}

const queryClient = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(queryClient, { schema });

async function syncSkillsAndAchievements() {
  for (const skill of BEGINNER_SKILLS) {
    await db
      .insert(skills)
      .values({ slug: skill.slug, name: skill.name, level: skill.level, category: skill.category })
      .onConflictDoUpdate({
        target: skills.slug,
        set: { name: skill.name, level: skill.level, category: skill.category },
      });
  }

  for (const achievement of ACHIEVEMENTS) {
    await db
      .insert(achievements)
      .values({
        slug: achievement.slug,
        name: achievement.name,
        description: achievement.description,
        criteria: achievement.criteria,
      })
      .onConflictDoUpdate({
        target: achievements.slug,
        set: {
          name: achievement.name,
          description: achievement.description,
          criteria: achievement.criteria,
        },
      });
  }
}

async function main() {
  for (const [courseOrder, course] of COURSES.entries()) {
    const [courseRow] = await db
      .insert(courses)
      .values({ slug: course.slug, title: course.title, level: course.level, order: courseOrder })
      .onConflictDoUpdate({
        target: courses.slug,
        set: { title: course.title, level: course.level, order: courseOrder },
      })
      .returning();

    if (!courseRow) throw new Error(`Failed to upsert course "${course.slug}"`);

    for (const [moduleOrder, mod] of course.modules.entries()) {
      const [moduleRow] = await db
        .insert(modules)
        .values({ courseId: courseRow.id, slug: mod.slug, title: mod.title, order: moduleOrder })
        .onConflictDoUpdate({
          target: modules.slug,
          set: { title: mod.title, order: moduleOrder, courseId: courseRow.id },
        })
        .returning();

      if (!moduleRow) throw new Error(`Failed to upsert module "${mod.slug}"`);

      for (const [lessonOrder, lesson] of mod.lessons.entries()) {
        await db
          .insert(lessons)
          .values({
            moduleId: moduleRow.id,
            slug: lesson.slug,
            title: lesson.title,
            order: lessonOrder,
            estimatedMinutes: lesson.estimatedMinutes,
          })
          .onConflictDoUpdate({
            target: lessons.slug,
            set: {
              title: lesson.title,
              order: lessonOrder,
              estimatedMinutes: lesson.estimatedMinutes,
              moduleId: moduleRow.id,
            },
          });
      }
    }
  }

  await syncSkillsAndAchievements();

  const lessonCount = COURSES.flatMap((c) => c.modules).flatMap((m) => m.lessons).length;
  console.log(
    `Synced ${COURSES.length} course(s), ${lessonCount} lesson(s), ${BEGINNER_SKILLS.length} skill(s), ${ACHIEVEMENTS.length} achievement(s).`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Content sync failed:", error);
    process.exit(1);
  });
