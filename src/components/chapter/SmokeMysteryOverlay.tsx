"use client";

import React from "react";
import { Lock } from "lucide-react";

interface SmokeMysteryOverlayProps {
  workshopNumber?: number;
  workshopTitle?: string;
  variant?: "sidebar" | "full";
}

export function SmokeMysteryOverlay({
  workshopNumber,
  variant = "sidebar",
}: SmokeMysteryOverlayProps) {
  const formattedNumber = String(workshopNumber || 3).padStart(2, "0");

  if (variant === "sidebar") {
    return (
      <div className="my-2 flex items-center justify-between rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] px-3 py-2 text-xs text-[var(--text-muted)]">
        <span className="font-mono tabular-nums">Workshop {formattedNumber}</span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>Locked</span>
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-raised)] text-[var(--text-muted)]">
        <Lock className="h-4 w-4" strokeWidth={1.5} />
      </div>

      <p className="mt-4 font-mono text-xs tabular-nums text-[var(--text-muted)]">
        Workshop {formattedNumber}
      </p>

      <h3 className="mt-1 text-base font-medium text-[var(--text-primary)]">
        Module locked
      </h3>

      <p className="mt-2 mx-auto max-w-md text-xs text-[var(--text-secondary)] leading-relaxed">
        This track opens after completing the prerequisite Python and Git modules.
      </p>
    </div>
  );
}
