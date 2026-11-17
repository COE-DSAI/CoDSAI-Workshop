import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  GitBranch,
  BarChart3,
  Bot,
  Globe,
} from "lucide-react";
import { AppHeader } from "@/components/navigation/AppHeader";
import { AppFooter } from "@/components/navigation/AppFooter";

export default function ProjectsCataloguePage() {
  const projects = [
    {
      id: "inbox-guardian",
      title: "Inbox Guardian — Personal Message Scanner",
      workshop: "Workshop 1: Python Foundations",
      slug: "/projects/inbox-guardian",
      description:
        "A complete, menu-driven rule-based email and SMS security scanner built using Python string normalization, lists of dictionaries, and interactive CLI loops.",
      technologies: ["Python 3", "Rule-Based Heuristics", "CLI Menus", "In-Memory Records"],
      difficulty: "Beginner",
      isPrimary: true,
    },
    {
      id: "git-collaboration",
      title: "Collaborative Open-Source Repository & CI",
      workshop: "Workshop 2: Git & GitHub",
      slug: "/workshops/git-github/practical-team-project",
      description:
        "A multi-branch team repository implementing GitHub flow, pull request reviews, conflict resolution, and automated testing configuration.",
      technologies: ["Git", "GitHub Flow", "Pull Requests", "Markdown"],
      difficulty: "Beginner",
      isPrimary: false,
    },
    {
      id: "data-wrangling",
      title: "Tabular Performance & Message Wrangling Pipeline",
      workshop: "Workshop 3: NumPy & Pandas",
      slug: "/workshops/numpy-pandas/preparing-data-for-ml",
      description:
        "Data ingestion and automated cleaning script that profiles nulls, deduplicates rows, computes grouped domain summaries, and exports clean X/y matrices.",
      technologies: ["NumPy", "Pandas", "CSV Pipelines", "Feature Prep"],
      difficulty: "Beginner",
      isPrimary: false,
    },
    {
      id: "eda-report",
      title: "Message Threat Intelligence & EDA Report",
      workshop: "Workshop 4: Data Visualisation",
      slug: "/workshops/visualisation/eda-practical-project",
      description:
        "Publication-ready statistical report featuring histograms, Tukey boxplots, correlation heatmaps, and evidence-based risk distribution insights.",
      technologies: ["Matplotlib", "Seaborn", "Statistical EDA", "Visual Storytelling"],
      difficulty: "Beginner",
      isPrimary: false,
    },
    {
      id: "ml-benchmark",
      title: "End-to-End Classifier Pipeline Benchmark",
      workshop: "Workshop 5: Machine Learning 101",
      slug: "/workshops/ml-workflow/ml-workflow-practical",
      description:
        "Scientific comparison proving that scikit-learn pipelines with learned weights measurably outperform hardcoded human heuristic rules.",
      technologies: ["Scikit-Learn", "Pipeline", "StandardScaler", "Baseline Benchmarking"],
      difficulty: "Intermediate",
      isPrimary: false,
    },
    {
      id: "regression-latency",
      title: "Server Processing Latency Predictor",
      workshop: "Workshop 6: Supervised Learning I",
      slug: "/workshops/regression/regression-practical-project",
      description:
        "Continuous numerical prediction model estimating milliseconds of threat analysis latency based on token counts and network load.",
      technologies: ["LinearRegression", "MAE / RMSE", "R² Score", "Residual Analysis"],
      difficulty: "Intermediate",
      isPrimary: false,
    },
    {
      id: "ml-spam-classifier",
      title: "Machine Learning Spam & Threat Classifier",
      workshop: "Workshop 7: Supervised Learning II",
      slug: "/workshops/classification/classification-practical-project",
      description:
        "Probabilistic classifier with decision threshold tuning, confusion matrix evaluation, and balanced Precision-Recall trade-offs.",
      technologies: ["LogisticRegression", "Sigmoid", "Confusion Matrix", "Precision/Recall"],
      difficulty: "Intermediate",
      isPrimary: false,
    },
    {
      id: "model-audit",
      title: "Comprehensive Model Card & AI Governance Audit",
      workshop: "Workshop 8: Responsible ML & Evals",
      slug: "/workshops/model-evaluation/evaluation-report",
      description:
        "Standardized model card audit analyzing 5-fold cross-validation stability, subgroup demographic fairness, and failure mode documentation.",
      technologies: ["Cross-Validation", "Model Cards", "AI Fairness", "Error Analysis"],
      difficulty: "Intermediate",
      isPrimary: false,
    },
    {
      id: "streamlit-web-app",
      title: "Inbox Guardian Web App: Interactive Threat Scanner",
      workshop: "Workshop 9: Streamlit Apps",
      slug: "/workshops/streamlit/practical-streamlit-project",
      description:
        "Full reactive web application providing live text screening, dynamic probability progress gauges, and instant security advice in pure Python.",
      technologies: ["Streamlit", "Joblib", "Model Serving", "Web UI"],
      difficulty: "Intermediate",
      isPrimary: true,
    },
    {
      id: "portfolio-capstone",
      title: "Full-Cycle Portfolio Machine Learning Sprint",
      workshop: "Workshop 10: Portfolio Sprint",
      slug: "/workshops/project-sprint/presentation-and-showcase",
      description:
        "End-to-end public showcase project with clean-room reproduction testing, documentation badges, and a 5-minute technical presentation pitch.",
      technologies: ["Full Stack ML", "Portfolio Engineering", "Reproducibility", "Pitch"],
      difficulty: "Advanced",
      isPrimary: true,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <AppHeader />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Practical Applications
            </span>
            <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold text-slate-900">
              Project & Capstone Catalogue
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Every workshop in the series culminates in a concrete, portfolio-grade project. Progress from rule-based command-line tools to deployed machine learning applications.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-all hover:shadow-md ${
                  project.isPrimary
                    ? "border-blue-300 bg-white shadow-xs ring-1 ring-blue-100"
                    : "border-slate-200 bg-white shadow-xs hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-blue-600">
                      {project.workshop.split(":")[0]}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        project.difficulty === "Beginner"
                          ? "bg-emerald-100 text-emerald-800"
                          : project.difficulty === "Intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <h2 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={project.slug}
                    className="flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>Explore Project</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
