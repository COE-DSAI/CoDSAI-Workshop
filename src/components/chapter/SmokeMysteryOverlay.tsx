"use client";

import React from "react";
import { Lock, Cloud, Sparkles, EyeOff } from "lucide-react";

interface SmokeMysteryOverlayProps {
  workshopNumber?: number;
  workshopTitle?: string;
  variant?: "sidebar" | "full";
}

export function SmokeMysteryOverlay({
  workshopNumber,
  workshopTitle,
  variant = "sidebar",
}: SmokeMysteryOverlayProps) {
  if (variant === "sidebar") {
    return (
      <div className="relative my-2 overflow-hidden rounded-lg border border-slate-200/90 bg-gradient-to-b from-slate-100/90 via-slate-200/70 to-slate-100/90 p-3 shadow-inner">
        {/* Shrouded silhouette bars (faux hidden topics beneath the mist) */}
        <div className="space-y-1.5 opacity-25 filter blur-[3px] select-none pointer-events-none" aria-hidden="true">
          <div className="h-2.5 w-4/5 rounded-full bg-slate-400" />
          <div className="h-2 w-3/5 rounded-full bg-slate-400 ml-3" />
          <div className="h-2.5 w-5/6 rounded-full bg-slate-400" />
          <div className="h-2 w-2/3 rounded-full bg-slate-400 ml-3" />
          <div className="h-2.5 w-3/4 rounded-full bg-slate-400" />
        </div>

        {/* Ambient Smoke / Cloud Glow Layers */}
        <div
          className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-gradient-to-tr from-white/80 via-slate-300/40 to-transparent blur-md animate-smoke-1 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-gradient-to-bl from-white/90 via-sky-200/30 to-transparent blur-lg animate-smoke-2 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-200/40 via-white/50 to-slate-200/40 backdrop-blur-[2px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Foreground Lock & Mystery Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm border border-slate-200/80">
            <Lock className="h-3.5 w-3.5 text-slate-500" />
          </div>

          <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-slate-700">
            <Cloud className="h-3 w-3 text-sky-500 animate-pulse" />
            <span>Topics Shrouded</span>
          </div>

          <p className="mt-0.5 text-[10px] leading-tight text-slate-500 max-w-[170px]">
            Syllabus under formulation in the clouds. Unlocks after Workshop 02.
          </p>
        </div>
      </div>
    );
  }

  // Full page banner variant (used in workshop detail overview)
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-sky-50/50 p-8 text-center shadow-sm">
      {/* Heavy drifting mist background */}
      <div
        className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-gradient-to-r from-white via-slate-300/50 to-transparent blur-2xl animate-smoke-1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-gradient-to-l from-white via-sky-200/40 to-transparent blur-2xl animate-smoke-2 pointer-events-none"
        aria-hidden="true"
      />

      {/* Blurred faux curriculum cards */}
      <div className="mx-auto max-w-lg space-y-3 opacity-20 filter blur-[4px] pointer-events-none select-none" aria-hidden="true">
        <div className="h-10 rounded-lg bg-slate-400" />
        <div className="h-10 rounded-lg bg-slate-400" />
        <div className="h-10 rounded-lg bg-slate-400" />
      </div>

      {/* Central Floating Glass Plaque */}
      <div className="relative z-10 mx-auto -mt-24 max-w-md rounded-xl border border-white/80 bg-white/85 p-6 backdrop-blur-md shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-inner">
          <Lock className="h-6 w-6 text-slate-600" />
        </div>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-100/80 px-3 py-1 text-xs font-semibold text-sky-800">
          <Cloud className="h-3.5 w-3.5" />
          <span>Curriculum Shrouded in Cloud Mist</span>
        </div>

        <h3 className="mt-3 text-base font-bold text-slate-900">
          {workshopTitle || `Workshop ${String(workshopNumber || 3).padStart(2, "0")}`} Topics Under Formulation
        </h3>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          The topics and chapters for this advanced track are currently being formulated by the curriculum committee. The shroud will be lifted upon mastering Workshop 01 (Python) and Workshop 02 (Git &amp; GitHub).
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-500">
          <EyeOff className="h-3.5 w-3.5 text-slate-400" />
          <span>Syllabus classified until prerequisites are completed</span>
        </div>
      </div>
    </div>
  );
}
