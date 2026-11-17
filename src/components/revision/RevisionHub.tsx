"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Code2,
  AlertTriangle,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  getAllGlossaryTerms,
  getAllSyntaxReferences,
  getAllCommonMistakes,
  searchCurriculum,
  SearchResult,
  getAllWorkshops,
} from "@/content/workshops";
import { getLearnerProgress } from "@/lib/storage/progress";

export function RevisionHub() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "search";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [glossaryFilter, setGlossaryFilter] = useState<string>("");
  const [syntaxFilter, setSyntaxFilter] = useState<string>("all");
  const [bookmarkedList, setBookmarkedList] = useState<readonly string[]>([]);

  const allGlossary = getAllGlossaryTerms();
  const allSyntax = getAllSyntaxReferences();
  const allMistakes = getAllCommonMistakes();
  const workshops = getAllWorkshops();

  useEffect(() => {
    const progress = getLearnerProgress();
    setBookmarkedList(progress.bookmarkedSections || []);
  }, []);

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

  const filteredSyntax =
    syntaxFilter === "all"
      ? allSyntax
      : allSyntax.filter((s) => s.workshopSlug === syntaxFilter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs mb-8">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
          Knowledge Base & Handbook
        </span>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          Curriculum Revision Hub & Reference Library
        </h1>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Comprehensive search across all 10 workshops, complete A-Z terminology glossary, syntax cheat sheets, common mistakes catalog, and saved notes. A permanent reference for your data science journey.
        </p>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          <button
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "search"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            Global Search
          </button>
          <button
            onClick={() => setActiveTab("glossary")}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "glossary"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Glossary ({allGlossary.length})
          </button>
          <button
            onClick={() => setActiveTab("syntax")}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "syntax"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            Syntax Cheat Sheets
          </button>
          <button
            onClick={() => setActiveTab("mistakes")}
            className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "mistakes"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Common Mistakes Catalog
          </button>
        </div>
      </div>

      {/* Tab 1: Global Search */}
      {activeTab === "search" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-xs">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 10 workshops: e.g. 'dictionary', 'confusion matrix', 'git commit', 'train_test_split'..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
              />
            </div>
            {searchQuery && searchResults.length === 0 && searchQuery.length >= 2 && (
              <p className="mt-3 text-xs text-slate-500 italic">
                No matching topics found for &quot;{searchQuery}&quot;. Try terms like &apos;regression&apos;, &apos;strings&apos;, or &apos;pandas&apos;.
              </p>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Found {searchResults.length} Results
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.map((res, i) => (
                  <Link
                    key={i}
                    href={`/workshops/${res.workshopSlug}/${res.chapterSlug}`}
                    className="group rounded-lg border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-blue-400 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {res.workshopTitle}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase font-mono text-slate-500">
                        {res.type}
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {res.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && !searchQuery && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              <Search className="mx-auto h-8 w-8 text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-700">Search the entire workshop library</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Instant search covers all 79 chapter explanations, code walkthroughs, syntax references, and glossary definitions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Glossary */}
      {activeTab === "glossary" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-xs">
            <input
              type="text"
              value={glossaryFilter}
              onChange={(e) => setGlossaryFilter(e.target.value)}
              placeholder="Filter terms: e.g. 'broadcasting', 'precision', 'overfitting'..."
              className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                    {item.term}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.definition}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[180px]">{item.chapterTitle}</span>
                  <Link
                    href={`/workshops/${item.workshopSlug}/${item.chapterSlug}`}
                    className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                  >
                    View <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Syntax Cheat Sheets */}
      {activeTab === "syntax" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSyntaxFilter("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                syntaxFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Topics
            </button>
            {workshops.map((w) => (
              <button
                key={w.id}
                onClick={() => setSyntaxFilter(w.slug)}
                className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  syntaxFilter === w.slug
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {w.title.split(":")[0]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSyntax.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {item.workshopTitle}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.chapterTitle}</span>
                </div>
                <pre className="rounded bg-slate-900 p-2.5 font-mono text-xs font-semibold text-blue-300 overflow-x-auto">
                  {item.syntax}
                </pre>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                {item.example && (
                  <div className="mt-2 text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
                    Example: {item.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Common Mistakes Catalog */}
      {activeTab === "mistakes" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            A curated index of the most common beginner traps, indentation bugs, and data leakage mistakes across all 10 workshops.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-300 bg-amber-50/70 p-4 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {mistake.workshopTitle}
                  </span>
                  <Link
                    href={`/workshops/${mistake.workshopSlug}/${mistake.chapterSlug}`}
                    className="text-[10px] font-semibold text-blue-700 hover:underline"
                  >
                    Go to Lesson
                  </Link>
                </div>
                <h3 className="text-xs font-bold text-amber-950 mb-1">{mistake.title}</h3>
                <p className="text-xs leading-relaxed text-amber-900">{mistake.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
