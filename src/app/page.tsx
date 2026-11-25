import React from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { BRANDING } from "@/lib/branding";
import { allWorkshops } from "@/content/workshops";

export default function HomePage() {
  const competencies = [
    {
      number: "01",
      title: "Python interpreter & execution",
      desc: "Understand how statements run top to bottom and how to read traceback errors.",
    },
    {
      number: "02",
      title: "Primitive types & casting",
      desc: "Work with str, int, float, and bool values, explicit casting, and f-strings.",
    },
    {
      number: "03",
      title: "Text analysis & normalization",
      desc: "Clean raw text with .strip(), .lower(), slicing, and substring checks.",
    },
    {
      number: "04",
      title: "Branching decision logic",
      desc: "Build mutually exclusive if-elif-else trees with boolean operators.",
    },
    {
      number: "05",
      title: "Automated repetition",
      desc: "Iterate across collections with for and while loops, range(), and break.",
    },
    {
      number: "06",
      title: "In-memory structured data",
      desc: "Store and query scan records as lists of dictionaries.",
    },
    {
      number: "07",
      title: "Modular function design",
      desc: "Split logic into testable functions with clear parameters and return values.",
    },
    {
      number: "08",
      title: "Rule-based security screening",
      desc: "Combine every concept into Inbox Guardian to score suspicious messages.",
    },
  ];

  const openWorkshops = allWorkshops.filter((w) => !w.isLocked && w.number <= 2);
  const lockedWorkshops = allWorkshops.filter((w) => Boolean(w.isLocked || w.number > 2));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />

      <main className="flex-1">
        {/* Hero: Workshop Series Overview */}
        <section className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  {BRANDING.organisationName} ({BRANDING.organisationShort})
                </p>

                <h1 className="mt-4 text-4xl sm:text-5xl font-medium tracking-[-0.025em] text-[var(--text-primary)] leading-[1.08]">
                  Python, Data Science &amp; Machine Learning{" "}
                  <span className="text-[var(--accent)]">Workshop Series</span>
                </h1>

                <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  A structured, hands-on engineering curriculum from {BRANDING.organisationShort}. Build programming fluency, version control discipline, and applied data science projects across consecutive workshops.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="#roadmap"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span>Explore workshops</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>

                  <Link
                    href="/projects"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors duration-150 ease-[var(--ease-out)]"
                  >
                    <span>Project catalogue</span>
                  </Link>
                </div>
              </div>

              {/* Hero Visual: Series Progression Index */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[var(--code-border)] bg-[var(--code-surface)] overflow-hidden font-mono text-xs text-[var(--code-text)] shadow-[0_12px_32px_rgba(24,20,23,0.10)]">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--code-border)] bg-[var(--code-chrome)]">
                    <span className="text-xs text-[var(--code-secondary)]">
                      curriculum-series
                    </span>
                    <span className="text-[11px] tabular-nums text-[var(--code-muted)]">
                      {allWorkshops.length} workshops · {openWorkshops.length} active
                    </span>
                  </div>

                  <div className="divide-y divide-[var(--code-border)]">
                    {allWorkshops.map((w) => {
                      const num = String(w.number).padStart(2, "0");
                      const locked = Boolean(w.isLocked || w.number > 2);
                      const label = locked
                        ? "Upcoming curriculum track"
                        : w.title.split(":")[0];
                      const meta = locked
                        ? "Locked"
                        : `${w.chapters.length} ch · ${w.durationMinutes}m`;

                      return (
                        <div
                          key={w.id}
                          className="flex items-center justify-between px-5 py-3.5 gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`tabular-nums shrink-0 ${
                                locked ? "text-[var(--code-muted)]" : "text-[#4CC38A]"
                              }`}
                            >
                              {num}
                            </span>
                            <span
                              className={`truncate ${
                                locked
                                  ? "text-[var(--code-muted)]"
                                  : "text-[var(--code-text)]"
                              }`}
                            >
                              {label}
                            </span>
                          </div>

                          <span
                            className={`tabular-nums text-[11px] shrink-0 ${
                              locked ? "text-[var(--code-muted)]" : "text-[var(--code-secondary)]"
                            }`}
                          >
                            {meta}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 py-3 border-t border-[var(--code-border)] bg-[var(--code-chrome)] flex items-center justify-between text-[11px] text-[var(--code-muted)]">
                    <span>In-browser Python + local Git workflows</span>
                    <span className="text-[var(--code-secondary)]">{BRANDING.organisationShort}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Series Roadmap */}
        <section id="roadmap" className="py-16 bg-[var(--bg-page)] border-b border-[var(--border-hairline)] scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <p className="font-mono text-xs text-[var(--accent)]">
                Curriculum tracks
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                Workshop series roadmap
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Start with Python foundations in the browser, then set up Git and GitHub on your machine.
              </p>
            </div>

            {/* Active Workshops (2-column primary row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openWorkshops.map((w) => {
                const formattedNum = String(w.number).padStart(2, "0");
                return (
                  <Link
                    key={w.id}
                    href={`/workshops/${w.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-border)] transition-colors duration-150 ease-[var(--ease-out)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tabular-nums text-[var(--accent)] font-medium">
                          Workshop {formattedNum}
                        </span>
                        <span className="rounded border border-[var(--positive-border)] bg-[var(--positive-tint)] px-2 py-0.5 text-xs font-medium text-[var(--positive)]">
                          Available
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
                        {w.title}
                      </h3>

                      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {w.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                      <span className="font-mono tabular-nums text-[var(--text-muted)]">
                        {w.chapters.length} chapters · {w.durationMinutes} min
                      </span>
                      <span className="font-medium text-[var(--accent)] inline-flex items-center gap-1.5">
                        <span>Open track</span>
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Locked Upcoming Tracks (compact 3-column row) */}
            {lockedWorkshops.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {lockedWorkshops.map((w) => {
                  const formattedNum = String(w.number).padStart(2, "0");
                  return (
                    <div
                      key={w.id}
                      className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-5 py-4"
                    >
                      <div>
                        <span className="font-mono text-xs tabular-nums text-[var(--text-muted)] block">
                          Workshop {formattedNum}
                        </span>
                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                          Upcoming track
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <Lock className="h-4 w-4" strokeWidth={1.5} />
                        <span>Locked</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Core Competencies: Editorial numbered index */}
        <section className="py-16 bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Workshop 01 objectives
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                Eight core competencies
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Each chapter builds one concrete capability toward the rule-based scanner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              {competencies.map((comp) => (
                <div
                  key={comp.number}
                  className="border-t border-[var(--border-hairline)] pt-4"
                >
                  <span className="font-mono text-xs tabular-nums text-[var(--accent)] font-medium block mb-2">
                    {comp.number}
                  </span>
                  <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capstone Workspace Banner */}
        <section className="py-16 bg-[var(--bg-page)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="font-mono text-xs text-[var(--accent)]">
                  Capstone project
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                  Inbox Guardian workspace
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Combine string normalization, conditional thresholds, loops, dictionaries, and functions to inspect simulated messages and output structured threat summaries.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/projects/inbox-guardian"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
                >
                  <span>Open workspace</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/workshops/python-foundations/introduction-to-python"
                  className="inline-flex h-11 items-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors duration-150"
                >
                  <span>Start Chapter 01</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
