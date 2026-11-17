"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  BookOpen,
  RotateCcw,
  Sparkles,
  Award,
  Bookmark,
  FolderGit2,
} from "lucide-react";
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
  const overallPercentage = Math.round((completedCount / totalChapters) * 100);

  // Find next uncompleted chapter
  let nextChapter: { workshopSlug: string; chapterSlug: string; title: string; number: number } | null = null;
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
    if (window.confirm("Are you sure you want to reset all your learning progress and drafts?")) {
      resetLearnerProgress();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Personal Learning Portal
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Learner Dashboard
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Actual local progress tracking across all 10 workshops and hands-on exercises.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors"
                title="Clear progress state from local storage"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Progress
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Overall Completion
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900">{overallPercentage}%</span>
                <span className="text-xs text-slate-400 font-mono">
                  {completedCount}/{totalChapters} Ch
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Exercises Completed
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-600">
                  {Object.values(progress.completedExercises).filter(Boolean).length}
                </span>
                <Award className="h-5 w-5 text-emerald-500" />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">Validated via automated test suites</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Last Visited Chapter
              </span>
              <div className="mt-2 truncate">
                {progress.lastVisitedChapter ? (
                  <Link
                    href={`/workshops/${progress.lastVisitedChapter.workshopSlug}/${progress.lastVisitedChapter.chapterSlug}`}
                    className="text-sm font-bold text-blue-600 hover:underline truncate block"
                  >
                    {progress.lastVisitedChapter.title}
                  </Link>
                ) : (
                  <span className="text-xs text-slate-400 italic">None yet. Start Workshop 1!</span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-slate-400">Auto-persisted in local storage</p>
            </div>

            {/* Recommended Next Chapter Card */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                  Recommended Next
                </span>
                <p className="mt-1 text-sm font-extrabold text-blue-950 truncate">
                  {nextChapter ? nextChapter.title : "All Workshops Completed!"}
                </p>
              </div>

              {nextChapter && (
                <Link
                  href={`/workshops/${nextChapter.workshopSlug}/${nextChapter.chapterSlug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* Workshop Breakdown Grid */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Curriculum Progress by Workshop
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workshops.map((w) => {
                const wChaptersCompleted = w.chapters.filter(
                  (ch) => progress.completedChapters[`${w.slug}/${ch.slug}`]
                ).length;
                const pct = Math.round((wChaptersCompleted / w.chapters.length) * 100);

                return (
                  <div
                    key={w.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-blue-600">
                          Workshop {w.number}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
                      </div>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-700">
                        {pct}%
                      </span>
                    </div>

                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        {wChaptersCompleted} of {w.chapters.length} chapters complete
                      </span>
                      <Link
                        href={`/workshops/${w.slug}`}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Open Workshop →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Capstone Projects */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FolderGit2 className="h-5 w-5 text-blue-600" />
              Featured Capstone Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 hover:bg-white transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Workshop 1 Capstone
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    Inbox Guardian — Personal Message Scanner
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    Rule-based CLI threat scanner using pure Python strings, lists of dictionaries, and menus.
                  </p>
                </div>
                <Link
                  href="/projects/inbox-guardian"
                  className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Capstone →
                </Link>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 hover:bg-white transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Workshop 7 Capstone
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    Machine Learning Threat Classifier
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    Statistical logistic regression model with threshold tuning and confusion matrix diagnostics.
                  </p>
                </div>
                <Link
                  href="/workshops/classification/classification-practical-project"
                  className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Lesson →
                </Link>
              </div>

              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 hover:bg-white transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    Workshop 9 Capstone
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">
                    Streamlit Web App Demo
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    Full reactive web interface hosting a pre-trained scikit-learn model with real-time risk gauges.
                  </p>
                </div>
                <Link
                  href="/workshops/streamlit/practical-streamlit-project"
                  className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Lesson →
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
