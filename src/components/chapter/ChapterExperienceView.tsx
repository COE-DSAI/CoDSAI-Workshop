"use client";

import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  Code2,
  BookOpen,
  Terminal,
  PanelLeftClose,
  PanelLeftOpen,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"reading" | "editor">("reading");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("coe_sidebar_collapsed");
      if (saved !== null) {
        setSidebarCollapsed(saved === "true");
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("coe_sidebar_collapsed", String(next));
      } catch {
        // Ignore in restricted environments
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleToggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const defaultCode = chapter.assignment
    ? chapter.assignment.starterCode
    : chapter.exercises && chapter.exercises.length > 0
    ? chapter.exercises[0].starterCode
    : '# Python 3 Interactive Workspace\nprint("Hello from Chapter ' + chapter.number + '")\n';

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
      : `Python 3 Workspace — Ch ${String(chapter.number).padStart(2, "0")}`
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
    setEditorTitle("Python 3 snippet");
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
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[var(--bg-page)]">
      {!focusMode && (
        <SidebarNav
          workshop={workshop}
          currentChapterSlug={chapter.slug}
          completedChapters={completedChapters}
          className="hidden lg:flex shrink-0"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Status Bar */}
        <div className="flex h-12 items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {!focusMode && (
              <button
                type="button"
                onClick={handleToggleSidebar}
                className={`inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium transition-colors duration-150 ease-[var(--ease-out)] ${
                  sidebarCollapsed
                    ? "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                }`}
                title={sidebarCollapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />
                )}
                <span className="hidden md:inline">Sidebar</span>
              </button>
            )}

            {!focusMode && <span className="h-4 w-px bg-[var(--border-hairline)] hidden sm:inline-block" />}

            <div className="flex items-center gap-2 text-xs truncate">
              <span className="font-mono tabular-nums text-[var(--text-muted)] shrink-0">
                Ch {String(chapter.number).padStart(2, "0")}
              </span>
              <span className="font-medium text-[var(--text-primary)] truncate">
                {chapter.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile / Tablet Switcher */}
            <div className="flex items-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] p-0.5 xl:hidden">
              <button
                type="button"
                onClick={() => setMobileTab("reading")}
                className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors duration-150 ${
                  mobileTab === "reading"
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Reading</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab("editor")}
                className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors duration-150 ${
                  mobileTab === "editor"
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {workshop.executionMode === "local-project" ? (
                  <>
                    <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>Terminal guide</span>
                  </>
                ) : (
                  <>
                    <Code2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>Python editor</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFocusMode(!focusMode)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)] transition-colors duration-150"
              title={focusMode ? "Exit focus mode" : "Enter focus mode"}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">Exit focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">Focus mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Split View */}
        <div className="flex flex-1 overflow-hidden">
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

          {(!focusMode || mobileTab === "editor") && (
            <aside
              className={`flex-col border-l border-[var(--border-hairline)] bg-[var(--code-surface)] shrink-0 ${
                mobileTab === "editor"
                  ? "flex flex-1 xl:w-[480px] 2xl:w-[560px] xl:flex-none"
                  : "hidden xl:flex w-[480px] 2xl:w-[560px]"
              }`}
            >
              <div className="h-full flex-1">
                {workshop.executionMode === "local-project" ? (
                  <GitTerminalCompanion workshop={workshop} chapter={chapter} />
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
