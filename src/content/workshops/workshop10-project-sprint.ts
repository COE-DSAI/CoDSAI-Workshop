import { Workshop } from "@/types/curriculum";

export const workshop10ProjectSprint: Workshop = {
  id: "w10-project-sprint",
  slug: "project-sprint",
  number: 10,
  title: "Project Sprint & Showcase: From Notebook to Portfolio",
  subtitle: "Full-Cycle Capstone Sprint, Portfolio Engineering & Technical Presentation",
  durationMinutes: 120,
  difficulty: "Advanced",
  executionMode: "local-project",
  targetAudience: "Students synthesizing their complete journey into a polished, public, portfolio-ready data science project.",
  prerequisites: [
    "Completion of Workshops 1 through 9",
    "Mastery of Python, Git, NumPy, Pandas, visualization, ML modeling, and Streamlit",
  ],
  learningOutcomes: [
    "Scope and define a viable, high-impact data science problem with measurable success criteria",
    "Source, audit, and clean an authentic real-world dataset",
    "Conduct thorough exploratory analysis and document evidence-based insights",
    "Train, tune, and cross-validate competing baseline and candidate machine learning models",
    "Integrate the trained model into a functional, user-facing Streamlit web application",
    "Collaborate using Git feature branches, pull requests, and automated code reviews",
    "Author comprehensive project documentation, system architecture diagrams, and reproduction guides",
    "Deliver a persuasive, technically rigorous 5-minute project showcase presentation",
  ],
  projectSlug: "portfolio-capstone",
  projectTitle: "Production Capstone: End-to-End Portfolio Machine Learning Application",
  chapters: [
    {
      id: "w10-ch1",
      slug: "choosing-a-problem",
      number: 1,
      title: "Choosing a Problem: Scoping, Feasibility and Value",
      estimatedMinutes: 12,
      introduction:
        "The most common reason machine learning projects fail is not bad math — it is choosing the wrong problem. In this chapter, you will learn how to identify feasible, valuable problems that can be solved with data, define target users, and avoid scope creep.",
      learningObjectives: [
        "Evaluate project feasibility across data availability, problem complexity, and sprint timeline",
        "Define clear target user personas and operational value propositions",
        "Formulate a quantitative project objective statement",
      ],
      sections: [
        {
          id: "w10-ch1-s1",
          title: "1.1 The Scoping Checklist",
          content:
            "Before writing any code, answer these four critical questions:\n1. **Is there historical data with clear labels?** If data does not exist or cannot be obtained ethically, stop.\n2. **Is it a machine learning problem?** If simple deterministic rules solve it 100% reliably, do not use machine learning.\n3. **What is the measurable metric of success?** (e.g. 'Achieve F1 >= 0.85 on test messages while keeping false positive rate under 3%').\n4. **Can an MVP be delivered within the sprint timeframe?**",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Good projects start with real user needs, not algorithm novelty.",
          "Feasibility requires accessible data, clear metrics, and bounded scope.",
        ],
        essentialSyntax: [],
        takeaways: ["A small, fully finished project beats an ambitious, unfinished prototype every time."],
        glossary: [
          {
            term: "MVP (Minimum Viable Product)",
            definition: "A version of a product with just enough features to be usable by early customers who can then provide feedback.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you avoid choosing a project that requires training an AI model on data you have not yet collected?",
            answer: "Data collection, cleaning, and labeling almost always takes twice as long as anticipated, threatening sprint delivery.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q1-1",
          type: "concept",
          prompt: "What is the most crucial requirement before confirming a supervised machine learning project?",
          options: [
            "Verifying the availability of high-quality historical data with ground-truth labels",
            "Buying an expensive GPU",
            "Designing a fancy logo",
            "Writing 1,000 lines of code"
          ],
          correctAnswer: "Verifying the availability of high-quality historical data with ground-truth labels",
          explanation: "Supervised ML cannot begin without validated, accessible training data.",
        },
      ],
    },

    {
      id: "w10-ch2",
      slug: "dataset-selection-and-planning",
      number: 2,
      title: "Dataset Selection, Licensing and Sprint Planning",
      estimatedMinutes: 15,
      introduction:
        "Where do you find trustworthy datasets? How do you ensure legal licensing and split sprint responsibilities among team members? In this chapter, you will navigate public data repositories, evaluate dataset licenses, and organize sprint milestones.",
      learningObjectives: [
        "Source authentic datasets from Kaggle, UCI ML Repository, and open government data portals",
        "Check dataset licenses (MIT, Apache, CC-BY) for educational and public showcase reuse",
        "Establish team roles (Data Engineer, Modeling Specialist, UI/App Engineer, Quality Lead)",
      ],
      sections: [
        {
          id: "w10-ch2-s1",
          title: "2.1 Trusted Data Sources and Licensing",
          content:
            "- **Kaggle Datasets**: Large variety of community and enterprise datasets.\n- **UCI Machine Learning Repository**: Curated academic datasets with well-documented provenance.\n- **Hugging Face Hub**: World-class NLP, speech, and tabular datasets.\n\nAlways verify license terms to confirm permission for non-commercial educational sharing.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Always verify data provenance and license permissions.",
          "Clear role division prevents team members from stepping on each other's toes.",
        ],
        essentialSyntax: [],
        takeaways: ["Acknowledge and cite original dataset authors in your README."],
        glossary: [
          {
            term: "Provenance",
            definition: "The chronology of the ownership, custody, or location of a historical record or dataset.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you check the license of an open-source dataset before using it in a public portfolio?",
            answer: "To ensure that redistribution, derivative works, and public demonstrations are legally permitted.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q2-1",
          type: "concept",
          prompt: "Which data repository is maintained by the University of California, Irvine as an academic benchmark gold-standard?",
          options: ["UCI Machine Learning Repository", "Wikipedia", "StackOverflow", "Reddit Data Hub"],
          correctAnswer: "UCI Machine Learning Repository",
          explanation: "The UCI ML repository has provided curated, peer-reviewed benchmark datasets for decades.",
        },
      ],
    },

    {
      id: "w10-ch3",
      slug: "data-exploration-sprint",
      number: 3,
      title: "Data Exploration & Feature Engineering Sprint",
      estimatedMinutes: 15,
      introduction:
        "In this phase of the sprint, you will apply the techniques from Workshops 3 and 4 to profile your capstone dataset, identify anomalies, and engineer high-signal predictive features.",
      learningObjectives: [
        "Conduct structured EDA to verify target class balance and distribution shapes",
        "Engineer domain-specific features (e.g. text length ratios, interaction terms)",
        "Isolate and remove leaky or uninformative identifier columns",
      ],
      sections: [
        {
          id: "w10-ch3-s1",
          title: "3.1 Feature Engineering Best Practices",
          content:
            "Good features beat complex algorithms. In threat classification, transform raw text into measurable numerical indicators:\n- Character count and token count\n- Ratio of uppercase characters (shouting / urgency indicator)\n- Punctuation density (excessive exclamation marks `!!!`)\n- Presence of suspicious URL domains or IP addresses",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Feature engineering converts raw data into informative predictive inputs.",
          "Always test feature correlations with target y during EDA.",
        ],
        essentialSyntax: [],
        takeaways: ["Feature engineering is where domain knowledge delivers massive performance gains."],
        glossary: [
          {
            term: "Feature Engineering",
            definition: "The process of using domain knowledge to extract features from raw data via data mining techniques.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is the percentage of uppercase letters an informative engineered feature for detecting phishing emails?",
            answer: "Scam and phishing messages frequently use ALL CAPS to manufacture artificial urgency, creating a distinctive statistical signal.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q3-1",
          type: "concept",
          prompt: "What is feature engineering?",
          options: [
            "Creating new, informative input variables from existing raw data to improve model learning",
            "Buying new hardware features",
            "Deleting all numerical columns",
            "Writing comments in code"
          ],
          correctAnswer: "Creating new, informative input variables from existing raw data to improve model learning",
          explanation: "Feature engineering transforms domain knowledge into numerical signals.",
        },
      ],
    },

    {
      id: "w10-ch4",
      slug: "model-development-sprint",
      number: 4,
      title: "Model Development: Baseline to Candidate Champion",
      estimatedMinutes: 18,
      introduction:
        "Now the modeling specialist executes the tournament designed in Workshop 8: establish a trivial baseline, train candidate estimators, perform 5-fold cross-validation, and select the final champion pipeline.",
      learningObjectives: [
        "Train heuristic/dummy baseline benchmark",
        "Evaluate at least two distinct algorithm families (e.g. Logistic Regression vs Random Forest)",
        "Select champion model based on validation metrics and latency trade-offs",
        "Serialize champion pipeline using `joblib`",
      ],
      sections: [
        {
          id: "w10-ch4-s1",
          title: "4.1 Candidate Tournament Summary Table",
          content:
            "Document your tournament in your project report:\n\n| Model | CV F1-Score | Train Time | Inference Latency | Selected? |\n|---|---|---|---|---|\n| Naive Baseline | 0.49 ± 0.00 | <1ms | <1ms | No (floor benchmark) |\n| **Logistic Regression** | **0.91 ± 0.02** | **12ms** | **<1ms** | **YES (Champion)** |\n| Random Forest | 0.93 ± 0.03 | 450ms | 18ms | Alternative |",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Document tournament metrics systematically.",
          "Pick the champion model based on both accuracy and production viability.",
        ],
        essentialSyntax: [],
        takeaways: ["A well-documented comparison proves engineering maturity to employers."],
        glossary: [
          {
            term: "Champion Model",
            definition: "The candidate model that outperforms all competing algorithms in rigorous validation benchmarks and is selected for production deployment.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why might a team choose a champion model with 91% F1 over a competitor with 93% F1?",
            answer: "If the 91% model is 40 times faster, uses 1/10th the memory, and provides fully explainable coefficients.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q4-1",
          type: "concept",
          prompt: "In a professional machine learning project, what is a 'Champion Model'?",
          options: [
            "The model that wins the benchmark tournament and is selected for production deployment",
            "The most expensive model",
            "A model trained by the instructor",
            "A model with 100% training accuracy"
          ],
          correctAnswer: "The model that wins the benchmark tournament and is selected for production deployment",
          explanation: "The champion is the thoroughly validated winner among candidate algorithms.",
        },
      ],
    },

    {
      id: "w10-ch5",
      slug: "application-integration-sprint",
      number: 5,
      title: "Application Integration: The Streamlit Showcase UI",
      estimatedMinutes: 18,
      introduction:
        "The application developer takes the serialized champion model and wires it into a polished, responsive Streamlit web application with custom branding, sample selectors, and actionable risk recommendations.",
      learningObjectives: [
        "Connect serialized champion model into Streamlit interface",
        "Incorporate official Center of Excellence branding standards",
        "Provide pre-loaded test cases for instant 1-click evaluator demonstration",
      ],
      sections: [
        {
          id: "w10-ch5-s1",
          title: "5.1 Evaluator-Friendly UI Design",
          content:
            "When presenting to recruiters or stakeholders, never make them type long paragraphs just to see if the app works! Provide pre-loaded dropdown samples:\n- 'Sample 1: University Schedule Update (Clean)'\n- 'Sample 2: Urgent Account Suspension Phish (Malicious)'\n- 'Sample 3: Promo Discount Offer (Borderline)'",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Pre-loaded samples make live demonstrations smooth and impressive.",
          "Maintain clean branding and accessible typography.",
        ],
        essentialSyntax: [],
        takeaways: ["Test your UI on mobile and desktop viewports."],
        glossary: [
          {
            term: "Demo Readiness",
            definition: "The state of an application being fully prepared with sample inputs and reliable defaults for seamless demonstration.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why are pre-loaded demo buttons critical during live portfolio presentations?",
            answer: "They eliminate typing errors, maintain presentation momentum, and guarantee reliable demonstrability within strict time limits.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q5-1",
          type: "concept",
          prompt: "Why should an interactive demo include pre-configured sample inputs?",
          options: [
            "It allows evaluators and interviewers to immediately test key scenarios with a single click",
            "It hides real code",
            "It reduces server memory",
            "It speeds up model fitting"
          ],
          correctAnswer: "It allows evaluators and interviewers to immediately test key scenarios with a single click",
          explanation: "Pre-loaded samples showcase the full spectrum of capabilities smoothly.",
        },
      ],
    },

    {
      id: "w10-ch6",
      slug: "collaboration-and-git-sprint",
      number: 6,
      title: "Team Collaboration: Pull Requests & Repository Polish",
      estimatedMinutes: 15,
      introduction:
        "A great project with messy Git commits looks amateur. In this chapter, you will review your repository hygiene, verify that `.gitignore` prevented virtual environments from leaking, squash messy commits, and write a stellar `README.md`.",
      learningObjectives: [
        "Audit repository history and verify clean commit conventions",
        "Verify absence of API keys, `.env` files, or multi-gigabyte cache folders",
        "Author a comprehensive, beautifully formatted `README.md`",
      ],
      sections: [
        {
          id: "w10-ch6-s1",
          title: "6.1 Final Repository Hygiene Audit",
          content:
            "Run this pre-flight checklist:\n- [ ] `README.md` contains badges, screenshots, architecture diagram, and setup instructions\n- [ ] `requirements.txt` contains only strictly necessary dependencies with pinned versions\n- [ ] No `.venv/`, `__pycache__/`, or `.DS_Store` files are tracked in Git\n- [ ] All functions have descriptive docstrings and type annotations",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "A polished GitHub repository is your technical resume.",
          "Check git status and git log before publishing.",
        ],
        essentialSyntax: [],
        takeaways: ["Employers judge code quality by repository hygiene and documentation clarity."],
        glossary: [
          {
            term: "Repository Polish",
            definition: "The process of refining project structure, documentation, commit messages, and clean configuration before public release.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the first thing a technical hiring manager looks at on your GitHub repository?",
            answer: "The README.md overview, demo screenshots, and the cleanliness of recent commit messages.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q6-1",
          type: "concept",
          prompt: "Which of the following belongs in a public GitHub repository?",
          options: [
            "A well-documented README.md and clean source code",
            "A 2GB virtual environment folder (.venv)",
            "Private API secret keys in plain text",
            "Temporary OS thumbs.db files"
          ],
          correctAnswer: "A well-documented README.md and clean source code",
          explanation: "Virtual environments, OS artifacts, and secrets must be ignored by .gitignore.",
        },
      ],
    },

    {
      id: "w10-ch7",
      slug: "testing-and-documentation",
      number: 7,
      title: "Project Verification: Reproduction & Edge Cases",
      estimatedMinutes: 12,
      introduction:
        "Before presenting your project, you must verify that an independent person can clone your repository on another machine, run one command, and have everything work. In this chapter, you will conduct fresh-clone verification tests.",
      learningObjectives: [
        "Perform a clean-room verification in an isolated directory",
        "Test boundary edge cases (empty strings, extreme text lengths, non-English text)",
        "Document known limitations and future development roadmaps with complete honesty",
      ],
      sections: [
        {
          id: "w10-ch7-s1",
          title: "7.1 The Clean-Room Verification Test",
          content:
            "```bash\n# In a temporary folder:\ngit clone https://github.com/your-username/inbox-guardian-ml.git\ncd inbox-guardian-ml\npython -m venv test_env\nsource test_env/bin/activate\npip install -r requirements.txt\nstreamlit run app.py\n```\nIf this launches without a single missing module error, your project is reproduction-certified!",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Always test fresh clones in clean virtual environments.",
          "Be honest about edge cases and limitations.",
        ],
        essentialSyntax: [],
        takeaways: ["Documenting limitations demonstrates senior engineering maturity."],
        glossary: [
          {
            term: "Clean-Room Verification",
            definition: "Testing software setup and execution in a completely isolated environment containing zero pre-existing dependencies.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you perform a clean-room clone test before presenting?",
            answer: "To ensure you didn't forget to add a newly installed package to `requirements.txt`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q7-1",
          type: "concept",
          prompt: "What does clean-room verification test?",
          options: [
            "Whether the project can be cloned and run from scratch on a clean system without hidden dependencies",
            "The physical cleanliness of your computer keyboard",
            "The brightness of your monitor",
            "The speed of your home Wi-Fi"
          ],
          correctAnswer: "Whether the project can be cloned and run from scratch on a clean system without hidden dependencies",
          explanation: "It proves true independent reproducibility.",
        },
      ],
    },

    {
      id: "w10-ch8",
      slug: "presentation-and-showcase",
      number: 8,
      title: "The 5-Minute Technical Showcase: Pitch & Demo",
      estimatedMinutes: 15,
      introduction:
        "You have built a remarkable, end-to-end data science application. Now it is time to showcase your achievement. In this final chapter of the workshop series, you will master the 5-minute technical demo structure, articulate trade-offs, and add this capstone to your professional portfolio.",
      learningObjectives: [
        "Structure a high-impact 5-minute technical presentation (Problem -> Approach -> Demo -> Results -> Limitations)",
        "Deliver a live interactive demonstration with confidence and narrative flow",
        "Answer technical interrogation questions regarding metrics, model selection, and trade-offs",
        "Reflect on the complete journey from Workshop 1 (Python basics) to Workshop 10 (Production AI)",
      ],
      sections: [
        {
          id: "w10-ch8-s1",
          title: "8.1 The 5-Minute Pitch Formula",
          content:
            "1. **Minute 1: The Problem & Value** (What pain point does this solve and for whom?)\n2. **Minute 2: Data & Modeling Strategy** (Dataset provenance, baseline vs champion, key features)\n3. **Minute 3: Live Application Demo** (Show the Streamlit interface with 2 diverse test cases)\n4. **Minute 4: Results & Metrics** (Validation F1 scores, confusion matrix, metric trade-offs)\n5. **Minute 5: Limitations & Future Scope** (Ethical considerations, failure modes, next milestones)",
        },
        {
          id: "w10-ch8-s2",
          title: "8.2 The Full Journey Recap",
          content:
            "> [!NOTE]\n> **Look how far you have come!**\n>\n> In Workshop 1, you wrote your very first `print('Hello')` statement and built a simple keyword checker.\n>\n> By Workshop 10, you have mastered version control, vectorized computing with NumPy, tabular wrangling with Pandas, statistical visualization, machine learning pipelines, regression, classification, model governance, and interactive web application deployment.\n>\n> You are now a competent, practical data science practitioner ready to solve real-world problems.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "5-minute pitch: Problem, Approach, Demo, Results, Limitations.",
          "You have completed the entire 10-workshop sequence from foundations to portfolio.",
        ],
        essentialSyntax: [],
        takeaways: ["Celebrate your achievements and continue building data-driven systems!"],
        glossary: [
          {
            term: "Portfolio Showcase",
            definition: "A curated presentation of completed projects demonstrating technical competencies, practical problem solving, and communication skills to employers and peers.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you always include a 'Limitations' slide in a technical demo?",
            answer: "Because acknowledging edge cases and constraints proves you understand your system deeply and possess mature engineering honesty.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w10-q8-1",
          type: "concept",
          prompt: "What is the recommended closing topic of a professional technical showcase pitch?",
          options: [
            "Honest discussion of current model limitations and future development scope",
            "Apologizing for small bugs",
            "Asking for applause immediately",
            "Criticizing other tools"
          ],
          correctAnswer: "Honest discussion of current model limitations and future development scope",
          explanation: "Thoughtful articulation of boundaries and future roadmap demonstrates senior engineering perspective.",
        },
      ],
    },
  ],
};
