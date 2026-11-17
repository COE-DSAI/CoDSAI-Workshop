import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FolderGit2,
  Calendar,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { getWorkshopBySlug, getAllWorkshops } from "@/content/workshops";

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

  const timetable = [
    { time: "00–08 min", title: "Introduction to Python & Coding Environment", ch: 1 },
    { time: "08–23 min", title: "Variables, Data Types, and Input/Output", ch: 2 },
    { time: "23–38 min", title: "Conditional Logic & Decision Branching", ch: 3 },
    { time: "38–53 min", title: "Loops and Repetition Patterns", ch: 4 },
    { time: "53–68 min", title: "Collections: Lists & Dictionaries", ch: 5 },
    { time: "68–80 min", title: "Functions & Code Organisation", ch: 6 },
    { time: "80–85 min", title: "Inbox Guardian Capstone Introduction", ch: 7 },
    { time: "85–112 min", title: "Capstone Implementation: Build Inbox Guardian", ch: 8 },
    { time: "112–120 min", title: "Project Showcase & Workshop Recap", ch: 8 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">Workshop 1: Python Foundations</span>
          </nav>

          {/* Workshop Banner */}
          <div className="rounded-xl border border-slate-300 bg-white p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase font-mono text-blue-800">
                Workshop 1
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {workshop.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <Clock className="h-3.5 w-3.5" />
                {workshop.durationMinutes} Minutes (2 Hours)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                8 Standalone Chapters
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {workshop.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {workshop.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/workshops/${workshop.slug}/${workshop.chapters[0].slug}`}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
              >
                <span>Start Learning (Chapter 1)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/projects/inbox-guardian"
                className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Featured Capstone: Inbox Guardian</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: 8 Chapters */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Eight-Chapter Curriculum
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Every chapter is self-contained with first-principles explanations, runnable examples, and revision resources.
                </p>

                <div className="space-y-3.5">
                  {workshop.chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      href={`/workshops/${workshop.slug}/${ch.slug}`}
                      className="group block rounded-lg border border-slate-200 p-4 transition-all hover:border-blue-400 hover:bg-slate-50/70"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-mono font-bold text-blue-700">
                            {ch.number}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {ch.title}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {ch.estimatedMinutes} mins
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed pl-8">
                        {ch.introduction}
                      </p>

                      <div className="mt-3 pl-8 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{ch.sections.length} Concept Sections • {ch.exercises.length} Exercises</span>
                        <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Open Lesson <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: 2-Hour Timetable & Prerequisites */}
            <div className="space-y-6">
              {/* 2-Hour Session Timetable */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Two-Hour Workshop Timetable
                </h3>
                <div className="space-y-2 text-xs">
                  {timetable.map((slot, i) => (
                    <div key={i} className="flex items-start justify-between border-b border-slate-100 pb-1.5 gap-2">
                      <span className="font-mono text-blue-700 font-bold shrink-0">{slot.time}</span>
                      <span className="text-slate-700 text-right leading-tight">{slot.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Measurable Learning Outcomes
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {workshop.learningOutcomes.map((lo, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{lo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Prerequisites
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {workshop.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
