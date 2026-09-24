import { COURSES } from "./registry";
import type { VocabularyTerm } from "./types";

export interface VocabularyEntry extends VocabularyTerm {
  lessonSlug: string;
  lessonTitle: string;
  moduleSlug: string;
  courseSlug: string;
}

/**
 * Built once from the content registry (small, static data — no need for a
 * database round trip or a search index service for this scale).
 */
export const VOCABULARY_INDEX: VocabularyEntry[] = (() => {
  const seenTerms = new Set<string>();
  const entries: VocabularyEntry[] = [];

  for (const course of COURSES) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        for (const block of lesson.blocks) {
          if (block.type !== "vocabulary") continue;
          const key = block.term.term.toLowerCase();
          if (seenTerms.has(key)) continue;
          seenTerms.add(key);
          entries.push({
            ...block.term,
            lessonSlug: lesson.slug,
            lessonTitle: lesson.title,
            moduleSlug: mod.slug,
            courseSlug: course.slug,
          });
        }
      }
    }
  }

  return entries;
})();
