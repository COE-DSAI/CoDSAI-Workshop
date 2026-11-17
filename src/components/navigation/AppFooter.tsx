import React from "react";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1 & 2: Brand Identity */}
          <div className="md:col-span-2">
            <OrganisationLogo variant="footer" />
            <div className="mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {BRANDING.organisationLine1}
              </h3>
              <p className="text-xs font-semibold text-slate-700">
                {BRANDING.organisationLine2}
              </p>
              <p className="mt-1 text-xs text-blue-600 font-medium">
                {BRANDING.programmeTitle}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-sm">
                Official interactive learning platform for Workshop 1: Python Foundations. Built for live instructor delivery, independent practice, comprehensive revision, and capstone project development.
              </p>
            </div>
          </div>

          {/* Col 3: Workshop 1 Chapters */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Workshop 1 Chapters
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/workshops/python-foundations/introduction-to-python" className="hover:text-blue-600 transition-colors">
                  Ch 1: Introduction to Python
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/variables-data-types-and-io" className="hover:text-blue-600 transition-colors">
                  Ch 2: Variables & Data Types
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/strings-and-text-processing" className="hover:text-blue-600 transition-colors">
                  Ch 3: Strings & Text Processing
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/conditional-logic" className="hover:text-blue-600 transition-colors">
                  Ch 4: Conditional Logic
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/loops-and-repetition" className="hover:text-blue-600 transition-colors">
                  Ch 5: Loops & Repetition
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/collections-lists-and-dictionaries" className="hover:text-blue-600 transition-colors">
                  Ch 6: Lists & Dictionaries
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/functions-and-code-organisation" className="hover:text-blue-600 transition-colors">
                  Ch 7: Functions & Code Organisation
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations/capstone-inbox-guardian" className="hover:text-blue-600 transition-colors font-medium text-slate-800">
                  Ch 8: Capstone: Inbox Guardian
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Learning Resources
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/projects/inbox-guardian" className="hover:text-blue-600 transition-colors font-semibold text-slate-800">
                  Inbox Guardian Project
                </Link>
              </li>
              <li>
                <Link href="/workshops/python-foundations" className="hover:text-blue-600 transition-colors">
                  Workshop 1 Overview & Timetable
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-blue-600 transition-colors">
                  Revision Hub & Glossary
                </Link>
              </li>
              <li>
                <Link href="/facilitator" className="hover:text-blue-600 transition-colors">
                  Facilitator Console (120m Timer)
                </Link>
              </li>
              <li>
                <Link href="/revision?tab=mistakes" className="hover:text-blue-600 transition-colors">
                  Common Mistakes & Debugging
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>
            Official curriculum of the {BRANDING.organisationName}.
          </p>
          <p className="mt-2 sm:mt-0">
            Educational resource for students and workshop attendees.
          </p>
        </div>
      </div>
    </footer>
  );
}
