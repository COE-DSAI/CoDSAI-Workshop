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
  ChevronDown,
  ChevronRight,
  GitBranch,
} from "lucide-react";
import { Chapter, Workshop } from "@/types/curriculum";

interface GitTerminalCompanionProps {
  workshop: Workshop;
  chapter: Chapter;
}

export function GitTerminalCompanion({
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
            flags: "--global: writes to ~/.gitconfig; quotes required for spaces",
            output: "(silent on success)",
          },
          {
            cmd: 'git config --global user.email "your.email@example.com"',
            desc: "Set your global developer email (matches GitHub profile)",
            flags: "--global: writes to ~/.gitconfig",
            output: "(silent on success)",
          },
          {
            cmd: "git config --global init.defaultBranch main",
            desc: "Configure default initial branch name to main",
            flags: "init.defaultBranch: sets default for all future git init",
            output: "(silent on success)",
          },
          {
            cmd:
              platform === "win"
                ? "git config --global core.autocrlf true"
                : "git config --global core.autocrlf input",
            desc:
              platform === "win"
                ? "Normalize CRLF to LF on Windows"
                : "Normalize line endings on macOS and Linux",
            flags: "core.autocrlf: prevents cross-platform whitespace diff issues",
            output: "(silent on success)",
          },
          {
            cmd: "git config --list --show-origin",
            desc: "Audit all active configurations with their file paths",
            flags: "--show-origin: lists configuration files (~/.gitconfig, etc.)",
            output: "file:/Users/you/.gitconfig  user.name=Your Name...",
          },
          {
            cmd: "gh auth login",
            desc: "Launch interactive GitHub CLI login via browser OAuth or PAT",
            flags: "Configures OS keychain/credential helper",
            output: "Logged in to github.com account your-username (keyring)",
          },
          {
            cmd: "gh auth status",
            desc: "Verify active GitHub authentication status and token scopes",
            flags: "Checks network connection to github.com API",
            output: "Logged in to github.com as your-username",
          },
          {
            cmd: "gh auth setup-git",
            desc: "Configure Git to use GitHub CLI as a credential helper",
            flags: "Eliminates repeated password prompts for HTTPS",
            output: "(silent on success)",
          },
        ];
      case 2:
        return [
          {
            cmd: "mkdir my-ai-project && cd my-ai-project",
            desc: "Create and navigate into a project directory",
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
            desc: "Stage all new, modified, and deleted files into the index",
            flags: ".: current directory recursively",
            output: "(silent on success)",
          },
          {
            cmd: 'git commit -m "feat: initial commit for ai scanner"',
            desc: "Record staged changes into an immutable commit snapshot",
            flags: "-m: inline commit message",
            output: "[main (root-commit) 7a8b9c0] feat: initial commit...",
          },
          {
            cmd: "git log --oneline --graph --decorate",
            desc: "View single-line graphical commit history",
            flags: "--oneline: 1 line per commit; --graph: branch ASCII tree",
            output: "* 7a8b9c0 (HEAD -> main) feat: initial commit",
          },
        ];
      case 3:
        return [
          {
            cmd: "git branch",
            desc: "List all local branches (* marks active branch)",
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
            cmd: "git checkout -b feature/scanner-logic",
            desc: "Classic syntax: create and switch to a new branch",
            flags: "-b: branch creation flag",
            output: "Switched to a new branch 'feature/scanner-logic'",
          },
          {
            cmd: "git switch main",
            desc: "Switch back to the primary main branch",
            flags: "Updates working directory files to match main",
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
            desc: "Cancel an in-progress merge conflict and restore state",
            flags: "--abort: undoes failed merge attempt",
            output: "(resets files to pre-merge state)",
          },
          {
            cmd: "git branch -d feature/scanner-logic",
            desc: "Safely delete merged feature branch pointer",
            flags: "-d: verifies branch is merged into HEAD",
            output: "Deleted branch feature/scanner-logic.",
          },
        ];
      case 4:
        return [
          {
            cmd: "git reset --soft HEAD~1",
            desc: "Undo last commit; keep all changes staged in the index",
            flags: "--soft: moves HEAD back 1 commit; preserves staging area",
            output: "(silent on success; check with git status)",
          },
          {
            cmd: "git reset --mixed HEAD~1",
            desc: "Undo last commit and un-stage changes into working directory",
            flags: "--mixed: default mode; moves HEAD and clears index",
            output: "Unstaged changes after reset:\nM\tscanner.py",
          },
          {
            cmd: "git reset --hard HEAD~1",
            desc: "Undo last commit and permanently discard working tree edits",
            flags: "--hard: destructive; discards uncommitted work",
            output: "HEAD is now at 7a8b9c0 feat: initial commit",
          },
          {
            cmd: "git reflog",
            desc: "Display chronological history of all HEAD movements",
            flags: "Recovery tool to locate lost commit hashes",
            output: "a1b2c3d HEAD@{0}: reset: moving to HEAD~1\n4e5f6a7 HEAD@{1}: commit: ...",
          },
          {
            cmd: "git revert <commit-hash> --no-edit",
            desc: "Undo a pushed commit by creating an inverse forward commit",
            flags: "--no-edit: accepts default auto-generated revert message",
            output: '[main e5f6a7b] Revert "feat: experimental heuristic"',
          },
          {
            cmd: "git cherry-pick <commit-hash>",
            desc: "Apply an individual commit from another branch onto HEAD",
            flags: "Transplants commit changes without merging the source branch",
            output: "[main c8d9e0f] fix(security): sanitize email header",
          },
          {
            cmd: "git cherry-pick --continue",
            desc: "Finalize cherry-pick after resolving merge conflict",
            flags: "--continue: records new cherry-pick commit",
            output: "[main 9a8b7c6] fix(security): sanitize email header",
          },
        ];
      case 5:
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
            output:
              "origin  https://github.com/USERNAME/REPO.git (fetch)\norigin  https://github.com/USERNAME/REPO.git (push)",
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
            cmd: "git pull --rebase origin main",
            desc: "Replay local commits on top of incoming remote commits",
            flags: "--rebase: prevents unnecessary merge commits",
            output: "Successfully rebased and updated refs/heads/main.",
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
          { id: "c1-gh-login", label: "Authenticated via 'gh auth login' or PAT" },
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
        return [
          { id: "c4-soft", label: "Undid a test commit softly with 'git reset --soft'" },
          { id: "c4-status", label: "Verified staged index retained files" },
          { id: "c4-reflog", label: "Inspected HEAD history with 'git reflog'" },
          { id: "c4-revert", label: "Created an inverse commit with 'git revert'" },
          { id: "c4-cherry", label: "Cherry-picked a single commit with 'git cherry-pick'" },
        ];
      case 5:
      default:
        return [
          { id: "c5-account", label: "Logged into account on GitHub.com" },
          { id: "c5-newrepo", label: "Created empty repo (no default README)" },
          { id: "c5-remote", label: "Attached remote origin with 'git remote add'" },
          { id: "c5-push", label: "Pushed to GitHub with 'git push -u origin main'" },
          { id: "c5-pull", label: "Tested remote sync with 'git fetch' & 'git pull'" },
          { id: "c5-verify", label: "Viewed live repository on GitHub in browser" },
        ];
    }
  };

  const commands = getChapterCommands();
  const checklistItems = getChecklistItems();

  return (
    <div className="flex h-full flex-col bg-[var(--code-surface)] text-[var(--code-text)] font-sans">
      {/* Top Bar */}
      <div className="flex h-12 items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-chrome)] px-4 text-xs shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="h-4 w-4 text-[var(--code-secondary)] shrink-0" strokeWidth={1.5} />
          <span className="font-mono text-[var(--code-text)] font-medium truncate">
            Local terminal guide
          </span>
        </div>

        {/* OS Switcher */}
        <div className="flex items-center rounded-lg border border-[var(--code-border)] bg-[var(--code-surface)] p-0.5 text-xs shrink-0">
          {(["mac", "win", "linux"] as const).map((os) => (
            <button
              key={os}
              type="button"
              onClick={() => setPlatform(os)}
              className={`h-6 rounded-md px-2 text-[11px] font-medium transition-colors duration-150 ${
                platform === os
                  ? "bg-[var(--code-raised)] text-[var(--code-text)]"
                  : "text-[var(--code-muted)] hover:text-[var(--code-text)]"
              }`}
            >
              {os === "mac" ? "macOS" : os === "win" ? "Windows" : "Linux"}
            </button>
          ))}
        </div>
      </div>

      {/* Instruction Note */}
      <div className="border-b border-[var(--code-border)] bg-[var(--code-raised)] px-4 py-2 text-xs flex items-center gap-2 text-[var(--code-secondary)]">
        <Laptop className="h-4 w-4 shrink-0 text-[var(--code-muted)]" strokeWidth={1.5} />
        <span>
          Run these commands in{" "}
          <strong className="font-medium text-[var(--code-text)]">
            {platform === "win" ? "PowerShell or Git Bash" : "Terminal"}
          </strong>{" "}
          on your machine
        </span>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-[var(--code-text)] font-mono tabular-nums">
              Chapter {String(chapter.number).padStart(2, "0")} commands
            </h3>
            <span className="text-[11px] text-[var(--code-muted)] font-mono">
              Click copy
            </span>
          </div>

          <div className="space-y-3">
            {commands.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[var(--code-border)] bg-[var(--code-raised)] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--code-secondary)] mb-2 leading-snug">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#4CC38A] bg-[var(--code-chrome)] px-3 py-2 rounded-lg border border-[var(--code-border)] overflow-x-auto">
                      <span className="text-[var(--code-muted)] select-none">$</span>
                      <code className="select-all">{item.cmd}</code>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.cmd, idx)}
                    className="shrink-0 mt-6 inline-flex h-7 items-center gap-1 rounded-md border border-[var(--code-border)] bg-[var(--code-surface)] px-2 text-[11px] font-medium text-[var(--code-secondary)] hover:text-[var(--code-text)] transition-colors duration-150"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#4CC38A]" strokeWidth={1.5} />
                        <span className="text-[#4CC38A]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-[var(--code-border)] flex flex-col gap-1 text-[11px] font-mono text-[var(--code-muted)]">
                  <span>
                    Note: <span className="text-[var(--code-secondary)]">{item.flags}</span>
                  </span>
                  {item.output && (
                    <span className="truncate">
                      Output: <span className="text-[var(--code-text)]">{item.output}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-xl border border-[var(--code-border)] bg-[var(--code-raised)] p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--code-text)] mb-3">
            <CheckSquare className="h-4 w-4 text-[#4CC38A]" strokeWidth={1.5} />
            <span>Verification checklist</span>
          </div>

          <div className="space-y-1.5">
            {checklistItems.map((item) => {
              const isChecked = Boolean(checklist[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors duration-150 ${
                    isChecked
                      ? "bg-[#4CC38A]/10 text-[#4CC38A]"
                      : "bg-[var(--code-chrome)] text-[var(--code-secondary)] hover:text-[var(--code-text)]"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 text-[#4CC38A] shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Square className="h-4 w-4 text-[var(--code-muted)] shrink-0" strokeWidth={1.5} />
                  )}
                  <span className={`flex-1 ${isChecked ? "line-through opacity-80" : ""}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="rounded-xl border border-[var(--code-border)] bg-[var(--code-raised)] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
            className="w-full flex items-center justify-between p-4 text-xs font-medium text-[var(--code-text)] hover:bg-[var(--code-chrome)] transition-colors duration-150"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#FBBF24]" strokeWidth={1.5} />
              <span>Common local Git errors &amp; fixes</span>
            </div>
            {showTroubleshooting ? (
              <ChevronDown className="h-4 w-4 text-[var(--code-muted)]" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="h-4 w-4 text-[var(--code-muted)]" strokeWidth={1.5} />
            )}
          </button>

          {showTroubleshooting && (
            <div className="border-t border-[var(--code-border)] p-4 space-y-3 text-xs">
              <div className="rounded-lg bg-[var(--code-chrome)] p-3 border border-[var(--code-border)]">
                <span className="font-mono text-[#FCA5A5] font-medium block mb-1">
                  1. &quot;command not found: git&quot;
                </span>
                <p className="text-[var(--code-secondary)] leading-relaxed">
                  Git is not installed or your terminal session has not reloaded PATH. Restart your terminal or install Git via Homebrew / Git for Windows.
                </p>
              </div>

              <div className="rounded-lg bg-[var(--code-chrome)] p-3 border border-[var(--code-border)]">
                <span className="font-mono text-[#FCA5A5] font-medium block mb-1">
                  2. &quot;fatal: not a git repository&quot;
                </span>
                <p className="text-[var(--code-secondary)] leading-relaxed">
                  You ran a Git command outside a repository folder. Run{" "}
                  <code className="text-[#4CC38A] font-mono">git init</code> or{" "}
                  <code className="text-[#4CC38A] font-mono">cd &lt;path&gt;</code>.
                </p>
              </div>

              <div className="rounded-lg bg-[var(--code-chrome)] p-3 border border-[var(--code-border)]">
                <span className="font-mono text-[#FCA5A5] font-medium block mb-1">
                  3. &quot;LF will be replaced by CRLF&quot;
                </span>
                <p className="text-[var(--code-secondary)] leading-relaxed">
                  Line-ending normalization notice on Windows. Run{" "}
                  <code className="text-[#4CC38A] font-mono">git config --global core.autocrlf true</code>.
                </p>
              </div>

              <div className="rounded-lg bg-[var(--code-chrome)] p-3 border border-[var(--code-border)]">
                <span className="font-mono text-[#FCA5A5] font-medium block mb-1">
                  4. &quot;fatal: remote origin already exists&quot;
                </span>
                <p className="text-[var(--code-secondary)] leading-relaxed">
                  An origin remote is already configured. Update it with{" "}
                  <code className="text-[#4CC38A] font-mono">git remote set-url origin &lt;new-url&gt;</code>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--code-border)] bg-[var(--code-chrome)] px-4 py-3 flex items-center justify-between text-xs text-[var(--code-muted)]">
        <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
          <GitBranch className="h-4 w-4 text-[var(--code-secondary)]" strokeWidth={1.5} />
          <span>Workshop 02 · Local PC</span>
        </span>
        <span>Self-guided CLI</span>
      </div>
    </div>
  );
}
