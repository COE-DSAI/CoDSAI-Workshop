import { Chapter } from "@/types/curriculum";

export const chapter7: Chapter = {
  id: "w1-ch7",
  slug: "functions-and-code-organisation",
  number: 7,
  title: "Functions and Code Organisation",
  estimatedMinutes: 20,
  introduction:
    "As software grows in complexity, writing code as one continuous monolithic script becomes unmaintainable. Professional software architecture relies on decomposition: breaking complex workflows into small, isolated, testable, and reusable blocks called Functions. In this chapter, you will master function engineering: parameter passing, positional vs keyword arguments, the critical mutable default argument trap, return value contracts, local vs global scope, type annotations, and docstrings.",
  learningObjectives: [
    "Define modular functions using the def statement and encapsulate complex logic into testable units",
    "Differentiate positional parameters, keyword arguments, and default parameters",
    "Return single and multiple values using tuple unpacking, and distinguish printing from returning data",
    "Navigate variable scope (Local, Enclosing, Global, Built-in - LEGB) and resolve UnboundLocalError exceptions",
    "Avoid the notorious 'Mutable Default Argument Trap' using None sentinel defaults",
    "Document software using modern PEP 484 type annotations and descriptive docstrings",
  ],
  sections: [
    {
      id: "w1-ch7-s1",
      title: "7.1 Defining Functions with def: The Reusable Block",
      content:
        "A **Function** is a named, self-contained block of instructions that performs a single well-defined task.\n\n### The Anatomy of a Python Function:\n```python\ndef function_name(parameter_1, parameter_2):\n    \"\"\"Docstring explaining what the function does.\"\"\"\n    # Function body (indented by 4 spaces)\n    result = parameter_1 + parameter_2\n    return result\n```\n\n### Core Engineering Benefits:\n1. **DRY Principle (Don't Repeat Yourself)**: Eliminate duplicate logic across your codebase.\n2. **Modularity & Testing**: Test and verify individual units of logic in complete isolation.\n3. **Abstraction**: Callers only need to know what inputs the function expects and what output it produces, without needing to know internal implementation details.",
      codeExamples: [
        {
          id: "w1-ch7-ex1",
          title: "Statement 1: Defining and Calling a Reusable Function",
          description: "Encapsulating string normalization and keyword scoring logic.",
          code: `# Defining a reusable sanitization function\ndef sanitize_email_text(raw_text):\n    """Strips leading/trailing whitespace and converts text to lowercase."""\n    cleaned = raw_text.strip().lower()\n    return cleaned\n\n# Calling the function multiple times with different inputs\nemail_1 = "   URGENT: Verify Credentials!  \\n"\nemail_2 = "   Meeting Agenda for Thursday  "\n\nprint("Sanitized 1:", sanitize_email_text(email_1))\nprint("Sanitized 2:", sanitize_email_text(email_2))`,
          explanation:
            "def registers the function name in the local namespace. When called with parentheses '()', execution jumps into the function body and returns the computed result.",
          stepByStepWalkthrough: [
            "Lines 2-5: Compiles the function sanitize_email_text with parameter raw_text.",
            "Line 11: Calls sanitize_email_text(email_1); raw_text receives email_1.",
            "Line 4: Executes .strip().lower() and returns 'urgent: verify credentials!'.",
            "Line 12: Calls sanitize_email_text(email_2), producing 'meeting agenda for thursday'.",
          ],
          expectedOutput:
            "Sanitized 1: urgent: verify credentials!\nSanitized 2: meeting agenda for thursday",
          whyItHappens:
            "Calling a function allocates a new frame on Python's call stack, which is destroyed upon returning.",
          edgeCases:
            "• Calling without parentheses: Writing `func = sanitize_email_text` does NOT execute the function! It merely binds another variable to the function object itself. You must include parentheses: `sanitize_email_text(...)` to execute.\n• Calling before definition: Calling a function on line 1 before its `def` statement on line 10 raises `NameError: name 'func' is not defined`. Python parses from top to bottom.",
        },
      ],
    },
    {
      id: "w1-ch7-s2",
      title: "7.2 Parameters vs Arguments: Positional, Keyword & Defaults",
      content:
        "It is important to distinguish vocabulary:\n- **Parameters**: The variable names listed in the function definition header.\n- **Arguments**: The actual data values passed into the function when invoking it.\n\n### Types of Arguments:\n- **Positional Arguments**: Mapped strictly by order from left to right.\n- **Keyword Arguments**: Passed explicitly by parameter name (`func(rate=0.08, balance=1000)`), allowing arguments to be passed in any order.\n- **Default Parameters**: Parameters with pre-assigned fallback values (`def f(x, threshold=50):`). If the caller omits that argument, the default value is used automatically.",
      codeExamples: [
        {
          id: "w1-ch7-ex2",
          title: "Statement 2: Positional, Keyword, and Default Parameters",
          description: "Configuring default thresholds and calling with positional vs keyword arguments.",
          code: `# Function with positional and default parameters\ndef calculate_threat_score(matched_count, weight_per_match=25, base_score=10):\n    """Calculates total risk score with configurable weights and base bias."""\n    total_score = base_score + (matched_count * weight_per_match)\n    return total_score\n\n# 1. Positional call (uses defaults for weight and base)\nscore_1 = calculate_threat_score(3)\nprint("Default call (3 matches)          :", score_1)  # 10 + (3 * 25) = 85\n\n# 2. Overriding default parameter positionally\nscore_2 = calculate_threat_score(3, 15)             # 10 + (3 * 15) = 55\nprint("Custom weight (3 matches @ 15pts) :", score_2)\n\n# 3. Explicit keyword call (order does not matter)\nscore_3 = calculate_threat_score(base_score=0, matched_count=2, weight_per_match=30)\nprint("Keyword call (custom base 0)      :", score_3)  # 0 + (2 * 30) = 60`,
          explanation:
            "Default parameters make functions flexible: callers can provide simple one-argument calls for standard cases, or override defaults for advanced scenarios.",
          stepByStepWalkthrough: [
            "Line 2: Defines matched_count (mandatory), weight_per_match (default 25), base_score (default 10).",
            "Line 8: Calls with only matched_count=3. Defaults 25 and 10 are applied automatically.",
            "Line 16: Calls using explicit keyword arguments; order can vary freely.",
          ],
          expectedOutput:
            "Default call (3 matches)          : 85\nCustom weight (3 matches @ 15pts) : 55\nKeyword call (custom base 0)      : 60",
          whyItHappens:
            "Python binds positional arguments first, then resolves keyword arguments by parameter dictionary lookup.",
          edgeCases:
            "• Non-default parameters after default parameters: Writing `def f(a=10, b):` is illegal and raises `SyntaxError: non-default argument 'b' follows default argument`. All mandatory parameters must appear BEFORE any default parameters.\n• Positional argument after keyword argument: Calling `f(a=1, 2)` raises `SyntaxError: positional argument follows keyword argument`.",
        },
      ],
    },
    {
      id: "w1-ch7-s3",
      title: "7.3 The Critical 'Mutable Default Argument Trap'",
      content:
        "This is the **single most notorious bug in Python programming**.\n\nIn Python, **default parameter values are evaluated once when the function is defined**, NOT every time the function is called!\n\nIf you use a **mutable object** (like a `list` or `dict`) as a default parameter:\n```python\n# DANGEROUS ANTI-PATTERN!\ndef add_indicator(word, indicator_list=[]):\n    indicator_list.append(word)\n    return indicator_list\n```\nThe same `indicator_list` is shared across EVERY call to `add_indicator()`! Calling `add_indicator('urgent')` followed by `add_indicator('free')` will append both into the same list!\n\n### The Senior Python Solution (None Sentinel):\nAlways use `None` as the default value for mutable parameters, and instantiate a new list inside the function body:\n```python\ndef add_indicator(word, indicator_list=None):\n    if indicator_list is None:\n        indicator_list = []  # Fresh list allocated every call!\n    indicator_list.append(word)\n    return indicator_list\n```",
      codeExamples: [
        {
          id: "w1-ch7-ex3",
          title: "Statement 3: Demonstrating and Fixing the Mutable Default Trap",
          description: "Contrasting the buggy shared mutable default against the Pythonic None sentinel pattern.",
          code: `# THE DANGEROUS TRAP (Shared state bug)\ndef buggy_collector(item, storage=[]):\n    storage.append(item)\n    return storage\n\nprint("Buggy call 1:", buggy_collector("A"))\nprint("Buggy call 2:", buggy_collector("B"))  # Unintentionally retains 'A'!\n\n# THE PYTHONIC FIX (None Sentinel Pattern)\ndef safe_collector(item, storage=None):\n    if storage is None:\n        storage = []  # Brand new list created in local scope!\n    storage.append(item)\n    return storage\n\nprint("\\nSafe call 1 :", safe_collector("A"))\nprint("Safe call 2 :", safe_collector("B"))  # Clean, independent list!`,
          explanation:
            "Because Python functions are objects created at import time, default values are bound to function attributes once. Using None guarantees local instantiation.",
          stepByStepWalkthrough: [
            "Line 2: buggy_collector binds storage=[] at definition time.",
            "Line 6: Appends 'A' -> ['A'].",
            "Line 7: Reuses the SAME storage list and appends 'B' -> ['A', 'B']!",
            "Line 11: safe_collector uses storage=None.",
            "Lines 18-19: Each call allocates a fresh, independent list.",
          ],
          expectedOutput:
            "Buggy call 1: ['A']\nBuggy call 2: ['A', 'B']\n\nSafe call 1 : ['A']\nSafe call 2 : ['B']",
          whyItHappens:
            "Default parameters are stored on the function object's __defaults__ tuple, which is mutable if containing a list.",
          edgeCases:
            "• This applies to ALL mutable types: lists `[]`, dictionaries `{}`, and sets `set()`. Never use any mutable object as a default parameter value in Python.",
        },
      ],
    },
    {
      id: "w1-ch7-s4",
      title: "7.4 The return Statement: Outputs vs Printing",
      content:
        "Beginners often confuse `print()` with `return`:\n- **`print()`** is a side-effect: it displays text on the terminal screen for human eyes. It produces no data that other code can use.\n- **`return`** sends computational data **back to the caller** so it can be stored in a variable, passed to another function, or used in mathematical formulas.\n\n### Multiple Return Values (Tuple Unpacking):\nPython natively supports returning multiple values in a single `return` statement: `return min_val, max_val, avg`. Under the hood, Python packs them into a tuple, which the caller can unpack directly:\n`low, high, mean = compute_stats(data)`.\n\n*If a function finishes without encountering an explicit `return`, it implicitly returns `None`.*",
      codeExamples: [
        {
          id: "w1-ch7-ex4",
          title: "Statement 4: Returning Multiple Values with Tuple Unpacking",
          description: "Returning and capturing summary metrics from a single function call.",
          code: `def analyze_score_stream(scores):\n    """Computes minimum, maximum, and average across a score sequence."""\n    if not scores:\n        return 0, 0, 0.0\n    \n    min_val = min(scores)\n    max_val = max(scores)\n    avg_val = sum(scores) / len(scores)\n    return min_val, max_val, avg_val  # Packed as a tuple\n\n# Unpacking the returned tuple into 3 distinct variables\nstream = [45, 88, 12, 94, 62, 77]\nlowest, highest, average = analyze_score_stream(stream)\n\nprint(f"Lowest Risk  : {lowest}")\nprint(f"Highest Risk : {highest}")\nprint(f"Average Risk : {average:.1f}")`,
          explanation:
            "return min_val, max_val, avg_val returns a 3-element tuple. The caller unpacks the values into lowest, highest, average.",
          stepByStepWalkthrough: [
            "Lines 6-8: Calculates min=12, max=94, average=63.0.",
            "Line 9: Returns (12, 94, 63.0).",
            "Line 13: Unpacks tuple into lowest=12, highest=94, average=63.0.",
          ],
          expectedOutput:
            "Lowest Risk  : 12\nHighest Risk : 94\nAverage Risk : 63.0",
          whyItHappens:
            "Python's tuple unpacking syntax allows clean multiple return values without needing custom container objects.",
          edgeCases:
            "• Unpacking Count Mismatch: If a function returns 3 values but you write `a, b = func()`, Python crashes with `ValueError: too many values to unpack (expected 2)`.\n• Accidental None: If you write a function with only `print(...)` and assign its result: `res = my_func()`, `res` is `None`! `print()` returns `None`.",
        },
      ],
    },
    {
      id: "w1-ch7-s5",
      title: "7.5 Variable Scope: The LEGB Rule & UnboundLocalError",
      content:
        "Variables defined inside a function live in that function's **Local Scope**. They are born when the function is called and destroyed when the function returns. They cannot be seen or accessed by the outside script.\n\n### The LEGB Lookup Hierarchy:\nWhen Python encounters a variable name, it searches 4 nested scopes in order:\n1. **L (Local)**: Inside the currently executing function.\n2. **E (Enclosing)**: Inside any enclosing functions (closures).\n3. **G (Global)**: At top-level module scope.\n4. **B (Built-in)**: Python's built-in namespace (`print`, `len`, `range`).",
      codeExamples: [
        {
          id: "w1-ch7-ex5",
          title: "Statement 5: Variable Scope and Function Pureness",
          description: "Understanding local isolation and avoiding global variable mutation.",
          code: `# Global variable\nGLOBAL_THRESHOLD = 70\n\ndef evaluate_risk(score):\n    # Local variable 'score' and 'is_elevated'\n    # Can READ GLOBAL_THRESHOLD, but cannot mutate it\n    is_elevated = score >= GLOBAL_THRESHOLD\n    return is_elevated\n\nprint("Score 85 elevated :", evaluate_risk(85))\nprint("Score 50 elevated :", evaluate_risk(50))\n\n# Demonstrating that local variables do not leak outside\n# print(is_elevated) -> NameError: name 'is_elevated' is not defined!`,
          explanation:
            "Functions can read global variables, but local variables remain private to the function's execution frame.",
          stepByStepWalkthrough: [
            "Line 2: Allocates GLOBAL_THRESHOLD = 70 at module scope.",
            "Lines 4-7: evaluate_risk reads GLOBAL_THRESHOLD, computes local boolean, returns it.",
            "Line 9: Prints True; Line 10: Prints False.",
          ],
          expectedOutput:
            "Score 85 elevated : True\nScore 50 elevated : False",
          whyItHappens:
            "Python creates an isolated local scope whenever a function is called, ensuring local variables do not leak or collide with outside code.",
          edgeCases:
            "• UnboundLocalError: If you assign to a variable anywhere inside a function (e.g. `count = count + 1`), Python classifies `count` as a LOCAL variable for the ENTIRE function! If you try to read it before that assignment, Python crashes with `UnboundLocalError: local variable 'count' referenced before assignment`.\n• Pure Functions: In AI and data science, prefer **pure functions** that accept inputs via parameters and return outputs via return, without reading or mutating global state.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch7-ex",
      title: "Exercise 7: Modular Temperature & Vitals Converter",
      difficulty: "basic",
      prompt:
        "Define a function fahrenheit_to_celsius(f_temp) that converts Fahrenheit to Celsius using formula: (f_temp - 32) * 5 / 9, and returns the float rounded to 1 decimal place. Call the function for 98.6 and print the result.",
      starterCode:
        '# Exercise 7: Modular Conversion Function\n# TODO: def fahrenheit_to_celsius(f_temp):\n# TODO: Return round((f_temp - 32) * 5 / 9, 1)\n# TODO: Call with 98.6 and print output:\n',
      testCases: [
        {
          id: "tc-7-1",
          description: "Converts 98.6 F to 37.0 C",
          expectedOutputSnippet: "37.0",
        },
      ],
      hints: [
        "Write def fahrenheit_to_celsius(f_temp):",
        "Inside: return round((f_temp - 32) * 5 / 9, 1)",
        "Call: print(fahrenheit_to_celsius(98.6))",
      ],
      solution:
        'def fahrenheit_to_celsius(f_temp):\n    return round((f_temp - 32) * 5 / 9, 1)\n\nprint(fahrenheit_to_celsius(98.6))',
      solutionExplanation:
        "(98.6 - 32) * 5 / 9 = 66.6 * 5 / 9 = 37.0. The function returns 37.0 cleanly.",
    },
  ],
  assignment: {
    id: "w1-ch7-assignment",
    title: "Modular Password Security & Entropy Validator Microservice",
    scenario:
      "A cybersecurity infrastructure module at the Center of Excellence requires a modular security microservice. You must architect 3 pure, reusable functions: one to clean and normalize credentials, one to evaluate password complexity and entropy rules, and one to generate a structured audit dictionary report.",
    requirements: [
      "Function 1: clean_credential(text: str) -> str: Strips whitespace and returns cleaned string.",
      "Function 2: check_password_complexity(password: str, min_length: int = 8, require_digit: bool = True) -> tuple[bool, int]:",
      "  - Calculates complexity score starting at 0.",
      "  - If len(password) >= min_length: +40 score.",
      "  - If any character in password is a digit (using char.isdigit()): +30 score.",
      "  - If any character is uppercase (using char.isupper()): +30 score.",
      "  - Returns a tuple: (is_valid: bool, score: int), where is_valid is True only if len >= min_length and (require_digit implies digit present).",
      "Function 3: audit_user_account(user_id: str, raw_pwd: str, min_length: int = 8) -> dict:",
      "  - Calls clean_credential(raw_pwd).",
      "  - Calls check_password_complexity(cleaned, min_length=min_length).",
      "  - Returns a dictionary: {'user': user_id, 'length': len(cleaned), 'score': score, 'status': 'PASS' if is_valid else 'FAIL'}.",
      "Test your functions by auditing user 'admin_01' with password 'CoE_Secure2026' and user 'guest_02' with password 'abc'. Print both audit reports.",
    ],
    edgeCasesToHandle: [
      "Avoid mutable default arguments: Only use immutable types (int, bool, str) as default values.",
      "Empty password string: len(pwd) == 0 should return score = 0, is_valid = False without crashing.",
      "Correct tuple unpacking inside audit_user_account.",
    ],
    starterCode: `# Chapter 7 Assignment: Modular Password Security Microservice
# Center of Excellence: Data Science & AI

# TODO: Function 1 - clean_credential(text)
# TODO: Function 2 - check_password_complexity(password, min_length=8, require_digit=True)
# TODO: Function 3 - audit_user_account(user_id, raw_pwd, min_length=8)

# Test runs:
# report_1 = audit_user_account("admin_01", "  CoE_Secure2026  ")
# report_2 = audit_user_account("guest_02", "abc")
# print(report_1)
# print(report_2)
`,
    testCases: [
      {
        id: "tc-a7-1",
        description: "Evaluates passing credentials with score 100",
        expectedOutputSnippet: "'status': 'PASS'",
      },
      {
        id: "tc-a7-2",
        description: "Evaluates failing short credentials with status FAIL",
        expectedOutputSnippet: "'status': 'FAIL'",
      },
      {
        id: "tc-a7-3",
        description: "Cleans trailing whitespace correctly",
        expectedOutputSnippet: "'length': 14",
      },
    ],
    hints: [
      "To check for digits: has_digit = any(c.isdigit() for c in password) or loop through characters: for c in password: if c.isdigit(): has_digit = True.",
      "In check_password_complexity, return is_valid, score.",
      "In audit_user_account, unpack: is_valid, score = check_password_complexity(cleaned, min_length=min_length).",
    ],
    referenceSolution: `# Chapter 7 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

def clean_credential(text: str) -> str:
    """Strips leading and trailing whitespace."""
    return text.strip()


def check_password_complexity(password: str, min_length: int = 8, require_digit: bool = True):
    """Evaluates password length, digits, and uppercase variety."""
    score = 0
    length_ok = len(password) >= min_length
    if length_ok:
        score += 40
        
    has_digit = False
    has_upper = False
    for char in password:
        if char.isdigit():
            has_digit = True
        if char.isupper():
            has_upper = True
            
    if has_digit:
        score += 30
    if has_upper:
        score += 30
        
    is_valid = length_ok and (has_digit if require_digit else True)
    return is_valid, score


def audit_user_account(user_id: str, raw_pwd: str, min_length: int = 8):
    """Orchestrates credential cleaning, auditing, and report generation."""
    cleaned_pwd = clean_credential(raw_pwd)
    is_valid, score = check_password_complexity(cleaned_pwd, min_length=min_length)
    
    return {
        "user": user_id,
        "length": len(cleaned_pwd),
        "score": score,
        "status": "PASS" if is_valid else "FAIL"
    }


print("=" * 50)
print("CREDENTIAL AUDIT MICROSERVICE RESULTS")
print("=" * 50)
report_1 = audit_user_account("admin_01", "  CoE_Secure2026  ")
report_2 = audit_user_account("guest_02", "abc")

print("Report 1:", report_1)
print("Report 2:", report_2)
print("=" * 50)`,
    solutionExplanation:
      "This solution demonstrates clean modular software architecture: clean_credential handles string formatting, check_password_complexity performs mathematical heuristic scoring, and audit_user_account composes them into a clean dictionary payload with zero global state mutation.",
  },
  recap: {
    keyConcepts: [
      "Functions encapsulate reusable logic using def and return; avoid repeating code across scripts.",
      "Positional arguments are mapped by order; keyword arguments are mapped by parameter name.",
      "Default parameters provide fallback values; non-default parameters must always precede default parameters.",
      "NEVER use mutable objects ([], {}) as default parameters; use the None sentinel pattern.",
      "return transmits data back to caller; functions without an explicit return implicitly return None.",
    ],
    essentialSyntax: [
      {
        syntax: "def func_name(param1, param2=default): ... return val",
        description: "Declaring a function with default parameters and return value.",
        example: 'def add(a, b=0): return a + b',
      },
      {
        syntax: "a, b = get_two_values()",
        description: "Unpacking multiple return values from a tuple.",
        example: 'low, high = min_max(scores)',
      },
      {
        syntax: "def f(items=None): if items is None: items = []",
        description: "Safe None sentinel pattern avoiding the mutable default trap.",
        example: 'def collect(x, storage=None): ...',
      },
    ],
    takeaways: [
      "Functions can read global variables, but local variables are private to their execution frame.",
      "Calling a function requires parentheses: func() executes; func refers to the object.",
      "Pure functions (same inputs -> same outputs, no side effects) are preferred in data science.",
    ],
    glossary: [
      {
        term: "Pure Function",
        definition: "A function that has no side effects (does not mutate global state or modify external data) and always returns the same output for identical inputs.",
      },
      {
        term: "LEGB Rule",
        definition: "The scope resolution order used by Python: Local, Enclosing, Global, Built-in.",
      },
      {
        term: "Sentinel Value",
        definition: "A special value (frequently None in Python) used to indicate the absence of a parameter or condition.",
      },
      {
        term: "Tuple Unpacking",
        definition: "Assigning the elements of an iterable or returned tuple directly to multiple comma-separated variables in a single statement.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does `def append_to(element, target=[])` cause a shared state bug across function calls?",
        answer: "In Python, default parameters are evaluated once when the function definition is executed at module load time, not on each call. The empty list [] is created once and stored on the function object. Subsequent calls that omit the target argument append to that identical shared list.",
      },
      {
        question: "What is the difference between `print(x)` inside a function and `return x`?",
        answer: "print(x) is an I/O side effect that writes string text to the console screen for humans to see. It returns None. return x transmits the object value back into the calling expression, allowing other code to store, transform, and compute with that data.",
      },
      {
        question: "What causes an `UnboundLocalError: local variable referenced before assignment`?",
        answer: "If a variable is assigned to anywhere inside a function body (even on a line below the read), Python classifies that variable as local to the entire function. Attempting to read it before the assignment line causes Python to look in local scope, find it uninitialized, and raise UnboundLocalError.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa7-1",
      type: "multiple-choice",
      prompt: "What is the return value of a function that does not contain an explicit 'return' statement?",
      options: [
        "0",
        "False",
        "None",
        "Empty string ''",
      ],
      correctAnswer: 2,
      explanation: "In Python, functions without an explicit return statement implicitly return the singleton object None.",
    },
    {
      id: "sa7-2",
      type: "multiple-choice",
      prompt: "How should a function with a default list parameter be defined safely?",
      options: [
        "def func(items=[]):",
        "def func(items=list()):",
        "def func(items=None): if items is None: items = []",
        "def func(items=()):",
      ],
      correctAnswer: 2,
      explanation: "Using items=None as a sentinel and creating a new list inside the body prevents the mutable default argument trap.",
    },
    {
      id: "sa7-3",
      type: "multiple-choice",
      prompt: "In Python's LEGB scope lookup, what does the 'E' stand for?",
      options: [
        "External",
        "Enclosing",
        "Exported",
        "Executed",
      ],
      correctAnswer: 1,
      explanation: "LEGB stands for: Local, Enclosing (nested functions / closures), Global (module scope), and Built-in.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 7: Functions & Code Organisation",
    timingMinutes: 20,
    teachingGoal: "Decompose code into modular units and eliminate mutable default bugs.",
    commonMisconceptions: [
      "Confusing print() with return.",
      "Falling into the mutable default argument trap (def f(x=[])).",
      "Assigning to global variables without understanding UnboundLocalError.",
    ],
    discussionPrompts: [
      "How do pure functions enable parallel computation and automated unit testing?",
      "Why is type hinting (PEP 484) widely adopted in enterprise Python codebases?",
    ],
    liveCodingCheckpoints: [
      "Demonstrate the mutable default argument bug live and fix it with None.",
      "Showcase tuple unpacking with multiple return values.",
    ],
  },
};
