"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Code2,
  Calendar,
} from "lucide-react";
import { workshop1Python } from "@/content/workshops/workshop1-python";

export function FacilitatorWorkbench() {
  // Live 120-minute master timer
  const [timerSeconds, setTimerSeconds] = useState<number>(120 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [activeAgendaIndex, setActiveAgendaIndex] = useState<number>(0);

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

  const agendaSlots = [
    {
      slot: "00–08 min",
      title: "Introduction to Python & Coding Environment",
      chapterNumber: 1,
      teachingGoal: "Ensure every student executes their first print() statement in the browser and recognizes syntax error tracebacks.",
      instructorNotes: "Emphasize that Python is case-sensitive. Have everyone intentionally write 'Print()' to see the NameError, then fix it.",
      misconceptions: [
        "Students thinking print() creates a GUI popup window rather than console stdout.",
        "Confusing single and double quotation marks (both work as long as they match).",
      ],
      discussionPrompt: "Why did data science and AI coalesce around Python rather than older languages like C++ or Java?",
      checkpoint: "All students have modified and run: print('Hello from Center of Excellence!').",
    },
    {
      slot: "08–23 min",
      title: "Variables, Types, and Input/Output",
      chapterNumber: 2,
      teachingGoal: "Teach students to distinguish between strings and numbers, and master explicit type conversion.",
      instructorNotes: "Explain that input() ALWAYS returns a string. Demonstrate num = input() followed by num + 5 causing a TypeError.",
      misconceptions: [
        "Assuming '10' + '10' produces 20 (it produces '1010').",
        "Confusing assignment '=' with equality test '=='.",
      ],
      discussionPrompt: "Why does Python dynamically figure out types rather than forcing you to declare 'int x = 5' like C?",
      checkpoint: "Students complete the profile generator using f-strings.",
    },
    {
      slot: "23–38 min",
      title: "Conditional Logic & Decision Branching",
      chapterNumber: 3,
      teachingGoal: "Structure clean decision trees using if/elif/else and strict 4-space indentation.",
      instructorNotes: "Demonstrate that Python evaluates conditions from top to bottom and stops at the first True branch.",
      misconceptions: [
        "Using single '=' inside an if condition (causes SyntaxError).",
        "Writing chained 'if' statements when 'elif' is needed for mutual exclusivity.",
      ],
      discussionPrompt: "How do spam filters use threshold scores to make automated decisions?",
      checkpoint: "Students implement the message risk classification rule.",
    },
    {
      slot: "38–53 min",
      title: "Loops and Repetition",
      chapterNumber: 4,
      teachingGoal: "Master sequence iteration with for loops and condition-driven while loops.",
      instructorNotes: "Demonstrate range(5) generating 0, 1, 2, 3, 4. Show how 'break' terminates an infinite while True loop.",
      misconceptions: [
        "Believing range(1, 5) includes the number 5.",
        "Creating infinite while loops by forgetting to update the loop condition.",
      ],
      discussionPrompt: "When is a for loop better than a while loop in data engineering pipelines?",
      checkpoint: "Students accumulate keyword matches across a list of test strings.",
    },
    {
      slot: "53–68 min",
      title: "Collections: Lists & Dictionaries",
      chapterNumber: 5,
      teachingGoal: "Establish lists of dictionaries as the standard in-memory representation of structured records.",
      instructorNotes: "Show how a list of dictionaries directly mirrors rows and columns in a spreadsheet or database table.",
      misconceptions: [
        "Confusing list bracket syntax [] with dictionary curly braces {}.",
        "Assuming dictionary keys can have duplicates (assigning to an existing key overwrites it).",
      ],
      discussionPrompt: "Why is dict['sender'] clearer and safer than list[0] for structured message data?",
      checkpoint: "Students create an in-memory scan history log as a list of dictionaries.",
    },
    {
      slot: "68–80 min",
      title: "Functions & Code Organisation",
      chapterNumber: 6,
      teachingGoal: "Equip students to decompose programs into reusable, modular functions with return values.",
      instructorNotes: "Drive home the difference between print() and return. Explain that assigning x = print('hi') sets x to None.",
      misconceptions: [
        "Confusing printing inside a function with returning a value to the caller.",
        "Attempting to access a local variable outside its function definition.",
      ],
      discussionPrompt: "Why is modular code drastically easier to debug and test in team projects?",
      checkpoint: "Students write a pure function that takes a text string and returns a match count.",
    },
    {
      slot: "80–85 min",
      title: "Inbox Guardian Capstone Introduction",
      chapterNumber: 7,
      teachingGoal: "Walk through the architectural specification of Inbox Guardian and set expectations for the build sprint.",
      instructorNotes: "Present the 6 milestone steps. Clarify that Inbox Guardian is a RULE-BASED application, not machine learning.",
      misconceptions: [
        "Students assuming this is an AI/ML model (clarify: rules are human-crafted heuristics).",
      ],
      discussionPrompt: "What are the inherent failure modes of human-crafted keyword rules?",
      checkpoint: "All students have opened the Inbox Guardian scaffold in their editor.",
    },
    {
      slot: "85–112 min",
      title: "Capstone Implementation: Build Sprint",
      chapterNumber: 8,
      teachingGoal: "Guide students through assembling the 6 functions and completing the interactive CLI menu loop.",
      instructorNotes: "Circulate the room (or monitor chat). Help students debug function signatures and dictionary lookups.",
      misconceptions: [
        "Students forgetting to convert text to lowercase before matching.",
      ],
      discussionPrompt: "How can we make our detection statistics more informative for security analysts?",
      checkpoint: "Students test batch scanning of the sample inbox and inspect output.",
    },
    {
      slot: "112–120 min",
      title: "Showcase, Code Review & Workshop Recap",
      chapterNumber: 8,
      teachingGoal: "Have volunteer students share their working scanners and recap the 120-minute learning journey.",
      instructorNotes: "Congratulate students. Preview how future workshops transition from manual rules to machine learning.",
      misconceptions: [
        "Thinking they are done learning (encourage using the Revision Hub for post-workshop practice).",
      ],
      discussionPrompt: "In future workshops, how will computers learn detection patterns automatically?",
      checkpoint: "Showcase 2 student implementations on the main screen.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner & Timer Bar */}
      <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 border border-purple-200">
                Facilitator Console
              </span>
              <span className="text-xs text-slate-500 font-semibold">Workshop 1 Delivery</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
              Workshop 1: Python Foundations — Facilitator Workbench
            </h1>
            <p className="mt-1 text-xs text-slate-600 max-w-xl leading-relaxed">
              Official live delivery console for instructors. Includes minute-by-minute agendas, teaching objectives, live coding checkpoints, common misconceptions, and countdown timer.
            </p>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-900 p-4 text-white shadow-xs">
            <Clock className="h-6 w-6 text-purple-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Session Countdown
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
      </div>

      {/* Main Grid: Agenda Breakdown & Instructor Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: 9 Master Agenda Slots */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-purple-600" />
                  Two-Hour Master Session Agenda
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any slot to review detailed teaching notes, discussion prompts, and checkpoints.
                </p>
              </div>
              <span className="rounded bg-purple-50 px-2.5 py-1 text-xs font-mono font-bold text-purple-700">
                120 Mins Total
              </span>
            </div>

            <div className="space-y-4">
              {agendaSlots.map((slot, index) => {
                const isSelected = index === activeAgendaIndex;
                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 transition-all ${
                      isSelected
                        ? "border-purple-400 bg-purple-50/40 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setActiveAgendaIndex(index)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-purple-100 px-2.5 py-1 text-xs font-mono font-bold text-purple-800 shrink-0">
                          {slot.slot}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{slot.title}</h3>
                      </div>
                      <Link
                        href={`/workshops/python-foundations/${workshop1Python.chapters[Math.min(slot.chapterNumber - 1, 7)].slug}`}
                        className="text-[11px] font-semibold text-blue-600 hover:underline shrink-0"
                      >
                        Chapter {slot.chapterNumber} →
                      </Link>
                    </div>

                    {isSelected && (
                      <div className="mt-4 border-t border-slate-200/80 pt-3.5 space-y-3 text-xs">
                        <div>
                          <span className="font-bold text-purple-900 block mb-0.5">
                            Teaching Goal:
                          </span>
                          <p className="text-slate-700 leading-relaxed">{slot.teachingGoal}</p>
                        </div>

                        <div>
                          <span className="font-bold text-slate-800 block mb-0.5">
                            Instructor Delivery Notes:
                          </span>
                          <p className="text-slate-600 leading-relaxed">{slot.instructorNotes}</p>
                        </div>

                        {slot.misconceptions.length > 0 && (
                          <div className="rounded bg-amber-50 p-2.5 border border-amber-200 text-amber-950">
                            <span className="font-bold flex items-center gap-1.5 mb-1">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                              Common Student Misconceptions to Address:
                            </span>
                            <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                              {slot.misconceptions.map((m, i) => (
                                <li key={i}>{m}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="rounded bg-blue-50 p-2.5 border border-blue-200 text-blue-950">
                          <span className="font-bold block mb-0.5">
                            Discussion Prompt:
                          </span>
                          <p className="italic">&quot;{slot.discussionPrompt}&quot;</p>
                        </div>

                        <div className="rounded bg-emerald-50 p-2.5 border border-emerald-200 text-emerald-950">
                          <span className="font-bold block mb-0.5">
                            Live Checkpoint:
                          </span>
                          <p>{slot.checkpoint}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Facilitator Checklist & Quick Solutions */}
        <div className="space-y-6">
          {/* Pre-flight Facilitator Checklist */}
          <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <CheckSquare className="h-4 w-4 text-purple-600" />
              Live Workshop Delivery Checklist
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Verify projector display at 1080p and text zoom</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Test browser Pyodide WebAssembly runtime execution</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" defaultChecked />
                <span>Start 120-minute session countdown timer</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Explain queued input() mechanism before Chapter 2</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Guide students to progressive hints (Hint 1, 2, 3)</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Reserve 30 minutes for Capstone implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded text-purple-600" />
                <span>Highlight boundary: rules vs future machine learning</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Instructor Quick Links
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/projects/inbox-guardian"
                className="flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold"
              >
                <span>Inbox Guardian Project Scaffold</span>
                <span>→</span>
              </Link>
              <Link
                href="/workshops/python-foundations/capstone-inbox-guardian"
                className="flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold"
              >
                <span>Chapter 8 Capstone Lesson</span>
                <span>→</span>
              </Link>
              <Link
                href="/revision"
                className="flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold"
              >
                <span>Revision Hub & Syntax Guide</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
