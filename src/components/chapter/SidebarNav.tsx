"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Lock,
  Code2,
  GitBranch,
  ChevronLeft,
} from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";
import { getAllWorkshops } from "@/content/workshops";
import { SmokeMysteryOverlay } from "./SmokeMysteryOverlay";

interface SidebarNavProps {
  workshop: Workshop;
  currentChapterSlug: string;
  completedChapters: Record<string, boolean>;
  className?: string;
  allWorkshopsList?: readonly Workshop[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function SidebarNav({
  workshop,
  currentChapterSlug,
  completedChapters,
  className = "",
  allWorkshopsList,
  isCollapsed,
  onToggleCollapse,
}: SidebarNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  const workshops = allWorkshopsList || getAllWorkshops();

  const [expandedWorkshops, setExpandedWorkshops] = useState<Record<string, boolean>>({
    [workshop.slug]: true,
    "git-github": true,
  });

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [currentChapterSlug]: true,
  });

  const toggleWorkshop = (slug: string) => {
    setExpandedWorkshops((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const toggleChapter = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedChapters((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const getWorkshopIcon = (num: number, isLocked: boolean, active: boolean) => {
    const colorClass = active
      ? "text-[var(--accent)]"
      : isLocked
      ? "text-[var(--text-muted)]"
      : "text-[var(--text-secondary)]";

    if (isLocked) {
      return <Lock className={`h-4 w-4 shrink-0 ${colorClass}`} strokeWidth={1.5} />;
    }
    if (num === 2) {
      return <GitBranch className={`h-4 w-4 shrink-0 ${colorClass}`} strokeWidth={1.5} />;
    }
    return <Code2 className={`h-4 w-4 shrink-0 ${colorClass}`} strokeWidth={1.5} />;
  };

  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const totalAvailableChapters = workshops
    .filter((w) => !w.isLocked && w.number <= 2)
    .reduce((sum, w) => sum + w.chapters.length, 0);

  return (
    <aside
      className={`flex flex-col border-r border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-[width] duration-200 ease-[var(--ease-out)] select-none ${
        collapsed ? "w-14" : "w-68"
      } ${className}`}
      aria-label="Curriculum tree navigation"
    >
      {/* Top Header */}
      <div className="border-b border-[var(--border-hairline)] px-4 py-3 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex-1 min-w-0 pr-2">
            <Link
              href={`/workshops/${workshop.slug}`}
              className="group flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              <ChevronLeft className="h-4 w-4 text-[var(--text-muted)] shrink-0" strokeWidth={1.5} />
              <span className="truncate font-mono tabular-nums">
                Workshop {String(workshop.number).padStart(2, "0")}
              </span>
            </Link>

            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-xs font-medium text-[var(--text-primary)]">
                Curriculum
              </h2>
              <span className="text-[11px] font-mono tabular-nums text-[var(--text-muted)]">
                {workshops.length} tracks
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <button
              type="button"
              onClick={toggleCollapse}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)] transition-colors duration-150"
              title="Expand sidebar (⌘B)"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {!collapsed && (
          <button
            type="button"
            onClick={toggleCollapse}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)] transition-colors duration-150 shrink-0 self-start"
            title="Collapse sidebar (⌘B)"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {workshops.map((w) => {
          const isCurrentWorkshop = w.slug === workshop.slug;
          const isLocked = Boolean(w.isLocked || w.number > 2);
          const isExpanded = Boolean(expandedWorkshops[w.slug]);
          const formattedWorkshopNum = String(w.number).padStart(2, "0");

          if (collapsed) {
            return (
              <div key={w.id} className="flex justify-center">
                <Link
                  href={isLocked ? `/workshops/${workshop.slug}` : `/workshops/${w.slug}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 ${
                    isCurrentWorkshop
                      ? "bg-[var(--accent-tint)] text-[var(--accent)] border border-[var(--accent-border)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]"
                  }`}
                  title={`${w.title}${isLocked ? " (Locked)" : ""}`}
                >
                  {getWorkshopIcon(w.number, isLocked, isCurrentWorkshop)}
                </Link>
              </div>
            );
          }

          return (
            <div key={w.id}>
              {/* Level 1: Workshop row */}
              <div
                className={`group flex h-8 items-center justify-between rounded-lg px-2 text-xs cursor-pointer transition-colors duration-150 ${
                  isCurrentWorkshop
                    ? "bg-[var(--bg-raised)] text-[var(--text-primary)] font-medium"
                    : isLocked
                    ? "text-[var(--text-muted)] hover:bg-[var(--bg-raised)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => toggleWorkshop(w.slug)}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="flex h-4 w-4 items-center justify-center text-[var(--text-muted)] shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    )}
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center shrink-0">
                    {getWorkshopIcon(w.number, isLocked, isCurrentWorkshop)}
                  </span>

                  <span className="truncate">
                    {isLocked
                      ? `Workshop ${formattedWorkshopNum}`
                      : `W${formattedWorkshopNum}: ${w.title.split(":")[0]}`}
                  </span>
                </div>

                <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)] shrink-0 ml-2">
                  {isLocked ? "Locked" : `${w.chapters.length} ch`}
                </span>
              </div>

              {/* Level 2: Chapters */}
              {isExpanded && (
                <div className="ml-4 pl-3 my-1 border-l border-[var(--border-hairline)] space-y-1">
                  {isLocked ? (
                    <SmokeMysteryOverlay
                      workshopNumber={w.number}
                      workshopTitle={w.title}
                      variant="sidebar"
                    />
                  ) : (
                    w.chapters.map((ch: Chapter) => {
                      const isActiveChapter =
                        isCurrentWorkshop && ch.slug === currentChapterSlug;
                      const isDone = Boolean(completedChapters[`${w.slug}/${ch.slug}`]);
                      const formattedChapterNum = String(ch.number).padStart(2, "0");
                      const isChapterExpanded = Boolean(expandedChapters[ch.slug]);

                      return (
                        <div key={ch.id}>
                          <div
                            className={`group flex h-8 items-center justify-between rounded-lg px-2 text-xs transition-colors duration-150 ${
                              isActiveChapter
                                ? "bg-[var(--accent-tint)] text-[var(--accent)] font-medium"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                            }`}
                          >
                            <Link
                              href={`/workshops/${w.slug}/${ch.slug}`}
                              className="flex items-center gap-2 flex-1 min-w-0"
                              title={`Chapter ${ch.number}: ${ch.title}`}
                            >
                              <span className="flex h-4 w-4 items-center justify-center shrink-0">
                                {isDone ? (
                                  <CheckCircle2
                                    className="h-4 w-4 text-[var(--positive)]"
                                    strokeWidth={1.5}
                                  />
                                ) : (
                                  <span
                                    className={`font-mono text-[11px] tabular-nums ${
                                      isActiveChapter
                                        ? "text-[var(--accent)] font-medium"
                                        : "text-[var(--text-muted)]"
                                    }`}
                                  >
                                    {formattedChapterNum}
                                  </span>
                                )}
                              </span>

                              <span className="truncate">{ch.title}</span>
                            </Link>

                            {ch.sections && ch.sections.length > 0 && (
                              <button
                                type="button"
                                onClick={(e) => toggleChapter(ch.slug, e)}
                                className="ml-1 flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150"
                                title={isChapterExpanded ? "Hide topics" : "Show topics"}
                                aria-label={isChapterExpanded ? "Hide topics" : "Show topics"}
                              >
                                {isChapterExpanded ? (
                                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Level 3: Section anchors */}
                          {isChapterExpanded && ch.sections && ch.sections.length > 0 && (
                            <div className="ml-4 pl-3 my-1 border-l border-[var(--border-hairline)] space-y-0.5">
                              {ch.sections.map((sec) => (
                                <a
                                  key={sec.id}
                                  href={`/workshops/${w.slug}/${ch.slug}#${sec.id}`}
                                  className="block py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] truncate transition-colors duration-150"
                                  title={sec.title}
                                >
                                  {sec.title}
                                </a>
                              ))}

                              {ch.exercises && ch.exercises.length > 0 && (
                                <a
                                  href={`/workshops/${w.slug}/${ch.slug}#exercises`}
                                  className="block py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] truncate transition-colors duration-150"
                                >
                                  Practice exercises
                                </a>
                              )}

                              {ch.assignment && (
                                <a
                                  href={`/workshops/${w.slug}/${ch.slug}#assignment`}
                                  className="block py-1 text-xs font-medium text-[var(--accent)] hover:underline truncate"
                                >
                                  Chapter assignment
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border-hairline)] px-4 py-3 flex items-center justify-between text-xs text-[var(--text-muted)] bg-[var(--bg-page)]">
        {!collapsed && (
          <span className="font-mono tabular-nums">
            <strong className="font-medium text-[var(--text-primary)]">{completedCount}</strong> of{" "}
            {totalAvailableChapters} chapters
          </span>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)] ml-auto transition-colors duration-150"
          title={collapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </aside>
  );
}
