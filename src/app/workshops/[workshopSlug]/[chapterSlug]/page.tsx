import React from "react";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/navigation/AppHeader";
import { ChapterExperienceView } from "@/components/chapter/ChapterExperienceView";
import { getChapterBySlug, getAllWorkshops } from "@/content/workshops";

export async function generateStaticParams() {
  const workshops = getAllWorkshops();
  const params: { workshopSlug: string; chapterSlug: string }[] = [];

  for (const w of workshops) {
    for (const ch of w.chapters) {
      params.push({
        workshopSlug: w.slug,
        chapterSlug: ch.slug,
      });
    }
  }

  return params;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ workshopSlug: string; chapterSlug: string }>;
}) {
  const { workshopSlug, chapterSlug } = await params;
  const lookup = getChapterBySlug(workshopSlug, chapterSlug);

  if (!lookup) {
    notFound();
  }

  const { workshop, chapter, prevChapter, nextChapter } = lookup;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-page)]">
      <AppHeader />
      <ChapterExperienceView
        workshop={workshop}
        chapter={chapter}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />
    </div>
  );
}
