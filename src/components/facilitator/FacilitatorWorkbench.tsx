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
  ChevronRight,
  ArrowRight,
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
      slot: "00:00 – 00:08",
      duration: "8 min",
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
      slot: "00:08 – 00:23",
      duration: "15 min",
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
      slot: "00:23 – 00:38",
      duration: "15 min",
      title: "Strings & Text Processing",
      chapterNumber: 3,
      teachingGoal: "Master text cleaning (.lower(), .strip()), slicing, and substring matching with 'in'.",
      instructorNotes: "Emphasize that strings are immutable. Demonstrate that 's.lower()' returns a new string and doesn't modify 's' in place.",
      misconceptions: [
        "Thinking text.lower() changes the original variable without reassignment.",
        "Off-by-one errors when using slice syntax text[0:5].",
      ],
      discussionPrompt: "Why is text cleaning the most critical preprocessing step for spam filtering and NLP?",
      checkpoint: "Students write a function to detect whether 'urgent' appears inside a user's input string.",
    },
    {
      slot: "00:38 – 00:53",
      duration: "15 min",
      title: "Conditional Logic & Decision Branching",
      chapterNumber: 4,
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
      slot: "00:53 – 01:08",
      duration: "15 min",
      title: "Loops and Repetition",
      chapterNumber: 5,
      teachingGoal: "Master sequence iteration with for loops and condition-driven while loops.",
      instructorNotes: "Demonstrate range(5) generating 0, 1, 2, 3, 4. Show how 'break' terminates an infinite while True loop.",
      misconceptions: [
        "Thinking range(1, 5) includes the number 5 (it stops at 4).",
        "Writing a while loop without modifying the counter variable (infinite loop).",
      ],
      discussionPrompt: "Why are loops fundamental to analyzing datasets of millions of records?",
      checkpoint: "Students write a loop to print odd numbers up to 15.",
    },
    {
      slot: "01:08 – 01:20",
      duration: "12 min",
      title: "Collections: Lists & Dictionaries",
      chapterNumber: 6,
      teachingGoal: "Store sequences in lists and key-value attributes in dictionaries.",
      instructorNotes: "Draw a mental model comparing a list (ordered shelf by index 0, 1, 2) to a dictionary (labeled cubbies by key name).",
      misconceptions: [
        "Trying to access dictionary values using integer indexes instead of key names.",
        "Attempting to modify a list while iterating over it.",
      ],
      discussionPrompt: "Why are JSON datasets and API payloads represented as lists of dictionaries in Python?",
      checkpoint: "Students create an email message dictionary with sender, subject, and flags.",
    },
    {
      slot: "01:20 – 01:32",
      duration: "12 min",
      title: "Functions & Code Organisation",
      chapterNumber: 7,
      teachingGoal: "Encapsulate logic into reusable functions with parameters and return values.",
      instructorNotes: "Clarify the crucial difference between 'print()' inside a function and 'return'. Functions return data to callers.",
      misconceptions: [
        "Thinking print() inside a function is the same as returning a value.",
        "Accessing local variables outside their function scope.",
      ],
      discussionPrompt: "How do functions help us collaborate on large codebases without naming collisions?",
      checkpoint: "Students write calculate_risk_score(keywords, caps_ratio).",
    },
    {
      slot: "01:32 – 01:52",
      duration: "20 min",
      title: "Capstone: Build Inbox Guardian",
      chapterNumber: 8,
      teachingGoal: "Guide students through integrating all concepts to build the complete rule-based security scanner.",
      instructorNotes: "Circulate the room (or monitor chat). Help students debug function signatures and dictionary lookups.",
      misconceptions: [
        "Students forgetting to convert text to lowercase before matching.",
      ],
      discussionPrompt: "How can we make our detection statistics more informative for security analysts?",
      checkpoint: "Students test batch scanning of the sample inbox and inspect output.",
    },
    {
      slot: "01:52 – 02:00",
      duration: "8 min",
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

  const currentSlot = agendaSlots[activeAgendaIndex];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Subtle Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-800 transition-colors">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/workshops/python-foundations" className="hover:text-slate-800 transition-colors">
          Workshop 01
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium">Facilitator Workbench</span>
      </nav>

      {/* Top Banner & Live Timer Bar */}
      <div className="mb-8 pb-8 border-b border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold block mb-2">
              INSTRUCTOR WORKBENCH · 120-MINUTE LIVE DELIVERY
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Workshop 1: Python Foundations — Facilitator Console
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Live delivery console for instructors. Includes minute-by-minute agendas, teaching objectives, live coding checkpoints, common misconceptions, and countdown timer.
            </p>
          </div>

          {/* Session Timer Component */}
          <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-[#0B1220] p-4 text-white shadow-md shrink-0">
            <Clock className="h-5 w-5 text-blue-400" />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                Session Timer
              </span>
              <span className="text-2xl font-mono font-bold tracking-tight text-slate-100">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`rounded p-2 text-white transition-colors ${
                  timerRunning
                    ? "bg-amber-600 hover:bg-amber-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
                title={timerRunning ? "Pause timer" : "Start timer"}
              >
                {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
              </button>
              <button
                type="button"
                onClick={() => resetTimer(120)}
                className="rounded bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                title="Reset to 120 minutes"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Agenda List & Active Slot Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Agenda Slots Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-lg border border-slate-200/80 bg-white overflow-hidden">
            <div className="border-b border-slate-200/80 px-4 py-3 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                120-Minute Master Agenda
              </span>
              <span className="text-xs text-slate-400 font-mono">
                9 Delivery Slots
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {agendaSlots.map((slot, idx) => {
                const isSelected = activeAgendaIndex === idx;
                const isCapstone = slot.chapterNumber === 8;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveAgendaIndex(idx)}
                    className={`w-full text-left p-3.5 transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-50/70 text-blue-900 border-l-3 border-blue-600"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-semibold text-slate-400 w-28 shrink-0">
                        {slot.slot}
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-semibold block truncate text-slate-900">
                          {slot.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          Ch {slot.chapterNumber} · {slot.duration}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? "text-blue-600 translate-x-0.5" : "text-slate-300"
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Teaching Notes for Selected Slot */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-slate-200/80 bg-white p-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-semibold block">
                  Active Agenda Slot
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                  {currentSlot.title}
                </h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600 shrink-0">
                {currentSlot.duration}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Teaching Goal:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {currentSlot.teachingGoal}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Instructor Delivery Notes:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {currentSlot.instructorNotes}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-900 block mb-1 text-amber-900">
                  Common Stumbling Blocks:
                </span>
                <ul className="space-y-1 text-slate-600">
                  {currentSlot.misconceptions.map((m, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded bg-slate-50 p-3 border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-1">
                  Discussion Prompt:
                </span>
                <p className="text-slate-600 italic">
                  &quot;{currentSlot.discussionPrompt}&quot;
                </p>
              </div>

              <div className="rounded bg-emerald-50/60 p-3 border border-emerald-200">
                <span className="font-semibold text-emerald-900 block mb-1">
                  Hands-On Checkpoint:
                </span>
                <p className="text-emerald-950 font-medium">
                  {currentSlot.checkpoint}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/workshops/${workshop1Python.slug}/${workshop1Python.chapters[currentSlot.chapterNumber - 1]?.slug || ""}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Open Chapter {currentSlot.chapterNumber} Material</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
