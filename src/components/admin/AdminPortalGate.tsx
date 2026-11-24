"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  LogOut,
  Sliders,
  Presentation,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";
import { BRANDING } from "@/lib/branding";
import { FacilitatorWorkbench } from "@/components/facilitator/FacilitatorWorkbench";
import { getLearnerProgress, resetLearnerProgress, markChapterComplete } from "@/lib/storage/progress";
import { workshop1Python } from "@/content/workshops/workshop1-python";

interface AdminPortalGateProps {
  initialTab?: "facilitator" | "diagnostics";
}

const AUTH_STORAGE_KEY = "coe_admin_auth_session";
// Default passcode for staff/instructors: "dsai2026"
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
      setErrorMsg("Invalid administrator security key. Please check your staff credentials.");
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
    setDiagnosticNotice("Student progress reset to Chapter 1 baseline.");
    setTimeout(() => setDiagnosticNotice(null), 4000);
  };

  const handleUnlockAllChapters = () => {
    workshop1Python.chapters.forEach((ch) => {
      markChapterComplete(workshop1Python.slug, ch.slug);
    });
    setCompletedCount(workshop1Python.chapters.length);
    setDiagnosticNotice("All 8 Workshop 1 chapters marked as completed.");
    setTimeout(() => setDiagnosticNotice(null), 4000);
  };

  // Prevent hydration flash
  if (!isClient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#541F4A] border-t-transparent" />
      </div>
    );
  }

  // 1. Gated Portal Login (Restricted from public students)
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col items-center text-center">
            <OrganisationLogo variant="header" />

            <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#541F4A]/10 text-[#541F4A]">
              <Lock className="h-6 w-6" />
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-slate-700">
              <ShieldAlert className="h-3.5 w-3.5 text-[#541F4A]" />
              <span>Restricted Staff Portal</span>
            </div>

            <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
              Facilitator &amp; Admin Gate
            </h1>

            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs">
              This area contains instructor delivery notes, live lesson checkpoints, and session pacing controls. Student access is restricted.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Administrator Security Key
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
                  placeholder="Enter security key..."
                  autoComplete="current-password"
                  autoFocus
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 shadow-2xs focus:border-[#541F4A] focus:outline-none focus:ring-1 focus:ring-[#541F4A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label={showPasscode ? "Hide security key" : "Show security key"}
                >
                  {showPasscode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-md bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200 flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#541F4A] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#3E1536] transition-colors"
            >
              <Unlock className="h-4 w-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span>← Back to Student Platform</span>
            </Link>
            <span className="font-mono text-[10px] text-slate-400">
              {BRANDING.organisationShort}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Portal Console
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      {/* Top Staff Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#1E0F1B] text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <OrganisationLogo variant="header" surface="dark" />
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Staff Portal Active
            </span>
          </div>

          {/* Portal Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("facilitator")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "facilitator"
                  ? "bg-white text-[#541F4A]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Presentation className="h-3.5 w-3.5" />
              <span>Facilitator Workbench</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("diagnostics")}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === "diagnostics"
                  ? "bg-white text-[#541F4A]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Classroom Diagnostics</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white transition-colors hidden md:inline"
            >
              Public Site →
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
              title="Lock Admin Portal & Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Lock Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Portal Work Area */}
      <main className="flex-1">
        {activeTab === "facilitator" ? (
          <FacilitatorWorkbench />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                ADMINISTRATOR TOOLS &amp; DIAGNOSTICS
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Classroom Cohort &amp; Laboratory Controls
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage local testing state, reset progress cache for lab machines, and preview curriculum unlocks.
              </p>
            </div>

            {diagnosticNotice && (
              <div className="mb-6 rounded-lg bg-emerald-50 p-4 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{diagnosticNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Machine Progress State */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#541F4A]">
                      LOCAL STORAGE STATE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
                      Browser Cache
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Student Progress Metric
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Active completion count on this terminal: <strong className="text-slate-900">{completedCount} of 8 chapters</strong>.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleResetProgress}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                    <span>Reset Progress to 0</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleUnlockAllChapters}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#541F4A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3E1536]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Mark All 8 Complete</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Workshop Curriculum Tracks */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#541F4A]">
                      TRACK STATUS
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                      2 Tracks Open
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Workshop Status
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center justify-between">
                      <span>Workshop 01: Python Foundations</span>
                      <span className="font-semibold text-emerald-600">Live (In-Browser)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Workshop 02: Git &amp; GitHub</span>
                      <span className="font-semibold text-emerald-600">Drafted (Local PC)</span>
                    </li>
                    <li className="flex items-center justify-between text-slate-400">
                      <span>Workshops 03, 04, 05</span>
                      <span className="font-semibold text-slate-400">Locked</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    href="/workshops/git-github"
                    className="font-semibold text-[#541F4A] hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Workshop 02</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Session Delivery Pacing */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#541F4A]">
                      PACING GUIDE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-semibold text-blue-700">
                      Standard: 120m
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Pedagogical Pacing
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Workshop 1 is calibrated for 120 minutes with 8 distinct minute-by-minute phases ending in the Inbox Guardian capstone.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("facilitator")}
                    className="font-semibold text-[#541F4A] hover:underline flex items-center gap-1"
                  >
                    <span>Launch 120m Timer in Facilitator Tab</span>
                    <ArrowRight className="h-3 w-3" />
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
