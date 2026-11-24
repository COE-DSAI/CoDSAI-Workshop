import { Chapter } from "@/types/curriculum";

export const chapter1: Chapter = {
  id: "w2-ch1",
  slug: "installing-git-and-local-setup",
  number: 1,
  title: "Installing Git & Local PC Environment Setup",
  estimatedMinutes: 20,
  introduction:
    "Welcome to Workshop 02: Git & GitHub. Professional software engineering and data science require ironclad version control. Unlike cloud documents with opaque autosave, Git provides a distributed, cryptographic snapshot history of your entire project. In this chapter, you will install Git directly onto your local computer (macOS, Windows, or Linux), configure your global developer identity, and set up your command line environment.",
  learningObjectives: [
    "Understand the core distinction between centralized version control, local file backups, and distributed version control (Git)",
    "Install Git on your personal computer using the recommended package manager or standalone installer for your operating system",
    "Configure global identity keys: user.name, user.email, and init.defaultBranch main",
    "Configure line-ending normalization (core.autocrlf) to prevent cross-platform corruption between Windows and Unix systems",
    "Verify local installation using git --version and inspect active configuration levels with git config --list --show-origin",
  ],
  sections: [
    {
      id: "w2-ch1-s1",
      title: "1.1 Why Version Control Matters: Snapshots vs File Copies",
      content:
        "Before version control systems existed, developers and researchers tracked versions by creating endless copies of files: `model_final.py`, `model_final_v2.py`, `model_final_REAL_v3.py`. This ad-hoc approach quickly breaks down: you lose the reasoning behind changes, cannot easily collaborate, and risk overwriting teammates' work.\n\nGit was created by Linus Torvalds in 2005. It treats data like a stream of **cryptographic snapshots**. Every time you commit, Git records a snapshot of what all your files look like at that moment, producing a SHA-1/SHA-256 hash that guarantees file integrity. If a file has not changed, Git simply links to the identical file it previously stored.\n\nCrucially, **Git is completely decentralized**. Your local computer contains the entire repository history, meaning you can commit, inspect history, and branch with zero network connection.",
      callout: {
        type: "note",
        title: "Setup on Your Personal Computer",
        content:
          "Because software engineering requires hands-on CLI proficiency, you will run all the commands in this workshop directly in your personal machine's Terminal (macOS/Linux) or PowerShell / Git Bash (Windows). You do not need to run an in-browser emulator.",
      },
    },
    {
      id: "w2-ch1-s2",
      title: "1.2 Installing Git on macOS, Windows & Linux",
      content:
        "Select the installation path tailored for your operating system:\n\n### macOS\nOpen your Terminal (`⌘ + Space`, type `Terminal`, hit Enter) and check if Apple Command Line Developer Tools are installed by running `xcode-select --install`. Alternatively, if you use Homebrew, simply run:\n`brew install git`\n\n### Windows\nDownload the official **Git for Windows** standalone installer from [git-scm.com](https://git-scm.com/download/win). When running the installer:\n• Select **Use Visual Studio Code as Git's default editor** (if installed)\n• Choose **Git from the command line and also from 3rd-party software**\n• Under line ending conversions, choose **Checkout Windows-style, commit Unix-style line endings** (`core.autocrlf true`)\n• Use the bundled **Git Bash** or Windows Terminal with PowerShell.\n\n### Linux (Ubuntu / Debian)\nOpen your terminal and run:\n`sudo apt update && sudo apt install -y git`",
      codeExamples: [
        {
          id: "w2-ch1-ex1",
          title: "Terminal Command 1: Verify Git Installation",
          description: "Verify that Git is accessible in your system PATH and print the installed version.",
          code: `# Check the installed Git version
git --version`,
          explanation:
            "The git --version command queries the Git binary for its compiled release version. If Git is correctly installed and registered in your system PATH, it outputs the current semantic version.",
          stepByStepWalkthrough: [
            "Open your local terminal (Terminal on Mac/Linux, PowerShell or Git Bash on Windows).",
            "Type 'git --version' and press Enter.",
            "Confirm that the version is 2.30 or higher.",
          ],
          expectedOutput: "git version 2.44.0",
          whyItHappens:
            "If your terminal responds with 'command not found' or ''git' is not recognized', your system has not added Git to its environment PATH or you need to restart your terminal session after installation.",
          edgeCases:
            "• On macOS, running git for the first time without Xcode Command Line Tools installed triggers a system modal asking you to install them. Accept and allow it to finish.\n• On Windows PowerShell, if the command fails, verify that C:\\Program Files\\Git\\cmd is present in your User Environment Variables.",
        },
      ],
    },
    {
      id: "w2-ch1-s3",
      title: "1.3 Configuring Global Developer Identity",
      content:
        "Git embeds your author identity into every single commit you create. Before creating any commits, you must tell Git who you are. This information is public and attached immutably to your repository commits.\n\nGit stores configuration at three distinct levels:\n1. **System (`--system`)**: Applied system-wide to every user on the PC.\n2. **Global (`--global`)**: Applied to your personal user account across all repositories (`~/.gitconfig`).\n3. **Local (`--local`)**: Applied strictly to the current active repository (`.git/config`).",
      codeExamples: [
        {
          id: "w2-ch1-ex2",
          title: "Terminal Command 2: Setting Global User Identity",
          description: "Assign your full name and public email address to all Git commits on this machine.",
          code: `# Set your full legal/professional name
git config --global user.name "Your Name"

# Set your primary email (match this with your GitHub account email)
git config --global user.email "your.email@example.com"

# Set the default initial branch name to 'main'
git config --global init.defaultBranch main`,
          explanation:
            "The git config command modifies key-value pairs in your global configuration file located at ~/.gitconfig. Setting init.defaultBranch to main ensures all new repositories use modern industry naming conventions.",
          stepByStepWalkthrough: [
            "Replace 'Your Name' with your name and 'your.email@example.com' with the email address registered on GitHub.",
            "Run each command sequentially.",
            "Setting init.defaultBranch main eliminates legacy default branch warnings when initializing new repositories.",
          ],
          expectedOutput: "# (No output emitted on success)",
          whyItHappens:
            "In Unix and Git conventions, silence indicates success: if no error is raised, the configuration keys were written cleanly to ~/.gitconfig.",
          edgeCases:
            "• If your name contains spaces, you MUST enclose it in double quotes: git config --global user.name \"First Last\". Failing to do so causes Git to treat the second name as an unrecognized argument.",
        },
        {
          id: "w2-ch1-ex3",
          title: "Terminal Command 3: Cross-Platform Line Endings & Inspecting Configuration",
          description: "Prevent whitespace diff noise between Windows (CRLF) and Unix/macOS (LF) and verify all settings.",
          code: `# On macOS / Linux:
git config --global core.autocrlf input

# On Windows (PowerShell / Command Prompt):
# git config --global core.autocrlf true

# Verify all configured settings and their file sources
git config --list --show-origin`,
          explanation:
            "Windows terminates lines with Carriage Return + Line Feed (CRLF, \\r\\n), while macOS and Linux use Line Feed only (LF, \\n). The core.autocrlf setting automatically normalizes line endings on commit to prevent phantom differences in code reviews.",
          stepByStepWalkthrough: [
            "Set core.autocrlf according to your host operating system.",
            "Run git config --list --show-origin to see every active setting alongside the exact file on your disk where it was loaded.",
          ],
          expectedOutput:
            "file:/Users/you/.gitconfig\tuser.name=Your Name\nfile:/Users/you/.gitconfig\tuser.email=your.email@example.com\nfile:/Users/you/.gitconfig\tinit.defaultbranch=main\nfile:/Users/you/.gitconfig\tcore.autocrlf=input",
          whyItHappens:
            "The --show-origin flag tells you which configuration file defines each value, resolving confusion between system, global, and local repo overrides.",
        },
      ],
      callout: {
        type: "tip",
        title: "Match Your GitHub Email",
        content:
          "Make sure your user.email configuration matches the verified email address on your GitHub profile. This ensures GitHub correctly attributes your commits and contributions to your profile graph.",
      },
    },
    {
      id: "w2-ch1-s4",
      title: "1.4 Authenticating to GitHub: GitHub CLI (`gh auth login`) & Personal Access Tokens (PAT)",
      content:
        "In August 2021, GitHub permanently deprecated plain account passwords for Git operations over HTTPS to protect against credential stuffing attacks. Today, authenticating your local terminal to GitHub requires one of two modern mechanisms:\n\n1. **The Official GitHub CLI (`gh`)**: The recommended, streamlined approach that configures your operating system's native credential helper automatically.\n2. **Personal Access Tokens (PAT)**: Cryptographic API tokens generated in your GitHub account settings with explicit granular permissions.\n\n### Installing GitHub CLI (`gh`)\n• **macOS**: `brew install gh`\n• **Windows**: `winget install --id GitHub.cli` (or download the installer from cli.github.com)\n• **Linux (Ubuntu/Debian)**: `sudo apt install gh`\n\nOnce installed, running `gh auth login` initiates an interactive guided setup that links your terminal to your GitHub account and saves an authentication token directly into your OS Keychain or Credential Manager.",
      codeExamples: [
        {
          id: "w2-ch1-ex4",
          title: "Terminal Command 4: Interactive GitHub Authentication (`gh auth login`)",
          description: "Authenticate your terminal to GitHub and configure Git to use GitHub CLI as a credential helper.",
          code: `# Step 1: Launch interactive GitHub authentication
gh auth login

# Interactive prompts:
# ? What account do you want to log into? -> GitHub.com
# ? What is your preferred protocol for Git operations? -> HTTPS
# ? Authenticate Git with your GitHub credentials? -> Yes
# ? How would you like to authenticate GitHub CLI? -> Login with a web browser

# Step 2: Verify active authentication state
gh auth status

# Step 3: Configure Git credential helper to prevent future password prompts
gh auth setup-git`,
          explanation:
            "gh auth login establishes an authenticated session between your machine and GitHub. When asked 'Authenticate Git with your GitHub credentials?', selecting 'Yes' automatically configures Git's credential helper so you can push and pull without typing passwords or tokens every time.",
          stepByStepWalkthrough: [
            "Run 'gh auth login' in your terminal.",
            "Select 'GitHub.com' using arrow keys and press Enter.",
            "Select 'HTTPS' as your preferred protocol.",
            "Choose 'Yes' when prompted to authenticate Git with your credentials.",
            "Choose 'Login with a web browser', press Enter to open your browser, enter the one-time code shown in terminal, and authorize the application.",
            "Run 'gh auth status' to verify your authenticated username and active token scopes.",
          ],
          expectedOutput:
            "github.com\n  ✓ Logged in to github.com account your-username (keyring)\n  - Active account: true\n  - Git operations protocol: https\n  - Token: gho_************************************",
          whyItHappens:
            "The credentials are stored in your operating system's secure credential storage (macOS Keychain, Windows Credential Manager, or Linux libsecret), meaning your raw tokens are never written to plain text configuration files.",
          edgeCases:
            "• If you have a Classic Personal Access Token (PAT): When prompted 'How would you like to authenticate?', select 'Paste an authentication token' and paste your token (starts with 'ghp_'). Ensure the token has 'repo', 'read:org', and 'workflow' scopes enabled.",
        },
      ],
      callout: {
        type: "note",
        title: "Never Share Personal Access Tokens",
        content:
          "Personal Access Tokens (PATs) carry the same permissions as your GitHub password. Never commit a token to a repository or paste it in public forums. If accidentally exposed, revoke it immediately in GitHub Settings > Developer Settings > Personal access tokens.",
      },
    },
  ],
  exercises: [
    {
      id: "w2-ch1-ex-verify",
      title: "Exercise 1: Audit Your Local Git Configuration",
      difficulty: "basic",
      prompt:
        "Open your computer's terminal and execute the commands to verify: (1) your Git version is >= 2.30, (2) your global user.name is set, (3) your global user.email is set, and (4) init.defaultBranch is set to main.",
      starterCode: `# Run these commands in your personal computer's terminal:
git --version
git config --get user.name
git config --get user.email
git config --get init.defaultBranch`,
      hints: [
        "Use git config --get <key> to inspect a single setting in your terminal.",
        "If git config --get user.name returns nothing, run git config --global user.name 'Your Name'.",
        "Make sure to replace placeholder emails with your actual email address.",
      ],
      solution: `git --version
git config --get user.name
git config --get user.email
git config --get init.defaultBranch`,
      solutionExplanation:
        "The --get flag queries Git's active configuration cascaded across local, global, and system files. Verifying these values ensures your machine is ready for initializing repositories.",
    },
  ],
  recap: {
    keyConcepts: [
      "Git is a distributed version control system that stores code as immutable cryptographic snapshots",
      "Git configuration operates at three levels: System, Global (~/.gitconfig), and Local (.git/config)",
      "Global configuration must be populated with user.name, user.email, and init.defaultBranch main before your first commit",
      "Line-ending normalization (core.autocrlf) prevents whitespace noise across mixed operating system environments",
    ],
    essentialSyntax: [
      {
        syntax: "git --version",
        description: "Prints the installed Git binary version to standard output",
        example: "git --version",
      },
      {
        syntax: "git config --global user.name '<name>'",
        description: "Sets the author name associated with all future commits from this user account",
        example: 'git config --global user.name "Ada Lovelace"',
      },
      {
        syntax: "git config --global user.email '<email>'",
        description: "Sets the author email associated with all future commits from this user account",
        example: 'git config --global user.email "ada@example.com"',
      },
      {
        syntax: "git config --global init.defaultBranch main",
        description: "Sets 'main' as the default branch name for newly initialized repositories",
        example: "git config --global init.defaultBranch main",
      },
      {
        syntax: "git config --list --show-origin",
        description: "Lists all active configuration keys and the exact filesystem path of their source file",
        example: "git config --list --show-origin",
      },
      {
        syntax: "gh auth login",
        description: "Initiates interactive GitHub authentication via browser OAuth or Personal Access Token (PAT)",
        example: "gh auth login",
      },
      {
        syntax: "gh auth status",
        description: "Verifies current authenticated GitHub account and active token scopes",
        example: "gh auth status",
      },
      {
        syntax: "gh auth setup-git",
        description: "Configures Git to use GitHub CLI as a credential helper to prevent password prompts",
        example: "gh auth setup-git",
      },
    ],
    takeaways: [
      "Your Git configuration is persistent across all folders on your machine once set globally",
      "Always verify that your configured email matches your GitHub account for proper commit attribution",
      "A clean local setup ensures you never encounter detached HEAD or missing author errors later",
    ],
    glossary: [
      {
        term: "Version Control System (VCS)",
        definition: "A category of software tools that record changes to files over time so you can recall specific versions later.",
      },
      {
        term: "Distributed VCS",
        definition: "A version control architecture where every client mirrors the entire repository history locally, enabling offline workflows.",
      },
      {
        term: "Global Config",
        definition: "User-level Git settings saved in ~/.gitconfig that apply to every repository worked on by that user.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why should you configure init.defaultBranch to 'main' globally?",
        answer: "To adhere to modern industry standards and ensure newly initialized repositories consistently create a 'main' branch rather than legacy naming defaults.",
      },
      {
        question: "What happens if you run git commit without configuring user.name and user.email?",
        answer: "Git halts execution with an error requiring you to specify author identity before creating commits.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "w2-ch1-q1",
      type: "multiple-choice",
      prompt: "Where does Git save settings when you pass the --global flag to git config?",
      options: [
        "In the current folder's .git/config file",
        "In the user's home directory file ~/.gitconfig",
        "In the remote GitHub server profile",
        "In the operating system kernel boot partition",
      ],
      correctAnswer: 1,
      explanation: "Passing --global writes settings to the user's home directory configuration file (~/.gitconfig on Unix/macOS or C:\\Users\\Username\\.gitconfig on Windows).",
    },
    {
      id: "w2-ch1-q2",
      type: "concept",
      prompt: "Which command lists all active Git configuration settings along with their source configuration files?",
      options: [
        "git config --list --show-origin",
        "git show --config",
        "git status --all",
        "git log --configuration",
      ],
      correctAnswer: 0,
      explanation: "The command 'git config --list --show-origin' outputs all configuration keys and displays the exact file path where each key was defined.",
    },
  ],
};
