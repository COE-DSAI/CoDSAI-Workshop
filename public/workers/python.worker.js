/**
 * Dedicated Python Web Worker via Pyodide WebAssembly
 * Center of Excellence: Data Science & Artificial Intelligence
 */

/* global importScripts, loadPyodide, postMessage */

let pyodideInstance = null;
let isLoading = false;
let stdinQueue = [];
let currentExecutionId = null;

async function initPyodide(packages = []) {
  if (pyodideInstance) return pyodideInstance;
  if (isLoading) {
    while (isLoading) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return pyodideInstance;
  }

  isLoading = true;
  postMessage({
    type: "status",
    status: "loading-runtime",
    message: "Initializing Python WebAssembly runtime (Pyodide)...",
  });

  try {
    importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");
    pyodideInstance = await loadPyodide({
      stdout: (text) => {
        postMessage({
          type: "stdout",
          text: text + "\n",
          executionId: currentExecutionId,
        });
      },
      stderr: (text) => {
        postMessage({
          type: "stderr",
          text: text + "\n",
          executionId: currentExecutionId,
        });
      },
    });

    // Configure standard input handling
    pyodideInstance.setStdin({
      stdin: () => {
        if (stdinQueue.length > 0) {
          const nextVal = stdinQueue.shift();
          // Echo input to stdout for realistic console feel
          postMessage({
            type: "stdout",
            text: nextVal + "\n",
            executionId: currentExecutionId,
          });
          return nextVal + "\n";
        }
        // When input is exhausted, throw informative error for Python
        throw new Error(
          "EOFError: input() requested user input, but no queued input was available in the 'Program Input' panel. Please provide input lines before running."
        );
      },
    });

    if (packages && packages.length > 0) {
      postMessage({
        type: "status",
        status: "loading-packages",
        message: `Loading packages: ${packages.join(", ")}...`,
      });
      await pyodideInstance.loadPackage(packages);
    }

    isLoading = false;
    postMessage({
      type: "status",
      status: "ready",
      message: "Python 3 runtime ready",
    });

    return pyodideInstance;
  } catch (err) {
    isLoading = false;
    postMessage({
      type: "error",
      error: "Failed to initialize Pyodide runtime: " + (err.message || String(err)),
      executionId: "init",
    });
    throw err;
  }
}

self.onmessage = async (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === "init") {
    try {
      await initPyodide(data.packages || []);
    } catch {
      // Handled in initPyodide
    }
    return;
  }

  if (data.type === "run") {
    currentExecutionId = data.executionId;
    stdinQueue = Array.isArray(data.stdinLines) ? [...data.stdinLines] : [];

    postMessage({
      type: "status",
      status: "running",
      message: "Running code...",
    });

    const startTime = performance.now();

    try {
      const py = await initPyodide();

      // Clear previous locals/globals clean namespace or run in fresh dict
      await py.runPythonAsync(data.code);

      const endTime = performance.now();
      postMessage({
        type: "complete",
        executionId: currentExecutionId,
        executionTimeMs: Math.round(endTime - startTime),
      });
      postMessage({
        type: "status",
        status: "ready",
        message: "Execution finished",
      });
    } catch (err) {
      const endTime = performance.now();
      const rawError = err.message || String(err);
      
      // Clean up common Pyodide Python traceback wrappers for educational clarity
      postMessage({
        type: "error",
        executionId: currentExecutionId,
        error: rawError,
      });
      postMessage({
        type: "complete",
        executionId: currentExecutionId,
        executionTimeMs: Math.round(endTime - startTime),
      });
      postMessage({
        type: "status",
        status: "ready",
        message: "Execution completed with errors",
      });
    }
  }
};
