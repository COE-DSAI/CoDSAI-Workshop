"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Lock } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { getAllWorkshops } from "@/content/workshops";
import {
  getLearnerProgress,
  resetLearnerProgress,
} from "@/lib/storage/progress";
import { LearnerProgress } from "@/types/curriculum";

export default function LearnerDashboardPage() {
  const workshops = getAllWorkshops();
  const [progress, setProgress] = useState<LearnerProgress>({
    completedChapters: {},
    completedExercises: {},
    exerciseCodeDrafts: {},
    bookmarkedSections: [],
  });

  useEffect(() => {
    const update = () => setProgress(getLearnerProgress());
    update();
    window.addEventListener("coe_progress_updated", update);
    return () => window.removeEventListener("coe_progress_updated", update);
  }, []);

  const totalChapters = workshops.reduce((acc, w) => acc + w.chapters.length, 0);
  const completedCount = Object.values(progress.completedChapters).filter(Boolean).length;
  const overallPercentage =
    totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  let nextChapter: {
    workshopSlug: string;
    chapterSlug: string;
    title: string;
    number: number;
  } | null = null;
  for (const w of workshops) {
    for (const ch of w.chapters) {
      if (!progress.completedChapters[`${w.slug}/${ch.slug}`]) {
        nextChapter = {
          workshopSlug: w.slug,
          chapterSlug: ch.slug,
          title: ch.title,
          number: ch.number,
        };
        break;
      }
    }
    if (nextChapter) break;
  }

  const handleReset = () => {
    if (window.confirm("Reset all local learning progress and code drafts?")) {
      resetLearnerProgress();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--border-hairline)] pb-6 mb-8">
            <div>
              <p className="text-xs font-mono text-[var(--accent)]">
                Learning progress
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                Learner dashboard
              </h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Local browser progress across available workshops and exercises
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--negative)] transition-colors duration-150 self-start sm:self-auto"
              title="Clear local progress"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              <span>Reset progress</span>
            </button>
          </div>

          {/* Metrics Row (compact, numbers only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
              <span className="text-xs text-[var(--text-muted)] block">
                Overall completion
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-medium tabular-nums text-[var(--text-primary)]">
                  {overallPercentage}%
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono tabular-nums">
                  {completedCount}/{totalChapters} chapters
                </span>
              </div>
              <div className="mt-3 w-full bg-[var(--bg-raised)] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[var(--accent)] h-1.5 rounded-full transition-[width] duration-300 ease-[var(--ease-out)]"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
              <span className="text-xs text-[var(--text-muted)] block">
                Exercises passed
              </span>
              <div className="mt-2">
                <span className="text-3xl font-medium tabular-nums text-[var(--positive)]">
                  {Object.values(progress.completedExercises).filter(Boolean).length}
                </span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Validated in Python runner
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
              <span className="text-xs text-[var(--text-muted)] block">
                Last visited
              </span>
              <div className="mt-2 truncate">
                {progress.lastVisitedChapter ? (
                  <Link
                    href={`/workshops/${progress.lastVisitedChapter.workshopSlug}/${progress.lastVisitedChapter.chapterSlug}`}
                    className="text-sm font-medium text-[var(--accent)] hover:underline truncate block"
                  >
                    {progress.lastVisitedChapter.title}
                  </Link>
                ) : (
                  <span className="text-sm text-[var(--text-muted)]">
                    No chapters visited yet
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Saved in browser storage
              </p>
            </div>

            <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-tint)] p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[var(--accent)] block">
                  Up next
                </span>
                <p className="mt-2 text-sm font-medium text-[var(--text-primary)] truncate">
                  {nextChapter ? nextChapter.title : "All available chapters complete"}
                </p>
              </div>

              {nextChapter && (
                <Link
                  href={`/workshops/${nextChapter.workshopSlug}/${nextChapter.chapterSlug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              )}
            </div>
          </div>

          {/* Workshop Breakdown */}
          <div className="mb-12">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-4">
              Progress by workshop
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workshops.map((w) => {
                const isLocked = Boolean(w.isLocked || w.chapters.length === 0);
                const wChaptersCompleted = w.chapters.filter(
                  (ch) => progress.completedChapters[`${w.slug}/${ch.slug}`]
                ).length;
                const pct =
                  w.chapters.length > 0
                    ? Math.round((wChaptersCompleted / w.chapters.length) * 100)
                    : 0;

                if (isLocked) {
                  return (
                    <div
                      key={w.id}
                      className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-raised)] p-5 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-mono tabular-nums text-[var(--text-muted)]">
                          Workshop {String(w.number).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                          Upcoming module
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <Lock className="h-4 w-4" strokeWidth={1.5} />
                        <span>Locked</span>
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={w.id}
                    className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono tabular-nums text-[var(--accent)]">
                          Workshop {String(w.number).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-medium text-[var(--text-primary)] mt-1">
                          {w.title}
                        </h3>
                      </div>
                      <span className="rounded border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-2 py-0.5 text-xs font-mono tabular-nums text-[var(--text-primary)]">
                        {pct}%
                      </span>
                    </div>

                    <div className="mt-3 w-full bg-[var(--bg-raised)] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[var(--accent)] h-1.5 rounded-full transition-[width] duration-300 ease-[var(--ease-out)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-mono tabular-nums">
                        {wChaptersCompleted} of {w.chapters.length} chapters
                      </span>
                      <Link
                        href={`/workshops/${w.slug}`}
                        className="font-medium text-[var(--accent)] hover:underline"
                      >
                        Open workshop
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capstone Projects */}
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-4">
              Capstone projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--border-hairline)] p-5 bg-[var(--bg-page)] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)]">
                    Workshop 01 capstone
                  </span>
                  <h3 className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                    Inbox Guardian — rule-based message scanner
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                    Command-line scanner using string normalization, dictionaries, and heuristic scoring.
                  </p>
                </div>
                <Link
                  href="/projects/inbox-guardian"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  <span>Open workspace</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] p-5 bg-[var(--bg-page)] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)]">
                    Workshop 02 project
                  </span>
                  <h3 className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                    Git &amp; GitHub multi-branch repository
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                    Local repository setup, branching, merge conflict resolution, and GitHub upstream sync.
                  </p>
                </div>
                <Link
                  href="/workshops/git-github"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  <span>Open workshop</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
