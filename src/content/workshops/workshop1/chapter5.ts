import { Chapter } from "@/types/curriculum";

export const chapter5: Chapter = {
  id: "w1-ch5",
  slug: "loops-and-repetition",
  number: 5,
  title: "Loops and Repetition",
  estimatedMinutes: 20,
  introduction:
    "Computers excel at executing repetitive computations millions of times with unflinching precision. Whether iterating through thousands of email records, calculating statistical sums across tabular datasets, or running simulated time steps, loops are essential. In this chapter, you will master Python's loop constructs: definite iteration with for-loops and the range() generator, condition-driven iteration with while-loops, loop control flow using break and continue, the unique loop-else construct, and the accumulator pattern.",
  learningObjectives: [
    "Execute definite iteration across sequences using for loops and the memory-efficient range() generator",
    "Implement indexed sequence iteration cleanly using the built-in enumerate() function",
    "Construct condition-driven while loops with safe state transitions to eliminate infinite loops",
    "Alter execution flow dynamically using break (early termination) and continue (step bypass)",
    "Utilize Python's unique loop-else construct to implement clean search and validation algorithms",
    "Identify and prevent critical edge cases: mutating sequences during iteration, off-by-one range bounds, and infinite loop traps",
  ],
  sections: [
    {
      id: "w1-ch5-s1",
      title: "5.1 The for Loop: Iterating Over Sequences",
      content:
        "Python's `for` loop is fundamentally an **iterator loop**. Unlike C or Java where a loop increments an index counter (`for (int i=0; i<n; i++)`), Python's `for` loop directly pulls items from any iterable sequence (string, list, tuple, range):\n\n```python\nfor item in sequence:\n    # execute block for each item\n```\n\nEach iteration assigns the next element in the sequence to the target variable `item` and executes the indented 4-space block.",
      codeExamples: [
        {
          id: "w1-ch5-ex1",
          title: "Statement 1: The for Loop and enumerate()",
          description: "Iterating through characters and using enumerate() to obtain index-element pairs.",
          code: `# Iterating directly over characters in a string\nkeyword = "SECURE"\nprint("Character sequence:")\nfor char in keyword:\n    print(" ->", char)\n\n# Using enumerate() to get zero-based index AND element simultaneously\nsample_indicators = ["urgent", "free", "verify", "prize"]\nprint("\\nIndexed indicators:")\nfor idx, indicator in enumerate(sample_indicators, start=1):\n    print(f"[{idx}] Indicator: '{indicator}'")`,
          explanation:
            "The for loop handles sequence traversal automatically. enumerate(sequence, start=1) generates clean pairs of (index, item) without needing manual counter variables.",
          stepByStepWalkthrough: [
            "Lines 4-5: Loops through each character of 'SECURE', printing each with a prefix.",
            "Line 9: enumerate() wraps the list, starting numbering at 1.",
            "Lines 10-11: Unpacks (1, 'urgent'), (2, 'free'), etc., and outputs formatted lines.",
          ],
          expectedOutput:
            "Character sequence:\n -> S\n -> E\n -> C\n -> U\n -> R\n -> E\n\nIndexed indicators:\n[1] Indicator: 'urgent'\n[2] Indicator: 'free'\n[3] Indicator: 'verify'\n[4] Indicator: 'prize'",
          whyItHappens:
            "Python objects implementing the __iter__() protocol yield elements sequentially until StopIteration is raised.",
          edgeCases:
            "• Modifying a list during iteration: Never append or remove elements from a list while iterating over it! Removing an element shifts subsequent items left, causing the loop to skip the next item entirely. If you must modify, iterate over a copy: `for item in my_list.copy():`.\n• Loop variable leakage: In Python, the loop variable (`char` or `indicator`) remains accessible in the outer scope even after the loop finishes! Be careful not to accidentally reuse variable names.",
        },
      ],
    },
    {
      id: "w1-ch5-s2",
      title: "5.2 The range() Generator: Numerical Sequences",
      content:
        "When you need to execute code a specific number of times, Python provides the built-in `range()` function.\n\n### Three Modes of range():\n1. **`range(stop)`**: Generates integers from `0` up to `stop - 1`. E.g., `range(5)` -> `0, 1, 2, 3, 4`.\n2. **`range(start, stop)`**: Generates integers from `start` up to `stop - 1`. E.g., `range(2, 6)` -> `2, 3, 4, 5`.\n3. **`range(start, stop, step)`**: Generates integers incrementing by `step`. E.g., `range(0, 10, 2)` -> `0, 2, 4, 6, 8`.\n\n*(Note: `range()` is lazy and memory efficient: it calculates numbers on the fly and takes $O(1)$ memory regardless of whether the range spans 10 or 10,000,000 numbers.)*",
      codeExamples: [
        {
          id: "w1-ch5-ex2",
          title: "Statement 2: Generating Ranges & Negative Step Countdowns",
          description: "Generating stepped sequences, ranges, and backwards countdown loops.",
          code: `# Standard range (0 to 4)\nprint("range(5) output:", list(range(5)))\n\n# Start, stop, step\nprint("Even numbers (2 to 10):", list(range(2, 11, 2)))\n\n# Countdown using negative step\nprint("Countdown:")\nfor count in range(5, 0, -1):\n    print(f" T-minus {count}...")\nprint(" BLASTOFF: Simulation Started!")`,
          explanation:
            "range(start, stop, step) generates integer sequences. A negative step allows clean backwards iteration.",
          stepByStepWalkthrough: [
            "Line 2: range(5) produces 0, 1, 2, 3, 4 (stop is exclusive).",
            "Line 5: range(2, 11, 2) produces 2, 4, 6, 8, 10.",
            "Line 9: range(5, 0, -1) counts down from 5 to 1 (stops before 0).",
          ],
          expectedOutput:
            "range(5) output: [0, 1, 2, 3, 4]\nEven numbers (2 to 10): [2, 4, 6, 8, 10]\nCountdown:\n T-minus 5...\n T-minus 4...\n T-minus 3...\n T-minus 2...\n T-minus 1...\n BLASTOFF: Simulation Started!",
          whyItHappens:
            "range() implements a sequence type calculating elements via arithmetic arithmetic progression.",
          edgeCases:
            "• Empty Ranges: If start >= stop with a positive step (e.g. range(5, 2)), Python returns an empty range without throwing an error! The loop simply executes 0 times.\n• Off-By-One Errors: To loop 10 times from 1 to 10 inclusive, you must write `range(1, 11)`. Writing `range(1, 10)` only runs through 9.",
        },
      ],
    },
    {
      id: "w1-ch5-s3",
      title: "5.3 The while Loop: Condition-Driven Repetition",
      content:
        "While a `for` loop executes across a known sequence, a `while` loop runs **indefinitely as long as a boolean condition remains True**.\n\n### The Three Components of a Correct while Loop:\n1. **Initialization**: Initialize state variables before the loop begins.\n2. **Evaluation**: The loop tests the condition before every iteration.\n3. **State Mutation**: The loop body **must update the state** so the condition eventually becomes False.\n\n*If the state variable is never updated, the loop runs forever, creating an **infinite loop** that hangs the program.*",
      codeExamples: [
        {
          id: "w1-ch5-ex3",
          title: "Statement 3: The while Loop with State Mutation",
          description: "Simulating exponential growth and queue processing.",
          code: `# Simulating exponential risk score accumulation\ncurrent_score = 5\nTHRESHOLD = 60\niteration = 1\n\nwhile current_score < THRESHOLD:\n    print(f"Cycle {iteration}: Score = {current_score}")\n    current_score = current_score * 2  # State update!\n    iteration += 1                     # Increment cycle counter\n\nprint(f"Target reached! Final score = {current_score} in {iteration - 1} cycles.")`,
          explanation:
            "The while loop evaluates current_score < THRESHOLD before each cycle and terminates as soon as current_score reaches or exceeds 60.",
          stepByStepWalkthrough: [
            "Cycle 1: score 5 < 60 (True) -> prints, multiplies score to 10, iteration=2.",
            "Cycle 2: score 10 < 60 (True) -> prints, multiplies to 20, iteration=3.",
            "Cycle 3: score 20 < 60 (True) -> prints, multiplies to 40, iteration=4.",
            "Cycle 4: score 40 < 60 (True) -> prints, multiplies to 80, iteration=5.",
            "Cycle 5: score 80 < 60 (False) -> loop terminates.",
            "Line 11: Emits final confirmation.",
          ],
          expectedOutput:
            "Cycle 1: Score = 5\nCycle 2: Score = 10\nCycle 3: Score = 20\nCycle 4: Score = 40\nTarget reached! Final score = 80 in 4 cycles.",
          whyItHappens:
            "The while loop tests the condition before entering the body. If initial condition is False, it executes 0 times.",
          edgeCases:
            "• Infinite Loops: Forgetting to update `current_score` leaves the score at 5 forever, creating an infinite loop. Always ensure the loop variable moves toward the termination condition on every cycle.\n• Halting Stuck Execution: If your code accidentally enters an infinite loop, click the 'Stop' button in the editor toolbar to halt execution immediately.",
        },
      ],
    },
    {
      id: "w1-ch5-s4",
      title: "5.4 Loop Controls: break, continue, and the Loop-else Construct",
      content:
        "Python provides granular controls to alter loop execution:\n- **`break`**: Immediately aborts and terminates the innermost loop, jumping to the statement following the loop.\n- **`continue`**: Immediately aborts the **current iteration**, skipping any remaining statements in the body, and jumps to the next iteration.\n\n### Python's Unique `for...else` / `while...else` Construct:\nAn `else` block attached to a loop executes **ONLY if the loop finished naturally without encountering a `break` statement**!\nThis elegant syntax eliminates the need for manual boolean flag variables like `found = False` when searching through sequences.",
      codeExamples: [
        {
          id: "w1-ch5-ex4",
          title: "Statement 4: Using break, continue, and Loop-else",
          description: "Filtering invalid records with continue and searching with break and loop-else.",
          code: `# 1. continue: Skipping benign messages\nmessage_scores = [12, 0, 85, 4, 92, -1, 45]\nprint("Flagging critical messages (> 75):")\nfor score in message_scores:\n    if score < 75:\n        continue  # Skip scores below threshold\n    print(f" [!] Alert triggered for risk score: {score}")\n\n# 2. break with for...else (Search Pattern)\nsuspicious_words = ["urgent", "wire", "compromise"]\nsample_email = ["meeting notes", "lunch order", "budget review"]\n\nprint("\\nScanning sample email:")\nfor word in sample_email:\n    if word in suspicious_words:\n        print(f" THREAT DETECTED: Found '{word}'!")\n        break\nelse:\n    # Executes ONLY if loop finished with NO break\n    print(" SCAN COMPLETE: No threats detected across sample.")`,
          explanation:
            "continue bypasses remainder of iteration. break aborts loop immediately. The loop-else block runs when no break occurred.",
          stepByStepWalkthrough: [
            "Lines 4-7: For each score below 75, continue skips print; prints alerts only for 85 and 92.",
            "Lines 15-20: Searches sample_email. No word is in suspicious_words.",
            "Line 21: Because break was never hit, the else block executes and confirms clean status.",
          ],
          expectedOutput:
            "Flagging critical messages (> 75):\n [!] Alert triggered for risk score: 85\n [!] Alert triggered for risk score: 92\n\nScanning sample email:\n SCAN COMPLETE: No threats detected across sample.",
          whyItHappens:
            "The loop-else syntax directly models algorithmic search: 'look for target; if not found anywhere, do fallback'.",
          edgeCases:
            "• break in Nested Loops: A `break` statement only terminates the innermost loop. The outer loop continues executing. If you need to exit multiple nested loops, wrap them in a function and use `return`.",
        },
      ],
    },
    {
      id: "w1-ch5-s5",
      title: "5.5 The Accumulator Pattern & Nested Loops",
      content:
        "In data analysis and AI, the **Accumulator Pattern** is the most widely applied algorithm pattern. You initialize an accumulator variable before a loop (e.g., `total = 0`, `count = 0`, `matches = []`), iterate over data, update the accumulator during each step, and inspect the aggregate value after the loop.\n\nWhen data has dimensions (like rows and columns in a spreadsheet or pixels in an image), **nested loops** (a loop inside a loop) are used.",
      codeExamples: [
        {
          id: "w1-ch5-ex5",
          title: "Statement 5: The Accumulator Pattern and Nested Loops",
          description: "Calculating statistical aggregates and scanning 2D email batches.",
          code: `# Accumulator: Summing and calculating average risk\nrisk_values = [45, 82, 12, 94, 65, 33]\ntotal_risk = 0\nthreat_count = 0\n\nfor val in risk_values:\n    total_risk += val  # Accumulate sum (total_risk = total_risk + val)\n    if val >= 70:\n        threat_count += 1\n\naverage_risk = total_risk / len(risk_values)\nprint(f"Total Risk Sum : {total_risk}")\nprint(f"Average Risk   : {average_risk:.2f}")\nprint(f"Threats (>=70) : {threat_count}")\n\n# Nested loop: scanning batch of emails against keyword list\ninbox = [\n    "Urgent password reset needed",\n    "Quarterly review meeting at 2pm",\n    "Claim your free prize now"\n]\nkeywords = ["urgent", "free", "prize"]\n\nprint("\\nNested Scan Results:")\nfor i, email in enumerate(inbox, start=1):\n    matches = []\n    for kw in keywords:\n        if kw in email.lower():\n            matches.append(kw)\n    print(f"Email {i}: {len(matches)} match(es) -> {matches}")`,
          explanation:
            "The outer loop iterates over emails; the inner loop tests every keyword against the current email. The accumulator resets for each email.",
          stepByStepWalkthrough: [
            "Lines 6-9: Accumulates total_risk to 331 and threat_count to 2.",
            "Line 11: Calculates mean risk 331 / 6 = 55.17.",
            "Lines 25-30: For each email, resets matches list and checks each keyword.",
          ],
          expectedOutput:
            "Total Risk Sum : 331\nAverage Risk   : 55.17\nThreats (>=70) : 2\n\nNested Scan Results:\nEmail 1: 1 match(es) -> ['urgent']\nEmail 2: 0 match(es) -> []\nEmail 3: 2 match(es) -> ['free', 'prize']",
          whyItHappens:
            "The inner loop runs to completion for every single step of the outer loop.",
          edgeCases:
            "• Resetting Accumulators in Wrong Scope: If you initialize `matches = []` outside the outer loop, matches would accumulate across all emails combined instead of resetting per message! Always place accumulator variables in the exact scope where their lifetime belongs.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch5-ex",
      title: "Exercise 5: Counting Threat Messages in a Stream",
      difficulty: "basic",
      prompt:
        "Modify the starter code to iterate through the scores list using a for loop, count how many scores exceed 70 using the accumulator pattern, and print the final count.",
      starterCode:
        '# Exercise 5: Accumulate Threat Count\nscores = [25, 88, 42, 95, 71, 14, 82]\nthreat_count = 0\n\n# TODO: Loop over scores, increment threat_count if score > 70\n# TODO: Print threat_count\n',
      testCases: [
        {
          id: "tc-5-1",
          description: "Calculates correct count of scores > 70 (4)",
          expectedOutputSnippet: "4",
        },
      ],
      hints: [
        "Use for s in scores: to iterate.",
        "Inside the loop: if s > 70: threat_count += 1.",
        "Print threat_count after the loop ends.",
      ],
      solution:
        'scores = [25, 88, 42, 95, 71, 14, 82]\nthreat_count = 0\nfor s in scores:\n    if s > 70:\n        threat_count += 1\nprint(threat_count)',
      solutionExplanation:
        "The scores 88, 95, 71, and 82 are strictly greater than 70, producing a final threat_count of 4.",
    },
  ],
  assignment: {
    id: "w1-ch5-assignment",
    title: "Financial Transaction Stream Anomaly & Fraud Detector",
    scenario:
      "A banking fraud monitoring service at the Center of Excellence streams sequential financial transactions for automated risk surveillance. You must build an anomaly detector that processes the stream sequentially, calculates running aggregates, flags outlier spikes, and aborts processing if a critical fraud sequence is detected.",
    requirements: [
      "Given transaction amounts: [150.0, 320.5, 45.0, 12500.0, 240.0, 2100.0, 2800.0, 3200.0, 85.0]",
      "Maintain accumulators for: total_volume, valid_transaction_count, and high_value_count.",
      "Outlier Rule: If any single transaction exceeds $10,000.0, print an alert '[ALERT] Single high-value transaction detected: $X', increment high_value_count, and use 'continue' to skip adding it to standard volume.",
      "Lockdown Rule: If 3 consecutive transactions each exceed $2,000.0, trigger an immediate fraud lockdown alert: '[CRITICAL LOCKDOWN] Consecutive spike threshold breached. Halting stream.', and terminate the loop immediately with 'break'.",
      "Use 'for...else' to print '[STATUS] Stream processing completed normally.' if no lockdown occurred.",
      "Print final summary statistics: Total Standard Volume, Valid Transaction Count, and High-Value Outlier Count.",
    ],
    edgeCasesToHandle: [
      "Consecutive counter reset: If a transaction does NOT exceed $2,000, the consecutive spike counter must be reset to 0!",
      "Break vs Else: Ensure the 'else' block does not execute if the loop is aborted via 'break'.",
      "Floating-point formatting: Format currency values to 2 decimal places with commas.",
    ],
    starterCode: `# Chapter 5 Assignment: Financial Transaction Stream Anomaly Detector
# Center of Excellence: Data Science & AI

transactions = [150.0, 320.5, 45.0, 12500.0, 240.0, 2100.0, 2800.0, 3200.0, 85.0]

total_volume = 0.0
valid_count = 0
high_value_count = 0
consecutive_spikes = 0

# TODO: Iterate through transactions
# TODO: Implement > 10000.0 check with continue
# TODO: Implement consecutive > 2000.0 check with break
# TODO: Accumulate volume and counts
# TODO: Use for...else block
# TODO: Print final summary statistics
`,
    testCases: [
      {
        id: "tc-a5-1",
        description: "Detects single high-value transaction ($12,500.00)",
        expectedOutputSnippet: "12,500.00",
      },
      {
        id: "tc-a5-2",
        description: "Triggers critical lockdown on 3rd consecutive spike",
        expectedOutputSnippet: "CRITICAL LOCKDOWN",
      },
      {
        id: "tc-a5-3",
        description: "Computes total standard volume up to lockdown",
        expectedOutputSnippet: "8,855.50",
      },
    ],
    hints: [
      "If amount > 10000.0: high_value_count += 1, print alert, and call continue.",
      "Track consecutive spikes: if amount > 2000.0: consecutive_spikes += 1 else: consecutive_spikes = 0.",
      "If consecutive_spikes == 3: print lockdown alert and break.",
    ],
    referenceSolution: `# Chapter 5 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

transactions = [150.0, 320.5, 45.0, 12500.0, 240.0, 2100.0, 2800.0, 3200.0, 85.0]

total_volume = 0.0
valid_count = 0
high_value_count = 0
consecutive_spikes = 0

print("=" * 45)
print("FINANCIAL TRANSACTION STREAM MONITOR")
print("=" * 45)

for i, tx in enumerate(transactions, start=1):
    # Rule 1: High value single outlier
    if tx > 10000.0:
        print(f"[ALERT] Tx #{i}: Single high-value outlier: \${tx:,.2f} (Skipping volume)")
        high_value_count += 1
        consecutive_spikes = 0  # reset consecutive spike tracker
        continue

    # Accumulate standard transaction
    total_volume += tx
    valid_count += 1

    # Rule 2: Consecutive spike detection (> $2000)
    if tx > 2000.0:
        consecutive_spikes += 1
        print(f"[WARN] Tx #{i}: Spike #{consecutive_spikes} detected: \${tx:,.2f}")
        if consecutive_spikes >= 3:
            print("[CRITICAL LOCKDOWN] Consecutive spike threshold breached. Halting stream.")
            break
    else:
        consecutive_spikes = 0
else:
    print("[STATUS] Stream processing completed normally without lockdown.")

print("-" * 45)
print(f"Total Standard Volume : \${total_volume:,.2f}")
print(f"Valid Transactions    : {valid_count}")
print(f"High-Value Outliers   : {high_value_count}")
print("=" * 45)`,
    solutionExplanation:
      "This solution demonstrates sophisticated stream monitoring: continue bypasses outlier accumulation without halting, the consecutive_spikes state tracker correctly resets upon any non-spike transaction, and break arrests the loop when the threshold hits 3, preventing subsequent transactions from running.",
  },
  recap: {
    keyConcepts: [
      "The for-loop iterates through sequences automatically; enumerate() provides index-value pairs.",
      "range(start, stop, step) generates memory-efficient numeric progressions without storing all numbers in RAM.",
      "The while loop evaluates a condition before each cycle; loop state variables must update monotonically.",
      "break terminates loop immediately; continue skips to the next cycle.",
      "The loop-else construct executes only if the loop terminates naturally without hitting a break.",
    ],
    essentialSyntax: [
      {
        syntax: "for item in sequence: ...",
        description: "Definite iteration through any iterable sequence.",
        example: 'for x in [1, 2, 3]: print(x)',
      },
      {
        syntax: "for idx, val in enumerate(items, start=0): ...",
        description: "Indexed sequence traversal.",
        example: 'for i, v in enumerate(["a", "b"]): print(i, v)',
      },
      {
        syntax: "while condition: ...",
        description: "Indefinite iteration continuing while condition is True.",
        example: "while score < 100: score += 10",
      },
      {
        syntax: "for x in items: ... else: ...",
        description: "Executes else block only if no break occurred.",
        example: "for x in data: if x == target: break else: print('Not found')",
      },
    ],
    takeaways: [
      "Never mutate a list (append or remove) while iterating directly over it.",
      "Off-by-one errors are common: range(1, 10) stops at 9.",
      "Reset accumulator variables inside the appropriate loop scope.",
    ],
    glossary: [
      {
        term: "Iterator",
        definition: "An object representing a stream of data that returns one element at a time via the __next__() protocol.",
      },
      {
        term: "Accumulator Pattern",
        definition: "A programming pattern where a variable is initialized outside a loop and updated incrementally across iterations.",
      },
      {
        term: "Short-Circuit Loop",
        definition: "Using the break statement to exit a loop early once an exit condition or search target is fulfilled.",
      },
      {
        term: "Loop-Else",
        definition: "A control structure unique to Python where an else clause executes if a loop completes without encountering a break statement.",
      },
    ],
    revisionQuestions: [
      {
        question: "When does the 'else' block attached to a for-loop execute in Python?",
        answer: "The 'else' block executes when the loop completes all iterations naturally. If the loop is terminated prematurely via a 'break' statement, the 'else' block is completely skipped.",
      },
      {
        question: "Why does `range(1000000)` take virtually zero memory in Python 3?",
        answer: "In Python 3, range() returns a lazy sequence object that computes elements on demand using start, stop, and step formulas. It does not allocate an array of one million integers in memory.",
      },
      {
        question: "What happens if you remove items from a list while iterating over it with `for item in my_list:`?",
        answer: "Removing an element shifts all subsequent elements to the left. The internal iterator pointer advances to the next index, causing it to skip the element immediately following the deleted item.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa5-1",
      type: "multiple-choice",
      prompt: "What will list(range(3, 12, 3)) produce?",
      options: [
        "[3, 6, 9, 12]",
        "[3, 6, 9]",
        "[0, 3, 6, 9]",
        "[3, 5, 7, 9, 11]",
      ],
      correctAnswer: 1,
      explanation: "Start is 3, step is 3, stop is 12 (exclusive). The generated sequence is 3, 6, 9 (12 is omitted).",
    },
    {
      id: "sa5-2",
      type: "multiple-choice",
      prompt: "What statement skips the remainder of the current iteration and jumps to the next cycle?",
      options: [
        "break",
        "skip",
        "continue",
        "pass",
      ],
      correctAnswer: 2,
      explanation: "'continue' terminates the current iteration and immediately begins the next cycle of the loop.",
    },
    {
      id: "sa5-3",
      type: "multiple-choice",
      prompt: "What is the final value of count in: count = 0; while count < 5: count += 2?",
      options: [
        "4",
        "5",
        "6",
        "Infinite loop",
      ],
      correctAnswer: 2,
      explanation: "Count progresses: 0 -> 2 -> 4 -> 6. At 6, 6 < 5 is False, so the loop terminates with count = 6.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 5: Loops and Repetition",
    timingMinutes: 20,
    teachingGoal: "Master iteration across ranges and collections, and prevent infinite while loops.",
    commonMisconceptions: [
      "Assuming range(1, 5) includes the number 5.",
      "Thinking break exits all enclosing loops in nested scenarios.",
      "Forgetting to increment loop state in while loops.",
    ],
    discussionPrompts: [
      "Why is Python's iterator protocol more powerful than standard index-based looping?",
      "How does the accumulator pattern generalize into map-reduce distributed data systems?",
    ],
    liveCodingCheckpoints: [
      "Demonstrate a while loop countdown and show what happens when the increment line is missing.",
      "Write a for...else search block live.",
    ],
  },
};
