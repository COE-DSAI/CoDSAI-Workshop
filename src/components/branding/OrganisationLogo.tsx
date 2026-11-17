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

  // Dimensions based on context
  const dimensions = {
    header: { width: 180, height: 42 },
    footer: { width: 160, height: 38 },
    hero: { width: 240, height: 56 },
  }[variant];

  const currentSrc = useFallbackJpg
    ? BRANDING.logo.fallbackPath
    : BRANDING.logo.primaryPath;

  const handleImageError = () => {
    if (!useFallbackJpg) {
      // Try jpg fallback
      setUseFallbackJpg(true);
    } else {
      // Both png and jpg failed; show restrained neutral placeholder
      setImageError(true);
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative flex items-center justify-center overflow-hidden transition-all duration-150"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
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
          /* Restrained, neutral placeholder reserved for official asset */
          <div
            className={`flex h-full w-full flex-col items-center justify-center rounded border px-2 py-1 text-center select-none ${
              surface === "dark"
                ? "border-slate-700 bg-slate-800/60 text-slate-400"
                : "border-slate-300 bg-slate-50 text-slate-500"
            }`}
            title="Reserved slot for official Center of Excellence logo asset"
          >
            <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">
              Center of Excellence
            </span>
            <span className="text-[8px] font-mono tracking-tight text-slate-400">
              [ Official Logo Slot ]
            </span>
          </div>
        )}
      </div>

      {showTagline && (
        <div className="flex flex-col border-l border-slate-200 pl-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            {BRANDING.organisationLine1}
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            {BRANDING.organisationLine2}
          </span>
        </div>
      )}
    </div>
  );
}
