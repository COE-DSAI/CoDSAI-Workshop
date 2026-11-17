"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronLeft, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";

interface SidebarNavProps {
  workshop: Workshop;
  currentChapterSlug: string;
  completedChapters: Record<string, boolean>;
  className?: string;
}

export function SidebarNav({
  workshop,
  currentChapterSlug,
  completedChapters,
  className = "",
}: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  const completedCount = Object.values(completedChapters).filter(Boolean).length;

  return (
    <aside
      className={`flex flex-col border-r border-slate-200/80 bg-white transition-all duration-200 ${
        collapsed ? "w-14" : "w-64 lg:w-72"
      } ${className}`}
      aria-label="Chapter syllabus navigation"
    >
      {/* Top Header */}
      <div className="border-b border-slate-200/80 px-4 py-3">
        <Link
          href={`/workshops/${workshop.slug}`}
          className="group flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-700" />
          {!collapsed && <span>Workshop 01 Overview</span>}
        </Link>

        {!collapsed && (
          <div className="mt-2">
            <h2 className="text-xs font-semibold text-slate-900 truncate">
              Python Foundations
            </h2>
            <p className="text-[11px] text-slate-500 truncate">
              8 Chapters · 120m Session
            </p>
          </div>
        )}
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {workshop.chapters.map((chapter) => {
          const isActive = chapter.slug === currentChapterSlug;
          const isDone = Boolean(completedChapters[`${workshop.slug}/${chapter.slug}`]);
          const formattedNumber = String(chapter.number).padStart(2, "0");

          return (
            <div key={chapter.id}>
              <Link
                href={`/workshops/${workshop.slug}/${chapter.slug}`}
                className={`group flex items-start gap-2.5 rounded-md px-2.5 py-2 text-xs transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                title={`Chapter ${chapter.number}: ${chapter.title}`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <span className={`font-mono text-[10px] font-medium block w-4 ${
                      isActive ? "text-blue-600 font-bold" : "text-slate-400 group-hover:text-slate-600"
                    }`}>
                      {formattedNumber}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="truncate block leading-tight text-xs">
                      {chapter.title}
                    </span>
                  </div>
                )}
              </Link>

              {/* Section Sub-links for active chapter */}
              {isActive && !collapsed && chapter.sections && (
                <div className="ml-6 pl-2.5 my-1.5 space-y-1 border-l border-slate-200">
                  {chapter.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-[11px] font-normal text-slate-500 hover:text-blue-600 truncate py-0.5 transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                  {chapter.exercises && chapter.exercises.length > 0 && (
                    <a
                      href="#exercises"
                      className="block text-[11px] font-medium text-blue-600 hover:text-blue-700 truncate py-0.5"
                    >
                      → Practice Exercise
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer with Collapse Toggle & Progress */}
      <div className="border-t border-slate-200/80 p-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
        {!collapsed && (
          <span className="text-[11px] text-slate-500">
            <strong className="text-slate-900 font-semibold">{completedCount}</strong> of 8 completed
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 ml-auto transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
