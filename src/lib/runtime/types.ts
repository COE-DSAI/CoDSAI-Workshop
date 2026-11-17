/**
 * Python Runtime & Web Worker Communication Protocol
 * Center of Excellence: Data Science & Artificial Intelligence
 */

export type WorkerInMessage =
  | {
      readonly type: "init";
      readonly packages?: readonly string[];
    }
  | {
      readonly type: "run";
      readonly code: string;
      readonly stdinLines?: readonly string[];
      readonly executionId: string;
    };

export type WorkerOutMessage =
  | {
      readonly type: "status";
      readonly status: "loading-runtime" | "ready" | "running" | "loading-packages";
      readonly message?: string;
    }
  | {
      readonly type: "stdout";
      readonly text: string;
      readonly executionId: string;
    }
  | {
      readonly type: "stderr";
      readonly text: string;
      readonly executionId: string;
    }
  | {
      readonly type: "complete";
      readonly executionId: string;
      readonly executionTimeMs: number;
    }
  | {
      readonly type: "error";
      readonly executionId: string;
      readonly error: string;
      readonly errorType?: string;
    };

export interface ExecutionResult {
  readonly output: readonly {
    readonly type: "stdout" | "stderr" | "system";
    readonly text: string;
  }[];
  readonly executionTimeMs: number;
  readonly isError: boolean;
}
