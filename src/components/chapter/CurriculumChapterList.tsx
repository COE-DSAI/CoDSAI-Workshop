"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";
import { getLearnerProgress } from "@/lib/storage/progress";
import { SmokeMysteryOverlay } from "./SmokeMysteryOverlay";

interface CurriculumChapterListProps {
  workshop: Workshop;
}

export function CurriculumChapterList({ workshop }: CurriculumChapterListProps) {
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

  if (workshop.isLocked || workshop.chapters.length === 0) {
    return (
      <SmokeMysteryOverlay
        workshopNumber={workshop.number}
        workshopTitle={workshop.title}
        variant="full"
      />
    );
  }

  return (
    <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80 bg-white">
      {workshop.chapters.map((ch: Chapter) => {
        const isDone = Boolean(completedChapters[`${workshop.slug}/${ch.slug}`]);
        const isCapstone = ch.number === 8;
        const formattedNumber = String(ch.number).padStart(2, "0");

        return (
          <Link
            key={ch.id}
            href={`/workshops/${workshop.slug}/${ch.slug}`}
            className={`group block p-4 sm:p-5 transition-colors ${
              isCapstone
                ? "bg-slate-50/70 hover:bg-slate-100/80"
                : "hover:bg-slate-50/80"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Left: Number, Title, Description */}
              <div className="flex items-start gap-4 flex-1">
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors pt-0.5 shrink-0">
                  {formattedNumber}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ch.title}
                    </h3>
                    {isCapstone && (
                      <span className="inline-flex items-center gap-1 rounded bg-blue-100/80 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                        <ShieldCheck className="h-3 w-3" />
                        Capstone Project
                      </span>
                    )}
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Completed
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ch.introduction}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>{ch.estimatedMinutes} mins reading</span>
                    <span className="text-slate-300">•</span>
                    <span>{ch.sections.length} concept sections</span>
                    <span className="text-slate-300">•</span>
                    <span>{ch.exercises.length} practical exercise{ch.exercises.length !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>

              {/* Right: Action affordance */}
              <div className="sm:self-center shrink-0 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Open Lesson</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
