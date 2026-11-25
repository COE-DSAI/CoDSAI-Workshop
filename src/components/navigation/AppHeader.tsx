"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/revision?tab=search");
      } else if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        router.push("/revision?tab=search");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const navLinks = [
    { href: "/workshops/python-foundations", label: "Python" },
    { href: "/workshops/git-github", label: "Git & GitHub" },
    { href: "/projects/inbox-guardian", label: "Inbox Guardian" },
    { href: "/revision", label: "Revision" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/workshops/git-github") return pathname.startsWith("/workshops/git-github");
    if (href === "/workshops/python-foundations") {
      return (
        pathname.startsWith("/workshops") &&
        !pathname.startsWith("/workshops/git-github")
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <BrandHeader />

          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-16 items-center transition-colors duration-150 ease-[var(--ease-out)] ${
                    active
                      ? "text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {completedCount > 0 && (
            <Link
              href="/learn"
              className="text-xs font-mono tabular-nums text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150 hidden xl:inline"
              title="Workshop progress"
            >
              {completedCount}/13 done
            </Link>
          )}

          <Link
            href="/revision?tab=search"
            className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-3 text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors duration-150 ease-[var(--ease-out)]"
            title="Search curriculum (⌘K)"
          >
            <Search className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
            <span>Search</span>
            <kbd className="rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-1.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)]">
              ⌘K
            </kbd>
          </Link>

          <Link
            href="/workshops/python-foundations/introduction-to-python"
            className="flex h-9 items-center justify-center rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Start learning
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/revision?tab=search"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-raised)]"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex h-10 items-center justify-between rounded-lg px-3 text-sm transition-colors duration-150 ${
                    active
                      ? "bg-[var(--bg-raised)] text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-[var(--border-hairline)]">
              <Link
                href="/workshops/python-foundations/introduction-to-python"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
              >
                Start learning
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
