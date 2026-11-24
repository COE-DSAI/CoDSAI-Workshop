import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Terminal,
  BookOpen,
  Code2,
  Cpu,
  Layers,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { getWorkshopBySlug, getAllWorkshops } from "@/content/workshops";
import { CurriculumChapterList } from "@/components/chapter/CurriculumChapterList";

export async function generateStaticParams() {
  const workshops = getAllWorkshops();
  return workshops.map((w) => ({
    workshopSlug: w.slug,
  }));
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ workshopSlug: string }>;
}) {
  const { workshopSlug } = await params;
  const workshop = getWorkshopBySlug(workshopSlug);

  if (!workshop) {
    notFound();
  }

  // Live session schedule (120 minutes allocation)
  const liveSchedule = [
    { time: "00:00 – 00:08", duration: "8m", phase: "Introduction & Python Environment", focus: "How Python runs your code, interactive environment, print() output", ch: 1 },
    { time: "00:08 – 00:23", duration: "15m", phase: "Variables, Types & Input/Output", focus: "Primitive types, casting, f-strings, interactive input()", ch: 2 },
    { time: "00:23 – 00:38", duration: "15m", phase: "Strings & Text Normalization", focus: ".strip(), .lower(), slicing, substring search with 'in'", ch: 3 },
    { time: "00:38 – 00:53", duration: "15m", phase: "Conditional Logic & Branching", focus: "if / elif / else trees, boolean operators, truthiness", ch: 4 },
    { time: "00:53 – 01:08", duration: "15m", phase: "Repetition: For & While Loops", focus: "Iteration over sequences, range(), break, loop guards", ch: 5 },
    { time: "01:08 – 01:20", duration: "12m", phase: "Collections: Lists & Dictionaries", focus: "List operations, dict key-value lookups, structured messages", ch: 6 },
    { time: "01:20 – 01:32", duration: "12m", phase: "Functions & Modular Architecture", focus: "def, parameters, return values, clean code decomposition", ch: 7 },
    { time: "01:32 – 01:52", duration: "20m", phase: "Capstone: Build Inbox Guardian", focus: "Rule-based scoring engine, urgency detection, batch scanning", ch: 8 },
    { time: "01:52 – 02:00", duration: "8m", phase: "Review, Pitfalls & Next Steps", focus: "Code review, edge cases, foundation for future ML workshops", ch: 8 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8FA]">
      <AppHeader />

      <main className="flex-1">
        {/* Top Container */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* A. Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Workshops</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium">Workshop {String(workshop.number).padStart(2, "0")}: {workshop.title.split(":")[0]}</span>
          </nav>

          {/* B. Hero Section: Two-Column Editorial Layout */}
          <section className="pb-12 border-b border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading & Information */}
              <div className="lg:col-span-7">
                <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                  WORKSHOP {String(workshop.number).padStart(2, "0")} · {workshop.difficulty.toUpperCase()} · {workshop.durationMinutes} MINUTES
                </p>

                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                  {workshop.title}
                </h1>

                <p className="mt-3 text-lg sm:text-xl font-medium text-slate-600">
                  {workshop.subtitle}
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {workshop.description || (workshop.number === 2
                    ? "A complete first-principles guide to professional version control on your personal computer. Master repository architecture, git init, surgical staging, atomic commits, branching trees, merge conflicts, and GitHub collaboration."
                    : workshop.number === 1
                    ? "An intensive, first-principles curriculum. Master syntax, branching logic, loop constructs, structured collections, and modular functions, then architect and test a complete rule-based email security analyzer in Python."
                    : "This workshop is currently locked. The curriculum will be announced soon.")}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {workshop.chapters.length > 0 ? (
                    <Link
                      href={`/workshops/${workshop.slug}/${workshop.chapters[0].slug}`}
                      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-500 cursor-not-allowed">
                      <span>Locked</span>
                    </span>
                  )}

                  {workshop.projectSlug && (
                    <Link
                      href={workshop.number === 1 ? "/projects/inbox-guardian" : `/workshops/${workshop.slug}/${workshop.chapters[0]?.slug || ""}`}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span>Explore {workshop.projectTitle || "Capstone Project"}</span>
                    </Link>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-500 pt-6 border-t border-slate-200/80">
                  <div>
                    <span className="font-semibold text-slate-900">{workshop.chapters.length}</span> {workshop.chapters.length === 1 ? "Chapter" : "Detailed Chapters"}
                  </div>
                  <span className="text-slate-300">•</span>
                  <div>
                    <span className="font-semibold text-slate-900">{workshop.durationMinutes}</span> Min Session Schedule
                  </div>
                  <span className="text-slate-300">•</span>
                  <div>
                    <span className="font-semibold text-slate-900">
                      {workshop.number === 1 ? "Zero" : "Basic"}
                    </span> Prior Knowledge Required
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Terminal Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-slate-800 bg-[#0B1220] shadow-xl overflow-hidden font-mono text-xs text-slate-300">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-800 bg-[#070D18]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[10px] text-slate-400 tracking-wider">
                      {workshop.number === 2 ? "git-bash — personal-pc" : "inbox_guardian.py — python3"}
                    </span>
                    <div className="w-8" />
                  </div>

                  {/* Terminal Session Content */}
                  <div className="p-4 space-y-2 leading-relaxed text-[11px] sm:text-xs">
                    {workshop.number === 2 ? (
                      <>
                        <div className="text-slate-400">
                          <span className="text-emerald-400 font-semibold">$</span> git status
                        </div>
                        <div className="text-slate-300">
                          On branch main<br />
                          Your branch is up to date with &apos;origin/main&apos;.
                        </div>
                        <div className="text-slate-400 pt-1">
                          <span className="text-emerald-400 font-semibold">$</span> git switch -c feature/portfolio
                        </div>
                        <div className="text-blue-400">
                          Switched to a new branch &apos;feature/portfolio&apos;
                        </div>
                        <div className="text-slate-400 pt-1">
                          <span className="text-emerald-400 font-semibold">$</span> git commit -m &quot;feat: collaborative multi-branch workflow&quot;
                        </div>
                        <div className="text-emerald-400 text-[11px]">
                          [feature/portfolio a1b2c3d] feat: collaborative multi-branch workflow<br />
                          2 files changed, 48 insertions(+)
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* C. Curriculum Section: Editorial List Layout */}
          <section className="py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {workshop.chapters.length > 0
                    ? `${workshop.chapters.length}-Chapter Curriculum Path`
                    : "Curriculum Syllabus"}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {workshop.chapters.length > 0
                    ? "A structured technical progression from fundamental principles to real-world software implementation."
                    : "Curriculum modules for this advanced workshop are shrouded in the clouds until prerequisites are mastered."}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0">
                {workshop.chapters.length > 0
                  ? `${workshop.chapters.length} Chapters · ${workshop.durationMinutes} Minutes Combined Reading`
                  : "Status: Shrouded in Cloud Mist"}
              </span>
            </div>

            <CurriculumChapterList workshop={workshop} />
          </section>

          {/* D. Timetable Section: Live Workshop Delivery Schedule (for Workshop 1) */}
          {workshop.number === 1 && (
            <section className="py-12 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Two-Hour Workshop Timetable
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    The live instructor-led timeline for the 120-minute session. Note: Chapter reading times above reflect independent study.
                  </p>
                </div>
                <Link
                  href="/facilitator"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Open Facilitator Workbench</span>
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
                    {liveSchedule.map((slot, idx) => {
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
                            {slot.phase}
                            {isCapstone && (
                              <span className="ml-2 inline-flex items-center rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-semibold text-blue-800">
                                Capstone
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-500 hidden md:table-cell">
                            {slot.focus}
                          </td>
                          <td className="py-3 px-4 font-mono text-right text-slate-500">
                            <Link
                              href={`/workshops/${workshop.slug}/${workshop.chapters[slot.ch - 1]?.slug || ""}`}
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
            </section>
          )}

          {/* E. Project Showcase: Inbox Guardian (W1) or Git Portfolio (W2) */}
          {workshop.number === 1 && (
            <section className="py-12 border-t border-slate-200/80">
              <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 mb-3 border border-blue-200/80">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Featured Capstone Project</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Inbox Guardian: Rule-Based Message Security Scanner
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Rather than building abstract toy exercises, students synthesize all 8 chapters into a practical command-line security tool. Inbox Guardian ingests simulated email messages, normalizes text, extracts features, calculates heuristic threat scores, and outputs quarantine verdicts.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          1. Text Normalization
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Applies .lower() and .strip() to defeat basic case obfuscation and leading/trailing whitespace bypasses.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          2. Keyword &amp; Urgency Scoring
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Checks messages against categorized dictionaries of financial lures, urgent deadlines, and threat terms.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          3. Structural Heuristics
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Evaluates uppercase ratio, exclamation density, and suspicious link structures to calculate an aggregate risk rating.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          4. Batch Reporting
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Processes collections of emails, categorizes them into Clean, Flagged, or Quarantine, and outputs a formatted summary.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href="/projects/inbox-guardian"
                        className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition-colors"
                      >
                        <span>Open Inbox Guardian Project Workspace</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-5 rounded-lg border border-slate-200/80 bg-slate-50/60 text-xs">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                      Python Concepts Applied
                    </span>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>String slicing &amp; normalization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>Nested conditional branching (if/elif/else)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>Iteration over message collections (for loops)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>Structured dictionaries for risk scoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>Modular functions with typed contracts</span>
                      </li>
                    </ul>

                    <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Why Rule-Based Heuristics?</strong>
                      <br />
                      Rule-based engines form the mental foundation for machine learning. Understanding explicit decision boundaries teaches students what statistical models learn to automate.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {workshop.number === 2 && (
            <section className="py-12 border-t border-slate-200/80">
              <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 mb-3 border border-emerald-200/80">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Featured Capstone Project</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Git Mastery Portfolio: Multi-Branch Collaborative Repository
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Build your professional open-source data science portfolio directly on your PC. You will initialize a repository, craft a professional Markdown README with badge shields, configure standard .gitignore exclusions, isolate features on dedicated branches, resolve simulated merge conflicts, and push to GitHub with upstream tracking.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          1. Three-Tree Mental Model
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Surgically stage and commit files between Working Directory, Staging Index, and Git Object Store.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          2. Feature Branching
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Isolate experimental changes on dedicated feature branches without risking main branch stability.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          3. Conflict Resolution
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Decipher conflict markers and confidently merge divergent commit histories in your editor and CLI.
                        </p>
                      </div>

                      <div className="p-3 rounded border border-slate-100 bg-slate-50/60">
                        <span className="font-semibold text-slate-900 block mb-1">
                          4. GitHub Remotes &amp; Upstream
                        </span>
                        <p className="text-slate-500 leading-relaxed">
                          Attach cloud remotes and establish persistent tracking links with git push -u origin main.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href={`/workshops/${workshop.slug}/${workshop.chapters[0].slug}`}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 transition-colors"
                      >
                        <span>Start Chapter 01: Local PC Setup</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-5 rounded-lg border border-slate-200/80 bg-slate-50/60 text-xs">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                      Git Competencies Mastered
                    </span>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>Local CLI configuration (~/.gitconfig)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>Repository scaffolding &amp; .gitignore</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>Atomic conventional commits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>Branching trees &amp; merge resolution</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        <span>GitHub SSH/PAT remote sync</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* F. Outcomes & Prerequisites Grid */}
          <section className="py-12 border-t border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Learning Outcomes */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Measurable Competencies</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {workshop.learningOutcomes.map((lo, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-blue-500 font-bold shrink-0">•</span>
                      <span>{lo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-600" />
                  <span>Prerequisites &amp; Environment</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {workshop.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
