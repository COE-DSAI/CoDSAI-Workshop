import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Layers,
  Lock,
  Cloud,
  GitBranch,
  Database,
  Sparkles,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { BRANDING } from "@/lib/branding";
import { workshop1Python } from "@/content/workshops/workshop1-python";
import { allWorkshops } from "@/content/workshops";

export default function HomePage() {
  const timetable = [
    { time: "00:00 – 00:08", duration: "8m", title: "Introduction & Python Environment", desc: "How Python runs your code, interactive editor, print() output", ch: 1 },
    { time: "00:08 – 00:23", duration: "15m", title: "Variables, Types & Input/Output", desc: "Strings, ints, floats, booleans, type(), input(), f-strings", ch: 2 },
    { time: "00:23 – 00:38", duration: "15m", title: "Strings & Text Normalization", desc: ".strip(), .lower(), slicing, substring search with 'in'", ch: 3 },
    { time: "00:38 – 00:53", duration: "15m", title: "Conditional Logic & Decision Trees", desc: "if, elif, else, comparison operators, logical and/or/not", ch: 4 },
    { time: "00:53 – 01:08", duration: "15m", title: "Repetition: Loops & Guards", desc: "for loops, while loops, range(), break, avoiding infinite loops", ch: 5 },
    { time: "01:08 – 01:20", duration: "12m", title: "Collections: Lists & Dictionaries", desc: "Lists, append(), dictionaries, keys/values, lists of dicts", ch: 6 },
    { time: "01:20 – 01:32", duration: "12m", title: "Functions & Code Organisation", desc: "def, parameters, arguments, return values, variable scope", ch: 7 },
    { time: "01:32 – 01:52", duration: "20m", title: "Capstone Build: Inbox Guardian", desc: "Rule-based security screening architecture and milestones", ch: 8 },
    { time: "01:52 – 02:00", duration: "8m", title: "Review, Pitfalls & Next Steps", desc: "Testing, verification, edge cases, foundation for future ML", ch: 8 },
  ];

  const competencies = [
    { number: "01", title: "Python Interpreter & Execution", desc: "Understand how source code executes statement-by-statement and interpret traceback error messages." },
    { number: "02", title: "Primitive Types & Casting", desc: "Master str, int, float, bool, explicit type conversion, and dynamic f-string formatting." },
    { number: "03", title: "Text Analysis & Normalization", desc: "Clean strings using .strip(), .lower(), slicing, and fast substring checks via 'in'." },
    { number: "04", title: "Branching Decision Logic", desc: "Structure nested if-elif-else trees with boolean logic and clean 4-space indentation." },
    { number: "05", title: "Automated Repetition", desc: "Iterate across sequences using for loops, while loops, range generators, and safe loop controls." },
    { number: "06", title: "In-Memory Structured Data", desc: "Organize real-world datasets as lists of dictionaries for fast lookup and metric extraction." },
    { number: "07", title: "Modular Function Design", desc: "Decompose sprawling programs into reusable, testable functions with parameters and return values." },
    { number: "08", title: "Rule-Based Security Engineering", desc: "Architect, build, and test Inbox Guardian to screen emails for phishing and scam indicators." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1">
        {/* Hero Section: Two-Column Editorial Layout */}
        <section className="border-b border-slate-200/80 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headline and Description */}
              <div className="lg:col-span-7">
                <div className="flex flex-col mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                    {BRANDING.organisationLine1} · {BRANDING.organisationLine2}
                  </span>
                  <span className="text-xs font-medium text-blue-600 mt-0.5">
                    {BRANDING.programmeTitle}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                  Python Foundations: <span className="text-blue-600">Build Inbox Guardian</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  An intensive, hands-on learning platform. Progress from the absolute fundamentals of Python syntax to engineering a complete, rule-based message security application with live interactive code execution.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/workshops/python-foundations/introduction-to-python"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors"
                  >
                    <span>Start Workshop (Chapter 1)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href="/workshops/python-foundations"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-slate-500" />
                    <span>View Syllabus</span>
                  </Link>

                  <Link
                    href="/projects/inbox-guardian"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <span>Inbox Guardian Capstone</span>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Interactive Python 3.11 Environment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Git &amp; GitHub Local PC Workshop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Rule-Based Security Analyzer</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Terminal Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-slate-800 bg-[#0B1220] shadow-xl overflow-hidden font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#070D18]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[10px] text-slate-400 tracking-wider">inbox_guardian.py — python3</span>
                    <div className="w-8" />
                  </div>

                  <div className="p-4 space-y-2 leading-relaxed text-[11px] sm:text-xs">
                    <div className="text-slate-400">
                      <span className="text-emerald-400 font-semibold">$</span> python3 inbox_guardian.py --inspect
                    </div>
                    <div className="text-blue-400 font-semibold">
                      [INBOX GUARDIAN v1.0 · RULE-BASED SECURITY ENGINE]
                    </div>
                    <div className="text-slate-400">
                      Message: &quot;URGENT: Claim your $500 gift card immediately!&quot;
                    </div>
                    <div className="pt-1 space-y-1 text-slate-300 text-[11px]">
                      <div>&gt; Text normalization (.lower, .strip): <span className="text-emerald-400 font-semibold">COMPLETE</span></div>
                      <div>&gt; Suspicious triggers matched: <span className="text-amber-400">[&apos;urgent&apos;, &apos;gift card&apos;]</span></div>
                      <div>&gt; Urgency indicators matched: <span className="text-amber-400">[&apos;immediately!&apos;]</span></div>
                      <div>&gt; Structural heuristics: <span className="text-slate-300">28.5% uppercase ratio (+15)</span></div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">
                        Total Risk Score: <strong className="text-rose-400 font-bold">70 / 100</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] font-bold tracking-wide">
                        QUARANTINE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Series Roadmap: Progressive Tracks */}
        <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>Multi-Track Curriculum Progression</span>
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Workshop Series Roadmap
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Progress through consecutive technical competencies. Master programming foundations, set up version control on your personal computer, and prepare for advanced scientific and AI engineering tracks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allWorkshops.map((w) => {
                const isLocked = Boolean(w.isLocked || w.number > 2);
                const formattedNum = String(w.number).padStart(2, "0");

                if (isLocked) {
                  return (
                    <div
                      key={w.id}
                      className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-100/60 to-slate-200/40 p-6 shadow-xs flex flex-col justify-between"
                    >
                      {/* Atmospheric Mist Drift in Locked Card */}
                      <div
                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-bl from-white via-slate-300/40 to-transparent blur-md animate-smoke-1 pointer-events-none"
                        aria-hidden="true"
                      />
                      <div
                        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-white via-sky-200/30 to-transparent blur-md animate-smoke-2 pointer-events-none"
                        aria-hidden="true"
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            WORKSHOP {formattedNum}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-300/70">
                            <Lock className="h-2.5 w-2.5 text-slate-500" />
                            <span>Locked</span>
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-700">
                          {w.title.split(":")[0]}
                        </h3>

                        {/* Mysterious Cloud Shrouded Topics Notice */}
                        <div className="mt-4 rounded-lg border border-slate-200/80 bg-white/70 p-3 backdrop-blur-xs text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-700 mb-1">
                            <Cloud className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
                            <span>Curriculum Shrouded in Mist</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            Topics under active formulation. Shroud clears after completing Workshop 02: Git &amp; GitHub.
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-400">
                        <span>Duration: {w.durationMinutes}m</span>
                        <span className="font-medium text-slate-400">Upcoming Track</span>
                      </div>
                    </div>
                  );
                }

                // Available Workshops (Workshop 1 & Workshop 2)
                return (
                  <Link
                    key={w.id}
                    href={`/workshops/${w.slug}`}
                    className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-blue-600">
                          WORKSHOP {formattedNum}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/70">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          <span>Available</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {w.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {w.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        <strong className="text-slate-900">{w.chapters.length}</strong> Chapters · {w.durationMinutes}m
                      </span>
                      <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Explore</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Competencies: Editorial Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                Foundational Objectives
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Eight Core Competencies (Workshop 01)
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Each chapter targets a specific, measurable programming capability necessary for data science and AI applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {competencies.map((comp) => (
                <div
                  key={comp.number}
                  className="rounded-lg border border-slate-200/80 bg-white p-5 transition-colors hover:border-slate-300"
                >
                  <span className="font-mono text-xs font-bold text-slate-400 block mb-2">
                    {comp.number}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timetable Section */}
        <section className="py-12 sm:py-16 border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Session Roadmap
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Workshop 01 Timetable
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Live instructor delivery schedule for the 120-minute Workshop 1 session.
                </p>
              </div>

              <Link
                href="/workshops/python-foundations"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
              >
                <span>Full Chapter Breakdown</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200/80 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
                    <th className="py-3 px-4 font-mono w-32">Time</th>
                    <th className="py-3 px-3 font-mono w-20">Duration</th>
                    <th className="py-3 px-4">Workshop Topic &amp; Phase</th>
                    <th className="py-3 px-4 hidden md:table-cell">Key Technical Deliverable</th>
                    <th className="py-3 px-4 font-mono text-right w-24">Chapter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {timetable.map((slot, idx) => {
                    const isCapstone = slot.ch === 8;
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors hover:bg-slate-50/80 ${
                          isCapstone ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-medium text-slate-900 shrink-0">
                          {slot.time}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {slot.duration}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {slot.title}
                          {isCapstone && (
                            <span className="ml-2 inline-flex items-center rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-semibold text-blue-800">
                              Capstone
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 hidden md:table-cell">
                          {slot.desc}
                        </td>
                        <td className="py-3 px-4 font-mono text-right text-slate-500">
                          <Link
                            href={`/workshops/${workshop1Python.slug}/${workshop1Python.chapters[slot.ch - 1]?.slug || ""}`}
                            className="text-blue-600 hover:underline"
                          >
                            Ch {slot.ch}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Featured Project Banner */}
        <section className="py-12 sm:py-16 border-t border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 mb-3 border border-blue-200/80">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Capstone Experience</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Inbox Guardian: Building a Real Security Tool
                </h2>

                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Every Python concept taught in this workshop directly powers Inbox Guardian. You will write code to clean messy text, match suspicious keywords, calculate uppercase and punctuation anomalies, and produce security audit reports for email inboxes.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/projects/inbox-guardian"
                    className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition-colors"
                  >
                    <span>Launch Inbox Guardian Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href="/workshops/python-foundations/introduction-to-python"
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span>Start from Chapter 1</span>
                  </Link>
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
