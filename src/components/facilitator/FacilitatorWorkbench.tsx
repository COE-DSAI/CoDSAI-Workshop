"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Presentation,
  Check,
} from "lucide-react";
import { getAllWorkshops } from "@/content/workshops";
import { Workshop } from "@/types/curriculum";

export function FacilitatorWorkbench() {
  const workshops = getAllWorkshops();
  const [selectedWorkshopSlug, setSelectedWorkshopSlug] = useState<string>("python");

  // Live Timer State (countdown or countup)
  const [timerSeconds, setTimerSeconds] = useState<number>(120 * 60); // 120 minutes
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const activeWorkshop =
    workshops.find((w) => w.slug === selectedWorkshopSlug) || workshops[0];

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs > 0 ? `${hrs}:` : ""}${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = (mins: number = 120) => {
    setTimerRunning(false);
    setTimerSeconds(mins * 60);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Facilitator Header & Timer Bar */}
      <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 border border-purple-200">
                Instructor Mode
              </span>
              <span className="text-xs text-slate-500">Center of Excellence DSAI</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
              Facilitator Workbench & Live Delivery Console
            </h1>
            <p className="mt-1 text-xs text-slate-600 max-w-xl">
              Teaching agendas, precise chapter timings, common student misconceptions, live coding checkpoints, and session countdown timer.
            </p>
          </div>

          {/* Large Session Timer */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-900 p-4 text-white shadow-xs">
            <Clock className="h-6 w-6 text-purple-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Session Timer
              </span>
              <span className="text-3xl font-mono font-extrabold tracking-tight text-purple-300">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 ml-3">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`rounded-lg p-2.5 text-white transition-colors ${
                  timerRunning
                    ? "bg-amber-600 hover:bg-amber-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
                title={timerRunning ? "Pause timer" : "Start timer"}
              >
                {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              </button>
              <button
                onClick={() => resetTimer(120)}
                className="rounded-lg bg-slate-800 p-2.5 text-slate-300 hover:bg-slate-700"
                title="Reset to 120 minutes"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Workshop Tab Selector */}
        <div className="mt-6 border-t border-slate-200 pt-4 flex flex-wrap gap-2">
          {workshops.map((w) => {
            const isSelected = w.slug === selectedWorkshopSlug;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWorkshopSlug(w.slug)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                W{w.number}: {w.title.split(":")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workshop Details & Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Chapters, Timings & Facilitator Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Presentation className="h-5 w-5 text-purple-600" />
              {activeWorkshop.title} — Facilitator Agenda
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Total Duration: {activeWorkshop.durationMinutes} Minutes | Difficulty: {activeWorkshop.difficulty}
            </p>

            {/* Chapters with Timings & Notes */}
            <div className="mt-6 space-y-5">
              {activeWorkshop.chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-800">
                        {ch.number}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{ch.title}</h3>
                    </div>
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-[11px] font-mono text-slate-700">
                      {ch.estimatedMinutes} mins
                    </span>
                  </div>

                  {ch.facilitatorNotes ? (
                    <div className="mt-3.5 space-y-3 text-xs border-t border-slate-200 pt-3">
                      <div>
                        <span className="font-bold text-purple-900 block mb-0.5">
                          Teaching Goal:
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {ch.facilitatorNotes.teachingGoal}
                        </p>
                      </div>

                      {ch.facilitatorNotes.commonMisconceptions.length > 0 && (
                        <div className="rounded bg-amber-50 p-2.5 border border-amber-200 text-amber-950">
                          <span className="font-bold flex items-center gap-1.5 mb-1">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                            Common Student Misconceptions to Address:
                          </span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                            {ch.facilitatorNotes.commonMisconceptions.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {ch.facilitatorNotes.discussionPrompts.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-800 block mb-0.5">
                            Interactive Classroom Discussion Prompts:
                          </span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                            {ch.facilitatorNotes.discussionPrompts.map((d, i) => (
                              <li key={i}>&quot;{d}&quot;</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {ch.facilitatorNotes.liveCodingCheckpoints.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-800 block mb-0.5">
                            Live Coding Demonstration Checkpoint:
                          </span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                            {ch.facilitatorNotes.liveCodingCheckpoints.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-slate-500">
                      Cover core concepts: {ch.learningObjectives?.slice(0, 2).join("; ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Facilitator Checklist & Quick Tools */}
        <div className="space-y-6">
          {/* Pre-flight Facilitator Checklist */}
          <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-purple-600" />
              Live Workshop Checklist
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Verify projector / screen share resolution at 1080p</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Open browser console to test Pyodide WebAssembly runtime</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Confirm all student browsers can access platform routes</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Display 120-minute timer on overhead display</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Explain queued input() mechanism before Chapter 2</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Encourage students to use 3-tier progressive hints</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Reserve 30 minutes for Capstone project completion</span>
              </li>
            </ul>
          </div>

          {/* Quick Session Timetable */}
          <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              120-Minute Master Schedule
            </h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">00–08m</span>
                <span className="text-slate-700">Intro & Environment</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">08–23m</span>
                <span className="text-slate-700">Variables, Types & I/O</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">23–38m</span>
                <span className="text-slate-700">Conditional Logic</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">38–53m</span>
                <span className="text-slate-700">Loops & Repetition</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">53–68m</span>
                <span className="text-slate-700">Collections (Lists & Dicts)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">68–80m</span>
                <span className="text-slate-700">Functions & Organisation</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">80–85m</span>
                <span className="text-slate-700">Capstone Briefing</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="font-mono text-purple-700 font-bold">85–112m</span>
                <span className="text-slate-700 font-semibold text-blue-700">Capstone Build Sprint</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-purple-700 font-bold">112–120m</span>
                <span className="text-slate-700">Showcase & Recap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
