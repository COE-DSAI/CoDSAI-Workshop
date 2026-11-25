import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";
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

  const formattedNum = String(workshop.number).padStart(2, "0");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors duration-150">
              Home
            </Link>
            <span>/</span>
            <span>Workshops</span>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-medium">
              Workshop {formattedNum}
            </span>
          </nav>

          {/* Hero */}
          <section className="pb-12 border-b border-[var(--border-hairline)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-mono tabular-nums text-[var(--accent)]">
                  Workshop {formattedNum} · {workshop.difficulty} · {workshop.durationMinutes} min
                </p>

                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.025em] text-[var(--text-primary)] leading-[1.1]">
                  {workshop.title}
                </h1>

                <p className="mt-3 text-lg font-normal text-[var(--text-secondary)]">
                  {workshop.subtitle}
                </p>

                <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {workshop.description ||
                    (workshop.number === 2
                      ? "A practical guide to version control on your computer: repository layout, git init, staging, commits, branching, merge conflicts, and GitHub collaboration."
                      : workshop.number === 1
                      ? "A step-by-step introduction to Python syntax, branching, loops, collections, and functions, ending with a rule-based email security analyzer."
                      : "Curriculum details for this workshop will be published when the track opens.")}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {workshop.chapters.length > 0 ? (
                    <Link
                      href={`/workshops/${workshop.slug}/${workshop.chapters[0].slug}`}
                      className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                    >
                      <span>Start Chapter 01</span>
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  ) : (
                    <span className="inline-flex h-11 items-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-5 text-sm font-medium text-[var(--text-muted)]">
                      Locked
                    </span>
                  )}

                  {workshop.projectSlug && (
                    <Link
                      href={
                        workshop.number === 1
                          ? "/projects/inbox-guardian"
                          : `/workshops/${workshop.slug}/${workshop.chapters[0]?.slug || ""}`
                      }
                      className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors duration-150"
                    >
                      <span>{workshop.projectTitle || "Capstone workspace"}</span>
                    </Link>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono tabular-nums text-[var(--text-muted)] pt-6 border-t border-[var(--border-hairline)]">
                  <span>
                    <strong className="font-medium text-[var(--text-primary)]">{workshop.chapters.length}</strong>{" "}
                    {workshop.chapters.length === 1 ? "chapter" : "chapters"}
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="font-medium text-[var(--text-primary)]">{workshop.durationMinutes}</strong> min schedule
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="font-medium text-[var(--text-primary)]">
                      {workshop.number === 1 ? "No" : "Basic"}
                    </strong>{" "}
                    prior experience required
                  </span>
                </div>
              </div>

              {/* Right Column: Unified Dark Terminal Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-[var(--code-border)] bg-[var(--code-surface)] overflow-hidden font-mono text-xs text-[var(--code-text)] shadow-[0_12px_32px_rgba(24,20,23,0.10)]">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--code-border)] bg-[var(--code-chrome)]">
                    <span className="text-xs text-[var(--code-secondary)]">
                      {workshop.number === 2 ? "git-bash" : "inbox_guardian.py"}
                    </span>
                    <span className="text-[11px] text-[var(--code-muted)]">
                      {workshop.number === 2 ? "local repo" : "python 3.11"}
                    </span>
                  </div>

                  <div className="p-5 space-y-2 leading-relaxed">
                    {workshop.number === 2 ? (
                      <>
                        <div className="text-[var(--code-secondary)]">
                          <span className="text-[#4CC38A] mr-2">$</span>git status
                        </div>
                        <div className="text-[var(--code-text)]">
                          On branch main
                          <br />
                          Your branch is up to date with &apos;origin/main&apos;.
                        </div>
                        <div className="text-[var(--code-secondary)] pt-2">
                          <span className="text-[#4CC38A] mr-2">$</span>git switch -c feature/portfolio
                        </div>
                        <div className="text-[#4CC38A]">
                          Switched to a new branch &apos;feature/portfolio&apos;
                        </div>
                        <div className="text-[var(--code-secondary)] pt-2">
                          <span className="text-[#4CC38A] mr-2">$</span>git commit -m &quot;feat: branch workflow&quot;
                        </div>
                        <div className="text-[var(--code-secondary)]">
                          [feature/portfolio a1b2c3d] feat: branch workflow
                          <br />2 files changed, 48 insertions(+)
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[var(--code-secondary)]">
                          <span className="text-[#4CC38A] mr-2">$</span>python3 inbox_guardian.py --inspect
                        </div>
                        <div className="text-[var(--code-text)]">
                          Message: &quot;URGENT: Claim your $500 gift card immediately!&quot;
                        </div>
                        <div className="pt-2 space-y-1 text-[var(--code-secondary)]">
                          <div>&gt; Normalized text: <span className="text-[#4CC38A]">ready</span></div>
                          <div>&gt; Matched triggers: <span className="text-[#FBBF24]">[&apos;urgent&apos;, &apos;gift card&apos;]</span></div>
                          <div>&gt; Uppercase share: <span className="text-[var(--code-text)] tabular-nums">28.5% (+15 pts)</span></div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[var(--code-border)] flex justify-between items-center">
                          <span className="text-[var(--code-secondary)] tabular-nums">
                            Score <span className="text-[var(--code-text)] font-medium ml-1">70 / 100</span>
                          </span>
                          <span className="rounded border border-[#E5484D]/30 bg-[#E5484D]/15 px-2 py-0.5 text-[11px] font-medium text-[#FCA5A5]">
                            Quarantine
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum List */}
          <section className="py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                  {workshop.chapters.length > 0
                    ? `${workshop.chapters.length}-chapter curriculum`
                    : "Curriculum syllabus"}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
                  {workshop.chapters.length > 0
                    ? "Step-by-step progression from core ideas to working implementation"
                    : "Modules for this track open after prerequisites"}
                </p>
              </div>
              <span className="text-xs font-mono tabular-nums text-[var(--text-muted)] shrink-0">
                {workshop.chapters.length > 0
                  ? `${workshop.chapters.length} chapters · ${workshop.durationMinutes} min`
                  : "Locked"}
              </span>
            </div>

            <CurriculumChapterList workshop={workshop} />
          </section>

          {/* Project Showcase (W1 or W2) */}
          {workshop.number === 1 && (
            <section className="py-12 border-t border-[var(--border-hairline)]">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1 max-w-2xl">
                    <p className="font-mono text-xs text-[var(--accent)] mb-2">
                      Capstone project
                    </p>

                    <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                      Inbox Guardian: rule-based message security scanner
                    </h2>

                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      Synthesize all eight chapters into a working command-line scanner that normalizes email text, matches suspicious keywords, scores structural heuristics, and outputs quarantine verdicts.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">01</span>
                        <span className="font-medium text-[var(--text-primary)]">Text normalization</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Apply .lower() and .strip() to handle inconsistent casing and whitespace.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">02</span>
                        <span className="font-medium text-[var(--text-primary)]">Keyword &amp; urgency scoring</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Check messages against financial lures, deadlines, and threat terms.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">03</span>
                        <span className="font-medium text-[var(--text-primary)]">Structural heuristics</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Measure uppercase ratio and punctuation density for an aggregate score.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">04</span>
                        <span className="font-medium text-[var(--text-primary)]">Batch reporting</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Classify inboxes into safe, flagged, or quarantine verdicts.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href="/projects/inbox-guardian"
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                      >
                        <span>Open Inbox Guardian workspace</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-xs">
                    <span className="font-mono text-xs text-[var(--text-muted)] block mb-3">
                      Python concepts applied
                    </span>
                    <ul className="space-y-2 text-[var(--text-secondary)]">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>String slicing &amp; normalization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Conditional branching (if / elif / else)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Iteration over message collections</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Structured dictionaries for scoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Modular functions with return contracts</span>
                      </li>
                    </ul>

                    <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-medium text-[var(--text-primary)] block mb-1">
                        Why rule-based heuristics
                      </span>
                      Explicit decision boundaries build the mental model before statistical models learn weights from data.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {workshop.number === 2 && (
            <section className="py-12 border-t border-[var(--border-hairline)]">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1 max-w-2xl">
                    <p className="font-mono text-xs text-[var(--accent)] mb-2">
                      Practical project
                    </p>

                    <h2 className="text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                      Git mastery portfolio: multi-branch repository
                    </h2>

                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      Build a clean repository on your computer: initialize Git, add a .gitignore, isolate features on dedicated branches, resolve merge conflicts, and push to GitHub with upstream tracking.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">01</span>
                        <span className="font-medium text-[var(--text-primary)]">Three-tree mental model</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Move edits cleanly between working tree, staging index, and object store.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">02</span>
                        <span className="font-medium text-[var(--text-primary)]">Feature branching</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Isolate experimental work on dedicated branches away from main.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">03</span>
                        <span className="font-medium text-[var(--text-primary)]">Conflict resolution</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Read conflict markers and merge divergent commit histories safely.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)]">
                        <span className="font-mono tabular-nums text-[var(--accent)] mr-1.5">04</span>
                        <span className="font-medium text-[var(--text-primary)]">GitHub remotes &amp; upstream</span>
                        <p className="mt-1 text-[var(--text-secondary)] leading-relaxed">
                          Attach remotes and push with git push -u origin main.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/workshops/${workshop.slug}/${workshop.chapters[0].slug}`}
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                      >
                        <span>Start Chapter 01: Local PC setup</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:w-80 shrink-0 p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-page)] text-xs">
                    <span className="font-mono text-xs text-[var(--text-muted)] block mb-3">
                      Git skills covered
                    </span>
                    <ul className="space-y-2 text-[var(--text-secondary)]">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Local CLI config (~/.gitconfig)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Repository setup &amp; .gitignore</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Atomic conventional commits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>Branching, merge &amp; cherry-pick</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>GitHub CLI auth &amp; remote sync</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Outcomes & Prerequisites */}
          <section className="py-12 border-t border-[var(--border-hairline)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                  <span>Measurable competencies</span>
                </h3>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {workshop.learningOutcomes.map((lo, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="font-mono tabular-nums text-[var(--accent)] shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{lo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                  <span>Prerequisites &amp; environment</span>
                </h3>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  {workshop.prerequisites.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0 mt-0.5" strokeWidth={1.5} />
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
