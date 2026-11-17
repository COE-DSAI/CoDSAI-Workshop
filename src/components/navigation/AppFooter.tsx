import React from "react";
import Link from "next/link";
import { BRANDING } from "@/lib/branding";
import { OrganisationLogo } from "@/components/branding/OrganisationLogo";

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
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
                A structured, self-contained educational platform designed for live workshops,
                independent practice, comprehensive revision, and practical model development.
              </p>
            </div>
          </div>

          {/* Col 3: Workshop Sequence */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Curriculum Sequence
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/workshops/python" className="hover:text-blue-600 transition-colors">
                  W1: Python Foundations
                </Link>
              </li>
              <li>
                <Link href="/workshops/git-github" className="hover:text-blue-600 transition-colors">
                  W2: Git & GitHub
                </Link>
              </li>
              <li>
                <Link href="/workshops/numpy-pandas" className="hover:text-blue-600 transition-colors">
                  W3: NumPy & Pandas
                </Link>
              </li>
              <li>
                <Link href="/workshops/visualisation" className="hover:text-blue-600 transition-colors">
                  W4: Data Visualisation
                </Link>
              </li>
              <li>
                <Link href="/workshops/ml-workflow" className="hover:text-blue-600 transition-colors">
                  W5: Machine Learning 101
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Advanced Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Advanced & Applied
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/workshops/regression" className="hover:text-blue-600 transition-colors">
                  W6: Regression
                </Link>
              </li>
              <li>
                <Link href="/workshops/classification" className="hover:text-blue-600 transition-colors">
                  W7: Classification
                </Link>
              </li>
              <li>
                <Link href="/workshops/model-evaluation" className="hover:text-blue-600 transition-colors">
                  W8: Responsible ML & Evals
                </Link>
              </li>
              <li>
                <Link href="/workshops/streamlit" className="hover:text-blue-600 transition-colors">
                  W9: Streamlit Apps
                </Link>
              </li>
              <li>
                <Link href="/workshops/project-sprint" className="hover:text-blue-600 transition-colors">
                  W10: Portfolio Sprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Learning Resources
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/projects/inbox-guardian" className="hover:text-blue-600 transition-colors font-medium text-slate-800">
                  Inbox Guardian Project
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-600 transition-colors">
                  Learner Dashboard
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-blue-600 transition-colors">
                  Revision Hub & Glossary
                </Link>
              </li>
              <li>
                <Link href="/facilitator" className="hover:text-blue-600 transition-colors">
                  Facilitator Workbench
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
            Educational resource for students, researchers, and practitioners.
          </p>
        </div>
      </div>
    </footer>
  );
}
