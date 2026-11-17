import { Chapter } from "@/types/curriculum";

export const chapter6: Chapter = {
  id: "w1-ch6",
  slug: "collections-lists-and-dictionaries",
  number: 6,
  title: "Collections: Lists and Dictionaries",
  estimatedMinutes: 20,
  introduction:
    "Data science and AI rarely operate on isolated numbers or single strings. Real-world systems process collections of data: tables of records, matrices of features, database rows, and JSON payloads from web APIs. In this chapter, you will master Python's two most essential composite data structures: ordered mutable Lists and associative key-value Dictionaries. You will also learn how combining them into 'lists of dictionaries' forms the universal in-memory data model.",
  learningObjectives: [
    "Construct, index, slice, and mutate ordered Lists, and master CRUD lifecycle methods (.append, .extend, .insert, .pop, .remove)",
    "Differentiate in-place mutation (.sort()) from non-destructive functional transformation (sorted())",
    "Construct Dictionaries to represent associative key-value pairs and access data defensively using .get() to prevent KeyError crashes",
    "Iterate across dictionaries using .keys(), .values(), and .items() unpacking",
    "Model real-world tabular datasets using lists of dictionaries (representing rows and columns)",
    "Diagnose and prevent critical edge cases: reference aliasing traps, unhashable dictionary keys, and dictionary size mutation during iteration",
  ],
  sections: [
    {
      id: "w1-ch6-s1",
      title: "6.1 Lists: Ordered, Mutable Sequences",
      content:
        "A **List** in Python is an **ordered, mutable collection of items** enclosed in square brackets `[]`.\n\n### Key Properties of Lists:\n- **Ordered**: Elements maintain their exact insertion order and are accessible by integer indices (`0` to `len - 1`).\n- **Mutable**: Unlike strings, you can add, remove, and modify elements **in place without creating a new list**.\n- **Heterogeneous**: A single list can contain mixed data types (integers, strings, floats, other lists).\n\n### Accessing and Mutating Items:\n```python\nscores = [85, 92, 78]\nscores[0] = 90       # In-place item assignment!\nscores.append(99)   # Adds 99 to the end\n```",
      codeExamples: [
        {
          id: "w1-ch6-ex1",
          title: "Statement 1: List Creation, Indexing, and In-Place Mutation",
          description: "Manipulating list elements, slicing sub-lists, and testing membership.",
          code: `# Creating and modifying a list\nrisk_thresholds = [30, 60, 80]\nprint("Initial thresholds :", risk_thresholds)\n\n# In-place mutation via index\nrisk_thresholds[0] = 35\nprint("Updated thresholds :", risk_thresholds)\n\n# Slicing lists (produces a new sub-list)\nactive_tier = risk_thresholds[1:]\nprint("High-risk tiers     :", active_tier)\n\n# Membership check with 'in'\nprint("Is 60 in thresholds :", 60 in risk_thresholds)`,
          explanation:
            "Lists support item assignment using index notation. The 'in' operator checks whether an element exists within the list.",
          stepByStepWalkthrough: [
            "Line 2: Allocates list containing [30, 60, 80].",
            "Line 6: Mutates index 0 in place from 30 to 35.",
            "Line 10: Slices indices 1 to end, producing [60, 80].",
            "Line 14: 60 in risk_thresholds evaluates to True.",
          ],
          expectedOutput:
            "Initial thresholds : [30, 60, 80]\nUpdated thresholds : [35, 60, 80]\nHigh-risk tiers     : [60, 80]\nIs 60 in thresholds : True",
          whyItHappens:
            "Lists are ordered, mutable collections where items can be accessed, reassigned, or sliced directly by their zero-based index.",
          edgeCases:
            "• The Reference Aliasing Trap: Writing `b = a` does NOT copy a list! It merely creates a second variable pointing to the EXACT same memory array! Modifying `b[0] = 999` also changes `a[0]`! To create an independent clone, write: `b = a.copy()` or `b = a[:]` or `b = list(a)`.\n• IndexError: Just like strings, accessing `scores[10]` when length is 3 raises `IndexError: list index out of range`.",
        },
      ],
    },
    {
      id: "w1-ch6-s2",
      title: "6.2 Essential List Methods: append, extend, insert, pop, remove",
      content:
        "Python provides built-in methods to manage the complete lifecycle of list elements.\n\n### Summary of Core List Operations:\n| Method / Operation | Action | Mutates in Place? | Return Value |\n| :--- | :--- | :--- | :--- |\n| `lst.append(x)` | Appends item `x` to end of list | **Yes** | `None` |\n| `lst.extend(iterable)` | Unpacks and appends all items | **Yes** | `None` |\n| `lst.insert(i, x)` | Inserts item `x` at index `i` | **Yes** | `None` |\n| `lst.pop(i)` | Removes and returns item at index `i` | **Yes** | The removed item |\n| `lst.remove(x)` | Removes first occurrence of value `x` | **Yes** | `None` (crashes if missing) |\n| `del lst[i]` | Deletes item at index `i` | **Yes** | None |\n| `lst.sort()` | Sorts list in-place | **Yes** | `None` |\n| `sorted(lst)` | Returns a new sorted list | **No** | New list |",
      codeExamples: [
        {
          id: "w1-ch6-ex2",
          title: "Statement 2: List Lifecycle Operations (.append vs .extend, .pop, .sort)",
          description: "Adding, removing, popping, and sorting elements in lists.",
          code: `keywords = ["urgent", "free"]\n\n# .append(val) adds a single item\nkeywords.append("prize")\nprint("After append   :", keywords)\n\n# .extend(iterable) vs .append(list)\nnew_terms = ["verify", "account"]\nkeywords.extend(new_terms)\nprint("After extend   :", keywords)\n\n# .pop() removes and returns last element\nlast_added = keywords.pop()\nprint("Popped item    :", last_added)\nprint("After pop      :", keywords)\n\n# In-place sort vs non-destructive sorted()\nnumbers = [85, 12, 94, 45, 68]\nsorted_copy = sorted(numbers)  # Does NOT mutate numbers\nprint("sorted() return:", sorted_copy)\nprint("Original list  :", numbers)\n\nnumbers.sort()                 # Mutates numbers in place\nprint("After .sort()  :", numbers)`,
          explanation:
            "append() adds a single element; extend() unpacks an iterable; pop() removes the last element; .sort() mutates in place.",
          stepByStepWalkthrough: [
            "Line 4: Adds 'prize' to end -> ['urgent', 'free', 'prize'].",
            "Line 9: Unpacks ['verify', 'account'] into the list.",
            "Line 13: Removes 'account' and assigns it to last_added.",
            "Line 18: sorted(numbers) returns a new sorted list without modifying 'numbers'.",
            "Line 22: numbers.sort() sorts 'numbers' directly in memory.",
          ],
          expectedOutput:
            "After append   : ['urgent', 'free', 'prize']\nAfter extend   : ['urgent', 'free', 'prize', 'verify', 'account']\nPopped item    : account\nAfter pop      : ['urgent', 'free', 'prize', 'verify']\nsorted() return: [12, 45, 68, 85, 94]\nOriginal list  : [85, 12, 94, 45, 68]\nAfter .sort()  : [12, 45, 68, 85, 94]",
          whyItHappens:
            "Python distinguishes in-place mutators (which return None by convention) from non-destructive functions (which return new objects).",
          edgeCases:
            "• The .append() Return Trap: Never write `my_list = my_list.append(5)`! Because `.append()` mutates in-place, it returns `None`. Writing that assignment overwrites `my_list` with `None`, permanently destroying your list!\n• .remove() Missing Value: Calling `keywords.remove('missing')` crashes with `ValueError: list.remove(x): x not in list`. Check with `if 'missing' in keywords:` first.",
        },
      ],
    },
    {
      id: "w1-ch6-s3",
      title: "6.3 Dictionaries: Associative Key-Value Mappings",
      content:
        "While a list identifies elements by sequential integer positions (`0, 1, 2`), a **Dictionary (`dict`)** identifies elements by **meaningful named keys**.\n\nA dictionary is an associative hash map of `key: value` pairs enclosed in curly braces `{}`:\n```python\nemail = {\n    \"sender\": \"alert@bank.com\",\n    \"subject\": \"Security Notice\",\n    \"threat_score\": 85,\n    \"is_phishing\": True\n}\n```\n\n### The Golden Rules of Dictionary Keys:\n1. **Keys Must Be Unique**: Defining duplicate keys overwrites the previous value.\n2. **Keys Must Be Immutable (Hashable)**: Strings, integers, floats, and tuples can be keys. **Lists and Dictionaries CANNOT be keys** because they are mutable!\n3. **Values Can Be Anything**: Values can be integers, strings, floats, booleans, lists, or other nested dictionaries.",
      codeExamples: [
        {
          id: "w1-ch6-ex3",
          title: "Statement 3: Dictionary CRUD & Safe Access with .get()",
          description: "Creating dictionaries, updating keys, and avoiding KeyError crashes.",
          code: `message = {\n    "id": 101,\n    "sender": "hr@datacorp.org",\n    "risk": 42\n}\n\n# 1. Accessing values via square brackets []\nprint("Sender   :", message["sender"])\n\n# 2. Mutating existing key and adding new key\nmessage["risk"] = 75              # Update\nmessage["status"] = "QUARANTINE"  # Add new key\nprint("Updated  :", message)\n\n# 3. Defensive lookup with .get(key, default)\n# Accessing missing key with [] raises KeyError: message['ip_address']\nsafe_ip = message.get("ip_address", "UNKNOWN_IP")\nprint("IP Lookup:", safe_ip)`,
          explanation:
            "dict[key] accesses the value for key. .get(key, default) safely returns a fallback default value if the key does not exist.",
          stepByStepWalkthrough: [
            "Line 8: Retrieves 'hr@datacorp.org' using key 'sender'.",
            "Line 11: Modifies existing key 'risk' from 42 to 75.",
            "Line 12: Adds new key 'status' with value 'QUARANTINE'.",
            "Line 17: .get('ip_address', 'UNKNOWN_IP') finds no 'ip_address' key, returning 'UNKNOWN_IP' safely.",
          ],
          expectedOutput:
            "Sender   : hr@datacorp.org\nUpdated  : {'id': 101, 'sender': 'hr@datacorp.org', 'risk': 75, 'status': 'QUARANTINE'}\nIP Lookup: UNKNOWN_IP",
          whyItHappens:
            "Dictionaries use hash tables providing average O(1) constant time lookup.",
          edgeCases:
            "• KeyError: Writing `print(message['nonexistent'])` halts execution with `KeyError: 'nonexistent'`. Always use `.get()` when working with external data (APIs, web forms, JSON payloads) where fields may be optional or absent.\n• Unhashable Keys: Attempting `d = {[1, 2]: 'val'}` raises `TypeError: unhashable type: 'list'`. Lists cannot be keys.",
        },
      ],
    },
    {
      id: "w1-ch6-s4",
      title: "6.4 Dictionary Iteration: keys(), values(), and items()",
      content:
        "Python provides three distinct view objects for inspecting and iterating over dictionaries:\n- **`dict.keys()`**: Yields all key identifiers (the default when looping directly over a dictionary: `for k in d:`).\n- **`dict.values()`**: Yields all stored values.\n- **`dict.items()`**: Yields `(key, value)` tuples simultaneously, allowing elegant tuple unpacking in a `for` loop.",
      codeExamples: [
        {
          id: "w1-ch6-ex4",
          title: "Statement 4: Iterating with .keys(), .values(), and .items()",
          description: "Unpacking key-value pairs and formatting dictionary reports.",
          code: `threat_weights = {\n    "wire transfer": 35,\n    "urgent": 20,\n    "verify account": 25,\n    "free prize": 30\n}\n\nprint("=== SECURITY THREAT DICTIONARY ===")\n# Unpacking keys and values with .items()\nfor keyword, weight in threat_weights.items():\n    print(f" Keyword: '{keyword:<16}' | Threat Weight: +{weight}")\n\n# Calculating aggregate statistics across values\ntotal_possible_score = sum(threat_weights.values())\nprint(f"\\nTotal Max Score Available: {total_possible_score}")`,
          explanation:
            "for k, v in dict.items(): unpacks each key-value pair during iteration. sum(dict.values()) sums all numeric values directly.",
          stepByStepWalkthrough: [
            "Line 10: .items() yields ('wire transfer', 35), ('urgent', 20), etc.",
            "Line 11: Formats each keyword and weight with left alignment width :<16.",
            "Line 14: sum() aggregates all weights (35 + 20 + 25 + 30 = 110).",
          ],
          expectedOutput:
            "=== SECURITY THREAT DICTIONARY ===\n Keyword: 'wire transfer  ' | Threat Weight: +35\n Keyword: 'urgent          ' | Threat Weight: +20\n Keyword: 'verify account  ' | Threat Weight: +25\n Keyword: 'free prize      ' | Threat Weight: +30\n\nTotal Max Score Available: 110",
          whyItHappens:
            "Dictionary view objects provide dynamic windows into the underlying hash map.",
          edgeCases:
            "• Mutating Dictionary Size During Iteration: If you try to add or delete keys inside a `for k in d:` loop, Python raises `RuntimeError: dictionary changed size during iteration`! If you need to delete keys, iterate over a static list copy: `for k in list(d.keys()): del d[k]`.",
        },
      ],
    },
    {
      id: "w1-ch6-s5",
      title: "6.5 Lists of Dictionaries: The Universal Tabular Data Model",
      content:
        "In modern data engineering, whether you read a database table, a CSV file with Pandas, or query a REST API, data is almost always represented as a **List of Dictionaries**:\n- The **List** represents the sequence of **rows (records)**.\n- Each **Dictionary** represents a **single record**, where keys are column names and values are the cell data.\n\n```python\ninbox_dataset = [\n    {\"id\": 1, \"subject\": \"Meeting notes\", \"threat_score\": 5},\n    {\"id\": 2, \"subject\": \"URGENT: Verify\", \"threat_score\": 85},\n]\n```\nThis structure forms the exact architectural foundation of our **Inbox Guardian** email scanner in Chapter 8.",
      codeExamples: [
        {
          id: "w1-ch6-ex5",
          title: "Statement 5: Filtering and Aggregating a List of Dictionaries",
          description: "Processing dataset records, computing running averages, and filtering by criteria.",
          code: `inbox_records = [\n    {"id": 1, "sender": "manager@work.com", "score": 10, "status": "CLEAN"},\n    {"id": 2, "sender": "promo@deals.net",   "score": 45, "status": "SUSPICIOUS"},\n    {"id": 3, "sender": "spoof@phish.org",  "score": 90, "status": "QUARANTINE"},\n    {"id": 4, "sender": "hr@work.com",      "score": 15, "status": "CLEAN"}\n]\n\nprint("Total Emails in Inbox:", len(inbox_records))\n\n# Accumulator: Finding all quarantined messages\nquarantine_list = []\ntotal_score = 0\n\nfor record in inbox_records:\n    total_score += record["score"]\n    if record["status"] == "QUARANTINE":\n        quarantine_list.append(record["sender"])\n\navg_score = total_score / len(inbox_records)\nprint(f"Average Inbox Risk   : {avg_score:.1f}")\nprint(f"Quarantined Senders  : {quarantine_list}")`,
          explanation:
            "Iterating through a list of dictionaries allows row-by-row inspection, metric aggregation, and conditional filtering.",
          stepByStepWalkthrough: [
            "Lines 1-6: Defines a 4-row tabular dataset in memory.",
            "Lines 13-16: Loops over each row, adds to total_score, and filters quarantined senders.",
            "Line 18: Computes mean risk score (160 / 4 = 40.0).",
          ],
          expectedOutput:
            "Total Emails in Inbox: 4\nAverage Inbox Risk   : 40.0\nQuarantined Senders  : ['spoof@phish.org']",
          whyItHappens:
            "List of dictionaries maps directly to relational database tables and JSON array payloads.",
          edgeCases:
            "• Heterogeneous/Missing Keys: If row 3 is missing the 'status' key, record['status'] crashes with KeyError! In production, protect access using `record.get('status', 'UNKNOWN')`.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "w1-ch6-ex",
      title: "Exercise 6: Aggregating Student Marks from Dictionaries",
      difficulty: "basic",
      prompt:
        "Modify the starter code to loop over the students list, compute the average score across all students, and print the average formatted to 1 decimal place.",
      starterCode:
        '# Exercise 6: List of Dictionaries Aggregator\nstudents = [\n    {"name": "Elena", "score": 92.0},\n    {"name": "Marcus", "score": 84.5},\n    {"name": "Amina", "score": 96.0}\n]\n\n# TODO: Compute total score and calculate average\n# TODO: Print average formatted to 1 decimal place:\n',
      testCases: [
        {
          id: "tc-6-1",
          description: "Calculates correct average score (90.8)",
          expectedOutputSnippet: "90.8",
        },
      ],
      hints: [
        "Initialize total = 0 outside the loop.",
        "Loop with for s in students: and accumulate total += s['score'].",
        "Compute avg = total / len(students) and print f'{avg:.1f}'.",
      ],
      solution:
        'students = [\n    {"name": "Elena", "score": 92.0},\n    {"name": "Marcus", "score": 84.5},\n    {"name": "Amina", "score": 96.0}\n]\ntotal = 0\nfor s in students:\n    total += s["score"]\navg = total / len(students)\nprint(f"{avg:.1f}")',
      solutionExplanation:
        "Total is 92.0 + 84.5 + 96.0 = 272.5. Divided by 3 gives 90.8333..., formatted as '90.8'.",
    },
  ],
  assignment: {
    id: "w1-ch6-assignment",
    title: "Healthcare Emergency Patient Triage & Vitals Registry",
    scenario:
      "A hospital emergency department (ED) at the Center of Excellence needs an automated triage patient registry. Incoming patients are registered as a list of dictionaries with clinical vitals (heart rate, blood pressure, oxygen saturation, pain level). You must compute individual acuity scores, assign triage priority bands, and produce an emergency department census summary.",
    requirements: [
      "Given a list of patient dictionaries:",
      "  [{'id': 'P1', 'name': 'James Hall', 'hr': 130, 'spo2': 88, 'pain': 9},",
      "   {'id': 'P2', 'name': 'Sarah Lin',   'hr': 76,  'spo2': 98, 'pain': 3},",
      "   {'id': 'P3', 'name': 'Robert Diaz', 'hr': 115, 'spo2': 92, 'pain': 8},",
      "   {'id': 'P4', 'name': 'Emma White',  'hr': 82,  'spo2': 99, 'pain': 2}]",
      "For each patient, calculate Acuity Points based on clinical rules:",
      "  - Oxygen SpO2 < 90%: +40 points | SpO2 between 90% and 94%: +20 points | SpO2 >= 95%: +0 points",
      "  - Heart Rate HR > 120 bpm: +30 points | HR between 100 and 120 bpm: +15 points | HR <= 100: +0 points",
      "  - Severe Pain >= 8: +15 points",
      "Assign Triage Category based on total acuity points:",
      "  - Points >= 60: 'RED (IMMEDIATE)'",
      "  - Points >= 30: 'YELLOW (URGENT)'",
      "  - Points < 30: 'GREEN (NON-URGENT)'",
      "Update each patient dictionary in-place by adding the keys 'acuity' and 'category'.",
      "Calculate departmental summary metrics: Total Patients, Count of RED Acuity patients, and Average Heart Rate.",
      "Print an aligned ASCII Triage Roster and the final summary metrics.",
    ],
    edgeCasesToHandle: [
      "Missing vitals: Use .get() with safe fallback defaults in case a vital sign was unrecorded (e.g. pain defaults to 0).",
      "Boundary values: Patient with SpO2 exactly 90% receives +20 points (use <= and >=).",
      "In-place dictionary modification: Ensure existing dictionaries in the list are updated with new keys.",
    ],
    starterCode: `# Chapter 6 Assignment: Healthcare Emergency Triage Registry
# Center of Excellence: Data Science & AI

patients = [
    {"id": "P1", "name": "James Hall", "hr": 130, "spo2": 88, "pain": 9},
    {"id": "P2", "name": "Sarah Lin",   "hr": 76,  "spo2": 98, "pain": 3},
    {"id": "P3", "name": "Robert Diaz", "hr": 115, "spo2": 92, "pain": 8},
    {"id": "P4", "name": "Emma White",  "hr": 82,  "spo2": 99, "pain": 2}
]

# TODO: Step 1 - Iterate through patients and compute acuity score
# TODO: Step 2 - Assign category ('RED (IMMEDIATE)', 'YELLOW (URGENT)', 'GREEN (NON-URGENT)')
# TODO: Step 3 - Store 'acuity' and 'category' keys inside each patient dictionary
# TODO: Step 4 - Calculate summary metrics (total, red_count, avg_hr)
# TODO: Step 5 - Print aligned ASCII Triage Roster
`,
    testCases: [
      {
        id: "tc-a6-1",
        description: "Assigns RED (IMMEDIATE) to high-acuity patient James Hall (85 pts)",
        expectedOutputSnippet: "RED (IMMEDIATE)",
      },
      {
        id: "tc-a6-2",
        description: "Assigns YELLOW (URGENT) to Robert Diaz (50 pts)",
        expectedOutputSnippet: "YELLOW (URGENT)",
      },
      {
        id: "tc-a6-3",
        description: "Calculates total patients (4) and average HR (100.8 bpm)",
        expectedOutputSnippet: "100.8",
      },
    ],
    hints: [
      "Inside the loop, retrieve vitals: spo2 = p.get('spo2', 98), hr = p.get('hr', 80), pain = p.get('pain', 0).",
      "Add points incrementally: acuity = 0; if spo2 < 90: acuity += 40 elif spo2 <= 94: acuity += 20 ...",
      "Assign p['acuity'] = acuity and p['category'] = category directly to mutate the dictionary.",
    ],
    referenceSolution: `# Chapter 6 Assignment: Reference Solution
# Center of Excellence: Data Science & AI

patients = [
    {"id": "P1", "name": "James Hall", "hr": 130, "spo2": 88, "pain": 9},
    {"id": "P2", "name": "Sarah Lin",   "hr": 76,  "spo2": 98, "pain": 3},
    {"id": "P3", "name": "Robert Diaz", "hr": 115, "spo2": 92, "pain": 8},
    {"id": "P4", "name": "Emma White",  "hr": 82,  "spo2": 99, "pain": 2}
]

total_hr = 0
red_count = 0

print("=" * 60)
print("EMERGENCY DEPARTMENT TRIAGE ROSTER")
print("=" * 60)
print(f"{'ID':<4} {'Patient Name':<15} {'HR':>5} {'SpO2':>6} {'Acuity':>8} {'Category':<18}")
print("-" * 60)

for p in patients:
    hr = p.get("hr", 80)
    spo2 = p.get("spo2", 98)
    pain = p.get("pain", 0)
    
    # Calculate acuity points
    acuity = 0
    if spo2 < 90:
        acuity += 40
    elif spo2 <= 94:
        acuity += 20
        
    if hr > 120:
        acuity += 30
    elif hr >= 100:
        acuity += 15
        
    if pain >= 8:
        acuity += 15
        
    # Assign category
    if acuity >= 60:
        category = "RED (IMMEDIATE)"
        red_count += 1
    elif acuity >= 30:
        category = "YELLOW (URGENT)"
    else:
        category = "GREEN (NON-URGENT)"
        
    # Mutate record
    p["acuity"] = acuity
    p["category"] = category
    total_hr += hr
    
    print(f"{p['id']:<4} {p['name']:<15} {hr:>5} {spo2:>5}% {acuity:>8} {category:<18}")

avg_hr = total_hr / len(patients)
print("-" * 60)
print(f"Total Census        : {len(patients)} Patients")
print(f"Critical Red Acuity : {red_count} Patients")
print(f"Average Heart Rate  : {avg_hr:.1f} bpm")
print("=" * 60)`,
    solutionExplanation:
      "This solution demonstrates how lists of dictionaries function as an in-memory database: each dictionary row is enriched with computed clinical metrics ('acuity', 'category') while maintaining running aggregates across the entire cohort.",
  },
  recap: {
    keyConcepts: [
      "Lists are ordered, mutable sequences; use .append() for single items, .extend() for collections, and .pop() to remove.",
      "b = a aliases the same memory list; use b = a.copy() to create an independent copy.",
      "Dictionaries store key-value mappings with fast O(1) hash table lookup. Keys must be immutable.",
      "Use dict.get(key, default) to prevent KeyError crashes on optional or missing fields.",
      "A list of dictionaries is the industry-standard data structure representing tabular data and API payloads.",
    ],
    essentialSyntax: [
      {
        syntax: "lst.append(x), lst.extend(items), lst.pop()",
        description: "List lifecycle manipulation methods.",
        example: 'nums = [1, 2]; nums.append(3) -> [1, 2, 3]',
      },
      {
        syntax: "d = {'key': val}, val = d.get('key', default)",
        description: "Dictionary initialization and defensive value lookup.",
        example: 'user.get("role", "guest")',
      },
      {
        syntax: "for k, v in d.items(): ...",
        description: "Iterating through key-value pairs simultaneously.",
        example: 'for name, score in grades.items(): print(name, score)',
      },
    ],
    takeaways: [
      "Never mutate a dictionary's keys while iterating directly over it.",
      ".append() and .sort() return None; do not assign their output back to the variable.",
      "Lists and dictionaries cannot be dictionary keys because they are unhashable.",
    ],
    glossary: [
      {
        term: "Hash Map / Hash Table",
        definition: "A data structure that implements an associative array abstract data type, mapping keys to values using a hashing function for constant time O(1) lookups.",
      },
      {
        term: "Hashable",
        definition: "An object is hashable if it has a hash value that never changes during its lifetime. In Python, immutable types (str, int, float, tuple) are hashable.",
      },
      {
        term: "Aliasing",
        definition: "When two or more variables refer to the exact same mutable object in memory.",
      },
      {
        term: "Tabular Data Model",
        definition: "Structuring data as rows and columns, represented in native Python as a list of dictionaries.",
      },
    ],
    revisionQuestions: [
      {
        question: "Why does `a = [1, 2]; b = a; b.append(3)` also modify `a`?",
        answer: "In Python, variables are references. The assignment `b = a` does not copy the list; it binds the identifier `b` to the identical heap memory address as `a`. Any in-place mutation through either variable affects the underlying object.",
      },
      {
        question: "Why can a tuple `(1, 2)` be used as a dictionary key, but a list `[1, 2]` cannot?",
        answer: "Dictionary keys must be hashable and immutable so their hash code never changes. Tuples are immutable and therefore hashable. Lists are mutable; modifying a list in place would invalidate its hash table bucket location, so Python raises a TypeError.",
      },
      {
        question: "What is the difference between `d['key']` and `d.get('key', 'default')`?",
        answer: "If 'key' is missing from dictionary `d`, `d['key']` immediately halts execution with a KeyError exception. In contrast, `d.get('key', 'default')` handles the missing key gracefully and returns the specified default value.",
      },
    ],
  },
  selfAssessment: [
    {
      id: "sa6-1",
      type: "multiple-choice",
      prompt: "What will `nums = [1, 2]; nums = nums.append(3)` set `nums` to?",
      options: [
        "[1, 2, 3]",
        "None",
        "3",
        "SyntaxError",
      ],
      correctAnswer: 1,
      explanation: "append() mutates the list in place and returns None by convention. Reassigning nums to the return value overwrites nums with None.",
    },
    {
      id: "sa6-2",
      type: "multiple-choice",
      prompt: "Which of the following can be used as a dictionary key in Python?",
      options: [
        "['user_id']",
        "{'id': 1}",
        "('user_id', 101)",
        "set([1, 2])",
      ],
      correctAnswer: 2,
      explanation: "Tuples (like ('user_id', 101)) are immutable and hashable, making them valid dictionary keys. Lists, dicts, and sets are mutable and unhashable.",
    },
    {
      id: "sa6-3",
      type: "multiple-choice",
      prompt: "What happens if you run: d = {'a': 1}; print(d.get('b', 100))?",
      options: [
        "Raises KeyError",
        "Prints None",
        "Prints 100",
        "Prints 0",
      ],
      correctAnswer: 2,
      explanation: "Key 'b' does not exist in d, so .get() returns the fallback default value 100 without raising an error.",
    },
  ],
  facilitatorNotes: {
    agendaItem: "Chapter 6: Collections (Lists & Dicts)",
    timingMinutes: 20,
    teachingGoal: "Solidify list of dictionaries mental model before students embark on Inbox Guardian.",
    commonMisconceptions: [
      "Assuming b = a copies a list.",
      "Thinking append() returns the updated list.",
      "Using non-existent keys with [] rather than .get().",
    ],
    discussionPrompts: [
      "Why is a list of dictionaries the universal interchange format for JSON and web APIs?",
      "How do dictionaries achieve O(1) instantaneous lookup compared to O(n) linear search in lists?",
    ],
    liveCodingCheckpoints: [
      "Demonstrate reference aliasing trap live by changing b and printing a.",
      "Unpack a dictionary using .items() with students.",
    ],
  },
};
