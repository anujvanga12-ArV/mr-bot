export interface PasswordPattern {
  id: string;
  label: string;
  detail: string;
}

export type PasswordStrength = "very-weak" | "weak" | "fair" | "strong" | "very-strong";

export interface PasswordAnalysisResult {
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
  varietyCount: number;
  strength: PasswordStrength;
  patterns: PasswordPattern[];
}

// A small illustrative sample, not an exhaustive breach-list lookup — the
// point is teaching the *idea* that common passwords are guessed first,
// not building a real credential-checking service.
const COMMON_PASSWORDS = new Set([
  "password",
  "123456",
  "12345678",
  "123456789",
  "qwerty",
  "letmein",
  "111111",
  "abc123",
  "iloveyou",
  "admin",
  "welcome",
  "monkey",
  "dragon",
]);

const SEQUENTIAL_RUNS = [
  "0123456789",
  "abcdefghijklmnopqrstuvwxyz",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];
const SEQUENTIAL_RUN_LENGTH = 4;

function findSequentialRun(lower: string): string | null {
  for (const run of SEQUENTIAL_RUNS) {
    for (let i = 0; i <= run.length - SEQUENTIAL_RUN_LENGTH; i++) {
      const slice = run.slice(i, i + SEQUENTIAL_RUN_LENGTH);
      if (lower.includes(slice)) {
        return slice;
      }
    }
  }
  return null;
}

export function analyzePassword(value: string): PasswordAnalysisResult {
  const length = value.length;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(value);
  const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

  const patterns: PasswordPattern[] = [];
  const lower = value.toLowerCase();

  if (length > 0 && COMMON_PASSWORDS.has(lower)) {
    patterns.push({
      id: "common-password",
      label: "One of the most commonly used passwords",
      detail:
        "Lists of the most common passwords are the very first thing automated guessing tools try.",
    });
  }

  const sequentialRun = findSequentialRun(lower);
  if (sequentialRun) {
    patterns.push({
      id: "sequential-run",
      label: "Contains a sequential or keyboard-order run",
      detail: `A run like "${sequentialRun}" is predictable and one of the first patterns a guessing tool checks for.`,
    });
  }

  if (/(.)\1{2,}/.test(value)) {
    patterns.push({
      id: "repeated-character",
      label: "Contains a repeated character run",
      detail:
        "Repeating the same character several times adds length without adding much real unpredictability.",
    });
  }

  if (/(19|20)\d{2}/.test(value)) {
    patterns.push({
      id: "year-like-number",
      label: "Contains what looks like a year",
      detail:
        "Birth years and the current year are commonly appended to passwords, and guessing tools check for exactly that.",
    });
  }

  let score = 0;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (varietyCount >= 2) score += 1;
  if (varietyCount >= 3) score += 1;
  score = Math.max(0, score - patterns.length);

  const strength: PasswordStrength =
    length === 0 || score <= 1
      ? "very-weak"
      : score === 2
        ? "weak"
        : score === 3
          ? "fair"
          : score === 4
            ? "strong"
            : "very-strong";

  return { length, hasLower, hasUpper, hasDigit, hasSymbol, varietyCount, strength, patterns };
}
