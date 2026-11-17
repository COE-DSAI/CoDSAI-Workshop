import { Workshop } from "@/types/curriculum";
import { chapter1 } from "./workshop1/chapter1";
import { chapter2 } from "./workshop1/chapter2";
import { chapter3 } from "./workshop1/chapter3";
import { chapter4 } from "./workshop1/chapter4";
import { chapter5 } from "./workshop1/chapter5";
import { chapter6 } from "./workshop1/chapter6";
import { chapter7 } from "./workshop1/chapter7";
import { chapter8 } from "./workshop1/chapter8";

export const workshop1Python: Workshop = {
  id: "w1-python-foundations",
  slug: "python-foundations",
  number: 1,
  title: "Python Foundations: Build Inbox Guardian",
  subtitle: "Core Python Programming & Rule-Based Message Analysis",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "browser-python",
  targetAudience:
    "Students and beginners starting their computational journey in data science and software engineering.",
  prerequisites: [
    "No prior programming experience required",
    "Basic computer literacy and a modern web browser",
  ],
  learningOutcomes: [
    "Understand the Python execution model and write structured, error-free Python programs",
    "Work confidently with fundamental data types, type conversions, and formatted strings",
    "Manipulate and inspect text using string indexing, slicing, and built-in text methods",
    "Implement branching decision logic using comparison and logical operators with short-circuiting",
    "Automate repetitive tasks with for-loops, while-loops, enumerate(), and range generators",
    "Structure structured in-memory datasets using lists, dictionaries, and nested collections",
    "Design modular, reusable functions with parameters, return statements, and local scopes",
    "Architect, implement, and test Inbox Guardian — a complete rule-based email threat scanner",
  ],
  projectSlug: "inbox-guardian",
  projectTitle: "Inbox Guardian — Personal Message Scanner",
  chapters: [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    chapter7,
    chapter8,
  ],
};
