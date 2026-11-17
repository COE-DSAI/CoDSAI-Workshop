import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  GitBranch,
  Bot,
  Globe,
  Award,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";
import { BRANDING } from "@/lib/branding";
import { getAllWorkshops } from "@/content/workshops";

export default function HomePage() {
  const workshops = getAllWorkshops();

  const philosophySteps = [
    { title: "LEARN", desc: "First-principles conceptual explanations without confusing jargon" },
    { title: "UNDERSTAND", desc: "Step-by-step code execution walkthroughs and why outputs occur" },
    { title: "EXPERIMENT", desc: "Live in-browser Python WebAssembly coding environment" },
    { title: "PRACTISE", desc: "Progressive coding challenges with 3-tier guided hints" },
    { title: "BUILD", desc: "Production capstone projects from Inbox Guardian to Streamlit apps" },
    { title: "REVISE", desc: "Comprehensive chapter summaries, syntax sheets, and searchable glossary" },
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
                Python, Data Science & Machine Learning{" "}
                <span className="text-blue-600">Workshop Series</span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                An interactive, self-contained educational platform supporting students from Python fundamentals to data engineering, statistical visualization, and production machine learning applications.
              </p>

              {/* Hero Action CTAs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/workshops/python/introduction-to-python"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span>Start Workshop 1</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/workshops"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Explore 10-Workshop Curriculum</span>
                </Link>

                <Link
                  href="/projects/inbox-guardian"
                  className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Inbox Guardian Capstone</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-500 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Real Pyodide WebAssembly Python in Browser</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>10 Complete Workshops & 79 Chapters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Self-Contained Revision Material</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Philosophy */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Educational Model
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                How You Learn: The 6-Stage Pedagogy
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Never memorize unexplained syntax or blindly copy code. Every concept is taught from first principles before you apply it.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {philosophySteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-center transition-all hover:bg-white hover:border-blue-300 hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="flex h-6 w-6 mx-auto items-center justify-center rounded-full bg-blue-100 text-xs font-mono font-bold text-blue-700">
                      {idx + 1}
                    </span>
                    <h3 className="mt-2 text-sm font-extrabold tracking-wide text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Python to ML Roadmap Sequence */}
        <section className="py-16 bg-[#F7F8FA] border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Curriculum Sequence
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                  The Complete 10-Workshop Sequence
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  A structured learning path from your first Python statement to interactive machine learning deployment.
                </p>
              </div>

              <Link
                href="/workshops"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>View Full Syllabus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((w) => (
                <div
                  key={w.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-blue-400 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono text-slate-600">
                        Workshop {w.number}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {w.chapters.length} Chapters • {w.durationMinutes}m
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                      {w.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {w.subtitle}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Key Outcomes:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {w.learningOutcomes.slice(0, 2).map((lo, i) => (
                          <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{lo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                      {w.difficulty}
                    </span>
                    <Link
                      href={`/workshops/${w.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Start Workshop <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capstone Spotlight: Inbox Guardian */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-300 bg-slate-900 text-white p-8 sm:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-800">
                    <ShieldCheck className="h-4 w-4" />
                    Workshop 1 Capstone Highlight
                  </span>
                  <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Inbox Guardian — Personal Message Scanner
                  </h2>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Build a complete, menu-driven rule-based security scanner in Workshop 1. Learn to screen messages, log threat indicators into lists of dictionaries, calculate risk statistics, and understand the crucial boundary between heuristic rules and machine learning.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/projects/inbox-guardian"
                      className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition-colors"
                    >
                      Explore Project Workspace
                    </Link>
                    <Link
                      href="/workshops/python/capstone-inbox-guardian"
                      className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                      View Chapter 8 Walkthrough
                    </Link>
                  </div>
                </div>

                {/* Simulated Terminal Card */}
                <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                    <span>INBOX_GUARDIAN_CLI.PY</span>
                    <span>PYTHON 3.12</span>
                  </div>
                  <pre className="mt-3 text-emerald-400 whitespace-pre-wrap leading-relaxed">
{`=====================================
              INBOX GUARDIAN
          PERSONAL MESSAGE SCANNER
=====================================
1. Analyse a message
2. Scan sample inbox
3. View scan history
4. View detection dashboard
0. Exit

Scanning: "URGENT: Click here to claim your prize!"
STATUS: HIGH RISK THREAT
Matched indicators (3): urgent, click here, prize
Recommendation: Do not click links. Verify sender.`}
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

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
