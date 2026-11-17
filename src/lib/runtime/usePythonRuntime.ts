"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { WorkerInMessage, WorkerOutMessage } from "./types";

export interface ConsoleOutputItem {
  readonly id: string;
  readonly type: "stdout" | "stderr" | "system";
  readonly text: string;
}

export interface UsePythonRuntimeOptions {
  readonly initialPackages?: readonly string[];
}

export function usePythonRuntime(options: UsePythonRuntimeOptions = {}) {
  const [status, setStatus] = useState<
    "idle" | "loading-runtime" | "loading-packages" | "running" | "ready"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Click 'Run' to execute");
  const [outputItems, setOutputItems] = useState<ConsoleOutputItem[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const workerRef = useRef<Worker | null>(null);
  const executionCounterRef = useRef<number>(0);
  const currentExecutionIdRef = useRef<string | null>(null);

  // Initialize or recreate Web Worker
  const getOrCreateWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;

    const worker = new Worker("/workers/python.worker.js");
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerOutMessage>) => {
      const msg = event.data;
      if (!msg) return;

      switch (msg.type) {
        case "status":
          setStatus(msg.status);
          if (msg.message) setStatusMessage(msg.message);
          if (msg.status === "running") {
            setIsRunning(true);
          } else if (msg.status === "ready") {
            setIsRunning(false);
          }
          break;

        case "stdout":
          setOutputItems((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              type: "stdout",
              text: msg.text,
            },
          ]);
          break;

        case "stderr":
          setOutputItems((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              type: "stderr",
              text: msg.text,
            },
          ]);
          break;

        case "error":
          setIsRunning(false);
          setStatus("ready");
          setStatusMessage("Execution stopped with error");
          setOutputItems((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              type: "stderr",
              text: `\n[Python Error]: ${msg.error}\n`,
            },
          ]);
          break;

        case "complete":
          setIsRunning(false);
          setStatus("ready");
          setExecutionTimeMs(msg.executionTimeMs);
          break;
      }
    };

    worker.onerror = (err) => {
      setIsRunning(false);
      setStatus("ready");
      setStatusMessage("Worker crashed");
      setOutputItems((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          type: "system",
          text: `\n[Worker Error]: ${err.message || "Failed to execute worker script"}\n`,
        },
      ]);
    };

    return worker;
  }, []);

  const runCode = useCallback(
    (code: string, stdinLines: string[] = []) => {
      const worker = getOrCreateWorker();
      executionCounterRef.current += 1;
      const executionId = `exec-${executionCounterRef.current}`;
      currentExecutionIdRef.current = executionId;

      setOutputItems([]);
      setExecutionTimeMs(null);
      setIsRunning(true);
      setStatus("running");
      setStatusMessage("Executing...");

      const message: WorkerInMessage = {
        type: "run",
        code,
        stdinLines,
        executionId,
      };

      worker.postMessage(message);
    },
    [getOrCreateWorker]
  );

  const resetEnvironment = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsRunning(false);
    setStatus("idle");
    setStatusMessage("Runtime reset. Ready to run.");
    setOutputItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type: "system",
        text: "[System]: Python runtime environment has been reset.\n",
      },
    ]);
  }, []);

  const clearOutput = useCallback(() => {
    setOutputItems([]);
    setExecutionTimeMs(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  return {
    status,
    statusMessage,
    isRunning,
    outputItems,
    executionTimeMs,
    runCode,
    resetEnvironment,
    clearOutput,
  };
}
