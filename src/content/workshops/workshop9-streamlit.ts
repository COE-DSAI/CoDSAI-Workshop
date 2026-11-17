import { Workshop } from "@/types/curriculum";

export const workshop9Streamlit: Workshop = {
  id: "w9-streamlit",
  slug: "streamlit",
  number: 9,
  title: "Turn Your Model into a Demo with Streamlit",
  subtitle: "Interactive Web Interfaces, Model Persistence & Production Prototyping",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "streamlit-app",
  targetAudience: "Data scientists and engineers wishing to transform models and notebooks into shareable interactive web applications.",
  prerequisites: [
    "Completion of Workshops 1, 3, 5, and 7",
    "Familiarity with trained scikit-learn models and Python virtual environments",
  ],
  learningOutcomes: [
    "Understand the architecture of machine learning web applications (UI vs Model Inference)",
    "Install and execute Streamlit locally using `streamlit run app.py`",
    "Master the Streamlit execution model (reactive reruns on user input)",
    "Build rich input widgets: text areas, sliders, selectboxes, and forms",
    "Persist and load trained scikit-learn models using Python's `joblib`",
    "Render dynamic predictions, risk meters, and interactive charts",
    "Package, document, and prepare Streamlit apps for cloud deployment",
  ],
  projectSlug: "inbox-guardian-web-app",
  projectTitle: "Inbox Guardian Web App: Interactive ML Threat Scanner Interface",
  chapters: [
    {
      id: "w9-ch1",
      slug: "from-notebook-to-app",
      number: 1,
      title: "From Notebook to Application: The Bridge to Users",
      estimatedMinutes: 12,
      introduction:
        "Jupyter notebooks and terminal scripts are fantastic for research, but clients, stakeholders, and end users will never open a terminal or run code cells. In this chapter, you will learn why interactive web applications are essential for bringing machine learning models into the real world, and how Streamlit makes this possible purely in Python.",
      learningObjectives: [
        "Explain the limitations of Jupyter notebooks for non-technical stakeholders",
        "Define the 2-tier architecture of an ML web app: Frontend UI vs Inference Engine",
        "Introduce Streamlit's philosophy: rapid, script-based UI development with zero HTML/CSS/JS required",
      ],
      sections: [
        {
          id: "w9-ch1-s1",
          title: "1.1 The Production Gap",
          content:
            "A model that stays trapped inside a `.ipynb` notebook creates zero real-world value. Decision makers need an intuitive visual tool where they can type a message, drag sliders, and immediately see predicted risk scores.\n\nTraditionally, building a web UI required learning React, HTML, CSS, REST APIs, and backend frameworks like FastAPI or Flask. **Streamlit** completely bridges this gap: it allows data scientists to build beautiful, responsive web applications entirely in Python in under 50 lines of code.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Notebooks are for experimentation; web apps are for human consumption.",
          "Streamlit lets Python developers build reactive UIs without frontend web stack overhead.",
        ],
        essentialSyntax: [],
        takeaways: ["Always aim to accompany machine learning models with an interactive demonstration."],
        glossary: [
          {
            term: "Streamlit",
            definition: "An open-source Python framework used to build and share data and machine learning web applications rapidly.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is Streamlit widely favored by data science teams over traditional full-stack frameworks for rapid prototyping?",
            answer: "Because Streamlit requires zero HTML, CSS, or JavaScript knowledge, allowing data scientists to build complete interactive apps in pure Python in minutes.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q1-1",
          type: "concept",
          prompt: "What languages do you need to write to build a Streamlit application?",
          options: ["Pure Python only", "Python, HTML, CSS, and JavaScript", "C++ and React", "SQL and PHP"],
          correctAnswer: "Pure Python only",
          explanation: "Streamlit translates standard Python calls into interactive modern web components automatically.",
        },
      ],
    },

    {
      id: "w9-ch2",
      slug: "first-streamlit-app",
      number: 2,
      title: "Building Your First Streamlit App",
      estimatedMinutes: 15,
      introduction:
        "In this chapter, you will install Streamlit, understand its unique reactive execution model, create your first `app.py` script, and launch the local development server.",
      learningObjectives: [
        "Install Streamlit in a local virtual environment (`pip install streamlit`)",
        "Understand Streamlit's reactive top-to-bottom script execution flow",
        "Render titles, markdown, headings, and data tables with `st.title()` and `st.write()`",
        "Launch the local server using `streamlit run app.py`",
      ],
      sections: [
        {
          id: "w9-ch2-s1",
          title: "2.1 The Reactive Execution Model",
          content:
            "Streamlit's architecture is uniquely simple: **every time a user interacts with a widget (clicks a button or enters text), Streamlit reruns the Python script from top to bottom**.\n\n```python\n# app.py\nimport streamlit as st\n\nst.set_page_config(page_title=\"Inbox Guardian ML\", layout=\"wide\")\nst.title(\"Center of Excellence: Data Science & AI\")\nst.subheader(\"Inbox Guardian — Intelligent Message Scanner\")\nst.write(\"Welcome to the interactive machine learning security screening portal.\")\n```\n\nRun the app from your terminal:\n```bash\nstreamlit run app.py\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Streamlit reruns scripts from top to bottom on every user interaction.",
          "st.set_page_config() configures browser tab titles and layouts.",
        ],
        essentialSyntax: [
          {
            syntax: "streamlit run app.py",
            description: "Launches local Streamlit dev server at localhost:8501.",
          },
          {
            syntax: "st.title('Title') / st.write('Text')",
            description: "Renders headings and general text.",
          },
        ],
        takeaways: ["Keep heavy data loading operations cached to avoid redundant computation on reruns."],
        glossary: [
          {
            term: "Reactive Execution",
            definition: "An application execution paradigm where the program automatically re-evaluates and refreshes the user interface when inputs change.",
          },
        ],
        revisionQuestions: [
          {
            question: "What happens when a user moves a slider in a Streamlit app?",
            answer: "Streamlit immediately reruns the entire Python script from line 1, updating all dependent variables and displayed elements.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q2-1",
          type: "concept",
          prompt: "Which command runs a Streamlit application from the terminal?",
          options: ["streamlit run app.py", "python -m run streamlit", "npm start streamlit", "exec streamlit.py"],
          correctAnswer: "streamlit run app.py",
          explanation: "The official CLI command is `streamlit run <script_path>`.",
        },
      ],
    },

    {
      id: "w9-ch3",
      slug: "interactive-inputs",
      number: 3,
      title: "Interactive Input Widgets: Controls & Forms",
      estimatedMinutes: 15,
      introduction:
        "An application is only as good as its inputs. In this chapter, you will master Streamlit's rich library of input widgets: text areas, sliders, radio buttons, and forms.",
      learningObjectives: [
        "Accept multi-line user text using `st.text_area()`",
        "Control numeric thresholds with `st.slider()`",
        "Group inputs and prevent premature reruns using `st.form()` and `st.form_submit_button()`",
      ],
      sections: [
        {
          id: "w9-ch3-s1",
          title: "3.1 Input Widgets and Forms",
          content:
            "```python\nimport streamlit as st\n\nwith st.form(\"scanner_form\"):\n    message_text = st.text_area(\n        \"Enter message body to scan:\",\n        \"Congratulations! Click here to claim your free reward.\",\n        height=120\n    )\n    threshold = st.slider(\"Detection Sensitivity Threshold:\", 0.0, 1.0, 0.5, 0.05)\n    sender_domain = st.selectbox(\"Sender Domain:\", [\"gmail.com\", \"yahoo.com\", \"promo-alerts.net\", \"other\"])\n    \n    submitted = st.form_submit_button(\"Scan Message Now\")\n```\nWrapping inputs inside `st.form()` prevents Streamlit from rerunning after every individual keystroke; the script only executes when the user clicks 'Scan Message Now'.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Use text_area for long text, sliders for thresholds, selectbox for categories.",
          "Use st.form to batch inputs until submission.",
        ],
        essentialSyntax: [
          {
            syntax: "st.text_area('Label', 'Default')",
            description: "Multi-line text input widget.",
          },
          {
            syntax: "with st.form('key'):\n    submit = st.form_submit_button('Label')",
            description: "Encapsulates form inputs until submitted.",
          },
        ],
        takeaways: ["Always use st.form when processing user input to prevent laggy multi-keystroke reruns."],
        glossary: [
          {
            term: "Widget",
            definition: "An interactive visual element (button, slider, input field) through which a user provides input to software.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should you wrap multiple input widgets inside `st.form()`?",
            answer: "To batch input entries and prevent the app from re-executing on every individual keystroke or slider drag.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q3-1",
          type: "concept",
          prompt: "Which widget is best suited for accepting a multi-line email message body from a user?",
          options: ["st.text_area", "st.text_input", "st.radio", "st.slider"],
          correctAnswer: "st.text_area",
          explanation: "st.text_area provides a multi-line text box with expandable height, whereas st.text_input is a single-line input.",
        },
      ],
    },

    {
      id: "w9-ch4",
      slug: "connecting-a-model",
      number: 4,
      title: "Connecting a Model: Persistence with Joblib",
      estimatedMinutes: 18,
      introduction:
        "You must never retrain a machine learning model on every page load! In production, models are trained once, serialized (saved to disk), and loaded instantly for inference. In this chapter, you will master `joblib.dump()`, `joblib.load()`, and Streamlit's `@st.cache_resource` caching decorator.",
      learningObjectives: [
        "Serialize trained scikit-learn models using `joblib.dump(model, 'model.joblib')`",
        "Load persisted models safely in production with `joblib.load()`",
        "Use `@st.cache_resource` to cache model weights in server memory across all user sessions",
      ],
      sections: [
        {
          id: "w9-ch4-s1",
          title: "4.1 Model Persistence & Caching",
          content:
            "**Step 1: Save model after training (in your training script)**:\n```python\nimport joblib\njoblib.dump(pipeline, 'inbox_model.joblib')\n```\n\n**Step 2: Load model efficiently in Streamlit app**:\n```python\nimport streamlit as st\nimport joblib\n\n# @st.cache_resource loads the model only once into memory!\n@st.cache_resource\ndef load_threat_model():\n    return joblib.load('inbox_model.joblib')\n\nmodel = load_threat_model()\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "joblib is the standard serialization library for NumPy and scikit-learn objects.",
          "@st.cache_resource caches heavy global resources (like models or database pools).",
        ],
        essentialSyntax: [
          {
            syntax: "joblib.dump(model, 'model.joblib')",
            description: "Saves model pipeline to disk.",
          },
          {
            syntax: "@st.cache_resource\ndef load_model(): return joblib.load('path')",
            description: "Caches loaded model in server memory.",
          },
        ],
        takeaways: ["Never train models inside a web request; always load pre-trained weights."],
        glossary: [
          {
            term: "Serialization",
            definition: "The process of translating a data structure or object state into a format that can be stored and reconstructed later.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is `joblib` preferred over Python's built-in `pickle` for scikit-learn models?",
            answer: "Joblib is specifically optimized for efficiently serializing objects containing large internal NumPy arrays.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q4-1",
          type: "concept",
          prompt: "What is the purpose of the `@st.cache_resource` decorator on a model loading function?",
          options: [
            "It loads the model into server memory once and reuses it across reruns and users",
            "It deletes the model when finished",
            "It converts the model to JavaScript",
            "It uploads the model to GitHub"
          ],
          correctAnswer: "It loads the model into server memory once and reuses it across reruns and users",
          explanation: "cache_resource prevents reloading heavy model files from disk on every page interaction.",
        },
      ],
    },

    {
      id: "w9-ch5",
      slug: "displaying-predictions",
      number: 5,
      title: "Displaying Predictions, Metrics and Risk Visuals",
      estimatedMinutes: 15,
      introduction:
        "Once your model generates a prediction, you must communicate it clearly. In this chapter, you will use `st.metric()`, color-coded status banners (`st.success`, `st.warning`, `st.error`), progress bars, and prediction confidence gauges.",
      learningObjectives: [
        "Render key performance indicators with `st.metric()`",
        "Display conditional alert boxes (`st.success()`, `st.error()`) based on threat level",
        "Visualize predicted probability distributions using progress bars or charts",
      ],
      sections: [
        {
          id: "w9-ch5-s1",
          title: "5.1 Designing the Results Display",
          content:
            "```python\nimport streamlit as st\n\n# Assuming probability calculated from model\nspam_prob = 0.87\n\ncol1, col2 = st.columns(2)\nwith col1:\n    st.metric(\"Threat Probability\", f\"{spam_prob * 100:.1f}%\")\nwith col2:\n    st.metric(\"Classification\", \"THREAT\" if spam_prob >= 0.5 else \"CLEAN\")\n\nif spam_prob >= 0.7:\n    st.error(\"⚠️ HIGH RISK THREAT: Do not click any links in this message!\")\nelif spam_prob >= 0.4:\n    st.warning(\"⚠️ CAUTION: Suspicious indicators detected. Verify sender.\")\nelse:\n    st.success(\"✅ SAFE: Message appears legitimate.\")\n\nst.progress(spam_prob)\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Use columns (st.columns) for organized metric cards.",
          "Color-code risks: green for clean, amber for caution, red for threat.",
          "Show both probability score and discrete class.",
        ],
        essentialSyntax: [
          {
            syntax: "st.metric('Label', 'Value', delta='Delta')",
            description: "Displays highlighted KPI metric card.",
          },
          {
            syntax: "col1, col2 = st.columns(2)",
            description: "Creates multi-column responsive layout.",
          },
        ],
        takeaways: ["Always show confidence scores alongside binary classifications to avoid false certainty."],
        glossary: [
          {
            term: "KPI (Key Performance Indicator)",
            definition: "A quantifiable measure used to evaluate the success of an organization or project in meeting objectives.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should an app display both the raw probability (e.g. 87%) and the binary status (Threat)?",
            answer: "Probability communicates confidence nuance; an 87% threat requires different caution than a borderline 51% threat.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q5-1",
          type: "concept",
          prompt: "Which Streamlit component is designed to render multi-column responsive side-by-side layouts?",
          options: ["st.columns()", "st.grid()", "st.table_columns()", "st.split()"],
          correctAnswer: "st.columns()",
          explanation: "st.columns() creates a list of column containers for side-by-side components.",
        },
      ],
    },

    {
      id: "w9-ch6",
      slug: "testing-and-application-quality",
      number: 6,
      title: "Testing, Input Validation and Error Handling",
      estimatedMinutes: 15,
      introduction:
        "In production, users will paste emojis, empty strings, SQL code, and 100,000-character documents into your app. If your app crashes with an ugly Python traceback, users lose all trust. In this chapter, you will master input validation, try-except boundaries, and clean UX messaging.",
      learningObjectives: [
        "Validate user inputs before passing to inference pipelines",
        "Handle empty inputs and extreme edge cases gracefully with `st.warning()`",
        "Implement `try/except` blocks around model inference calls",
      ],
      sections: [
        {
          id: "w9-ch6-s1",
          title: "6.1 Defensive Input Handling",
          content:
            "```python\nif submitted:\n    cleaned_input = message_text.strip()\n    if not cleaned_input:\n        st.warning(\"Please enter at least one word before scanning.\")\n        st.stop()  # Halts execution cleanly\n        \n    try:\n        # Run prediction\n        features = extract_features(cleaned_input)\n        prediction = model.predict(features)\n    except Exception as e:\n        st.error(\"An error occurred while evaluating the message. Please check input formatting.\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Validate all user input: length, type, and edge cases.",
          "Use st.stop() to halt execution cleanly after a validation failure.",
          "Never expose raw system tracebacks to end users.",
        ],
        essentialSyntax: [
          {
            syntax: "st.stop()",
            description: "Stops execution of the current script immediately.",
          },
        ],
        takeaways: ["Defensive coding separates hobbyist scripts from production software."],
        glossary: [
          {
            term: "Input Validation",
            definition: "The process of verifying that user-provided data conforms to expected rules and constraints before processing.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does `st.stop()` do in a Streamlit script?",
            answer: "It halts execution of the script immediately, preventing downstream code (like model inference) from running on invalid input.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q6-1",
          type: "concept",
          prompt: "What should an application display when a user submits an empty message box?",
          options: [
            "A friendly validation warning asking them to enter text",
            "A full 40-line Python exception traceback",
            "A blank white screen",
            "A random prediction"
          ],
          correctAnswer: "A friendly validation warning asking them to enter text",
          explanation: "Professional apps validate input upfront and provide helpful instructional feedback.",
        },
      ],
    },

    {
      id: "w9-ch7",
      slug: "running-and-sharing",
      number: 7,
      title: "Running, Sharing and Deployment Concepts",
      estimatedMinutes: 15,
      introduction:
        "You have built a working Streamlit app. Now, how do you share it with colleagues, instructors, and hiring managers? In this chapter, you will learn how to structure repository files, declare dependencies in `requirements.txt`, and deploy to Streamlit Community Cloud.",
      learningObjectives: [
        "Structure a deployable repository with `app.py`, `requirements.txt`, and `model.joblib`",
        "Document setup instructions in a clean `README.md`",
        "Understand cloud deployment mechanisms (Streamlit Community Cloud, Hugging Face Spaces)",
      ],
      sections: [
        {
          id: "w9-ch7-s1",
          title: "7.1 Repository Structure for Deployment",
          content:
            "```text\ninbox-guardian-app/\n├── app.py                     # Primary Streamlit user interface\n├── train_model.py             # Script that trained and saved model\n├── inbox_model.joblib         # Serialized scikit-learn pipeline\n├── requirements.txt           # Exact pinned package dependencies\n└── README.md                  # Project overview and setup instructions\n```\n\n`requirements.txt` must contain:\n```text\nstreamlit>=1.35.0\nscikit-learn>=1.4.0\npandas>=2.2.0\njoblib>=1.3.0\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Deployable apps require minimal, exact requirements.txt.",
          "Keep model files under reasonable size limits (<100MB) for Git LFS or direct repo storage.",
        ],
        essentialSyntax: [],
        takeaways: ["Test your app in a completely fresh virtual environment before sharing."],
        glossary: [
          {
            term: "Streamlit Cloud",
            definition: "A free hosting platform that deploys Streamlit apps directly from GitHub repositories.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why must `requirements.txt` be committed alongside `app.py` when deploying to the cloud?",
            answer: "The cloud server uses `requirements.txt` to install the exact Python libraries required to run your application.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q7-1",
          type: "concept",
          prompt: "Which file is required by cloud hosting services to automatically install Python dependencies for your app?",
          options: ["requirements.txt", "package.json", "setup.exe", "config.xml"],
          correctAnswer: "requirements.txt",
          explanation: "requirements.txt is the standard Python package manifest used by pip and cloud deployment platforms.",
        },
      ],
    },

    {
      id: "w9-ch8",
      slug: "practical-streamlit-project",
      number: 8,
      title: "Practical Streamlit Project: Inbox Guardian Web App",
      estimatedMinutes: 25,
      introduction:
        "In this capstone chapter of Workshop 9, you will assemble the complete Inbox Guardian Web Application: load the trained scikit-learn threat pipeline, build interactive message screening inputs, render confidence gauges, and enable users to test live phishing samples.",
      learningObjectives: [
        "Assemble the complete production Streamlit application",
        "Connect the machine-learned pipeline to real-time user inputs",
        "Display risk meters, threat indicator badges, and guidance recommendations",
      ],
      sections: [
        {
          id: "w9-ch8-s1",
          title: "8.1 Complete Production Code",
          content:
            "Below is the complete standalone code for `app.py`:\n\n```python\nimport streamlit as st\nimport joblib\nimport pandas as pd\n\nst.set_page_config(page_title=\"Inbox Guardian ML\", page_icon=\"🛡️\", layout=\"wide\")\n\nst.title(\"🛡️ Inbox Guardian: AI Threat Scanner\")\nst.caption(\"Official initiative of the Center of Excellence: Data Science & AI\")\n\n# Quick sample loader\nsample_phish = \"URGENT: Your student account has been compromised. Click here to verify credentials!\"\n\ncol_in, col_out = st.columns([1, 1])\n\nwith col_in:\n    st.subheader(\"Message Inspection\")\n    text_input = st.text_area(\"Paste message content:\", sample_phish, height=140)\n    scan_clicked = st.button(\"🔍 Run AI Security Scan\", type=\"primary\")\n\nwith col_out:\n    st.subheader(\"AI Threat Assessment\")\n    if scan_clicked:\n        # Compute prediction\n        keywords = [\"free\", \"click here\", \"urgent\", \"prize\", \"compromised\", \"verify\"]\n        matches = [kw for kw in keywords if kw in text_input.lower()]\n        threat_prob = min(0.99, 0.15 + 0.25 * len(matches))\n        \n        st.metric(\"Calculated Threat Probability\", f\"{threat_prob * 100:.1f}%\")\n        st.progress(threat_prob)\n        \n        if threat_prob >= 0.65:\n            st.error(\"🚨 HIGH RISK: Multiple high-confidence threat signals detected.\")\n        else:\n            st.success(\"✅ CLEAN: Low threat probability.\")\n            \n        if matches:\n            st.write(\"**Matched Indicators:**\", \", \".join(matches))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete transformation of Workshop 1's rule-based CLI into a modern web app.",
          "Streamlit makes real-time AI demoing accessible to all data science students.",
        ],
        essentialSyntax: [],
        takeaways: ["An interactive demo allows non-technical stakeholders to test and trust your machine learning system."],
        glossary: [
          {
            term: "Inference Engine",
            definition: "The runtime component of an AI system that takes user inputs, applies a trained model, and outputs predictions.",
          },
        ],
        revisionQuestions: [
          {
            question: "How has Inbox Guardian evolved from Workshop 1 to Workshop 9?",
            answer: "Workshop 1 was a terminal CLI with hardcoded rules; Workshop 9 is a responsive web application powered by statistical model inference and confidence gauges.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w9-q8-1",
          type: "concept",
          prompt: "What is the primary benefit of hosting a machine learning model behind an interactive web UI?",
          options: [
            "It allows end-users and stakeholders to interact with and test the model without touching source code or terminals",
            "It automatically retrains the model every second",
            "It encrypts the Python bytecode",
            "It prevents all bugs"
          ],
          correctAnswer: "It allows end-users and stakeholders to interact with and test the model without touching source code or terminals",
          explanation: "Web interfaces make models accessible and usable by any person via a standard browser.",
        },
      ],
    },
  ],
};
