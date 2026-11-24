import React from "react";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Col 1 & 2: Brand Identity */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <OrganisationLogo variant="footer" />
            </div>

            <p className="mt-3 text-xs text-slate-500 font-medium">
              {BRANDING.programmeTitle}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-md">
              Official interactive learning platform for Workshop 1: Python Foundations. Built for live instructor delivery, independent practice, comprehensive revision, and rule-based security capstone engineering.
            </p>
          </div>

          {/* Col 3: Workshop 1 Chapters */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Curriculum (8 Chapters)
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>
                <Link href="/workshops/python-foundations/introduction-to-python" className="hover:text-blue-600 transition-colors">
                  01. Introduction to Python
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/variables-data-types-and-io" className="hover:text-blue-600 transition-colors">
                  02. Variables & Data Types
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/strings-and-text-processing" className="hover:text-blue-600 transition-colors">
                  03. Strings & Text Processing
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/conditional-logic" className="hover:text-blue-600 transition-colors">
                  04. Conditional Logic
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/loops-and-repetition" className="hover:text-blue-600 transition-colors">
                  05. Loops & Repetition
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/collections-lists-and-dictionaries" className="hover:text-blue-600 transition-colors">
                  06. Collections: Lists & Dicts
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/functions-and-code-organisation" className="hover:text-blue-600 transition-colors">
                  07. Functions & Organisation
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/capstone-inbox-guardian" className="hover:text-blue-600 transition-colors font-medium text-slate-900">
                  08. Capstone: Inbox Guardian
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Learning Resources
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>
                <Link href="/projects/inbox-guardian" className="hover:text-blue-600 transition-colors font-medium text-slate-900">
                  Inbox Guardian Project
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations" className="hover:text-blue-600 transition-colors">
                  Workshop Overview & Timetable
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-blue-600 transition-colors">
                  Revision Hub & Glossary
                </Link>
              </li>
              <li>
                <Link href="/revision?tab=syntax" className="hover:text-blue-600 transition-colors">
                  Python Syntax Reference
                </Link>
              </li>
              <li>
                <Link href="/revision?tab=mistakes" className="hover:text-blue-600 transition-colors">
                  Common Mistakes & Fixes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>
            Official curriculum of {BRANDING.organisationName} ({BRANDING.organisationShort}).
          </p>
          <div className="mt-2 sm:mt-0 flex items-center gap-3">
            <span>Educational resource for students and workshop attendees.</span>
            <span className="text-slate-300">•</span>
            <Link
              href="/admin"
              className="text-slate-400 hover:text-slate-600 transition-colors underline-offset-2 hover:underline"
              title="Restricted Staff & Facilitator Access"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
