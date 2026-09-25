import { COURSES } from "@/content/registry";
import { VOCABULARY_INDEX } from "@/content/vocabulary-index";

interface BaseEntry {
  href: string;
  primaryText: string;
  secondaryText: string;
}

export interface VocabSearchEntry extends BaseEntry {
  type: "vocabulary";
  term: string;
  simpleDefinition: string;
}

export interface LessonSearchEntry extends BaseEntry {
  type: "lesson";
  title: string;
  objective: string;
}

export interface ToolSearchEntry extends BaseEntry {
  type: "tool";
  title: string;
  description: string;
}

export type SearchEntry = VocabSearchEntry | LessonSearchEntry | ToolSearchEntry;

const TOOL_ENTRIES: ToolSearchEntry[] = [
  {
    type: "tool",
    title: "URL Analyzer",
    description: "Break down a URL's structure and spot common look-alike patterns.",
    href: "/tools/url-analyzer",
    primaryText: "URL Analyzer",
    secondaryText: "Break down a URL's structure and spot common look-alike patterns.",
  },
  {
    type: "tool",
    title: "Password Checker",
    description: "Test example passwords for strength — never enter a real one.",
    href: "/tools/password-checker",
    primaryText: "Password Checker",
    secondaryText: "Test example passwords for strength — never enter a real one.",
  },
  {
    type: "tool",
    title: "File Analyzer",
    description: "Check a file's name, extension, size, and hash before opening it.",
    href: "/tools/file-analyzer",
    primaryText: "File Analyzer",
    secondaryText: "Check a file's name, extension, size, and hash before opening it.",
  },
  {
    type: "tool",
    title: "Wi-Fi & Connection Checker",
    description: "What's actually checkable about your connection, plus a guided self-check.",
    href: "/tools/wifi-checker",
    primaryText: "Wi-Fi & Connection Checker",
    secondaryText: "What's actually checkable about your connection, plus a guided self-check.",
  },
];

function buildVocabEntries(): VocabSearchEntry[] {
  return VOCABULARY_INDEX.map((entry) => ({
    type: "vocabulary",
    term: entry.term,
    simpleDefinition: entry.simpleDefinition,
    href: `/learn/${entry.courseSlug}/${entry.moduleSlug}/${entry.lessonSlug}`,
    primaryText: entry.term,
    secondaryText: entry.simpleDefinition,
  }));
}

function buildLessonEntries(): LessonSearchEntry[] {
  const entries: LessonSearchEntry[] = [];
  for (const course of COURSES) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        entries.push({
          type: "lesson",
          title: lesson.title,
          objective: lesson.objective,
          href: `/learn/${course.slug}/${mod.slug}/${lesson.slug}`,
          primaryText: lesson.title,
          secondaryText: lesson.objective,
        });
      }
    }
  }
  return entries;
}

const ALL_ENTRIES: SearchEntry[] = [
  ...buildVocabEntries(),
  ...buildLessonEntries(),
  ...TOOL_ENTRIES,
];

const MAX_RESULTS = 20;

/**
 * Ranks a primary-field match (a term or a title) above a match found only
 * in the secondary description text, then falls back to the original
 * content order. Good enough for a dataset this size — a proper search
 * index/service would only be worth the complexity once content volume
 * outgrows this.
 */
export function search(query: string): SearchEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const scored = ALL_ENTRIES.map((entry, originalIndex) => {
    const primary = entry.primaryText.toLowerCase();
    const secondary = entry.secondaryText.toLowerCase();

    let score = 0;
    if (primary === trimmed) score = 3;
    else if (primary.startsWith(trimmed)) score = 2;
    else if (primary.includes(trimmed)) score = 1;
    else if (secondary.includes(trimmed)) score = 0.5;

    return { entry, score, originalIndex };
  });

  return scored
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex)
    .slice(0, MAX_RESULTS)
    .map((row) => row.entry);
}
