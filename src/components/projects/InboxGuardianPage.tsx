"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Code2,
  Copy,
  Check,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { CodeEditor } from "@/components/editor/CodeEditor";

export function InboxGuardianPage() {
  const [activeMilestone, setActiveMilestone] = useState<number>(1);
  const [copiedSolution, setCopiedSolution] = useState<boolean>(false);

  const starterScaffoldCode = `# ==============================================================================
# CENTER OF EXCELLENCE: DATA SCIENCE & ARTIFICIAL INTELLIGENCE
# Workshop 1 Capstone Project: INBOX GUARDIAN
# Personal Rule-Based Message Security Scanner
# ==============================================================================

# Default suspicious indicator keywords
KEYWORDS = ["free", "click here", "urgent", "prize", "account suspended", "verify"]

# Sample simulated inbox messages for batch scanning
SAMPLE_INBOX = [
    "Reminder: The Data Science workshop begins at 10 AM in Lab 3.",
    "URGENT: Your account has been suspended! Click here to verify credentials.",
    "Congratulations! You won a free prize. Claim your reward now.",
    "Can you please review the attached draft when you have a moment?"
]

# Global or in-memory history log (list of dictionaries)
scan_history = []


def analyse_message(text, keywords):
    """
    Milestone 1 & 2:
    Takes text and keyword list.
    Returns a dictionary containing:
      - 'text': original message
      - 'matched': list of matched keywords (case-insensitive)
      - 'count': total number of matched keywords
      - 'status': 'SAFE', 'POTENTIALLY SUSPICIOUS', or 'HIGH RISK'
      - 'recommendation': safety guidance
    """
    cleaned = text.lower()
    matched = []
    for kw in keywords:
        if kw in cleaned:
            matched.append(kw)
            
    count = len(matched)
    if count == 0:
        status = "SAFE"
        recommendation = "No suspicious keywords detected. Message appears benign."
    elif count <= 2:
        status = "POTENTIALLY SUSPICIOUS"
        recommendation = "Exercise caution. Verify the sender independently before clicking links."
    else:
        status = "HIGH RISK"
        recommendation = "High probability of threat. Do not provide passwords, credentials, or click links."
        
    return {
        "text": text,
        "matched": matched,
        "count": count,
        "status": status,
        "recommendation": recommendation
    }


def scan_sample_inbox(inbox, keywords, history):
    """
    Milestone 3:
    Iterates through the sample inbox list, analyses each message,
    logs results into history, and prints a formatted scan report.
    """
    print("\\n--- BATCH SCANNING SAMPLE INBOX ---")
    for i, msg in enumerate(inbox, start=1):
        result = analyse_message(msg, keywords)
        history.append(result)
        print(f"[{i}] Status: {result['status']} | Matches: {result['count']} | Text: {msg[:45]}...")
    print(f"Batch complete. Scanned {len(inbox)} messages.\\n")


def display_history(history):
    """
    Milestone 4:
    Displays all logged scans stored in the history list of dictionaries.
    """
    if not history:
        print("\\nNo messages have been scanned yet.\\n")
        return

    print("\\n================ SCAN HISTORY ================")
    for i, item in enumerate(history, start=1):
        print(f"Scan #{i}:")
        print(f"  Status: {item['status']}")
        print(f"  Matched ({item['count']}): {', '.join(item['matched']) if item['matched'] else 'None'}")
        print(f"  Recommendation: {item['recommendation']}")
        print("-" * 46)


def calculate_statistics(history):
    """
    Milestone 5:
    Computes total scanned, total threats, and threat percentage.
    """
    total = len(history)
    if total == 0:
        print("\\nNo scan statistics available. Please scan some messages first.\\n")
        return

    threats = 0
    for item in history:
        if item["status"] != "SAFE":
            threats += 1

    percentage = (threats / total) * 100
    print("\\n============= DETECTION DASHBOARD =============")
    print(f"Total Messages Scanned : {total}")
    print(f"Identified Threats     : {threats}")
    print(f"Threat Ratio           : {percentage:.1f}%")
    print("===============================================\\n")


def manage_keywords(keywords):
    """
    Allows adding or viewing detection keywords.
    """
    print("\\nCurrent Keywords:", ", ".join(keywords))
    new_kw = input("Enter new suspicious keyword to add (or press Enter to cancel): ").strip().lower()
    if new_kw and new_kw not in keywords:
        keywords.append(new_kw)
        print(f"Added '{new_kw}' to keyword list.")


def main():
    """
    Milestone 6:
    Interactive Menu Loop.
    """
    print("=" * 45)
    print("              INBOX GUARDIAN")
    print("       PERSONAL MESSAGE SECURITY SCANNER")
    print("=" * 45)

    # Demo run: scan sample inbox and show stats
    scan_sample_inbox(SAMPLE_INBOX, KEYWORDS, scan_history)
    display_history(scan_history)
    calculate_statistics(scan_history)


if __name__ == "__main__":
    main()
`;

  const handleCopySolution = async () => {
    try {
      await navigator.clipboard.writeText(starterScaffoldCode);
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    } catch {
      // Ignore
    }
  };

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
        <span className="text-slate-800 font-medium">Inbox Guardian Capstone</span>
      </nav>

      {/* Hero Section */}
      <div className="mb-8 pb-8 border-b border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold block mb-2">
              WORKSHOP 01 CAPSTONE · 120-MINUTE SYNTHESIS
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Inbox Guardian: Rule-Based Security Engine
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Synthesize Python fundamentals—variables, string normalization, boolean conditionals, repetition loops, structured collections, and modular functions—into an end-to-end command-line security analyzer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopySolution}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {copiedSolution ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedSolution ? "Copied" : "Copy Solution"}</span>
            </button>
            <Link
              href="/workshops/python-foundations/capstone-inbox-guardian"
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors"
            >
              <span>Open Chapter 8 Lesson</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Educational Boundary Callout */}
        <div className="mt-6 rounded-md border-l-3 border-l-amber-500 bg-amber-50/60 p-4 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
            <span>CRITICAL EDUCATIONAL BOUNDARY: Rule-Based Systems vs Machine Learning</span>
          </div>
          <p className="leading-relaxed text-amber-900">
            Inbox Guardian is a <strong>purely rule-based Python application</strong>. It uses deterministic conditional logic and string matching, not machine learning or neural networks. Understanding explicit heuristic rules is the foundational prerequisite for machine learning—in future workshops, you will learn how machine learning models replace handwritten rules by learning boundaries automatically from data.
          </p>
        </div>
      </div>

      {/* Main Split: Milestones & Interactive Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Step-by-Step Milestones */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-slate-200/80 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-blue-600" />
              <span>Project Milestones</span>
            </h2>

            {/* Milestone Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-3 mb-4">
              {[
                { m: 1, title: "01: Analyzer" },
                { m: 2, title: "02: Thresholds" },
                { m: 3, title: "03: Batch Scan" },
                { m: 4, title: "04: History" },
                { m: 5, title: "05: Stats" },
                { m: 6, title: "06: Menu" },
              ].map((item) => (
                <button
                  key={item.m}
                  type="button"
                  onClick={() => setActiveMilestone(item.m)}
                  className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                    activeMilestone === item.m
                      ? "bg-slate-900 text-white font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Milestone Content */}
            {activeMilestone === 1 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 1: The Core Message Analyzer Function
                </h3>
                <p>
                  Define `analyse_message(text, keywords)`. Convert the input `text` to lowercase using `.lower()`. Use a loop to check if each keyword in `keywords` exists inside the cleaned text.
                </p>
                <div className="rounded bg-slate-900 p-3 font-mono text-[11px] text-emerald-400 border border-slate-800">
                  {`def analyse_message(text, keywords):
    cleaned = text.lower()
    matched = [kw for kw in keywords if kw in cleaned]
    return matched`}
                </div>
              </div>
            )}

            {activeMilestone === 2 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 2: Rule-Based Risk Thresholds
                </h3>
                <p>
                  Add conditional logic to assign risk status based on the count of matched keywords:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>0 matches</strong>: Status = &apos;SAFE&apos;</li>
                  <li><strong>1 to 2 matches</strong>: Status = &apos;POTENTIALLY SUSPICIOUS&apos;</li>
                  <li><strong>3+ matches</strong>: Status = &apos;HIGH RISK&apos;</li>
                </ul>
              </div>
            )}

            {activeMilestone === 3 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 3: Batch Scanning an Entire Inbox
                </h3>
                <p>
                  Define `scan_sample_inbox(inbox, keywords, history)`. Loop over the list of sample messages, call `analyse_message` for each, and append the result dictionary to the history list.
                </p>
              </div>
            )}

            {activeMilestone === 4 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 4: In-Memory Scan History Log
                </h3>
                <p>
                  Define `display_history(history)`. Check if history is empty. If not, iterate through the list of dictionaries and format each scan record cleanly on the console.
                </p>
              </div>
            )}

            {activeMilestone === 5 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 5: Calculating Security Metrics
                </h3>
                <p>
                  Define `calculate_statistics(history)`. Compute total scans, count how many messages had status != &apos;SAFE&apos;, and calculate the threat percentage.
                </p>
              </div>
            )}

            {activeMilestone === 6 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <h3 className="text-sm font-semibold text-slate-900">
                  Milestone 6: Interactive Terminal Menu Loop
                </h3>
                <p>
                  Implement a `while True` loop that displays options 1 through 5, accepts user choice, calls the appropriate function, and exits cleanly when option 0 is chosen.
                </p>
              </div>
            )}

            {/* Checklist */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                Completion Checklist
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Case-insensitive substring matching implemented</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>History stored as a list of dictionaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Input validation handles empty strings gracefully</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Statistics calculate threat percentage correctly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Code Workspace */}
        <div className="lg:col-span-7 h-[680px]">
          <CodeEditor
            initialCode={starterScaffoldCode}
            title="Inbox Guardian Python Workspace"
            testCases={[
              {
                id: "tc-inbox-out",
                description: "Outputs batch scan summary",
                expectedOutputSnippet: "Batch complete. Scanned 4 messages.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
