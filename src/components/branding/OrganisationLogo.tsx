"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRANDING } from "@/lib/branding";

interface OrganisationLogoProps {
  variant?: "header" | "footer" | "hero";
  surface?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
}

export function OrganisationLogo({
  variant = "header",
  surface = "light",
  className = "",
  showTagline = false,
}: OrganisationLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [useFallbackPath, setUseFallbackPath] = useState(false);

  const dimensions = {
    header: { width: 160, height: 36 },
    footer: { width: 148, height: 32 },
    hero: { width: 208, height: 44 },
  }[variant];

  const currentSrc = useFallbackPath
    ? BRANDING.logo.fallbackPath
    : BRANDING.logo.primaryPath;

  const handleImageError = () => {
    if (!useFallbackPath) {
      setUseFallbackPath(true);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 transition-opacity duration-150 ease-[var(--ease-out)]"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
        title={`${BRANDING.organisationName} (${BRANDING.organisationShort})`}
      >
        {!imageError ? (
          <Image
            src={currentSrc}
            alt={BRANDING.logo.altText}
            width={dimensions.width}
            height={dimensions.height}
            priority={variant === "header"}
            className="h-full w-auto object-contain"
            onError={handleImageError}
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center rounded-lg px-3 select-none ${
              surface === "dark"
                ? "border border-[var(--code-border)] bg-[var(--code-raised)] text-[var(--code-text)]"
                : "border border-[var(--border-hairline)] bg-[var(--bg-raised)] text-[var(--accent)]"
            }`}
            title={BRANDING.organisationShort}
            aria-label={`Official ${BRANDING.organisationShort} Logo`}
          >
            <span className="text-base font-semibold tracking-[-0.01em]">
              {BRANDING.organisationShort}
            </span>
          </div>
        )}
      </div>

      {showTagline && (
        <div className="flex flex-col border-l border-[var(--border-hairline)] pl-3">
          <span className="text-xs font-medium text-[var(--text-primary)]">
            {BRANDING.organisationLine1}
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            {BRANDING.organisationLine2}
          </span>
        </div>
      )}
    </div>
  );
}
