import { Chapter } from "@/types/curriculum";

export const chapter1: Chapter = {
  id: "w1-ch1",
  slug: "introduction-to-python",
  number: 1,
  title: "Introduction to Python and the Coding Environment",
  estimatedMinutes: 15,
  introduction:
    "Welcome to the Center of Excellence's Python, Data Science & Machine Learning Workshop Series. Python has become the lingua franca of computational science, artificial intelligence, automated reasoning, and backend infrastructure. In this foundational chapter, you will deconstruct how computers execute code, how the Python interpreter transforms human-readable text into machine instructions, and how to write, format, and debug fundamental Python statements.",
  learningObjectives: [
    "Understand how the Python interpreter executes code sequentially from top to bottom",
    "Master the print() function with single/multiple arguments, custom separators (sep), and line endings (end)",
    "Document software effectively using single-line (#), inline, and multi-line docstring comments",
    "Evaluate mathematical expressions using arithmetic operators (+, -, *, /, //, %, **) adhering to PEMDAS precedence",
    "Identify, diagnose, and resolve SyntaxError, NameError, TypeError, and ZeroDivisionError tracebacks",
    "Identify critical edge cases including floating-point representation quirks, division by zero, and string quoting traps",
  ],
  sections: [
    {
      id: "w1-ch1-s1",
      title: "1.1 The Computational Model: Why Python Powers Data Science & AI",
      content:
        "Every digital computer operates on a simple cycle: fetch instructions from memory (RAM), decode them in the Central Processing Unit (CPU), execute arithmetic or logic, and store the result. However, writing raw machine code (binary zeros and ones) or low-level assembly is prohibitively slow and error-prone for humans.\n\nPython was created by Guido van Rossum in 1991 with an overarching architectural priority: **developer velocity and conceptual readability**. Unlike languages requiring explicit memory management (C/C++) or verbose boilerplate (Java), Python provides a clean syntax resembling mathematical pseudocode. In data science and AI, where researchers iterate rapidly over statistical algorithms, Python's simplicity allows practitioners to focus on mathematical models rather than mechanical memory allocation.",
      callout: {
        type: "tip",
        title: "Hands-On Interactive Practice",
        content:
          "Every code example on this platform can be run and edited directly in the code editor on your screen. Modifying values, testing variations, and observing the immediate output is the most effective way to build programming intuition.",
      },
    },
    {
      id: "w1-ch1-s2",
      title: "1.2 How Python Runs Your Code",
      content:
        "When you write Python instructions, you are writing **source code** in plain text (typically saved in files ending in `.py`).\n\nWhen you run a Python script, the Python interpreter reads your instructions from top to bottom, translates each statement into actions the computer can execute, and outputs the result immediately.\n\nBecause Python executes instructions directly without requiring you to run a separate manual compilation step, it is known as an **interpreted language**. This allows you to write code, test it instantly, and fix errors quickly.",
      codeExamples: [
        {
          id: "w1-ch1-ex1",
          title: "Statement 1: The print() Statement — Standard Console Output",
          description: "Displaying text strings and numeric values on the console.",
          code: `# Basic output statement\nprint("Center of Excellence: Data Science & Artificial Intelligence")\nprint(2026)\nprint("Workshop 01: Python Foundations")`,
          explanation:
            "The print() statement is a built-in Python function. It accepts one or more arguments separated by commas, evaluates their string representations, and writes them to standard output (stdout), terminating with a newline character by default.",
          stepByStepWalkthrough: [
            "Line 2: The interpreter parses the string literal \"Center of Excellence...\" and emits it to stdout with a trailing newline.",
            "Line 3: The integer literal 2026 is converted to its string representation '2026' and output.",
            "Line 4: Emits the third line and flushes the buffer.",
          ],
          expectedOutput:
            "Center of Excellence: Data Science & Artificial Intelligence\n2026\nWorkshop 01: Python Foundations",
          whyItHappens:
            "By default, print() appends an invisible '\\n' (newline character) to the end of every call.",
          edgeCases:
            "• Omitting quotes around text: print(Hello) raises NameError: name 'Hello' is not defined because Python treats unquoted words as variable names.\n• Capitalizing Print(): Raises NameError: name 'Print' is not defined. Python identifiers are strictly case-sensitive.",
        },
        {
          id: "w1-ch1-ex2",
          title: "Statement 2: Multi-Argument print() with Custom sep and end",
          description: "Controlling the delimiter between arguments and the final trailing character.",
          code: `# Multi-argument print with custom separator\nprint("Node", "Weight", "Bias", sep=" | ")\nprint("Alpha", 0.85, 0.12, sep=" -> ")\n\n# Suppressing the default newline with end=""\nprint("Initializing security scanner", end="... ")\nprint("READY [OK]")`,
          explanation:
            "print() accepts optional keyword parameters: 'sep' defines what string is placed between multiple comma-separated arguments (default is a single space ' '), and 'end' defines what character is appended at the very end of the output (default is newline '\\n').",
          stepByStepWalkthrough: [
            "Line 2: Outputs each string separated by ' | ' instead of spaces.",
            "Line 3: Outputs strings and numbers separated by ' -> '.",
            "Line 6: Sets end='... ', keeping the console cursor on the same line.",
            "Line 7: Appends 'READY [OK]' immediately on the same line.",
          ],
          expectedOutput:
            "Node | Weight | Bias\nAlpha -> 0.85 -> 0.12\nInitializing security scanner... READY [OK]",
          whyItHappens:
            "Overriding 'end' allows you to build single-line progress outputs or format continuous data streams.",
          edgeCases:
            "• Passing an integer to sep or end: print('A', 'B', sep=10) raises TypeError: sep must be None or a string, not int.\n• Setting sep='': Concatenates arguments directly without any spacing: print(1, 2, 3, sep='') yields '123'.",
        },
        {
          id: "w1-ch1-ex3",
          title: "Statement 3: Multi-Line Strings & Escape Sequences",
          description: "Working with triple-quoted strings and escaped characters.",
          code: `# Triple-quoted multi-line string\nreport = """[SYSTEM REPORT]\nStatus : Active\nCluster: CoE-Alpha-01"""\nprint(report)\n\n# Escape sequences: \\n (newline), \\t (tab), \\" (escaped quote)\nprint("\\tSecurity Metric:\\t98.5%\\n\\tVerdict:\\t\\"CLEAN\\"")`,
          explanation:
            "Strings enclosed in triple quotes (either ''' or \"\"\") preserve literal line breaks and indentation. The backslash '\\' serves as an escape character to represent non-printable characters or prevent quotation collisions.",
          stepByStepWalkthrough: [
            "Lines 2-4: Assigns a multi-line string containing raw newlines to the variable 'report'.",
            "Line 5: Prints the multi-line string preserving exact visual layout.",
            "Line 8: Interprets '\\t' as tab indentation, '\\n' as newline, and '\\\"' as literal quotation marks.",
          ],
          expectedOutput:
            "[SYSTEM REPORT]\nStatus : Active\nCluster: CoE-Alpha-01\n\tSecurity Metric:\t98.5%\n\tVerdict:\t\"CLEAN\"",
          whyItHappens:
            "Python recognizes the backslash '\\' as a special escape character that signals a control code rather than ordinary text.",
          edgeCases:
            "• Windows file paths: print('C:\\Users\\notes.txt') can trigger bugs because '\\U' or '\\n' is interpreted as an escape sequence. Fix by using raw strings: print(r'C:\\Users\\notes.txt') or forward slashes: print('C:/Users/notes.txt').",
        },
      ],
    },
    {
      id: "w1-ch1-s3",
      title: "1.3 Python Comments & Code Documentation",
      content:
        "Code is read far more often than it is written. Clean, professional code requires meaningful documentation.\n\nPython provides two primary mechanisms for documentation:\n- **Single-Line Comments (`#`)**: Ignored entirely by the interpreter. Used to clarify non-obvious algorithms, mathematical rationales, or implementation caveats.\n- **Docstrings (`\"\"\"...\"\"\"`)**: Multi-line documentation strings placed at the top of files, functions, or modules. Python preserves docstrings so they can be read by help tools and other developers.",
      codeExamples: [
        {
          id: "w1-ch1-ex4",
          title: "Statement 4: Commenting Code Effectively",
          description: "Using single-line comments, inline notes, and docstrings.",
          code: `# Module: Security Heuristics Core\n# Center of Excellence: Data Science & AI\n\n# Baseline risk threshold defined for email quarantine\nRISK_CEILING = 75  # Score out of 100\n\n"""\nMulti-line docstrings at the top of a script\nprovide high-level architecture overviews.\n"""\nprint("Active Risk Ceiling:", RISK_CEILING)`,
          explanation:
            "The interpreter discards lines starting with '#' during tokenization. Comments do not incur any runtime execution penalty.",
          stepByStepWalkthrough: [
            "Lines 1-2: Ignored by interpreter.",
            "Line 5: Assigns integer 75 to RISK_CEILING; trailing '# Score...' is ignored.",
            "Lines 7-10: Evaluated as a string literal and discarded if unassigned.",
            "Line 11: Emits the variable value.",
          ],
          expectedOutput: "Active Risk Ceiling: 75",
          whyItHappens: "The Python interpreter ignores any text following the '#' symbol on that line, allowing you to add human explanations.",
          edgeCases:
            "• Putting '#' inside a string literal: print('ID #01') will NOT be treated as a comment! The '#' is part of the string: 'ID #01'.",
        },
      ],
    },
    {
      id: "w1-ch1-s4",
      title: "1.4 Arithmetic Operations & Operator Precedence (PEMDAS)",
      content:
        "Python functions as an exceptionally powerful computational engine with native support for full mathematical arithmetic.\n\n### The Fundamental Arithmetic Operators:\n| Operator | Operation | Example | Result | Type Note |\n| :--- | :--- | :--- | :--- | :--- |\n| `+` | Addition | `10 + 5` | `15` | int if both int |\n| `-` | Subtraction | `10 - 4` | `6` | int if both int |\n| `*` | Multiplication | `6 * 7` | `42` | int if both int |\n| `/` | True Division | `10 / 2` | `5.0` | **Always returns float** |\n| `//` | Floor Division | `10 // 3` | `3` | Rounds down to nearest integer |\n| `%` | Modulo (Remainder) | `10 % 3` | `1` | Remainder after division |\n| `**` | Exponentiation | `2 ** 8` | `256` | 2 raised to 8th power |\n\n### Order of Operations (PEMDAS):\n1. **P**arentheses `()`\n2. **E**xponentiation `**`\n3. **M**ultiplication `*`, **D**ivision `/`, Floor Division `//`, Modulo `%` (evaluated left-to-right)\n4. **A**ddition `+`, **S**ubtraction `-` (evaluated left-to-right)",
      codeExamples: [
        {
          id: "w1-ch1-ex5",
          title: "Statement 5: Arithmetic Operators & True Division vs Floor Division",
          description: "Contrasting /, //, %, and ** operations.",
          code: `# True division vs floor division\nprint("True Division  (14 / 4) :", 14 / 4)\nprint("Floor Division (14 // 4):", 14 // 4)\nprint("Modulo         (14 % 4) :", 14 % 4)\n\n# Exponentiation\nprint("2 to the power 10      :", 2 ** 10)\n\n# Precedence with parentheses\nraw_calc = 10 + 5 * 2\ngrouped  = (10 + 5) * 2\nprint("10 + 5 * 2              :", raw_calc)\nprint("(10 + 5) * 2            :", grouped)`,
          explanation:
            "True division '/' ALWAYS produces a floating-point number, even if the division is exact (e.g. 4 / 2 -> 2.0). Floor division '//' discards the fractional part and truncates toward negative infinity. Modulo '%' returns the remainder.",
          stepByStepWalkthrough: [
            "Line 2: 14 / 4 evaluates to exact float 3.5.",
            "Line 3: 14 // 4 drops the decimal .5 and returns integer 3.",
            "Line 4: 14 % 4 returns 2 because 14 = (4 * 3) + 2.",
            "Line 7: 2 ** 10 evaluates to 1024.",
            "Line 10: Multiplication (5 * 2 = 10) executes before addition (10 + 10 = 20).",
            "Line 11: Parentheses force addition first (10 + 5 = 15), then multiplication (15 * 2 = 30).",
          ],
          expectedOutput:
            "True Division  (14 / 4) : 3.5\nFloor Division (14 // 4): 3\nModulo         (14 % 4) : 2\n2 to the power 10      : 1024\n10 + 5 * 2              : 20\n(10 + 5) * 2            : 30",
          whyItHappens:
            "Python enforces strict operator precedence rules identical to standard algebraic conventions.",
          edgeCases:
            "• Division by Zero: 10 / 0 or 10 // 0 raises ZeroDivisionError: division by zero. Always guard against zero divisors in financial and statistical formulas.\n• Negative Floor Division: In Python, -7 // 2 evaluates to -4, NOT -3! Python rounds toward negative infinity (floor), whereas languages like C round toward zero.\n• Floating-Point Representation: In computers, binary floats cannot represent numbers like 0.1 exactly. 0.1 + 0.2 evaluates to 0.30000000000000004. In scientific computing, never check equality with '==' on raw floats; use math.isclose() or round().",
        },
      ],
    },
    {
      id: "w1-ch1-s5",
      title: "1.5 Reading Python Error Tracebacks Like an Engineer",
      content:
        "Errors are not failures; they are precise diagnostic reports emitted by the Python runtime. Becoming a senior developer means reading error messages calmly and systematically.\n\n### The Two Main Categories of Errors:\n1. **Syntax Errors (`SyntaxError`)**: Detected during the parsing phase **before any code runs**. The interpreter encountered an invalid grammatical sequence (missing colon, unmatched quote, invalid character). No lines are executed.\n2. **Runtime Exceptions**: The syntax is grammatically valid, but execution fails while running a specific operation (e.g., `ZeroDivisionError`, `NameError`, `TypeError`, `IndexError`).\n\nWhen a traceback occurs, read it **from bottom to top**: the last line states the exact error type and description, while the line above it shows the exact line number where execution failed.",
      callout: {
        type: "warning",
        title: "Common Traceback Types in Chapter 1",
        content:
          "• SyntaxError: unterminated string literal (Missing closing quote)\n• NameError: name 'x' is not defined (Using a variable before assigning it)\n• TypeError: unsupported operand type(s) (e.g. attempting to divide text by a number)\n• ZeroDivisionError: division by zero (Dividing any number by 0)",
      },
    },
  ],
  exercises: [
    {
      id: "w1-ch1-ex",
      title: "Exercise 1: Emitting Multi-Line Console Output",
      difficulty: "basic",
      prompt:
        "Modify the starter code to display the official two-line brand name of our organisation, followed by a separator line of 40 hyphens ('-'), and then print the calculation: 2 ** 8.",
      starterCode:
        '# Exercise 1: Formatted Output & Basic Math\nprint("CENTER OF EXCELLENCE")\nprint("DATA SCIENCE & ARTIFICIAL INTELLIGENCE")\n# Add your separator and calculation below:\n',
      testCases: [
        {
          id: "tc-1-1",
          description: "Outputs official brand line 1",
          expectedOutputSnippet: "CENTER OF EXCELLENCE",
        },
        {
          id: "tc-1-2",
          description: "Outputs official brand line 2",
          expectedOutputSnippet: "DATA SCIENCE & ARTIFICIAL INTELLIGENCE",
        },
        {
          id: "tc-1-3",
          description: "Computes 2 ** 8 = 256",
          expectedOutputSnippet: "256",
        },
      ],
      hints: [
        "Use print('-' * 40) to easily generate a string of 40 hyphens.",
        "To calculate 2 raised to power 8, use the exponentiation operator: 2 ** 8.",
        "Pass 2 ** 8 directly inside print(2 ** 8) or assign it to a variable.",
      ],
      solution:
        'print("CENTER OF EXCELLENCE")\nprint("DATA SCIENCE & ARTIFICIAL INTELLIGENCE")\nprint("-" * 40)\nprint(2 ** 8)',
      solutionExplanation:
        "String repetition ('-' * 40) creates 40 dashes cleanly. print(2 ** 8) evaluates 256 and writes it to stdout.",
    },
  ],
  assignment: {
    id: "w1-ch1-assignment",
    title: "Financial Ledger & Hardware Spec Terminal Formatter",
    scenario:
      "A high-performance computing node deployed at the Center of Excellence needs an automated boot banner and financial compute budget report. You have been tasked with generating a clean ASCII terminal report using only the arithmetic statements and print formatting techniques learned in Chapter 1.",
    requirements: [
      "Print an ASCII top header: '=== CENTER OF EXCELLENCE HPC CLUSTER ==='",
      "Define variables for total budget ($50,000), hardware costs ($34,500), and operational electricity rate ($0.12 per kWh for 15,000 kWh).",
      "Compute the total electricity cost using multiplication (*).",
      "Compute the remaining unallocated balance by subtracting hardware and electricity costs from total budget.",
      "Calculate the daily compute cost assuming a 30-day billing cycle using true division (/).",
      "Print each ledger item using multi-argument print() with custom separators (' : ') and format financial figures clearly.",
      "Verify that remaining budget does not trigger negative numbers or zero-division.",
    ],
    edgeCasesToHandle: [
      "Floating-point accuracy: Ensure electricity costs (15000 * 0.12) resolve to expected monetary figures.",
      "Zero-division prevention: Ensure cycle days is non-zero before dividing.",
      "Clean spacing: Avoid accidental double spaces when combining string labels with numeric values.",
    ],
    starterCode: `# Chapter 1 Assignment: HPC Compute Ledger Formatter
# Center of Excellence: Data Science & AI

# 1. Header Banner
print("=" * 40)
print("=== CENTER OF EXCELLENCE HPC CLUSTER ===")
print("=" * 40)

# 2. Financial Figures
total_budget = 50000
hardware_cost = 34500
kwh_used = 15000
kwh_rate = 0.12
billing_days = 30

# TODO: Compute electricity_cost = kwh_used * kwh_rate
# TODO: Compute total_spent = hardware_cost + electricity_cost
# TODO: Compute remaining_budget = total_budget - total_spent
# TODO: Compute daily_burn_rate = total_spent / billing_days

# TODO: Print formatted ledger using sep=" : "
`,
    testCases: [
      {
        id: "tc-a1-1",
        description: "Outputs the official HPC banner",
        expectedOutputSnippet: "CENTER OF EXCELLENCE HPC CLUSTER",
      },
      {
        id: "tc-a1-2",
        description: "Calculates total electricity cost (1800.0)",
        expectedOutputSnippet: "1800.0",
      },
      {
        id: "tc-a1-3",
        description: "Calculates remaining budget (13700.0)",
        expectedOutputSnippet: "13700.0",
      },
      {
        id: "tc-a1-4",
        description: "Calculates daily burn rate (1210.0)",
        expectedOutputSnippet: "1210.0",
      },
    ],
    hints: [
      "Multiply kwh_used * kwh_rate to obtain the total electricity cost.",
      "Subtract total_spent from total_budget to get the remaining balance.",
      "Divide total_spent by billing_days using true division (/) to get daily burn rate.",
    ],
    referenceSolution: `# Chapter 1 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

print("=" * 40)
print("=== CENTER OF EXCELLENCE HPC CLUSTER ===")
print("=" * 40)

total_budget = 50000
hardware_cost = 34500
kwh_used = 15000
kwh_rate = 0.12
billing_days = 30

electricity_cost = kwh_used * kwh_rate
total_spent = hardware_cost + electricity_cost
remaining_budget = total_budget - total_spent
daily_burn_rate = total_spent / billing_days

print("Total Allocated Budget", total_budget, sep=" : ")
print("Hardware Procurement ", hardware_cost, sep=" : ")
print("Electricity Utility   ", electricity_cost, sep=" : ")
print("Total Capital Spent   ", total_spent, sep=" : ")
print("Remaining Balance     ", remaining_budget, sep=" : ")
print("Daily Burn Rate       ", daily_burn_rate, sep=" : ")
print("=" * 40)`,
    solutionExplanation:
      "This solution performs clean floating-point and integer arithmetic, computes the derived financial metrics, and uses multi-argument print statements with custom ' : ' separators to align the terminal ledger.",
  },
  recap: {
    keyConcepts: [
      "Python is an interpreted language that executes statements sequentially from top to bottom.",
      "print() emits strings to stdout and accepts 'sep' (inter-item delimiter) and 'end' (trailing character, default newline).",
      "Arithmetic operators follow PEMDAS precedence: parentheses override standard order; true division (/) always yields float.",
      "Floor division (//) truncates down toward negative infinity; modulo (%) computes the remainder.",
      "Tracebacks pinpoint the failure line: read from bottom to top to identify the error class and explanation.",
    ],
    essentialSyntax: [
      {
        syntax: 'print("Text", val, sep=" | ", end="\\n")',
        description: "Console output with custom delimiters and termination.",
        example: 'print("A", "B", sep="-") -> "A-B"',
      },
      {
        syntax: "val = a + b * (c ** d) // e",
        description: "Arithmetic expression adhering to PEMDAS operator precedence.",
        example: "result = (10 + 5) * 2 -> 30",
      },
      {
        syntax: "# Commentary",
        description: "Single-line comment ignored by the Python interpreter.",
        example: "# Calculate tax rate",
      },
    ],
    takeaways: [
      "Python identifiers are strictly case-sensitive: print != Print.",
      "Always guard against dividing by zero to prevent ZeroDivisionError crashes.",
      "Double precision floating point numbers have finite precision (e.g. 0.1 + 0.2).",
    ],
    glossary: [
      {
        term: "Interpreter",
        definition: "The software program that reads and executes Python code directly, line by line, without requiring manual compilation.",
      },
      {
        term: "Standard Output (stdout)",
        definition: "The default text output stream where print() writes messages to be displayed on the screen or terminal.",
      },
      {
        term: "Traceback",
        definition: "A diagnostic stack trace printed by Python when an unhandled exception halts program execution.",
      },
      {
        term: "PEMDAS",
        definition: "Mnemonic for mathematical operator precedence: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does 10 / 2 return 5.0 (a float) rather than the integer 5 in Python 3?",
        answer: "Python 3 implements true division with the '/' operator, which guarantees a consistent floating-point type regardless of whether operands divide evenly. To force an integer result, use floor division '//'.",
      },
      {
        question: "What is the difference between a SyntaxError and a runtime exception like NameError?",
        answer: "A SyntaxError is caught during the initial parsing phase before any code begins executing. A runtime exception occurs while the code is actively executing valid instructions (e.g., trying to access an uninitialized variable name).",
      },
      {
        question: "What will '-7 // 2' evaluate to in Python, and why does it surprise programmers from C/Java?",
        answer: "It evaluates to -4. In Python, floor division rounds down toward negative infinity. In C and Java, integer division rounds toward zero (which would yield -3).",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa1-1",
      type: "multiple-choice",
      prompt: "What will be printed by the statement: print('Python', 'AI', sep='_', end='!')?",
      options: [
        "Python AI!",
        "Python_AI!",
        "Python_AI",
        "Python AI_!",
      ],
      correctAnswer: 1,
      explanation: "sep='_' places an underscore between the arguments ('Python_AI'), and end='!' places an exclamation mark at the end without a newline.",
    },
    {
      id: "sa1-2",
      type: "multiple-choice",
      prompt: "What is the output of the mathematical expression: 10 + 2 * 3 ** 2?",
      options: [
        "108",
        "28",
        "46",
        "144",
      ],
      correctAnswer: 1,
      explanation: "By PEMDAS: First 3 ** 2 = 9. Next 2 * 9 = 18. Finally 10 + 18 = 28.",
    },
    {
      id: "sa1-3",
      type: "multiple-choice",
      prompt: "Which error occurs if you write: print(10 / (5 - 5))?",
      options: [
        "SyntaxError: invalid syntax",
        "ZeroDivisionError: division by zero",
        "ValueError: math domain error",
        "TypeError: unsupported operand",
      ],
      correctAnswer: 1,
      explanation: "5 - 5 evaluates to 0, and dividing 10 by 0 raises a ZeroDivisionError at runtime.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 1: Intro & Coding Environment",
    timingMinutes: 15,
    teachingGoal: "Ensure all learners execute their first statement and comfortably read error tracebacks.",
    commonMisconceptions: [
      "Confusing single quotes with double quotes (both are identical in Python).",
      "Thinking print() pops up a dialog window rather than writing to stdout.",
      "Capitalizing Print() and not understanding the resulting NameError.",
    ],
    discussionPrompts: [
      "Why did data science and AI coalesce around Python rather than C++ or Java?",
      "Why is floating point arithmetic inexact in binary computing?",
    ],
    liveCodingCheckpoints: [
      "All students have run print('Hello World') in the interactive code editor.",
      "Intentionally produce and fix a NameError by typing Print().",
    ],
  },
};
