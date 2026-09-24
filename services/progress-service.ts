import "server-only";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { courses, lessons, modules, progress } from "@/db/schema";
import type { LessonStatus } from "@/types/domain";

export async function markLessonComplete(userId: string, lessonId: string) {
  await db
    .insert(progress)
    .values({ userId, lessonId, status: "completed", completedAt: new Date() })
    .onConflictDoUpdate({
      target: [progress.userId, progress.lessonId],
      set: { status: "completed", completedAt: new Date() },
    });
}

export async function getLessonProgressStatus(
  userId: string,
  lessonId: string,
): Promise<LessonStatus> {
  const row = await db.query.progress.findFirst({
    where: and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)),
  });
  return row?.status ?? "not_started";
}

/**
 * Real completion numbers derived from `progress` rows — never hardcode or
 * estimate these for display (see the product spec's "no fake statistics"
 * rule).
 */
export async function getCourseCompletion(userId: string, courseSlug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, courseSlug),
    with: { modules: { with: { lessons: true } } },
  });

  if (!course) return null;

  const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (lessonIds.length === 0) {
    return { completed: 0, total: 0, percent: 0 };
  }

  const completedRows = await db.query.progress.findMany({
    where: and(eq(progress.userId, userId), eq(progress.status, "completed")),
  });
  const completedIds = new Set(completedRows.map((row) => row.lessonId));
  const completed = lessonIds.filter((id) => completedIds.has(id)).length;

  return {
    completed,
    total: lessonIds.length,
    percent: Math.round((completed / lessonIds.length) * 100),
  };
}

/**
 * First not-yet-completed lesson, in curriculum order — powers "Continue
 * Learning" and "Recommended Next" on the dashboard.
 */
export async function getNextLesson(userId: string, courseSlug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, courseSlug),
    with: {
      modules: {
        orderBy: asc(modules.order),
        with: { lessons: { orderBy: asc(lessons.order) } },
      },
    },
  });

  if (!course) return null;

  const orderedLessons = course.modules.flatMap((m) => m.lessons);
  const completedRows = await db.query.progress.findMany({
    where: and(eq(progress.userId, userId), eq(progress.status, "completed")),
  });
  const completedIds = new Set(completedRows.map((row) => row.lessonId));

  return orderedLessons.find((lesson) => !completedIds.has(lesson.id)) ?? null;
}

export interface LessonWithStatus {
  id: string;
  slug: string;
  title: string;
  estimatedMinutes: number;
  status: LessonStatus;
}

export interface ModuleWithStatus {
  slug: string;
  title: string;
  lessons: LessonWithStatus[];
}

/** Full module/lesson tree for a course, each lesson annotated with this user's status. */
export async function getCourseProgressDetail(
  userId: string,
  courseSlug: string,
): Promise<ModuleWithStatus[] | null> {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, courseSlug),
    with: {
      modules: {
        orderBy: asc(modules.order),
        with: { lessons: { orderBy: asc(lessons.order) } },
      },
    },
  });

  if (!course) return null;

  const progressRows = await db.query.progress.findMany({ where: eq(progress.userId, userId) });
  const statusByLessonId = new Map(progressRows.map((row) => [row.lessonId, row.status]));

  return course.modules.map((mod) => ({
    slug: mod.slug,
    title: mod.title,
    lessons: mod.lessons.map((lesson) => ({
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      estimatedMinutes: lesson.estimatedMinutes,
      status: statusByLessonId.get(lesson.id) ?? "not_started",
    })),
  }));
}
