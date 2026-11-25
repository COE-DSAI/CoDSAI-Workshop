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
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Award,
  Play,
  ArrowRight,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { Chapter, Workshop, ChapterAssignment } from "@/types/curriculum";

interface ChapterArticleProps {
  workshop: Workshop;
  chapter: Chapter;
  isCompleted: boolean;
  onToggleComplete: () => void;
  prevChapter?: Chapter;
  nextChapter?: Chapter;
  onSelectCodeExample?: (code: string) => void;
  onSelectAssignment?: (assignment: ChapterAssignment) => void;
}

export function ChapterArticle({
  workshop,
  chapter,
  isCompleted,
  onToggleComplete,
  prevChapter,
  nextChapter,
  onSelectCodeExample,
  onSelectAssignment,
}: ChapterArticleProps) {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, string | number>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeAssignmentHint, setActiveAssignmentHint] = useState<number>(-1);
  const [showAssignmentSolution, setShowAssignmentSolution] = useState<boolean>(false);
  const [copiedAssignmentCode, setCopiedAssignmentCode] = useState<boolean>(false);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const handleCopyAssignment = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedAssignmentCode(true);
      setTimeout(() => setCopiedAssignmentCode(false), 2000);
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
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
        <Link
          href={`/workshops/${workshop.slug}`}
          className="hover:text-[var(--text-primary)] transition-colors duration-150 font-mono tabular-nums"
        >
          Workshop {String(workshop.number).padStart(2, "0")}
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium font-mono tabular-nums">
          Chapter {formattedNumber}
        </span>
      </nav>

      {/* Chapter Header */}
      <header className="mb-10 pb-6 border-b border-[var(--border-hairline)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 text-xs font-mono tabular-nums">
              <span className="text-[var(--accent)] font-medium">
                Chapter {formattedNumber} of {String(workshop.chapters.length).padStart(2, "0")}
              </span>
              <span className="text-[var(--border-strong)]">·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
                <Clock className="h-4 w-4" strokeWidth={1.5} />
                <span>{chapter.estimatedMinutes} min</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
              {chapter.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={onToggleComplete}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-xs font-medium transition-colors duration-150 ${
              isCompleted
                ? "border border-[var(--positive-border)] bg-[var(--positive-tint)] text-[var(--positive)]"
                : "border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-raised)]"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                <span>Mark complete</span>
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {chapter.introduction}
        </p>

        {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
          <div className="mt-6 rounded-xl border border-[var(--border-hairline)] border-l-2 border-l-[var(--accent)] bg-[var(--bg-surface)] p-4">
            <span className="text-xs font-medium text-[var(--text-primary)] block mb-2">
              Learning objectives
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              {chapter.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono tabular-nums text-[var(--accent)] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
            <h2 className="text-lg sm:text-xl font-medium tracking-[-0.015em] text-[var(--text-primary)] mb-3 border-b border-[var(--border-hairline)] pb-2">
              {section.title}
            </h2>

            <div className="text-sm leading-relaxed text-[var(--text-secondary)] whitespace-pre-line space-y-3">
              {section.content}
            </div>

            {section.callout && (
              <div
                className={`my-6 rounded-xl border border-[var(--border-hairline)] border-l-2 p-4 text-xs leading-relaxed ${
                  section.callout.type === "mistake" || section.callout.type === "warning"
                    ? "border-l-[var(--warning)] bg-[var(--warning-tint)] text-[var(--text-primary)]"
                    : section.callout.type === "tip"
                    ? "border-l-[var(--positive)] bg-[var(--positive-tint)] text-[var(--text-primary)]"
                    : "border-l-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                }`}
              >
                <div className="flex items-center gap-2 font-medium mb-1">
                  {section.callout.type === "mistake" || section.callout.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-[var(--warning)] shrink-0" strokeWidth={1.5} />
                  ) : section.callout.type === "tip" ? (
                    <Lightbulb className="h-4 w-4 text-[var(--positive)] shrink-0" strokeWidth={1.5} />
                  ) : (
                    <HelpCircle className="h-4 w-4 text-[var(--accent)] shrink-0" strokeWidth={1.5} />
                  )}
                  <span>{section.callout.title}</span>
                </div>
                <div className="text-[var(--text-secondary)]">{section.callout.content}</div>
              </div>
            )}

            {section.codeExamples && section.codeExamples.length > 0 && (
              <div className="mt-6 space-y-6">
                {section.codeExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="rounded-xl border border-[var(--code-border)] bg-[var(--code-surface)] overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-chrome)] px-4 py-2.5 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        {workshop.executionMode === "local-project" ? (
                          <Terminal className="h-4 w-4 text-[var(--code-secondary)] shrink-0" strokeWidth={1.5} />
                        ) : (
                          <Code2 className="h-4 w-4 text-[var(--code-secondary)] shrink-0" strokeWidth={1.5} />
                        )}
                        <span className="font-mono text-[var(--code-text)] truncate">{ex.title}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {workshop.executionMode !== "local-project" && onSelectCodeExample && (
                          <button
                            type="button"
                            onClick={() => onSelectCodeExample(ex.code)}
                            className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[var(--code-border)] bg-[var(--code-raised)] px-2.5 text-xs font-medium text-[var(--code-text)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-150"
                            title="Load this code into the right-hand Python workspace"
                          >
                            <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
                            <span>Load to editor</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopy(ex.id, ex.code)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--code-secondary)] hover:bg-[var(--code-raised)] hover:text-[var(--code-text)] transition-colors duration-150"
                          title="Copy snippet"
                          aria-label="Copy snippet"
                        >
                          {copiedCodeId === ex.id ? (
                            <Check className="h-4 w-4 text-[#4CC38A]" strokeWidth={1.5} />
                          ) : (
                            <Copy className="h-4 w-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {ex.description && (
                        <p className="text-xs text-[var(--code-secondary)]">{ex.description}</p>
                      )}

                      <pre className="overflow-x-auto font-mono text-xs text-[var(--code-text)] leading-relaxed bg-[var(--code-chrome)] p-3 rounded-lg border border-[var(--code-border)]">
                        <code>{ex.code}</code>
                      </pre>

                      {ex.stepByStepWalkthrough && ex.stepByStepWalkthrough.length > 0 && (
                        <div className="rounded-lg bg-[var(--code-raised)] p-3 border border-[var(--code-border)] text-xs">
                          <span className="font-mono text-xs text-[var(--code-secondary)] block mb-2">
                            Execution walkthrough
                          </span>
                          <ol className="space-y-1 text-[var(--code-text)]">
                            {ex.stepByStepWalkthrough.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                <span className="text-[var(--code-muted)] font-mono tabular-nums mr-2">
                                  {idx + 1}.
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {ex.expectedOutput && (
                        <div className="rounded-lg bg-[var(--code-chrome)] p-3 font-mono text-xs border border-[var(--code-border)]">
                          <span className="text-[11px] text-[var(--code-muted)] block">
                            Expected output
                          </span>
                          <pre className="mt-1 text-[#4CC38A] whitespace-pre-wrap">{ex.expectedOutput}</pre>
                        </div>
                      )}

                      {ex.edgeCases && (
                        <div className="rounded-lg bg-[#251E17] p-3 text-xs border border-[#FBBF24]/25 text-[#FDE68A]">
                          <span className="font-medium flex items-center gap-1.5 mb-1">
                            <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                            <span>Edge cases</span>
                          </span>
                          <p className="text-xs text-[#FCD34D]/90 leading-relaxed whitespace-pre-line">
                            {ex.edgeCases}
                          </p>
                        </div>
                      )}

                      {ex.whyItHappens && (
                        <p className="text-xs text-[var(--code-secondary)]">
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

      {/* Practice Exercises */}
      {chapter.exercises && chapter.exercises.length > 0 && (
        <section id="exercises" className="mt-12 border-t border-[var(--border-hairline)] pt-8 scroll-mt-20">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Practice exercise
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Work through the exercise before starting the chapter assignment
          </p>

          <div className="space-y-4">
            {chapter.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {exercise.title}
                  </h3>
                  <span className="rounded border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-2 py-0.5 text-xs font-mono text-[var(--text-secondary)]">
                    {exercise.difficulty}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-4">
                  {exercise.prompt}
                </p>

                {onSelectCodeExample && (
                  <button
                    type="button"
                    onClick={() => onSelectCodeExample(exercise.starterCode)}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                  >
                    <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>Load into Python editor</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chapter Assignment */}
      {chapter.assignment && (
        <section id="assignment" className="mt-12 border-t border-[var(--border-hairline)] pt-8 scroll-mt-20">
          <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--bg-surface)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
                <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 font-medium text-[var(--accent)]">
                  Chapter {formattedNumber} assignment
                </span>
                <span className="text-[var(--text-muted)]">Milestone</span>
              </div>

              {onSelectAssignment && (
                <button
                  type="button"
                  onClick={() => onSelectAssignment(chapter.assignment!)}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                >
                  <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>Load assignment</span>
                </button>
              )}
            </div>

            <h2 className="text-xl font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              {chapter.assignment.title}
            </h2>

            <div className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-page)] p-4 rounded-lg border border-[var(--border-hairline)]">
              <span className="font-medium text-[var(--text-primary)] block mb-1">
                Scenario
              </span>
              <p>{chapter.assignment.scenario}</p>
            </div>

            <div className="mt-6">
              <span className="text-xs font-medium text-[var(--text-primary)] block mb-3">
                Implementation requirements
              </span>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {chapter.assignment.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 leading-relaxed bg-[var(--bg-page)] p-3 rounded-lg border border-[var(--border-hairline)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-lg border border-[var(--warning-border)] bg-[var(--warning-tint)] p-4 text-xs">
              <div className="flex items-center gap-2 font-medium text-[var(--text-primary)] mb-2">
                <ShieldAlert className="h-4 w-4 text-[var(--warning)] shrink-0" strokeWidth={1.5} />
                <span>Edge cases to handle</span>
              </div>
              <ul className="space-y-1.5 text-[var(--text-secondary)]">
                {chapter.assignment.edgeCasesToHandle.map((ec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono tabular-nums text-[var(--warning)] shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{ec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  Starter template
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyAssignment(chapter.assignment!.starterCode)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline font-medium"
                >
                  {copiedAssignmentCode ? (
                    <Check className="h-4 w-4 text-[var(--positive)]" strokeWidth={1.5} />
                  ) : (
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  <span>{copiedAssignmentCode ? "Copied" : "Copy template"}</span>
                </button>
              </div>

              <pre className="rounded-lg bg-[var(--code-surface)] p-4 font-mono text-xs text-[var(--code-text)] border border-[var(--code-border)] overflow-x-auto max-h-56 leading-relaxed">
                <code>{chapter.assignment.starterCode}</code>
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
              <span className="text-xs font-medium text-[var(--text-primary)] block mb-3">
                Progressive hints
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(["Concept", "Approach", "Implementation"] as const).map((label, hIdx) => {
                  const isOpen = activeAssignmentHint === hIdx;
                  return (
                    <button
                      key={hIdx}
                      type="button"
                      onClick={() => setActiveAssignmentHint(isOpen ? -1 : hIdx)}
                      className={`text-left rounded-lg p-3 text-xs transition-colors duration-150 border ${
                        isOpen
                          ? "bg-[var(--accent-tint)] border-[var(--accent-border)] text-[var(--accent)] font-medium"
                          : "bg-[var(--bg-surface)] border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[11px] tabular-nums">Hint {hIdx + 1}</span>
                        {isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )}
                      </div>
                      <span className="block text-xs">{label}</span>
                    </button>
                  );
                })}
              </div>

              {activeAssignmentHint >= 0 && (
                <div className="mt-3 p-4 rounded-lg bg-[var(--accent-tint)] border border-[var(--accent-border)] text-xs text-[var(--text-primary)] leading-relaxed">
                  <span className="font-medium block mb-1">
                    Hint {activeAssignmentHint + 1}
                  </span>
                  {chapter.assignment.hints[activeAssignmentHint]}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
              <button
                type="button"
                onClick={() => setShowAssignmentSolution(!showAssignmentSolution)}
                className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5"
              >
                <span>{showAssignmentSolution ? "Hide reference solution" : "Reveal reference solution"}</span>
                {showAssignmentSolution ? (
                  <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                )}
              </button>

              {showAssignmentSolution && (
                <div className="mt-3 space-y-3">
                  <pre className="rounded-lg bg-[var(--code-surface)] p-4 font-mono text-xs text-[#4CC38A] border border-[var(--code-border)] overflow-x-auto leading-relaxed">
                    <code>{chapter.assignment.referenceSolution}</code>
                  </pre>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-page)] p-3 rounded-lg border border-[var(--border-hairline)]">
                    <strong className="font-medium text-[var(--text-primary)]">Solution notes: </strong>
                    {chapter.assignment.solutionExplanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Chapter Recap */}
      {chapter.recap && (
        <section className="mt-12 border-t border-[var(--border-hairline)] pt-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Chapter summary
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Key concepts and syntax cards for review
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
              <span className="text-xs font-medium text-[var(--text-muted)] block mb-3">
                Key concepts
              </span>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {chapter.recap.keyConcepts.map((kc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="font-mono tabular-nums text-[var(--accent)] shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{kc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
              <span className="text-xs font-medium text-[var(--text-muted)] block mb-3">
                Syntax reference
              </span>
              <div className="space-y-3">
                {chapter.recap.essentialSyntax.map((syn, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-[var(--bg-page)] p-3 border border-[var(--border-hairline)]"
                  >
                    <code className="text-xs font-mono font-medium text-[var(--accent)] block">
                      {syn.syntax}
                    </code>
                    <span className="text-xs text-[var(--text-secondary)] mt-1 block">
                      {syn.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Knowledge Check */}
      {chapter.selfAssessment && chapter.selfAssessment.length > 0 && (
        <section className="mt-12 border-t border-[var(--border-hairline)] pt-8">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--positive)]" strokeWidth={1.5} />
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Knowledge check
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Verify your grasp of the chapter concepts
          </p>

          <div className="space-y-4">
            {chapter.selfAssessment.map((q) => {
              const selected = selectedQuizAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = isAnswered && selected === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
                >
                  <p className="text-xs font-medium text-[var(--text-primary)] mb-3">
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
                            className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors duration-150 flex items-center justify-between border ${
                              isOptionSelected
                                ? isCorrect
                                  ? "bg-[var(--positive-tint)] text-[var(--positive)] border-[var(--positive-border)] font-medium"
                                  : "bg-[var(--negative-tint)] text-[var(--negative)] border-[var(--negative-border)] font-medium"
                                : "border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]"
                            }`}
                          >
                            <span>{opt}</span>
                            {isOptionSelected && (
                              <span className="text-[11px] font-mono shrink-0 ml-2">
                                {isCorrect ? "Correct" : "Review"}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isAnswered && (
                    <p
                      className={`mt-3 text-xs leading-relaxed ${
                        isCorrect ? "text-[var(--positive)]" : "text-[var(--negative)]"
                      }`}
                    >
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <nav
        className="mt-12 pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4"
        aria-label="Chapter progression"
      >
        {prevChapter ? (
          <Link
            href={`/workshops/${workshop.slug}/${prevChapter.slug}`}
            className="group flex flex-col text-left"
          >
            <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              <span>Previous chapter</span>
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 mt-1">
              Ch {String(prevChapter.number).padStart(2, "0")}: {prevChapter.title}
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
            <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] inline-flex items-center gap-1 justify-end">
              <span>Next chapter</span>
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 mt-1">
              Ch {String(nextChapter.number).padStart(2, "0")}: {nextChapter.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/projects/inbox-guardian"
            className="group flex flex-col text-right ml-auto"
          >
            <span className="text-xs text-[var(--accent)] font-medium inline-flex items-center gap-1 justify-end">
              <span>Capstone project</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 mt-1">
              Build Inbox Guardian
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
