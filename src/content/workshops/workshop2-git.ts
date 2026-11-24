import { Workshop } from "@/types/curriculum";
import { chapter1 } from "./workshop2/chapter1";
import { chapter2 } from "./workshop2/chapter2";
import { chapter3 } from "./workshop2/chapter3";
import { chapter4 } from "./workshop2/chapter4";
import { chapter5 } from "./workshop2/chapter5";

export const workshop2Git: Workshop = {
  id: "w2-git-github",
  slug: "git-github",
  number: 2,
  title: "Git & GitHub: Version Control, History Surgery & Collaboration",
  subtitle: "Local Repositories, Branching Trees, Resets, Cherry-Picks & GitHub Setup",
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
    "Install Git and GitHub CLI (gh), configure global identity, and authenticate via gh auth login",
    "Master the Three Trees architecture: initialize repos (git init), inspect status, stage files (git add), and write atomic commits",
    "Navigate, create, and manage branches with git branch, git checkout, and git switch, and resolve merge conflicts",
    "Master time travel: undo commits with git reset (--soft, --mixed, --hard), recover lost work with git reflog, and safely revert public commits",
    "Perform surgical commit transplants across branches with git cherry-pick",
    "Connect local repositories to GitHub (git remote add origin), push with upstream tracking, pull updates, and manage Pull Requests",
  ],
  projectSlug: "git-portfolio",
  projectTitle: "Git Portfolio: Multi-Branch Collaboration",
  status: "active",
  chapters: [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
  ],
};
