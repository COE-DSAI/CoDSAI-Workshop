import React from "react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { FacilitatorWorkbench } from "@/components/facilitator/FacilitatorWorkbench";

export default function FacilitatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />
      <main className="flex-1">
        <FacilitatorWorkbench />
      </main>
      <AppFooter />
    </div>
  );
}
