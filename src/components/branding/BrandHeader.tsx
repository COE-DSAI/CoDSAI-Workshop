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
      className={`group flex items-center gap-3 rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${className}`}
      title={BRANDING.organisationName}
    >
      <OrganisationLogo variant={compact ? "header" : "header"} />

      <div className="flex flex-col leading-tight">
        <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider text-slate-900 group-hover:text-blue-600 transition-colors">
          {BRANDING.organisationLine1}
        </span>
        <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-slate-500">
          {BRANDING.organisationLine2}
        </span>
      </div>
    </Link>
  );
}
