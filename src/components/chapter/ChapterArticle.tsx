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
  Sparkles,
} from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";
import { markChapterComplete } from "@/lib/storage/progress";

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

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/workshops" className="hover:text-blue-600 transition-colors">
          Workshops
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link
          href={`/workshops/${workshop.slug}`}
          className="hover:text-blue-600 transition-colors"
        >
          {workshop.title}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-medium text-slate-800">Chapter {chapter.number}</span>
      </nav>

      {/* Header Banner */}
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
              <BookOpen className="h-3 w-3" />
              Chapter {chapter.number} of {workshop.chapters.length}
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {chapter.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {chapter.estimatedMinutes} mins
            </span>

            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                isCompleted
                  ? "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4 text-slate-400" />
                  Mark Complete
                </>
              )}
            </button>
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4.5 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Chapter Introduction & Context
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {chapter.introduction}
          </p>
        </div>

        {/* Learning Objectives */}
        {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Measurable Learning Objectives
            </h3>
            <ul className="mt-2.5 space-y-1.5">
              {chapter.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-blue-950 leading-relaxed">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-200 text-[10px] font-bold text-blue-800">
                    {i + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Chapter Sections */}
      <div className="space-y-10">
        {chapter.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200/80 pb-2">
              {section.title}
            </h2>

            {/* Markdown Prose */}
            <div className="prose prose-slate mt-3 max-w-none text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {section.content}
            </div>

            {/* Callout Alert if present */}
            {section.callout && (
              <div
                className={`my-4 rounded-lg border p-4 text-xs leading-relaxed ${
                  section.callout.type === "mistake" || section.callout.type === "warning"
                    ? "border-amber-300 bg-amber-50 text-amber-950"
                    : section.callout.type === "tip"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                    : "border-blue-300 bg-blue-50 text-blue-950"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {section.callout.type === "mistake" || section.callout.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  ) : section.callout.type === "tip" ? (
                    <Lightbulb className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  )}
                  <span>{section.callout.title}</span>
                </div>
                <div>{section.callout.content}</div>
              </div>
            )}

            {/* Code Examples with Walkthrough */}
            {section.codeExamples && section.codeExamples.length > 0 && (
              <div className="mt-5 space-y-5">
                {section.codeExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">{ex.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {onSelectCodeExample && (
                          <button
                            onClick={() => onSelectCodeExample(ex.code)}
                            className="rounded bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-800 hover:bg-blue-200 transition-colors"
                          >
                            Load into Workspace
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(ex.id, ex.code)}
                          className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                          title="Copy snippet"
                        >
                          {copiedCodeId === ex.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-slate-600 mb-3">{ex.description}</p>
                      <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 font-mono text-xs text-slate-100 leading-relaxed">
                        {ex.code}
                      </pre>

                      {/* Line-by-line walkthrough */}
                      {ex.stepByStepWalkthrough && ex.stepByStepWalkthrough.length > 0 && (
                        <div className="mt-4 rounded bg-slate-50 p-3 border border-slate-200">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                            Line-by-Line Execution Walkthrough
                          </h4>
                          <ol className="mt-1.5 space-y-1 text-xs text-slate-700">
                            {ex.stepByStepWalkthrough.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                • {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Expected Output */}
                      <div className="mt-3 rounded bg-slate-950 p-2.5 font-mono text-xs text-emerald-400">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Expected Output:
                        </span>
                        <pre className="mt-1 whitespace-pre-wrap">{ex.expectedOutput}</pre>
                      </div>

                      {ex.whyItHappens && (
                        <p className="mt-2 text-[11px] text-slate-500 italic">
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

      {/* Chapter Exercises */}
      {chapter.exercises && chapter.exercises.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Practice Exercises
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Work through these exercises in your right-hand code editor. Use progressive hints if you get stuck.
          </p>

          <div className="mt-5 space-y-6">
            {chapter.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-lg border border-slate-300 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{exercise.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      exercise.difficulty === "basic"
                        ? "bg-emerald-100 text-emerald-800"
                        : exercise.difficulty === "intermediate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-700">{exercise.prompt}</p>

                {onSelectCodeExample && (
                  <button
                    onClick={() => onSelectCodeExample(exercise.starterCode)}
                    className="mt-3 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
                  >
                    Load Exercise into Editor
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chapter Recap */}
      {chapter.recap && (
        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50/70 p-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Chapter Recap & Revision Material
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Concepts */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Concepts
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                {chapter.recap.keyConcepts.map((kc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Essential Syntax */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Essential Syntax Reference
              </h3>
              <div className="mt-2 space-y-2">
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

          {/* Revision Questions */}
          {chapter.recap.revisionQuestions && chapter.recap.revisionQuestions.length > 0 && (
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Revision & Interview Questions
              </h3>
              <div className="mt-3 space-y-3">
                {chapter.recap.revisionQuestions.map((rq, idx) => (
                  <details key={idx} className="group rounded border border-slate-200 p-2.5 text-xs">
                    <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between">
                      <span>Q{idx + 1}: {rq.question}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-2 text-slate-600 pl-2 border-l-2 border-blue-500 leading-relaxed">
                      {rq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Self-Assessment Concept Checks */}
      {chapter.selfAssessment && chapter.selfAssessment.length > 0 && (
        <section className="mt-12 rounded-xl border border-blue-200 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Concept Self-Assessment
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Test your understanding before proceeding to the next chapter.
          </p>

          <div className="mt-5 space-y-5">
            {chapter.selfAssessment.map((q) => {
              const selected = selectedQuizAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = isAnswered && selected === q.correctAnswer;

              return (
                <div key={q.id} className="rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                  <p className="text-xs font-semibold text-slate-800 mb-3">{q.prompt}</p>

                  {q.codeSnippet && (
                    <pre className="mb-3 rounded bg-slate-900 p-2.5 font-mono text-xs text-slate-200">
                      {q.codeSnippet}
                    </pre>
                  )}

                  {q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isThisSelected = selected === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleQuizSelect(q.id, opt)}
                            className={`w-full text-left rounded-md px-3 py-2 text-xs transition-colors border ${
                              isThisSelected
                                ? isCorrect
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                                  : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isAnswered && (
                    <div
                      className={`mt-3 rounded p-2.5 text-xs ${
                        isCorrect
                          ? "bg-emerald-100/70 text-emerald-900 border border-emerald-300"
                          : "bg-rose-100/70 text-rose-900 border border-rose-300"
                      }`}
                    >
                      <span className="font-bold">
                        {isCorrect ? "Correct! " : "Not quite. "}
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation Footer */}
      <nav className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
        {prevChapter ? (
          <Link
            href={`/workshops/${workshop.slug}/${prevChapter.slug}`}
            className="flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Previous Chapter</span>
              <span>{prevChapter.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/workshops/${workshop.slug}/${nextChapter.slug}`}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <div className="text-right">
              <span className="text-[10px] text-blue-200 uppercase block">Next Chapter</span>
              <span>{nextChapter.title}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/workshops"
            className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            <span>Workshop Complete! Explore Catalogue</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
