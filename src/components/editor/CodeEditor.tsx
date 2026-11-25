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
  ChevronDown,
  ChevronUp,
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
  initialCode = '# Write your Python code below\nprint("Hello from CoE | DSAI")\n',
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
    statusMessage,
    isRunning,
    outputItems,
    executionTimeMs,
    runCode,
    resetEnvironment,
    clearOutput,
  } = usePythonRuntime();

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
        backgroundColor: "#171519",
      },
      ".cm-gutters": {
        backgroundColor: "#121014",
        borderRight: "1px solid rgba(243, 239, 242, 0.08)",
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
  }, []);

  // Update editor document if parent loads a new snippet or exercise
  useEffect(() => {
    if (viewRef.current && initialCode !== currentCode) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: initialCode,
        },
      });
      setCurrentCode(initialCode);
      setTestResultStatus("none");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

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
  };

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
    <div className="flex h-full flex-col overflow-hidden bg-[var(--code-surface)] text-[var(--code-text)]">
      {/* Top Bar */}
      <div className="flex h-12 items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-chrome)] px-4 text-xs shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="h-4 w-4 text-[var(--code-secondary)] shrink-0" strokeWidth={1.5} />
          <span className="font-medium text-[var(--code-text)] truncate">{title}</span>
          <span className="hidden sm:inline font-mono text-[11px] tabular-nums text-[var(--code-muted)]">
            · Python 3.11
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowStdin(!showStdin)}
            className={`flex h-7 items-center gap-1 rounded-md border px-2 text-xs font-mono tabular-nums transition-colors duration-150 ${
              showStdin || stdinText.length > 0
                ? "border-[var(--code-border)] bg-[var(--code-raised)] text-[var(--code-text)]"
                : "border-transparent text-[var(--code-secondary)] hover:bg-[var(--code-raised)] hover:text-[var(--code-text)]"
            }`}
            title="Queued input() lines"
          >
            <span>stdin ({stdinText.split("\n").filter(Boolean).length})</span>
            {showStdin ? (
              <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyCode}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--code-secondary)] hover:bg-[var(--code-raised)] hover:text-[var(--code-text)] transition-colors duration-150"
            title="Copy code"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-[#4CC38A]" strokeWidth={1.5} />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={handleResetCode}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--code-secondary)] hover:bg-[var(--code-raised)] hover:text-[var(--code-text)] transition-colors duration-150"
            title="Reset code"
            aria-label="Reset code"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={handleExecute}
            disabled={isRunning}
            className={`flex h-7 items-center gap-1.5 rounded-md bg-[var(--code-text)] px-3 text-xs font-medium text-[var(--code-chrome)] transition-opacity duration-150 ${
              isRunning ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"
            }`}
          >
            <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>{isRunning ? "Running" : "Run"}</span>
          </button>
        </div>
      </div>

      {/* Queued STDIN */}
      {showStdin && (
        <div className="border-b border-[var(--code-border)] bg-[var(--code-chrome)] p-3 text-xs">
          <div className="flex items-center justify-between pb-2">
            <span className="font-medium text-[var(--code-text)]">Queued input (stdin)</span>
            <span className="text-[11px] text-[var(--code-muted)]">One line per input() call</span>
          </div>
          <textarea
            value={stdinText}
            onChange={(e) => setStdinText(e.target.value)}
            placeholder={"Line 1: first input()\nLine 2: second input()"}
            rows={3}
            className="w-full rounded-lg border border-[var(--code-border)] bg-[var(--code-raised)] p-2 font-mono text-xs text-[var(--code-text)] placeholder-[var(--code-muted)] focus:border-[var(--code-secondary)] focus:outline-none"
          />
        </div>
      )}

      {/* CodeMirror Surface */}
      <div className="relative min-h-[240px] flex-1 overflow-auto bg-[var(--code-surface)]">
        <div ref={editorContainerRef} className="h-full" />
      </div>

      {/* Hints & Solution */}
      {hints && (
        <div className="border-t border-[var(--code-border)] bg-[var(--code-chrome)] px-4 py-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--code-secondary)]">
              <HelpCircle className="h-4 w-4 text-[var(--code-muted)]" strokeWidth={1.5} />
              <span>Hints</span>
            </span>
            <div className="flex items-center gap-1">
              {(["Concept", "Approach", "Detail"] as const).map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveHintIndex(activeHintIndex === idx ? -1 : idx)}
                  className={`h-6 rounded px-2 text-[11px] font-mono tabular-nums transition-colors duration-150 ${
                    activeHintIndex === idx
                      ? "bg-[var(--code-raised)] text-[#FBBF24] border border-[#FBBF24]/30"
                      : "bg-[var(--code-surface)] text-[var(--code-secondary)] hover:text-[var(--code-text)]"
                  }`}
                >
                  {idx + 1}. {label}
                </button>
              ))}
              {solution && (
                <button
                  type="button"
                  onClick={() => setShowSolution(!showSolution)}
                  className={`h-6 rounded px-2 text-[11px] font-mono transition-colors duration-150 ${
                    showSolution
                      ? "bg-[#15251C] text-[#4CC38A] border border-[#4CC38A]/30"
                      : "bg-[var(--code-surface)] text-[var(--code-secondary)] hover:text-[var(--code-text)]"
                  }`}
                >
                  Solution
                </button>
              )}
            </div>
          </div>

          {activeHintIndex >= 0 && (
            <div className="mt-2 rounded-lg bg-[var(--code-raised)] p-3 text-xs text-[var(--code-text)] border border-[var(--code-border)]">
              <span className="font-mono text-[#FBBF24] mr-2">Hint {activeHintIndex + 1}</span>
              {hints[activeHintIndex]}
            </div>
          )}

          {showSolution && solution && (
            <div className="mt-2 rounded-lg bg-[var(--code-raised)] p-3 text-xs border border-[var(--code-border)]">
              <div className="flex items-center justify-between pb-2">
                <span className="font-medium text-[#4CC38A]">Reference solution</span>
                <button
                  type="button"
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
                  className="rounded border border-[var(--code-border)] bg-[var(--code-surface)] px-2 py-0.5 text-[11px] text-[var(--code-text)] hover:bg-[var(--accent)]"
                >
                  Insert into editor
                </button>
              </div>
              <pre className="overflow-x-auto rounded bg-[var(--code-chrome)] p-2 font-mono text-xs text-[#4CC38A]">
                {solution}
              </pre>
              {solutionExplanation && (
                <p className="mt-2 text-xs text-[var(--code-secondary)] leading-relaxed">
                  {solutionExplanation}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Output Console */}
      <div className="flex flex-col border-t border-[var(--code-border)] bg-[var(--code-chrome)]">
        <div className="flex h-9 items-center justify-between border-b border-[var(--code-border)] px-4 text-xs text-[var(--code-secondary)]">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[var(--code-text)]">Console</span>
            {executionTimeMs !== null && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] tabular-nums text-[var(--code-muted)]">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>{executionTimeMs}ms</span>
              </span>
            )}
            {testResultStatus === "passed" && (
              <span className="inline-flex items-center gap-1 rounded border border-[#4CC38A]/30 bg-[#4CC38A]/10 px-2 py-0.5 text-[11px] font-medium text-[#4CC38A]">
                <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span>Tests passed</span>
              </span>
            )}
            {testResultStatus === "failed" && (
              <span className="rounded border border-[#E5484D]/30 bg-[#E5484D]/10 px-2 py-0.5 text-[11px] font-medium text-[#FCA5A5]">
                Output mismatch
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--code-muted)]">{statusMessage}</span>
            <button
              type="button"
              onClick={clearOutput}
              className="flex h-6 w-6 items-center justify-center rounded text-[var(--code-muted)] hover:text-[var(--code-text)]"
              title="Clear console"
              aria-label="Clear console"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={resetEnvironment}
              className="flex h-6 w-6 items-center justify-center rounded text-[var(--code-muted)] hover:text-[#FCA5A5]"
              title="Reset Python runtime"
              aria-label="Reset Python runtime"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="h-36 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {outputItems.length === 0 ? (
            <div className="text-[var(--code-muted)] select-none">
              Run code to view output
            </div>
          ) : (
            outputItems.map((item) => (
              <pre
                key={item.id}
                className={`whitespace-pre-wrap font-mono ${
                  item.type === "stderr"
                    ? "text-[#FCA5A5]"
                    : item.type === "system"
                    ? "text-[var(--code-secondary)]"
                    : "text-[var(--code-text)]"
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
