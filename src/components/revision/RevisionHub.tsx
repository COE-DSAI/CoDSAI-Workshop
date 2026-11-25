"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Code2,
  AlertTriangle,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  getAllGlossaryTerms,
  getAllSyntaxReferences,
  getAllCommonMistakes,
  searchCurriculum,
  SearchResult,
} from "@/content/workshops";
import { workshop1Python } from "@/content/workshops/workshop1-python";

export function RevisionHub() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");

  const [selectedTab, setSelectedTab] = useState<{ urlTab: string | null; tab: string }>({
    urlTab,
    tab: urlTab || "summaries",
  });
  const activeTab = selectedTab.urlTab === urlTab ? selectedTab.tab : urlTab || "summaries";
  const setActiveTab = (tab: string) => setSelectedTab({ urlTab, tab });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [glossaryFilter, setGlossaryFilter] = useState<string>("");

  const allGlossary = getAllGlossaryTerms();
  const allSyntax = getAllSyntaxReferences();
  const allMistakes = getAllCommonMistakes();

  const searchResults: SearchResult[] = useMemo(() => {
    if (searchQuery.trim().length >= 2) {
      return searchCurriculum(searchQuery);
    }
    return [];
  }, [searchQuery]);

  const filteredGlossary = allGlossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryFilter.toLowerCase())
  );

  const tabs = [
    { id: "summaries", label: "Chapter summaries", icon: Layers },
    { id: "search", label: "Search", icon: Search },
    { id: "syntax", label: "Syntax reference", icon: Code2 },
    { id: "glossary", label: `Glossary (${allGlossary.length})`, icon: BookOpen },
    { id: "mistakes", label: "Common errors", icon: AlertTriangle },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors duration-150">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/workshops/python-foundations"
          className="hover:text-[var(--text-primary)] transition-colors duration-150 font-mono tabular-nums"
        >
          Workshop 01
        </Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">Revision</span>
      </nav>

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[var(--border-hairline)]">
        <p className="text-xs font-mono text-[var(--accent)] mb-2">
          Reference handbook
        </p>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
          Python foundations revision hub
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Chapter summaries, syntax cards, glossary definitions, common debugging pitfalls, and full-text curriculum search
        </p>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-xs font-medium transition-colors duration-150 ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Chapter Summaries */}
      {activeTab === "summaries" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshop1Python.chapters.map((ch) => (
            <div
              key={ch.id}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3 mb-3 text-xs font-mono tabular-nums">
                  <span className="font-medium text-[var(--accent)]">
                    Chapter {String(ch.number).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--text-muted)]">{ch.estimatedMinutes} min</span>
                </div>

                <h3 className="text-base font-medium text-[var(--text-primary)] mb-2">
                  {ch.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {ch.introduction}
                </p>

                {ch.recap && (
                  <div className="mb-4">
                    <span className="text-xs font-medium text-[var(--text-muted)] block mb-2">
                      Takeaways
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                      {ch.recap.keyConcepts.slice(0, 3).map((kc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono tabular-nums text-[var(--accent)] shrink-0">
                            {idx + 1}.
                          </span>
                          <span>{kc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
                <span className="font-mono tabular-nums text-[var(--text-muted)]">
                  {ch.sections.length} sections · {ch.exercises.length} exercises
                </span>
                <Link
                  href={`/workshops/${workshop1Python.slug}/${ch.slug}`}
                  className="font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Read lesson</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Search */}
      {activeTab === "search" && (
        <div className="space-y-6">
          <div className="max-w-xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-muted)]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search syntax, concepts, or errors"
                className="h-9 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] pl-10 pr-4 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                autoFocus
              />
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Try &quot;input&quot;, &quot;for loop&quot;, &quot;dictionary&quot;, &quot;f-string&quot;, or &quot;git reset&quot;
            </p>
          </div>

          {searchQuery.trim().length >= 2 && (
            <div className="space-y-4">
              <span className="text-xs font-mono tabular-nums text-[var(--text-secondary)] block">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
              </span>

              {searchResults.length === 0 ? (
                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 text-center text-xs text-[var(--text-muted)]">
                  No matching lessons or syntax found
                </div>
              ) : (
                <div className="divide-y divide-[var(--border-hairline)] rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
                  {searchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      href={`/workshops/${res.workshopSlug}/${res.chapterSlug}`}
                      className="block p-4 hover:bg-[var(--bg-raised)] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 text-[11px] font-mono font-medium text-[var(--accent)]">
                          {res.type}
                        </span>
                        <h4 className="text-xs font-medium text-[var(--text-primary)]">
                          {res.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {res.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Syntax Reference */}
      {activeTab === "syntax" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allSyntax.map((syn, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {syn.chapterTitle}
                </span>
                <Link
                  href={`/workshops/${syn.workshopSlug}/${syn.chapterSlug}`}
                  className="text-xs font-mono text-[var(--accent)] hover:underline"
                >
                  Open lesson
                </Link>
              </div>
              <code className="block rounded-lg bg-[var(--code-surface)] p-3 font-mono text-xs text-[var(--code-text)] mb-2 border border-[var(--code-border)]">
                {syn.syntax}
              </code>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {syn.description}
              </p>
              {syn.example && (
                <pre className="mt-2 rounded-lg bg-[var(--bg-page)] p-3 font-mono text-xs text-[var(--text-primary)] border border-[var(--border-hairline)] overflow-x-auto">
                  {syn.example}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Glossary */}
      {activeTab === "glossary" && (
        <div className="space-y-6">
          <div className="max-w-md">
            <input
              type="text"
              value={glossaryFilter}
              onChange={(e) => setGlossaryFilter(e.target.value)}
              placeholder="Filter terms"
              className="h-9 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
              >
                <h4 className="font-mono text-xs font-medium text-[var(--accent)] mb-1">
                  {item.term}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                  {item.definition}
                </p>
                {item.context && (
                  <p className="text-xs text-[var(--text-muted)]">
                    Context: {item.context}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Common Mistakes */}
      {activeTab === "mistakes" && (
        <div className="space-y-4">
          {allMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[var(--warning)] shrink-0" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {mistake.title}
                  </h3>
                </div>
                <Link
                  href={`/workshops/${mistake.workshopSlug}/${mistake.chapterSlug}`}
                  className="text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  {mistake.chapterTitle}
                </Link>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line mt-2">
                {mistake.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
