import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { courses, lessons, modules } from "@/db/schema";
import type { LearningLevel } from "@/types/domain";

export async function listCourses(level?: LearningLevel) {
  return db.query.courses.findMany({
    where: level ? eq(courses.level, level) : undefined,
    orderBy: asc(courses.order),
  });
}

export async function getCourseBySlug(slug: string) {
  return db.query.courses.findFirst({ where: eq(courses.slug, slug) });
}

export async function getCourseWithModules(slug: string) {
  return db.query.courses.findFirst({
    where: eq(courses.slug, slug),
    with: {
      modules: {
        orderBy: asc(modules.order),
        with: {
          lessons: {
            orderBy: asc(lessons.order),
          },
        },
      },
    },
  });
}

/**
 * Looks up a lesson's database row by its (globally unique) slug. Content
 * files are the source of truth for lesson *content*; this is how we find
 * the stable id that `progress` and `quiz_attempts` reference.
 */
export async function getLessonBySlug(lessonSlug: string) {
  return db.query.lessons.findFirst({
    where: eq(lessons.slug, lessonSlug),
  });
}
