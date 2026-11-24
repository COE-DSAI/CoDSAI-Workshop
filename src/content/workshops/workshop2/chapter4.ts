import { Chapter } from "@/types/curriculum";

export const chapter4: Chapter = {
  id: "w2-ch4",
  slug: "time-travel-reset-and-cherry-pick",
  number: 4,
  title: "Time Travel & History Surgery: `git reset` (Soft, Mixed, Hard) & `git cherry-pick`",
  estimatedMinutes: 25,
  introduction:
    "Every engineer makes mistakes: committing half-finished code, including accidental API keys, writing typo-ridden commit messages, or wanting a single bug-fix commit from an experimental branch without merging weeks of unfinished work. Git provides surgical time-travel primitives to handle these exact scenarios. In this chapter, you will master `git reset` across its three distinct modes (`--soft`, `--mixed`, `--hard`), understand why you should never reset public history (and use `git revert` instead), and perform surgical commit transplants using `git cherry-pick`.",
  learningObjectives: [
    "Deconstruct how Git's Three Trees (HEAD, Index/Staging, and Working Directory) behave during undo operations",
    "Master the three operational modes of git reset: --soft (preserves staging), --mixed (un-stages changes), and --hard (wipes changes)",
    "Safely recover from accidental data loss using Git's internal flight recorder: git reflog",
    "Internalize the Golden Rule of Git: why git reset is strictly for local private history, and git revert is used for pushed public history",
    "Surgically transplant individual commits from one branch to another using git cherry-pick",
    "Resolve and finalize cherry-pick merge conflicts using git cherry-pick --continue and git cherry-pick --abort",
  ],
  sections: [
    {
      id: "w2-ch4-s1",
      title: "4.1 The Anatomy of Undoing: Git's Three Trees Revisited",
      content:
        "To understand how Git undoes changes, remember where your code lives at any moment:\n\n1. **HEAD (Commit History)**: The last recorded snapshot on your current branch in `.git`.\n2. **Index (Staging Area)**: The prepared snapshot for your next commit.\n3. **Working Directory**: The actual readable files on your computer's filesystem.\n\nWhen you run `git reset <commit>`, you are telling Git to move the current branch pointer (and `HEAD`) backward to a previous commit. What happens to your Index and Working Directory depends entirely on which flag you pass: `--soft`, `--mixed`, or `--hard`.",
      callout: {
        type: "tip",
        title: "Understanding HEAD~1",
        content:
          "`HEAD` represents your current latest commit. `HEAD~1` (or `HEAD^`) refers to the immediate parent commit (1 commit before HEAD). `HEAD~2` refers to 2 commits back.",
      },
    },
    {
      id: "w2-ch4-s2",
      title: "4.2 `git reset` Demystified: The Three Modes (--soft, --mixed, --hard)",
      content:
        "Here is the definitive architectural comparison of the three reset modes:\n\n| Mode | Moves HEAD? | Modifies Staging Index? | Modifies Working Directory? | Typical Real-World Use Case |\n|---|---|---|---|---|\n| **`--soft`** | **YES** | **NO** (remains staged) | **NO** (untouched) | Fix commit message, combine multiple commits before pushing |\n| **`--mixed`** (default) | **YES** | **YES** (un-stages changes) | **NO** (untouched) | Un-stage accidentally staged files to re-stage them cleanly |\n| **`--hard`** | **YES** | **YES** (un-stages changes) | **YES** (overwrites files) | Discard completely broken experiments and return to known good state |\n\n### 1. `git reset --soft HEAD~1` (The Surgical Undo)\nMoves the branch pointer back 1 commit. The changes from the undone commit remain staged in your Index. This is perfect if you committed too early, made a typo in the commit message, or forgot to add a file.\n\n### 2. `git reset --mixed HEAD~1` (The Default Reset)\nMoves the branch pointer back 1 commit and clears the staging area. All the file changes remain safely in your working directory as unstaged modifications. This lets you re-examine files with `git diff` and stage them with surgical precision.\n\n### 3. `git reset --hard HEAD~1` (The Nuclear Option)\nMoves the branch pointer back, clears the staging index, AND overwrites all files in your working directory to match the target commit snapshot. Any uncommitted work is permanently erased!",
      codeExamples: [
        {
          id: "w2-ch4-ex1",
          title: "Terminal Command 1: Soft vs Hard Reset in Practice",
          description: "Undo a commit softly to amend code, and use git reflog to recover from a hard reset.",
          code: `# Scenario A: Soft reset to reword or add files to the last commit
git commit -m "wip: bad commit message with typos"

# Undo the commit, keeping all changes staged in the Index
git reset --soft HEAD~1

# Check status: notice changes are still staged (green)!
git status -s

# Re-commit with a clean, professional commit message
git commit -m "feat(heuristics): implement baseline risk score threshold"

# Scenario B: Hard reset to discard an experimental failure
# DANGER: permanently overwrites modified files in working directory!
git reset --hard HEAD~1

# Scenario C: Recovering an 'erased' commit using Git's flight recorder (reflog)
git reflog
# Output shows: 7a8b9c0 HEAD@{1}: commit: ...
# Restore the lost commit:
git reset --hard HEAD@{1}`,
          explanation:
            "git reset --soft moves HEAD back but leaves your index intact. git reflog records every time HEAD changes location, allowing you to recover commits even after a hard reset.",
          stepByStepWalkthrough: [
            "Run git reset --soft HEAD~1: the commit disappears from git log, but your files remain staged.",
            "Run git status to verify files are staged and ready for a revised commit message.",
            "If git reset --hard is ever run accidentally, immediately run git reflog to locate the lost commit hash.",
            "Run git reset --hard <hash> to restore your repository to that exact point in time.",
          ],
          expectedOutput:
            "[main a1b2c3d] feat(heuristics): implement baseline risk score threshold\n 1 file changed, 3 insertions(+)",
          whyItHappens:
            "Git never deletes commit objects immediately. Even after a hard reset, the commit objects remain in .git/objects for weeks until garbage collection runs, letting reflog rescue you.",
          edgeCases:
            "• Uncommitted files (untracked or unstaged modifications) overwritten by git reset --hard CANNOT be recovered by reflog, because Git never took a snapshot of them! Always commit or stash before running a hard reset.",
        },
      ],
      callout: {
        type: "warning",
        title: "The Golden Rule: Never Reset Pushed History",
        content:
          "Never use `git reset` on commits that have already been pushed to a shared remote (like `origin/main`). Doing so rewrites history, forcing a rejected push (`fetch first`) and corrupting teammates' repositories.",
      },
    },
    {
      id: "w2-ch4-s3",
      title: "4.3 Reversing Public Commits Safely: `git revert`",
      content:
        "When a buggy commit has already been pushed to GitHub and pulled by your team, you cannot rewrite history with `git reset`. Instead, you use `git revert <commit-hash>`.\n\n### How `git revert` Works\nUnlike `reset` (which removes commits from history), `revert` creates a **brand-new forward commit** that applies the exact inverse mathematical diff of the target commit:\n• If the buggy commit added lines 10-15, the revert commit deletes lines 10-15.\n• If the buggy commit deleted a file, the revert commit restores that file.\n\nBecause `git revert` only moves history forward, it can be pushed cleanly to GitHub without requiring force-pushing (`--force`).",
      codeExamples: [
        {
          id: "w2-ch4-ex2",
          title: "Terminal Command 2: Reverting a Public Commit",
          description: "Create an inverse commit to safely undo a change on a shared branch.",
          code: `# View recent commit hashes
git log --oneline -n 3

# Revert a specific buggy commit (creates a new inverse commit)
git revert a1b2c3d --no-edit

# Inspect history: notice a new 'Revert ...' commit exists
git log --oneline -n 2`,
          explanation:
            "git revert analyzes the diff introduced by commit a1b2c3d and applies the exact opposite patch to your active working directory, creating a new commit with the message 'Revert \"...\"'.",
          stepByStepWalkthrough: [
            "Find the hash of the commit you need to undo with git log --oneline.",
            "Run git revert <hash>.",
            "Git applies the inverse diff and creates a new commit snapshot.",
            "Push the new revert commit to GitHub with standard git push.",
          ],
          expectedOutput:
            "[main e5f6a7b] Revert \"feat: experimental payment endpoint\"\n 1 file changed, 10 deletions(-)",
          whyItHappens:
            "Linear history is preserved, and your teammates will cleanly pull the reversal without any merge conflicts.",
        },
      ],
    },
    {
      id: "w2-ch4-s4",
      title: "4.4 Surgical Commit Transplant: `git cherry-pick`",
      content:
        "Imagine you are working on a long-running experimental branch (`experiment-llm`) with 12 un-reviewed commits. In commit #3 (`c8d9e0f`), you discovered and fixed a critical security vulnerability that affects production `main`.\n\nYou cannot merge `experiment-llm` into `main` because the other 11 commits are unfinished and unstable. How do you extract and apply **only commit #3** to `main`?\n\nThe answer is **`git cherry-pick <commit-hash>`**.\n\n### The Cherry-Pick Process:\n1. Find the commit hash on the source branch: `git log --oneline experiment-llm`\n2. Switch to your destination branch: `git switch main`\n3. Execute the cherry-pick: `git cherry-pick c8d9e0f`\n\nGit extracts the exact patch introduced by `c8d9e0f` and replays it on top of `main`, creating a new commit snapshot with identical changes and commit message, but a fresh timestamp and hash.",
      codeExamples: [
        {
          id: "w2-ch4-ex3",
          title: "Terminal Command 3: Cherry-Picking a Commit Across Branches",
          description: "Extract a specific commit from a feature branch and transplant it onto main.",
          code: `# Step 1: Inspect the feature branch to find the desired commit hash
git log --oneline feature/experimental-heuristics -n 3

# Step 2: Switch to the destination branch (main)
git switch main

# Step 3: Cherry-pick the specific bug-fix commit (e.g. c8d9e0f)
git cherry-pick c8d9e0f

# If a conflict occurs during cherry-pick:
# 1. Edit the conflicted file to resolve markers
# 2. Stage the resolved file: git add <file>
# 3. Complete cherry-pick: git cherry-pick --continue
# (Or abort safely: git cherry-pick --abort)`,
          explanation:
            "git cherry-pick applies the diff of commit c8d9e0f directly to your active branch. If there are no conflicting line changes, Git records the new commit automatically.",
          stepByStepWalkthrough: [
            "Use git log to identify the SHA-1 hash of the specific commit you want.",
            "Always switch to the destination branch before cherry-picking.",
            "Run git cherry-pick <hash>.",
            "Verify with git log --oneline: the commit now appears at the top of your destination branch.",
          ],
          expectedOutput:
            "[main 4a5b6c7] fix(security): sanitize email header control characters\n 1 file changed, 5 insertions(+)\n create mode 100644 security.py",
          whyItHappens:
            "Cherry-pick applies a diff rather than merging branch pointers, making it ideal for hotfixes and extracting isolated utilities.",
          edgeCases:
            "• Cherry-pick conflicts: If the code in the cherry-picked commit depends on prior changes on the source branch that do not exist on main, Git halts with a conflict. Resolve the file, git add it, and run git cherry-pick --continue.",
        },
      ],
      callout: {
        type: "note",
        title: "Cherry-Pick Creates a New Hash",
        content:
          "Because the cherry-picked commit now has a different parent commit on main, Git calculates a new SHA hash. While the code changes are identical, it is technically a distinct commit object.",
      },
    },
  ],
  exercises: [
    {
      id: "w2-ch4-ex-reset-cherry",
      title: "Exercise 4: Practice Soft Reset & Cherry-Pick Workflow",
      difficulty: "intermediate",
      prompt:
        "Open your terminal in a test Git repository and execute: (1) create a test commit, (2) undo it softly with git reset --soft HEAD~1, (3) verify changes remain staged with git status, and (4) cherry-pick a commit using its hash.",
      starterCode: `# 1. Undo the latest local commit softly without losing staged files:
git reset --soft HEAD~1

# 2. Inspect status to verify files are still in the staging index:
git status -s

# 3. Surgically apply a specific commit from another branch:
git cherry-pick <commit-hash>`,
      hints: [
        "git reset --soft HEAD~1 only moves the HEAD pointer; files in the index remain staged.",
        "git status -s will display staged files with a green 'M' or 'A' in the first column.",
        "To cherry-pick, always ensure you are currently on the destination branch before running the command.",
      ],
      solution: `git reset --soft HEAD~1
git status -s
git cherry-pick <commit-hash>`,
      solutionExplanation:
        "git reset --soft is the safest way to undo a local commit because it leaves all your work staged and ready for re-committing, while git cherry-pick lets you extract isolated fixes between branches.",
    },
  ],
  recap: {
    keyConcepts: [
      "git reset moves the branch pointer and HEAD backward across your commit history",
      "--soft moves HEAD but preserves Staging Index and Working Tree (ideal for fixing commit messages)",
      "--mixed (default) moves HEAD and un-stages files, preserving Working Tree modifications",
      "--hard moves HEAD, un-stages files, and overwrites working files (destructive!)",
      "git reflog records every movement of HEAD, enabling recovery of commits lost during hard resets",
      "Never reset pushed public history; use git revert to create a safe inverse forward commit",
      "git cherry-pick surgically transplants an individual commit from one branch to another",
    ],
    essentialSyntax: [
      {
        syntax: "git reset --soft HEAD~1",
        description: "Undoes the latest commit, keeping all changes staged in the Index",
        example: "git reset --soft HEAD~1",
      },
      {
        syntax: "git reset --mixed HEAD~1",
        description: "Undoes latest commit and un-stages changes into the working directory (default)",
        example: "git reset HEAD~1",
      },
      {
        syntax: "git reset --hard HEAD~1",
        description: "Undoes latest commit and discards all uncommitted working directory changes",
        example: "git reset --hard HEAD~1",
      },
      {
        syntax: "git reflog",
        description: "Displays the chronological log of all HEAD pointer movements for disaster recovery",
        example: "git reflog",
      },
      {
        syntax: "git revert <commit-hash>",
        description: "Creates a new commit that applies the exact inverse changes of a targeted commit",
        example: "git revert a1b2c3d --no-edit",
      },
      {
        syntax: "git cherry-pick <commit-hash>",
        description: "Applies the changes from a specific commit on another branch onto the current branch",
        example: "git cherry-pick c8d9e0f",
      },
      {
        syntax: "git cherry-pick --continue",
        description: "Resumes an interrupted cherry-pick operation after resolving merge conflicts",
        example: "git cherry-pick --continue",
      },
      {
        syntax: "git cherry-pick --abort",
        description: "Cancels an in-progress cherry-pick conflict and restores original branch state",
        example: "git cherry-pick --abort",
      },
    ],
    takeaways: [
      "Use git reset --soft to refine local commits before pushing to code review",
      "Memorize git reflog: it is your emergency parachute whenever a reset or branch operation goes wrong",
      "Use git cherry-pick when you need a single bugfix or feature without taking on an entire branch",
    ],
    glossary: [
      {
        term: "git reset",
        definition: "A Git command that resets current HEAD to a specified state, altering HEAD, index, and working tree based on flags.",
      },
      {
        term: "git reflog",
        definition: "Reference logs that record when the tips of branches and references were updated in the local repository.",
      },
      {
        term: "git revert",
        definition: "A safe command that records a new commit containing the inverse changes of an existing commit without rewriting history.",
      },
      {
        term: "git cherry-pick",
        definition: "A command that applies the changes introduced by some existing commits onto the current active branch.",
      },
    ],
    revisionQuestions: [
      {
        question: "What is the difference between 'git reset --soft HEAD~1' and 'git reset --hard HEAD~1'?",
        answer: "--soft only moves the HEAD pointer back, leaving your changes staged in the index; --hard moves the pointer, clears the index, and overwrites working directory files, permanently discarding uncommitted changes.",
      },
      {
        question: "Why should you use 'git revert' instead of 'git reset' for commits that have already been pushed to GitHub?",
        answer: "git reset rewrites history, which causes push rejections and breaks teammates' repositories; git revert creates a new forward commit that cleanly inverts the changes without rewriting past history.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch4-q1",
      type: "multiple-choice",
      prompt: "Which command undoes your latest commit while keeping all modified files safely staged in the Index?",
      options: [
        "git reset --soft HEAD~1",
        "git reset --hard HEAD~1",
        "git clean -fd",
        "git checkout --all",
      ],
      correctAnswer: 0,
      explanation: "git reset --soft HEAD~1 moves HEAD back by 1 commit while leaving the staging area (index) and working directory untouched.",
    },
    {
      id: "w2-ch4-q2",
      type: "concept",
      prompt: "When should you use 'git cherry-pick <commit>'?",
      options: [
        "When you want to clone an entire remote repository from GitHub",
        "When you want to apply a specific commit from one branch onto your current branch without merging the whole branch",
        "When you want to delete all remote branches on GitHub",
        "When you want to convert CRLF line endings to LF",
      ],
      correctAnswer: 1,
      explanation: "git cherry-pick extracts the diff of a specific commit snapshot and replays it onto your active branch, creating a new commit without merging the rest of the source branch.",
    },
  ],
};
