import { Chapter } from "@/types/curriculum";

export const chapter3: Chapter = {
  id: "w2-ch3",
  slug: "branching-and-merge-conflicts",
  number: 3,
  title: "Branching Workflows & Resolving Merge Conflicts",
  estimatedMinutes: 25,
  introduction:
    "In professional engineering teams, developers never commit directly to the primary production branch (`main`). Instead, each new feature, bug fix, or data experiment is isolated on an independent **feature branch**. In this chapter, you will master Git's lightweight branching mechanism, execute smooth merges, demystify what causes merge conflicts, and resolve conflicts step-by-step like a senior engineer.",
  learningObjectives: [
    "Understand Git branches as lightweight 41-byte movable pointers to specific commits rather than duplicate folder copies",
    "Create and switch between branches using the modern git switch -c and legacy git checkout -b commands",
    "Execute fast-forward merges when histories have not diverged and three-way merges when parallel work has occurred",
    "Identify the exact anatomy of merge conflict markers (<<<<<<< HEAD, =======, >>>>>>> branch)",
    "Resolve merge conflicts cleanly using both terminal commands and graphical editor diff tools in VS Code",
    "Clean up stale feature branches safely using git branch -d and force delete with -D",
  ],
  sections: [
    {
      id: "w2-ch3-s1",
      title: "3.1 What is a Branch? Lightweight Movable Pointers",
      content:
        "In older version control systems, creating a branch required copying the entire folder of files, which was slow and consumed disk space. In Git, **a branch is simply a tiny text file containing a 40-character SHA-1 commit hash** (just 41 bytes on disk).\n\nWhen you create a branch, Git creates a pointer pointing to the current commit. As you make new commits on that branch, the pointer automatically moves forward to each new commit snapshot.\n\nThe special pointer called `HEAD` indicates which branch and commit your working directory currently reflects.",
      callout: {
        type: "tip",
        title: "Branch Early and Often",
        content:
          "Because Git branches are virtually instantaneous and take near-zero disk space, you should create a fresh branch for every self-contained task or experiment.",
      },
    },
    {
      id: "w2-ch3-s2",
      title: "3.2 Branch Operations: `git branch`, `git checkout` vs Modern `git switch`",
      content:
        "Branching is Git's superpower. Managing branches involves three core commands:\n\n### 1. Inspecting & Managing Branches (`git branch`)\n• `git branch`: Lists all local branches on your computer. An asterisk `*` indicates your currently active branch.\n• `git branch -a`: Lists all local branches AND remote tracking branches (e.g. `remotes/origin/main`).\n• `git branch <new-name>`: Creates a new branch pointer without immediately switching to it.\n• `git branch -m <old-name> <new-name>`: Renames a branch (or `git branch -m <new-name>` to rename the current branch).\n• `git branch -d <name>`: Safely deletes a branch after verifying its commits have been merged.\n• `git branch -D <name>`: Force-deletes a branch even if it contains unmerged experimental commits.\n\n### 2. Navigating Branches: Classic `checkout` vs Modern `switch`\nHistorically, `git checkout` handled both switching branches and discarding file modifications. To remove ambiguity, modern Git (v2.23+) split these into `git switch` (for branches) and `git restore` (for working tree files):\n\n• **Classic Syntax**: `git checkout -b feature-a` (create & switch) or `git checkout feature-a` (switch).\n• **Modern Syntax**: `git switch -c feature-a` (create & switch) or `git switch feature-a` (switch).\n• **Quick Toggle**: `git switch -` immediately returns you to the branch you were previously on!\n\n### 3. The 'Detached HEAD' State\nIf you run `git checkout <commit-hash>`, you are checking out a specific historical commit rather than a branch name. Git enters a **Detached HEAD** state: any new commits you make are orphaned and will be lost when you switch away! To safely return to your primary branch, simply run `git switch main`.",
      codeExamples: [
        {
          id: "w2-ch3-ex1",
          title: "Terminal Command 1: Branch Management, Navigation & Checkouts",
          description: "List branches, create with switch -c and checkout -b, inspect with branch -v, and delete merged branches.",
          code: `# List all local branches with their latest commit SHA and message
git branch -v

# Method A (Modern): Create and switch to a new branch with git switch
git switch -c feature/email-heuristics

# Method B (Classic): Create and switch using git checkout
# git checkout -b feature/email-heuristics

# Make changes and commit on the branch
echo "RISK_WEIGHT_URGENT = 25" > heuristics.py
git add heuristics.py
git commit -m "feat: define initial urgency scoring heuristic"

# Switch back to the main branch
git switch main

# Inspect all local branches (feature branch is visible)
git branch -a`,
          explanation:
            "git switch -c feature/email-heuristics creates the pointer and updates HEAD. When you switch back to main, heuristics.py temporarily disappears from your working directory because main's snapshot does not contain that commit yet.",
          stepByStepWalkthrough: [
            "git branch -v lists branches and shows the latest commit message for each.",
            "git switch -c creates and immediately checks out the new branch.",
            "Commit files on the feature branch.",
            "git switch main brings your working directory back to the clean main branch snapshot.",
            "git branch -a confirms both branches exist safely in your repository.",
          ],
          expectedOutput:
            "Switched to a new branch 'feature/email-heuristics'\n[feature/email-heuristics a1b2c3d] feat: define initial urgency scoring heuristic\n 1 file changed, 1 insertion(+)\n create mode 100644 heuristics.py\nSwitched to branch 'main'",
          whyItHappens:
            "Git swaps files in your filesystem instantaneously because it only has to update references and stream cached objects from the local .git database.",
          edgeCases:
            "• If you have uncommitted changes in your working directory that conflict with files on the target branch, Git prevents switching: 'error: Your local changes to the following files would be overwritten by checkout'. You must either commit or stash (`git stash`) your changes first.",
        },
      ],
    },
    {
      id: "w2-ch3-s3",
      title: "3.3 Merging Branches: Fast-Forward vs Three-Way Merge",
      content:
        "Once your feature branch work is tested and complete, you merge it back into `main`.\n\n### Fast-Forward Merge\nIf `main` has not had any new commits since you branched off, Git simply moves the `main` pointer forward to match your feature branch commit. No new merge commit is required.\n\n### Three-Way (Recursive) Merge\nIf other developers have added new commits to `main` while you were working on your feature branch, the histories have diverged. Git performs a 3-way merge using three snapshots: the common ancestor commit, the tip of `main`, and the tip of your feature branch, creating a new **merge commit** with two parent pointers.",
      codeExamples: [
        {
          id: "w2-ch3-ex2",
          title: "Terminal Command 2: Merge Feature Branch into Main",
          description: "Perform a fast-forward merge of feature-scanner into main and inspect the unified history.",
          code: `# Ensure you are on the target branch (main)
git switch main

# Merge the feature branch into main
git merge feature-scanner

# Inspect the updated commit log
git log --oneline --graph`,
          explanation:
            "Running git merge feature-scanner while on branch main integrates the commits. If fast-forward is possible, main's pointer advances instantly.",
          stepByStepWalkthrough: [
            "Always verify you are on the destination branch before running git merge.",
            "git merge feature-scanner merges the commits.",
            "Inspect git log: both HEAD -> main and feature-scanner now point to the same latest commit.",
          ],
          expectedOutput:
            "Updating b4c5d6e..c3d4e5f\nFast-forward\n scanner.py | 1 +\n 1 file changed, 1 insertion(+)\n create mode 100644 scanner.py",
          whyItHappens:
            "Because main had not moved since feature-scanner was created, Git used a fast-forward update.",
        },
      ],
    },
    {
      id: "w2-ch3-s4",
      title: "3.4 Demystifying Merge Conflicts: Anatomy & Resolution",
      content:
        "A **merge conflict** occurs when two branches modify the **exact same lines of the same file** in different ways, or one branch deletes a file that the other branch modified. Git cannot guess which version is correct, so it halts the merge and asks you (the developer) to choose.\n\nWhen a conflict occurs, Git writes **conflict markers** directly into the affected file:\n\n```text\n<<<<<<< HEAD\nthreshold = 0.75  # from your current branch (main)\n=======\nthreshold = 0.90  # from the incoming branch (feature)\n>>>>>>> feature-threshold\n```\n\n### Resolution Steps:\n1. Open the conflicted file in VS Code or any text editor.\n2. Decide which code to keep (Current, Incoming, or a combined synthesis).\n3. Delete all marker lines (`<<<<<<<`, `=======`, `>>>>>>>`).\n4. Save the file, stage it (`git add <file>`), and complete the merge with `git commit`.",
      codeExamples: [
        {
          id: "w2-ch3-ex3",
          title: "Terminal Command 3: Complete a Conflict Resolution",
          description: "Stage the resolved conflict file and record the final merge commit.",
          code: `# After manually editing the conflicted file in your editor:
git status

# Stage the resolved file
git add scanner.py

# Finalize the merge commit
git commit -m "merge: resolve threshold conflict between main and feature-threshold"

# Delete the merged feature branch safely
git branch -d feature-threshold`,
          explanation:
            "Staging the conflicted file with git add signals to Git that the conflict has been resolved. Running git commit completes the merge sequence. git branch -d safely deletes the branch pointer now that its commits exist on main.",
          stepByStepWalkthrough: [
            "git status lists conflicted files under 'Unmerged paths'.",
            "git add tells Git the conflict in that file is resolved.",
            "git commit creates the merge commit.",
            "git branch -d cleans up the branch pointer.",
          ],
          expectedOutput:
            "[main d4e5f6a] merge: resolve threshold conflict between main and feature-threshold\nDeleted branch feature-threshold (was c3d4e5f).",
          whyItHappens:
            "git branch -d checks if the branch is fully merged into HEAD before deleting, protecting you from losing unmerged work.",
          edgeCases:
            "• If you want to abort an in-progress merge and return your repository to the state before running git merge, run: git merge --abort.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w2-ch3-ex-branch-test",
      title: "Exercise 3: Create, Switch, and Delete a Branch",
      difficulty: "intermediate",
      prompt:
        "In your local terminal, create a branch named 'test-experiment', switch to it, make a commit, switch back to 'main', and verify that your main branch remains on its previous commit.",
      starterCode: `# Run these in your project terminal:
git switch -c test-experiment
echo "# Experiment" > experiment.md
git add experiment.md
git commit -m "test: add experimental notes"
git switch main
git log -1 --oneline`,
      hints: [
        "Hint 1 (Concept): Git branches isolate changes by pointing to separate commit snapshots.",
        "Hint 2 (Approach): Use 'git switch -c <name>' to create and switch, then commit your changes.",
        "Hint 3 (Execution): Run 'git switch main' followed by 'git log -1 --oneline' to verify main is untouched.",
      ],
      solution: `git switch -c test-experiment
echo "# Experiment" > experiment.md
git add experiment.md
git commit -m "test: add experimental notes"
git switch main
git log -1 --oneline`,
      solutionExplanation:
        "This demonstrates Git's isolation: changes committed on test-experiment do not affect main until explicitly merged.",
    },
  ],
  recap: {
    keyConcepts: [
      "A Git branch is a lightweight 41-byte pointer referencing a commit; HEAD points to the currently active branch",
      "git switch -c <branch> creates and switches to a new branch cleanly",
      "Fast-forward merges occur when no divergent commits exist on the destination branch",
      "Merge conflicts occur when conflicting changes happen on the same lines of the same file",
      "Git conflict markers (<<<<<<<, =======, >>>>>>>) clearly delimit opposing edits for manual resolution",
      "git merge --abort safely cancels an active merge conflict and restores previous repository state",
    ],
    essentialSyntax: [
      {
        syntax: "git branch",
        description: "Lists all local branches, marking the currently checked-out branch with an asterisk (*)",
        example: "git branch",
      },
      {
        syntax: "git switch -c <name>",
        description: "Creates a new branch named <name> and immediately checks it out",
        example: "git switch -c feature-login",
      },
      {
        syntax: "git checkout -b <name>",
        description: "Classic Git command to create and switch to a new branch in one step",
        example: "git checkout -b feature-login",
      },
      {
        syntax: "git branch -a",
        description: "Lists all local and remote tracking branches in the repository",
        example: "git branch -a",
      },
      {
        syntax: "git switch <name>",
        description: "Switches the working directory to the existing branch <name>",
        example: "git switch main",
      },
      {
        syntax: "git merge <branch>",
        description: "Merges commits from <branch> into the current active branch",
        example: "git merge feature-login",
      },
      {
        syntax: "git merge --abort",
        description: "Aborts an in-progress merge conflict and resets files to pre-merge status",
        example: "git merge --abort",
      },
      {
        syntax: "git branch -d <name>",
        description: "Safely deletes branch <name> if it has already been merged into HEAD",
        example: "git branch -d feature-login",
      },
    ],
    takeaways: [
      "Keep feature branches short-lived to minimize large merge conflicts",
      "Always pull latest changes from main before starting a new feature branch",
      "Never fear merge conflicts — they are simply Git asking you to make an engineering decision",
    ],
    glossary: [
      {
        term: "Branch",
        definition: "A lightweight, movable pointer to a specific commit in Git's directed acyclic graph (DAG).",
      },
      {
        term: "Merge",
        definition: "The Git operation of joining two or more commit histories into a single unified branch.",
      },
      {
        term: "Fast-Forward",
        definition: "A merge where Git simply advances the target branch pointer because no divergence exists.",
      },
      {
        term: "Merge Conflict",
        definition: "A collision during a merge where two branches made incompatible edits to identical file regions.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why is git switch preferred over the older git checkout command?",
        answer: "git switch is dedicated solely to branch switching and creation, avoiding the confusion of git checkout which was also used for file restoration.",
      },
      {
        question: "What do the conflict markers <<<<<<< HEAD and >>>>>>> represent?",
        answer: "<<<<<<< HEAD marks the code present in your current active branch; >>>>>>> marks the incoming code from the branch being merged.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch3-q1",
      type: "multiple-choice",
      prompt: "What happens during a 'fast-forward' merge in Git?",
      options: [
        "Git moves the branch pointer forward without creating a new merge commit",
        "Git deletes all commit history to save disk space",
        "Git forces a remote synchronization with GitHub",
        "Git compiles code into an executable binary",
      ],
      correctAnswer: 0,
      explanation: "A fast-forward merge simply moves the destination branch pointer to point to the latest commit of the source branch because the two branches did not diverge.",
    },
    {
      id: "w2-ch3-q2",
      type: "multiple-choice",
      prompt: "Which command cancels an in-progress merge conflict and returns your files to clean pre-merge status?",
      options: [
        "git merge --abort",
        "git cancel",
        "git checkout --all",
        "git reset --hard origin/main",
      ],
      correctAnswer: 0,
      explanation: "git merge --abort cancels the conflicting merge process and returns the working directory and index to the exact state before git merge was invoked.",
    },
  ],
};
