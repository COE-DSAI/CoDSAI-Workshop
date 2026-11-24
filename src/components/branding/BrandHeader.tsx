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
      className={`group flex items-center gap-2 rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#541F4A] ${className}`}
      title={BRANDING.organisationName}
    >
      <OrganisationLogo variant={compact ? "header" : "header"} />
    </Link>
  );
}
