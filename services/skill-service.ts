import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { achievements, skills, userAchievements, userSkills } from "@/db/schema";
import { ACHIEVEMENTS, type AchievementDefinition } from "@/content/achievements";
import { BEGINNER_SKILLS, type SkillDefinition } from "@/content/skills";
import { getCourseProgressDetail } from "./progress-service";

async function ensureSkillRow(skill: SkillDefinition) {
  const [row] = await db
    .insert(skills)
    .values({ slug: skill.slug, name: skill.name, level: skill.level, category: skill.category })
    .onConflictDoUpdate({
      target: skills.slug,
      set: { name: skill.name, level: skill.level, category: skill.category },
    })
    .returning();

  if (!row) throw new Error(`Failed to upsert skill "${skill.slug}"`);
  return row;
}

async function ensureAchievementRow(achievement: AchievementDefinition) {
  const [row] = await db
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
    })
    .returning();

  if (!row) throw new Error(`Failed to upsert achievement "${achievement.slug}"`);
  return row;
}

async function awardSkillIfNew(userId: string, skill: SkillDefinition): Promise<boolean> {
  const skillRow = await ensureSkillRow(skill);

  const existing = await db.query.userSkills.findFirst({
    where: and(eq(userSkills.userId, userId), eq(userSkills.skillId, skillRow.id)),
  });
  if (existing) return false;

  await db.insert(userSkills).values({ userId, skillId: skillRow.id }).onConflictDoNothing();
  return true;
}

async function awardAchievementIfNew(
  userId: string,
  achievement: AchievementDefinition,
): Promise<boolean> {
  const achievementRow = await ensureAchievementRow(achievement);

  const existing = await db.query.userAchievements.findFirst({
    where: and(
      eq(userAchievements.userId, userId),
      eq(userAchievements.achievementId, achievementRow.id),
    ),
  });
  if (existing) return false;

  await db
    .insert(userAchievements)
    .values({ userId, achievementId: achievementRow.id })
    .onConflictDoNothing();
  return true;
}

export interface ProgressAwards {
  newSkills: SkillDefinition[];
  newAchievements: AchievementDefinition[];
}

/**
 * Call after marking a lesson complete. Re-derives the user's full
 * completion state for the course from `progress` (never trusts a flag
 * saying "this just finished a module") and awards any skill or
 * achievement whose criteria are now satisfied and wasn't already earned.
 */
export async function evaluateProgressAwards(
  userId: string,
  courseSlug: string,
): Promise<ProgressAwards> {
  const detail = await getCourseProgressDetail(userId, courseSlug);
  if (!detail) {
    return { newSkills: [], newAchievements: [] };
  }

  const completedModuleSlugs = new Set(
    detail
      .filter(
        (mod) => mod.lessons.length > 0 && mod.lessons.every((lesson) => lesson.status === "completed"),
      )
      .map((mod) => mod.slug),
  );
  const hasAnyCompletedLesson = detail.some((mod) =>
    mod.lessons.some((lesson) => lesson.status === "completed"),
  );
  const isCourseComplete =
    detail.length > 0 && detail.every((mod) => mod.lessons.every((lesson) => lesson.status === "completed"));

  const newSkills: SkillDefinition[] = [];
  for (const skill of BEGINNER_SKILLS) {
    const satisfied = skill.requiredModuleSlugs.every((slug) => completedModuleSlugs.has(slug));
    if (satisfied && (await awardSkillIfNew(userId, skill))) {
      newSkills.push(skill);
    }
  }

  const newAchievements: AchievementDefinition[] = [];
  for (const achievement of ACHIEVEMENTS) {
    let satisfied = false;
    switch (achievement.criteria.type) {
      case "first_lesson":
        satisfied = hasAnyCompletedLesson;
        break;
      case "module_complete":
        satisfied = completedModuleSlugs.has(achievement.criteria.moduleSlug);
        break;
      case "course_complete":
        satisfied = isCourseComplete && achievement.criteria.courseSlug === courseSlug;
        break;
    }
    if (satisfied && (await awardAchievementIfNew(userId, achievement))) {
      newAchievements.push(achievement);
    }
  }

  return { newSkills, newAchievements };
}

export async function getUserSkills(userId: string) {
  return db.query.userSkills.findMany({
    where: eq(userSkills.userId, userId),
    with: { skill: true },
  });
}

export async function getUserAchievements(userId: string) {
  return db.query.userAchievements.findMany({
    where: eq(userAchievements.userId, userId),
    with: { achievement: true },
  });
}
