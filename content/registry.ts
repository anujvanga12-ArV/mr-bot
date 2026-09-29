import { cybersecurityBasics } from "./courses/beginner/cybersecurity-basics";
import { pythonForSecurity } from "./courses/coding/python-for-security";
import type { Course, Lesson, LessonQuiz, Module } from "./types";

export const COURSES: Course[] = [cybersecurityBasics, pythonForSecurity];

/**
 * The main security curriculum's slug, as a named constant rather than a
 * string repeated at each call site — there are now two courses at
 * "beginner" level (this one and Python for Security), so anything that
 * means "the beginner *security* course" specifically must say so, not
 * just filter by level.
 */
export const PRIMARY_SECURITY_COURSE_SLUG = cybersecurityBasics.slug;
export const CODING_COURSE_SLUG = pythonForSecurity.slug;

export function getCourse(courseSlug: string): Course | undefined {
  return COURSES.find((course) => course.slug === courseSlug);
}

export function getModule(courseSlug: string, moduleSlug: string): Module | undefined {
  return getCourse(courseSlug)?.modules.find((mod) => mod.slug === moduleSlug);
}

export function getLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): Lesson | undefined {
  return getModule(courseSlug, moduleSlug)?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

/**
 * Finds a quiz by slug across every lesson. The server trusts only this —
 * never a client-submitted "correct answer" or score.
 */
export function getQuizBySlug(quizSlug: string): LessonQuiz | undefined {
  for (const course of COURSES) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.quiz?.slug === quizSlug) {
          return lesson.quiz;
        }
      }
    }
  }
  return undefined;
}

/**
 * Given a lesson's slug alone (e.g. from a database row), finds which
 * course/module it belongs to — lesson slugs are globally unique, so this
 * is enough to reconstruct the lesson's URL.
 */
export function findLessonLocation(
  lessonSlug: string,
): { courseSlug: string; moduleSlug: string } | null {
  for (const course of COURSES) {
    for (const mod of course.modules) {
      if (mod.lessons.some((lesson) => lesson.slug === lessonSlug)) {
        return { courseSlug: course.slug, moduleSlug: mod.slug };
      }
    }
  }
  return null;
}

/** Previous/next lesson within the same module, for lesson-page navigation. */
export function getAdjacentLessons(courseSlug: string, moduleSlug: string, lessonSlug: string) {
  const mod = getModule(courseSlug, moduleSlug);
  const index = mod?.lessons.findIndex((lesson) => lesson.slug === lessonSlug) ?? -1;

  if (!mod || index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? mod.lessons[index - 1] : null,
    next: index < mod.lessons.length - 1 ? mod.lessons[index + 1] : null,
  };
}
