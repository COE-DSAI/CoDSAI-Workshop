import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  Cpu,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { BRANDING } from "@/lib/branding";
import { workshop1Python } from "@/content/workshops/workshop1-python";

export default function HomePage() {
  const timetable = [
    { time: "00–08 min", title: "Introduction to Python & Environment", desc: "Source code, interpreters, Pyodide environment, print()" },
    { time: "08–23 min", title: "Variables, Types, and Input/Output", desc: "Strings, ints, floats, booleans, type(), input(), f-strings" },
    { time: "23–38 min", title: "Conditional Logic & Decision Branching", desc: "if, elif, else, comparison operators, logical and/or/not" },
    { time: "38–53 min", title: "Loops and Repetition", desc: "for loops, while loops, range(), break, avoiding infinite loops" },
    { time: "53–68 min", title: "Collections: Lists & Dictionaries", desc: "Lists, append(), dictionaries, keys/values, lists of dicts" },
    { time: "68–80 min", title: "Functions & Code Organisation", desc: "def, parameters, arguments, return values, variable scope" },
    { time: "80–85 min", title: "Inbox Guardian Capstone Introduction", desc: "Rule-based security screening architecture and milestones" },
    { time: "85–112 min", title: "Capstone Implementation: Build Inbox Guardian", desc: "Hands-on build: scanning engine, batch scans, history, stats" },
    { time: "112–120 min", title: "Showcase, Code Review & Workshop Recap", desc: "Testing, verification, common pitfalls, and next steps" },
  ];

  const competencies = [
    { title: "Python Interpreter & Execution", desc: "Understand how source code executes line-by-line and interpret traceback error messages." },
    { title: "Primitive Types & Casting", desc: "Master str, int, float, bool, explicit type conversion, and dynamic f-string formatting." },
    { title: "Text Analysis & Normalization", desc: "Clean strings using .strip(), .lower(), slicing, and fast substring checks via 'in'." },
    { title: "Branching Decision Logic", desc: "Structure nested if-elif-else trees with boolean logic and clean 4-space indentation." },
    { title: "Automated Repetition", desc: "Iterate across sequences using for loops, while loops, range generators, and safe loop controls." },
    { title: "In-Memory Structured Data", desc: "Organize real-world datasets as lists of dictionaries for fast lookup and metric extraction." },
    { title: "Modular Function Design", desc: "Decompose sprawling programs into reusable, testable functions with parameters and return values." },
    { title: "Rule-Based Security Engineering", desc: "Architect, build, and test Inbox Guardian to screen emails for phishing and scam indicators." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              {/* Official Brand Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>{BRANDING.organisationLine1} • {BRANDING.organisationLine2}</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
                Python Foundations: <span className="text-blue-600">Build Inbox Guardian</span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                An interactive, self-contained educational platform supporting students from first principles in Python programming to building a complete, rule-based message security application.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/workshops/python-foundations/introduction-to-python"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span>Start Workshop (Chapter 1)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/workshops/python-foundations"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-slate-500" />
                  <span>Workshop Syllabus & Timetable</span>
                </Link>

                <Link
                  href="/projects/inbox-guardian"
                  className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Featured Project: Inbox Guardian</span>
                </Link>
              </div>

              {/* Core Attributes */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>120-Minute Structured Session</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Pyodide WebAssembly Python in Browser</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>8 Comprehensive Standalone Chapters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Production Rule-Based Capstone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Students Will Learn */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Core Competencies
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                What You Will Learn & Master
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Every concept is taught from first principles with worked examples, execution walkthroughs, and progressive exercises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {competencies.map((comp, i) => (
                <div
                  key={comp.title}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 shadow-xs hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-mono font-bold text-blue-700">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 text-sm font-bold text-slate-900 leading-snug">
                      {comp.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two-Hour Live Session Overview */}
        <section className="py-16 bg-[#F7F8FA] border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Master Schedule
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Two-Hour Workshop Timetable
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Designed for instructor-led delivery and self-paced completion within a 120-minute window.
                </p>
              </div>

              <Link
                href="/facilitator"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>View Facilitator Console</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="space-y-4">
                {timetable.map((slot, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3.5 last:border-0 last:pb-0 gap-2"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-mono font-bold text-blue-700 shrink-0">
                        {slot.time}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{slot.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{slot.desc}</p>
                      </div>
                    </div>

                    <Link
                      href={i < 8 ? `/workshops/python-foundations/${workshop1Python.chapters[Math.min(i, 7)].slug}` : "/projects/inbox-guardian"}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 self-end sm:self-center shrink-0"
                    >
                      Open Lesson →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Project Spotlight: Inbox Guardian */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-300 bg-slate-900 text-white p-8 sm:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800">
                    <ShieldCheck className="h-4 w-4" />
                    Featured Capstone Project
                  </span>
                  <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Inbox Guardian — Personal Message Scanner
                  </h2>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Synthesize all core programming concepts into a real rule-based security scanner. Accept incoming emails and SMS messages, inspect text for suspicious keywords, record scan history in lists of dictionaries, and compute detection statistics.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/projects/inbox-guardian"
                      className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition-colors"
                    >
                      Open Project Workspace
                    </Link>
                    <Link
                      href="/workshops/python-foundations/capstone-inbox-guardian"
                      className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      View Chapter 8 Walkthrough
                    </Link>
                  </div>
                </div>

                {/* Simulated CLI Terminal View */}
                <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                    <span>INBOX_GUARDIAN.PY</span>
                    <span>PYTHON 3.12 (PYODIDE WASM)</span>
                  </div>
                  <pre className="mt-3 text-emerald-400 whitespace-pre-wrap leading-relaxed">
{`=====================================
              INBOX GUARDIAN
          PERSONAL MESSAGE SCANNER
=====================================
Scanning: "Congratulations! You won a FREE prize. Click here!"

STATUS: HIGH RISK THREAT
Matched indicators (3): free, prize, click here
Recommendation: Do not click links. Verify sender independently.

Total messages scanned: 1 | Threats detected: 1 (100.0%)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
