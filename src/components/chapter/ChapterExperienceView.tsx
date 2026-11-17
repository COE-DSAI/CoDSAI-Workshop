"use client";

import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Code2,
  Sparkles,
} from "lucide-react";
import { Workshop, Chapter } from "@/types/curriculum";
import { SidebarNav } from "./SidebarNav";
import { ChapterArticle } from "./ChapterArticle";
import { CodeEditor } from "@/components/editor/CodeEditor";
import {
  getLearnerProgress,
  markChapterComplete,
  saveLastVisitedChapter,
} from "@/lib/storage/progress";

interface ChapterExperienceViewProps {
  workshop: Workshop;
  chapter: Chapter;
  prevChapter?: Chapter;
  nextChapter?: Chapter;
}

export function ChapterExperienceView({
  workshop,
  chapter,
  prevChapter,
  nextChapter,
}: ChapterExperienceViewProps) {
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  const [editorCode, setEditorCode] = useState<string>(
    chapter.exercises && chapter.exercises.length > 0
      ? chapter.exercises[0].starterCode
      : '# Python Interactive Workspace\nprint("Hello from Chapter ' + chapter.number + '!")\n'
  );

  const chapterKey = `${workshop.slug}/${chapter.slug}`;
  const isCompleted = Boolean(completedChapters[chapterKey]);

  useEffect(() => {
    const update = () => {
      const p = getLearnerProgress();
      setCompletedChapters(p.completedChapters);
    };
    update();
    saveLastVisitedChapter(workshop.slug, chapter.slug, chapter.title);
    window.addEventListener("coe_progress_updated", update);
    return () => window.removeEventListener("coe_progress_updated", update);
  }, [workshop.slug, chapter.slug, chapter.title]);

  const handleToggleComplete = () => {
    markChapterComplete(workshop.slug, chapter.slug, !isCompleted);
  };

  const handleSelectCodeExample = (code: string) => {
    setEditorCode(code);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#F7F8FA]">
      {/* 1. Left Sidebar Navigation (hidden in focus mode) */}
      {!focusMode && (
        <SidebarNav
          workshop={workshop}
          currentChapterSlug={chapter.slug}
          completedChapters={completedChapters}
          className="hidden md:flex shrink-0"
        />
      )}

      {/* 2. Center Reading Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
            <span className="font-bold text-slate-800 truncate">
              W{workshop.number}: {workshop.title.split(":")[0]}
            </span>
            <span>•</span>
            <span className="truncate">Ch {chapter.number}: {chapter.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              title={focusMode ? "Exit reading mode" : "Enter focus reading mode"}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="h-3 w-3" />
                  <span>Exit Focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3 w-3" />
                  <span>Focus Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        <ChapterArticle
          workshop={workshop}
          chapter={chapter}
          isCompleted={isCompleted}
          onToggleComplete={handleToggleComplete}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          onSelectCodeExample={handleSelectCodeExample}
        />
      </main>

      {/* 3. Right Workspace Panel (hidden in focus mode) */}
      {!focusMode && (
        <aside className="hidden xl:flex w-[480px] 2xl:w-[540px] flex-col border-l border-slate-300 bg-slate-900 p-3 shrink-0">
          <div className="h-full flex-1">
            <CodeEditor
              initialCode={editorCode}
              title={`Python 3 Workspace — Ch ${chapter.number}`}
              hints={
                chapter.exercises && chapter.exercises.length > 0
                  ? chapter.exercises[0].hints
                  : undefined
              }
              solution={
                chapter.exercises && chapter.exercises.length > 0
                  ? chapter.exercises[0].solution
                  : undefined
              }
              solutionExplanation={
                chapter.exercises && chapter.exercises.length > 0
                  ? chapter.exercises[0].solutionExplanation
                  : undefined
              }
              testCases={
                chapter.exercises && chapter.exercises.length > 0
                  ? chapter.exercises[0].testCases
                  : undefined
              }
            />
          </div>
        </aside>
      )}
    </div>
  );
}
