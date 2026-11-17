import { Chapter } from "@/types/curriculum";

export const chapter2: Chapter = {
  id: "w1-ch2",
  slug: "variables-data-types-and-io",
  number: 2,
  title: "Variables, Data Types and Input/Output",
  estimatedMinutes: 20,
  introduction:
    "Data science and artificial intelligence rely on representing, transforming, and processing real-world data in memory. In this chapter, you will master Python's memory model: how variables act as dynamic references to objects, how to distinguish primitive types (int, float, str, bool, NoneType), how to cast types safely, how to accept interactive user input with input(), and how to construct modern, formatted strings with f-strings.",
  learningObjectives: [
    "Differentiate the 'box' vs 'tag' mental model of variables and apply PEP 8 snake_case naming conventions",
    "Identify Python's 5 primitive types: int, float, str, bool, and NoneType using the type() function",
    "Perform safe type conversion (casting) with int(), float(), str(), and bool() while avoiding common runtime exceptions",
    "Capture interactive input with input() and handle the critical reality that input() always returns a string",
    "Construct production-grade string interpolation with f-strings, including precision specifiers, alignment, and formatting",
    "Diagnose and handle critical edge cases: casting float strings to int, bool('False') truthiness quirks, and empty input values",
  ],
  sections: [
    {
      id: "w1-ch2-s1",
      title: "2.1 Variables as Object References: The Tag Model",
      content:
        "In languages like C or Java, a variable is a statically typed 'box' carved out of memory: `int x = 5;`. You cannot put text inside an integer box.\n\nIn Python, **variables are not boxes; they are named tags (references) bound to objects living in heap memory**. When you write `x = 10`, Python allocates an integer object `10` in memory and attaches the label `x` to it. If you later write `x = 'Hello'`, the label `x` is simply detached from `10` and rebound to the string object `'Hello'`. This property is known as **dynamic typing**.\n\n### Variable Naming Rules (PEP 8):\n- Names can contain lowercase letters, uppercase letters, digits, and underscores `_`.\n- Names **cannot begin with a digit** (`2name` is illegal; `name2` is valid).\n- Names are case-sensitive (`data_point` != `Data_Point`).\n- Cannot be Python reserved keywords (`class`, `def`, `if`, `while`, `return`, `for`, `import`).\n- Idiomatic Python convention: Use `snake_case` for variables and functions (e.g. `user_email`, `threat_score`).",
      codeExamples: [
        {
          id: "w1-ch2-ex1",
          title: "Statement 1: Variable Binding & Multiple Assignment",
          description: "Binding values to variable names and unpacking multiple variables in one line.",
          code: `# Single variable assignments\nstudent_name = "Alex Chen"\nworkshop_id = 101\nactive_status = True\n\n# Multiple assignment (tuple unpacking)\nmin_score, max_score, threshold = 0, 100, 75\n\nprint(student_name, "is enrolled in workshop", workshop_id)\nprint("Threshold:", threshold, "| Range:", min_score, "to", max_score)`,
          explanation:
            "Variables are assigned using the single equals operator '='. Multiple variables can be initialized simultaneously in a comma-separated list.",
          stepByStepWalkthrough: [
            "Line 2: Allocates string 'Alex Chen' and binds variable 'student_name'.",
            "Line 3: Allocates int 101 and binds 'workshop_id'.",
            "Line 7: Simultaneously binds min_score=0, max_score=100, threshold=75.",
            "Lines 9-10: Outputs formatted variable values.",
          ],
          expectedOutput:
            "Alex Chen is enrolled in workshop 101\nThreshold: 75 | Range: 0 to 100",
          whyItHappens:
            "Python evaluates the right side of '=' first before binding the variables on the left side.",
          edgeCases:
            "• Shadowing built-in names: Writing `print = 5` binds the identifier 'print' to an integer! Subsequent calls to `print(...)` will crash with `TypeError: 'int' object is not callable`. Never use built-in function names as variable identifiers.\n• Unbalanced multiple assignment: `a, b = 1, 2, 3` raises `ValueError: too many values to unpack`.",
        },
      ],
    },
    {
      id: "w1-ch2-s2",
      title: "2.2 Python's Primitive Data Types & type() Inspection",
      content:
        "Every value in Python has an associated **data type** that dictates what operations can be performed on it.\n\n### The 5 Primitive Types in Python:\n1. **`int` (Integer)**: Whole numbers of arbitrary magnitude (`-42`, `0`, `2026`). In Python 3, integers never overflow.\n2. **`float` (Floating-Point)**: Numbers with fractional decimals (`3.14159`, `-0.005`, `1.5e-4`). Represented in IEEE 754 64-bit double precision.\n3. **`str` (String)**: Immutable sequences of Unicode characters enclosed in `'` or `\"`.\n4. **`bool` (Boolean)**: Truth values: exactly `True` or `False`. (Internally, `bool` is a subclass of `int` where `True == 1` and `False == 0`).\n5. **`NoneType` (`None`)**: The special singleton object representing the absence of a value or null state.",
      codeExamples: [
        {
          id: "w1-ch2-ex2",
          title: "Statement 2: Inspecting Data Types with type()",
          description: "Using the built-in type() function to verify the runtime class of variables.",
          code: `metric_int   = 42\nmetric_float = 98.6\nmetric_str   = "Security Alert"\nmetric_bool  = True\nmetric_none  = None\n\nprint("metric_int   is :", type(metric_int))\nprint("metric_float is :", type(metric_float))\nprint("metric_str   is :", type(metric_str))\nprint("metric_bool  is :", type(metric_bool))\nprint("metric_none  is :", type(metric_none))`,
          explanation:
            "type(object) returns the class type of the object passed as an argument. In Python, types are first-class objects.",
          stepByStepWalkthrough: [
            "Lines 1-5: Defines variables representing each of the 5 fundamental primitive types.",
            "Lines 7-11: Queries type() and outputs each classification class.",
          ],
          expectedOutput:
            "metric_int   is : <class 'int'>\nmetric_float is : <class 'float'>\nmetric_str   is : <class 'str'>\nmetric_bool  is : <class 'bool'>\nmetric_none  is : <class 'NoneType'>",
          whyItHappens:
            "CPython stores an object header containing a pointer to its type definition struct in C.",
          edgeCases:
            "• Checking for None: Always use identity operator `is None` or `is not None` rather than equality `== None`, because custom classes could override `__eq__`, whereas `is` checks memory address.",
        },
      ],
    },
    {
      id: "w1-ch2-s3",
      title: "2.3 Explicit Type Conversion (Casting)",
      content:
        "Because Python is strongly typed, it will not automatically convert strings to numbers. If you try to add `'10' + 5`, Python will raise a `TypeError: can only concatenate str (not 'int') to str`.\n\nYou must explicitly convert (cast) types using the built-in constructors:\n- `int(val)`: Converts integer strings or floats to an int (truncating decimals toward zero).\n- `float(val)`: Converts integers or decimal strings to floating point numbers.\n- `str(val)`: Converts any Python object into its printable text string representation.\n- `bool(val)`: Converts values to boolean based on truthiness rules.",
      codeExamples: [
        {
          id: "w1-ch2-ex3",
          title: "Statement 3: Type Casting with int(), float(), str(), and bool()",
          description: "Explicit conversion between strings, numbers, and boolean values.",
          code: `# String to numerical casting\nraw_input_age = "24"\nage = int(raw_input_age)\nprint("Next year age:", age + 1)\n\nraw_price = "19.99"\nprice = float(raw_price)\ntaxed_price = price * 1.08\nprint("Price with tax :", taxed_price)\n\n# Number to string casting for concatenation\ntoken_count = 150\nstatus_msg = "Scanned " + str(token_count) + " tokens."\nprint(status_msg)\n\n# Truthiness casting\nprint("bool(0)       :", bool(0))\nprint("bool(42)      :", bool(42))\nprint("bool('')      :", bool(''))\nprint("bool('False') :", bool('False'))`,
          explanation:
            "Explicit casting instructs the interpreter to instantiate a new object of the desired destination type from the provided input value.",
          stepByStepWalkthrough: [
            "Line 3: int(\"24\") parses the numeric string and produces integer 24.",
            "Line 4: 24 + 1 executes integer addition to yield 25.",
            "Line 7: float(\"19.99\") parses the decimal string into float 19.99.",
            "Line 12: str(150) converts int 150 to string '150', allowing safe '+' concatenation.",
            "Lines 16-19: Demonstrates truthiness: 0 and empty string '' are False; 42 and 'False' are True.",
          ],
          expectedOutput:
            "Next year age: 25\nPrice with tax : 21.5892\nScanned 150 tokens.\nbool(0)       : False\nbool(42)      : True\nbool('')      : False\nbool('False') : True",
          whyItHappens:
            "bool() evaluates truthiness: any non-empty string is truthy, regardless of the text it contains.",
          edgeCases:
            "• Direct float-string to int failure: `int('3.14')` raises `ValueError: invalid literal for int() with base 10: '3.14'`. To convert a float string to an int, you must cascade through float first: `int(float('3.14'))` yields `3`.\n• The bool('False') Trap: `bool('False')` is `True`! Why? Because 'False' is a non-empty string with length 5. In Python, ALL non-empty strings evaluate to True. Only the empty string `bool('')` evaluates to False.",
        },
      ],
    },
    {
      id: "w1-ch2-s4",
      title: "2.4 Interactive User Input with input()",
      content:
        "Programs become genuinely useful when they respond dynamically to user input.\n\nPython provides the built-in function `input(prompt)`. When called:\n1. Execution pauses.\n2. The optional prompt string is printed to the terminal.\n3. The user types input and presses Enter.\n4. `input()` reads the line and **ALWAYS returns it as a string (`str`)**.\n\n### The Fundamental Rule of input():\nEven if the user types `42`, `input()` returns the string `\"42\"`. If your program needs to perform math or comparisons on that input, you must immediately cast it with `int()` or `float()`.",
      codeExamples: [
        {
          id: "w1-ch2-ex4",
          title: "Statement 4: Interactive Input with Type Casting",
          description: "Prompting the user, reading input, casting to numeric types, and validating.",
          code: `# Simulating user input in queued environment\n# Type values into the 'Program Input' drawer before running!\nuser_name = "Jordan Lee"  # Simulated input\nuser_credits_str = "120"   # Simulated input\n\n# Casting input to integer\ncredits = int(user_credits_str)\nremaining_required = 160 - credits\n\nprint("Student Name    :", user_name)\nprint("Current Credits :", credits)\nprint("Credits to Grad :", remaining_required)`,
          explanation:
            "In interactive terminals, input() pauses for keyboard input. In our Pyodide WASM environment, lines can be pre-queued in the 'Program Input' drawer.",
          stepByStepWalkthrough: [
            "Line 6: Converts string '120' to integer 120.",
            "Line 7: Subtracts 120 from 160 to calculate credits remaining (40).",
            "Lines 9-11: Emits the calculated values.",
          ],
          expectedOutput:
            "Student Name    : Jordan Lee\nCurrent Credits : 120\nCredits to Grad : 40",
          whyItHappens:
            "Explicit casting transforms the raw character sequence into an integer operable by the CPU's ALU.",
          edgeCases:
            "• User pressing Enter without typing anything: input() returns the empty string \"\". If you attempt int(\"\"), Python raises ValueError: invalid literal for int() with base 10: ''. Always validate or guard inputs.\n• User typing letters when a number is expected: int('abc') immediately raises ValueError.",
        },
      ],
    },
    {
      id: "w1-ch2-s5",
      title: "2.5 Modern String Formatting with f-strings",
      content:
        "Historically, Python formatted strings using `%` formatting (`\"%s is %d\" % (name, age)`) or `.format()`. In Python 3.6, **f-strings (Formatted String Literals)** were introduced, becoming the universal industry standard.\n\nAn f-string is prefixed with `f` or `F` before the opening quote: `f\"Hello {name}\"`.\nInside `{}` curly braces, you can write **any valid Python expression**, including arithmetic, method calls, and format specifiers.\n\n### Powerful Format Specifiers:\n- **Decimal Precision**: `{val:.2f}` (formats float to exactly 2 decimal places with rounding).\n- **Thousands Separator**: `{val:,}` (e.g. `1000000` -> `1,000,000`).\n- **Padding & Alignment**: `{val:>10}` (right-align in 10-character width), `{val:<10}` (left-align).\n- **Percentage**: `{ratio:.1%}` (multiplies by 100 and appends `%`, e.g. `0.856` -> `85.6%`).",
      codeExamples: [
        {
          id: "w1-ch2-ex5",
          title: "Statement 5: Advanced f-String Interpolation & Specifiers",
          description: "Formatting floating point numbers, currency, widths, and inline expressions.",
          code: `account_holder = "Dr. Maya Patel"\nbalance = 14250.875\nmonthly_gain = 0.0845\naccount_id = 42\n\n# Format precision, commas, alignment, and percentages\nprint(f"Holder   : {account_holder.upper()}")\nprint(f"ID       : {account_id:06d}")           # Zero-padded to 6 digits\nprint(f"Balance  : \${balance:,.2f}")            # 2 decimals + commas\nprint(f"Growth   : {monthly_gain:.1%}")          # Percentage formatting\nprint(f"Net Next : \${balance * (1 + monthly_gain):,.2f}") # Inline expression`,
          explanation:
            "f-strings evaluate expressions at runtime and apply format specifiers denoted after a colon ':' inside curly braces.",
          stepByStepWalkthrough: [
            "Line 7: account_holder.upper() executes inline method, outputting 'DR. MAYA PATEL'.",
            "Line 8: 42:06d zero-pads integer 42 to 6 characters -> '000042'.",
            "Line 9: balance:,.2f rounds 14250.875 to 2 decimals (14,250.88) and adds commas.",
            "Line 10: monthly_gain:.1% formats 0.0845 as 8.5%.",
            "Line 11: Calculates inline expression balance * (1 + monthly_gain) and formats as currency.",
          ],
          expectedOutput:
            "Holder   : DR. MAYA PATEL\nID       : 000042\nBalance  : $14,250.88\nGrowth   : 8.5%\nNet Next : $15,455.07",
          whyItHappens:
            "Python's compiler transforms f-strings into optimized string building bytecode during AST generation.",
          edgeCases:
            "• Escaping literal braces: If you need to print a literal '{' or '}' in an f-string, double them: f'{{Literal}} {val}' prints '{Literal} 42'.\n• Nested quotes: Avoid using the exact same quotation mark inside the curly braces as the outer f-string in older Python versions: use f'Score: {data[\"key\"]}' with alternating quotes.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch2-ex",
      title: "Exercise 2: Formatting User Financial Balances",
      difficulty: "basic",
      prompt:
        "Modify the starter code to calculate the final balance after a 7.5% annual interest return on an initial deposit of 12,500. Output the final amount formatted to 2 decimal places using an f-string.",
      starterCode:
        '# Exercise 2: Calculate compound investment return\nprincipal = 12500\nrate = 0.075\n\n# TODO: Calculate final_balance = principal * (1 + rate)\n# TODO: Print using f-string formatted to 2 decimal places with $ prefix:\n',
      testCases: [
        {
          id: "tc-2-1",
          description: "Calculates correct final balance with 2 decimals",
          expectedOutputSnippet: "13,437.50",
        },
      ],
      hints: [
        "Compute final_balance = principal * (1 + rate).",
        "Use an f-string with the specifier :,.2f to format with commas and 2 decimals: f'${final_balance:,.2f}'.",
        "Wrap the entire statement in print(f'Final Balance: ${final_balance:,.2f}').",
      ],
      solution:
        'principal = 12500\nrate = 0.075\nfinal_balance = principal * (1 + rate)\nprint(f"Final Balance: ${final_balance:,.2f}")',
      solutionExplanation:
        "principal * (1 + rate) computes 13437.5. The format specifier : ,.2f produces '$13,437.50'.",
    },
  ],
  assignment: {
    id: "w1-ch2-assignment",
    title: "Student Academic Performance & GPA Profiler",
    scenario:
      "The academic registrar at the Center of Excellence requires a command-line script to compute student grade statistics, convert raw marks into floating-point percentages, determine credit status, and generate an aligned ASCII report card using modern f-strings.",
    requirements: [
      "Define student metadata: student_name, student_id (integer), and enrolled_semester.",
      "Store raw marks for 3 subjects: Python Programming (92.5), Data Analysis (88.0), and Linear Algebra (76.5).",
      "Calculate total marks obtained and maximum possible marks (300.0).",
      "Calculate overall percentage to 2 decimal places: (total_marks / max_marks) * 100.",
      "Compute GPA on a 4.0 scale: (percentage / 100) * 4.0, formatted to 2 decimal places.",
      "Generate a formatted ASCII transcript table where subject titles are left-aligned in a 20-character column and marks are right-aligned to 6 characters.",
      "Display a final summary banner showing Student Name, ID, Overall Percentage, and GPA.",
    ],
    edgeCasesToHandle: [
      "Ensure marks are stored as floats to prevent premature integer truncation.",
      "Zero-padded student ID: format 5-digit student IDs with leading zeros if necessary ({student_id:05d}).",
      "Exact column alignment: Ensure column headers match the width of data rows.",
    ],
    starterCode: `# Chapter 2 Assignment: Student Academic Performance Profiler
# Center of Excellence: Data Science & AI

student_name = "Elena Rostova"
student_id = 4821
semester = "Spring 2026"

# Raw marks for 3 courses
python_mark = 92.5
data_mark = 88.0
math_mark = 76.5

# TODO: Compute total_marks = python_mark + data_mark + math_mark
# TODO: Compute max_marks = 300.0
# TODO: Compute percentage = (total_marks / max_marks) * 100
# TODO: Compute gpa = (percentage / 100.0) * 4.0

# TODO: Print formatted ASCII Transcript using f-strings with alignment specifiers
`,
    testCases: [
      {
        id: "tc-a2-1",
        description: "Outputs student name in report",
        expectedOutputSnippet: "Elena Rostova",
      },
      {
        id: "tc-a2-2",
        description: "Calculates total marks (257.0)",
        expectedOutputSnippet: "257.0",
      },
      {
        id: "tc-a2-3",
        description: "Calculates overall percentage (85.67%)",
        expectedOutputSnippet: "85.67%",
      },
      {
        id: "tc-a2-4",
        description: "Calculates GPA (3.43 / 4.00)",
        expectedOutputSnippet: "3.43",
      },
    ],
    hints: [
      "Sum the three marks to obtain total_marks.",
      "Use f'{percentage:.2f}%' to format the overall percentage.",
      "Use width specifiers like f'{name:<20}' for left alignment and f'{score:>6.1f}' for right alignment.",
    ],
    referenceSolution: `# Chapter 2 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

student_name = "Elena Rostova"
student_id = 4821
semester = "Spring 2026"

python_mark = 92.5
data_mark = 88.0
math_mark = 76.5

total_marks = python_mark + data_mark + math_mark
max_marks = 300.0
percentage = (total_marks / max_marks) * 100
gpa = (percentage / 100.0) * 4.0

print("=" * 45)
print(f"ACADEMIC TRANSCRIPT: {student_name.upper()}")
print(f"Student ID : {student_id:06d} | Semester: {semester}")
print("-" * 45)
print(f"{'Course Module':<25} {'Mark':>8} {'Status':>10}")
print("-" * 45)
print(f"{'Python Programming':<25} {python_mark:>8.1f} {'PASS':>10}")
print(f"{'Data Analysis':<25} {data_mark:>8.1f} {'PASS':>10}")
print(f"{'Linear Algebra':<25} {math_mark:>8.1f} {'PASS':>10}")
print("-" * 45)
print(f"{'Total Marks Obtained':<25} {total_marks:>8.1f} / 300.0")
print(f"{'Overall Percentage':<25} {percentage:>7.2f}%")
print(f"{'Cumulative GPA':<25} {gpa:>8.2f} / 4.00")
print("=" * 45)`,
    solutionExplanation:
      "This solution leverages f-string format specifiers (`:<25`, `:>8.1f`, `:06d`) to produce a production-grade, pixel-aligned terminal transcript. Float arithmetic ensures exact fractional averages without rounding distortion.",
  },
  recap: {
    keyConcepts: [
      "Python variables are dynamic references (tags) bound to objects in heap memory, not fixed memory boxes.",
      "The 5 primitive types are int, float, str, bool, and NoneType. Query any object's type with type().",
      "Explicit casting is required to convert types: int(), float(), str(), bool().",
      "input() ALWAYS returns a string; you must cast numeric inputs before arithmetic.",
      "f-strings (f'...') evaluate expressions inline and support specifiers like :.2f, :,, :>10, and :06d.",
    ],
    essentialSyntax: [
      {
        syntax: "var_name = value",
        description: "Binds a variable identifier to an object in memory.",
        example: 'threat_level = "ELEVATED"',
      },
      {
        syntax: "int(str_val), float(str_val), str(num)",
        description: "Explicit type conversion (casting).",
        example: "count = int('42') -> 42",
      },
      {
        syntax: 'f"User: {name}, Balance: \\${balance:,.2f}"',
        description: "Formatted string literal with inline expressions and format specifiers.",
        example: 'f"{3.14159:.2f}" -> "3.14"',
      },
      {
        syntax: 'user_text = input("Prompt: ")',
        description: "Reads a single line of string text from standard input.",
        example: 'name = input("Enter name: ")',
      },
    ],
    takeaways: [
      "bool('False') is True because 'False' is a non-empty string. Only bool('') is False.",
      "Direct int('3.14') fails with ValueError; cast via float first: int(float('3.14')).",
      "Avoid shadowing built-in names like print, id, type, list, str as variable names.",
    ],
    glossary: [
      {
        term: "Dynamic Typing",
        definition: "A programming language feature where variable types are determined at runtime and variables can be rebound to objects of different types.",
      },
      {
        term: "Type Casting",
        definition: "Explicitly converting an object from one data type to another using built-in constructors like int() or str().",
      },
      {
        term: "f-string",
        definition: "Formatted String Literal prefixed with f/F, evaluating expressions inside curly braces {} at runtime.",
      },
      {
        term: "IEEE 754",
        definition: "The international technical standard for floating-point arithmetic used by Python's float type.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does `bool('False')` return `True` in Python?",
        answer: "In Python, truthiness for strings is determined solely by length: any non-empty string has length > 0 and therefore evaluates to True. The specific characters inside the string are not inspected. Only the empty string '' evaluates to False.",
      },
      {
        question: "What is the difference between `int(19.99)` and `round(19.99)`?",
        answer: "int(19.99) truncates the decimal portion entirely toward zero, returning 19. round(19.99) rounds to the nearest whole number (following round-to-even bankers rounding), returning 20.",
      },
      {
        question: "Why will `int('45.8')` crash with a ValueError while `int(float('45.8'))` succeeds?",
        answer: "int() expects an integer literal string composed only of digits. A decimal point '.' is an invalid character for base-10 integer parsing. float() successfully parses the decimal point, and passing that float to int() truncates it to 45.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa2-1",
      type: "multiple-choice",
      prompt: "What is the type of the value returned by calling: input('Enter age: ')?",
      options: [
        "int if digits are entered, otherwise str",
        "Always int",
        "Always str",
        "float if a decimal is entered",
      ],
      correctAnswer: 2,
      explanation: "input() ALWAYS returns a string (str), regardless of whether the user typed numbers or letters.",
    },
    {
      id: "sa2-2",
      type: "multiple-choice",
      prompt: "What will f'{1234.567:,.2f}' produce?",
      options: [
        "1234.57",
        "1,234.57",
        "1,234.567",
        "1234.56",
      ],
      correctAnswer: 1,
      explanation: "The ',' specifier inserts thousands separators, and '.2f' rounds to 2 decimal places, producing '1,234.57'.",
    },
    {
      id: "sa2-3",
      type: "multiple-choice",
      prompt: "Which of the following will raise a ValueError?",
      options: [
        "float('100')",
        "str(45.5)",
        "int('3.14')",
        "bool('0')",
      ],
      correctAnswer: 2,
      explanation: "int('3.14') raises ValueError because '3.14' contains a decimal point. It must be converted to float first.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 2: Variables, Types & I/O",
    timingMinutes: 20,
    teachingGoal: "Ensure students master type differences, avoid int('float_str') crashes, and format aligned output.",
    commonMisconceptions: [
      "Assuming input() returns numbers if digits are typed.",
      "Thinking variables are fixed memory locations like in C.",
      "Expecting bool('False') to evaluate to False.",
    ],
    discussionPrompts: [
      "Why did Python choose dynamic typing over static typing?",
      "Why is IEEE 754 float precision important when computing financial or scientific data?",
    ],
    liveCodingCheckpoints: [
      "All students have run an f-string with :.2f and :, formatting.",
      "Intentionally cast an invalid string to demonstrate the ValueError.",
    ],
  },
};
