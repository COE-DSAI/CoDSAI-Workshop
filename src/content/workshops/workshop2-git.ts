import { Workshop } from "@/types/curriculum";

export const workshop2Git: Workshop = {
  id: "w2-git-github",
  slug: "git-github",
  number: 2,
  title: "Git & GitHub: Version Control for Team Projects",
  subtitle: "Collaborative Software Development & Source Code Management",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "interactive-simulation",
  targetAudience: "Developers and data scientists collaborating on code, models, and analytical pipelines.",
  prerequisites: [
    "Completion of Workshop 1 (Python Foundations) or basic terminal familiarity",
    "A computer with Git installed or access to a web terminal",
  ],
  learningOutcomes: [
    "Understand the snapshot model of Git vs linear file saving",
    "Configure Git identities, credentials, and local repository roots",
    "Track files across Working Directory, Staging Area, and Local Repository",
    "Inspect history and diffs using git status, git diff, and git log",
    "Create, isolate, and merge feature branches safely",
    "Resolve merge conflicts systematically without data loss",
    "Synchronize local work with GitHub remotes using clone, fetch, pull, and push",
    "Author professional READMEs, contribution guidelines, and clean .gitignore files",
  ],
  chapters: [
    {
      id: "w2-ch1",
      slug: "why-version-control-matters",
      number: 1,
      title: "Why Version Control Matters",
      estimatedMinutes: 10,
      introduction:
        "Every developer has experienced the nightmare of files named `project_final.py`, `project_final_v2.py`, and `project_FINAL_ACTUALLY_DONE.py`. Version control solves this chaos permanently. In this chapter, you will understand what version control is, why Git was created, and the difference between local and remote repositories.",
      learningObjectives: [
        "Explain the pitfalls of manual version tracking",
        "Define what a Distributed Version Control System (DVCS) is",
        "Distinguish between Git (local CLI tool) and GitHub (cloud hosting platform)",
      ],
      sections: [
        {
          id: "w2-ch1-s1",
          title: "1.1 The Chaos of Manual Versioning",
          content:
            "When collaborating on data science projects or software development, multiple team members edit files concurrently. Manually emailing zip files or renaming files causes:\n- Overwritten code and lost work\n- Zero record of *who* made a change or *why*\n- Inability to safely roll back to a known working version when a bug appears\n\nA **Version Control System (VCS)** records changes to a file or set of files over time so you can recall specific versions later.",
        },
        {
          id: "w2-ch1-s2",
          title: "1.2 Git vs GitHub: Clarifying the Confusion",
          content:
            "> [!IMPORTANT]\n> **Git is NOT GitHub.**\n>\n> - **Git** is an open-source, local command-line tool created by Linus Torvalds in 2005. It runs directly on your computer without requiring internet access.\n> - **GitHub** is a cloud-based hosting service and collaboration platform for Git repositories, owned by Microsoft. Other popular Git hosts include GitLab and Bitbucket.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Git tracks file snapshots over time.",
          "Git is local and distributed; every developer has a full clone of the repository history.",
          "GitHub is a cloud platform for remote repository hosting and team collaboration.",
        ],
        essentialSyntax: [
          {
            syntax: "git --version",
            description: "Verifies local Git installation.",
            example: "git --version -> git version 2.44.0",
          },
        ],
        takeaways: [
          "Never confuse the local tool (Git) with the web hosting platform (GitHub).",
        ],
        glossary: [
          {
            term: "Repository (Repo)",
            definition: "A directory tracked by Git containing project files and the hidden .git metadata database.",
          },
          {
            term: "Commit",
            definition: "A permanent cryptographic snapshot of the project at a specific point in time.",
          },
        ],
        revisionQuestions: [
          {
            question: "Can you use Git without an internet connection?",
            answer: "Yes, absolutely. Git is entirely local. You only need network access when pushing to or pulling from a remote host like GitHub.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q1-1",
          type: "concept",
          prompt: "Which statement accurately describes the relationship between Git and GitHub?",
          options: [
            "Git is the local version control tool; GitHub is a cloud hosting platform",
            "Git is made by GitHub; you cannot run Git without a GitHub account",
            "GitHub is a programming language; Git is its compiler",
            "They are identical products"
          ],
          correctAnswer: "Git is the local version control tool; GitHub is a cloud hosting platform",
          explanation: "Git is the underlying DVCS software running on your operating system. GitHub hosts Git repositories on the internet.",
        },
      ],
    },

    {
      id: "w2-ch2",
      slug: "setting-up-git",
      number: 2,
      title: "Setting Up Git",
      estimatedMinutes: 12,
      introduction:
        "Before making your first commit, Git requires your author identity so that every recorded change is properly attributed. In this chapter, you will configure your user name, email, default branch name, and understand the internal `.git` repository folder structure.",
      learningObjectives: [
        "Configure global Git author name and email via `git config`",
        "Set the modern default branch name to `main`",
        "Inspect the contents of the hidden `.git` metadata directory",
      ],
      sections: [
        {
          id: "w2-ch2-s1",
          title: "2.1 Setting Author Identity",
          content:
            "Run these commands once on any new development machine:\n\n```bash\ngit config --global user.name \"Priya Sharma\"\ngit config --global user.email \"priya.sharma@example.com\"\ngit config --global init.defaultBranch main\n```\n\nVerify your configuration with:\n```bash\ngit config --list\n```",
        },
        {
          id: "w2-ch2-s2",
          title: "2.2 The `.git` Directory",
          content:
            "When you run `git init`, Git creates a hidden directory named `.git`. This contains objects, index staging files, refs, and configuration. Never manually edit files inside `.git` directly.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "git config --global sets user identity across all repositories on the machine.",
          "The .git directory holds the entire version control database.",
        ],
        essentialSyntax: [
          {
            syntax: "git config --global user.name 'Name'",
            description: "Sets author name for commits.",
          },
          {
            syntax: "git config --global user.email 'Email'",
            description: "Sets author email for commits.",
          },
        ],
        takeaways: ["Ensure the email matches your GitHub account for proper commit attribution."],
        glossary: [
          {
            term: "Global Config",
            definition: "Configuration settings saved in ~/.gitconfig affecting all local repositories.",
          },
        ],
        revisionQuestions: [
          {
            question: "Where does Git store all commit history and object data for a project?",
            answer: "Inside the hidden `.git` folder located in the root directory of the repository.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q2-1",
          type: "concept",
          prompt: "Which command lists all active Git configuration settings?",
          options: ["git config --list", "git show settings", "git status --all", "git info"],
          correctAnswer: "git config --list",
          explanation: "git config --list prints all key-value configuration variables.",
        },
      ],
    },

    {
      id: "w2-ch3",
      slug: "your-first-repository",
      number: 3,
      title: "Your First Repository: The Three Trees",
      estimatedMinutes: 15,
      introduction:
        "Git's power comes from its three-stage architecture: Working Directory, Staging Area (Index), and Repository (HEAD). In this chapter, you will initialize a repository, check status, stage files with `git add`, and create immutable commit snapshots with `git commit`.",
      learningObjectives: [
        "Initialize a new repository using `git init`",
        "Inspect repository state using `git status`",
        "Stage files using `git add <file>` and `git add .`",
        "Create commits with clear, descriptive messages using `git commit -m`",
        "View historical log entries using `git log --oneline`",
      ],
      sections: [
        {
          id: "w2-ch3-s1",
          title: "3.1 The Three States of Git",
          content:
            "Git manages files across three distinct areas:\n1. **Working Directory**: The actual files on your filesystem that you edit in VS Code or any editor.\n2. **Staging Area (Index)**: A staging zone where you select which specific changes will be included in the next snapshot.\n3. **Repository (HEAD)**: The permanent database of committed snapshots.",
        },
        {
          id: "w2-ch3-s2",
          title: "3.2 The Core Workflow Loop",
          content:
            "The fundamental Git loop consists of three commands:\n\n```bash\n# 1. Check what has changed\ngit status\n\n# 2. Stage changes to the index\ngit add main.py\n\n# 3. Permanently record snapshot\ngit commit -m \"feat: implement rule-based message scanner\"\n\n# 4. Inspect commit log\ngit log --oneline\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Working Directory -> git add -> Staging Area -> git commit -> Local Repo.",
          "git status is your navigational compass in Git.",
          "Write meaningful commit messages explaining what and why.",
        ],
        essentialSyntax: [
          {
            syntax: "git init",
            description: "Initializes a new Git repo in the current folder.",
          },
          {
            syntax: "git add <path>",
            description: "Stages file changes for commit.",
          },
          {
            syntax: "git commit -m '<msg>'",
            description: "Records a new snapshot with description.",
          },
          {
            syntax: "git log --oneline",
            description: "Shows abbreviated commit history.",
          },
        ],
        takeaways: ["Commits should be atomic: one logical change per commit."],
        glossary: [
          {
            term: "Staging Area",
            definition: "An intermediate buffer between working files and commit history where changes are assembled.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does Git have a staging area rather than committing directly from the working directory?",
            answer: "The staging area allows you to craft precise, clean commits by choosing exactly which files and modifications belong together.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q3-1",
          type: "concept",
          prompt: "What state is a file in immediately after running `git add filename.py`?",
          options: ["Staged", "Modified", "Committed", "Pushed"],
          correctAnswer: "Staged",
          explanation: "git add moves changes from the working directory into the staging area (index).",
        },
      ],
    },

    {
      id: "w2-ch4",
      slug: "understanding-changes",
      number: 4,
      title: "Understanding Changes: Diffs and Ignoring Files",
      estimatedMinutes: 12,
      introduction:
        "Before committing code, you must verify exactly what changed line-by-line. In this chapter, you will use `git diff`, discard accidental changes with `git restore`, and prevent temporary files, virtual environments, and API secrets from ever entering your repository using `.gitignore`.",
      learningObjectives: [
        "Inspect unstaged and staged changes using `git diff` and `git diff --staged`",
        "Discard uncommitted working tree modifications using `git restore`",
        "Create a comprehensive `.gitignore` for Python data science projects",
      ],
      sections: [
        {
          id: "w2-ch4-s1",
          title: "4.1 Inspecting Differences with git diff",
          content:
            "- `git diff`: Shows differences between your Working Directory and Staging Area (unstaged edits).\n- `git diff --staged`: Shows differences between Staging Area and the last commit (what will be committed).\n\nLines prefixed with `+` in green are additions; lines prefixed with `-` in red are deletions.",
        },
        {
          id: "w2-ch4-s2",
          title: "4.2 The Crucial Role of .gitignore",
          content:
            "Certain files should **never** be tracked in version control:\n- Compiled Python bytecode (`__pycache__/`, `*.pyc`)\n- Virtual environments (`.venv/`, `env/`)\n- Private API keys and secrets (`.env`)\n- Heavy raw datasets or local cache folders\n\nCreate a `.gitignore` text file in the repository root containing patterns to ignore:\n\n```gitignore\n# Python bytecode\n__pycache__/\n*.py[cod]\n\n# Virtual environments\n.venv/\nenv/\n\n# Secrets\n.env\n*.key\n\n# OS metadata\n.DS_Store\nThumbs.db\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "git diff checks changes before staging; git diff --staged checks staged changes.",
          "git restore discards unstaged edits in the working tree.",
          ".gitignore prevents sensitive or bulky files from being tracked.",
        ],
        essentialSyntax: [
          {
            syntax: "git diff",
            description: "Shows unstaged differences.",
          },
          {
            syntax: "git restore <file>",
            description: "Restores working tree file to match last commit.",
          },
        ],
        takeaways: ["Never commit secrets, tokens, or large virtual environment folders."],
        glossary: [
          {
            term: ".gitignore",
            definition: "A text file specifying intentionally untracked files that Git should ignore.",
          },
        ],
        revisionQuestions: [
          {
            question: "If a file was already committed to Git, does adding it to `.gitignore` stop Git from tracking it?",
            answer: "No. Git only ignores untracked files. You must first run `git rm --cached <file>` to remove it from tracking.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q4-1",
          type: "concept",
          prompt: "Which command shows the exact line changes currently staged for the next commit?",
          options: ["git diff --staged", "git diff", "git status --verbose", "git log -p"],
          correctAnswer: "git diff --staged",
          explanation: "git diff --staged (or --cached) compares the staging area against the latest commit.",
        },
      ],
    },

    {
      id: "w2-ch5",
      slug: "branching-and-merging",
      number: 5,
      title: "Branching and Merging",
      estimatedMinutes: 15,
      introduction:
        "Branches are Git's killer feature. They allow you to diverge from the main line of development to build features, fix bugs, or experiment with new machine learning models in complete isolation. In this chapter, you will create branches, switch between them, merge changes back into main, and resolve merge conflicts.",
      learningObjectives: [
        "Explain the pointer-based architecture of Git branches",
        "Create and switch branches using `git switch -c <name>` or `git checkout -b <name>`",
        "Perform fast-forward and 3-way merge operations",
        "Identify and resolve merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)",
      ],
      sections: [
        {
          id: "w2-ch5-s1",
          title: "5.1 Why Branches Exist",
          content:
            "A branch in Git is simply a lightweight, movable pointer to a commit. Working on `main` directly in a team is risky because incomplete code breaks the build for everyone.\n\nThe standard practice is **feature branching**:\n1. Create a branch from `main`: `git switch -c feature/email-scanner`\n2. Work, test, and commit on the branch\n3. Switch back to `main`: `git switch main`\n4. Merge the feature branch: `git merge feature/email-scanner`\n5. Delete the merged feature branch: `git branch -d feature/email-scanner`",
        },
        {
          id: "w2-ch5-s2",
          title: "5.2 Resolving Merge Conflicts",
          content:
            "When two branches modify the **same lines of the same file** differently, Git cannot guess which version is correct. It pauses the merge and inserts conflict markers:\n\n```text\n<<<<<<< HEAD (Current branch: main)\nSTATUS_THRESHOLD = 3\n=======\nSTATUS_THRESHOLD = 5\n>>>>>>> feature/email-scanner\n```\n\nTo resolve the conflict:\n1. Open the file and manually decide the correct code.\n2. Delete all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).\n3. Stage the resolved file: `git add <file>`\n4. Complete the merge commit: `git commit -m \"merge: resolve status threshold conflict\"`",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Branches isolate independent lines of development.",
          "Merging integrates one branch's history into another.",
          "Merge conflicts occur when overlapping lines conflict; humans must resolve them.",
        ],
        essentialSyntax: [
          {
            syntax: "git switch -c <branch>",
            description: "Creates and switches to a new branch.",
          },
          {
            syntax: "git merge <branch>",
            description: "Merges named branch into current active branch.",
          },
          {
            syntax: "git branch -d <branch>",
            description: "Deletes a merged branch safely.",
          },
        ],
        takeaways: ["Keep feature branches short-lived to minimize large merge conflicts."],
        glossary: [
          {
            term: "Merge Conflict",
            definition: "An event occurring when Git is unable to automatically resolve differences in code between two commits.",
          },
        ],
        revisionQuestions: [
          {
            question: "What branch must you be on before running `git merge feature`?",
            answer: "You must be on the receiving target branch (e.g. `main`), verified via `git status` or `git branch`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q5-1",
          type: "concept",
          prompt: "What does the marker `<<<<<<< HEAD` indicate inside a conflicted file?",
          options: [
            "The beginning of changes on the current active branch",
            "The incoming changes from the remote branch",
            "A syntax error in your Python script",
            "The end of the conflict zone"
          ],
          correctAnswer: "The beginning of changes on the current active branch",
          explanation: "HEAD marks the state of the current checked-out branch at the start of the conflict block.",
        },
      ],
    },

    {
      id: "w2-ch6",
      slug: "github-and-remotes",
      number: 6,
      title: "GitHub and Remote Repositories",
      estimatedMinutes: 15,
      introduction:
        "Remote repositories on GitHub allow team members to synchronize their local Git histories across the internet. In this chapter, you will link a local repository to GitHub, clone existing repositories, push your commits, and pull incoming team updates.",
      learningObjectives: [
        "Add remote origins using `git remote add origin <url>`",
        "Clone remote repositories to local machines with `git clone`",
        "Push commits to remote repositories with `git push -u origin main`",
        "Fetch and integrate remote changes with `git pull`",
      ],
      sections: [
        {
          id: "w2-ch6-s1",
          title: "6.1 Remotes and Origins",
          content:
            "A **remote** is a version of your repository hosted on the internet or network. The primary default remote is conventionally named `origin`.\n\n```bash\n# Link local repo to GitHub\ngit remote add origin https://github.com/coe-dsai/inbox-guardian.git\n\n# Verify remotes\ngit remote -v\n\n# Push main branch and set upstream tracking\ngit push -u origin main\n```",
        },
        {
          id: "w2-ch6-s2",
          title: "6.2 Pulling and Fetching",
          content:
            "- `git fetch origin`: Downloads remote commits to your local repo without modifying your working files.\n- `git pull origin main`: Fetches changes AND immediately attempts to merge them into your current local branch (`git fetch` + `git merge`).",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "origin is the default shorthand name for the primary remote repository URL.",
          "git push sends local commits to the remote.",
          "git pull retrieves remote commits and merges them into the local branch.",
        ],
        essentialSyntax: [
          {
            syntax: "git clone <url>",
            description: "Downloads an entire remote repository to a new directory.",
          },
          {
            syntax: "git push origin <branch>",
            description: "Uploads local branch commits to remote repository.",
          },
          {
            syntax: "git pull origin <branch>",
            description: "Fetches and merges remote changes into local branch.",
          },
        ],
        takeaways: ["Always `git pull` before beginning new work to ensure your local branch is up to date."],
        glossary: [
          {
            term: "Upstream",
            definition: "The remote branch tracked by your local branch for pushing and pulling.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the difference between `git fetch` and `git pull`?",
            answer: "`git fetch` only downloads changes without altering your working directory. `git pull` runs fetch followed by merge into your current branch.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q6-1",
          type: "concept",
          prompt: "What does the `-u` flag do in `git push -u origin main`?",
          options: [
            "Sets upstream tracking so future pushes can just use 'git push'",
            "Forces an update even if conflicts exist",
            "Unlocks the remote repository",
            "Creates a user account"
          ],
          correctAnswer: "Sets upstream tracking so future pushes can just use 'git push'",
          explanation: "`-u` or `--set-upstream` establishes a tracking link between local main and origin/main.",
        },
      ],
    },

    {
      id: "w2-ch7",
      slug: "collaboration-workflow",
      number: 7,
      title: "Collaboration Workflow: Pull Requests & Code Review",
      estimatedMinutes: 15,
      introduction:
        "Modern engineering and data science teams do not push directly to main. Instead, they use Pull Requests (PRs) and peer code reviews. In this chapter, you will learn the industry-standard GitHub Flow, how to write constructive code reviews, and protect code quality.",
      learningObjectives: [
        "Explain the GitHub Flow model (Branch -> Commit -> PR -> Review -> Merge)",
        "Open a Pull Request with a clear description and testing checklist",
        "Participate in constructive peer code review",
        "Avoid accidental history rewrites and broken builds",
      ],
      sections: [
        {
          id: "w2-ch7-s1",
          title: "7.1 The GitHub Flow",
          content:
            "1. **Branch**: Create a descriptive branch (`git switch -c feature/add-stats-chart`).\n2. **Commit**: Make small, tested commits locally.\n3. **Push**: Push the branch to GitHub (`git push -u origin feature/add-stats-chart`).\n4. **Pull Request**: Open a PR on GitHub proposing to merge into `main`.\n5. **Review**: Team members review code, suggest improvements, and test.\n6. **Merge**: Once approved, merge the PR and delete the feature branch.",
        },
        {
          id: "w2-ch7-s2",
          title: "7.2 Code Review Best Practices",
          content:
            "- Look for readability, potential edge case bugs, and security risks.\n- Provide specific actionable suggestions rather than generic criticism.\n- Verify test cases and documentation updates are included.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Pull Requests facilitate discussion, automated testing, and peer review before merging.",
          "Direct pushes to main should be disabled via branch protection rules.",
        ],
        essentialSyntax: [
          {
            syntax: "git push origin <feature-branch>",
            description: "Publishes feature branch to GitHub for PR creation.",
          },
        ],
        takeaways: ["Code reviews protect project health and facilitate knowledge sharing."],
        glossary: [
          {
            term: "Pull Request (PR)",
            definition: "A proposal to merge changes from one branch into another, reviewed and discussed by collaborators.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should teams restrict direct pushes to the `main` branch?",
            answer: "To ensure all production code is peer-reviewed, tests pass automatically, and broken builds are prevented.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q7-1",
          type: "concept",
          prompt: "What is the primary purpose of a Pull Request?",
          options: [
            "To request review and discussion before merging code into a target branch",
            "To download files to your computer",
            "To pull commits from origin to local",
            "To delete obsolete branches"
          ],
          correctAnswer: "To request review and discussion before merging code into a target branch",
          explanation: "A Pull Request is a collaborative review mechanism for proposed changes.",
        },
      ],
    },

    {
      id: "w2-ch8",
      slug: "documentation-and-hygiene",
      number: 8,
      title: "Documentation and Repository Hygiene",
      estimatedMinutes: 12,
      introduction:
        "A repository without documentation is unusable by others. In this chapter, you will learn how to write a professional `README.md`, document setup steps, list dependencies with `requirements.txt`, and maintain repository hygiene.",
      learningObjectives: [
        "Structure a professional project README using Markdown",
        "Document Python requirements using `pip freeze > requirements.txt`",
        "Maintain clean git logs with standardized commit conventions",
      ],
      sections: [
        {
          id: "w2-ch8-s1",
          title: "8.1 Professional README Architecture",
          content:
            "Every project repository should include a root `README.md` containing:\n- **Project Title & Subtitle**: Clear one-sentence value proposition.\n- **Overview**: What the application does and why it was built.\n- **Installation**: Step-by-step terminal commands to clone and set up.\n- **Usage**: Clear examples showing how to run the application.\n- **Project Structure**: High-level map of folders and scripts.\n- **License & Author**: Ownership and reuse terms.",
        },
        {
          id: "w2-ch8-s2",
          title: "8.2 Dependency Management with requirements.txt",
          content:
            "Always capture required external libraries:\n\n```bash\n# Generate requirements file\npip freeze > requirements.txt\n\n# Install in a fresh clone\npip install -r requirements.txt\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "README.md is the front door of your project.",
          "requirements.txt guarantees reproducibility for teammates.",
        ],
        essentialSyntax: [
          {
            syntax: "pip freeze > requirements.txt",
            description: "Exports installed Python packages with exact versions.",
          },
        ],
        takeaways: ["Treat documentation with the same engineering rigor as code."],
        glossary: [
          {
            term: "README.md",
            definition: "The primary documentation file displayed by GitHub on the repository homepage.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you specify package versions in `requirements.txt`?",
            answer: "To prevent future package updates from breaking your application (ensuring reproducibility).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q8-1",
          type: "concept",
          prompt: "Which file is automatically rendered as the homepage documentation on GitHub?",
          options: ["README.md", "INDEX.html", "DOCS.txt", "INFO.md"],
          correctAnswer: "README.md",
          explanation: "GitHub automatically renders README.md at the root of a repository.",
        },
      ],
    },

    {
      id: "w2-ch9",
      slug: "practical-team-project",
      number: 9,
      title: "Practical Team Project: Collaborative Inbox Guardian Repo",
      estimatedMinutes: 20,
      introduction:
        "In this final chapter of Workshop 2, you will tie together all Git concepts: create a shared repository for Inbox Guardian, branch out to develop new features concurrently, resolve a simulated merge conflict, write a complete README, and publish the repository to GitHub.",
      learningObjectives: [
        "Initialize, structure, and commit the complete Inbox Guardian project",
        "Simulate team collaboration using feature branches",
        "Resolve a deliberate merge conflict in the keyword configuration file",
        "Publish the completed portfolio project to GitHub",
      ],
      sections: [
        {
          id: "w2-ch9-s1",
          title: "9.1 Practical Git Simulation Walkthrough",
          content:
            "Follow these terminal steps on your local machine or follow our interactive simulator:\n\n```bash\n# 1. Create project directory\nmkdir inbox-guardian-app && cd inbox-guardian-app\ngit init\n\n# 2. Add files and initial commit\ncp /path/to/inbox_guardian.py .\necho \"# Inbox Guardian\" > README.md\ngit add .\ngit commit -m \"feat: initial release of Inbox Guardian scanner\"\n\n# 3. Create feature branch\ngit switch -c feature/export-logs\n# Add export feature in inbox_guardian.py\ngit commit -am \"feat: add JSON export function\"\n\n# 4. Merge back to main\ngit switch main\ngit merge feature/export-logs\ngit branch -d feature/export-logs\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete hands-on mastery of Git workflow.",
          "Feature branches + pull requests = production quality.",
        ],
        essentialSyntax: [
          {
            syntax: "git commit -am 'message'",
            description: "Stages modified tracked files and commits in one step.",
          },
        ],
        takeaways: ["Regular commits and clear branch names make team projects stress-free."],
        glossary: [
          {
            term: "Feature Branch Workflow",
            definition: "A git workflow where all feature development takes place in dedicated branches rather than the main branch.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should a feature branch be deleted after merging?",
            answer: "To keep the repository clean and avoid confusion about active work.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w2-q9-1",
          type: "concept",
          prompt: "What does `git commit -am 'msg'` do differently than `git commit -m 'msg'`?",
          options: [
            "Automatically stages already-tracked modified files before committing",
            "Adds an author tag to the commit",
            "Pushes immediately to all remotes",
            "Amends the previous commit"
          ],
          correctAnswer: "Automatically stages already-tracked modified files before committing",
          explanation: "The `-a` flag automatically stages modified and deleted files that are already tracked by Git.",
        },
      ],
    },
  ],
};
