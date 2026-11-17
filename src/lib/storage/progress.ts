/**
 * Learner Progress Persistence Manager
 * Uses LocalStorage for resilient client-side state tracking
 * Center of Excellence: Data Science & Artificial Intelligence
 */

import { LearnerProgress } from "@/types/curriculum";

const STORAGE_KEY = "coe_dsai_learner_progress_v1";

const DEFAULT_PROGRESS: LearnerProgress = {
  completedChapters: {},
  completedExercises: {},
  exerciseCodeDrafts: {},
  bookmarkedSections: [],
};

export function getLearnerProgress(): LearnerProgress {
  if (typeof window === "undefined") {
    return DEFAULT_PROGRESS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      completedChapters: parsed.completedChapters || {},
      completedExercises: parsed.completedExercises || {},
      exerciseCodeDrafts: parsed.exerciseCodeDrafts || {},
      lastVisitedChapter: parsed.lastVisitedChapter,
      bookmarkedSections: parsed.bookmarkedSections || [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveLearnerProgress(progress: LearnerProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent("coe_progress_updated", { detail: progress }));
  } catch {
    // LocalStorage write failed or exceeded quota
  }
}

export function markChapterComplete(
  workshopSlug: string,
  chapterSlug: string,
  completed: boolean = true
): void {
  const current = getLearnerProgress();
  const key = `${workshopSlug}/${chapterSlug}`;
  const nextChapters = { ...current.completedChapters, [key]: completed };
  saveLearnerProgress({
    ...current,
    completedChapters: nextChapters,
  });
}

export function markExerciseComplete(exerciseId: string, completed: boolean = true): void {
  const current = getLearnerProgress();
  const nextExercises = { ...current.completedExercises, [exerciseId]: completed };
  saveLearnerProgress({
    ...current,
    completedExercises: nextExercises,
  });
}

export function saveExerciseCodeDraft(exerciseId: string, code: string): void {
  const current = getLearnerProgress();
  const nextDrafts = { ...current.exerciseCodeDrafts, [exerciseId]: code };
  saveLearnerProgress({
    ...current,
    exerciseCodeDrafts: nextDrafts,
  });
}

export function getExerciseCodeDraft(exerciseId: string, fallbackCode: string = ""): string {
  const current = getLearnerProgress();
  return current.exerciseCodeDrafts[exerciseId] ?? fallbackCode;
}

export function saveLastVisitedChapter(
  workshopSlug: string,
  chapterSlug: string,
  title: string
): void {
  const current = getLearnerProgress();
  saveLearnerProgress({
    ...current,
    lastVisitedChapter: {
      workshopSlug,
      chapterSlug,
      title,
      timestamp: Date.now(),
    },
  });
}

export function toggleBookmark(sectionId: string): boolean {
  const current = getLearnerProgress();
  const exists = current.bookmarkedSections.includes(sectionId);
  const nextBookmarks = exists
    ? current.bookmarkedSections.filter((id) => id !== sectionId)
    : [...current.bookmarkedSections, sectionId];
  saveLearnerProgress({
    ...current,
    bookmarkedSections: nextBookmarks,
  });
  return !exists;
}

export function resetLearnerProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("coe_progress_updated", { detail: DEFAULT_PROGRESS }));
  } catch {
    // Ignore
  }
}
