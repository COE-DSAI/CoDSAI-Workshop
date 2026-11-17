"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, GitMerge, Check, Terminal, RotateCcw } from "lucide-react";

interface CommitNode {
  id: string;
  hash: string;
  message: string;
  branch: string;
}

export function GitSimulator() {
  const [workingFiles, setWorkingFiles] = useState<string[]>(["inbox_guardian.py", "README.md"]);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>(["main"]);
  const [activeBranch, setActiveBranch] = useState<string>("main");
  const [commits, setCommits] = useState<CommitNode[]>([
    { id: "c1", hash: "a1b2c3d", message: "Initial project setup", branch: "main" },
  ]);
  const [cliInput, setCliInput] = useState<string>("");
  const [cliLogs, setCliLogs] = useState<string[]>([
    "Interactive Git Simulator Initialized.",
    "Type a command below or use quick action buttons.",
  ]);

  const addLog = (msg: string) => {
    setCliLogs((prev) => [...prev.slice(-15), msg]);
  };

  const handleStageAll = () => {
    if (workingFiles.length === 0) {
      addLog("Nothing to stage: working tree clean.");
      return;
    }
    setStagedFiles((prev) => [...prev, ...workingFiles]);
    setWorkingFiles([]);
    addLog(`$ git add .\n[staged ${workingFiles.length} files]`);
  };

  const handleCommit = (message = "feat: update message detection logic") => {
    if (stagedFiles.length === 0) {
      addLog("$ git commit\nError: nothing added to commit but untracked files present.");
      return;
    }
    const newHash = Math.random().toString(16).slice(2, 9);
    const newCommit: CommitNode = {
      id: `c-${Date.now()}`,
      hash: newHash,
      message,
      branch: activeBranch,
    };
    setCommits((prev) => [...prev, newCommit]);
    setStagedFiles([]);
    addLog(`$ git commit -m "${message}"\n[${activeBranch} ${newHash}] ${message}`);
  };

  const handleCreateBranch = (branchName = "feature/scanner-rules") => {
    if (branches.includes(branchName)) {
      addLog(`Branch '${branchName}' already exists.`);
      return;
    }
    setBranches((prev) => [...prev, branchName]);
    setActiveBranch(branchName);
    addLog(`$ git switch -c ${branchName}\nSwitched to a new branch '${branchName}'`);
  };

  const handleMergeToMain = () => {
    if (activeBranch === "main") {
      addLog("Already on 'main'. Switch to a feature branch to test merging.");
      return;
    }
    const fromBranch = activeBranch;
    setActiveBranch("main");
    addLog(`$ git switch main && git merge ${fromBranch}\nFast-forward merge: updated main with commits from ${fromBranch}`);
  };

  const handleReset = () => {
    setWorkingFiles(["inbox_guardian.py", "README.md"]);
    setStagedFiles([]);
    setBranches(["main"]);
    setActiveBranch("main");
    setCommits([{ id: "c1", hash: "a1b2c3d", message: "Initial project setup", branch: "main" }]);
    setCliLogs(["Simulator reset to initial repository state."]);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;
    setCliInput("");

    if (cmd === "git status") {
      addLog(`$ ${cmd}\nOn branch ${activeBranch}\nChanges to be committed: ${stagedFiles.join(", ") || "none"}\nUntracked files: ${workingFiles.join(", ") || "none"}`);
    } else if (cmd.startsWith("git add")) {
      handleStageAll();
    } else if (cmd.startsWith("git commit")) {
      handleCommit("commit via interactive terminal");
    } else if (cmd.startsWith("git switch -c") || cmd.startsWith("git checkout -b")) {
      const parts = cmd.split(" ");
      handleCreateBranch(parts[parts.length - 1] || "feature/experiment");
    } else if (cmd === "git merge") {
      handleMergeToMain();
    } else {
      addLog(`$ ${cmd}\nCommand simulated: type 'git status', 'git add .', 'git commit', or use buttons above.`);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 text-slate-100 shadow-lg overflow-hidden">
      {/* Simulator Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-200">Interactive Git Workflow Visualizer</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
            Active: {activeBranch}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-700 transition-colors"
          title="Reset simulator"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Visual Three Trees Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border-b border-slate-800 bg-slate-900/60">
        {/* Working Directory */}
        <div className="rounded-lg border border-slate-700 bg-slate-950 p-3">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-400">1. Working Directory</span>
            <span className="text-[10px] text-slate-400 font-mono">({workingFiles.length} modified)</span>
          </div>
          {workingFiles.length === 0 ? (
            <p className="text-[11px] text-slate-500 italic">Working tree clean</p>
          ) : (
            <ul className="space-y-1 text-xs font-mono text-amber-300">
              {workingFiles.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <span className="text-amber-500">M</span> {f}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleStageAll}
            disabled={workingFiles.length === 0}
            className="mt-3 w-full rounded bg-amber-600/80 px-2 py-1 text-[11px] font-semibold text-white hover:bg-amber-600 disabled:opacity-40"
          >
            git add . (Stage Changes)
          </button>
        </div>

        {/* Staging Area */}
        <div className="rounded-lg border border-slate-700 bg-slate-950 p-3">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-blue-400">2. Staging Area (Index)</span>
            <span className="text-[10px] text-slate-400 font-mono">({stagedFiles.length} staged)</span>
          </div>
          {stagedFiles.length === 0 ? (
            <p className="text-[11px] text-slate-500 italic">No changes staged</p>
          ) : (
            <ul className="space-y-1 text-xs font-mono text-blue-300">
              {stagedFiles.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-400" /> {f}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => handleCommit()}
            disabled={stagedFiles.length === 0}
            className="mt-3 w-full rounded bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-blue-500 disabled:opacity-40"
          >
            git commit -m &quot;...&quot; (Snapshot)
          </button>
        </div>

        {/* Git Log / Commit Graph */}
        <div className="rounded-lg border border-slate-700 bg-slate-950 p-3">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400">3. Repository Commits</span>
            <span className="text-[10px] text-slate-400 font-mono">({commits.length} commits)</span>
          </div>
          <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs font-mono">
            {commits.map((c) => (
              <div key={c.id} className="flex items-center gap-2 rounded bg-slate-900 p-1.5 border border-slate-800">
                <GitCommit className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-emerald-300 font-bold">{c.hash}</span>:{" "}
                  <span className="text-slate-300">{c.message}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex items-center gap-1">
            <button
              onClick={() => handleCreateBranch()}
              className="flex-1 rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:bg-slate-700 truncate"
            >
              + Feature Branch
            </button>
            <button
              onClick={handleMergeToMain}
              className="flex-1 rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:bg-slate-700 truncate"
            >
              Merge to Main
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-3 bg-slate-950 font-mono text-xs">
        <div className="h-28 overflow-y-auto space-y-1 text-slate-300">
          {cliLogs.map((log, i) => (
            <div key={i} className="whitespace-pre-wrap">{log}</div>
          ))}
        </div>

        {/* CLI Prompt */}
        <form onSubmit={handleCliSubmit} className="mt-2 flex items-center gap-2 border-t border-slate-800 pt-2">
          <Terminal className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-slate-400 select-none">$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="git status, git add ., git commit -m 'message', git switch -c feature/name"
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
          />
          <button type="submit" className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
