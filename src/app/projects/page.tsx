import React from "react";
import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";

export default function ProjectsCataloguePage() {
  const activeProjects = [
    {
      id: "inbox-guardian",
      workshopNum: "01",
      workshopLabel: "Workshop 01: Python Foundations",
      title: "Inbox Guardian — personal message scanner",
      slug: "/projects/inbox-guardian",
      description:
        "A rule-based email and message scanner built with string normalization, conditionals, lists of dictionaries, and modular Python functions.",
      technologies: ["Python 3", "Rule heuristics", "CLI menu", "Dictionaries"],
      difficulty: "Beginner",
    },
    {
      id: "git-collaboration",
      workshopNum: "02",
      workshopLabel: "Workshop 02: Git & GitHub",
      title: "Multi-branch Git & GitHub repository",
      slug: "/workshops/git-github",
      description:
        "A local and remote repository workflow covering git init, staging, branching, resets, cherry-pick, and GitHub CLI authentication.",
      technologies: ["Git", "GitHub CLI", "Branching", "Conflict resolution"],
      difficulty: "Beginner",
    },
  ];

  const upcomingTracks = [
    { workshopNum: "03", title: "NumPy & Pandas wrangling pipeline" },
    { workshopNum: "04", title: "Statistical EDA & data visualisation" },
    { workshopNum: "05", title: "Supervised ML & model evaluation" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[var(--border-hairline)] pb-6 mb-8">
            <p className="text-xs font-mono text-[var(--accent)]">
              Practical builds
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
              Project &amp; capstone catalogue
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Each workshop ends with a hands-on engineering artifact built from the concepts covered in that track.
            </p>
          </div>

          {/* Active Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-border)] transition-colors duration-150"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="tabular-nums text-[var(--accent)] font-medium">
                      Workshop {project.workshopNum}
                    </span>
                    <span className="rounded border border-[var(--positive-border)] bg-[var(--positive-tint)] px-2 py-0.5 text-[11px] text-[var(--positive)]">
                      {project.difficulty}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-medium text-[var(--text-primary)] leading-snug">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-2 py-0.5 text-[11px] font-mono text-[var(--text-secondary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
                  <Link
                    href={project.slug}
                    className="inline-flex items-center justify-between w-full text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    <span>Open project</span>
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Locked Tracks */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-[var(--text-muted)] mb-3">
              Upcoming workshop projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {upcomingTracks.map((track) => (
                <div
                  key={track.workshopNum}
                  className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-5 py-4"
                >
                  <div className="min-w-0 pr-3">
                    <span className="font-mono text-xs tabular-nums text-[var(--text-muted)] block">
                      Workshop {track.workshopNum}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-secondary)] truncate block mt-0.5">
                      {track.title}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] shrink-0">
                    <Lock className="h-4 w-4" strokeWidth={1.5} />
                    <span>Locked</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
