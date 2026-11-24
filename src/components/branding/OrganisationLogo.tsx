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

  // Proportions matching the official horizontal brand asset (405x88)
  const dimensions = {
    header: { width: 175, height: 38 },
    footer: { width: 156, height: 34 },
    hero: { width: 220, height: 48 },
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
            className={`flex h-full w-full items-center justify-center rounded px-2.5 select-none ${
              surface === "dark"
                ? "border border-slate-700 bg-slate-800 text-slate-300"
                : "border border-[#EADCE8] bg-[#FBF5FA] text-[#541F4A] shadow-2xs"
            }`}
            title={BRANDING.organisationShort}
            aria-label={`Official ${BRANDING.organisationShort} Logo`}
          >
            <span className="text-sm font-bold tracking-tight text-[#541F4A]">
              {BRANDING.organisationShort}
            </span>
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
