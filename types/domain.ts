export const LEARNING_LEVELS = ["beginner", "foundations", "intermediate", "advanced"] as const;
export type LearningLevel = (typeof LEARNING_LEVELS)[number];

export const LESSON_STATUSES = ["not_started", "in_progress", "completed"] as const;
export type LessonStatus = (typeof LESSON_STATUSES)[number];
