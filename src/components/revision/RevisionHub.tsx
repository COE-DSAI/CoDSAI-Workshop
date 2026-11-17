"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Code2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ChevronRight,
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
  const initialTab = searchParams.get("tab") || "summaries";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [glossaryFilter, setGlossaryFilter] = useState<string>("");

  const allGlossary = getAllGlossaryTerms();
  const allSyntax = getAllSyntaxReferences();
  const allMistakes = getAllCommonMistakes();

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchResults(searchCurriculum(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const filteredGlossary = allGlossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryFilter.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Subtle Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-800 transition-colors">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/workshops/python-foundations" className="hover:text-slate-800 transition-colors">
          Workshop 01
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium">Revision Hub</span>
      </nav>

      {/* Hero Header */}
      <div className="mb-8 pb-6 border-b border-slate-200/80">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold block mb-2">
          WORKSHOP 01 REFERENCE HANDBOOK
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
          Python Foundations Revision Hub
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Self-contained study resources for Workshop 1: chapter summaries, Python syntax reference, searchable glossary, common beginner errors, and full-text search across all 8 chapters.
        </p>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("summaries")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "summaries"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Chapter Summaries</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "search"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search Lessons</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("syntax")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "syntax"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Syntax Reference</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("glossary")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "glossary"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Glossary ({allGlossary.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mistakes")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "mistakes"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Common Errors &amp; Fixes</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Chapter Summaries */}
      {activeTab === "summaries" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshop1Python.chapters.map((ch) => (
              <div
                key={ch.id}
                className="rounded-lg border border-slate-200/80 bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 font-mono">
                      Chapter {String(ch.number).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {ch.estimatedMinutes} mins
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    {ch.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {ch.introduction}
                  </p>

                  {ch.recap && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                        Core Takeaways:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {ch.recap.keyConcepts.slice(0, 3).map((kc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span>{kc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {ch.sections.length} Sections • {ch.exercises.length} Exercises
                  </span>
                  <Link
                    href={`/workshops/${workshop1Python.slug}/${ch.slug}`}
                    className="font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Full-Text Curriculum Search */}
      {activeTab === "search" && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Python syntax, statements, error types, concepts..."
                className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoFocus
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Try searching for &quot;input&quot;, &quot;for loop&quot;, &quot;dictionary&quot;, &quot;syntax error&quot;, &quot;f-string&quot; or &quot;strip&quot;.
            </p>
          </div>

          {searchQuery.trim().length >= 2 && (
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-700 block">
                Found {searchResults.length} match{searchResults.length !== 1 ? "es" : ""} for &quot;{searchQuery}&quot;
              </span>

              {searchResults.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
                  No matching lessons or syntax found. Try broader keywords.
                </div>
              ) : (
                <div className="divide-y divide-slate-200/80 rounded-lg border border-slate-200/80 bg-white">
                  {searchResults.map((res, idx) => (
                    <Link
                      key={idx}
                      href={`/workshops/${res.workshopSlug}/${res.chapterSlug}`}
                      className="block p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase text-blue-800">
                          {res.type}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-900 hover:text-blue-600">
                          {res.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
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

      {/* Tab 3: Python Syntax Reference */}
      {activeTab === "syntax" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSyntax.map((syn, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/80 bg-white p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {syn.chapterTitle}
                  </span>
                  <Link
                    href={`/workshops/${syn.workshopSlug}/${syn.chapterSlug}`}
                    className="text-[10px] font-mono text-blue-600 hover:underline"
                  >
                    Open Lesson →
                  </Link>
                </div>
                <code className="block rounded bg-slate-900 p-2 font-mono text-xs text-blue-400 mb-2 border border-slate-800">
                  {syn.syntax}
                </code>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {syn.description}
                </p>
                {syn.example && (
                  <pre className="mt-2 rounded bg-slate-50 p-2 font-mono text-[11px] text-slate-700 border border-slate-200">
                    {syn.example}
                  </pre>
                )}
              </div>
            ))}
          </div>
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
              placeholder="Filter glossary terms..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/80 bg-white p-4"
              >
                <h4 className="font-mono text-xs font-bold text-slate-900 mb-1">
                  {item.term}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {item.definition}
                </p>
                {item.context && (
                  <p className="text-[11px] text-slate-400 italic">
                    Context: {item.context}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Common Mistakes & Debugging */}
      {activeTab === "mistakes" && (
        <div className="space-y-6">
          <div className="space-y-4">
            {allMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/80 bg-white p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <h3 className="text-sm font-semibold text-slate-900">
                      {mistake.title}
                    </h3>
                  </div>
                  <Link
                    href={`/workshops/${mistake.workshopSlug}/${mistake.chapterSlug}`}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Ch: {mistake.chapterTitle} →
                  </Link>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mt-2">
                  {mistake.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
