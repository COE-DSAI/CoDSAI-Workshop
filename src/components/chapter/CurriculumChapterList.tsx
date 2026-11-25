"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
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
    <div className="divide-y divide-[var(--border-hairline)] rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      {workshop.chapters.map((ch: Chapter) => {
        const isDone = Boolean(completedChapters[`${workshop.slug}/${ch.slug}`]);
        const isCapstone = ch.number === 8;
        const formattedNumber = String(ch.number).padStart(2, "0");

        return (
          <Link
            key={ch.id}
            href={`/workshops/${workshop.slug}/${ch.slug}`}
            className={`group block p-5 transition-colors duration-150 ease-[var(--ease-out)] ${
              isCapstone
                ? "bg-[var(--accent-tint)] hover:bg-[var(--bg-raised)]"
                : "hover:bg-[var(--bg-raised)]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <span className="font-mono text-xs tabular-nums font-medium text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-150 pt-0.5 shrink-0 w-6">
                  {formattedNumber}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
                      {ch.title}
                    </h3>
                    {isCapstone && (
                      <span className="rounded border border-[var(--accent-border)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                        Capstone
                      </span>
                    )}
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--positive)]">
                        <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {ch.introduction}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono tabular-nums text-[var(--text-muted)]">
                    <span>{ch.estimatedMinutes} min</span>
                    <span>·</span>
                    <span>{ch.sections.length} sections</span>
                    <span>·</span>
                    <span>
                      {ch.exercises.length} exercise{ch.exercises.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:self-center shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]">
                <span>Open lesson</span>
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
