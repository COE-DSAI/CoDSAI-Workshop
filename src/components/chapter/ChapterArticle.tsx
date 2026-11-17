"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Code2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Award,
  Play,
  ArrowRight,
} from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";

interface ChapterArticleProps {
  workshop: Workshop;
  chapter: Chapter;
  isCompleted: boolean;
  onToggleComplete: () => void;
  prevChapter?: Chapter;
  nextChapter?: Chapter;
  onSelectCodeExample?: (code: string) => void;
}

export function ChapterArticle({
  workshop,
  chapter,
  isCompleted,
  onToggleComplete,
  prevChapter,
  nextChapter,
  onSelectCodeExample,
}: ChapterArticleProps) {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, string | number>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const handleQuizSelect = (questionId: string, answer: string | number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const formattedNumber = String(chapter.number).padStart(2, "0");

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Subtle Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
        <Link href={`/workshops/${workshop.slug}`} className="hover:text-slate-800 transition-colors">
          Workshop 01
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium">Chapter {formattedNumber}</span>
      </nav>

      {/* Chapter Header */}
      <header className="mb-10 pb-6 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-blue-600 uppercase tracking-wider">
                CHAPTER {formattedNumber} OF 08
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3 text-slate-400" />
                {chapter.estimatedMinutes} mins reading
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              {chapter.title}
            </h1>
          </div>

          <div>
            <button
              type="button"
              onClick={onToggleComplete}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="h-3.5 w-3.5 text-slate-400" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chapter Introduction */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          {chapter.introduction}
        </p>

        {/* Learning Objectives List */}
        {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
          <div className="mt-6 rounded-md border-l-2 border-blue-500 bg-blue-50/40 p-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-900 font-semibold block mb-2">
              Key Learning Objectives
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {chapter.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-500 font-semibold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Chapter Sections */}
      <div className="space-y-12">
        {chapter.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              {section.title}
            </h2>

            {/* Markdown Prose */}
            <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-line space-y-3">
              {section.content}
            </div>

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`my-5 rounded-md border-l-3 p-4 text-xs leading-relaxed ${
                  section.callout.type === "mistake" || section.callout.type === "warning"
                    ? "border-l-amber-500 bg-amber-50/60 text-amber-950"
                    : section.callout.type === "tip"
                    ? "border-l-emerald-500 bg-emerald-50/60 text-emerald-950"
                    : "border-l-blue-500 bg-blue-50/60 text-blue-950"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {section.callout.type === "mistake" || section.callout.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  ) : section.callout.type === "tip" ? (
                    <Lightbulb className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                  )}
                  <span>{section.callout.title}</span>
                </div>
                <div className="text-slate-700">{section.callout.content}</div>
              </div>
            )}

            {/* Code Examples with Walkthrough */}
            {section.codeExamples && section.codeExamples.length > 0 && (
              <div className="mt-6 space-y-6">
                {section.codeExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="rounded-lg border border-slate-800 bg-[#0B1220] overflow-hidden shadow-sm"
                  >
                    {/* Snippet Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 bg-[#070D18] px-4 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-3.5 w-3.5 text-blue-400" />
                        <span className="font-mono text-slate-300 font-medium">{ex.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onSelectCodeExample && (
                          <button
                            type="button"
                            onClick={() => onSelectCodeExample(ex.code)}
                            className="inline-flex items-center gap-1 rounded bg-blue-600/20 px-2 py-0.5 text-[11px] font-medium text-blue-300 hover:bg-blue-600/30 transition-colors"
                            title="Load this code into the right-hand Python workspace"
                          >
                            <Play className="h-3 w-3" />
                            <span>Load to Editor</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopy(ex.id, ex.code)}
                          className="rounded p-1 text-slate-400 hover:text-slate-200 transition-colors"
                          title="Copy snippet"
                        >
                          {copiedCodeId === ex.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Code Body */}
                    <div className="p-4">
                      {ex.description && (
                        <p className="text-xs text-slate-400 mb-3">
                          {ex.description}
                        </p>
                      )}

                      <pre className="overflow-x-auto font-mono text-xs text-slate-100 leading-relaxed bg-[#0F172A] p-3 rounded border border-slate-800/80">
                        <code>{ex.code}</code>
                      </pre>

                      {/* Line-by-line Walkthrough */}
                      {ex.stepByStepWalkthrough && ex.stepByStepWalkthrough.length > 0 && (
                        <div className="mt-3 rounded bg-slate-900/80 p-3 border border-slate-800 text-xs">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                            Execution Walkthrough
                          </span>
                          <ol className="space-y-1 text-slate-300">
                            {ex.stepByStepWalkthrough.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                <span className="text-slate-500 font-mono mr-1.5">{idx + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Expected Console Output */}
                      {ex.expectedOutput && (
                        <div className="mt-3 rounded bg-black/60 p-2.5 font-mono text-xs border border-slate-800">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">
                            Expected Terminal Output:
                          </span>
                          <pre className="mt-1 text-emerald-400 whitespace-pre-wrap">{ex.expectedOutput}</pre>
                        </div>
                      )}

                      {ex.whyItHappens && (
                        <p className="mt-2 text-[11px] text-slate-400 italic">
                          Why it happens: {ex.whyItHappens}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Chapter Practice Exercises */}
      {chapter.exercises && chapter.exercises.length > 0 && (
        <section id="exercises" className="mt-14 border-t border-slate-200/80 pt-8 scroll-mt-20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Practice Exercise
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Apply what you just learned. Load the starter code into the workspace, implement the solution, and run the automated test checks.
          </p>

          <div className="space-y-6">
            {chapter.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {exercise.title}
                  </h3>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-medium uppercase text-slate-600">
                    {exercise.difficulty}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 mb-4">
                  {exercise.prompt}
                </p>

                {onSelectCodeExample && (
                  <button
                    type="button"
                    onClick={() => onSelectCodeExample(exercise.starterCode)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors"
                  >
                    <Play className="h-3 w-3" />
                    <span>Load Exercise into Python Editor</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chapter Recap & Revision */}
      {chapter.recap && (
        <section className="mt-14 border-t border-slate-200/80 pt-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Chapter Summary &amp; Revision
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Key concepts and syntax cards for revision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Concepts */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-3">
                Key Concepts
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {chapter.recap.keyConcepts.map((kc, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-blue-500 font-semibold">•</span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Essential Syntax */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-3">
                Syntax Reference
              </span>
              <div className="space-y-2.5">
                {chapter.recap.essentialSyntax.map((syn, idx) => (
                  <div key={idx} className="rounded bg-slate-50 p-2 border border-slate-100">
                    <code className="text-xs font-mono font-semibold text-blue-700 block">
                      {syn.syntax}
                    </code>
                    <span className="text-[11px] text-slate-600 mt-0.5 block">
                      {syn.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Concept Self-Assessment */}
      {chapter.selfAssessment && chapter.selfAssessment.length > 0 && (
        <section className="mt-14 border-t border-slate-200/80 pt-8">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Knowledge Check
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Confirm your understanding of the chapter concepts.
          </p>

          <div className="space-y-6">
            {chapter.selfAssessment.map((q) => {
              const selected = selectedQuizAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = isAnswered && selected === q.correctAnswer;

              return (
                <div key={q.id} className="rounded-lg border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-900 mb-3">
                    {q.prompt}
                  </p>

                  {q.options && q.options.length > 0 && (
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selected === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleQuizSelect(q.id, optIdx)}
                            className={`w-full text-left rounded-md px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                              isOptionSelected
                                ? isCorrect
                                  ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-medium"
                                  : "bg-rose-50 text-rose-900 border border-rose-300 font-medium"
                                : "border border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span>{opt}</span>
                            {isOptionSelected && (
                              <span className="text-[10px] font-mono font-bold">
                                {isCorrect ? "✓ Correct" : "✗ Review concept"}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isAnswered && (
                    <p className={`mt-3 text-xs leading-relaxed ${
                      isCorrect ? "text-emerald-700" : "text-rose-700"
                    }`}>
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Prev / Next Chapter Navigation */}
      <nav className="mt-14 pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4" aria-label="Chapter progression">
        {prevChapter ? (
          <Link
            href={`/workshops/${workshop.slug}/${prevChapter.slug}`}
            className="group flex flex-col text-left"
          >
            <span className="text-[11px] text-slate-400 group-hover:text-blue-600 flex items-center gap-1">
              <ChevronLeft className="h-3 w-3" /> Previous Chapter
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              Ch {prevChapter.number}: {prevChapter.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/workshops/${workshop.slug}/${nextChapter.slug}`}
            className="group flex flex-col text-right ml-auto"
          >
            <span className="text-[11px] text-slate-400 group-hover:text-blue-600 flex items-center gap-1 justify-end">
              Next Chapter <ChevronRight className="h-3 w-3" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              Ch {nextChapter.number}: {nextChapter.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/projects/inbox-guardian"
            className="group flex flex-col text-right ml-auto"
          >
            <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 justify-end">
              Capstone Project <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              Build Inbox Guardian
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
