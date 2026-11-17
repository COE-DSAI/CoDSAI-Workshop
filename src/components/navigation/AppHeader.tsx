"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FolderGit2,
  FileCheck2,
  Presentation,
  Search,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { BrandHeader } from "@/components/branding/BrandHeader";
import { getLearnerProgress } from "@/lib/storage/progress";

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const p = getLearnerProgress();
      const count = Object.values(p.completedChapters).filter(Boolean).length;
      setCompletedCount(count);
    };

    updateProgress();
    window.addEventListener("coe_progress_updated", updateProgress);
    return () => window.removeEventListener("coe_progress_updated", updateProgress);
  }, []);

  const navLinks = [
    { href: "/workshops/python-foundations", label: "Workshop 1 Curriculum", icon: BookOpen },
    { href: "/projects/inbox-guardian", label: "Inbox Guardian Capstone", icon: FolderGit2 },
    { href: "/revision", label: "Revision Hub", icon: FileCheck2 },
    { href: "/facilitator", label: "Facilitator", icon: Presentation },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <BrandHeader />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-blue-600" : "text-slate-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/revision?tab=search"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500 hover:border-slate-300 hover:bg-white transition-colors"
            title="Search Python syntax, concepts & glossary"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search Curriculum</span>
            <kbd className="rounded border border-slate-200 bg-white px-1 text-[10px] text-slate-400 font-mono">
              /
            </kbd>
          </Link>

          {completedCount > 0 && (
            <Link
              href="/revision"
              className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>{completedCount}/8 Done</span>
            </Link>
          )}

          <Link
            href="/workshops/python-foundations/introduction-to-python"
            className="rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/workshops/python-foundations/introduction-to-python"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-700"
              >
                Start Workshop 1
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
