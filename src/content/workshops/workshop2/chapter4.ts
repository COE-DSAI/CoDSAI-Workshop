import { Chapter } from "@/types/curriculum";

export const chapter4: Chapter = {
  id: "w2-ch4",
  slug: "remotes-and-github-collaboration",
  number: 4,
  title: "Remote Repositories, GitHub Integration & Pull Requests",
  estimatedMinutes: 30,
  introduction:
    "Git is a powerful local tool, but its true superpower emerges when connected to remote hosts like **GitHub**. GitHub acts as a centralized cloud hub for your repositories, team collaboration, code reviews, and automated CI/CD pipelines. In this capstone chapter, you will connect your local machine's Git repository to GitHub, configure secure authentication, push changes, synchronize upstream updates, and master the industry-standard Pull Request (PR) workflow.",
  learningObjectives: [
    "Differentiate between Git (the local CLI version control tool) and GitHub (the cloud hosting & collaboration platform)",
    "Authenticate securely to GitHub using SSH public keys or HTTPS Personal Access Tokens (PAT)",
    "Add, inspect, and modify remote connections using git remote add origin and git remote -v",
    "Push local commits and establish upstream branch tracking using git push -u origin main",
    "Synchronize team changes safely using git fetch to inspect and git pull to integrate remote updates",
    "Execute the professional GitHub collaboration workflow: Forking, Feature Branching, Pull Requests, Code Reviews, and Merging",
  ],
  sections: [
    {
      id: "w2-ch4-s1",
      title: "4.1 Git vs GitHub: Local Engine vs Collaborative Cloud Platform",
      content:
        "Beginners often confuse Git and GitHub:\n\n• **Git**: A command-line software program running locally on your computer that tracks versions, commits snapshots, and manages branches. Git works 100% offline without any internet connection.\n• **GitHub**: A cloud-based web platform owned by Microsoft that hosts Git repositories online. GitHub adds collaboration layers on top of Git: Pull Requests, Issue Trackers, Code Reviews, GitHub Actions (CI/CD), and Project Boards.\n\nYour local computer communicates with GitHub over secure network protocols: **HTTPS** (using Personal Access Tokens) or **SSH** (using cryptographic public/private key pairs).",
      callout: {
        type: "tip",
        title: "Recommended Auth: SSH Keys",
        content:
          "Setting up an SSH key (`ssh-keygen -t ed25519`) allows passwordless, cryptographic authentication to GitHub from your personal computer terminal without constantly re-entering access tokens.",
      },
    },
    {
      id: "w2-ch4-s2",
      title: "4.2 Connecting Your Local Repository to GitHub (`git remote`)",
      content:
        "A **remote** is a version of your repository hosted on a network or the internet. You can have multiple remotes, but the primary remote is customarily named `origin`.\n\nTo link your local project to a newly created empty repository on GitHub:\n1. On [GitHub.com](https://github.com), click **New Repository**.\n2. Name your repo (e.g., `git-portfolio-workshop`). Do NOT check 'Initialize with README' if you already have local files.\n3. Copy the repository URL (HTTPS or SSH).\n4. In your local terminal, attach the remote using `git remote add origin <url>`.",
      codeExamples: [
        {
          id: "w2-ch4-ex1",
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
      id: "w2-ch4-s3",
      title: "4.3 Pushing & Tracking Upstream (`git push -u origin main`)",
      content:
        "The first time you upload commits from your local `main` branch to GitHub, you use the `-u` (or `--set-upstream`) flag:\n\n`git push -u origin main`\n\nThis flag establishes an ongoing tracking relationship between your local `main` and the remote `origin/main`. After doing this once, you can simply type `git push` or `git pull` without specifying the remote or branch name.",
      codeExamples: [
        {
          id: "w2-ch4-ex2",
          title: "Terminal Command 2: Push Local Commits to GitHub",
          description: "Upload local branch commits and establish upstream tracking on GitHub.",
          code: `# Push local 'main' branch to remote 'origin' and set upstream tracking
git push -u origin main

# Future pushes require only:
# git push`,
          explanation:
            "Git packages your local commits and pushes them to GitHub over HTTPS/SSH, setting up a tracking reference so 'git status' will now report whether your branch is ahead or behind origin/main.",
          stepByStepWalkthrough: [
            "Execute git push -u origin main.",
            "Git transfers objects, creates the remote branch, and sets up tracking.",
            "Visit your repository page on GitHub to see all your files and commits live!",
          ],
          expectedOutput:
            "Enumerating objects: 6, done.\nCounting objects: 100% (6/6), done.\nWriting objects: 100% (6/6), 580 bytes | 580.00 KiB/s, done.\nTotal 6 (delta 0), reused 0 (delta 0)\nTo https://github.com/your-username/my-ai-project.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main' from 'origin'.",
          whyItHappens:
            "The output confirms all objects were transferred and the upstream tracking link was successfully created.",
          edgeCases:
            "• If GitHub rejects the push with '[rejected - non-fast-forward]', remote changes exist that you do not have locally. Run git pull --rebase origin main before pushing.",
        },
      ],
    },
    {
      id: "w2-ch4-s4",
      title: "4.4 Fetching, Pulling & The Pull Request (PR) Workflow",
      content:
        "When collaborating on a team, colleagues will push commits to GitHub while you are working. To stay in sync:\n\n• `git fetch`: Downloads all new commits, branches, and tags from GitHub into your local `.git` repository, but **does NOT modify your working directory files**.\n• `git pull`: A combination of `git fetch` followed immediately by `git merge`, automatically integrating remote commits into your active local branch.\n\n### The Standard Team Pull Request Workflow\n1. Pull latest `main`: `git pull origin main`\n2. Create feature branch: `git switch -c feat/email-validator`\n3. Code, test, and commit: `git commit -m \"feat: validate sender domain\"`\n4. Push feature branch to GitHub: `git push -u origin feat/email-validator`\n5. Open a **Pull Request (PR)** on GitHub.com.\n6. Teammates review code, leave comments, and approve.\n7. Merge the PR into `main` using GitHub's **Merge Pull Request** button.",
      codeExamples: [
        {
          id: "w2-ch4-ex3",
          title: "Terminal Command 3: Fetch vs Pull Synchronizations",
          description: "Inspect remote updates safely with fetch, then fast-forward pull into your local branch.",
          code: `# Download remote objects without touching working files
git fetch origin

# Check how many commits your local branch is behind origin/main
git status

# Safely pull and integrate remote changes into current branch
git pull origin main`,
          explanation:
            "git fetch updates your local origin/main pointer, letting you run git log origin/main to see what teammates committed before you merge. git pull merges those commits into your working files.",
          stepByStepWalkthrough: [
            "git fetch updates remote tracking branches.",
            "git status tells you if you are 'behind origin/main by X commits'.",
            "git pull brings those commits into your active branch.",
          ],
          expectedOutput:
            "From https://github.com/your-username/my-ai-project\n * branch            main       -> FETCH_HEAD\nUpdating b4c5d6e..f7a8b9c\nFast-forward\n utils.py | 12 ++++++++++++\n 1 file changed, 12 insertions(+)",
          whyItHappens:
            "If your local branch had no new unpushed commits, git pull executes a clean fast-forward merge.",
        },
      ],
    },
  ],
  assignment: {
    id: "w2-ch4-assignment",
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
      id: "w2-ch4-ex-remote-check",
      title: "Exercise 4: Verify Remote Tracking Configuration",
      difficulty: "intermediate",
      prompt:
        "Execute 'git remote -v' and 'git branch -vv' in your terminal to verify that your local repository has a remote named 'origin' and that your local main branch tracks origin/main.",
      starterCode: `# Run these in your project terminal:
git remote -v
git branch -vv`,
      hints: [
        "git remote -v displays the fetch and push URLs.",
        "git branch -vv displays your local branches alongside their remote tracking branch (e.g., [origin/main]).",
      ],
      solution: `git remote -v
git branch -vv`,
      solutionExplanation:
        "The -vv flag on git branch reveals upstream tracking relationships, showing whether your local branch is in sync, ahead, or behind GitHub.",
    },
  ],
  recap: {
    keyConcepts: [
      "Git is a local version control program; GitHub is a cloud-hosted collaboration and code review platform",
      "Authentication to GitHub is handled via SSH cryptographic keys or HTTPS Personal Access Tokens",
      "git remote add origin <url> links your local repository to a remote cloud repository",
      "git push -u origin main uploads commits and establishes upstream branch tracking",
      "git fetch safely downloads changes without merging; git pull fetches and merges into your active branch",
      "The Pull Request (PR) workflow is the universal mechanism for code review in modern software development",
    ],
    essentialSyntax: [
      {
        syntax: "git remote add origin <url>",
        description: "Registers a remote repository URL under the alias 'origin'",
        example: "git remote add origin https://github.com/user/repo.git",
      },
      {
        syntax: "git remote -v",
        description: "Lists all registered remote connections with their fetch and push URLs",
        example: "git remote -v",
      },
      {
        syntax: "git push -u origin <branch>",
        description: "Pushes <branch> to remote 'origin' and configures upstream tracking",
        example: "git push -u origin main",
      },
      {
        syntax: "git fetch origin",
        description: "Downloads all remote commits and branches without altering local working files",
        example: "git fetch origin",
      },
      {
        syntax: "git pull origin <branch>",
        description: "Fetches and integrates remote changes into the current active branch",
        example: "git pull origin main",
      },
      {
        syntax: "git branch -vv",
        description: "Shows local branches and their remote upstream tracking relationship",
        example: "git branch -vv",
      },
    ],
    takeaways: [
      "Always set up SSH keys for frictionless authentication across your projects",
      "Run git pull before starting new feature branches to avoid unnecessary merge conflicts",
      "Pull Requests allow team code reviews, ensuring bugs are caught before reaching production",
    ],
    glossary: [
      {
        term: "Remote",
        definition: "A version of your repository hosted on the internet or a network server, such as GitHub or GitLab.",
      },
      {
        term: "Origin",
        definition: "The default conventional name assigned to the primary remote repository when cloning or adding a remote.",
      },
      {
        term: "Upstream Tracking",
        definition: "A configured relationship between a local branch and a remote branch (e.g. main -> origin/main) that simplifies git push and git pull.",
      },
      {
        term: "Pull Request (PR)",
        definition: "A GitHub mechanism allowing developers to notify teammates about completed features and request code review before merging.",
      },
    ],
    revisionQuestions: [
      {
        question: "What is the primary difference between git fetch and git pull?",
        answer: "git fetch downloads remote objects into your local .git database without modifying your working files; git pull performs a git fetch and immediately attempts to merge those changes into your active branch.",
      },
      {
        question: "Why is the -u flag used in git push -u origin main?",
        answer: "The -u (set-upstream) flag links your local main branch to origin/main on GitHub so subsequent pushes and pulls can simply use 'git push' or 'git pull'.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch4-q1",
      type: "multiple-choice",
      prompt: "Which command establishes an upstream tracking link between local main and GitHub origin/main?",
      options: [
        "git push -u origin main",
        "git remote link main",
        "git sync --all",
        "git checkout --track github",
      ],
      correctAnswer: 0,
      explanation: "Running 'git push -u origin main' (or --set-upstream) uploads the branch and configures Git's config to track origin/main for future operations.",
    },
    {
      id: "w2-ch4-q2",
      type: "multiple-choice",
      prompt: "What does 'git remote -v' display?",
      options: [
        "The fetch and push URLs for all configured remotes",
        "The latest commit on GitHub",
        "The Git binary version number",
        "A list of open Pull Requests",
      ],
      correctAnswer: 0,
      explanation: "'git remote -v' prints the name and exact URLs (for both fetch and push operations) of every remote configured in the repository.",
    },
  ],
};
