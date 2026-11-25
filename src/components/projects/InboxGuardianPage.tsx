"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  ArrowRight,
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
        <span className="text-[var(--text-primary)] font-medium">Inbox Guardian</span>
      </nav>

      {/* Header */}
      <div className="mb-8 pb-8 border-b border-[var(--border-hairline)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tabular-nums text-[var(--accent)] mb-2">
              Workshop 01 capstone · 120 min synthesis
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
              Inbox Guardian: rule-based security scanner
            </h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              Combine variables, string normalization, conditionals, loops, dictionaries, and functions into a command-line message scanner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopySolution}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors duration-150"
            >
              {copiedSolution ? (
                <Check className="h-4 w-4 text-[var(--positive)]" strokeWidth={1.5} />
              ) : (
                <Copy className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
              )}
              <span>{copiedSolution ? "Copied" : "Copy starter"}</span>
            </button>
            <Link
              href="/workshops/python-foundations/capstone-inbox-guardian"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 text-xs font-medium text-white hover:bg-[var(--accent-hover)] transition-colors duration-150"
            >
              <span>Open Chapter 08 lesson</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Educational Scope Note */}
        <div className="mt-6 rounded-xl border border-[var(--warning-border)] border-l-2 border-l-[var(--warning)] bg-[var(--warning-tint)] p-4 text-xs">
          <div className="flex items-center gap-2 font-medium text-[var(--text-primary)] mb-1">
            <ShieldAlert className="h-4 w-4 text-[var(--warning)] shrink-0" strokeWidth={1.5} />
            <span>Scope note: rule-based heuristics vs machine learning</span>
          </div>
          <p className="leading-relaxed text-[var(--text-secondary)]">
            Inbox Guardian is a deterministic, rule-based Python application using conditional logic and string matching. Understanding explicit rules prepares you for later modules where statistical models learn thresholds directly from data.
          </p>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
            <h2 className="text-sm font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[var(--text-muted)]" strokeWidth={1.5} />
              <span>Project milestones</span>
            </h2>

            <div className="flex flex-wrap gap-1.5 border-b border-[var(--border-hairline)] pb-4 mb-4">
              {[
                { m: 1, title: "01 Analyzer" },
                { m: 2, title: "02 Thresholds" },
                { m: 3, title: "03 Batch scan" },
                { m: 4, title: "04 History" },
                { m: 5, title: "05 Stats" },
                { m: 6, title: "06 Menu" },
              ].map((item) => (
                <button
                  key={item.m}
                  type="button"
                  onClick={() => setActiveMilestone(item.m)}
                  className={`h-8 rounded-lg px-2.5 text-xs font-mono tabular-nums transition-colors duration-150 ${
                    activeMilestone === item.m
                      ? "bg-[var(--accent)] text-white font-medium"
                      : "bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {activeMilestone === 1 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 01: Core message analyzer
                </h3>
                <p>
                  Define <code className="font-mono text-[var(--accent)]">analyse_message(text, keywords)</code>. Normalize input with <code className="font-mono">.lower()</code> and check each keyword with a loop.
                </p>
                <pre className="rounded-lg bg-[var(--code-surface)] p-3 font-mono text-xs text-[#4CC38A] border border-[var(--code-border)] overflow-x-auto">
                  {`def analyse_message(text, keywords):
    cleaned = text.lower()
    matched = [kw for kw in keywords if kw in cleaned]
    return matched`}
                </pre>
              </div>
            )}

            {activeMilestone === 2 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 02: Risk thresholds
                </h3>
                <p>Assign a verdict based on the number of matched keywords:</p>
                <ul className="space-y-1.5 font-mono">
                  <li>0 matches → SAFE</li>
                  <li>1–2 matches → POTENTIALLY SUSPICIOUS</li>
                  <li>3+ matches → HIGH RISK</li>
                </ul>
              </div>
            )}

            {activeMilestone === 3 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 03: Batch inbox scanning
                </h3>
                <p>
                  Define <code className="font-mono text-[var(--accent)]">scan_sample_inbox(inbox, keywords, history)</code>. Iterate over messages, analyze each one, and append its result dictionary to <code className="font-mono">history</code>.
                </p>
              </div>
            )}

            {activeMilestone === 4 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 04: In-memory scan log
                </h3>
                <p>
                  Define <code className="font-mono text-[var(--accent)]">display_history(history)</code> to check for empty state and print each logged record cleanly.
                </p>
              </div>
            )}

            {activeMilestone === 5 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 05: Security metrics
                </h3>
                <p>
                  Define <code className="font-mono text-[var(--accent)]">calculate_statistics(history)</code> to compute total scans, flagged count, and threat percentage.
                </p>
              </div>
            )}

            {activeMilestone === 6 && (
              <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                <h3 className="text-sm font-medium text-[var(--text-primary)]">
                  Milestone 06: Interactive menu loop
                </h3>
                <p>
                  Implement a <code className="font-mono text-[var(--accent)]">while True</code> loop that reads menu choices, runs the matching function, and exits on option 0.
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-[var(--border-hairline)] pt-4">
              <span className="text-xs font-medium text-[var(--text-muted)] block mb-3">
                Completion checklist
              </span>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0" strokeWidth={1.5} />
                  <span>Case-insensitive substring matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0" strokeWidth={1.5} />
                  <span>History stored as a list of dictionaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0" strokeWidth={1.5} />
                  <span>Empty input handled without errors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0" strokeWidth={1.5} />
                  <span>Threat percentage computed accurately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 h-[680px] rounded-xl overflow-hidden border border-[var(--code-border)]">
          <CodeEditor
            initialCode={starterScaffoldCode}
            title="inbox_guardian.py"
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
