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
  const [useFallbackJpg, setUseFallbackJpg] = useState(false);

  // Proportions matching the reserved official asset slot
  const dimensions = {
    header: { width: 36, height: 36 },
    footer: { width: 32, height: 32 },
    hero: { width: 44, height: 44 },
  }[variant];

  const currentSrc = useFallbackJpg
    ? BRANDING.logo.fallbackPath
    : BRANDING.logo.primaryPath;

  const handleImageError = () => {
    if (!useFallbackJpg) {
      setUseFallbackJpg(true);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0 transition-all duration-150"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
        title="Center of Excellence: Data Science & Artificial Intelligence"
      >
        {!imageError ? (
          <Image
            src={currentSrc}
            alt={BRANDING.logo.altText}
            width={dimensions.width}
            height={dimensions.height}
            priority={variant === "header"}
            className="h-full w-full object-contain"
            onError={handleImageError}
          />
        ) : (
          /* Restrained, discreet architectural placeholder reserved for official asset */
          <div
            className={`flex h-full w-full items-center justify-center rounded border transition-colors select-none ${
              surface === "dark"
                ? "border-slate-700 bg-slate-800 text-slate-300"
                : "border-slate-300/80 bg-slate-100 text-slate-700 shadow-2xs"
            }`}
            title="Reserved slot for /branding/center-of-excellence-logo.png"
            aria-label="Official Center of Excellence Logo Slot"
          >
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-[10px] font-bold tracking-tight font-mono text-slate-800">
                CoE
              </span>
              <span className="text-[7px] font-mono tracking-tighter text-blue-600 font-semibold">
                DSAI
              </span>
            </div>
          </div>
        )}
      </div>

      {showTagline && (
        <div className="flex flex-col border-l border-slate-200 pl-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            {BRANDING.organisationLine1}
          </span>
          <span className="text-[10px] font-medium tracking-wide text-slate-500">
            {BRANDING.organisationLine2}
          </span>
        </div>
      )}
    </div>
  );
}
