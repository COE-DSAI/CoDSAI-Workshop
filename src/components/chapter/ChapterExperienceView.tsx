"use client";

import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Code2,
  BookOpen,
  Terminal,
} from "lucide-react";
import { Workshop, Chapter, ChapterAssignment, ExerciseTestCase } from "@/types/curriculum";
import { SidebarNav } from "./SidebarNav";
import { ChapterArticle } from "./ChapterArticle";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { GitTerminalCompanion } from "./GitTerminalCompanion";
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
  const [mobileTab, setMobileTab] = useState<"reading" | "editor">("reading");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  
  const defaultCode = chapter.assignment
    ? chapter.assignment.starterCode
    : chapter.exercises && chapter.exercises.length > 0
    ? chapter.exercises[0].starterCode
    : '# Python 3 Interactive Workspace\nprint("Hello from Chapter ' + chapter.number + '!")\n';

  const [editorCode, setEditorCode] = useState<string>(defaultCode);
  const [editorHints, setEditorHints] = useState<readonly [string, string, string] | undefined>(
    chapter.assignment
      ? chapter.assignment.hints
      : chapter.exercises && chapter.exercises.length > 0
      ? chapter.exercises[0].hints
      : undefined
  );
  const [editorSolution, setEditorSolution] = useState<string | undefined>(
    chapter.assignment
      ? chapter.assignment.referenceSolution
      : chapter.exercises && chapter.exercises.length > 0
      ? chapter.exercises[0].solution
      : undefined
  );
  const [editorSolutionExplanation, setEditorSolutionExplanation] = useState<string | undefined>(
    chapter.assignment
      ? chapter.assignment.solutionExplanation
      : chapter.exercises && chapter.exercises.length > 0
      ? chapter.exercises[0].solutionExplanation
      : undefined
  );
  const [editorTestCases, setEditorTestCases] = useState<readonly ExerciseTestCase[] | undefined>(
    chapter.assignment
      ? chapter.assignment.testCases
      : chapter.exercises && chapter.exercises.length > 0
      ? chapter.exercises[0].testCases
      : undefined
  );
  const [editorTitle, setEditorTitle] = useState<string>(
    chapter.assignment
      ? `Assignment — ${chapter.assignment.title}`
      : `Python 3 Workspace — Ch ${chapter.number}`
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
    setEditorTitle(`Python 3 Code Snippet`);
    setMobileTab("editor");
  };

  const handleSelectAssignment = (assignment: ChapterAssignment) => {
    setEditorCode(assignment.starterCode);
    setEditorHints(assignment.hints);
    setEditorSolution(assignment.referenceSolution);
    setEditorSolutionExplanation(assignment.solutionExplanation);
    setEditorTestCases(assignment.testCases);
    setEditorTitle(`Assignment — ${assignment.title}`);
    setMobileTab("editor");
  };

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden bg-[#FBF8FA]">
      {/* 1. Left Sidebar Navigation */}
      {!focusMode && (
        <SidebarNav
          workshop={workshop}
          currentChapterSlug={chapter.slug}
          completedChapters={completedChapters}
          className="hidden lg:flex shrink-0"
        />
      )}

      {/* 2. Central Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Status Bar */}
        <div className="flex h-11 items-center justify-between border-b border-slate-200/80 bg-white px-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
            <span className="font-semibold text-slate-900 truncate">
              Chapter {String(chapter.number).padStart(2, "0")}: {chapter.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile / Tablet Tab Switcher */}
            <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5 xl:hidden">
              <button
                type="button"
                onClick={() => setMobileTab("reading")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  mobileTab === "reading"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="h-3 w-3" />
                <span>Reading</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab("editor")}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  mobileTab === "editor"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {workshop.executionMode === "local-project" ? (
                  <>
                    <Terminal className="h-3 w-3 text-blue-500" />
                    <span>Terminal Guide</span>
                  </>
                ) : (
                  <>
                    <Code2 className="h-3 w-3" />
                    <span>Python Editor</span>
                  </>
                )}
              </button>
            </div>

            {/* Focus Mode Toggle */}
            <button
              type="button"
              onClick={() => setFocusMode(!focusMode)}
              className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              title={focusMode ? "Exit focus mode" : "Enter focus mode (full-width)"}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Exit Focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Focus Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Split View Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Reading Area */}
          <main
            className={`flex-1 overflow-y-auto ${
              mobileTab === "reading" ? "block" : "hidden xl:block"
            }`}
          >
            <ChapterArticle
              workshop={workshop}
              chapter={chapter}
              isCompleted={isCompleted}
              onToggleComplete={handleToggleComplete}
              prevChapter={prevChapter}
              nextChapter={nextChapter}
              onSelectCodeExample={handleSelectCodeExample}
              onSelectAssignment={handleSelectAssignment}
            />
          </main>

          {/* Right Workspace Panel */}
          {(!focusMode || mobileTab === "editor") && (
            <aside
              className={`flex-col border-l border-slate-200 bg-slate-900 shrink-0 ${
                mobileTab === "editor"
                  ? "flex flex-1 xl:w-[500px] 2xl:w-[580px] xl:flex-none"
                  : "hidden xl:flex w-[500px] 2xl:w-[580px]"
              }`}
            >
              <div className="h-full flex-1">
                {workshop.executionMode === "local-project" ? (
                  <GitTerminalCompanion
                    workshop={workshop}
                    chapter={chapter}
                  />
                ) : (
                  <CodeEditor
                    initialCode={editorCode}
                    title={editorTitle}
                    hints={editorHints}
                    solution={editorSolution}
                    solutionExplanation={editorSolutionExplanation}
                    testCases={editorTestCases}
                  />
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
