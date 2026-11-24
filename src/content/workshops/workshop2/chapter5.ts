import { Chapter } from "@/types/curriculum";

export const chapter5: Chapter = {
  id: "w2-ch5",
  slug: "remotes-and-github-collaboration",
  number: 5,
  title: "Remote Repositories, GitHub Integration, `git push` & Pull Requests",
  estimatedMinutes: 30,
  introduction:
    "Git is a powerful local tool, but its true superpower emerges when connected to remote hosts like **GitHub**. GitHub acts as a centralized cloud hub for your repositories, team collaboration, code reviews, and automated CI/CD pipelines. In this capstone chapter, you will connect your local machine's Git repository to GitHub, configure secure authentication, push changes with upstream tracking, synchronize upstream updates with fetch and pull, and master the industry-standard Pull Request (PR) workflow.",
  learningObjectives: [
    "Differentiate between Git (the local CLI version control tool) and GitHub (the cloud hosting & collaboration platform)",
    "Authenticate securely to GitHub using SSH public keys, GitHub CLI, or HTTPS Personal Access Tokens (PAT)",
    "Add, inspect, and modify remote connections using git remote add origin, git remote -v, and git remote set-url",
    "Push local commits and establish upstream branch tracking using git push -u origin main",
    "Synchronize team changes safely using git fetch to inspect and git pull (or git pull --rebase) to integrate remote updates",
    "Execute the professional GitHub collaboration workflow: Forking, Feature Branching, Pull Requests, Code Reviews, and Merging",
  ],
  sections: [
    {
      id: "w2-ch5-s1",
      title: "5.1 Git vs GitHub: Local Engine vs Collaborative Cloud Platform",
      content:
        "Beginners often confuse Git and GitHub:\n\n• **Git**: A command-line software program running locally on your computer that tracks versions, commits snapshots, and manages branches. Git works 100% offline without any internet connection.\n• **GitHub**: A cloud-based web platform owned by Microsoft that hosts Git repositories online. GitHub adds collaboration layers on top of Git: Pull Requests, Issue Trackers, Code Reviews, GitHub Actions (CI/CD), and Project Boards.\n\nYour local computer communicates with GitHub over secure network protocols: **HTTPS** (using Personal Access Tokens or GitHub CLI) or **SSH** (using cryptographic public/private key pairs).",
      callout: {
        type: "tip",
        title: "Recommended Auth: SSH Keys or GitHub CLI",
        content:
          "Setting up an SSH key (`ssh-keygen -t ed25519`) or authenticating via GitHub CLI (`gh auth login`) allows seamless cryptographic authentication from your personal computer terminal without constantly re-entering passwords.",
      },
    },
    {
      id: "w2-ch5-s2",
      title: "5.2 Connecting Your Local Repository to GitHub (`git remote`)",
      content:
        "A **remote** is a version of your repository hosted on a network or the internet. You can have multiple remotes, but the primary remote is customarily named `origin`.\n\nTo link your local project to a newly created empty repository on GitHub:\n1. On [GitHub.com](https://github.com), click **New Repository**.\n2. Name your repo (e.g., `git-portfolio-workshop`). Do NOT check 'Initialize with README' if you already have local files.\n3. Copy the repository URL (HTTPS or SSH).\n4. In your local terminal, attach the remote using `git remote add origin <url>`.",
      codeExamples: [
        {
          id: "w2-ch5-ex1",
          title: "Terminal Command 1: Add Remote and Verify Configuration",
          description: "Link your local repository to GitHub and inspect fetch/push URLs.",
          code: `# Add the remote origin URL (replace with your GitHub repository URL)
git remote add origin https://github.com/your-username/my-ai-project.git

# Verify remote configuration
git remote -v`,
          explanation:
            "git remote add origin registers a named remote alias ('origin') pointing to the cloud repository URL. git remote -v displays the fetch and push URLs associated with that alias.",
          stepByStepWalkthrough: [
            "Run git remote add origin with your repository URL.",
            "Run git remote -v to confirm.",
            "Git outputs both the (fetch) and (push) URLs.",
          ],
          expectedOutput:
            "origin\thttps://github.com/your-username/my-ai-project.git (fetch)\norigin\thttps://github.com/your-username/my-ai-project.git (push)",
          whyItHappens:
            "Git separates fetch and push URLs in case an organization reads from one mirror and pushes to another, though they are usually identical.",
          edgeCases:
            "• If you misspell the URL: run git remote set-url origin <correct-url> to update it without deleting and re-adding.",
        },
      ],
    },
    {
      id: "w2-ch5-s3",
      title: "5.3 Pushing & Tracking Upstream (`git push -u origin main`)",
      content:
        "Commits created locally remain strictly on your personal computer until explicitly transmitted to the cloud using `git push`.\n\nThe first time you push a branch to a remote, use the `-u` (or `--set-upstream`) flag:\n`git push -u origin main`\n\nThis flag establishes an ongoing tracking relationship between your local `main` branch and `origin/main` on GitHub. Once configured, you can simply type `git push` and `git pull` in the future without specifying the remote name or branch name.",
      codeExamples: [
        {
          id: "w2-ch5-ex2",
          title: "Terminal Command 2: Push Local Commits to GitHub",
          description: "Upload local commit history to GitHub and establish upstream tracking.",
          code: `# Push local commits to the origin remote on branch main with upstream tracking
git push -u origin main

# For future pushes on this branch, simply run:
# git push`,
          explanation:
            "git push uploads local commit objects, trees, and blobs to GitHub and updates the remote-tracking pointer origin/main to match your local main.",
          stepByStepWalkthrough: [
            "Execute git push -u origin main in your terminal.",
            "Authenticate if prompted by your terminal or credential helper.",
            "Git counts objects, compresses data, and sends the stream over HTTPS/SSH.",
            "Open your repository page on GitHub.com to verify your files and commit message are live!",
          ],
          expectedOutput:
            "Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 250 bytes | 250.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0)\nTo https://github.com/your-username/my-ai-project.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main' from 'origin'.",
          whyItHappens:
            "The output shows the object transfer progress and confirms that local branch 'main' now tracks 'origin/main'.",
          edgeCases:
            "• Rejected pushes ('fetch first'): If someone else (or a web edit) pushed commits to GitHub that you do not have locally, Git rejects the push to prevent data loss. You must run git pull to integrate remote changes before pushing.",
        },
      ],
    },
    {
      id: "w2-ch5-s4",
      title: "5.4 Fetching, Pulling & The Pull Request (PR) Workflow",
      content:
        "In a team environment, other engineers continuously push commits to GitHub. You must synchronize your local repository with those updates.\n\n### `git fetch` vs `git pull`\n• `git fetch`: Downloads all new commits, branches, and tags from GitHub into your local `.git` object database, but does NOT modify your working directory files. It is 100% safe to run at any time.\n• `git pull`: Runs `git fetch` AND immediately attempts to merge remote commits into your active local branch (`git fetch` + `git merge`). Alternatively, `git pull --rebase` replays your local commits on top of incoming remote commits for a cleaner linear history.\n\n### The Pull Request (PR) Lifecycle\n1. Create a local feature branch: `git switch -c feature/improved-scanner`\n2. Make commits and push to GitHub: `git push -u origin feature/improved-scanner`\n3. Navigate to GitHub and click **Compare & pull request**.\n4. Write a clear PR description explaining the changes.\n5. Request peer reviews; automated CI/CD checks run in the background.\n6. Once approved, merge the PR into `main` and delete the feature branch.",
      codeExamples: [
        {
          id: "w2-ch5-ex3",
          title: "Terminal Command 3: Fetch vs Pull Synchronizations",
          description: "Download remote changes safely with fetch and synchronize your active branch with pull.",
          code: `# 1. Safely download remote updates without touching working files
git fetch origin

# 2. View differences between local main and remote tracking branch origin/main
git log HEAD..origin/main --oneline

# 3. Pull and integrate remote changes into your active branch
git pull origin main`,
          explanation:
            "Fetching first lets you inspect incoming commits before integrating them. git pull executes the fetch and merge automatically.",
          stepByStepWalkthrough: [
            "Run git fetch origin to update remote-tracking branches.",
            "Run git log HEAD..origin/main to see what commits your teammates pushed.",
            "Run git pull origin main to merge those commits into your local main branch.",
          ],
          expectedOutput:
            "From https://github.com/your-username/my-ai-project\n * branch            main     -> FETCH_HEAD\nUpdating a1b2c3d..e4f5a6b\nFast-forward\n README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
          whyItHappens:
            "Git updates your local working directory files to match the new commits from GitHub.",
          edgeCases:
            "• Divergent branches warning: In modern Git, if local and remote branches have diverged, git pull may prompt you to configure pull.rebase false (merge) or pull.rebase true (rebase).",
        },
      ],
      callout: {
        type: "warning",
        title: "Never Push Broken Code to Main",
        content:
          "In production teams, repository branches like 'main' are protected with branch protection rules requiring at least one approved code review and passing test suite before code can be merged.",
      },
    },
  ],
  assignment: {
    id: "w2-ch5-assignment",
    title: "Capstone: Personal Git Portfolio Setup on Your PC",
    scenario:
      "You are setting up your professional open-source data science portfolio on your personal computer. You will initialize a repository, craft a professional README with Markdown badges, configure .gitignore, create a feature branch, merge it, and push the completed multi-branch repository to your personal GitHub account.",
    requirements: [
      "Initialize a local repository named 'datascience-portfolio' on your computer",
      "Configure global user.name and user.email (or verify they exist)",
      "Create a production-grade .gitignore for Python and environment files",
      "Create a structured README.md with project title, architecture overview, and setup steps",
      "Create a feature branch named 'feature/initial-pipeline', commit a Python script, and merge it into main",
      "Create a public repository on GitHub, attach it as remote origin, and push main with upstream tracking",
    ],
    edgeCasesToHandle: [
      "Ensure .env and __pycache__ are excluded by .gitignore and never tracked",
      "Ensure proper branch naming conventions (e.g. main, feature/name)",
      "Verify that git remote -v outputs the correct repository URL",
    ],
    starterCode: `# Run these terminal commands on your personal computer:
mkdir datascience-portfolio
cd datascience-portfolio
git init

# Step 1: Add .gitignore
cat << 'EOF' > .gitignore
__pycache__/
*.pyc
.env
.venv/
.DS_Store
EOF
git add .gitignore
git commit -m "chore: setup .gitignore"

# Step 2: Create README.md
echo "# Data Science & AI Portfolio" > README.md
git add README.md
git commit -m "docs: initialize portfolio documentation"

# Step 3: Feature Branch Workflow
git switch -c feature/initial-pipeline
echo "def run_pipeline(): print('Pipeline active')" > pipeline.py
git add pipeline.py
git commit -m "feat: add initial data processing pipeline"
git switch main
git merge feature/initial-pipeline
git branch -d feature/initial-pipeline

# Step 4: Connect to GitHub (replace URL with your own)
# git remote add origin https://github.com/YOUR_USERNAME/datascience-portfolio.git
# git push -u origin main`,
    testCases: [],
    hints: [
      "Hint 1 (Concept): Complete the entire local lifecycle (init -> branch -> merge) before creating the remote repo on GitHub.",
      "Hint 2 (Approach): When creating the repo on GitHub.com, leave 'Add a README file' UNCHECKED so GitHub creates a completely empty repo ready to receive your push.",
      "Hint 3 (Execution): Run 'git remote add origin <url>' followed by 'git push -u origin main'.",
    ],
    referenceSolution: `# Complete local and remote workflow sequence:
mkdir datascience-portfolio && cd datascience-portfolio
git init
echo "# Data Science Portfolio" > README.md
git add README.md
git commit -m "docs: initial portfolio commit"
git remote add origin https://github.com/username/datascience-portfolio.git
git push -u origin main`,
    solutionExplanation:
      "This complete workflow mirrors production software engineering: initializing local repositories with atomic commits, isolating features with branches, and publishing to GitHub with upstream tracking.",
  },
  exercises: [
    {
      id: "w2-ch5-ex-remote",
      title: "Exercise 5: Verify Remote Tracking Configuration",
      difficulty: "basic",
      prompt:
        "Execute the terminal commands to: (1) verify your remote origin URL, (2) check upstream branch tracking with git branch -vv, and (3) run git fetch origin safely.",
      starterCode: `# Run these commands in your project repository:
git remote -v
git branch -vv
git fetch origin`,
      hints: [
        "git remote -v displays both the fetch and push URLs for all configured remotes.",
        "git branch -vv shows which local branch tracks which remote branch (e.g. [origin/main]).",
        "git fetch origin contacts GitHub and downloads any new commits without modifying working files.",
      ],
      solution: `git remote -v
git branch -vv
git fetch origin`,
      solutionExplanation:
        "These three commands are the standard diagnostic suite for checking network connectivity, remote tracking health, and syncing status between your local computer and GitHub.",
    },
  ],
  recap: {
    keyConcepts: [
      "Git is your offline version control tool; GitHub is your cloud platform for collaboration, code reviews, and remote backup",
      "Always set up upstream tracking on your initial push using git push -u origin <branch>",
      "git fetch downloads remote commits safely without altering your files; git pull merges remote changes into your active branch",
      "The Pull Request (PR) workflow provides code review safeguards and protects production branches from regressions",
    ],
    essentialSyntax: [
      {
        syntax: "git remote add origin <url>",
        description: "Links local repository to cloud remote URL with standard name 'origin'",
        example: "git remote add origin https://github.com/user/repo.git",
      },
      {
        syntax: "git remote -v",
        description: "Lists all configured remote connections with their fetch and push endpoints",
        example: "git remote -v",
      },
      {
        syntax: "git push -u origin <branch>",
        description: "Uploads commits on <branch> to remote 'origin' and establishes upstream tracking",
        example: "git push -u origin main",
      },
      {
        syntax: "git fetch origin",
        description: "Downloads new commits and branches from remote without modifying local working directory",
        example: "git fetch origin",
      },
      {
        syntax: "git pull origin <branch>",
        description: "Fetches and automatically merges remote changes into current active local branch",
        example: "git pull origin main",
      },
      {
        syntax: "git pull --rebase origin <branch>",
        description: "Fetches and replays local commits on top of incoming remote commits for linear history",
        example: "git pull --rebase origin main",
      },
    ],
    takeaways: [
      "Always pull latest changes before creating a new feature branch to minimize upstream merge divergence",
      "Use feature branches for all new work, pushing them to GitHub to open Pull Requests for review",
      "Authentication via GitHub CLI (gh) or SSH keys ensures seamless, secure git push operations without password prompts",
    ],
    glossary: [
      {
        term: "Remote",
        definition: "A version of your repository hosted on the internet or a network server (such as GitHub, GitLab, or Bitbucket).",
      },
      {
        term: "Upstream Tracking",
        definition: "A link between a local branch and a remote branch (configured via -u) allowing shorthand git push and git pull.",
      },
      {
        term: "Pull Request (PR)",
        definition: "A GitHub mechanism to propose changes from a feature branch into a target branch with diff previews, discussions, and review approvals.",
      },
      {
        term: "Fetch vs Pull",
        definition: "Fetch downloads remote data to the object store safely; pull downloads and immediately merges data into your active files.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why should you run 'git push -u origin main' instead of plain 'git push' on your first push?",
        answer: "The -u flag sets up an upstream tracking reference so that future 'git push' and 'git pull' commands automatically know which remote and branch to synchronize with.",
      },
      {
        question: "What is the difference between git fetch and git pull?",
        answer: "git fetch downloads remote changes to your local database without altering your working directory files; git pull performs git fetch and immediately merges those changes into your active branch.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch5-q1",
      type: "multiple-choice",
      prompt: "Which command connects a local Git repository to a GitHub cloud repository named origin?",
      options: [
        "git remote add origin https://github.com/user/repo.git",
        "git push --connect origin",
        "git clone --to origin",
        "git network connect https://github.com/user/repo.git",
      ],
      correctAnswer: 0,
      explanation: "git remote add origin <url> registers the remote endpoint under the standard alias 'origin'.",
    },
    {
      id: "w2-ch5-q2",
      type: "concept",
      prompt: "What is the primary advantage of git fetch over git pull?",
      options: [
        "It is faster because it compresses files twice",
        "It downloads remote updates without modifying or risking conflicts in your working directory",
        "It automatically force-pushes all local branches",
        "It deletes merged branches on GitHub",
      ],
      correctAnswer: 1,
      explanation: "git fetch only updates remote-tracking references in .git, allowing you to review commits with git log before deciding to merge.",
    },
  ],
};
