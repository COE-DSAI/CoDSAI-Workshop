import { Chapter } from "@/types/curriculum";

export const chapter2: Chapter = {
  id: "w2-ch2",
  slug: "initializing-staging-and-commits",
  number: 2,
  title: "The Three Trees: Initializing, Staging & Commits",
  estimatedMinutes: 25,
  introduction:
    "To master Git, you must understand its internal mental model: **The Three Trees**. Unlike other version control systems that track file deltas, Git manages three distinct areas: your Working Directory, the Staging Area (Index), and the Git Repository history. In this chapter, you will initialize your first repository from scratch, inspect repository status, stage files with surgical precision, write atomic commit messages adhering to industry standards, and configure a production-grade .gitignore file.",
  learningObjectives: [
    "Visualize and navigate Git's Three Trees: Working Directory, Staging Index, and Git Repository Object Store (.git)",
    "Initialize local repositories using git init and inspect the hidden .git metadata structure",
    "Interpret git status outputs across untracked, modified, staged, and clean working tree states",
    "Stage specific files using git add <file> and bulk stage projects using git add .",
    "Author meaningful, atomic commit snapshots with git commit -m using the Conventional Commits specification",
    "Protect repositories from committing sensitive secrets, binary artifacts, and cache files using .gitignore",
    "Examine commit log history with git log --oneline --graph --decorate",
  ],
  sections: [
    {
      id: "w2-ch2-s1",
      title: "2.1 The Three Trees Architecture: Working Directory, Staging Area & Repository",
      content:
        "Every file in a Git project lives in one of three states:\n\n1. **The Working Directory**: The actual files on your filesystem that you open in VS Code, edit, and run. These files are untracked or modified until explicitly staged.\n2. **The Staging Area (The Index)**: A staging buffer where you prepare the exact snapshot of changes that will go into your next commit. This unique middle-layer lets you selectively group related changes instead of committing half-baked code.\n3. **The Git Repository (.git)**: The permanent database of immutable commit objects, trees, and blobs stored inside the hidden `.git` folder in your project root.",
      callout: {
        type: "tip",
        title: "Why Staging Matters",
        content:
          "The staging area gives you architectural control. If you edited 5 files but only 2 of them belong to a bug fix, you can stage only those 2 (`git add file1.py file2.py`) and commit them as a clean, single-purpose unit.",
      },
    },
    {
      id: "w2-ch2-s2",
      title: "2.2 Initializing a Project (`git init`) & Inspecting State (`git status`)",
      content:
        "To place an existing folder under Git version control, navigate into that folder in your terminal and execute `git init`. This creates a hidden `.git` directory containing Git's internal object database, branch references (HEAD), and config files.\n\nThe most important command you will run in your day-to-day work is `git status`. It answers three fundamental questions:\n• Which branch are you currently on?\n• What changes are staged for commit?\n• What files are modified or untracked?",
      codeExamples: [
        {
          id: "w2-ch2-ex1",
          title: "Terminal Command 1: Initialize a New Repository and Inspect Status",
          description: "Create a project directory, initialize Git tracking, and verify initial repository state.",
          code: `# Create and enter a new project directory
mkdir my-ai-project
cd my-ai-project

# Initialize a new Git repository
git init

# Check the initial repository status
git status`,
          explanation:
            "git init creates the hidden .git directory in the current working path. Running git status immediately afterward displays the current branch name (main) and confirms that no commits have been made yet.",
          stepByStepWalkthrough: [
            "mkdir my-ai-project creates a fresh directory.",
            "cd my-ai-project changes your terminal's current working directory.",
            "git init scaffolds the .git subfolder.",
            "git status prints current branch state and shows 'No commits yet'.",
          ],
          expectedOutput:
            "Initialized empty Git repository in /Users/you/my-ai-project/.git/\nOn branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use \"git add\" to track)",
          whyItHappens:
            "A newly initialized repo has no commits and an empty staging index.",
          edgeCases:
            "• Running git init inside a folder that is ALREADY inside another Git repository creates an accidental nested repo. Always verify with git status before running git init.",
        },
      ],
    },
    {
      id: "w2-ch2-s3",
      title: "2.3 Staging Files (`git add`) and Creating Snapshots (`git commit`)",
      content:
        "When you create a file (e.g., `app.py` or `README.md`), Git recognizes it as an **untracked file**. It will not be included in version history until you move it to the Staging Index using `git add`.\n\nOnce files are staged, you take a snapshot of that exact moment using `git commit -m \"<message>\"`. Commits are permanently recorded with a unique SHA-1/SHA-256 hash, author timestamp, and commit message.\n\n### The Conventional Commits Standard\nIndustry engineering teams follow structured commit messages:\n• `feat: add email threat scoring function`\n• `fix: resolve zero division bug in metric calculation`\n• `docs: update setup instructions in README.md`\n• `refactor: clean up loop syntax in data preprocessor`",
      codeExamples: [
        {
          id: "w2-ch2-ex2",
          title: "Terminal Command 2: Create, Stage, and Commit a File",
          description: "Create a project README, stage it in the index, and commit with an atomic message.",
          code: `# Create a README markdown file
echo "# My AI Project" > README.md

# Inspect status to see untracked file
git status -s

# Stage the file into the index
git add README.md

# Verify file is staged (green 'A' marker)
git status -s

# Commit the staged snapshot
git commit -m "docs: add initial project README"`,
          explanation:
            "git add README.md copies the file contents into Git's object store and registers it in the Index. git commit freezes the staged state into a permanent commit object pointing to the file tree.",
          stepByStepWalkthrough: [
            "echo writes '# My AI Project' into README.md.",
            "git status -s uses short format: '?? README.md' indicates an untracked file.",
            "git add stages the file: status changes to 'A  README.md' (Added).",
            "git commit packages the staged index into commit snapshot [main (root-commit)].",
          ],
          expectedOutput:
            "[main (root-commit) a1b2c3d] docs: add initial project README\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md",
          whyItHappens:
            "Git reports the short hash (a1b2c3d), branch name, commit title, and summary of insertions and files created.",
          edgeCases:
            "• If you run git commit without -m, Git opens a terminal text editor (Vim or Nano) to prompt for a message. To exit Vim: type ':wq' and hit Enter. To exit Nano: press 'Ctrl + O' then Enter, then 'Ctrl + X'.",
        },
      ],
    },
    {
      id: "w2-ch2-s4",
      title: "2.4 Protecting Repositories with `.gitignore` & Inspecting History (`git log`)",
      content:
        "Never commit secrets (API keys, passwords), dependencies (`node_modules/`, `venv/`), or OS cache files (`.DS_Store`, `Thumbs.db`).\n\nA `.gitignore` file contains wildcard patterns telling Git which files and folders to completely ignore.\n\nTo view your project history, run `git log`. Adding `--oneline --graph --decorate` produces a clean, readable ASCII branch tree.",
      codeExamples: [
        {
          id: "w2-ch2-ex3",
          title: "Terminal Command 3: Configure .gitignore and View Commit History",
          description: "Create a standard .gitignore file, stage and commit it, and inspect the project log tree.",
          code: `# Create a standard .gitignore for Python and environment files
cat << 'EOF' > .gitignore
# Python virtual environments & bytecode
__pycache__/
*.py[cod]
.venv/
env/

# Environment secrets & local config
.env
.env.local

# Operating system files
.DS_Store
Thumbs.db
EOF

# Stage and commit .gitignore
git add .gitignore
git commit -m "chore: add .gitignore rules for virtual environments and secrets"

# Display pretty one-line commit history
git log --oneline --graph --decorate`,
          explanation:
            "The .gitignore file prevents matching patterns from appearing in git status or being accidentally staged by git add . git log --oneline compresses each commit into a single line showing its short hash, branch pointers (HEAD -> main), and message.",
          stepByStepWalkthrough: [
            "The cat command writes standard ignore rules into .gitignore.",
            "git add .gitignore stages the rule file.",
            "git commit commits the configuration.",
            "git log --oneline displays the chronological history of commits from newest to oldest.",
          ],
          expectedOutput:
            "* b4c5d6e (HEAD -> main) chore: add .gitignore rules for virtual environments and secrets\n* a1b2c3d docs: add initial project README",
          whyItHappens:
            "The asterisk (*) shows the graph line, HEAD -> main shows the active branch pointer, and the hexadecimal hashes uniquely identify each snapshot.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w2-ch2-ex-commit-flow",
      title: "Exercise 2: Practice the Full Git Lifecycle",
      difficulty: "basic",
      prompt:
        "In your terminal inside your project folder, create a new file named 'main.py' containing print('Hello Git'), stage it, and commit it with the message 'feat: implement main entry point'. Then view your log.",
      starterCode: `# Run these in your project directory terminal:
echo "print('Hello Git')" > main.py
git status
git add main.py
git commit -m "feat: implement main entry point"
git log --oneline`,
      hints: [
        "First create the file using echo or your code editor.",
        "Use git status to verify it appears in red under 'Untracked files'.",
        "Use git add main.py to move it to staged changes (green), then commit.",
      ],
      solution: `echo "print('Hello Git')" > main.py
git add main.py
git commit -m "feat: implement main entry point"
git log --oneline`,
      solutionExplanation:
        "This standard workflow: modify -> stage with git add -> commit with git commit -m ensures every commit is atomic and documented.",
    },
  ],
  recap: {
    keyConcepts: [
      "The Three Trees: Working Directory (untracked/modified), Staging Index (prepared snapshot), and Git Repository (.git database)",
      "git init initializes a new repository by creating the hidden .git directory",
      "git status is the central command to inspect the current state of files across the three trees",
      "git add stages changes into the Index; git commit converts the staged Index into an immutable commit object",
      ".gitignore prevents accidental commits of secrets, virtual environments, and system junk files",
      "git log --oneline --graph visualizes the history of commit snapshots in reverse chronological order",
    ],
    essentialSyntax: [
      {
        syntax: "git init",
        description: "Initializes a new Git repository in the current directory",
        example: "git init",
      },
      {
        syntax: "git status",
        description: "Displays the state of the working directory and the staging area",
        example: "git status",
      },
      {
        syntax: "git add <path>",
        description: "Stages file changes at <path> into the staging area (use . for all changes in current directory)",
        example: "git add main.py",
      },
      {
        syntax: 'git commit -m "<message>"',
        description: "Records staged changes as a new commit snapshot with an explanatory message",
        example: 'git commit -m "feat: add user authentication"',
      },
      {
        syntax: "git log --oneline",
        description: "Displays commit history with one commit per line including short SHA-1 hash",
        example: "git log --oneline",
      },
      {
        syntax: "git diff",
        description: "Shows unstaged differences between your working directory and the staging area",
        example: "git diff",
      },
    ],
    takeaways: [
      "Commit frequently with small, logical changes rather than one gigantic end-of-day commit",
      "Always inspect git status before and after staging to confirm only intended files are included",
      "Set up .gitignore BEFORE adding virtual environments or node_modules to avoid tracking thousands of third-party files",
    ],
    glossary: [
      {
        term: "Working Directory",
        definition: "The local sandbox on your filesystem where files can be actively modified and tested.",
      },
      {
        term: "Staging Area (Index)",
        definition: "An intermediate cache that prepares and formats the exact changes to be committed next.",
      },
      {
        term: "Commit",
        definition: "An immutable cryptographic snapshot of the staged files along with author information, timestamp, parent commit pointers, and message.",
      },
      {
        term: "HEAD",
        definition: "A pointer in Git referencing the current active branch and latest commit in your working directory.",
      },
    ],
    revisionQuestions: [
      {
        question: "What is the difference between git add <file> and git commit -m '<message>'?",
        answer: "git add moves changes from the working directory into the intermediate staging area (Index); git commit permanently packages everything in the staging area into a new immutable snapshot in repository history.",
      },
      {
        question: "Why should .env files always be listed in .gitignore?",
        answer: ".env files often contain private API keys, database passwords, and secrets. If committed to a Git repository, those secrets become permanent in the history and risk public exposure.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch2-q1",
      type: "multiple-choice",
      prompt: "What does the command 'git status' output when a newly created file has not yet been staged?",
      options: [
        "Untracked files",
        "Changes to be committed",
        "Staged for release",
        "Detached HEAD warning",
      ],
      correctAnswer: 0,
      explanation: "New files that Git has never tracked before appear in the 'Untracked files' section of git status until staged with git add.",
    },
    {
      id: "w2-ch2-q2",
      type: "multiple-choice",
      prompt: "Which command shows the concise one-line commit log graph?",
      options: [
        "git log --oneline --graph",
        "git show --tree",
        "git status --graph",
        "git diff --summary",
      ],
      correctAnswer: 0,
      explanation: "git log --oneline --graph prints an ASCII-rendered commit tree where each commit is displayed on a single line with its shortened SHA hash.",
    },
  ],
};
