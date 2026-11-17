"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  Play,
  RotateCcw,
  Trash2,
  Copy,
  Check,
  Terminal,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  HelpCircle,
} from "lucide-react";
import { usePythonRuntime } from "@/lib/runtime/usePythonRuntime";
import { ExerciseTestCase } from "@/types/curriculum";

interface CodeEditorProps {
  initialCode?: string;
  testCases?: readonly ExerciseTestCase[];
  onCodeChange?: (code: string) => void;
  title?: string;
  onSuccess?: () => void;
  hints?: readonly [string, string, string];
  solution?: string;
  solutionExplanation?: string;
}

export function CodeEditor({
  initialCode = '# Write your Python code below\nprint("Hello from Center of Excellence!")\n',
  testCases,
  onCodeChange,
  title = "Python Workspace",
  onSuccess,
  hints,
  solution,
  solutionExplanation,
}: CodeEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [showStdin, setShowStdin] = useState(false);
  const [stdinText, setStdinText] = useState("");
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [testResultStatus, setTestResultStatus] = useState<"none" | "passed" | "failed">("none");

  const {
    status,
    statusMessage,
    isRunning,
    outputItems,
    executionTimeMs,
    runCode,
    resetEnvironment,
    clearOutput,
  } = usePythonRuntime();

  // Initialize CodeMirror 6
  useEffect(() => {
    if (!editorContainerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const newDoc = update.state.doc.toString();
        setCurrentCode(newDoc);
        onCodeChange?.(newDoc);
      }
    });

    const customTheme = EditorView.theme({
      "&": {
        height: "100%",
        fontSize: "13px",
      },
      ".cm-scroller": {
        fontFamily: "var(--font-mono)",
        lineHeight: "1.6",
      },
      "&.cm-focused": {
        outline: "none",
      },
    });

    const startState = EditorState.create({
      doc: initialCode,
      extensions: [
        basicSetup,
        python(),
        oneDark,
        customTheme,
        updateListener,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorContainerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); // Run once on mount

  // Sync external initialCode change if reset
  const handleResetCode = useCallback(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: initialCode,
        },
      });
      setCurrentCode(initialCode);
      onCodeChange?.(initialCode);
      clearOutput();
      setTestResultStatus("none");
    }
  }, [initialCode, onCodeChange, clearOutput]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleExecute = () => {
    const lines = stdinText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    runCode(currentCode, lines);

    // If test cases exist, evaluate output after running
    if (testCases && testCases.length > 0) {
      // Evaluate asynchronously on output completion
      setTimeout(() => {
        // Will check test output matching
      }, 500);
    }
  };

  // Check test cases when output items update
  useEffect(() => {
    if (!testCases || testCases.length === 0 || isRunning) return;
    if (outputItems.length === 0) return;

    const fullStdout = outputItems
      .filter((o) => o.type === "stdout")
      .map((o) => o.text)
      .join("")
      .trim();

    if (!fullStdout) return;

    const allPassed = testCases.every((tc) => {
      const target = tc.expectedOutputSnippet.trim();
      return fullStdout.includes(target);
    });

    if (allPassed) {
      setTestResultStatus("passed");
      onSuccess?.();
    } else {
      setTestResultStatus("failed");
    }
  }, [outputItems, isRunning, testCases, onSuccess]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-slate-100 shadow-md">
      {/* Top Header / Action Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span className="font-semibold text-slate-200">{title}</span>
          <span className="flex items-center gap-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
            <Cpu className="h-2.5 w-2.5 text-emerald-400" />
            Python 3.11
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition-colors ${
              showStdin || stdinText.length > 0
                ? "bg-blue-900/60 text-blue-200 border border-blue-700"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
            title="Configure queued input() lines for interactive programs"
          >
            <span>Input ({stdinText.split("\n").filter(Boolean).length})</span>
            {showStdin ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          <button
            onClick={handleCopyCode}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={handleResetCode}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Reset code to starter template"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleExecute}
            disabled={isRunning}
            className={`flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1 font-semibold text-white shadow-xs transition-colors ${
              isRunning ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-500 active:bg-blue-700"
            }`}
          >
            <Play className={`h-3 w-3 fill-white ${isRunning ? "animate-pulse" : ""}`} />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Queued STDIN Drawer */}
      {showStdin && (
        <div className="border-b border-slate-800 bg-slate-950/90 p-2.5 text-xs">
          <div className="flex items-center justify-between pb-1.5">
            <span className="font-semibold text-slate-300">Queued Program Input (stdin)</span>
            <span className="text-[10px] text-slate-400">One line per input() call</span>
          </div>
          <textarea
            value={stdinText}
            onChange={(e) => setStdinText(e.target.value)}
            placeholder="Line 1: first input()&#10;Line 2: second input()&#10;Line 3: third input()"
            rows={3}
            className="w-full rounded border border-slate-700 bg-slate-900 p-2 font-mono text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-[10px] text-slate-400">
            Note: When your Python code calls <code className="text-blue-300">input()</code>, lines are consumed sequentially from this queue.
          </p>
        </div>
      )}

      {/* Code Editor Surface */}
      <div className="relative min-h-[260px] flex-1 overflow-auto bg-[#282c34]">
        <div ref={editorContainerRef} className="h-full" />
      </div>

      {/* Progressive Hints & Solution Panel (if provided for exercise) */}
      {hints && (
        <div className="border-t border-slate-800 bg-slate-950 px-3 py-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium text-slate-300">
              <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
              Need Help?
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveHintIndex(activeHintIndex === 0 ? -1 : 0)}
                className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  activeHintIndex >= 0 ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Hint 1: Concept
              </button>
              <button
                onClick={() => setActiveHintIndex(activeHintIndex === 1 ? -1 : 1)}
                className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  activeHintIndex >= 1 ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Hint 2: Approach
              </button>
              <button
                onClick={() => setActiveHintIndex(activeHintIndex === 2 ? -1 : 2)}
                className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  activeHintIndex >= 2 ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Hint 3: Detail
              </button>
              {solution && (
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                    showSolution ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Solution
                </button>
              )}
            </div>
          </div>

          {activeHintIndex >= 0 && (
            <div className="mt-2 rounded bg-amber-950/40 p-2 text-xs text-amber-200 border border-amber-800/60">
              <span className="font-semibold">Hint {activeHintIndex + 1}: </span>
              {hints[activeHintIndex]}
            </div>
          )}

          {showSolution && solution && (
            <div className="mt-2 rounded bg-emerald-950/40 p-2.5 text-xs text-emerald-200 border border-emerald-800/60">
              <div className="flex items-center justify-between pb-1">
                <span className="font-semibold text-emerald-300">Reference Solution</span>
                <button
                  onClick={() => {
                    if (viewRef.current) {
                      viewRef.current.dispatch({
                        changes: {
                          from: 0,
                          to: viewRef.current.state.doc.length,
                          insert: solution,
                        },
                      });
                    }
                  }}
                  className="rounded bg-emerald-800 px-2 py-0.5 text-[10px] text-white hover:bg-emerald-700"
                >
                  Insert Solution into Editor
                </button>
              </div>
              <pre className="mt-1 overflow-x-auto rounded bg-slate-900 p-2 font-mono text-[11px] text-emerald-300">
                {solution}
              </pre>
              {solutionExplanation && (
                <p className="mt-2 text-[11px] text-emerald-300/90 leading-relaxed">
                  {solutionExplanation}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Output Console */}
      <div className="flex flex-col border-t border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-3 py-1.5 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">Console Output</span>
            {executionTimeMs !== null && (
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Clock className="h-3 w-3" />
                {executionTimeMs}ms
              </span>
            )}
            {testResultStatus === "passed" && (
              <span className="flex items-center gap-1 rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
                <Check className="h-2.5 w-2.5" />
                Tests Passed!
              </span>
            )}
            {testResultStatus === "failed" && (
              <span className="rounded bg-rose-950 px-1.5 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-800">
                Output Mismatch
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">{statusMessage}</span>
            <button
              onClick={clearOutput}
              className="rounded p-1 text-slate-500 hover:text-slate-300"
              title="Clear console output"
            >
              <Trash2 className="h-3 w-3" />
            </button>
            <button
              onClick={resetEnvironment}
              className="rounded p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50"
              title="Terminate worker & reset Python environment"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Scrollable console stream */}
        <div className="h-36 overflow-y-auto p-3 font-mono text-xs leading-relaxed">
          {outputItems.length === 0 ? (
            <div className="text-slate-600 italic select-none">
              Console output will appear here after clicking 'Run'...
            </div>
          ) : (
            outputItems.map((item) => (
              <pre
                key={item.id}
                className={`whitespace-pre-wrap font-mono ${
                  item.type === "stderr"
                    ? "text-rose-400"
                    : item.type === "system"
                    ? "text-blue-400 font-semibold"
                    : "text-slate-200"
                }`}
              >
                {item.text}
              </pre>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
