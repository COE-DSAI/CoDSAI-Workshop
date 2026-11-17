import { Chapter } from "@/types/curriculum";

export const chapter8: Chapter = {
  id: "w1-ch8",
  slug: "capstone-inbox-guardian",
  number: 8,
  title: "Capstone Project: Build Inbox Guardian",
  estimatedMinutes: 35,
  introduction:
    "You have arrived at the flagship capstone milestone of Workshop 1. Rather than writing disconnected toy scripts, you will now synthesize all 7 chapters—variables, types, string methods, branching conditions, loops, structured collections, and modular functions—into an end-to-end command-line application: INBOX GUARDIAN. You will architect, implement, test, and debug a rule-based email threat scanner capable of parsing raw messages, extracting structural heuristics, computing weighted risk scores, and generating security quarantine verdicts.",
  learningObjectives: [
    "Synthesize all Workshop 1 competencies into a complete, modular, command-line Python application",
    "Implement an end-to-end heuristic pipeline: text normalization, keyword matching, structural anomaly detection, and classification",
    "Calculate structural threat heuristics including uppercase character density and exclamation mark frequency with zero-division safeguards",
    "Manage in-memory datasets using lists of dictionaries to log scan histories and generate executive summary statistics",
    "Differentiate deterministic rule-based heuristic engineering from future statistical machine learning classification models",
    "Handle critical production edge cases: zero-alphabetic strings, empty inboxes, and case-obfuscation attacks",
  ],
  sections: [
    {
      id: "w1-ch8-s1",
      title: "8.1 System Architecture: The Heuristic Rule-Based Pipeline",
      content:
        "Before machine learning models (like Naive Bayes, Random Forests, or Transformers) were invented, cybersecurity systems relied entirely on **deterministic, rule-based heuristic engines**.\n\n### The Inbox Guardian Pipeline:\n1. **Ingestion & Sanitization**: Raw email messages are stripped of extraneous whitespace and normalized to lowercase.\n2. **Keyword Threat Scoring**: The text is scanned against dictionaries of known phishing, credential-harvesting, and financial-lure keywords.\n3. **Structural Heuristic Analysis**: The engine computes structural anomalies: uppercase character density (spammers frequently SHOUT) and excessive punctuation.\n4. **Risk Aggregation**: All feature scores are aggregated into a composite risk score (0 to 100).\n5. **Classification**: Threshold logic categorizes the message into **CLEAN**, **SUSPICIOUS**, or **QUARANTINE**.\n6. **Batch Auditing & Reporting**: In-memory historical logs accumulate threat statistics.",
      callout: {
        type: "note",
        title: "The Pedagogical Boundary: Why Heuristics Precede Machine Learning",
        content:
          "Inbox Guardian is deliberately built as a **purely rule-based Python application**. Understanding explicit heuristic decision boundaries teaches you the exact features that machine learning models learn to extract automatically in subsequent workshops.",
      },
    },
    {
      id: "w1-ch8-s2",
      title: "8.2 Module 1 & 2: Text Normalization & Keyword Matching",
      content:
        "Attackers frequently obfuscate keywords using erratic casing (e.g. `uRgEnT` or `F-R-E-E`).\n\nThe first stage of the engine normalizes incoming strings using `.strip()` and `.lower()`, and scans across a dictionary of threat terms.\n\n```python\ndef scan_keywords(text, keyword_weights):\n    score = 0\n    matched = []\n    cleaned = text.lower()\n    for kw, weight in keyword_weights.items():\n        if kw in cleaned:\n            matched.append(kw)\n            score += weight\n    return score, matched\n```",
      codeExamples: [
        {
          id: "w1-ch8-ex1",
          title: "Module 1 & 2: Keyword Heuristics Engine",
          description: "Scanning normalized text against weighted threat categories.",
          code: `def scan_keywords(text, keyword_weights):\n    """Scans text for keywords and returns accumulated weight and matched terms."""\n    cleaned = text.strip().lower()\n    score = 0\n    matched = []\n    \n    for keyword, weight in keyword_weights.items():\n        if keyword in cleaned:\n            matched.append(keyword)\n            score += weight\n            \n    return score, matched\n\n# Threat dictionary with weighted risks\nRULES = {\n    "urgent": 25,\n    "verify account": 30,\n    "free prize": 35,\n    "wire transfer": 40,\n    "password expired": 25\n}\n\nsample = "  URGENT: Please verify account access to claim prize!  "\npts, terms = scan_keywords(sample, RULES)\nprint("Detected Terms :", terms)\nprint("Keyword Points :", pts)`,
          explanation:
            "Case-folding converts text to lowercase. The for loop iterates through RULES.items() and tests membership with 'in'.",
          stepByStepWalkthrough: [
            "Line 3: Strips and converts sample to lowercase.",
            "Lines 7-10: Checks each keyword; finds 'urgent' (+25) and 'verify account' (+30).",
            "Line 12: Returns accumulated score 55 and list of matched terms.",
          ],
          expectedOutput:
            "Detected Terms : ['urgent', 'verify account']\nKeyword Points : 55",
          whyItHappens:
            "The 'in' operator tests substring presence in O(n) time.",
          edgeCases:
            "• Substring collision: 'free' would match 'freeze'. In production regex or token matching, word boundaries are checked. For our foundations workshop, phrase matching handles multi-word triggers like 'verify account'.",
        },
      ],
    },
    {
      id: "w1-ch8-s3",
      title: "8.3 Module 3 & 4: Structural Anomaly Detection & Risk Classification",
      content:
        "Phishing emails frequently exhibit distinct structural anomalies:\n1. **Excessive Uppercase Ratio**: Spammers use caps to convey artificial urgency (`CLAIM YOUR REWARD NOW`).\n2. **Exclamation Density**: Overuse of exclamation marks (`!!!`).\n\n### The Uppercase Ratio Formula with Zero-Division Guard:\n$$\\text{Uppercase Ratio} = \\frac{\\text{Count of Uppercase Letters}}{\\text{Total Alphabetic Letters}}$$\n*Critical Guard: If an email consists entirely of numbers or punctuation (`123456 !!!`), total alphabetic letters is 0! Dividing by zero will crash the application with a `ZeroDivisionError`. You MUST check `if total_letters > 0:` first!*",
      codeExamples: [
        {
          id: "w1-ch8-ex2",
          title: "Module 3 & 4: Structural Heuristics with Zero-Division Protection",
          description: "Calculating uppercase ratio and exclamation density safely.",
          code: `def calculate_structural_risk(text):\n    """Calculates structural risk points based on caps ratio and exclamation marks."""\n    points = 0\n    letters = [c for c in text if c.isalpha()]\n    total_letters = len(letters)\n    \n    # Zero-division defensive guard!\n    if total_letters > 0:\n        upper_count = len([c for c in letters if c.isupper()])\n        caps_ratio = upper_count / total_letters\n        if caps_ratio > 0.30:   # Over 30% uppercase\n            points += 20\n    else:\n        caps_ratio = 0.0\n        \n    exclamation_count = text.count("!")\n    if exclamation_count >= 2:\n        points += 15\n        \n    return points, caps_ratio, exclamation_count\n\n# Test on shouting email\nsample_shouting = "URGENT ACTION NEEDED IMMEDIATELY!!!"\npts, ratio, ex_count = calculate_structural_risk(sample_shouting)\nprint(f"Caps Ratio : {ratio:.1%} (+{pts} pts, {ex_count} exclamations)")`,
          explanation:
            "Filters letters, guards against zero-division, and computes proportional uppercase density.",
          stepByStepWalkthrough: [
            "Line 4: Extracts all alphabetic characters.",
            "Line 8: Verifies total_letters > 0 before dividing.",
            "Line 10: Caps ratio is 100% (> 30%) -> adds 20 points.",
            "Line 17: Exclamation count is 3 (>= 2) -> adds 15 points.",
            "Line 24: Outputs 100.0% ratio and 35 risk points.",
          ],
          expectedOutput:
            "Caps Ratio : 100.0% (+35 pts, 3 exclamations)",
          whyItHappens:
            "Heuristic rules combine text statistics with keyword scores to create resilient multi-factor classifiers.",
          edgeCases:
            "• Non-alphabetic input: If text is '123456789', total_letters is 0. Without the guard, upper_count / total_letters causes ZeroDivisionError: division by zero.",
        },
      ],
    },
    {
      id: "w1-ch8-s4",
      title: "8.4 Module 5: Batch Scanning & Summary Statistics",
      content:
        "Enterprise security tools do not scan messages one at a time; they process batch streams of hundreds of messages and maintain an in-memory audit log.\n\nIn this module, you iterate over a **List of Dictionaries** representing simulated incoming emails, run the multi-factor scoring engine on each, log the results, and calculate summary statistics: total scanned, quarantine rate percentage, and average risk score.",
      codeExamples: [
        {
          id: "w1-ch8-ex3",
          title: "Module 5: In-Memory Batch Inspection & Reporting",
          description: "Batch scanning email records and accumulating departmental statistics.",
          code: `inbox_batch = [\n    {"id": "MSG-01", "sender": "support@datacorp.com", "body": "Meeting agenda for today at 3pm."},\n    {"id": "MSG-02", "sender": "billing@external.xyz", "body": "URGENT: Verify account or access suspended immediately!!!"},\n    {"id": "MSG-03", "sender": "colleague@datacorp.com", "body": "Please review the attached project slide draft."}\n]\n\ndef classify_risk(total_score):\n    if total_score >= 60:\n        return "QUARANTINE"\n    elif total_score >= 30:\n        return "SUSPICIOUS"\n    return "CLEAN"\n\n# Batch audit\nhistory = []\nfor msg in inbox_batch:\n    # Simulated score for demonstration\n    score = 85 if "urgent" in msg["body"].lower() else 5\n    verdict = classify_risk(score)\n    \n    # Log record\n    history.append({\n        "id": msg["id"],\n        "sender": msg["sender"],\n        "score": score,\n        "verdict": verdict\n    })\n\nprint("=== BATCH AUDIT REPORT ===")\nfor rec in history:\n    print(f"[{rec['id']}] {rec['verdict']:<12} | Score: {rec['score']:>2} | Sender: {rec['sender']}")`,
          explanation:
            "Processes incoming stream, enriches records with risk metrics, and writes to an in-memory history log.",
          stepByStepWalkthrough: [
            "Lines 1-5: Defines batch dataset of simulated incoming messages.",
            "Lines 15-26: Loops over batch, computes scores, and logs to history list of dictionaries.",
            "Lines 28-30: Emits formatted tabular report.",
          ],
          expectedOutput:
            "=== BATCH AUDIT REPORT ===\n[MSG-01] CLEAN        | Score:  5 | Sender: support@datacorp.com\n[MSG-02] QUARANTINE   | Score: 85 | Sender: billing@external.xyz\n[MSG-03] CLEAN        | Score:  5 | Sender: colleague@datacorp.com",
          whyItHappens:
            "Lists of dictionaries provide a clean in-memory database representation.",
          edgeCases:
            "• Empty batch stream: If inbox_batch is empty `[]`, calculating average score by dividing by `len(inbox_batch)` raises ZeroDivisionError! Always verify `if len(inbox_batch) > 0:` before computing averages.",
        },
      ],
    },
    {
      id: "w1-ch8-s5",
      title: "8.5 Module 6: The Interactive Terminal Menu Loop",
      content:
        "To make Inbox Guardian a truly standalone tool, we wrap the engine in a **`while True` command-line interface (CLI) menu loop**.\n\n### The CLI Menu Pattern:\n1. Print the menu options (1: Scan Email, 2: Batch Scan, 3: View History, 4: View Statistics, 0: Exit).\n2. Accept user input using `input('Choose option: ').strip()`.\n3. Dispatch to the corresponding function using an `if-elif-else` ladder.\n4. If user chooses `'0'`, print an exit message and call **`break`** to terminate the loop.",
    },
  ],
  exercises: [
    {
      id: "w1-ch8-ex",
      title: "Exercise 8: Classification Decision Boundary",
      difficulty: "basic",
      prompt:
        "Modify the starter code to implement classify_message(score) which returns 'QUARANTINE' if score >= 60, 'SUSPICIOUS' if score >= 30, and 'CLEAN' otherwise. Test with score = 75 and print the returned status.",
      starterCode:
        '# Exercise 8: Classification Boundary\n# TODO: def classify_message(score):\n# TODO: Implement threshold logic and return string\n# TODO: Call with 75 and print result:\n',
      testCases: [
        {
          id: "tc-8-1",
          description: "Classifies score 75 as QUARANTINE",
          expectedOutputSnippet: "QUARANTINE",
        },
      ],
      hints: [
        "if score >= 60: return 'QUARANTINE'",
        "elif score >= 30: return 'SUSPICIOUS'",
        "else: return 'CLEAN'",
      ],
      solution:
        'def classify_message(score):\n    if score >= 60:\n        return "QUARANTINE"\n    elif score >= 30:\n        return "SUSPICIOUS"\n    return "CLEAN"\n\nprint(classify_message(75))',
      solutionExplanation:
        "75 >= 60 is True, so the function returns 'QUARANTINE'.",
    },
  ],
  assignment: {
    id: "w1-ch8-assignment",
    title: "Inbox Guardian Enterprise: Heuristic Threat Auditor",
    scenario:
      "You are the lead security software engineer at the Center of Excellence. You have been commissioned to build the production engine for INBOX GUARDIAN. The tool must parse raw incoming messages, compute multi-factor threat scores (combining weighted keywords, uppercase density, and exclamation marks), assign quarantine verdicts, log scan histories in memory, and generate an executive risk report.",
    requirements: [
      "Define multi-tier keyword dictionary: {'urgent': 25, 'verify account': 30, 'free prize': 35, 'wire transfer': 40, 'suspended': 25}.",
      "Implement scan_message(text: str, keyword_rules: dict) -> dict:",
      "  - Normalize text with .strip() and .lower().",
      "  - Accumulate keyword score and store matched terms in a list.",
      "  - Calculate uppercase ratio safely (guarding against zero-division): +20 pts if caps ratio > 0.30.",
      "  - Calculate exclamation density: +15 pts if text.count('!') >= 2.",
      "  - Compute total_risk = keyword_score + structural_score (capped at 100).",
      "  - Determine verdict: 'QUARANTINE' if total_risk >= 60, 'SUSPICIOUS' if total_risk >= 30, else 'CLEAN'.",
      "  - Return result dictionary: {'text': text[:45], 'score': total_risk, 'matched': matched, 'verdict': verdict}.",
      "Batch process a sample list of 4 simulated emails:",
      "  1. 'Reminder: Data Science workshop begins at 10 AM in Lab 3.'",
      "  2. 'URGENT: Your account has been suspended! Please verify credentials immediately!'",
      "  3. 'Congratulations! You won a free prize. Claim your wire transfer now.'",
      "  4. 'Please review the attached project draft when you have a moment.'",
      "Store all result dictionaries into an in-memory scan_history list.",
      "Generate an Executive Security Summary: Total Scanned, Quarantine Count, Suspicious Count, Clean Count, and Threat Ratio percentage.",
    ],
    edgeCasesToHandle: [
      "Zero alphabetic characters: Message '123456789 !!!' must not crash with ZeroDivisionError when computing uppercase ratio.",
      "Empty text: Blank input '' must return score = 0, verdict = 'CLEAN'.",
      "Capping risk score: Ensure total_risk does not exceed 100.",
    ],
    starterCode: `# Chapter 8 Capstone Assignment: INBOX GUARDIAN ENTERPRISE
# Center of Excellence: Data Science & AI

KEYWORDS = {
    "urgent": 25,
    "verify account": 30,
    "free prize": 35,
    "wire transfer": 40,
    "suspended": 25
}

SAMPLE_EMAILS = [
    "Reminder: Data Science workshop begins at 10 AM in Lab 3.",
    "URGENT: Your account has been suspended! Please verify credentials immediately!",
    "Congratulations! You won a free prize. Claim your wire transfer now.",
    "Please review the attached project draft when you have a moment."
]

# TODO: Step 1 - Define scan_message(text, keyword_rules)
# TODO: Step 2 - Implement keyword matching and structural heuristics with zero-division guard
# TODO: Step 3 - Assign verdict (QUARANTINE, SUSPICIOUS, CLEAN)
# TODO: Step 4 - Batch scan SAMPLE_EMAILS and append results to scan_history list
# TODO: Step 5 - Print formatted audit roster and executive summary metrics
`,
    testCases: [
      {
        id: "tc-a8-1",
        description: "Quarantines phishing email with urgent and suspended triggers",
        expectedOutputSnippet: "QUARANTINE",
      },
      {
        id: "tc-a8-2",
        description: "Identifies clean message as CLEAN",
        expectedOutputSnippet: "CLEAN",
      },
      {
        id: "tc-a8-3",
        description: "Computes threat ratio across 4 sample emails",
        expectedOutputSnippet: "50.0%",
      },
    ],
    hints: [
      "In scan_message, extract letters = [c for c in text if c.isalpha()]; check if len(letters) > 0 before dividing.",
      "Cap risk score at 100: total_risk = min(100, keyword_score + structural_score).",
      "Compute threat ratio as (quarantine_count + suspicious_count) / total_scanned * 100.",
    ],
    referenceSolution: `# Chapter 8 Capstone Assignment: Reference Solution
# Center of Excellence: Data Science & AI

KEYWORDS = {
    "urgent": 25,
    "verify account": 30,
    "free prize": 35,
    "wire transfer": 40,
    "suspended": 25
}

SAMPLE_EMAILS = [
    "Reminder: Data Science workshop begins at 10 AM in Lab 3.",
    "URGENT: Your account has been suspended! Please verify credentials immediately!",
    "Congratulations! You won a free prize. Claim your wire transfer now.",
    "Please review the attached project draft when you have a moment."
]


def scan_message(text, keyword_rules):
    cleaned = text.strip()
    lower_text = cleaned.lower()
    
    # 1. Keyword Scoring
    kw_score = 0
    matched = []
    for kw, weight in keyword_rules.items():
        if kw in lower_text:
            matched.append(kw)
            kw_score += weight
            
    # 2. Structural Heuristics with Zero-Division Guard
    struct_score = 0
    letters = [c for c in cleaned if c.isalpha()]
    if len(letters) > 0:
        upper_count = len([c for c in letters if c.isupper()])
        caps_ratio = upper_count / len(letters)
        if caps_ratio > 0.30:
            struct_score += 20
            
    if cleaned.count("!") >= 2:
        struct_score += 15
        
    total_risk = min(100, kw_score + struct_score)
    
    # 3. Decision Boundary
    if total_risk >= 60:
        verdict = "QUARANTINE"
    elif total_risk >= 30:
        verdict = "SUSPICIOUS"
    else:
        verdict = "CLEAN"
        
    return {
        "text": cleaned[:45] + "...",
        "score": total_risk,
        "matched": matched,
        "verdict": verdict
    }


# Batch Scan Engine
scan_history = []
quarantine_count = 0
suspicious_count = 0
clean_count = 0

print("=" * 65)
print("INBOX GUARDIAN: BATCH SECURITY AUDIT ROSTER")
print("=" * 65)
print(f"{'#':<3} {'Verdict':<12} {'Score':>6} {'Preview':<30}")
print("-" * 65)

for i, msg in enumerate(SAMPLE_EMAILS, start=1):
    result = scan_message(msg, KEYWORDS)
    scan_history.append(result)
    
    if result["verdict"] == "QUARANTINE":
        quarantine_count += 1
    elif result["verdict"] == "SUSPICIOUS":
        suspicious_count += 1
    else:
        clean_count += 1
        
    print(f"{i:<3} {result['verdict']:<12} {result['score']:>6} {result['text']:<30}")

threat_ratio = ((quarantine_count + suspicious_count) / len(SAMPLE_EMAILS)) * 100
print("=" * 65)
print("EXECUTIVE SECURITY SUMMARY")
print("-" * 65)
print(f"Total Scanned      : {len(SAMPLE_EMAILS)} Emails")
print(f"Quarantined        : {quarantine_count}")
print(f"Suspicious (Junk)  : {suspicious_count}")
print(f"Clean Messages     : {clean_count}")
print(f"Threat Ratio       : {threat_ratio:.1f}%")
print("=" * 65)`,
    solutionExplanation:
      "This solution represents the complete synthesis of Workshop 1: defensive text normalization, keyword lookups, safe structural ratio calculation avoiding zero-division, list of dictionary data structures, modular function design, and executive summary formatting.",
  },
  recap: {
    keyConcepts: [
      "Rule-based systems use deterministic heuristic logic (keywords + structural thresholds) to make automated decisions.",
      "Always guard against zero-division when calculating ratios like uppercase density: verify denominator > 0.",
      "The modular architecture separates sanitization, keyword scoring, structural features, and classification.",
      "In-memory datasets (lists of dictionaries) enable high-throughput batch inspection and statistical summaries.",
      "Heuristic rule engineering provides the foundation for feature engineering in modern machine learning.",
    ],
    essentialSyntax: [
      {
        syntax: "result = scan_message(text, rules)",
        description: "Encapsulating multi-factor security heuristics into pure modular functions.",
        example: "res = scan_message(email, KEYWORDS)",
      },
      {
        syntax: "ratio = upper_count / len(letters) if len(letters) > 0 else 0.0",
        description: "Zero-division guarded density formula.",
        example: "caps_density = uppers / total if total > 0 else 0.0",
      },
      {
        syntax: "history.append({'score': total, 'verdict': verdict})",
        description: "Appending structured audit dictionaries to historical logs.",
        example: "audit_log.append(result_dict)",
      },
    ],
    takeaways: [
      "Always normalize casing and strip whitespace before scanning keywords.",
      "Cap risk scores at sensible bounds (e.g. min(100, score)) to avoid unbounded growth.",
      "Deterministic heuristics prepare you for statistical machine learning in future workshops.",
    ],
    glossary: [
      {
        term: "Heuristic",
        definition: "A practical rule-based problem-solving strategy that provides an immediate, rule-based estimate or decision.",
      },
      {
        term: "Feature Engineering",
        definition: "The process of using domain knowledge to extract predictors (features) like uppercase ratio, keyword presence, and punctuation density from raw data.",
      },
      {
        term: "Decision Boundary",
        definition: "A partition in the feature space that separates different output classes (e.g., Clean vs Suspicious vs Quarantine).",
      },
      {
        term: "Zero-Division Guard",
        definition: "A conditional defensive check ensuring a denominator is non-zero before executing division operations.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why is a zero-division guard mandatory when calculating the uppercase ratio of email text?",
        answer: "If an incoming message contains only digits, emojis, spaces, or punctuation symbols (e.g. '12345 !!!'), the count of alphabetic letters is 0. Dividing uppercase count by total letters without checking total_letters > 0 will crash the program with a ZeroDivisionError.",
      },
      {
        question: "How does Inbox Guardian's rule-based approach differ from a machine learning classifier?",
        answer: "In Inbox Guardian, human developers manually define the exact keywords, point weights, and score thresholds. In machine learning, an algorithm inspects a labeled dataset of thousands of spam and ham emails, automatically learning statistical weights and boundaries from data.",
      },
      {
        question: "Why do we cap the total risk score at 100 in the scoring engine?",
        answer: "Without a ceiling cap, an email with dozens of spam keywords could accumulate an astronomical score (e.g. 350 pts). Capping at min(100, score) standardizes the metric onto an intuitive, bounded percentage-like scale for downstream security policies.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa8-1",
      type: "multiple-choice",
      prompt: "What mathematical protection is essential when calculating text character ratios?",
      options: [
        "Verifying text length is an even number",
        "Checking total character count > 0 before dividing",
        "Converting to floating point after division",
        "Multiplying by 100 before division",
      ],
      correctAnswer: 1,
      explanation: "Checking total count > 0 prevents division by zero if the text contains no matching characters.",
    },
    {
      id: "sa8-2",
      type: "multiple-choice",
      prompt: "What is the primary architectural difference between heuristics and machine learning?",
      options: [
        "Heuristics use Python; ML uses C++",
        "Heuristic rules are manually handwritten by engineers; ML models learn patterns from training data",
        "Heuristics are only used for text; ML is only for images",
        "Heuristics run in the cloud; ML runs locally",
      ],
      correctAnswer: 1,
      explanation: "Rule-based heuristics are deterministic rules hand-crafted by human experts, whereas machine learning models learn statistical patterns automatically from data.",
    },
    {
      id: "sa8-3",
      type: "multiple-choice",
      prompt: "How is an email audit history best represented in native Python memory?",
      options: [
        "A single long comma-separated string",
        "A list of dictionaries where each dictionary represents one scanned email record",
        "A tuple of integers",
        "A set of boolean flags",
      ],
      correctAnswer: 1,
      explanation: "A list of dictionaries maps directly to tabular datasets and relational records, making it the universal in-memory data model.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 8: Capstone: Build Inbox Guardian",
    timingMinutes: 35,
    teachingGoal: "Celebrate the integration of all 7 chapters into a complete, working security tool.",
    commonMisconceptions: [
      "Assuming Inbox Guardian uses AI/ML under the hood (re-emphasize that it is rule-based).",
      "Forgetting zero-division guards on empty or non-alphabetic strings.",
      "Overwriting scan history lists rather than appending.",
    ],
    discussionPrompts: [
      "How do attackers attempt to bypass rule-based filters, and how does machine learning help defend against zero-day variations?",
      "How would you connect Inbox Guardian to a live IMAP or Gmail API inbox?",
    ],
    liveCodingCheckpoints: [
      "Run the full batch scan live and demonstrate the quarantine verdict.",
      "Have volunteer students share their custom threat weights and test messages.",
    ],
  },
};
