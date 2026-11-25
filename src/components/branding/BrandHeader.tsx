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
      className={`group flex items-center gap-2 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`}
      title={BRANDING.organisationName}
    >
      <OrganisationLogo variant={compact ? "header" : "header"} />
    </Link>
  );
}
