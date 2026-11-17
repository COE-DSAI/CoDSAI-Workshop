"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronLeft, BookOpen, Layers } from "lucide-react";
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

  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-200 ${
        collapsed ? "w-14" : "w-72"
      } ${className}`}
    >
      {/* Top Workshop Header */}
      <div className="border-b border-slate-200 p-3.5">
        <Link
          href={`/workshops/${workshop.slug}`}
          className="group flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
          {!collapsed && <span className="truncate">Workshop {workshop.number} Overview</span>}
        </Link>

        {!collapsed && (
          <div className="mt-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Workshop {workshop.number}
            </span>
            <h2 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
              {workshop.title}
            </h2>
          </div>
        )}
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {workshop.chapters.map((chapter) => {
          const isActive = chapter.slug === currentChapterSlug;
          const isDone = Boolean(completedChapters[`${workshop.slug}/${chapter.slug}`]);

          return (
            <Link
              key={chapter.id}
              href={`/workshops/${workshop.slug}/${chapter.slug}`}
              className={`group flex items-start gap-2.5 rounded-md p-2 text-xs transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              title={`Chapter ${chapter.number}: ${chapter.title}`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Circle
                    className={`h-4 w-4 ${
                      isActive ? "text-blue-500" : "text-slate-300 group-hover:text-slate-400"
                    }`}
                  />
                )}
              </div>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400 block font-mono">
                    CH {chapter.number}
                  </span>
                  <span className="truncate block leading-tight">{chapter.title}</span>

                  {/* Section sub-links for the active chapter */}
                  {isActive && chapter.sections && (
                    <div className="mt-2 pl-1 space-y-1 border-l border-blue-200">
                      {chapter.sections.map((sec) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="block text-[10px] font-normal text-slate-500 hover:text-blue-700 truncate"
                        >
                          {sec.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Collapse Toggle */}
      <div className="border-t border-slate-200 p-2.5 flex items-center justify-between text-[11px] text-slate-500">
        {!collapsed && (
          <span className="text-[10px] text-slate-400 font-mono">
            {Object.values(completedChapters).filter(Boolean).length} / {workshop.chapters.length} Done
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Layers className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
