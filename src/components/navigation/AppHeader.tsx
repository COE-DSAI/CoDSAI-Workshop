"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { BrandHeader } from "@/components/branding/BrandHeader";
import { getLearnerProgress } from "@/lib/storage/progress";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
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

  // Keyboard shortcut for search (⌘K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/revision?tab=search");
      } else if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        router.push("/revision?tab=search");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const navLinks = [
    { href: "/workshops/python-foundations", label: "Curriculum" },
    { href: "/projects/inbox-guardian", label: "Inbox Guardian" },
    { href: "/revision", label: "Revision" },
    { href: "/facilitator", label: "Facilitator" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/workshops")) return pathname.startsWith("/workshops");
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Organization Logo & Identity */}
        <div className="flex items-center">
          <BrandHeader />
        </div>

        {/* Center / Right: Clean Text Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  active
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Far Right: Compact Search & Start Learning Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/revision?tab=search"
            className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-slate-50/70 px-2.5 text-xs text-slate-500 hover:border-slate-300 hover:bg-white transition-colors"
            title="Search curriculum (⌘K or /)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden lg:inline text-slate-500">Search syntax & topics</span>
            <span className="lg:hidden text-slate-500">Search</span>
            <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] text-slate-400 font-mono">
              ⌘K
            </kbd>
          </Link>

          {completedCount > 0 && (
            <Link
              href="/revision"
              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors hidden xl:inline"
              title="Workshop 1 Completion Status"
            >
              <span className="text-emerald-700 font-semibold">{completedCount}/8</span> completed
            </Link>
          )}

          <Link
            href="/workshops/python-foundations/introduction-to-python"
            className="flex h-8.5 items-center justify-center rounded-md bg-blue-600 px-3.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/revision?tab=search"
            className="p-2 text-slate-500 hover:text-slate-800"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-5 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/workshops/python-foundations/introduction-to-python"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-blue-700"
              >
                Start Learning (Chapter 1)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
