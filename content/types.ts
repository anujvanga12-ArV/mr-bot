import type { LearningLevel } from "@/types/domain";

/**
 * Lessons are authored as TypeScript files under content/courses/, reviewed
 * like any other code change, and synced to the `courses`/`modules`/`lessons`
 * tables (identity + ordering only) by `content/sync.ts`. See the project
 * README ("Content architecture") for why this isn't a database-backed CMS
 * yet.
 */

export interface VocabularyTerm {
  term: string;
  simpleDefinition: string;
  technicalDefinition: string;
}

export interface TextBlock {
  type: "text";
  body: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface DiagramBlock {
  type: "diagram";
  mermaid: string;
  caption?: string;
}

export interface VocabBlock {
  type: "vocabulary";
  term: VocabularyTerm;
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface KnowledgeCheckBlock {
  type: "question";
  prompt: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  hint?: string;
}

export interface ScenarioChoice {
  id: string;
  text: string;
  isSafe: boolean;
  feedback: string;
}

export interface ScenarioBlock {
  type: "scenario";
  setup: string;
  choices: ScenarioChoice[];
}

export interface ActivityBlock {
  type: "activity";
  prompt: string;
  kind: "drag-and-drop" | "matching" | "ordering";
  // Deliberately loose — each activity kind renders and validates its own
  // shape. Tighten this once a second activity kind is actually built.
  data: Record<string, unknown>;
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | DiagramBlock
  | VocabBlock
  | CodeBlock
  | KnowledgeCheckBlock
  | ScenarioBlock
  | ActivityBlock;

export interface LessonQuiz {
  slug: string;
  questions: KnowledgeCheckBlock[];
}

export interface Lesson {
  slug: string;
  title: string;
  estimatedMinutes: number;
  objective: string;
  blocks: ContentBlock[];
  quiz?: LessonQuiz;
}

export interface Module {
  slug: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  level: LearningLevel;
  description: string;
  modules: Module[];
}
