import { Workshop } from "@/types/curriculum";

export const workshop3Scientific: Workshop = {
  id: "w3-data-analysis",
  slug: "data-analysis-scientific-python",
  number: 3,
  title: "Data Analysis & Scientific Python",
  subtitle: "Numerical Computing with NumPy, Tabular Analysis with Pandas & Visualizations",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Students and researchers advancing to quantitative and statistical analysis.",
  prerequisites: [
    "Workshop 01: Python Foundations",
    "Workshop 02: Git & GitHub",
  ],
  learningOutcomes: [
    "Vectorized operations and array broadcasting with NumPy",
    "Data cleaning, grouping, and aggregations with Pandas DataFrames",
    "Exploratory Data Analysis (EDA) and publication-quality plots",
  ],
  isLocked: true,
  status: "locked",
  chapters: [],
};

export const workshop4ML: Workshop = {
  id: "w4-ml-foundations",
  slug: "machine-learning-foundations",
  number: 4,
  title: "Machine Learning Foundations & Scikit-Learn",
  subtitle: "Supervised Learning, Feature Engineering, Model Evaluation & Metrics",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Students building predictive statistical and machine learning models.",
  prerequisites: [
    "Workshop 01: Python Foundations",
    "Workshop 02: Git & GitHub",
    "Workshop 03: Data Analysis",
  ],
  learningOutcomes: [
    "Feature matrix preparation and train/test validation splits",
    "Classification algorithms and evaluation metrics (Precision, Recall, ROC-AUC)",
    "Regression, clustering, and model hyperparameter tuning",
  ],
  isLocked: true,
  status: "locked",
  chapters: [],
};

export const workshop5Autonomous: Workshop = {
  id: "w5-autonomous-ai-agents",
  slug: "autonomous-ai-agents",
  number: 5,
  title: "Autonomous AI Agents & LLM Systems",
  subtitle: "Reasoning Loops, Tool Calling, Vector Stores & Agentic Architectures",
  durationMinutes: 120,
  difficulty: "Advanced",
  executionMode: "local-project",
  targetAudience: "Engineers deploying multi-agent reasoning systems and generative AI.",
  prerequisites: [
    "Workshop 01: Python Foundations",
    "Workshop 02: Git & GitHub",
    "Workshop 04: Machine Learning Foundations",
  ],
  learningOutcomes: [
    "Multi-agent orchestration and task decomposition",
    "Tool augmented generation and schema-driven execution",
    "Production observability and evaluation of agentic workflows",
  ],
  isLocked: true,
  status: "locked",
  chapters: [],
};
