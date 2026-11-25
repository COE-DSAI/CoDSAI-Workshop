import React from "react";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <OrganisationLogo variant="footer" />
            </div>

            <p className="mt-3 text-xs font-medium text-[var(--text-primary)]">
              {BRANDING.programmeTitle}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] max-w-md">
              Interactive curriculum for Workshop 01 (Python Foundations) and Workshop 02 (Git &amp; GitHub), built for live instructor delivery, guided practice, and the Inbox Guardian capstone.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-[var(--text-primary)]">
              Workshop 01 chapters
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <Link href="/workshops/python-foundations/introduction-to-python" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">01</span>
                  Introduction to Python
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/variables-data-types-and-io" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">02</span>
                  Variables &amp; data types
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/strings-and-text-processing" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">03</span>
                  Strings &amp; text processing
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/conditional-logic" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">04</span>
                  Conditional logic
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/loops-and-repetition" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">05</span>
                  Loops &amp; repetition
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/collections-lists-and-dictionaries" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">06</span>
                  Collections: lists &amp; dicts
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/functions-and-code-organisation" className="hover:text-[var(--accent)] transition-colors duration-150">
                  <span className="font-mono tabular-nums text-[var(--text-muted)] mr-2">07</span>
                  Functions &amp; organisation
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/capstone-inbox-guardian" className="hover:text-[var(--accent)] transition-colors duration-150 font-medium text-[var(--text-primary)]">
                  <span className="font-mono tabular-nums text-[var(--accent)] mr-2">08</span>
                  Capstone: Inbox Guardian
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-[var(--text-primary)]">
              Workshops &amp; reference
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <Link href="/workshops/git-github" className="hover:text-[var(--accent)] transition-colors duration-150">
                  Workshop 02: Git &amp; GitHub
                </Link>
              </li>
              <li>
                <Link href="/projects/inbox-guardian" className="hover:text-[var(--accent)] transition-colors duration-150 font-medium text-[var(--text-primary)]">
                  Inbox Guardian workspace
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations" className="hover:text-[var(--accent)] transition-colors duration-150">
                  Python syllabus
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-[var(--accent)] transition-colors duration-150">
                  Revision hub &amp; glossary
                </Link>
              </li>
              <li>
                <Link href="/revision?tab=syntax" className="hover:text-[var(--accent)] transition-colors duration-150">
                  Python syntax reference
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[var(--accent)] transition-colors duration-150">
                  Progress dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border-hairline)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)]">
          <p>
            {BRANDING.organisationName} ({BRANDING.organisationShort})
          </p>
          <div className="mt-2 sm:mt-0 flex items-center gap-3">
            <span>Student &amp; workshop learning portal</span>
            <span className="text-[var(--border-strong)]">·</span>
            <Link
              href="/admin"
              className="hover:text-[var(--text-primary)] transition-colors duration-150 underline-offset-2 hover:underline"
              title="Restricted staff and facilitator access"
            >
              Staff portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
