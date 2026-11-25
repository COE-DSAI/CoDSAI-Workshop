import React from "react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { InboxGuardianPage } from "@/components/projects/InboxGuardianPage";

export default function DedicatedInboxGuardianPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />
      <main className="flex-1 py-6">
        <InboxGuardianPage />
      </main>
      <AppFooter />
    </div>
  );
}
