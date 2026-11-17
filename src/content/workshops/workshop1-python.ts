import { Workshop } from "@/types/curriculum";

export const workshop1Python: Workshop = {
  id: "w1-python-foundations",
  slug: "python-foundations",
  number: 1,
  title: "Python Foundations: Build Inbox Guardian",
  subtitle: "Core Python Programming & Rule-Based Message Analysis",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "browser-python",
  targetAudience: "Students and beginners starting their computational journey in data science and software engineering.",
  prerequisites: [
    "No prior programming experience required",
    "Basic computer literacy and a modern web browser",
  ],
  learningOutcomes: [
    "Understand the Python execution model and write structured, error-free Python programs",
    "Work confidently with fundamental data types, type conversions, and formatted strings",
    "Manipulate and inspect text using string indexing, slicing, and built-in text methods",
    "Implement branching decision logic using comparison and logical operators",
    "Automate repetitive tasks with for-loops, while-loops, and range generators",
    "Structure structured in-memory datasets using lists, dictionaries, and nested collections",
    "Design modular, reusable functions with parameters, return statements, and local scopes",
    "Architect, implement, and test Inbox Guardian — a complete rule-based email threat scanner",
  ],
  projectSlug: "inbox-guardian",
  projectTitle: "Inbox Guardian — Personal Message Scanner",
  chapters: [
    {
      id: "w1-ch1",
      slug: "introduction-to-python",
      number: 1,
      title: "Introduction to Python and the Coding Environment",
      estimatedMinutes: 12,
      introduction:
        "Welcome to the Center of Excellence's Workshop Series. Python is one of the most widely adopted programming languages across data science, artificial intelligence, web backends, and scientific computing. In this chapter, you will understand how programs execute, how the Python interpreter works, and how to write and run your first interactive Python code.",
      learningObjectives: [
        "Define what source code is and how the Python interpreter converts text into instructions",
        "Use the built-in print() function to emit text and numbers to standard output",
        "Interpret basic Python syntax rules including case sensitivity and indentation",
        "Read Python error messages (SyntaxError) and apply systematic debugging steps",
      ],
      sections: [
        {
          id: "w1-ch1-s1",
          title: "1.1 What is Programming & Why Python?",
          content:
            "A computer is essentially an electronic machine capable of performing billions of mathematical calculations per second, but it requires explicit, unambiguous instructions. A **program** is a sequence of instructions written in a programming language that tells the computer what operations to perform.\n\nPython was created by Guido van Rossum in 1991 with a primary philosophy: **readability counts**. Unlike languages that rely on curly braces `{}` or semicolons `;`, Python uses clean English keywords and significant indentation (whitespace). This makes Python exceptionally productive for data science, machine learning, and rapid application prototyping.",
        },
        {
          id: "w1-ch1-s2",
          title: "1.2 How Code Executes: The Interpreter",
          content:
            "When you write Python code, you produce plain text called **source code**. Python is an **interpreted language**. When you click 'Run', the Python runtime parses your code line by line, checks for syntax errors, compiles it into intermediate bytecode, and executes it in a virtual machine.\n\nIn our interactive browser environment, this entire Python runtime is running locally inside your browser tab using WebAssembly (Pyodide).",
          codeExamples: [
            {
              id: "w1-ch1-ex1",
              title: "Your First Python Statement",
              description: "Emitting standard output using the print() function.",
              code: 'print("Center of Excellence: Data Science & AI")\nprint("Welcome to Python Workshop 1!")',
              explanation:
                "The print() function takes an argument enclosed in parentheses and displays it on the console. Text must be wrapped in quotation marks (single ' or double \") to form a string literal.",
              stepByStepWalkthrough: [
                "Line 1: The interpreter evaluates print(\"...\") and outputs the first text string followed by a newline.",
                "Line 2: The interpreter executes the second print call and emits the welcome message.",
              ],
              expectedOutput:
                "Center of Excellence: Data Science & AI\nWelcome to Python Workshop 1!",
              whyItHappens:
                "print() appends a newline character '\\n' by default at the end of each invocation.",
            },
          ],
        },
        {
          id: "w1-ch1-s3",
          title: "1.3 Understanding Python Syntax & Common Mistakes",
          content:
            "Python is strictly **case-sensitive**. This means `print`, `Print`, and `PRINT` are completely different identifiers. In Python, the built-in function is lowercase `print`.\n\nStrings must always have matching opening and closing quotes. If you open with `\"` and close with `'`, or forget the closing quote, Python will raise a `SyntaxError: unterminated string literal`.",
          callout: {
            type: "mistake",
            title: "Common Beginner Mistake: Capitalizing print()",
            content:
              "Writing `Print('Hello')` will result in `NameError: name 'Print' is not defined`. Built-in functions in Python are always lowercase.",
          },
        },
      ],
      exercises: [
        {
          id: "w1-ch1-ex",
          title: "Exercise 1: Emitting Multi-Line Console Output",
          difficulty: "basic",
          prompt:
            "Modify the starter code so that it prints the official organisation name 'CENTER OF EXCELLENCE' on line 1, followed by 'DATA SCIENCE & ARTIFICIAL INTELLIGENCE' on line 2.",
          starterCode:
            '# Exercise 1: Print the official two-line brand name\nprint("CENTER OF EXCELLENCE")\n# Add line 2 below:\n',
          testCases: [
            {
              id: "tc-1",
              description: "Outputs official brand line 1",
              expectedOutputSnippet: "CENTER OF EXCELLENCE",
            },
            {
              id: "tc-2",
              description: "Outputs official brand line 2",
              expectedOutputSnippet: "DATA SCIENCE & ARTIFICIAL INTELLIGENCE",
            },
          ],
          hints: [
            "Remember that each print() statement outputs on a new line by default.",
            "Add another print() call below line 2 containing the exact string 'DATA SCIENCE & ARTIFICIAL INTELLIGENCE'.",
            'Write: print("DATA SCIENCE & ARTIFICIAL INTELLIGENCE")',
          ],
          solution:
            'print("CENTER OF EXCELLENCE")\nprint("DATA SCIENCE & ARTIFICIAL INTELLIGENCE")',
          solutionExplanation:
            "Two distinct print() calls produce two separate lines in the console output.",
        },
      ],
      recap: {
        keyConcepts: [
          "Python is an interpreted, high-level, dynamically typed language.",
          "print() outputs textual representations of objects to standard output.",
          "Python is case-sensitive: print != Print.",
          "Indentation and matching string quotes are syntactically mandatory.",
        ],
        essentialSyntax: [
          {
            syntax: 'print("text", value)',
            description: "Outputs text or variables to the console.",
            example: 'print("Result:", 42)',
          },
          {
            syntax: "# comment",
            description: "Single-line comment ignored by the Python interpreter.",
            example: "# This is a comment",
          },
        ],
        takeaways: [
          "Always check the line number indicated in Python error tracebacks.",
          "Keep identifiers lowercase unless adhering to specific class naming conventions.",
        ],
        glossary: [
          {
            term: "Interpreter",
            definition: "A program that reads and executes source code directly line-by-line without prior compilation to machine code.",
          },
          {
            term: "SyntaxError",
            definition: "An error raised by Python when code violates the grammar rules of the Python language.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does `Print('Hello')` fail in standard Python?",
            answer: "Because Python is case-sensitive. The built-in standard output function is `print`, all in lowercase.",
          },
          {
            question: "What happens if you open a string with a double quote `\"` and close it with a single quote `'`?",
            answer: "Python raises a SyntaxError (unterminated string literal) because string delimiters must match.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q1-1",
          type: "predict-output",
          prompt: "What is the exact output of: print('Data', 'Science', sep='-')?",
          options: ["Data Science", "Data-Science", "Data - Science", "Data, Science"],
          correctAnswer: "Data-Science",
          explanation: "The `sep` argument specifies the separator inserted between values. When sep='-', it joins with a hyphen.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "00–08 min: Introduction to Python and Environment",
        timingMinutes: 8,
        teachingGoal: "Get every student to run their first code snippet and understand console output.",
        commonMisconceptions: [
          "Students often think print() displays a graphical popup rather than stream text to stdout.",
          "Confusion between single and double quotes (both are valid in Python as long as they match).",
        ],
        discussionPrompts: [
          "Why did data science coalesce around Python instead of older languages like C++ or Java?",
        ],
        liveCodingCheckpoints: [
          "Have everyone run print('Hello World') and intentionally produce a SyntaxError to see the traceback.",
        ],
      },
    },

    {
      id: "w1-ch2",
      slug: "variables-data-types-and-io",
      number: 2,
      title: "Variables, Data Types and Input/Output",
      estimatedMinutes: 15,
      introduction:
        "Programs must store, update, and manipulate data. In this chapter, you will learn how to create variables to hold values in computer memory, work with Python's core data types (str, int, float, bool), convert between them, format output dynamically with f-strings, and accept interactive input.",
      learningObjectives: [
        "Create variables using standard Python naming conventions (snake_case)",
        "Differentiate between str, int, float, and bool data types using type()",
        "Perform arithmetic operations (+, -, *, /, //, %, **)",
        "Convert data types using explicit casting (int(), float(), str())",
        "Construct clean readable messages using formatted string literals (f-strings)",
        "Accept user input using the queued input() panel",
      ],
      sections: [
        {
          id: "w1-ch2-s1",
          title: "2.1 Variables and Assignment",
          content:
            "A **variable** is a named reference to a value stored in memory. In Python, you do not need to declare variable types beforehand (e.g. `int x = 5`). You simply use the assignment operator `=`: \n\n```python\nstudent_name = 'Alex'\nworkshop_number = 1\ncompletion_rate = 94.5\nis_registered = True\n```\n\nVariable names should be descriptive, lowercase, with words separated by underscores (`snake_case`).",
        },
        {
          id: "w1-ch2-s2",
          title: "2.2 Python's Primitive Data Types",
          content:
            "Python provides four foundational primitive data types:\n\n1. **`str` (String)**: Ordered text sequences enclosed in quotes (`\"Data Science\"`).\n2. **`int` (Integer)**: Whole numbers positive or negative (`42`, `-7`).\n3. **`float` (Floating Point)**: Numbers containing decimal points (`3.14159`).\n4. **`bool` (Boolean)**: Logical truth values: exactly `True` or `False` (capitalized).",
          codeExamples: [
            {
              id: "w1-ch2-ex1",
              title: "Inspecting Data Types",
              description: "Using type() to verify the runtime type of variables.",
              code: 'title = "Inbox Guardian"\nversion = 1\naccuracy_goal = 0.95\nis_active = True\n\nprint(type(title))\nprint(type(version))\nprint(type(accuracy_goal))\nprint(type(is_active))',
              explanation:
                "The type() function inspects any Python object and returns its class representation.",
              expectedOutput:
                "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
            },
          ],
        },
        {
          id: "w1-ch2-s3",
          title: "2.3 Input and Type Conversion",
          content:
            "The `input()` function prompts the user to enter data. **CRITICAL RULE**: `input()` always returns a string (`str`), even if the user types numeric digits like `'42'`. If you need to perform calculations, you must explicitly convert (cast) the string to an integer or float using `int()` or `float()`.",
          codeExamples: [
            {
              id: "w1-ch2-ex2",
              title: "Input Conversion and f-strings",
              description: "Converting string input to integer and computing results.",
              code: '# Assuming queued input provides: "3"\ncount_input = "3"  # In live input: input("Enter count: ")\ncount = int(count_input)\ntotal = count * 10\nprint(f"Total processed items: {total}")',
              explanation:
                "f-strings (formatted string literals) prefix the string with 'f' and allow Python expressions inside curly braces `{}` to be evaluated directly.",
              expectedOutput: "Total processed items: 30",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch2-ex",
          title: "Exercise 2: Personalised Student Profile Generator",
          difficulty: "basic",
          prompt:
            "Create variables `name` assigned to 'Priya', `batch` assigned to 2026, and `score` assigned to 95.8. Print a single formatted line using an f-string: 'Student: Priya | Batch: 2026 | Score: 95.8%'.",
          starterCode:
            "# Create the three variables\nname = 'Priya'\nbatch = 2026\nscore = 95.8\n\n# Construct and print the f-string:\n",
          testCases: [
            {
              id: "tc-profile",
              description: "Matches formatted student profile",
              expectedOutputSnippet: "Student: Priya | Batch: 2026 | Score: 95.8%",
            },
          ],
          hints: [
            "Use f'Student: {name} | ...'",
            "Include the literal % sign immediately after {score}.",
            'Write: print(f"Student: {name} | Batch: {batch} | Score: {score}%")',
          ],
          solution:
            'name = "Priya"\nbatch = 2026\nscore = 95.8\nprint(f"Student: {name} | Batch: {batch} | Score: {score}%")',
          solutionExplanation:
            "The f-string embeds the values of the three variables into the formatted string at runtime.",
        },
      ],
      recap: {
        keyConcepts: [
          "Variables store values; '=' is assignment, not equality testing.",
          "Core primitives: str, int, float, bool.",
          "input() always yields a str; use int() or float() for arithmetic.",
          "f-strings: f'{variable}' provide concise, readable string interpolation.",
        ],
        essentialSyntax: [
          {
            syntax: "f'{var}'",
            description: "Formatted string literal embedding variable or expression.",
            example: "f'Count: {n}'",
          },
          {
            syntax: "int(x) / float(x) / str(x)",
            description: "Explicit type casting.",
            example: "int('10')",
          },
        ],
        takeaways: [
          "Never perform mathematical addition directly on input() without casting; '10' + '10' produces '1010', not 20.",
        ],
        glossary: [
          {
            term: "Type Casting",
            definition: "The explicit conversion of an entity of one data type into another.",
          },
          {
            term: "f-string",
            definition: "A string literal prefixed with 'f' that allows embedded expressions evaluated at runtime inside curly braces.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the type of the value returned by `input()`?",
            answer: "It is always a string (`str`), regardless of what characters the user enters.",
          },
          {
            question: "What is the difference between `/` and `//` in Python?",
            answer: "`/` is float division (e.g. 7 / 2 = 3.5), whereas `//` is floor/integer division (e.g. 7 // 2 = 3).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q2-1",
          type: "predict-output",
          prompt: "What will `print('5' * 3)` output in Python?",
          options: ["15", "555", "Error", "5 5 5"],
          correctAnswer: "555",
          explanation: "Multiplying a string by an integer repeats the string that many times: '5' * 3 = '555'.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "08–23 min: Variables, Types, Input and Output",
        timingMinutes: 15,
        teachingGoal: "Ensure students distinguish between numeric values and strings.",
        commonMisconceptions: [
          "Assuming input('Enter age: ') produces a number that can be added to directly.",
          "Confusing the assignment operator `=` with the mathematical equality test `==`.",
        ],
        discussionPrompts: [
          "Why does Python use dynamic typing rather than forcing developers to specify types like C or Java?",
        ],
        liveCodingCheckpoints: [
          "Demonstrate: num = input() followed by num + 5 failing with TypeError: can only concatenate str (not 'int') to str.",
        ],
      },
    },

    {
      id: "w1-ch3",
      slug: "strings-and-text-processing",
      number: 3,
      title: "Strings and Text Processing",
      estimatedMinutes: 15,
      introduction:
        "Text analysis forms the bedrock of natural language processing and our capstone project, Inbox Guardian. In this chapter, you will master string indexing, slicing, case normalization, whitespace trimming, and substring detection using the `in` operator.",
      learningObjectives: [
        "Access individual characters using zero-based positive and negative indexing",
        "Extract substrings using slice syntax `[start:stop:step]`",
        "Normalize text cases using `.lower()` and `.upper()` for consistent matching",
        "Strip leading and trailing whitespace using `.strip()`",
        "Test for substring membership using the boolean `in` keyword",
      ],
      sections: [
        {
          id: "w1-ch3-s1",
          title: "3.1 String Indexing and Length",
          content:
            "In Python, strings are **immutable sequences** of characters. Each character occupies a specific position called an **index**. Python uses **zero-based indexing**:\n- The first character is at index `0`.\n- Negative indices count backwards from the end: index `-1` is always the last character.\n- The `len()` function returns the total number of characters.",
        },
        {
          id: "w1-ch3-s2",
          title: "3.2 Slicing Strings",
          content:
            "Slicing allows you to extract a subset of characters using the syntax `string[start:stop]`, where `start` is inclusive and `stop` is exclusive:\n- `text[0:4]` takes characters at indices 0, 1, 2, and 3.\n- Omitting `start` (`text[:5]`) starts from the beginning.\n- Omitting `stop` (`text[3:]`) goes to the very end.",
        },
        {
          id: "w1-ch3-s3",
          title: "3.3 Text Normalisation for Security Scanning",
          content:
            "When analyzing an email for spam or phishing indicators, spammers might write `\"FREE\"`, `\"Free\"`, or `\"fReE\"`. If your rule only checks for `\"free\"`, case differences will cause your scanner to miss the threat!\n\nThe standard solution is **text normalization**: convert the entire text to lowercase using `.lower()` before checking.",
          codeExamples: [
            {
              id: "w1-ch3-ex1",
              title: "Normalising and Detecting Suspicious Keywords",
              description: "Using lower() and the 'in' operator to detect threats.",
              code: 'message = "  CONGRATULATIONS! You won a FREE iPhone!  "\ncleaned = message.strip().lower()\n\nprint("Cleaned text:", cleaned)\nprint("Contains \'free\'?", "free" in cleaned)\nprint("Contains \'urgent\'?", "urgent" in cleaned)',
              explanation:
                ".strip() removes unwanted outer spaces, .lower() normalizes all letters to lowercase, and 'keyword in text' returns True if the substring is found anywhere inside.",
              expectedOutput:
                "Cleaned text: congratulations! you won a free iphone!\nContains 'free'? True\nContains 'urgent'? False",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch3-ex",
          title: "Exercise 3: Build a Basic Text Inspector",
          difficulty: "intermediate",
          prompt:
            "Given `raw_subject = '   URGENT: Claim Your Prize Now!   '`, write code to clean it (strip spaces and lowercase it), count its total length, and print whether the keyword 'prize' is present.",
          starterCode:
            "raw_subject = '   URGENT: Claim Your Prize Now!   '\n\n# 1. Clean the subject (strip and lower)\ncleaned = raw_subject.strip().lower()\n\n# 2. Check if 'prize' is in cleaned\nhas_prize = 'prize' in cleaned\n\n# 3. Print: 'Cleaned: <cleaned> | Has prize: <has_prize>'\n",
          testCases: [
            {
              id: "tc-inspector",
              description: "Detects prize in cleaned subject",
              expectedOutputSnippet: "Cleaned: urgent: claim your prize now! | Has prize: True",
            },
          ],
          hints: [
            "Chain methods: raw_subject.strip().lower()",
            "Use the 'in' keyword: 'prize' in cleaned",
            'Use f-string: print(f"Cleaned: {cleaned} | Has prize: {has_prize}")',
          ],
          solution:
            "raw_subject = '   URGENT: Claim Your Prize Now!   '\ncleaned = raw_subject.strip().lower()\nhas_prize = 'prize' in cleaned\nprint(f\"Cleaned: {cleaned} | Has prize: {has_prize}\")",
          solutionExplanation:
            "Method chaining cleanly removes surrounding whitespace and normalizes case, making substring detection completely reliable.",
        },
      ],
      recap: {
        keyConcepts: [
          "Strings are immutable ordered character sequences.",
          "Zero-based indexing: s[0] is first, s[-1] is last.",
          "Slicing [start:stop] includes start and excludes stop.",
          "Case-insensitive matching requires .lower() before using 'in'.",
        ],
        essentialSyntax: [
          {
            syntax: "'sub' in text",
            description: "Returns True if 'sub' exists anywhere within text.",
            example: "'free' in 'free gift'",
          },
          {
            syntax: "text.lower() / text.upper()",
            description: "Returns a new string converted to lower/upper case.",
            example: "'AI'.lower()",
          },
          {
            syntax: "text.strip()",
            description: "Removes leading and trailing whitespace.",
            example: "' text '.strip()",
          },
        ],
        takeaways: [
          "Strings in Python cannot be modified in place. Calling text.lower() returns a new string; it does not mutate text.",
        ],
        glossary: [
          {
            term: "Immutability",
            definition: "An object property meaning its internal state cannot be modified after creation.",
          },
          {
            term: "Substring",
            definition: "A contiguous sequence of characters within a larger string.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does `text = 'HELLO'; text.lower()` leave `text` unchanged?",
            answer: "Because strings are immutable in Python. .lower() returns a new string. You must reassign it: `text = text.lower()`.",
          },
          {
            question: "What does `'Python'[-2]` evaluate to?",
            answer: "It evaluates to `'o'`, which is the second-to-last character.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q3-1",
          type: "predict-output",
          prompt: "What is the value of 'DataScience'[4:7]?",
          options: ["Sci", "Scie", "Data", "Science"],
          correctAnswer: "Sci",
          explanation: "Indices 4, 5, 6 correspond to characters 'S', 'c', 'i'. The stop index 7 is excluded.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "Strings and Text Processing",
        timingMinutes: 15,
        teachingGoal: "Prepare students for keyword scanning in Inbox Guardian.",
        commonMisconceptions: [
          "Assuming string.replace() or .lower() mutates the original string in place.",
        ],
        discussionPrompts: [
          "Why is normalizing text (like lowercasing) the very first step in almost all Natural Language Processing systems?",
        ],
        liveCodingCheckpoints: [
          "Show how 'Free' in 'FREE' evaluates to False without .lower().",
        ],
      },
    },

    {
      id: "w1-ch4",
      slug: "conditional-logic",
      number: 4,
      title: "Conditional Logic",
      estimatedMinutes: 15,
      introduction:
        "Every intelligent decision system relies on conditional logic. In this chapter, you will learn how computers evaluate boolean conditions, how to branch execution using if, elif, and else statements, combine multiple rules using logical operators (and, or, not), and avoid indentation errors.",
      learningObjectives: [
        "Construct boolean expressions using comparison operators (==, !=, >, <, >=, <=)",
        "Combine complex decision conditions using and, or, and not",
        "Structure multi-branch decision trees using if, elif, and else",
        "Apply Python's indentation rules to control block execution",
        "Build a rule-based message categorization engine",
      ],
      sections: [
        {
          id: "w1-ch4-s1",
          title: "4.1 Boolean Expressions and Comparison",
          content:
            "A condition is an expression that evaluates to either `True` or `False`. Comparison operators evaluate relationships between values:\n- `==` Equality test (do NOT confuse with `=` assignment!)\n- `!=` Not equal to\n- `>` Greater than, `<` Less than\n- `>=` Greater than or equal, `<=` Less than or equal",
        },
        {
          id: "w1-ch4-s2",
          title: "4.2 if, elif, and else Statements",
          content:
            "Python uses `if`, `elif` (short for else-if), and `else` to execute different blocks of code depending on conditions. The colon `:` at the end of the line denotes the start of a code block, and all subsequent lines belonging to that block must be indented by exactly 4 spaces.",
          codeExamples: [
            {
              id: "w1-ch4-ex1",
              title: "Message Risk Classification Rule",
              description: "Classifying risk level based on the count of suspicious indicators.",
              code: 'match_count = 3\n\nif match_count == 0:\n    status = "SAFE"\n    risk = "Low"\nelif match_count <= 2:\n    status = "CAUTION"\n    risk = "Medium"\nelse:\n    status = "POTENTIALLY SUSPICIOUS"\n    risk = "High"\n\nprint(f"Status: {status} | Risk: {risk}")',
              explanation:
                "Python evaluates conditions from top to bottom. As soon as one branch evaluates to True, its block runs and the rest are skipped.",
              expectedOutput: "Status: POTENTIALLY SUSPICIOUS | Risk: High",
            },
          ],
        },
        {
          id: "w1-ch4-s3",
          title: "4.3 Logical Operators: and, or, not",
          content:
            "- `and`: Evaluates to `True` only if **both** operands are True.\n- `or`: Evaluates to `True` if **at least one** operand is True.\n- `not`: Inverts the boolean value (`not True` is `False`).",
          callout: {
            type: "tip",
            title: "Short-Circuit Evaluation",
            content:
              "In an `or` condition, if the first expression is True, Python does not bother evaluating the second expression because the overall outcome is already guaranteed to be True.",
          },
        },
      ],
      exercises: [
        {
          id: "w1-ch4-ex",
          title: "Exercise 4: Security Alert Filter",
          difficulty: "intermediate",
          prompt:
            "Write an if-elif-else block for variable `spam_score = 4`. If spam_score >= 5 print 'ALERT: Blocked'; elif spam_score >= 3 print 'ALERT: Flagged for review'; else print 'APPROVED: Message delivered'.",
          starterCode:
            "spam_score = 4\n\n# Write the if-elif-else logic below:\n",
          testCases: [
            {
              id: "tc-alert",
              description: "Correctly flags spam_score of 4",
              expectedOutputSnippet: "ALERT: Flagged for review",
            },
          ],
          hints: [
            "Start with `if spam_score >= 5:`",
            "Use `elif spam_score >= 3:` for the second condition",
            "Use `else:` for the final fallback",
          ],
          solution:
            "spam_score = 4\nif spam_score >= 5:\n    print('ALERT: Blocked')\nelif spam_score >= 3:\n    print('ALERT: Flagged for review')\nelse:\n    print('APPROVED: Message delivered')",
          solutionExplanation:
            "Since spam_score is 4, the first condition (>= 5) is False, but the elif condition (>= 3) is True, so that branch runs.",
        },
      ],
      recap: {
        keyConcepts: [
          "if / elif / else enables conditional branching.",
          "Code blocks are delineated by indentation (standard 4 spaces).",
          "and requires both conditions; or requires either condition.",
          "== compares values; = binds a variable.",
        ],
        essentialSyntax: [
          {
            syntax: "if condition:\n    pass\nelif other:\n    pass\nelse:\n    pass",
            description: "Standard conditional branching structure.",
            example: "if x > 0:\n    print('Positive')",
          },
        ],
        takeaways: [
          "Ensure mutually exclusive conditions are arranged in logical numerical or semantic order.",
        ],
        glossary: [
          {
            term: "Indentation",
            definition: "The spaces at the beginning of a code line used in Python to define scope and block hierarchy.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the difference between `if` followed by `if` versus `if` followed by `elif`?",
            answer: "Multiple independent `if` statements all get evaluated sequentially. With `if-elif`, as soon as one branch succeeds, all remaining `elif` and `else` branches are skipped.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q4-1",
          type: "predict-output",
          prompt: "What will print: `x = 10; print(x > 5 and x < 8)`?",
          options: ["True", "False", "10", "Error"],
          correctAnswer: "False",
          explanation: "x > 5 is True, but x < 8 is False. True and False evaluates to False.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "23–38 min: Conditional Logic",
        timingMinutes: 15,
        teachingGoal: "Ensure students master the structure of if/elif/else and indentation.",
        commonMisconceptions: [
          "Using `=` instead of `==` inside an if statement condition (causes SyntaxError: invalid syntax).",
          "Mixing tabs and spaces for indentation.",
        ],
        discussionPrompts: [
          "What are the limitations of purely rule-based conditional trees when spam messages evolve over time?",
        ],
        liveCodingCheckpoints: [
          "Demonstrate fixing an IndentationError live in front of the students.",
        ],
      },
    },

    {
      id: "w1-ch5",
      slug: "loops-and-repetition",
      number: 5,
      title: "Loops and Repetition",
      estimatedMinutes: 15,
      introduction:
        "Computers excel at repeating tasks millions of times without fatigue or mistakes. In this chapter, you will learn to use `for` loops to iterate over sequences, `while` loops for condition-driven loops, `range()` for counter generation, and `break` to exit loops safely.",
      learningObjectives: [
        "Iterate over sequences (strings, lists, ranges) using `for` loops",
        "Generate integer sequences using `range(stop)` and `range(start, stop, step)`",
        "Implement condition-controlled repetition using `while` loops",
        "Control loop flow using `break` to exit prematurely",
        "Build an interactive terminal menu loop that accepts user choices until an exit option",
      ],
      sections: [
        {
          id: "w1-ch5-s1",
          title: "5.1 The for Loop and range()",
          content:
            "A `for` loop iterates over each item in an iterable sequence (such as a string, list, or range):\n\n```python\nfor char in \"AI\":\n    print(char)\n```\n\nThe `range()` function generates an immutable arithmetic sequence of integers:\n- `range(5)` generates: `0, 1, 2, 3, 4` (starts at 0, stops before 5).\n- `range(1, 6)` generates: `1, 2, 3, 4, 5`.\n- `range(0, 10, 2)` generates: `0, 2, 4, 6, 8` with a step size of 2.",
        },
        {
          id: "w1-ch5-s2",
          title: "5.2 The while Loop and Loop Control",
          content:
            "A `while` loop continues executing as long as its condition remains `True`. If the condition never becomes `False`, the loop becomes an **infinite loop** that can hang your program!\n\nThe `break` statement immediately terminates the innermost active loop.",
          codeExamples: [
            {
              id: "w1-ch5-ex1",
              title: "Interactive Menu Loop Pattern",
              description: "A controlled while loop that processes user commands until exit.",
              code: 'commands = ["1", "3", "0"]  # Simulated inputs\nidx = 0\n\nwhile True:\n    choice = commands[idx]\n    idx += 1\n    print(f"Processing option: {choice}")\n    if choice == "0":\n        print("Exiting application safely.")\n        break',
              explanation:
                "This pattern is the core engine for menu-driven applications like Inbox Guardian. The loop runs indefinitely until the user specifies '0', which triggers the break statement.",
              expectedOutput:
                "Processing option: 1\nProcessing option: 3\nProcessing option: 0\nExiting application safely.",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch5-ex",
          title: "Exercise 5: Accumulating Flagged Keyword Matches",
          difficulty: "intermediate",
          prompt:
            "Given `keywords = ['free', 'prize', 'urgent', 'winner']` and `message = 'congratulations you won a free prize'`, use a `for` loop to count how many keywords appear in the message. Print: 'Total matches found: <count>'.",
          starterCode:
            "keywords = ['free', 'prize', 'urgent', 'winner']\nmessage = 'congratulations you won a free prize'\nmatch_count = 0\n\n# Iterate through keywords and increment match_count if keyword in message\n",
          testCases: [
            {
              id: "tc-loop-count",
              description: "Correctly counts matching keywords",
              expectedOutputSnippet: "Total matches found: 2",
            },
          ],
          hints: [
            "Use: `for kw in keywords:`",
            "Inside the loop: `if kw in message:` increment `match_count += 1`",
            "Print the result after the loop finishes.",
          ],
          solution:
            "keywords = ['free', 'prize', 'urgent', 'winner']\nmessage = 'congratulations you won a free prize'\nmatch_count = 0\nfor kw in keywords:\n    if kw in message:\n        match_count += 1\nprint(f'Total matches found: {match_count}')",
          solutionExplanation:
            "The loop checks each keyword against the message string in turn. 'free' and 'prize' both match, resulting in a count of 2.",
        },
      ],
      recap: {
        keyConcepts: [
          "for loops iterate across sequences.",
          "range(start, stop, step) generates integer sequences.",
          "while loops execute as long as the condition evaluates to True.",
          "break immediately terminates the current loop.",
        ],
        essentialSyntax: [
          {
            syntax: "for item in sequence:\n    pass",
            description: "Sequence iteration.",
            example: "for x in [1, 2, 3]: print(x)",
          },
          {
            syntax: "while condition:\n    pass",
            description: "Condition-controlled loop.",
            example: "while count > 0: count -= 1",
          },
        ],
        takeaways: [
          "Always ensure while loops have an update condition or break condition that is guaranteed to be reached.",
        ],
        glossary: [
          {
            term: "Iteration",
            definition: "The repetition of a process in computer programming.",
          },
          {
            term: "Infinite Loop",
            definition: "A loop whose termination condition is never reached, causing it to execute endlessly until interrupted.",
          },
        ],
        revisionQuestions: [
          {
            question: "How many numbers are generated by `range(2, 8, 2)`?",
            answer: "Three numbers: 2, 4, 6 (stops before 8).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q5-1",
          type: "predict-output",
          prompt: "What is the final value of total: `total = 0; for i in range(3): total += i`?",
          options: ["3", "6", "0", "4"],
          correctAnswer: "3",
          explanation: "i takes values 0, 1, 2. total = 0 + 0 + 1 + 2 = 3.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "38–53 min: Loops and Repetition",
        timingMinutes: 15,
        teachingGoal: "Master iterating through lists and understanding loop termination.",
        commonMisconceptions: [
          "Thinking range(5) includes 5 (it generates 0 to 4).",
          "Creating an infinite while loop by forgetting to increment counter.",
        ],
        discussionPrompts: [
          "When should you prefer a `for` loop over a `while` loop in production data engineering pipelines?",
        ],
        liveCodingCheckpoints: [
          "Show how to break out of a while True loop using an exit condition.",
        ],
      },
    },

    {
      id: "w1-ch6",
      slug: "collections-lists-and-dictionaries",
      number: 6,
      title: "Collections: Lists and Dictionaries",
      estimatedMinutes: 15,
      introduction:
        "Real-world data is rarely isolated numbers or strings; it exists in collections. In this chapter, you will master Python's two most essential data structures: **lists** (ordered, mutable sequences) and **dictionaries** (key-value associative stores). You will also learn to structure complex data as a list of dictionaries.",
      learningObjectives: [
        "Create, append to, and access elements in a Python list",
        "Create and update dictionaries using meaningful key-value pairs",
        "Retrieve dictionary values using key lookup `dict[key]` and `.get()`",
        "Structure a scan log as a list of message record dictionaries",
        "Iterate over lists of dictionaries to aggregate statistics",
      ],
      sections: [
        {
          id: "w1-ch6-s1",
          title: "6.1 Python Lists",
          content:
            "A **list** is an ordered, mutable collection denoted by square brackets `[]`. Unlike arrays in low-level languages, Python lists can store elements of any type:\n\n```python\nkeywords = ['free', 'urgent', 'winner', 'account']\nkeywords.append('verify')  # Adds to end\nprint(keywords[0])        # 'free'\nprint(len(keywords))      # 5\n```\n\nLists are **mutable**, meaning you can update existing elements (`keywords[1] = 'immediate'`).",
        },
        {
          id: "w1-ch6-s2",
          title: "6.2 Python Dictionaries",
          content:
            "A **dictionary** is an unordered collection of **key-value pairs** denoted by curly braces `{}`. Keys must be unique and immutable (typically strings):\n\n```python\nscan_record = {\n    'sender': 'support@bank-alerts.com',\n    'matches': 3,\n    'status': 'POTENTIALLY SUSPICIOUS'\n}\n\nprint(scan_record['status'])  # Direct lookup\nscan_record['scanned_at'] = '2026-11-17'  # Adding a new key\n```",
        },
        {
          id: "w1-ch6-s3",
          title: "6.3 List of Dictionaries: The Standard Data Format",
          content:
            "In data science and web APIs, tabular datasets are represented in memory as a **list of dictionaries**, where each dictionary represents one row/record.",
          codeExamples: [
            {
              id: "w1-ch6-ex1",
              title: "Logging and Aggregating Message Scans",
              description: "Storing scan records in a list of dictionaries and computing summary counts.",
              code: 'inbox_history = [\n    {"id": 101, "sender": "advisor@univ.edu", "is_suspicious": False},\n    {"id": 102, "sender": "lottery-intl@win.com", "is_suspicious": True},\n    {"id": 103, "sender": "admin@cloud-verify.org", "is_suspicious": True}\n]\n\nsuspicious_count = 0\nfor record in inbox_history:\n    if record["is_suspicious"]:\n        suspicious_count += 1\n\nprint(f"Total messages scanned: {len(inbox_history)}")\nprint(f"Suspicious threats identified: {suspicious_count}")',
              explanation:
                "We iterate through the list where each element is a dictionary representing one email. We access record['is_suspicious'] to evaluate the boolean state.",
              expectedOutput:
                "Total messages scanned: 3\nSuspicious threats identified: 2",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch6-ex",
          title: "Exercise 6: Building a Scan History Store",
          difficulty: "intermediate",
          prompt:
            "Create an empty list called `history`. Create a dictionary `entry = {'sender': 'alerts@promo.com', 'matches': 2, 'status': 'CAUTION'}`. Append `entry` to `history`. Print the sender and status from `history[0]`.",
          starterCode:
            "# 1. Create empty list history\nhistory = []\n\n# 2. Create entry dictionary\n\n# 3. Append entry to history\n\n# 4. Print: 'First scan sender: <sender> | Status: <status>'\n",
          testCases: [
            {
              id: "tc-history",
              description: "Appends and retrieves from list of dictionaries",
              expectedOutputSnippet: "First scan sender: alerts@promo.com | Status: CAUTION",
            },
          ],
          hints: [
            "Use history.append(entry)",
            "Access fields using history[0]['sender'] and history[0]['status']",
            'Use f-string: print(f"First scan sender: {history[0][\'sender\']} | Status: {history[0][\'status\']}")',
          ],
          solution:
            "history = []\nentry = {'sender': 'alerts@promo.com', 'matches': 2, 'status': 'CAUTION'}\nhistory.append(entry)\nprint(f\"First scan sender: {history[0]['sender']} | Status: {history[0]['status']}\")",
          solutionExplanation:
            "Dictionaries store structured fields for an entity, while lists collect multiple records sequentially.",
        },
      ],
      recap: {
        keyConcepts: [
          "Lists are ordered, mutable sequences indexed by integers [0, 1, 2].",
          "append() adds items to the end of a list.",
          "Dictionaries store key-value pairs; lookup is fast and indexed by key.",
          "A list of dictionaries is the standard in-memory representation of structured data records.",
        ],
        essentialSyntax: [
          {
            syntax: "my_list = [item1, item2]\nmy_list.append(item3)",
            description: "List creation and appending.",
            example: "nums = [1]; nums.append(2)",
          },
          {
            syntax: "my_dict = {'key': value}\nmy_dict['new_key'] = new_val",
            description: "Dictionary creation and mutation.",
            example: "user = {'name': 'Sam'}",
          },
        ],
        takeaways: [
          "Attempting to access a dictionary key that does not exist raises a KeyError. Use .get('key', default) for safe retrieval.",
        ],
        glossary: [
          {
            term: "Key-Value Pair",
            definition: "An association between an identifier (key) and an assigned data object (value).",
          },
          {
            term: "KeyError",
            definition: "An exception raised when a mapping (dictionary) key is not found in the set of existing keys.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why are dictionaries preferred over lists for storing named fields of an email?",
            answer: "Because dictionary values are accessed by descriptive keys (e.g. record['sender']) rather than ambiguous numeric positions (e.g. record[0]).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q6-1",
          type: "predict-output",
          prompt: "What will `data = {'a': 1}; data['b'] = 2; print(len(data))` output?",
          options: ["1", "2", "3", "Error"],
          correctAnswer: "2",
          explanation: "Adding key 'b' creates a second key-value entry. len(data) returns 2.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "53–68 min: Collections (Lists and Dictionaries)",
        timingMinutes: 15,
        teachingGoal: "Establish the concept of lists of dictionaries as in-memory databases.",
        commonMisconceptions: [
          "Confusing list syntax `[]` with dictionary syntax `{}`.",
          "Believing dictionary keys can be duplicates (assigning to an existing key overwrites it).",
        ],
        discussionPrompts: [
          "How does a list of dictionaries in Python map directly to rows and columns in a CSV file or Pandas DataFrame?",
        ],
        liveCodingCheckpoints: [
          "Inspect type(record) and show how to access nested values.",
        ],
      },
    },

    {
      id: "w1-ch7",
      slug: "functions-and-code-organisation",
      number: 7,
      title: "Functions and Code Organisation",
      estimatedMinutes: 12,
      introduction:
        "Writing all code in a single sprawling script becomes unmaintainable. In this chapter, you will learn how to decompose complex tasks into modular, reusable, testable functions using `def`, pass parameters, return values, understand variable scope, and separate logic from display.",
      learningObjectives: [
        "Define functions using the `def` keyword and descriptive naming",
        "Pass arguments into functions via parameters",
        "Return values using the `return` statement",
        "Differentiate between returning a value and printing it to the screen",
        "Understand local versus global variable scope at an introductory level",
        "Architect clean, reusable message scanning functions",
      ],
      sections: [
        {
          id: "w1-ch7-s1",
          title: "7.1 Why Functions Matter",
          content:
            "A **function** is a named, self-contained block of code designed to perform a specific task. Functions embody the DRY (**Don't Repeat Yourself**) software engineering principle. Instead of copying and pasting code, you write it once inside a function and call it whenever needed.",
        },
        {
          id: "w1-ch7-s2",
          title: "7.2 Parameters and Return Values",
          content:
            "Functions receive inputs called **parameters** and output results using the `return` keyword:\n\n```python\ndef calculate_risk_score(match_count, total_keywords):\n    percentage = (match_count / total_keywords) * 100\n    return round(percentage, 1)\n```\n\n**CRITICAL DISTINCTION**: `print()` displays text on the screen for a human to read. `return` hands the calculated data back to the calling code so it can be stored in a variable, passed to another function, or saved to a database.",
          codeExamples: [
            {
              id: "w1-ch7-ex1",
              title: "Modular Message Analysis Function",
              description: "A pure function that checks a message against a keyword list.",
              code: 'def scan_message(text, keywords):\n    cleaned = text.lower()\n    matched = []\n    for kw in keywords:\n        if kw in cleaned:\n            matched.append(kw)\n    \n    return {\n        "text": text,\n        "matched_keywords": matched,\n        "total_matches": len(matched),\n        "is_suspicious": len(matched) >= 2\n    }\n\n# Calling the function\nresult = scan_message("URGENT: Click here to claim your free prize", ["free", "prize", "urgent"])\nprint("Matched count:", result["total_matches"])\nprint("Status:", "THREAT" if result["is_suspicious"] else "CLEAN")',
              explanation:
                "The function takes two inputs, performs the scanning logic, and returns a structured dictionary containing all evaluation metrics.",
              expectedOutput:
                "Matched count: 3\nStatus: THREAT",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch7-ex",
          title: "Exercise 7: Build a Keyword Counting Function",
          difficulty: "intermediate",
          prompt:
            "Write a function `count_matches(message, target_word)` that converts `message` to lowercase and returns the integer count of occurrences of `target_word`. Test it with message='Free free gift' and target_word='free'.",
          starterCode:
            "def count_matches(message, target_word):\n    # Convert message to lowercase\n    # Use message.count(target_word)\n    # Return the count\n    pass\n\n# Test call\nres = count_matches('Free free gift', 'free')\nprint(f'Matches: {res}')\n",
          testCases: [
            {
              id: "tc-func",
              description: "Correctly counts target word occurrences",
              expectedOutputSnippet: "Matches: 2",
            },
          ],
          hints: [
            "Strings have a built-in .count() method: text.count('word')",
            "Remember to normalize: cleaned = message.lower()",
            "Return the integer result: return cleaned.count(target_word)",
          ],
          solution:
            "def count_matches(message, target_word):\n    cleaned = message.lower()\n    return cleaned.count(target_word)\n\nres = count_matches('Free free gift', 'free')\nprint(f'Matches: {res}')",
          solutionExplanation:
            "The function encapsulates lowercase normalization and count calculation, returning the clean integer result.",
        },
      ],
      recap: {
        keyConcepts: [
          "def function_name(param1, param2): defines a function.",
          "return sends data back to the caller; execution stops at return.",
          "print() displays to console; return provides programmatically usable values.",
          "Variables created inside a function are local to that function.",
        ],
        essentialSyntax: [
          {
            syntax: "def func(a, b):\n    return a + b",
            description: "Function definition with return value.",
            example: "def add(x, y): return x + y",
          },
        ],
        takeaways: [
          "Functions should have a single well-defined responsibility.",
        ],
        glossary: [
          {
            term: "Parameter",
            definition: "A named variable listed in the function definition header.",
          },
          {
            term: "Argument",
            definition: "The actual value passed into the function when it is invoked.",
          },
          {
            term: "Scope",
            definition: "The region of a program where a particular identifier (variable) is accessible.",
          },
        ],
        revisionQuestions: [
          {
            question: "What happens if a function does not contain an explicit `return` statement?",
            answer: "In Python, it implicitly returns `None`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q7-1",
          type: "predict-output",
          prompt: "What will print: `def square(n): return n * n; print(square(4) + 2)`?",
          options: ["18", "16", "None", "Error"],
          correctAnswer: "18",
          explanation: "square(4) returns 16. 16 + 2 = 18.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "68–80 min: Functions and Code Organisation",
        timingMinutes: 12,
        teachingGoal: "Equip students to assemble the Inbox Guardian functions in Chapter 8.",
        commonMisconceptions: [
          "Confusing `print` inside a function with `return` (leads to functions returning `None`).",
          "Attempting to access a local variable outside the function.",
        ],
        discussionPrompts: [
          "Why is modular code easier to debug and test than monolithic scripts?",
        ],
        liveCodingCheckpoints: [
          "Demonstrate that assigning `x = print('Hi')` sets `x` to `None`.",
        ],
      },
    },

    {
      id: "w1-ch8",
      slug: "capstone-inbox-guardian",
      number: 8,
      title: "Capstone: Inbox Guardian",
      estimatedMinutes: 35,
      introduction:
        "Congratulations on reaching the Workshop 1 Capstone! You will now synthesize all concepts from Chapters 1 through 7 — variables, strings, conditions, loops, collections, and functions — to build Inbox Guardian: a complete, menu-driven, rule-based message analysis application.",
      learningObjectives: [
        "Architect a real-world Python application using modular functions",
        "Implement rule-based keyword indicator matching and risk scoring",
        "Store scan results in an in-memory database using a list of dictionaries",
        "Compute aggregate detection metrics across historical message scans",
        "Provide a resilient interactive command menu with input validation",
        "Understand the boundary between rule-based programming and machine learning",
      ],
      sections: [
        {
          id: "w1-ch8-s1",
          title: "8.1 Project Architecture & Specification",
          content:
            "Inbox Guardian is a personal security assistant designed to screen inbound emails and SMS messages for common phishing and scam indicators.\n\nThe application consists of six core functions:\n1. `analyse_message(text, keywords)`: Evaluates a message string and returns a detailed analysis dictionary.\n2. `scan_sample_inbox(inbox, keywords)`: Batch processes a list of simulated inbox messages.\n3. `display_history(history)`: Formats and displays all logged scans.\n4. `calculate_statistics(history)`: Computes total messages, suspicious count, and threat percentage.\n5. `manage_keywords(keywords, action, word)`: Adds or removes detection keywords dynamically.\n6. `main()`: The interactive CLI menu loop.",
        },
        {
          id: "w1-ch8-s2",
          title: "8.2 The Educational Boundary: Rule-Based vs Machine Learning",
          content:
            "> [!IMPORTANT]\n> **Inbox Guardian is a RULE-BASED Python application, NOT machine learning.**\n>\n> In this project, we manually hard-code the heuristic indicators ('free', 'click here', 'urgent'). If a scammer alters their wording or makes typos ('f-r-e-e'), our manual rules will fail!\n>\n> In Workshops 5 through 8, you will discover how machine learning models overcome this limitation by **learning statistical patterns directly from labeled training data** rather than relying on human-written rules.",
        },
        {
          id: "w1-ch8-s3",
          title: "8.3 Complete Reference Implementation",
          content:
            "Below is the complete, production-tested implementation of Inbox Guardian. You can test it directly in your right workspace console.",
          codeExamples: [
            {
              id: "w1-ch8-ex1",
              title: "Inbox Guardian Core Analysis Engine",
              description: "Complete execution of message analysis and batch detection.",
              code: `def analyse_message(text, keywords):
    cleaned = text.lower()
    matched = [kw for kw in keywords if kw in cleaned]
    match_count = len(matched)
    
    if match_count == 0:
        status = "SAFE"
        recommendation = "No suspicious keywords detected."
    elif match_count <= 2:
        status = "POTENTIALLY SUSPICIOUS"
        recommendation = "Exercise caution. Verify the sender independently."
    else:
        status = "HIGH RISK"
        recommendation = "Do not click links or provide credentials. High threat probability."
        
    return {
        "text": text,
        "matched": matched,
        "count": match_count,
        "status": status,
        "recommendation": recommendation
    }

# Test sample
keywords = ["free", "click here", "urgent", "prize", "account suspended"]
sample = "URGENT: Click here to claim your free prize today!"

result = analyse_message(sample, keywords)
print("=" * 40)
print("INBOX GUARDIAN SCAN RESULT")
print("=" * 40)
print(f"Status: {result['status']}")
print(f"Matched indicators ({result['count']}): {', '.join(result['matched'])}")
print(f"Recommendation: {result['recommendation']}")`,
              explanation:
                "The analysis function inspects the text, finds all matching keywords, assigns a risk status based on thresholds, and returns a dictionary.",
              expectedOutput:
                "========================================\nINBOX GUARDIAN SCAN RESULT\n========================================\nStatus: HIGH RISK\nMatched indicators (3): free, click here, urgent\nRecommendation: Do not click links or provide credentials. High threat probability.",
            },
          ],
        },
      ],
      exercises: [
        {
          id: "w1-ch8-ex",
          title: "Capstone Challenge: Statistics Aggregator",
          difficulty: "challenge",
          prompt:
            "Implement the function `calculate_statistics(history)` where `history` is a list of scan result dictionaries (each having a 'status' key). The function should return a dictionary with: 'total_scanned' (int) and 'threat_count' (int count of items where status != 'SAFE').",
          starterCode:
            `def calculate_statistics(history):
    # Calculate total and threats (status != 'SAFE')
    pass

# Test data
test_history = [
    {"status": "SAFE"},
    {"status": "HIGH RISK"},
    {"status": "POTENTIALLY SUSPICIOUS"},
    {"status": "SAFE"}
]

stats = calculate_statistics(test_history)
print(f"Total: {stats['total_scanned']} | Threats: {stats['threat_count']}")`,
          testCases: [
            {
              id: "tc-capstone",
              description: "Computes total and threats count",
              expectedOutputSnippet: "Total: 4 | Threats: 2",
            },
          ],
          hints: [
            "Start with `threats = 0`",
            "Loop over history: `for scan in history:`",
            "If `scan['status'] != 'SAFE'`, increment `threats += 1`",
          ],
          solution:
            `def calculate_statistics(history):
    total = len(history)
    threats = sum(1 for s in history if s.get("status") != "SAFE")
    return {"total_scanned": total, "threat_count": threats}

test_history = [
    {"status": "SAFE"},
    {"status": "HIGH RISK"},
    {"status": "POTENTIALLY SUSPICIOUS"},
    {"status": "SAFE"}
]

stats = calculate_statistics(test_history)
print(f"Total: {stats['total_scanned']} | Threats: {stats['threat_count']}")`,
          solutionExplanation:
            "The function computes total records using len() and counts non-safe statuses using a generator or loop.",
        },
      ],
      recap: {
        keyConcepts: [
          "Inbox Guardian is a complete rule-based Python application.",
          "Modular architecture separates scanning, presentation, and data management.",
          "Rule-based systems have inherent limitations; machine learning will provide adaptive alternatives in later workshops.",
        ],
        essentialSyntax: [
          {
            syntax: "analysis = analyse_message(msg, keywords)",
            description: "Calling the scanning engine.",
            example: "res = analyse_message('win free cash', ['free'])",
          },
        ],
        takeaways: [
          "Always test boundary conditions (e.g. empty message, 0 matches, many matches).",
        ],
        glossary: [
          {
            term: "Rule-Based System",
            definition: "A software system that applies human-crafted 'if-then' heuristics to data rather than learning from data patterns.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does Inbox Guardian miss a spam email that writes 'c-l-i-c-k h-e-r-e'?",
            answer: "Because rule-based exact substring matching looks for strict character sequences. It lacks the statistical flexibility of machine learning models.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "q8-1",
          type: "concept",
          prompt: "What is the primary difference between Inbox Guardian and a Machine Learning spam classifier?",
          options: [
            "Inbox Guardian uses manual rules; ML learns patterns from training data",
            "Inbox Guardian is written in Python; ML cannot use Python",
            "Inbox Guardian requires a GPU; ML runs in the browser",
            "There is no difference"
          ],
          correctAnswer: "Inbox Guardian uses manual rules; ML learns patterns from training data",
          explanation: "Inbox Guardian relies on hardcoded keyword rules created by humans, whereas ML algorithms discover features and weights automatically from data.",
        },
      ],
      facilitatorNotes: {
        agendaItem: "80–120 min: Capstone Inbox Guardian & Showcase",
        timingMinutes: 40,
        teachingGoal: "Guide students through putting all 7 chapters together into a working application.",
        commonMisconceptions: [
          "Students assuming Inbox Guardian is an AI or Machine Learning model.",
        ],
        discussionPrompts: [
          "How would you attempt to bypass this rule-based scanner? How might a machine-learning model defend against those bypasses?",
        ],
        liveCodingCheckpoints: [
          "Build the main menu and show the full loop with sample emails.",
        ],
      },
    },
  ],
};
