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
  Database,
  Cpu,
  Sparkles,
  BookOpen,
  Layers,
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

  // Control which workshops are expanded in the tree (default: active workshop is open)
  const [expandedWorkshops, setExpandedWorkshops] = useState<Record<string, boolean>>({
    [workshop.slug]: true,
    // Keep workshop 2 open if viewing workshop 1 or 2
    "git-github": true,
  });

  // Control which chapters have their topic subtree open (default: active chapter is open)
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

  // Workshop icon selector
  const getWorkshopIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Code2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />;
      case 2:
        return <GitBranch className="h-3.5 w-3.5 text-emerald-500 shrink-0" />;
      case 3:
        return <Database className="h-3.5 w-3.5 text-slate-400 shrink-0" />;
      case 4:
        return <Cpu className="h-3.5 w-3.5 text-slate-400 shrink-0" />;
      case 5:
      default:
        return <Sparkles className="h-3.5 w-3.5 text-slate-400 shrink-0" />;
    }
  };

  // Calculate total completed chapters across available workshops
  const completedCount = Object.values(completedChapters).filter(Boolean).length;
  const totalAvailableChapters = workshops
    .filter((w) => !w.isLocked && w.number <= 2)
    .reduce((sum, w) => sum + w.chapters.length, 0);

  return (
    <aside
      className={`flex flex-col border-r border-slate-200/90 bg-white transition-all duration-200 select-none ${
        collapsed ? "w-14" : "w-72 xl:w-80"
      } ${className}`}
      aria-label="Curriculum tree navigation"
    >
      {/* Top Header */}
      <div className="border-b border-slate-200/80 px-3.5 py-3 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex-1 min-w-0 pr-2">
            <Link
              href={`/workshops/${workshop.slug}`}
              className="group flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
              <span className="truncate">Workshop {String(workshop.number).padStart(2, "0")} Overview</span>
            </Link>

            <div className="mt-2 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-blue-600" />
                  <span>Curriculum Tree</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Workshops &rarr; Chapters &rarr; Topics
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200/80">
                {workshops.length} Tracks
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <button
              type="button"
              onClick={toggleCollapse}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Expand sidebar (⌘B)"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4 text-blue-600" />
            </button>
          </div>
        )}

        {!collapsed && (
          <button
            type="button"
            onClick={toggleCollapse}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0 self-start mt-0.5"
            title="Collapse sidebar (⌘B)"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Hierarchical Tree Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {workshops.map((w) => {
          const isCurrentWorkshop = w.slug === workshop.slug;
          const isLocked = Boolean(w.isLocked || w.number > 2);
          const isExpanded = Boolean(expandedWorkshops[w.slug]);
          const formattedWorkshopNum = String(w.number).padStart(2, "0");

          // When sidebar is collapsed to rail mode:
          if (collapsed) {
            return (
              <div key={w.id} className="relative flex justify-center py-1">
                <Link
                  href={isLocked ? `/workshops/${workshop.slug}` : `/workshops/${w.slug}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    isCurrentWorkshop
                      ? "bg-blue-50 text-blue-600 ring-1 ring-blue-500/30"
                      : isLocked
                      ? "text-slate-400 hover:bg-slate-100"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  title={`${w.title}${isLocked ? " (Locked)" : ""}`}
                >
                  {isLocked ? (
                    <div className="relative">
                      {getWorkshopIcon(w.number)}
                      <Lock className="absolute -top-1 -right-1 h-2.5 w-2.5 text-slate-500" />
                    </div>
                  ) : (
                    getWorkshopIcon(w.number)
                  )}
                </Link>
              </div>
            );
          }

          // Full Expanded Tree View:
          return (
            <div key={w.id} className="rounded-lg border border-transparent transition-all">
              {/* Level 1: Workshop Tree Node */}
              <div
                className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                  isCurrentWorkshop
                    ? "bg-slate-100/90 text-slate-900 border border-slate-200/60"
                    : isLocked
                    ? "text-slate-500 hover:bg-slate-50"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
                onClick={() => toggleWorkshop(w.slug)}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <button
                    type="button"
                    className="p-0.5 text-slate-400 group-hover:text-slate-600 focus:outline-none"
                    aria-label={isExpanded ? "Collapse workshop" : "Expand workshop"}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {getWorkshopIcon(w.number)}
                    <span className="truncate text-xs">
                      {isLocked ? `Workshop ${formattedWorkshopNum}` : `W${formattedWorkshopNum}: ${w.title.split(":")[0]}`}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-1 shrink-0 ml-1">
                  {isLocked ? (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 border border-slate-200/80">
                      <Lock className="h-2.5 w-2.5 text-slate-400" />
                      <span>Locked</span>
                    </span>
                  ) : (
                    <span className="rounded bg-slate-200/60 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-600">
                      {w.chapters.length} Ch
                    </span>
                  )}
                </div>
              </div>

              {/* Level 2 Subtree */}
              {isExpanded && (
                <div className="ml-3 pl-2.5 my-1 border-l-2 border-slate-200/80 space-y-1">
                  {/* For Workshop > 2: HIDE TOPICS and show smoke / cloud effect */}
                  {isLocked ? (
                    <SmokeMysteryOverlay
                      workshopNumber={w.number}
                      workshopTitle={w.title}
                      variant="sidebar"
                    />
                  ) : (
                    /* For Workshop 1 & 2: Show Chapter Subtree */
                    w.chapters.map((ch: Chapter) => {
                      const isActiveChapter = isCurrentWorkshop && ch.slug === currentChapterSlug;
                      const isDone = Boolean(completedChapters[`${w.slug}/${ch.slug}`]);
                      const formattedChapterNum = String(ch.number).padStart(2, "0");
                      const isChapterExpanded = Boolean(expandedChapters[ch.slug]);

                      return (
                        <div key={ch.id} className="relative">
                          {/* Level 2: Chapter Node */}
                          <div
                            className={`group flex items-center justify-between rounded-md px-2 py-1 text-xs transition-colors ${
                              isActiveChapter
                                ? "bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-500/20"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <Link
                              href={`/workshops/${w.slug}/${ch.slug}`}
                              className="flex items-center gap-2 flex-1 min-w-0"
                              title={`Chapter ${ch.number}: ${ch.title}`}
                            >
                              <div className="shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <span
                                    className={`font-mono text-[10px] font-semibold block w-3.5 ${
                                      isActiveChapter ? "text-blue-600" : "text-slate-400"
                                    }`}
                                  >
                                    {formattedChapterNum}
                                  </span>
                                )}
                              </div>

                              <span className="truncate text-xs leading-tight">
                                {ch.title}
                              </span>
                            </Link>

                            {/* Topic expansion toggle */}
                            {ch.sections && ch.sections.length > 0 && (
                              <button
                                type="button"
                                onClick={(e) => toggleChapter(ch.slug, e)}
                                className="ml-1 p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
                                title={isChapterExpanded ? "Hide topics" : "Show topics"}
                                aria-label={isChapterExpanded ? "Hide topics" : "Show topics"}
                              >
                                {isChapterExpanded ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Level 3: Subtree for Topics & Sections */}
                          {isChapterExpanded && ch.sections && ch.sections.length > 0 && (
                            <div className="ml-5 pl-2 my-1 border-l border-slate-200/90 space-y-0.5">
                              {ch.sections.map((sec) => (
                                <a
                                  key={sec.id}
                                  href={`/workshops/${w.slug}/${ch.slug}#${sec.id}`}
                                  className="block text-[11px] font-normal text-slate-500 hover:text-blue-600 truncate py-0.5 transition-colors"
                                  title={sec.title}
                                >
                                  &bull; {sec.title}
                                </a>
                              ))}

                              {ch.exercises && ch.exercises.length > 0 && (
                                <a
                                  href={`/workshops/${w.slug}/${ch.slug}#exercises`}
                                  className="block text-[11px] font-medium text-blue-600 hover:text-blue-700 truncate py-0.5"
                                >
                                  &rarr; Practice Exercises
                                </a>
                              )}

                              {ch.assignment && (
                                <a
                                  href={`/workshops/${w.slug}/${ch.slug}#assignment`}
                                  className="block text-[11px] font-semibold text-purple-700 hover:text-purple-800 truncate py-0.5"
                                >
                                  &#9733; Chapter Assignment
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

      {/* Bottom Footer with Progress & Collapse Toggle */}
      <div className="border-t border-slate-200/80 p-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50/70">
        {!collapsed && (
          <span className="text-[11px] text-slate-600">
            <strong className="text-slate-900 font-semibold">{completedCount}</strong> of {totalAvailableChapters} chapters done
          </span>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          className="rounded p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 ml-auto transition-colors"
          title={collapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
