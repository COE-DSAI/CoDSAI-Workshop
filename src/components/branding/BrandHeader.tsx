import React from "react";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { OrganisationLogo } from "./OrganisationLogo";

interface BrandHeaderProps {
  compact?: boolean;
  className?: string;
}

export function BrandHeader({ compact = false, className = "" }: BrandHeaderProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1 ${className}`}
    >
      <OrganisationLogo variant={compact ? "header" : "header"} />

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-blue-600 transition-colors">
            {BRANDING.organisationLine1}
          </span>
        </div>
        <span className="text-[11px] font-semibold tracking-wide text-slate-700">
          {BRANDING.organisationLine2}
        </span>
        {!compact && (
          <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
            {BRANDING.programmeTitle}
          </span>
        )}
      </div>
    </Link>
  );
}
