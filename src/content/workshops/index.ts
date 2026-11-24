import { Workshop, Chapter, GlossaryTerm, SyntaxReference } from "@/types/curriculum";
import { workshop1Python } from "./workshop1-python";
import { workshop2Git } from "./workshop2-git";
import {
  workshop3Scientific,
  workshop4ML,
  workshop5Autonomous,
} from "./locked-workshops";

// Modular Workshop Registry: Python (W1), Git/GitHub (W2), and Locked Advanced Workshops (W3+)
export const allWorkshops: readonly Workshop[] = [
  workshop1Python,
  workshop2Git,
  workshop3Scientific,
  workshop4ML,
  workshop5Autonomous,
];

export function getAllWorkshops(): readonly Workshop[] {
  return allWorkshops;
}

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return allWorkshops.find((w) => w.slug === slug);
}

export function getChapterBySlug(
  workshopSlug: string,
  chapterSlug: string
): { workshop: Workshop; chapter: Chapter; prevChapter?: Chapter; nextChapter?: Chapter } | undefined {
  const workshop = getWorkshopBySlug(workshopSlug);
  if (!workshop) return undefined;

  const chapterIndex = workshop.chapters.findIndex((c) => c.slug === chapterSlug);
  if (chapterIndex === -1) return undefined;

  const chapter = workshop.chapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? workshop.chapters[chapterIndex - 1] : undefined;
  const nextChapter =
    chapterIndex < workshop.chapters.length - 1
      ? workshop.chapters[chapterIndex + 1]
      : undefined;

  return { workshop, chapter, prevChapter, nextChapter };
}

export interface EnrichedGlossaryTerm extends GlossaryTerm {
  readonly workshopTitle: string;
  readonly workshopSlug: string;
  readonly chapterTitle: string;
  readonly chapterSlug: string;
}

export function getAllGlossaryTerms(): EnrichedGlossaryTerm[] {
  const terms: EnrichedGlossaryTerm[] = [];
  for (const w of allWorkshops) {
    for (const ch of w.chapters) {
      if (ch.recap && ch.recap.glossary) {
        for (const g of ch.recap.glossary) {
          terms.push({
            ...g,
            workshopTitle: w.title,
            workshopSlug: w.slug,
            chapterTitle: ch.title,
            chapterSlug: ch.slug,
          });
        }
      }
    }
  }
  return terms.sort((a, b) => a.term.localeCompare(b.term));
}

export interface EnrichedSyntaxReference extends SyntaxReference {
  readonly workshopTitle: string;
  readonly workshopSlug: string;
  readonly chapterTitle: string;
  readonly chapterSlug: string;
}

export function getAllSyntaxReferences(): EnrichedSyntaxReference[] {
  const list: EnrichedSyntaxReference[] = [];
  for (const w of allWorkshops) {
    for (const ch of w.chapters) {
      if (ch.recap && ch.recap.essentialSyntax) {
        for (const s of ch.recap.essentialSyntax) {
          list.push({
            ...s,
            workshopTitle: w.title,
            workshopSlug: w.slug,
            chapterTitle: ch.title,
            chapterSlug: ch.slug,
          });
        }
      }
    }
  }
  return list;
}

export interface EnrichedCommonMistake {
  readonly title: string;
  readonly content: string;
  readonly workshopTitle: string;
  readonly workshopSlug: string;
  readonly chapterTitle: string;
  readonly chapterSlug: string;
}

export function getAllCommonMistakes(): EnrichedCommonMistake[] {
  const list: EnrichedCommonMistake[] = [];
  for (const w of allWorkshops) {
    for (const ch of w.chapters) {
      for (const sec of ch.sections) {
        if (sec.callout && (sec.callout.type === "mistake" || sec.callout.type === "warning")) {
          list.push({
            title: sec.callout.title,
            content: sec.callout.content,
            workshopTitle: w.title,
            workshopSlug: w.slug,
            chapterTitle: ch.title,
            chapterSlug: ch.slug,
          });
        }
      }
    }
  }
  return list;
}

export interface SearchResult {
  readonly type: "chapter" | "concept" | "glossary" | "syntax";
  readonly title: string;
  readonly excerpt: string;
  readonly workshopSlug: string;
  readonly chapterSlug: string;
  readonly workshopTitle: string;
}

export function searchCurriculum(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const w of allWorkshops) {
    for (const ch of w.chapters) {
      // Check chapter title or intro
      if (ch.title.toLowerCase().includes(q) || ch.introduction.toLowerCase().includes(q)) {
        results.push({
          type: "chapter",
          title: `Chapter ${ch.number}: ${ch.title}`,
          excerpt: ch.introduction.slice(0, 160) + "...",
          workshopSlug: w.slug,
          chapterSlug: ch.slug,
          workshopTitle: w.title,
        });
      }

      // Check sections
      for (const s of ch.sections) {
        if (s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)) {
          results.push({
            type: "concept",
            title: s.title,
            excerpt: s.content.slice(0, 160) + "...",
            workshopSlug: w.slug,
            chapterSlug: ch.slug,
            workshopTitle: w.title,
          });
          break; // Avoid duplicate section spam per chapter
        }
      }

      // Check glossary
      if (ch.recap && ch.recap.glossary) {
        for (const g of ch.recap.glossary) {
          if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
            results.push({
              type: "glossary",
              title: `Glossary: ${g.term}`,
              excerpt: g.definition,
              workshopSlug: w.slug,
              chapterSlug: ch.slug,
              workshopTitle: w.title,
            });
          }
        }
      }
    }
  }

  return results.slice(0, 30);
}
