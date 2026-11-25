"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  LogOut,
  Sliders,
  Presentation,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";
import { BRANDING } from "@/lib/branding";
import { FacilitatorWorkbench } from "@/components/facilitator/FacilitatorWorkbench";
import {
  getLearnerProgress,
  resetLearnerProgress,
  markChapterComplete,
} from "@/lib/storage/progress";
import { workshop1Python } from "@/content/workshops/workshop1-python";

interface AdminPortalGateProps {
  initialTab?: "facilitator" | "diagnostics";
}

const AUTH_STORAGE_KEY = "coe_admin_auth_session";
const VALID_PASSCODES = [
  "dsai2026",
  "coe-admin",
  "facilitator",
  (process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "").toLowerCase(),
].filter(Boolean);

export function AdminPortalGate({ initialTab = "facilitator" }: AdminPortalGateProps) {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"facilitator" | "diagnostics">(initialTab);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [diagnosticNotice, setDiagnosticNotice] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }

    const p = getLearnerProgress();
    setCompletedCount(Object.values(p.completedChapters).filter(Boolean).length);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim().toLowerCase();

    if (VALID_PASSCODES.includes(cleanPass)) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg("Invalid administrator security key. Check staff credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasscode("");
    setErrorMsg(null);
  };

  const handleResetProgress = () => {
    resetLearnerProgress();
    setCompletedCount(0);
    setDiagnosticNotice("Student progress reset to Chapter 01 baseline.");
    setTimeout(() => setDiagnosticNotice(null), 4000);
  };

  const handleUnlockAllChapters = () => {
    workshop1Python.chapters.forEach((ch) => {
      markChapterComplete(workshop1Python.slug, ch.slug);
    });
    setCompletedCount(workshop1Python.chapters.length);
    setDiagnosticNotice("All 8 Workshop 01 chapters marked complete.");
    setTimeout(() => setDiagnosticNotice(null), 4000);
  };

  if (!isClient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[var(--bg-page)]">
        <div className="w-full max-w-md rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8">
          <div className="flex flex-col items-center text-center">
            <OrganisationLogo variant="header" />

            <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] text-[var(--accent)]">
              <Lock className="h-4 w-4" strokeWidth={1.5} />
            </div>

            <p className="mt-4 font-mono text-xs text-[var(--accent)]">
              Staff access
            </p>

            <h1 className="mt-1 text-xl font-medium tracking-[-0.015em] text-[var(--text-primary)]">
              Facilitator &amp; admin portal
            </h1>

            <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Delivery notes, session pacing controls, and classroom diagnostics for instructors.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-medium text-[var(--text-primary)] mb-1.5"
              >
                Administrator key
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="Enter key"
                  autoComplete="current-password"
                  autoFocus
                  className="h-10 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label={showPasscode ? "Hide key" : "Show key"}
                >
                  {showPasscode ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-lg bg-[var(--negative-tint)] p-3 text-xs text-[var(--negative)] border border-[var(--negative-border)] flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="h-10 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
            >
              <Unlock className="h-4 w-4" strokeWidth={1.5} />
              <span>Unlock portal</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <Link
              href="/"
              className="hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              Back to platform
            </Link>
            <span className="font-mono text-xs">{BRANDING.organisationShort}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      {/* Staff Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--code-border)] bg-[var(--code-chrome)] text-[var(--code-text)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <OrganisationLogo variant="header" surface="dark" />
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded border border-[#4CC38A]/30 bg-[#4CC38A]/10 text-[#4CC38A]">
              Staff session
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("facilitator")}
              className={`inline-flex h-8 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors duration-150 ${
                activeTab === "facilitator"
                  ? "bg-[var(--code-text)] text-[var(--code-chrome)]"
                  : "text-[var(--code-secondary)] hover:text-[var(--code-text)] hover:bg-[var(--code-raised)]"
              }`}
            >
              <Presentation className="h-4 w-4" strokeWidth={1.5} />
              <span>Facilitator workbench</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("diagnostics")}
              className={`inline-flex h-8 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors duration-150 ${
                activeTab === "diagnostics"
                  ? "bg-[var(--code-text)] text-[var(--code-chrome)]"
                  : "text-[var(--code-secondary)] hover:text-[var(--code-text)] hover:bg-[var(--code-raised)]"
              }`}
            >
              <Sliders className="h-4 w-4" strokeWidth={1.5} />
              <span>Diagnostics</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[var(--code-secondary)] hover:text-[var(--code-text)] transition-colors duration-150 hidden md:inline"
            >
              Public site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--code-border)] bg-[var(--code-raised)] px-3 text-xs font-medium text-[#FCA5A5] hover:bg-[#E5484D]/15 transition-colors duration-150"
              title="Lock portal"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activeTab === "facilitator" ? (
          <FacilitatorWorkbench />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-xs font-mono text-[var(--accent)]">
                Diagnostics
              </p>
              <h2 className="mt-1 text-2xl font-medium tracking-[-0.02em] text-[var(--text-primary)]">
                Classroom &amp; lab controls
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Manage local testing state and inspect track availability on this machine
              </p>
            </div>

            {diagnosticNotice && (
              <div className="mb-6 rounded-xl bg-[var(--positive-tint)] p-4 border border-[var(--positive-border)] text-xs font-medium text-[var(--positive)] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>{diagnosticNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-[var(--accent)]">Local storage</span>
                    <span className="text-[var(--text-muted)]">Browser</span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--text-primary)]">
                    Student progress
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed font-mono tabular-nums">
                    Completed on this terminal: <strong className="font-medium text-[var(--text-primary)]">{completedCount} of 8</strong> Workshop 01 chapters
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleResetProgress}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-raised)]"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-[var(--text-muted)]" strokeWidth={1.5} />
                    <span>Reset to 0</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleUnlockAllChapters}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 text-xs font-medium text-white hover:bg-[var(--accent-hover)]"
                  >
                    <span>Mark all 8 complete</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-[var(--accent)]">Track status</span>
                    <span className="text-[var(--positive)]">2 active</span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--text-primary)]">
                    Curriculum tracks
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
                    <li className="flex items-center justify-between">
                      <span>01. Python Foundations</span>
                      <span className="font-mono text-[var(--positive)]">Browser</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>02. Git &amp; GitHub</span>
                      <span className="font-mono text-[var(--positive)]">Local PC</span>
                    </li>
                    <li className="flex items-center justify-between text-[var(--text-muted)]">
                      <span>03–05. Advanced tracks</span>
                      <span className="font-mono">Locked</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] text-xs">
                  <Link
                    href="/workshops/git-github"
                    className="font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Inspect Workshop 02</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-[var(--accent)]">Pacing</span>
                    <span className="text-[var(--text-muted)] tabular-nums">120 min</span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--text-primary)]">
                    Session delivery
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                    Workshop 01 runs across nine timed segments ending with the Inbox Guardian capstone.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("facilitator")}
                    className="font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Open facilitator timer</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
