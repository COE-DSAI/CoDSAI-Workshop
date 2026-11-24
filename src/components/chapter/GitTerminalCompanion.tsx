"use client";

import React, { useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  Laptop,
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";

interface GitTerminalCompanionProps {
  workshop: Workshop;
  chapter: Chapter;
}

export function GitTerminalCompanion({
  workshop,
  chapter,
}: GitTerminalCompanionProps) {
  const [platform, setPlatform] = useState<"mac" | "win" | "linux">("mac");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Chapter-specific command palettes
  const getChapterCommands = () => {
    switch (chapter.number) {
      case 1:
        return [
          {
            cmd: "git --version",
            desc: "Verify that Git is installed and discoverable in PATH",
            flags: "--version: displays release version",
            output: "git version 2.44.0",
          },
          {
            cmd: 'git config --global user.name "Your Name"',
            desc: "Set your global developer name attached to all commits",
            flags: '--global: writes to ~/.gitconfig; quotes required for spaces',
            output: "(silent on success)",
          },
          {
            cmd: 'git config --global user.email "your.email@example.com"',
            desc: "Set your global developer email (matches GitHub profile)",
            flags: '--global: writes to ~/.gitconfig',
            output: "(silent on success)",
          },
          {
            cmd: "git config --global init.defaultBranch main",
            desc: "Configure modern default initial branch name to main",
            flags: "init.defaultBranch: sets default for all future 'git init'",
            output: "(silent on success)",
          },
          {
            cmd: platform === "win" ? "git config --global core.autocrlf true" : "git config --global core.autocrlf input",
            desc: platform === "win" ? "Normalize CRLF to LF on Windows" : "Normalize line endings on macOS/Linux",
            flags: "core.autocrlf: prevents cross-platform whitespace diff issues",
            output: "(silent on success)",
          },
          {
            cmd: "git config --list --show-origin",
            desc: "Audit all active configurations with their file paths",
            flags: "--show-origin: lists configuration files (~/.gitconfig, etc.)",
            output: "file:/Users/you/.gitconfig  user.name=Your Name...",
          },
        ];
      case 2:
        return [
          {
            cmd: "mkdir my-ai-project && cd my-ai-project",
            desc: "Create and navigate into a clean project directory",
            flags: "mkdir: create folder; cd: change directory",
            output: "",
          },
          {
            cmd: "git init",
            desc: "Initialize a new local Git repository (.git directory)",
            flags: "Creates object database, HEAD ref, and config",
            output: "Initialized empty Git repository in /Users/you/my-ai-project/.git/",
          },
          {
            cmd: "git status -s",
            desc: "Check brief status of working directory and staging index",
            flags: "-s: short format (?? = untracked, A = staged, M = modified)",
            output: "?? README.md",
          },
          {
            cmd: "git add .",
            desc: "Stage all new, modified, and deleted files into the Index",
            flags: ".: current directory recursively",
            output: "(silent on success)",
          },
          {
            cmd: 'git commit -m "feat: initial commit for ai scanner"',
            desc: "Record staged changes into an immutable commit snapshot",
            flags: '-m: inline commit message (Conventional Commits recommended)',
            output: "[main (root-commit) 7a8b9c0] feat: initial commit...",
          },
          {
            cmd: "git log --oneline --graph --decorate",
            desc: "View clear single-line graphical commit history",
            flags: "--oneline: 1 line per commit; --graph: branch ASCII tree",
            output: "* 7a8b9c0 (HEAD -> main) feat: initial commit",
          },
        ];
      case 3:
        return [
          {
            cmd: "git branch",
            desc: "List all local branches (* denotes currently active branch)",
            flags: "-a: include remote branches",
            output: "* main",
          },
          {
            cmd: "git switch -c feature/scanner-logic",
            desc: "Create and switch to a new isolated feature branch",
            flags: "-c: create new branch pointer and point HEAD to it",
            output: "Switched to a new branch 'feature/scanner-logic'",
          },
          {
            cmd: "git switch main",
            desc: "Switch back to the primary main branch",
            flags: "Updates working directory files to match main's snapshot",
            output: "Switched to branch 'main'",
          },
          {
            cmd: "git merge feature/scanner-logic",
            desc: "Merge feature branch commits into current branch (main)",
            flags: "Performs fast-forward or three-way merge commit",
            output: "Updating a1b2c3d..e4f5a6b\nFast-forward",
          },
          {
            cmd: "git merge --abort",
            desc: "Cancel an in-progress merge conflict and restore clean state",
            flags: "--abort: undoes failed merge attempt safely",
            output: "(resets files to pre-merge state)",
          },
          {
            cmd: "git branch -d feature/scanner-logic",
            desc: "Safely delete merged feature branch pointer",
            flags: "-d: safe delete (verifies branch is merged into HEAD)",
            output: "Deleted branch feature/scanner-logic.",
          },
        ];
      case 4:
      default:
        return [
          {
            cmd: "git remote add origin https://github.com/USERNAME/REPO.git",
            desc: "Link local repository to newly created remote on GitHub",
            flags: "origin: standard remote alias; replace URL with your repo",
            output: "(silent on success)",
          },
          {
            cmd: "git remote -v",
            desc: "Verify remote fetch and push URLs",
            flags: "-v: verbose (shows both fetch and push URLs)",
            output: "origin  https://github.com/USERNAME/REPO.git (fetch)\norigin  https://github.com/USERNAME/REPO.git (push)",
          },
          {
            cmd: "git push -u origin main",
            desc: "Push local main commits to GitHub and set upstream tracking",
            flags: "-u: establishes tracking branch link for future git push",
            output: "To https://github.com/USERNAME/REPO.git\n * [new branch] main -> main",
          },
          {
            cmd: "git fetch origin",
            desc: "Download remote commits without altering local files",
            flags: "origin: downloads remote tracking branches",
            output: "From https://github.com/USERNAME/REPO",
          },
          {
            cmd: "git pull origin main",
            desc: "Fetch and merge remote changes into local active branch",
            flags: "Combines git fetch + git merge",
            output: "Already up to date.",
          },
          {
            cmd: "git branch -vv",
            desc: "Inspect local branch tracking status against GitHub",
            flags: "-vv: displays [origin/main] and commit delta",
            output: "* main 7a8b9c0 [origin/main] feat: initial commit",
          },
        ];
    }
  };

  const getChecklistItems = () => {
    switch (chapter.number) {
      case 1:
        return [
          { id: "c1-terminal", label: "Opened Terminal / PowerShell on your PC" },
          { id: "c1-version", label: "Ran 'git --version' (Confirmed v2.30+)" },
          { id: "c1-name", label: "Set global user.name" },
          { id: "c1-email", label: "Set global user.email matching GitHub" },
          { id: "c1-branch", label: "Configured init.defaultBranch to main" },
        ];
      case 2:
        return [
          { id: "c2-init", label: "Initialized project with 'git init'" },
          { id: "c2-ignore", label: "Created and committed .gitignore" },
          { id: "c2-status", label: "Ran 'git status' to inspect untracked files" },
          { id: "c2-add", label: "Staged files with 'git add .'" },
          { id: "c2-commit", label: "Created atomic commit with 'git commit -m'" },
          { id: "c2-log", label: "Audited commit graph with 'git log --oneline'" },
        ];
      case 3:
        return [
          { id: "c3-branch", label: "Created feature branch with 'git switch -c'" },
          { id: "c3-commit", label: "Committed isolated change on feature branch" },
          { id: "c3-switch", label: "Switched back to main with 'git switch main'" },
          { id: "c3-merge", label: "Merged feature into main with 'git merge'" },
          { id: "c3-delete", label: "Cleaned up branch with 'git branch -d'" },
        ];
      case 4:
      default:
        return [
          { id: "c4-account", label: "Logged into account on GitHub.com" },
          { id: "c4-newrepo", label: "Created empty repo (no default README)" },
          { id: "c4-remote", label: "Attached remote origin with 'git remote add'" },
          { id: "c4-push", label: "Pushed to GitHub with 'git push -u origin main'" },
          { id: "c4-verify", label: "Viewed live repository on GitHub in browser" },
        ];
    }
  };

  const commands = getChapterCommands();
  const checklistItems = getChecklistItems();

  return (
    <div className="flex h-full flex-col bg-[#0B132B] text-slate-100 font-sans">
      {/* Top Title Bar with macOS Terminal Dots */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#070D1F] px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <span className="font-mono text-slate-300 font-medium ml-2 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span>Local PC Terminal Companion</span>
          </span>
        </div>

        {/* OS Platform Switcher */}
        <div className="flex items-center rounded border border-slate-800 bg-[#0B132B] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setPlatform("mac")}
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              platform === "mac" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            macOS
          </button>
          <button
            type="button"
            onClick={() => setPlatform("win")}
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              platform === "win" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Windows
          </button>
          <button
            type="button"
            onClick={() => setPlatform("linux")}
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              platform === "linux" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Linux
          </button>
        </div>
      </div>

      {/* Instruction Banner */}
      <div className="border-b border-slate-800/80 bg-blue-950/40 px-4 py-2 text-xs flex items-center gap-2 text-blue-300">
        <Laptop className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="leading-tight">
          Execute these commands in your <strong>own computer terminal</strong> ({platform === "win" ? "PowerShell or Git Bash" : "Terminal"}).
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Section 1: Command Palette with Copy Buttons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Chapter {chapter.number} Command Clipboard</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Click to copy</span>
          </div>

          <div className="space-y-2.5">
            {commands.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-slate-800 bg-[#0F1A36] p-3 transition-colors hover:border-slate-700 hover:bg-[#132247]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-slate-300 mb-1 leading-snug">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-black/40 px-2.5 py-1.5 rounded border border-slate-800/60 overflow-x-auto">
                      <span className="text-slate-500 select-none">$</span>
                      <code className="select-all">{item.cmd}</code>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.cmd, idx)}
                    className="shrink-0 mt-6 inline-flex items-center gap-1 rounded bg-slate-800/80 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Copy command to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Flag Breakdown & Expected Output */}
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-col gap-1 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-mono text-[10px]">
                    Note: <span className="text-slate-400">{item.flags}</span>
                  </span>
                  {item.output && (
                    <span className="text-slate-500 font-mono text-[10px] truncate">
                      Expected: <span className="text-slate-300">{item.output}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Local PC Progress Checklist */}
        <div className="rounded-lg border border-slate-800 bg-[#0E172E] p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-2">
            <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>Local PC Verification Checklist</span>
          </div>

          <div className="space-y-1.5">
            {checklistItems.map((item) => {
              const isChecked = Boolean(checklist[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded px-2.5 py-1.5 text-left text-xs transition-colors ${
                    isChecked
                      ? "bg-emerald-950/30 text-emerald-300 line-through"
                      : "bg-slate-900/60 text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                  )}
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Troubleshooting Expandable Drawer */}
        <div className="rounded-lg border border-slate-800 bg-[#0E172E] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="w-full flex items-center justify-between p-3 text-xs font-medium text-slate-300 hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              <span>Common Local Git Setup Errors &amp; Fixes</span>
            </div>
            {showTroubleshooting ? (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          {showTroubleshooting && (
            <div className="border-t border-slate-800 p-3 space-y-3 text-xs text-slate-300">
              <div className="rounded bg-black/40 p-2.5 border border-slate-800/80">
                <span className="font-mono text-rose-400 font-semibold block mb-0.5">
                  1. &quot;command not found: git&quot;
                </span>
                <p className="text-[11px] text-slate-400">
                  Git is not installed or your terminal session has not reloaded system PATH. Restart your terminal or reinstall Git via Homebrew / Git for Windows.
                </p>
              </div>

              <div className="rounded bg-black/40 p-2.5 border border-slate-800/80">
                <span className="font-mono text-rose-400 font-semibold block mb-0.5">
                  2. &quot;fatal: not a git repository&quot;
                </span>
                <p className="text-[11px] text-slate-400">
                  You ran a Git command in a regular folder that has not been initialized. Run <code className="text-emerald-400 font-mono">git init</code> or navigate to your project directory with <code className="text-emerald-400 font-mono">cd &lt;path&gt;</code>.
                </p>
              </div>

              <div className="rounded bg-black/40 p-2.5 border border-slate-800/80">
                <span className="font-mono text-rose-400 font-semibold block mb-0.5">
                  3. &quot;LF will be replaced by CRLF&quot;
                </span>
                <p className="text-[11px] text-slate-400">
                  This is a harmless notification on Windows. Run <code className="text-emerald-400 font-mono">git config --global core.autocrlf true</code> to normalize line endings automatically.
                </p>
              </div>

              <div className="rounded bg-black/40 p-2.5 border border-slate-800/80">
                <span className="font-mono text-rose-400 font-semibold block mb-0.5">
                  4. &quot;fatal: remote origin already exists&quot;
                </span>
                <p className="text-[11px] text-slate-400">
                  You already linked an origin. Update it with <code className="text-emerald-400 font-mono">git remote set-url origin &lt;new-url&gt;</code> instead of <code className="text-emerald-400 font-mono">git remote add</code>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 bg-[#070D1F] px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <GitBranch className="h-3 w-3 text-blue-400" />
          <span>Workshop 02 · Local PC Workflow</span>
        </span>
        <span className="text-slate-500">Self-guided terminal mastery</span>
      </div>
    </div>
  );
}
