import { Chapter } from "@/types/curriculum";

export const chapter3: Chapter = {
  id: "w1-ch3",
  slug: "strings-and-text-processing",
  number: 3,
  title: "Strings and Text Processing",
  estimatedMinutes: 20,
  introduction:
    "Text is the most ubiquitous data format in computer science—from web traffic and email payloads to genomic sequences and large language model corpora. In this chapter, you will master the mechanics of Python strings: zero-based indexing, slicing with step strides, immutability, essential string cleaning methods, tokenization with split and join, and fast substring scanning. These techniques directly empower our Inbox Guardian security engine.",
  learningObjectives: [
    "Navigate string characters using positive and negative zero-based indexing and understand string immutability",
    "Extract substrings using slice notation [start:stop:step] and reverse sequences efficiently with [::-1]",
    "Clean messy inputs using .strip(), .lower(), .upper(), and replace target patterns with .replace()",
    "Deconstruct text into lists using .split() and reassemble sequences with .join()",
    "Perform fast substring search using .find(), .count(), .startswith(), and the 'in' membership operator",
    "Analyze and avoid critical edge cases: IndexError vs slice boundary safety, string immutability TypeError, and empty substring truthiness",
  ],
  sections: [
    {
      id: "w1-ch3-s1",
      title: "3.1 Zero-Based Indexing & String Immutability",
      content:
        "In Python, a string is an **ordered sequence of Unicode characters**. Every character occupies an exact integer index.\n\n### Indexing Conventions:\n- **Forward Indexing (Positive)**: Starts at `0` for the first character, incrementing up to `len(s) - 1`.\n- **Backward Indexing (Negative)**: Starts at `-1` for the last character, `-2` for the second-to-last, down to `-len(s)` for the first.\n\n### String Immutability:\nStrings in Python are strictly **immutable**. Once created in memory, individual characters **cannot be modified, deleted, or replaced in place**. Attempting `text[0] = 'H'` raises a `TypeError`. Any operation that appears to modify a string actually allocates and returns a completely new string object.",
      codeExamples: [
        {
          id: "w1-ch3-ex1",
          title: "Statement 1: Accessing Characters by Index",
          description: "Forward indexing, negative indexing, and len() verification.",
          code: `token = "SEC_TOKEN_8942"\n\nprint("Full Token     :", token)\nprint("Length of token:", len(token))\nprint("First character (index 0) :", token[0])\nprint("Fourth character (index 3):", token[3])\nprint("Last character (index -1) :", token[-1])\nprint("Penultimate char (index -2):", token[-2])`,
          explanation:
            "Indexing uses square brackets '[]'. Positive indices count from the left starting at 0; negative indices count backwards from the right starting at -1.",
          stepByStepWalkthrough: [
            "Line 1: Allocates 14-character string 'SEC_TOKEN_8942'.",
            "Line 4: len() evaluates to integer 14.",
            "Line 5: token[0] retrieves 'S'.",
            "Line 7: token[-1] retrieves '2' (the last character).",
            "Line 8: token[-2] retrieves '4'.",
          ],
          expectedOutput:
            "Full Token     : SEC_TOKEN_8942\nLength of token: 14\nFirst character (index 0) : S\nFourth character (index 3): _\nLast character (index -1) : 2\nPenultimate char (index -2): 4",
          whyItHappens:
            "Python resolves negative index -i as len(s) - i under the hood.",
          edgeCases:
            "• IndexError: Accessing token[14] or token[-15] crashes with IndexError: string index out of range. Valid positive indices range from 0 to len - 1.\n• TypeError on Mutation: Writing token[0] = 'X' raises TypeError: 'str' object does not support item assignment. Strings are completely immutable.",
        },
      ],
    },
    {
      id: "w1-ch3-s2",
      title: "3.2 Slicing Strings: [start:stop:step]",
      content:
        "Slicing allows you to extract an entire sub-sequence of characters using the syntax:\n`sequence[start:stop:step]`\n\n- `start`: The index of the first character to include (inclusive, default `0`).\n- `stop`: The index where slicing terminates (**exclusive**, does not include character at stop, default `len`).\n- `step`: The stride increment between characters (default `1`).\n\n### Idiomatic Slicing Patterns:\n- `text[:5]`: First 5 characters (indices 0, 1, 2, 3, 4).\n- `text[3:]`: From index 3 through the very end.\n- `text[::2]`: Every second character.\n- `text[::-1]`: **Reverses the entire string** using negative step.",
      codeExamples: [
        {
          id: "w1-ch3-ex2",
          title: "Statement 2: Substring Extraction via Slicing",
          description: "Extracting prefixes, domains, stepped characters, and reversing strings.",
          code: `email = "student.coe@datascience.org"\n\n# Prefix and domain extraction\nusername = email[:11]          # indices 0 through 10\ndomain   = email[12:]          # index 12 to end\nprint("Username :", username)\nprint("Domain   :", domain)\n\n# Stepped slicing and string reversal\nalpha = "ABCDEFGHIJ"\nprint("Every 2nd char :", alpha[::2])\nprint("Reversed string:", alpha[::-1])`,
          explanation:
            "Slicing creates a shallow copy of the requested subset. Omitting start defaults to 0; omitting stop defaults to the string length.",
          stepByStepWalkthrough: [
            "Line 4: email[:11] extracts characters 0 through 10 -> 'student.coe'.",
            "Line 5: email[12:] extracts index 12 to end -> 'datascience.org'.",
            "Line 11: alpha[::2] picks index 0, 2, 4, 6, 8 -> 'ACEGI'.",
            "Line 12: alpha[::-1] traverses backwards with step -1 -> 'JIHGFEDCBA'.",
          ],
          expectedOutput:
            "Username : student.coe\nDomain   : datascience.org\nEvery 2nd char : ACEGI\nReversed string: JIHGFEDCBA",
          whyItHappens:
            "Python slices handle boundaries gracefully without memory faults.",
          edgeCases:
            "• Slicing NEVER raises an IndexError: Even if start or stop exceed string bounds (e.g. 'hello'[10:50]), Python returns an empty string '' or the valid portion without crashing! Indexing crashes; slicing is safe.\n• Inverted bounds: 'hello'[4:2] with positive step returns '' because moving forward from 4 cannot reach 2.",
        },
      ],
    },
    {
      id: "w1-ch3-s3",
      title: "3.3 Essential String Methods: Cleaning & Normalization",
      content:
        "Real-world data is notoriously messy: user inputs contain stray spaces, erratic capitalization, and unexpected punctuation. Python provides built-in methods to clean and standardize text.\n\n### Core Methods for Text Normalization:\n- `.lower()` / `.upper()`: Converts all characters to lowercase or uppercase.\n- `.strip()`: Strips leading and trailing whitespace (`\\n`, `\\t`, spaces).\n- `.replace(old, new, count)`: Replaces occurrences of a substring with another string.\n- `.count(sub)`: Counts non-overlapping occurrences of a substring.\n- `.startswith(prefix)` / `.endswith(suffix)`: Returns boolean testing start or end.",
      codeExamples: [
        {
          id: "w1-ch3-ex3",
          title: "Statement 3: Normalizing & Sanitizing Strings",
          description: "Cleaning whitespace, case-folding, and replacing sensitive tokens.",
          code: `raw_input = "   URGENT: Verify Your Bank Credentials IMMEDIATELY!   \\n"\n\n# Normalization pipeline\ncleaned = raw_input.strip()            # Removes outer whitespace & \\n\nnormalized = cleaned.lower()           # Case folding for search\n\nprint("Raw length       :", len(raw_input))\nprint("Cleaned length   :", len(cleaned))\nprint("Normalized text  :", normalized)\n\n# Substring replacement\nsanitized = normalized.replace("bank credentials", "[CONFIDENTIAL]")\nprint("Sanitized text   :", sanitized)\n\n# Prefix / Suffix inspection\nprint("Starts with urgent :", normalized.startswith("urgent"))\nprint("Ends with '!'      :", normalized.endswith("!"))`,
          explanation:
            "Calling .strip() and .lower() is the industry-standard first step in natural language processing and spam detection.",
          stepByStepWalkthrough: [
            "Line 4: .strip() trims the 3 leading spaces and trailing whitespace/newline.",
            "Line 5: .lower() converts all uppercase characters to lowercase.",
            "Line 12: .replace() finds the exact phrase and substitutes '[CONFIDENTIAL]'.",
            "Lines 16-17: .startswith() and .endswith() evaluate boolean predicates.",
          ],
          expectedOutput:
            "Raw length       : 56\nCleaned length   : 49\nNormalized text  : urgent: verify your bank credentials immediately!\nSanitized text   : urgent: verify your [CONFIDENTIAL] immediately!\nStarts with urgent : True\nEnds with '!'      : True",
          whyItHappens:
            "Each string method returns a new string object, leaving the original raw_input variable unaltered.",
          edgeCases:
            "• Forgetting Reassignment: Writing `raw_input.strip()` on its own does NOT modify `raw_input`! You must assign the result: `raw_input = raw_input.strip()`.\n• .strip('xyz') specificity: Passing characters to .strip('xyz') strips any combination of those characters from ends, NOT the whole phrase.",
        },
      ],
    },
    {
      id: "w1-ch3-s4",
      title: "3.4 Splitting, Joining & Tokenization",
      content:
        "Converting continuous text into structured lists (and vice versa) is the backbone of text analysis.\n\n### The Two Dual Methods:\n- **`str.split(delimiter)`**: Splits a string into a **list of strings** based on a delimiter. If no delimiter is passed, it automatically splits by any run of whitespace (spaces, tabs, newlines) and discards empty tokens.\n- **`delimiter.join(iterable)`**: Joins an iterable of strings into a single cohesive string, placing the delimiter between every element.",
      codeExamples: [
        {
          id: "w1-ch3-ex4",
          title: "Statement 4: Tokenizing with .split() and Reassembling with .join()",
          description: "Breaking comma-separated values into tokens and joining with custom glues.",
          code: `# Splitting a CSV log line\nlog_entry = "2026-11-17,AUTH_LOGIN,192.168.1.104,SUCCESS"\ntokens = log_entry.split(",")\nprint("Token list:", tokens)\nprint("Timestamp :", tokens[0])\nprint("IP Address:", tokens[2])\n\n# Whitespace tokenization (words)\nmessage = "Analyze   email   urgency    heuristics"\nwords = message.split()  # Splits on arbitrary consecutive whitespace\nprint("Words     :", words)\n\n# Joining tokens back into a formatted line\nformatted_csv = " -> ".join(words)\nprint("Joined    :", formatted_csv)`,
          explanation:
            "split(',') divides at exact commas. split() without arguments collapses multiple consecutive spaces. join() glues list elements together with the calling string.",
          stepByStepWalkthrough: [
            "Line 3: Splits log_entry into a 4-element list of strings.",
            "Line 10: message.split() neatly handles erratic multiple spaces, extracting exactly 4 words.",
            "Line 14: Glues words together using ' -> ' as separator.",
          ],
          expectedOutput:
            "Token list: ['2026-11-17', 'AUTH_LOGIN', '192.168.1.104', 'SUCCESS']\nTimestamp : 2026-11-17\nIP Address: 192.168.1.104\nWords     : ['Analyze', 'email', 'urgency', 'heuristics']\nJoined    : Analyze -> email -> urgency -> heuristics",
          whyItHappens:
            "split() returns a Python list (studied deeply in Chapter 6). join() is called on the separator string.",
          edgeCases:
            "• Calling .join() on non-strings: ', '.join([1, 2, 3]) crashes with TypeError: sequence item 0: expected str instance, int found. All items in the list must be strings! (e.g. ', '.join([str(x) for x in nums])).",
        },
      ],
    },
    {
      id: "w1-ch3-s5",
      title: "3.5 Substring Membership with 'in' and .find()",
      content:
        "Checking whether a target keyword exists inside a text is the central building block of rule-based classification.\n\nPython provides two primary approaches:\n1. **`'keyword' in text`**: Returns a boolean `True` or `False`. Highly idiomatic, readable, and fast.\n2. **`text.find(keyword)`**: Returns the **starting integer index** where the keyword first appears, or **`-1`** if it does not exist.\n\n*(Note: Avoid `.index()` for search because `.index()` raises a `ValueError` if the substring is missing, whereas `.find()` returns `-1` safely.)*",
      codeExamples: [
        {
          id: "w1-ch3-ex5",
          title: "Statement 5: Scanning for Keywords with 'in' and .find()",
          description: "Evaluating keyword presence and locating exact substring coordinates.",
          code: `email_subject = "Action Required: Verify Account Access Prize"\ncleaned_subj = email_subject.lower()\n\n# Checking presence with 'in'\nprint("'urgent' in subject :", "urgent" in cleaned_subj)\nprint("'prize' in subject  :", "prize" in cleaned_subj)\nprint("'verify' in subject :", "verify" in cleaned_subj)\n\n# Locating index with .find()\nprize_pos = cleaned_subj.find("prize")\nprint("Position of 'prize' :", prize_pos)\n\nmissing_pos = cleaned_subj.find("wire transfer")\nprint("Position of missing :", missing_pos)  # Returns -1`,
          explanation:
            "The 'in' operator checks for substring existence. .find() returns the zero-based index of the first character of the match or -1.",
          stepByStepWalkthrough: [
            "Line 5: 'urgent' in cleaned_subj evaluates to False.",
            "Line 6: 'prize' in cleaned_subj evaluates to True.",
            "Line 11: .find('prize') locates 'prize' starting at index 39.",
            "Line 14: .find('wire transfer') returns -1 indicating absence.",
          ],
          expectedOutput:
            "'urgent' in subject : False\n'prize' in subject  : True\n'verify' in subject : True\nPosition of 'prize' : 39\nPosition of missing : -1",
          whyItHappens:
            "Python scans the string efficiently to verify whether the target substring exists within the text sequence.",
          edgeCases:
            "• The Empty String Trapped: `'' in any_string` is ALWAYS `True`! Python defines the empty string as existing at every position in any sequence.\n• Case sensitivity: `'FREE' in 'free prize'` is `False`. Always normalize to `.lower()` before performing membership checks.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch3-ex",
      title: "Exercise 3: Normalizing & Scanning Email Headers",
      difficulty: "basic",
      prompt:
        "Modify the starter code to clean the subject string by stripping outer whitespace, converting to lowercase, and printing whether the keyword 'free' appears in the cleaned subject.",
      starterCode:
        '# Exercise 3: Subject Header Keyword Scanner\nraw_subject = "  CONGRATULATIONS: You won a FREE gift!   "\n\n# TODO: Strip whitespace and convert to lowercase\n# TODO: Print boolean check for "free" in subject:\n',
      testCases: [
        {
          id: "tc-3-1",
          description: "Detects 'free' in normalized subject",
          expectedOutputSnippet: "True",
        },
      ],
      hints: [
        "Call raw_subject.strip().lower() to clean whitespace and case-fold.",
        "Use 'free' in cleaned_subject to evaluate boolean membership.",
        "Pass the membership expression to print: print('free' in cleaned_subject).",
      ],
      solution:
        'raw_subject = "  CONGRATULATIONS: You won a FREE gift!   "\ncleaned_subject = raw_subject.strip().lower()\nprint("free" in cleaned_subject)',
      solutionExplanation:
        "raw_subject.strip().lower() produces 'congratulations: you won a free gift!'. 'free' in cleaned_subject returns True.",
    },
  ],
  assignment: {
    id: "w1-ch3-assignment",
    title: "Enterprise Security Log Sanitizer & Secret Redactor",
    scenario:
      "A security operations center (SOC) at the Center of Excellence intercepts raw network log strings that inadvertently expose user email addresses, API authentication tokens, and trailing whitespace. You must implement a log sanitizer that parses, redacts, and formats log entries before permanent database storage.",
    requirements: [
      "Given a raw log string: '  2026-11-17 | USER: alex.chen@externalcorp.com | TOKEN: secret_98421_x9 | STATUS: OK  \\n'",
      "Strip leading and trailing whitespace and newlines using .strip().",
      "Split the log entry by ' | ' into exactly 4 segments: timestamp, user_segment, token_segment, and status_segment.",
      "Extract the email address from user_segment (everything after 'USER: ').",
      "Find the '@' index in the email address using .find('@').",
      "Redact the email domain using string slicing: keep the username part, and replace the domain with '@[REDACTED]'.",
      "Redact the token in token_segment: keep 'TOKEN: ' and replace the secret hash with '***PROTECTED***'.",
      "Re-assemble the 4 sanitized segments using ' | '.join(...) and print the final sanitized log.",
    ],
    edgeCasesToHandle: [
      "Emails with varying username lengths: Use dynamic .find('@') and slicing [:at_index] rather than hardcoded lengths.",
      "Spacing around delimiters: Ensure ' | ' (with spaces) is used consistently to prevent messy concatenation.",
      "Handle case variations cleanly.",
    ],
    starterCode: `# Chapter 3 Assignment: Security Log Sanitizer & Secret Redactor
# Center of Excellence: Data Science & AI

raw_log = "  2026-11-17 | USER: alex.chen@externalcorp.com | TOKEN: secret_98421_x9 | STATUS: OK  \\n"

# 1. Strip raw log whitespace
cleaned_log = raw_log.strip()

# 2. Split log by " | " into segments
# TODO: segments = cleaned_log.split(" | ")

# 3. Extract email and redact domain
# TODO: Locate '@' and slice username
# TODO: Rebuild sanitized_user = "USER: " + username + "@[REDACTED]"

# 4. Redact token segment to "TOKEN: ***PROTECTED***"

# 5. Join segments back with " | " and print final output
`,
    testCases: [
      {
        id: "tc-a3-1",
        description: "Redacts email domain to [REDACTED]",
        expectedOutputSnippet: "alex.chen@[REDACTED]",
      },
      {
        id: "tc-a3-2",
        description: "Redacts token to ***PROTECTED***",
        expectedOutputSnippet: "TOKEN: ***PROTECTED***",
      },
      {
        id: "tc-a3-3",
        description: "Maintains valid 4-part structure",
        expectedOutputSnippet: "2026-11-17 | USER: alex.chen@[REDACTED] | TOKEN: ***PROTECTED*** | STATUS: OK",
      },
    ],
    hints: [
      "Use segments = cleaned_log.split(' | ') to obtain a list of the 4 segments.",
      "In segments[1], use .replace('USER: ', '') to get the email, find '@', and slice email[:at_pos] + '@[REDACTED]'.",
      "Join the modified segments list using ' | '.join(segments).",
    ],
    referenceSolution: `# Chapter 3 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

raw_log = "  2026-11-17 | USER: alex.chen@externalcorp.com | TOKEN: secret_98421_x9 | STATUS: OK  \\n"

# 1. Strip whitespace
cleaned_log = raw_log.strip()

# 2. Split into segments
segments = cleaned_log.split(" | ")

# 3. Redact user email domain
user_segment = segments[1]  # 'USER: alex.chen@externalcorp.com'
email = user_segment.replace("USER: ", "")
at_pos = email.find("@")
username = email[:at_pos]
sanitized_user = f"USER: {username}@[REDACTED]"
segments[1] = sanitized_user

# 4. Redact token
segments[2] = "TOKEN: ***PROTECTED***"

# 5. Reassemble and print
final_log = " | ".join(segments)
print(final_log)`,
    solutionExplanation:
      "This solution leverages .strip(), .split(' | '), .find('@'), slice [:at_pos], and .join(' | ') to sanitize sensitive identifiers while strictly preserving log formatting.",
  },
  recap: {
    keyConcepts: [
      "Strings are immutable sequences: individual characters cannot be modified in place.",
      "Positive indexing starts at 0; negative indexing counts backwards from -1.",
      "Slicing [start:stop:step] extracts substrings; stop is exclusive. Slicing never raises an IndexError.",
      "String methods like .lower(), .upper(), .strip(), and .replace() return new strings without mutating the original.",
      "split(sep) divides text into a list; sep.join(list) glues a list of strings into one string.",
    ],
    essentialSyntax: [
      {
        syntax: "char = text[0], last = text[-1]",
        description: "Accessing single character by zero-based index.",
        example: '"Data"[0] -> "D", "Data"[-1] -> "a"',
      },
      {
        syntax: "sub = text[start:stop:step]",
        description: "Slicing substring from start (inclusive) to stop (exclusive).",
        example: '"Python"[:4] -> "Pyth", "Python"[::-1] -> "nohtyP"',
      },
      {
        syntax: "cleaned = text.strip().lower()",
        description: "Chaining methods to remove whitespace and case-fold.",
        example: '"  ALERT ".strip().lower() -> "alert"',
      },
      {
        syntax: "tokens = text.split(','), combined = ','.join(tokens)",
        description: "Tokenizing text and reassembling lists of strings.",
        example: '"a,b".split(",") -> ["a", "b"]',
      },
    ],
    takeaways: [
      "Slicing beyond string boundaries returns empty string or truncated text, but indexing beyond bounds crashes with IndexError.",
      "The empty string '' is contained inside every string: '' in text is always True.",
      "join() must be called on a list containing ONLY string objects.",
    ],
    glossary: [
      {
        term: "Immutability",
        definition: "A property of an object in memory whose state cannot be modified after creation. Strings, integers, floats, and tuples are immutable in Python.",
      },
      {
        term: "Slicing",
        definition: "Extracting a contiguous subsequence from a sequence using [start:stop:step] notation.",
      },
      {
        term: "Tokenization",
        definition: "The process of breaking a continuous text stream into discrete words, symbols, or components (tokens).",
      },
      {
        term: "Case Folding",
        definition: "Converting text to lowercase (.lower()) to eliminate case sensitivity during keyword matching.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does `text = 'hello'; text[0] = 'H'` fail with a TypeError in Python?",
        answer: "Strings in Python are immutable objects. Memory buffers allocated for string literals cannot be overwritten character-by-character. To achieve this, create a new string: text = 'H' + text[1:].",
      },
      {
        question: "What is the difference between `text.find('target')` and `text.index('target')`?",
        answer: "Both locate the starting index of 'target'. However, if 'target' does not exist in text, .find() returns -1 safely, whereas .index() raises a ValueError and crashes execution unless caught.",
      },
      {
        question: "What will `'hello'[10:20]` evaluate to, and why does it not crash?",
        answer: "It evaluates to the empty string ''. Slicing in Python handles out-of-range indices gracefully by capping indices to the valid string length, whereas direct index lookup text[10] would raise an IndexError.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa3-1",
      type: "multiple-choice",
      prompt: "What will be returned by: 'Data Science'[-3:]?",
      options: [
        "'nce'",
        "'enc'",
        "'Science'",
        "'ce '",
      ],
      correctAnswer: 0,
      explanation: "Negative index -3 starts 3 characters from the end ('n') and slices through the end, yielding 'nce'.",
    },
    {
      id: "sa3-2",
      type: "multiple-choice",
      prompt: "What will: '  URGENT  '.strip().lower() evaluate to?",
      options: [
        "'  urgent  '",
        "'urgent'",
        "'URGENT'",
        "'urgent  '",
      ],
      correctAnswer: 1,
      explanation: ".strip() eliminates the leading and trailing spaces, and .lower() converts to lowercase 'urgent'.",
    },
    {
      id: "sa3-3",
      type: "multiple-choice",
      prompt: "What happens when you run: '-'.join(['Alpha', 'Beta', 'Gamma'])?",
      options: [
        "['Alpha', '-', 'Beta', '-', 'Gamma']",
        "'Alpha-Beta-Gamma'",
        "'Alpha,Beta,Gamma'",
        "'-Alpha-Beta-Gamma-'",
      ],
      correctAnswer: 1,
      explanation: "join() places the hyphen '-' between each element of the list, producing 'Alpha-Beta-Gamma'.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 3: Strings & Text Processing",
    timingMinutes: 20,
    teachingGoal: "Master text cleaning and slicing before building the Inbox Guardian classifier.",
    commonMisconceptions: [
      "Expecting s.lower() to mutate s in place without assignment.",
      "Off-by-one errors in slice stop indices (stop index is exclusive).",
      "Calling join on lists containing integers.",
    ],
    discussionPrompts: [
      "Why is string immutability an asset for memory optimization and hash lookups?",
      "How do modern NLP tokenizers extend Python's basic .split() functionality?",
    ],
    liveCodingCheckpoints: [
      "All students have sliced their own name backwards using [::-1].",
      "Demonstrate the difference between .find() returning -1 and .index() crashing.",
    ],
  },
};
