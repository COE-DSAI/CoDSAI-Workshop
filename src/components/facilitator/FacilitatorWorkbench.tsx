"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { workshop1Python } from "@/content/workshops/workshop1-python";

export function FacilitatorWorkbench() {
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
      duration: "8m",
      title: "Introduction to Python & coding environment",
      chapterNumber: 1,
      teachingGoal:
        "Ensure every student executes their first print() statement in the browser and recognizes syntax error tracebacks.",
      instructorNotes:
        "Emphasize that Python is case-sensitive. Have everyone intentionally write 'Print()' to see the NameError, then fix it.",
      misconceptions: [
        "Thinking print() creates a GUI popup window rather than console stdout.",
        "Confusing single and double quotation marks (both work as long as they match).",
      ],
      discussionPrompt:
        "Why did data science and AI coalesce around Python rather than older languages like C++ or Java?",
      checkpoint: "All students have modified and run print() in Chapter 01.",
    },
    {
      slot: "00:08 – 00:23",
      duration: "15m",
      title: "Variables, types, and input/output",
      chapterNumber: 2,
      teachingGoal:
        "Teach students to distinguish between strings and numbers, and master explicit type conversion.",
      instructorNotes:
        "Explain that input() always returns a string. Demonstrate num = input() followed by num + 5 causing a TypeError.",
      misconceptions: [
        "Assuming '10' + '10' produces 20 (it produces '1010').",
        "Confusing assignment '=' with equality test '=='.",
      ],
      discussionPrompt:
        "Why does Python infer types dynamically rather than forcing you to declare 'int x = 5'?",
      checkpoint: "Students complete the profile generator using f-strings.",
    },
    {
      slot: "00:23 – 00:38",
      duration: "15m",
      title: "Strings & text processing",
      chapterNumber: 3,
      teachingGoal:
        "Master text cleaning (.lower(), .strip()), slicing, and substring matching with 'in'.",
      instructorNotes:
        "Emphasize that strings are immutable. Demonstrate that s.lower() returns a new string and does not modify s in place.",
      misconceptions: [
        "Thinking text.lower() mutates the original variable without reassignment.",
        "Off-by-one errors when using slice syntax text[0:5].",
      ],
      discussionPrompt:
        "Why is text normalization the first step for spam filtering and NLP?",
      checkpoint: "Students write a check to detect whether 'urgent' appears in user input.",
    },
    {
      slot: "00:38 – 00:53",
      duration: "15m",
      title: "Conditional logic & decision branching",
      chapterNumber: 4,
      teachingGoal:
        "Structure decision trees using if/elif/else and 4-space indentation.",
      instructorNotes:
        "Demonstrate that Python evaluates conditions top to bottom and stops at the first True branch.",
      misconceptions: [
        "Using single '=' inside an if condition (SyntaxError).",
        "Writing chained 'if' statements when 'elif' is needed for mutual exclusivity.",
      ],
      discussionPrompt: "How do spam filters use threshold scores to make decisions?",
      checkpoint: "Students implement the message risk classification rule.",
    },
    {
      slot: "00:53 – 01:08",
      duration: "15m",
      title: "Loops and repetition",
      chapterNumber: 5,
      teachingGoal:
        "Master sequence iteration with for loops and condition-driven while loops.",
      instructorNotes:
        "Demonstrate range(5) generating 0, 1, 2, 3, 4. Show how break terminates a while True loop.",
      misconceptions: [
        "Thinking range(1, 5) includes 5 (it stops at 4).",
        "Writing a while loop without updating the counter variable.",
      ],
      discussionPrompt: "Why are loops essential for scanning datasets of millions of records?",
      checkpoint: "Students write a loop to print odd numbers up to 15.",
    },
    {
      slot: "01:08 – 01:20",
      duration: "12m",
      title: "Collections: lists & dictionaries",
      chapterNumber: 6,
      teachingGoal:
        "Store sequences in lists and key-value attributes in dictionaries.",
      instructorNotes:
        "Compare a list (indexed by 0, 1, 2) to a dictionary (labeled by key name).",
      misconceptions: [
        "Trying to access dictionary values with integer indexes instead of key names.",
        "Modifying a list while iterating over it.",
      ],
      discussionPrompt:
        "Why are JSON datasets and API payloads represented as lists of dictionaries?",
      checkpoint: "Students create a message dictionary with sender, subject, and flags.",
    },
    {
      slot: "01:20 – 01:32",
      duration: "12m",
      title: "Functions & code organisation",
      chapterNumber: 7,
      teachingGoal:
        "Encapsulate logic into reusable functions with parameters and return values.",
      instructorNotes:
        "Clarify the difference between print() inside a function and return. Functions pass data back to callers.",
      misconceptions: [
        "Thinking print() inside a function returns a value.",
        "Accessing local variables outside their function scope.",
      ],
      discussionPrompt: "How do functions prevent naming collisions in larger codebases?",
      checkpoint: "Students write calculate_risk_score(keywords, caps_ratio).",
    },
    {
      slot: "01:32 – 01:52",
      duration: "20m",
      title: "Capstone: build Inbox Guardian",
      chapterNumber: 8,
      teachingGoal:
        "Integrate all concepts to build the rule-based security scanner.",
      instructorNotes:
        "Circulate the room and help students debug function signatures and dictionary lookups.",
      misconceptions: [
        "Forgetting to convert text to lowercase before matching.",
      ],
      discussionPrompt:
        "How can we make detection statistics clearer for security analysts?",
      checkpoint: "Students run batch scanning on the sample inbox and verify output.",
    },
    {
      slot: "01:52 – 02:00",
      duration: "8m",
      title: "Showcase, code review & recap",
      chapterNumber: 8,
      teachingGoal:
        "Have volunteers share their scanners and recap the 120-minute session.",
      instructorNotes:
        "Point students to the Revision Hub for post-workshop practice and preview upcoming tracks.",
      misconceptions: [
        "Assuming workshop completion means practice is finished.",
      ],
      discussionPrompt:
        "In future workshops, how will models learn detection patterns from data?",
      checkpoint: "Showcase two student implementations.",
    },
  ];

  const currentSlot = agendaSlots[activeAgendaIndex];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors duration-150">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/workshops/python-foundations"
          className="hover:text-[var(--text-primary)] transition-colors duration-150 font-mono tabular-nums"
        >
          Workshop 01
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">Facilitator</span>
      </nav>

      {/* Banner & Timer */}
      <div className="mb-8 pb-8 border-b border-[var(--border-hairline)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tabular-nums text-[var(--accent)] mb-2">
              Instructor workbench · 120 min delivery
            </p>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
              Workshop 01 facilitator console
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              Timed agenda segments, teaching notes, common misconceptions, and live countdown timer
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[var(--code-border)] bg-[var(--code-surface)] p-4 text-[var(--code-text)] shrink-0">
            <Clock className="h-4 w-4 text-[var(--code-secondary)]" strokeWidth={1.5} />
            <div>
              <span className="text-[11px] font-mono text-[var(--code-muted)] block">
                Session timer
              </span>
              <span className="text-2xl font-mono tabular-nums font-medium text-[var(--code-text)]">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors duration-150 ${
                  timerRunning
                    ? "bg-[var(--warning)] hover:opacity-90"
                    : "bg-[var(--positive)] hover:opacity-90"
                }`}
                title={timerRunning ? "Pause timer" : "Start timer"}
                aria-label={timerRunning ? "Pause timer" : "Start timer"}
              >
                {timerRunning ? (
                  <Pause className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                )}
              </button>
              <button
                type="button"
                onClick={() => resetTimer(120)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--code-border)] bg-[var(--code-raised)] text-[var(--code-secondary)] hover:text-[var(--code-text)] transition-colors duration-150"
                title="Reset to 120 minutes"
                aria-label="Reset timer"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
            <div className="border-b border-[var(--border-hairline)] px-4 py-3 bg-[var(--bg-raised)] flex items-center justify-between text-xs">
              <span className="font-medium text-[var(--text-primary)]">
                120-minute agenda
              </span>
              <span className="text-[var(--text-muted)] font-mono tabular-nums">
                9 segments
              </span>
            </div>

            <div className="divide-y divide-[var(--border-hairline)]">
              {agendaSlots.map((slot, idx) => {
                const isSelected = activeAgendaIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveAgendaIndex(idx)}
                    className={`w-full text-left p-4 transition-colors duration-150 flex items-center justify-between border-l-2 ${
                      isSelected
                        ? "bg-[var(--accent-tint)] border-l-[var(--accent)]"
                        : "border-l-transparent hover:bg-[var(--bg-raised)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs tabular-nums text-[var(--text-muted)] w-28 shrink-0">
                        {slot.slot}
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-medium block truncate text-[var(--text-primary)]">
                          {slot.title}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-[var(--text-muted)] block mt-0.5">
                          Ch {String(slot.chapterNumber).padStart(2, "0")} · {slot.duration}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${
                        isSelected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sticky top-20">
            <div className="flex items-start justify-between border-b border-[var(--border-hairline)] pb-4 mb-4 gap-3">
              <div>
                <span className="text-xs font-mono text-[var(--accent)] block">
                  Active segment
                </span>
                <h3 className="text-base font-medium text-[var(--text-primary)] mt-1">
                  {currentSlot.title}
                </h3>
              </div>
              <span className="rounded border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-2 py-0.5 text-xs font-mono tabular-nums text-[var(--text-secondary)] shrink-0">
                {currentSlot.duration}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-medium text-[var(--text-primary)] block mb-1">
                  Teaching goal
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {currentSlot.teachingGoal}
                </p>
              </div>

              <div>
                <span className="font-medium text-[var(--text-primary)] block mb-1">
                  Delivery notes
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {currentSlot.instructorNotes}
                </p>
              </div>

              <div>
                <span className="font-medium text-[var(--warning)] block mb-1">
                  Common misconceptions
                </span>
                <ul className="space-y-1.5 text-[var(--text-secondary)]">
                  {currentSlot.misconceptions.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-mono tabular-nums text-[var(--warning)] shrink-0">
                        {i + 1}.
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-[var(--bg-page)] p-3 border border-[var(--border-hairline)]">
                <span className="font-medium text-[var(--text-primary)] block mb-1">
                  Discussion prompt
                </span>
                <p className="text-[var(--text-secondary)]">
                  &quot;{currentSlot.discussionPrompt}&quot;
                </p>
              </div>

              <div className="rounded-lg bg-[var(--positive-tint)] p-3 border border-[var(--positive-border)]">
                <span className="font-medium text-[var(--positive)] block mb-1">
                  Checkpoint
                </span>
                <p className="text-[var(--text-primary)]">{currentSlot.checkpoint}</p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/workshops/${workshop1Python.slug}/${workshop1Python.chapters[currentSlot.chapterNumber - 1]?.slug || ""}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  <span>Open Chapter {String(currentSlot.chapterNumber).padStart(2, "0")}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
