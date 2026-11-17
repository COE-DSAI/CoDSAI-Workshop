/**
 * Comprehensive Curriculum & Learning Types
 * Center of Excellence: Data Science & Artificial Intelligence
 */

export type WorkshopExecutionMode =
  | "browser-python"             // Built-in Pyodide Python runtime
  | "browser-python-scientific"  // Pyodide with NumPy / Pandas / Matplotlib
  | "interactive-simulation"     // Custom interactive visualizer (e.g. Git, Streamlit)
  | "local-project"              // Local CLI / IDE workflow with guided commands
  | "streamlit-app";             // Streamlit UI simulation & exportable scripts

export interface CodeExample {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly explanation: string;
  readonly stepByStepWalkthrough?: readonly string[];
  readonly expectedOutput: string;
  readonly whyItHappens?: string;
  readonly edgeCases?: string;
}

export interface ExerciseTestCase {
  readonly id: string;
  readonly description: string;
  readonly input?: string;
  readonly expectedOutputSnippet: string;
}

export interface Exercise {
  readonly id: string;
  readonly title: string;
  readonly difficulty: "basic" | "intermediate" | "challenge" | "stretch";
  readonly prompt: string;
  readonly starterCode: string;
  readonly testCases?: readonly ExerciseTestCase[];
  readonly hints: readonly [string, string, string]; // Hint 1: concept, Hint 2: approach, Hint 3: explicit implementation
  readonly solution: string;
  readonly solutionExplanation: string;
}

export interface ChapterSection {
  readonly id: string;
  readonly title: string;
  readonly content: string; // Markdown formatted educational text
  readonly codeExamples?: readonly CodeExample[];
  readonly callout?: {
    readonly type: "note" | "tip" | "warning" | "mistake";
    readonly title: string;
    readonly content: string;
  };
}

export interface SyntaxReference {
  readonly syntax: string;
  readonly description: string;
  readonly example?: string;
}

export interface GlossaryTerm {
  readonly term: string;
  readonly definition: string;
  readonly context?: string;
}

export interface RevisionQuestion {
  readonly question: string;
  readonly answer: string;
}

export interface ChapterRecap {
  readonly keyConcepts: readonly string[];
  readonly essentialSyntax: readonly SyntaxReference[];
  readonly takeaways: readonly string[];
  readonly quickReferenceTable?: readonly {
    readonly term: string;
    readonly description: string;
    readonly example?: string;
  }[];
  readonly glossary: readonly GlossaryTerm[];
  readonly revisionQuestions: readonly RevisionQuestion[];
}

export interface AssessmentQuestion {
  readonly id: string;
  readonly type: "multiple-choice" | "predict-output" | "debug-code" | "concept";
  readonly prompt: string;
  readonly codeSnippet?: string;
  readonly options?: readonly string[];
  readonly correctAnswer: string | number;
  readonly explanation: string;
}

export interface FacilitatorNote {
  readonly agendaItem: string;
  readonly timingMinutes: number;
  readonly teachingGoal: string;
  readonly commonMisconceptions: readonly string[];
  readonly discussionPrompts: readonly string[];
  readonly liveCodingCheckpoints: readonly string[];
  readonly referenceSolutionNotes?: string;
}

export interface Chapter {
  readonly id: string;
  readonly slug: string;
  readonly number: number;
  readonly title: string;
  readonly estimatedMinutes: number;
  readonly introduction: string;
  readonly learningObjectives: readonly string[];
  readonly sections: readonly ChapterSection[];
  readonly exercises: readonly Exercise[];
  readonly recap: ChapterRecap;
  readonly selfAssessment: readonly AssessmentQuestion[];
  readonly facilitatorNotes?: FacilitatorNote;
}

export interface Workshop {
  readonly id: string;
  readonly slug: string;
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly durationMinutes: number;
  readonly description?: string;
  readonly targetAudience: string;
  readonly prerequisites: readonly string[];
  readonly difficulty: "Beginner" | "Intermediate" | "Advanced";
  readonly learningOutcomes: readonly string[];
  readonly executionMode: WorkshopExecutionMode;
  readonly chapters: readonly Chapter[];
  readonly projectSlug?: string;
  readonly projectTitle?: string;
}

export interface LearnerProgress {
  readonly completedChapters: Record<string, boolean>; // key: "workshopSlug/chapterSlug"
  readonly completedExercises: Record<string, boolean>; // key: "exerciseId"
  readonly exerciseCodeDrafts: Record<string, string>; // key: "exerciseId" -> code
  readonly lastVisitedChapter?: {
    readonly workshopSlug: string;
    readonly chapterSlug: string;
    readonly title: string;
    readonly timestamp: number;
  };
  readonly bookmarkedSections: readonly string[];
}
