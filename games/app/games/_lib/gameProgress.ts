import { games, TOTAL_GAMES, type GameMeta } from "./gamesConfig";

export type LevelBucket = "bajo" | "intermedio" | "alto";

const KEYS = {
  level: "quiz-level-bucket",
  completed: "games-completed",
  codeUnlocked: "games-code-unlocked",
  codeAttempts: "games-code-attempts",
} as const;

const UNLOCKED_BY_LEVEL: Record<LevelBucket, number> = {
  bajo: 3,
  intermedio: 4,
  alto: 5,
};

export const MAX_CODE_ATTEMPTS = 2;

function isBrowser() {
  return typeof window !== "undefined";
}

export function levelBucketFromAverage(average: number): LevelBucket {
  if (average <= 1.5) return "bajo";
  if (average <= 2.5) return "intermedio";
  return "alto";
}

export function saveQuizLevel(bucket: LevelBucket) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.level, bucket);
}

export function getQuizLevel(): LevelBucket {
  if (!isBrowser()) return "bajo";
  const stored = window.localStorage.getItem(KEYS.level);
  if (stored === "bajo" || stored === "intermedio" || stored === "alto") {
    return stored;
  }
  return "bajo";
}

export function getCompletedGames(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEYS.completed);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markGameCompleted(slug: string) {
  if (!isBrowser()) return;
  const current = getCompletedGames();
  if (!current.includes(slug)) {
    window.localStorage.setItem(
      KEYS.completed,
      JSON.stringify([...current, slug])
    );
  }
}

export function isCodeUnlocked(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.codeUnlocked) === "true";
}

export function setCodeUnlocked() {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.codeUnlocked, "true");
}

export function getCodeAttemptsUsed(): number {
  if (!isBrowser()) return 0;
  const raw = window.localStorage.getItem(KEYS.codeAttempts);
  return raw ? Number(raw) || 0 : 0;
}

export function incrementCodeAttempts(): number {
  if (!isBrowser()) return 0;
  const next = getCodeAttemptsUsed() + 1;
  window.localStorage.setItem(KEYS.codeAttempts, String(next));
  return next;
}

export function getUnlockedCount(): number {
  if (isCodeUnlocked()) return TOTAL_GAMES;
  return UNLOCKED_BY_LEVEL[getQuizLevel()];
}

/**
 * Returns the next game after `currentSlug` in the fixed game order, but
 * only if it is unlocked for the player's current level (or via code).
 * Returns null when the current game is the last one overall, or when the
 * next game is still locked — the caller should send the player back to
 * the hub in that case (where the paywall shows if applicable).
 */
export function getNextUnlockedGame(currentSlug: string): GameMeta | null {
  const currentIndex = games.findIndex((g) => g.slug === currentSlug);
  if (currentIndex === -1) return null;

  const next = games[currentIndex + 1];
  if (!next) return null;

  return next.order <= getUnlockedCount() ? next : null;
}
