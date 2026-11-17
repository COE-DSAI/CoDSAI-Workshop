"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { getAllWorkshops } from "@/content/workshops";
import { getLearnerProgress } from "@/lib/storage/progress";

export default function WorkshopsCataloguePage() {
  const workshops = getAllWorkshops();
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const update = () => {
      const p = getLearnerProgress();
      setCompletedChapters(p.completedChapters);
    };
    update();
    window.addEventListener("coe_progress_updated", update);
    return () => window.removeEventListener("coe_progress_updated", update);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Curriculum Sequence
            </span>
            <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold text-slate-900">
              Workshop Catalogue
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore the complete 10-workshop educational sequence conducted by the Center of Excellence in Data Science & Artificial Intelligence. Every workshop is self-contained with thorough lessons, runnable code, and revision resources.
            </p>
          </div>

          {/* All 10 Workshops List */}
          <div className="space-y-6">
            {workshops.map((w) => {
              const completedCount = w.chapters.filter(
                (c) => completedChapters[`${w.slug}/${c.slug}`]
              ).length;
              const isAllDone = completedCount === w.chapters.length && w.chapters.length > 0;
              const pct = Math.round((completedCount / w.chapters.length) * 100);

              return (
                <div
                  key={w.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left: Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold uppercase font-mono text-blue-800">
                          Workshop {w.number}
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          {w.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                          <Clock className="h-3.5 w-3.5" />
                          {w.durationMinutes} Minutes
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {w.chapters.length} Chapters
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl font-bold text-slate-900">
                        {w.title}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {w.subtitle}
                      </p>

                      {/* Learning Outcomes */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                          Key Learning Outcomes:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                          {w.learningOutcomes.slice(0, 4).map((lo, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold">•</span>
                              <span className="line-clamp-1">{lo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions & Progress */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 shrink-0 lg:w-56">
                      <div className="w-full text-left lg:text-right">
                        <span className="text-xs font-semibold text-slate-500">
                          Progress: {completedCount}/{w.chapters.length} Chapters ({pct}%)
                        </span>
                        <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              isAllDone ? "bg-emerald-600" : "bg-blue-600"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 w-full">
                        <Link
                          href={`/workshops/${w.slug}`}
                          className="flex-1 text-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Syllabus
                        </Link>
                        <Link
                          href={`/workshops/${w.slug}/${w.chapters[0].slug}`}
                          className="flex-1 text-center rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
                        >
                          {completedCount > 0 ? "Continue" : "Start"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
