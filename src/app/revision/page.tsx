import React, { Suspense } from "react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";
import { RevisionHub } from "@/components/revision/RevisionHub";

export default function RevisionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <AppHeader />
      <main className="flex-1 py-6">
        <Suspense fallback={<div className="p-8 text-center text-xs text-[var(--text-muted)]">Loading revision hub</div>}>
          <RevisionHub />
        </Suspense>
      </main>
      <AppFooter />
    </div>
  );
}
