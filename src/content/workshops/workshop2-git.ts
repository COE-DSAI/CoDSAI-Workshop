import { Workshop } from "@/types/curriculum";
import { chapter1 } from "./workshop2/chapter1";
import { chapter2 } from "./workshop2/chapter2";
import { chapter3 } from "./workshop2/chapter3";
import { chapter4 } from "./workshop2/chapter4";

export const workshop2Git: Workshop = {
  id: "w2-git-github",
  slug: "git-github",
  number: 2,
  title: "Git & GitHub: Version Control & Collaboration",
  subtitle: "Local Repositories, Branching Trees, Remotes & Personal PC Setup",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "local-project",
  targetAudience:
    "Engineers, data scientists, and students setting up professional version control on their own personal computers.",
  prerequisites: [
    "Completion of Workshop 01: Python Foundations (recommended)",
    "A personal computer (macOS, Windows, or Linux) with terminal access",
    "A free account on GitHub.com",
  ],
  learningOutcomes: [
    "Install and configure Git globally with user name, email, and default branch settings on your PC",
    "Understand the three states of Git: working directory, staging area, and repository history",
    "Initialize repositories, track changes, stage files, and write atomic, conventional commit messages",
    "Create, switch, and merge isolated feature branches and resolve merge conflicts cleanly",
    "Connect local repositories to GitHub using HTTPS or SSH, push changes, and open Pull Requests",
  ],
  projectSlug: "git-portfolio",
  projectTitle: "Git Portfolio: Multi-Branch Collaboration",
  status: "active",
  chapters: [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
  ],
};
