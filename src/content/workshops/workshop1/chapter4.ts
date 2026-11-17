import { Chapter } from "@/types/curriculum";

export const chapter4: Chapter = {
  id: "w1-ch4",
  slug: "conditional-logic",
  number: 4,
  title: "Conditional Logic and Decision Making",
  estimatedMinutes: 20,
  introduction:
    "Intelligent computer systems must make decisions: should this transaction be flagged as fraud? Does an email contain phishing characteristics? Should a self-driving vehicle apply the brakes? In this chapter, you will master Python's conditional logic: boolean truth values, comparison and identity operators, logical operators with short-circuit evaluation, the if-elif-else decision tree, and clean Pythonic guard clauses.",
  learningObjectives: [
    "Construct boolean expressions using comparison operators (==, !=, <, <=, >, >=) and understand identity (is vs ==)",
    "Combine complex conditions using logical operators (and, or, not) adhering to strict operator precedence",
    "Evaluate truthiness and falsiness across Python types and avoid common truth-value traps",
    "Architect structured decision trees using if, elif, and else statements with mandatory 4-space indentation",
    "Implement concise inline conditional assignments using ternary expressions (a if cond else b)",
    "Diagnose and avoid critical edge cases: short-circuit return values, chained comparison evaluation, and float comparison inaccuracies",
  ],
  sections: [
    {
      id: "w1-ch4-s1",
      title: "4.1 Comparison Operators & Value Equality vs Identity",
      content:
        "At the core of branching logic is the **comparison operator**, which evaluates two expressions and returns a boolean `True` or `False`.\n\n### Comparison Operators:\n| Operator | Meaning | Example | Result |\n| :--- | :--- | :--- | :--- |\n| `==` | Value Equality | `10 == 10` | `True` |\n| `!=` | Not Equal | `10 != 5` | `True` |\n| `<` | Less Than | `5 < 10` | `True` |\n| `<=` | Less Than or Equal | `10 <= 10` | `True` |\n| `>` | Greater Than | `15 > 20` | `False` |\n| `>=` | Greater Than or Equal | `20 >= 18` | `True` |\n\n### Equality (`==`) vs Identity (`is`):\n- `==` checks **value equality**: Do the two objects contain the same data?\n- `is` checks **object identity**: Do the two variables point to the **exact same memory address**?\n*Rule of thumb: Always use `==` for comparing numbers and strings; always use `is` when comparing against `None` (`if val is None:`).*",
      codeExamples: [
        {
          id: "w1-ch4-ex1",
          title: "Statement 1: Equality, Comparisons & Identity Checks",
          description: "Evaluating value equality, inequalities, and None identity checks.",
          code: `threat_score = 75\nTHRESHOLD = 70\n\n# Standard numeric comparisons\nprint("Score exceeds threshold (>)  :", threat_score > THRESHOLD)\nprint("Score at least threshold (>=) :", threat_score >= THRESHOLD)\nprint("Exact match (==)              :", threat_score == 75)\nprint("Mismatch (!=)                 :", threat_score != 50)\n\n# Identity check for None\nquarantine_reason = None\nprint("Reason is None (is)           :", quarantine_reason is None)\n\n# Chained comparison (Idiomatic Python!)\nage = 25\nprint("Age in range (18 <= age < 65) :", 18 <= age < 65)`,
          explanation:
            "Comparisons evaluate to boolean True or False. Python supports mathematical chained comparisons like 18 <= age < 65 without duplicating variables.",
          stepByStepWalkthrough: [
            "Line 5: 75 > 70 evaluates to True.",
            "Line 8: 75 != 50 evaluates to True.",
            "Line 12: quarantine_reason is None checks if the variable points to the NoneType singleton -> True.",
            "Line 16: Evaluates (18 <= 25) and (25 < 65) simultaneously -> True.",
          ],
          expectedOutput:
            "Score exceeds threshold (>)  : True\nScore at least threshold (>=) : True\nExact match (==)              : True\nMismatch (!=)                 : True\nReason is None (is)           : True\nAge in range (18 <= age < 65) : True",
          whyItHappens:
            "Python translates chained comparisons into short-circuited conjunctions.",
          edgeCases:
            "• Single '=' vs Double '==': Writing `if score = 75:` raises a `SyntaxError: invalid syntax. Maybe you meant '==' or ':='?`. Python prevents the classic C bug where accidental assignment evaluates as true.\n• Float comparisons: Never write `0.1 + 0.2 == 0.3` because it evaluates to `False` due to binary floating-point representation! Instead write: `abs((0.1 + 0.2) - 0.3) < 1e-9` or `math.isclose()`.",
        },
      ],
    },
    {
      id: "w1-ch4-s2",
      title: "4.2 Logical Operators & Short-Circuit Evaluation",
      content:
        "Complex decisions require combining multiple conditions using **logical operators**:\n- **`and`**: Returns True only if **both** operands are truthy.\n- **`or`**: Returns True if **at least one** operand is truthy.\n- **`not`**: Unary operator that inverts the boolean state (`not True` -> `False`).\n\n### Operator Precedence:\n1. Comparison operators (`==`, `<`, etc.)\n2. `not`\n3. `and`\n4. `or`\n\n### The Mechanics of Short-Circuit Evaluation:\nPython uses lazy evaluation:\n- In `A and B`: If `A` is False, Python **never evaluates `B`** (because the outcome is guaranteed to be False).\n- In `A or B`: If `A` is True, Python **never evaluates `B`** (because the outcome is guaranteed to be True).\nThis is crucial for preventing runtime crashes (e.g. checking length before indexing).",
      codeExamples: [
        {
          id: "w1-ch4-ex2",
          title: "Statement 2: Logical Operators and Short-Circuit Protection",
          description: "Combining criteria and using short-circuiting to prevent ZeroDivisionError.",
          code: `has_attachment = True\nrisk_rating = 85\nis_whitelisted = False\n\n# Combining conditions with 'and', 'or', 'not'\nshould_quarantine = (has_attachment and risk_rating > 80) and not is_whitelisted\nprint("Should quarantine :", should_quarantine)\n\n# Short-circuit division protection\ntotal_samples = 0\n# Notice: If total_samples > 0 is False, the second division NEVER executes!\nsafe_division = total_samples > 0 and (100 / total_samples > 5)\nprint("Safe division ran without crash:", safe_division)`,
          explanation:
            "The short-circuit guarantee ensures that if total_samples > 0 evaluates to False, Python immediately stops and avoids executing 100 / 0.",
          stepByStepWalkthrough: [
            "Line 6: (True and True) evaluates to True. not False is True. True and True evaluates to True.",
            "Line 11: total_samples is 0. 0 > 0 evaluates to False. Because the operator is 'and', the second operand (100 / 0) is discarded.",
            "Line 12: Outputs False safely without raising a ZeroDivisionError.",
          ],
          expectedOutput:
            "Should quarantine : True\nSafe division ran without crash: False",
          whyItHappens:
            "Short-circuit evaluation is built directly into Python's bytecode compiler (JUMP_IF_FALSE_OR_POP opcodes).",
          edgeCases:
            "• 'and' and 'or' Return the Actual Operand: In Python, `x or y` does not strictly return a boolean! It returns the first truthy operand, or the last operand if all are falsy. E.g.: `'' or 'default_user'` returns `'default_user'`! `0 or 42` returns `42`.\n• Operator Precedence Ambiguity: `False and False or True` evaluates to `True` because `and` binds before `or`! Always use explicit parentheses `()` for clarity in production code.",
        },
      ],
    },
    {
      id: "w1-ch4-s3",
      title: "4.3 Truth Value Testing (Truthiness & Falsiness)",
      content:
        "In Python, **any object can be tested for truth value** inside an `if` statement.\n\n### The Falsy Values in Python:\nEvery object in Python is considered **Truthy** EXCEPT the following, which evaluate to **False**:\n- Constants: `None`, `False`\n- Numeric zeros: `0`, `0.0`, `0j`\n- Empty sequences and collections: `\"\"` (empty str), `[]` (empty list), `()` (empty tuple), `{}` (empty dict), `set()`\n\n### The Idiomatic Python Style (PEP 8):\nInstead of writing `if len(email_text) > 0:`, write `if email_text:`. If the string is non-empty, it is truthy; if empty, it is falsy.",
      codeExamples: [
        {
          id: "w1-ch4-ex3",
          title: "Statement 3: Truthy & Falsy Value Testing",
          description: "Testing presence of strings, numbers, and collections without explicit length checks.",
          code: `user_input = ""       # Empty string (falsy)\nsuspicious_count = 0  # Zero (falsy)\nsender_domain = "corp.org" # Non-empty (truthy)\n\n# Idiomatic truthiness testing\nif not user_input:\n    print("1. user_input is empty (falsy)")\n\nif not suspicious_count:\n    print("2. suspicious_count is zero (falsy)")\n\nif sender_domain:\n    print("3. sender_domain is present (truthy)")`,
          explanation:
            "Python evaluates the boolean truth value of objects implicitly during conditional branches.",
          stepByStepWalkthrough: [
            "Line 6: user_input is '', which is falsy. not '' evaluates to True.",
            "Line 9: suspicious_count is 0, which is falsy. not 0 evaluates to True.",
            "Line 12: sender_domain is 'corp.org', which has length > 0, so it is truthy.",
          ],
          expectedOutput:
            "1. user_input is empty (falsy)\n2. suspicious_count is zero (falsy)\n3. sender_domain is present (truthy)",
          whyItHappens:
            "Python calls an object's internal __bool__() or __len__() method to resolve truthiness.",
          edgeCases:
            "• Testing 'if x is not None:' vs 'if x:': If x = 0, 'if x:' is False because 0 is falsy! If 0 is a valid numerical score you want to process, you must explicitly test: `if score is not None:`.\n• The string '0': A string containing '0' (`'0'`) has length 1 and is TRUTHY! Only the empty string `''` is falsy.",
        },
      ],
    },
    {
      id: "w1-ch4-s4",
      title: "4.4 The if, elif, and else Decision Ladder",
      content:
        "The `if-elif-else` statement is Python's mechanism for multi-branch decision making.\n\n### Execution Flow:\n1. Python checks the first `if condition:`.\n2. If True, it executes that block and **skips all remaining elif and else blocks**.\n3. If False, it proceeds down to the next `elif condition:` in sequential order.\n4. If none of the conditions evaluate to True, the final `else:` block executes as a fallback.\n\n### Indentation Syntax:\nPython does not use `{}` braces. Every code block is defined strictly by **4 spaces of indentation**. Consistent indentation is enforced by the compiler.",
      codeExamples: [
        {
          id: "w1-ch4-ex4",
          title: "Statement 4: Multi-Branch Classification with if-elif-else",
          description: "Classifying threat levels based on continuous risk scores.",
          code: `risk_score = 68\n\nif risk_score >= 80:\n    verdict = "CRITICAL THREAT"\n    action = "Immediate Quarantine & Admin Alert"\nelif risk_score >= 60:\n    verdict = "SUSPICIOUS"\n    action = "Move to Junk & Append Warning Tag"\nelif risk_score >= 30:\n    verdict = "LOW RISK"\n    action = "Deliver with Standard Filter"\nelse:\n    verdict = "CLEAN"\n    action = "Direct Inbox Delivery"\n\nprint("Risk Score :", risk_score)\nprint("Verdict    :", verdict)\nprint("Action     :", action)`,
          explanation:
            "The interpreter evaluates conditions from top to bottom and halts at the first branch that evaluates to True.",
          stepByStepWalkthrough: [
            "Line 3: 68 >= 80 is False -> passes to line 6.",
            "Line 6: 68 >= 60 is True -> executes lines 7 and 8.",
            "Lines 9-14: Skipped entirely due to mutual exclusivity.",
            "Lines 15-17: Outputs the determined verdict and action.",
          ],
          expectedOutput:
            "Risk Score : 68\nVerdict    : SUSPICIOUS\nAction     : Move to Junk & Append Warning Tag",
          whyItHappens:
            "The elif ladder guarantees mutual exclusivity: exactly one block executes.",
          edgeCases:
            "• Ordering conditions incorrectly: If you test `elif risk_score >= 30:` before `elif risk_score >= 80:`, a score of 95 would trigger the >= 30 branch and stop! Always order continuous threshold ladders from most restrictive to least restrictive (or vice versa).\n• Using consecutive 'if' statements: Replacing 'elif' with 'if' means every condition is tested independently, which can overwrite variables multiple times.",
        },
      ],
    },
    {
      id: "w1-ch4-s5",
      title: "4.5 Nested Conditionals & Ternary Expressions",
      content:
        "When decisions depend on hierarchical sub-conditions, conditional statements can be nested.\n\nIn addition, Python provides a compact **Ternary Operator (Conditional Expression)** for assigning values in a single line:\n`variable = value_if_true if condition else value_if_false`\n\nThis is widely used in data transformation and feature engineering.",
      codeExamples: [
        {
          id: "w1-ch4-ex5",
          title: "Statement 5: Ternary Expression & Nested Validation",
          description: "One-line conditional assignment and hierarchical logic.",
          code: `risk_score = 75\nuser_tier = "VIP"\n\n# One-line ternary conditional expression\nfilter_mode = "AGGRESSIVE" if risk_score > 70 else "STANDARD"\nprint("Filter Mode :", filter_mode)\n\n# Nested condition logic\nif risk_score > 70:\n    if user_tier == "VIP":\n        disposition = "Escalate to Human Analyst"\n    else:\n        disposition = "Automated Quarantine"\nelse:\n    disposition = "Normal Delivery"\n\nprint("Disposition :", disposition)`,
          explanation:
            "The ternary expression assigns 'AGGRESSIVE' if risk_score > 70 is True, otherwise 'STANDARD'. Nested ifs handle specialized sub-rules.",
          stepByStepWalkthrough: [
            "Line 5: Evaluates risk_score > 70 (True), assigning 'AGGRESSIVE'.",
            "Line 9: Outer condition risk_score > 70 is True -> enters inner block.",
            "Line 10: user_tier == 'VIP' is True -> assigns 'Escalate to Human Analyst'.",
            "Line 16: Outputs final routing decision.",
          ],
          expectedOutput:
            "Filter Mode : AGGRESSIVE\nDisposition : Escalate to Human Analyst",
          whyItHappens:
            "Ternary expressions return values directly and can be used inside print() calls or function arguments.",
          edgeCases:
            "• Deep nesting anti-pattern: Nesting conditionals more than 3 levels deep creates the 'arrow anti-pattern' which makes code unreadable. Refactor deep nesting using early return statements or combined boolean logic.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch4-ex",
      title: "Exercise 4: Security Threat Level Classifier",
      difficulty: "basic",
      prompt:
        "Modify the starter code to assign 'HIGH' if threat_count >= 3, 'MEDIUM' if threat_count is 1 or 2, and 'SAFE' if threat_count is 0. Print the assigned status.",
      starterCode:
        '# Exercise 4: Threat Level Classifier\nthreat_count = 2\n\n# TODO: Write if-elif-else ladder\n# TODO: Print the final status:\n',
      testCases: [
        {
          id: "tc-4-1",
          description: "Assigns MEDIUM when threat_count is 2",
          expectedOutputSnippet: "MEDIUM",
        },
      ],
      hints: [
        "Use if threat_count >= 3: status = 'HIGH'.",
        "Use elif threat_count >= 1: status = 'MEDIUM'.",
        "Use else: status = 'SAFE'.",
      ],
      solution:
        'threat_count = 2\nif threat_count >= 3:\n    status = "HIGH"\nelif threat_count >= 1:\n    status = "MEDIUM"\nelse:\n    status = "SAFE"\nprint(status)',
      solutionExplanation:
        "threat_count is 2. The first condition 2 >= 3 is False. The second condition 2 >= 1 is True, setting status to 'MEDIUM'.",
    },
  ],
  assignment: {
    id: "w1-ch4-assignment",
    title: "Automated Financial Loan & Risk Underwriting Engine",
    scenario:
      "A fintech digital banking platform at the Center of Excellence requires an automated credit evaluation module. The engine must ingest an applicant's credit score, annual salary, debt-to-income (DTI) percentage, and previous bankruptcy count, evaluate multi-tier underwriting policies, apply automatic disqualifiers, and generate a final credit verdict.",
    requirements: [
      "Define applicant metrics: credit_score = 710, annual_salary = 65000, dti_ratio = 32.5, bankruptcies = 0.",
      "Disqualification Rule: If bankruptcies > 0, verdict must immediately be 'REJECTED: ADVERSE BANKRUPTCY RECORD' regardless of credit score.",
      "Multi-tier Approval Rules (when bankruptcies == 0):",
      "  - Prime Approval: credit_score >= 750 AND dti_ratio <= 35.0 -> 'APPROVED: PRIME TIER'",
      "  - Standard Approval: credit_score >= 680 AND dti_ratio <= 40.0 AND annual_salary >= 45000 -> 'APPROVED: STANDARD TIER'",
      "  - Conditional Approval: credit_score >= 620 AND annual_salary >= 60000 -> 'APPROVED: CONDITIONAL REVIEW'",
      "  - Rejection: Otherwise -> 'REJECTED: RISK PROFILE EXCEEDED'",
      "Use a ternary expression to compute interest_rate: 4.5 if verdict starts with 'APPROVED: PRIME' else 6.8.",
      "Print a formatted Underwriting Summary displaying credit score, DTI, decision verdict, and interest rate.",
    ],
    edgeCasesToHandle: [
      "Bankruptcy short-circuit: The bankruptcy disqualifier must be tested first before numerical threshold ladders.",
      "Boundary condition: credit_score exactly 680 and DTI exactly 40.0 must qualify for standard approval (use >= and <=).",
      "Ensure float percentages are evaluated accurately.",
    ],
    starterCode: `# Chapter 4 Assignment: Automated Financial Risk Underwriting Engine
# Center of Excellence: Data Science & AI

applicant_name = "Marcus Vance"
credit_score = 710
annual_salary = 65000
dti_ratio = 32.5
bankruptcies = 0

# TODO: Step 1 - Check if bankruptcies > 0 (Immediate Rejection)
# TODO: Step 2 - Evaluate Prime, Standard, Conditional, or Rejection
# TODO: Step 3 - Assign interest_rate using ternary operator
# TODO: Step 4 - Print Underwriting Decision Summary
`,
    testCases: [
      {
        id: "tc-a4-1",
        description: "Evaluates standard tier approval for Marcus Vance",
        expectedOutputSnippet: "APPROVED: STANDARD TIER",
      },
      {
        id: "tc-a4-2",
        description: "Assigns 6.8% interest rate for standard tier",
        expectedOutputSnippet: "6.8%",
      },
      {
        id: "tc-a4-3",
        description: "Outputs applicant name in report",
        expectedOutputSnippet: "Marcus Vance",
      },
    ],
    hints: [
      "Start with if bankruptcies > 0: verdict = 'REJECTED: ADVERSE BANKRUPTCY RECORD'.",
      "In the elif ladder, combine conditions with 'and': elif credit_score >= 750 and dti_ratio <= 35.0: ...",
      "Use a ternary expression: interest_rate = 4.5 if 'PRIME' in verdict else 6.8.",
    ],
    referenceSolution: `# Chapter 4 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

applicant_name = "Marcus Vance"
credit_score = 710
annual_salary = 65000
dti_ratio = 32.5
bankruptcies = 0

# 1. Underwriting Decision Ladder
if bankruptcies > 0:
    verdict = "REJECTED: ADVERSE BANKRUPTCY RECORD"
elif credit_score >= 750 and dti_ratio <= 35.0:
    verdict = "APPROVED: PRIME TIER"
elif credit_score >= 680 and dti_ratio <= 40.0 and annual_salary >= 45000:
    verdict = "APPROVED: STANDARD TIER"
elif credit_score >= 620 and annual_salary >= 60000:
    verdict = "APPROVED: CONDITIONAL REVIEW"
else:
    verdict = "REJECTED: RISK PROFILE EXCEEDED"

# 2. Interest rate assignment via ternary expression
interest_rate = 4.5 if "PRIME" in verdict else 6.8

# 3. Output decision summary
print("=" * 45)
print("FINANCIAL RISK UNDERWRITING DECISION")
print("=" * 45)
print(f"Applicant Name  : {applicant_name}")
print(f"Credit Score    : {credit_score} | DTI Ratio: {dti_ratio:.1f}%")
print(f"Annual Salary   : \${annual_salary:,}")
print(f"Bankruptcies    : {bankruptcies}")
print("-" * 45)
print(f"Underwriting    : {verdict}")
print(f"Base Rate       : {interest_rate:.1f}%")
print("=" * 45)`,
    solutionExplanation:
      "This solution demonstrates defensive decision engineering: the severe disqualifier (bankruptcies > 0) is evaluated first, followed by a mutually exclusive elif ladder evaluating composite logical expressions with 'and'. The ternary expression concisely resolves the pricing rate.",
  },
  recap: {
    keyConcepts: [
      "Comparison operators (==, !=, <, <=, >, >=) evaluate expressions to boolean True or False.",
      "== checks value equality; 'is' checks object identity (same memory address). Always use 'is None'.",
      "Logical operators follow precedence: not > and > or. Use parentheses to enforce explicit evaluation order.",
      "Short-circuit evaluation stops evaluating logical operands as soon as the outcome is guaranteed.",
      "The if-elif-else ladder executes only the first matching branch in top-to-bottom sequence.",
    ],
    essentialSyntax: [
      {
        syntax: "if condition: ... elif other: ... else: ...",
        description: "Multi-branch decision control structure.",
        example: 'if x > 10: print("High") else: print("Low")',
      },
      {
        syntax: "cond_a and cond_b / cond_a or cond_b",
        description: "Logical conjunction and disjunction with short-circuit evaluation.",
        example: "if count > 0 and (total / count > 5): ...",
      },
      {
        syntax: "val = true_val if condition else false_val",
        description: "Ternary conditional expression for inline assignments.",
        example: 'status = "Active" if is_online else "Offline"',
      },
    ],
    takeaways: [
      "Never compare floating point values with exact '=='; use tolerance thresholds.",
      "0, '', [], {}, None, and False are falsy; all other values are truthy.",
      "In an elif ladder, order numeric ranges from strictest to loosest.",
    ],
    glossary: [
      {
        term: "Short-Circuit Evaluation",
        definition: "The semantic rule where the second argument in a boolean operation is executed or evaluated only if the first argument does not suffice to determine the value of the expression.",
      },
      {
        term: "Truthiness",
        definition: "The implicit boolean value of an object in a boolean context (such as an if condition).",
      },
      {
        term: "Ternary Operator",
        definition: "An inline conditional expression that evaluates to one of two values based on a boolean condition.",
      },
      {
        term: "Identity Operator",
        definition: "The 'is' operator that evaluates whether two variables point to the identical object in memory (checking id()).",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does `False and False or True` evaluate to `True` in Python?",
        answer: "Operator precedence dictates that 'and' binds tighter than 'or'. Thus, (False and False) evaluates to False first, and then (False or True) evaluates to True.",
      },
      {
        question: "What value is returned by the expression: `'' or 'Guest'` in Python?",
        answer: "It returns the string 'Guest'. In Python, the 'or' operator returns the first operand if it is truthy; otherwise it returns the second operand. Because '' is falsy, it returns 'Guest'.",
      },
      {
        question: "Why should you never write `if x == None:`?",
        answer: "None is a unique singleton object in Python memory. Idiomatic Python requires using the identity operator `if x is None:`. The '==' operator can be overridden by custom classes to return misleading results, whereas 'is' directly compares memory pointers.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa4-1",
      type: "multiple-choice",
      prompt: "What will be printed by: print('A' if 0 else 'B')?",
      options: [
        "'A'",
        "'B'",
        "0",
        "SyntaxError",
      ],
      correctAnswer: 1,
      explanation: "0 is a falsy value. Therefore, the ternary expression returns the false branch 'B'.",
    },
    {
      id: "sa4-2",
      type: "multiple-choice",
      prompt: "What does Python do when evaluating: False and (10 / 0 == 1)?",
      options: [
        "Raises a ZeroDivisionError",
        "Evaluates to False without error due to short-circuiting",
        "Raises a TypeError",
        "Evaluates to True",
      ],
      correctAnswer: 1,
      explanation: "Because the first operand of 'and' is False, Python short-circuits and never evaluates the second operand, avoiding the ZeroDivisionError.",
    },
    {
      id: "sa4-3",
      type: "multiple-choice",
      prompt: "Which of the following is TRUTHY in Python?",
      options: [
        "0.0",
        "''",
        "'0'",
        "None",
      ],
      correctAnswer: 2,
      explanation: "The string '0' has length 1. In Python, any non-empty string is truthy, regardless of the characters inside.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 4: Conditional Logic",
    timingMinutes: 20,
    teachingGoal: "Structure clean decision trees without syntax errors and master short-circuit evaluation.",
    commonMisconceptions: [
      "Using '=' instead of '==' in conditions.",
      "Misunderstanding that 'and' and 'or' return operand values rather than booleans.",
      "Chaining conditions with multiple 'if's rather than 'elif'.",
    ],
    discussionPrompts: [
      "How do heuristic decision trees form the baseline logic for machine learning classification models?",
      "Why is short-circuit evaluation critical for defensive programming against Null/None crashes?",
    ],
    liveCodingCheckpoints: [
      "Demonstrate 0.1 + 0.2 == 0.3 returning False and explain float precision.",
      "Construct a 3-tier elif threshold check live with the students.",
    ],
  },
};
