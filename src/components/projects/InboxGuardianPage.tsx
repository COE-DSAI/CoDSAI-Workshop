"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Award,
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
      {/* Top Banner */}
      <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                Workshop 1 Capstone Project
              </span>
              <span className="text-xs text-slate-500 font-mono">120-Minute Milestone Capstone</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Inbox Guardian — Personal Message Scanner
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Synthesize Python fundamentals (variables, strings, conditionals, loops, collections, and functions) into a complete, menu-driven message security scanner.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySolution}
              className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copiedSolution ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copiedSolution ? "Copied" : "Copy Solution Code"}</span>
            </button>
            <Link
              href="/workshops/python/capstone-inbox-guardian"
              className="rounded-md bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Open Chapter 8 Lesson
            </Link>
          </div>
        </div>

        {/* Educational Boundary Callout */}
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldAlert className="h-4 w-4 text-amber-700" />
            <span>CRITICAL EDUCATIONAL BOUNDARY: Rule-Based Systems vs Machine Learning</span>
          </div>
          <p className="leading-relaxed">
            Inbox Guardian is a <strong>purely rule-based Python application</strong>. It does not use machine learning, neural networks, or probability models. You manually write the heuristic rules. In Workshop 5 and 7, you will contrast this rule-based approach with true statistical machine learning classifiers that learn patterns directly from data.
          </p>
        </div>
      </div>

      {/* Main Split: Milestones & Interactive Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Step-by-Step Milestones */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-blue-600" />
              Project Milestones & Implementation Guide
            </h2>

            {/* Milestone Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3 mb-4">
              {[
                { m: 1, title: "1: Analyzer" },
                { m: 2, title: "2: Thresholds" },
                { m: 3, title: "3: Batch Scan" },
                { m: 4, title: "4: History Log" },
                { m: 5, title: "5: Statistics" },
                { m: 6, title: "6: CLI Menu" },
              ].map((item) => (
                <button
                  key={item.m}
                  onClick={() => setActiveMilestone(item.m)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                    activeMilestone === item.m
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Milestone Description */}
            {activeMilestone === 1 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
                  Milestone 1: The Core Message Analyzer Function
                </h3>
                <p>
                  Define `analyse_message(text, keywords)`. Convert the input `text` to lowercase using `.lower()`. Use a loop to check if each keyword in `keywords` exists inside the cleaned text.
                </p>
                <div className="rounded bg-slate-900 p-3 font-mono text-emerald-400">
                  {`def analyse_message(text, keywords):
    cleaned = text.lower()
    matched = [kw for kw in keywords if kw in cleaned]
    return matched`}
                </div>
              </div>
            )}

            {activeMilestone === 2 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
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
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
                  Milestone 3: Batch Scanning an Entire Inbox
                </h3>
                <p>
                  Define `scan_sample_inbox(inbox, keywords, history)`. Loop over the list of sample messages, call `analyse_message` for each, and append the result dictionary to the history list.
                </p>
              </div>
            )}

            {activeMilestone === 4 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
                  Milestone 4: Persistent In-Memory Scan History
                </h3>
                <p>
                  Define `display_history(history)`. Check if history is empty. If not, iterate through the list of dictionaries and format each scan record cleanly on the console.
                </p>
              </div>
            )}

            {activeMilestone === 5 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
                  Milestone 5: Calculating Aggregate Security Statistics
                </h3>
                <p>
                  Define `calculate_statistics(history)`. Compute total scans, count how many messages had status != &apos;SAFE&apos;, and calculate the threat percentage.
                </p>
              </div>
            )}

            {activeMilestone === 6 && (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">
                  Milestone 6: Interactive Terminal Menu Loop
                </h3>
                <p>
                  Implement a `while True` loop that displays options 1 through 5, accepts user choice, calls the appropriate function, and exits cleanly when option 0 is chosen.
                </p>
              </div>
            )}

            {/* Checklist */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Completion Checklist
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Case-insensitive substring matching implemented</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>History stored as a list of dictionaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Input validation handles empty strings gracefully</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Statistics calculate threat percentage correctly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Live Interactive Code Workspace */}
        <div className="h-[620px]">
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
