import { Workshop } from "@/types/curriculum";

export const workshop8ModelEvaluation: Workshop = {
  id: "w8-model-evaluation",
  slug: "model-evaluation",
  number: 8,
  title: "Model Evaluation, Improvement & Responsible ML",
  subtitle: "Cross-Validation, Feature Importance, Error Diagnosis & AI Ethics",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Practitioners moving models toward production readiness, ethical accountability, and robust performance.",
  prerequisites: [
    "Completion of Workshops 5, 6, and 7",
    "Understanding of training/testing splits, regression and classification metrics",
  ],
  learningOutcomes: [
    "Design rigorous evaluation protocols beyond single train-test splits",
    "Implement K-Fold Cross-Validation (`cross_val_score`, `StratifiedKFold`)",
    "Conduct scientifically controlled comparisons between candidate algorithms",
    "Extract and interpret feature importance weights and coefficients",
    "Ensure complete scientific reproducibility with seeds and environment specifications",
    "Audit datasets for demographic bias, representation gaps, and historical unfairness",
    "Diagnose error patterns systematically to guide targeted data collection",
    "Author a professional, balanced Model Evaluation & Responsible ML Governance Report",
  ],
  projectSlug: "model-audit-report",
  projectTitle: "Comprehensive Model Audit & Responsible AI Governance Report",
  chapters: [
    {
      id: "w8-ch1",
      slug: "why-evaluation-matters",
      number: 1,
      title: "Why Model Evaluation Matters Beyond a Single Score",
      estimatedMinutes: 12,
      introduction:
        "A single test score can be a fluke. A lucky train-test split might make a mediocre model look like a breakthrough. In this chapter, you will learn why robust evaluation requires statistical rigor, confidence intervals, and holistic assessment across subgroups.",
      learningObjectives: [
        "Explain split variance and why single-split metrics can be misleading",
        "Define model reliability, stability, and generalisation gap",
        "Evaluate model performance across sensitive subgroups",
      ],
      sections: [
        {
          id: "w8-ch1-s1",
          title: "1.1 The Pitfalls of Single Split Testing",
          content:
            "If your dataset has 200 samples, an 80/20 test set only contains 40 samples. A difference of just 2 misclassified items changes the test accuracy by a massive 5%!\n\nEvaluating a model requires understanding its **variance across different subsamples** of data, ensuring it performs reliably in real-world deployment.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Single test splits suffer from high variance on small or moderate datasets.",
          "Evaluation must assess fairness and robustness across subgroups.",
        ],
        essentialSyntax: [],
        takeaways: ["Never rely on a single train-test split for high-stakes decision systems."],
        glossary: [
          {
            term: "Split Variance",
            definition: "The variability in estimated test performance caused by different random splits of the data.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does K-Fold Cross-Validation provide a more dependable performance estimate than a single test split?",
            answer: "Because every single data point gets to be in the test fold exactly once, and results are averaged across K distinct experiments.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q1-1",
          type: "concept",
          prompt: "What is the primary danger of relying on a single test score from a small dataset?",
          options: [
            "High variance: luck or misfortune in the random split heavily skews the score",
            "Python will run out of memory",
            "The model stops training",
            "Scikit-learn refuses to predict"
          ],
          correctAnswer: "High variance: luck or misfortune in the random split heavily skews the score",
          explanation: "Small test sets have wide confidence intervals, meaning a single split can easily mislead developers.",
        },
      ],
    },

    {
      id: "w8-ch2",
      slug: "validation-and-cross-validation",
      number: 2,
      title: "Validation & Cross-Validation: K-Fold Protocols",
      estimatedMinutes: 18,
      introduction:
        "How do you tune model settings (hyperparameters) without cheating on your final test set? In this chapter, you will master the Train-Validation-Test paradigm and K-Fold Cross-Validation with scikit-learn.",
      learningObjectives: [
        "Structure a 3-way partition: Train, Validation, and Test sets",
        "Understand K-Fold Cross-Validation architecture (typically K=5 or K=10)",
        "Execute K-Fold evaluation using `cross_val_score()` and compute mean and standard deviation",
      ],
      sections: [
        {
          id: "w8-ch2-s1",
          title: "2.1 The K-Fold Cross-Validation Architecture",
          content:
            "1. Split training data into $K$ equal subsets (folds).\n2. For each iteration $k$ (1 through $K$):\n   - Hold out fold $k$ as the validation set.\n   - Train the model on the remaining $K-1$ folds.\n   - Score on fold $k$.\n3. Average the $K$ scores to obtain a robust estimate $\\mu \\pm \\sigma$.\n\n```python\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\n\nscores = cross_val_score(LogisticRegression(), X, y, cv=5, scoring='f1')\nprint(f\"5-Fold F1 Score: {scores.mean():.3f} (± {scores.std():.3f})\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "K-Fold evaluates model stability across K rotations.",
          "StratifiedKFold preserves class balance across every fold.",
          "Always report mean ± standard deviation.",
        ],
        essentialSyntax: [
          {
            syntax: "cross_val_score(estimator, X, y, cv=5, scoring='accuracy')",
            description: "Evaluates score by cross-validation.",
          },
        ],
        takeaways: ["A model with 0.88 ± 0.01 is vastly superior to a model with 0.90 ± 0.12 in stability."],
        glossary: [
          {
            term: "K-Fold Cross-Validation",
            definition: "A resampling procedure that uses K non-overlapping folds to test and validate a model iteratively.",
          },
        ],
        revisionQuestions: [
          {
            question: "In 5-Fold Cross-Validation, what percentage of the training data is used for validation during each fold?",
            answer: "20% (1/5) is used for validation, and the remaining 80% is used for training in each fold.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q2-1",
          type: "concept",
          prompt: "What does `scores.std()` tell you when evaluating 5-fold cross-validation scores?",
          options: [
            "The stability / variance of model performance across different data folds",
            "The time taken to train",
            "The total number of features",
            "The error in the dataset"
          ],
          correctAnswer: "The stability / variance of model performance across different data folds",
          explanation: "Standard deviation measures the spread of fold scores; lower standard deviation indicates higher model consistency.",
        },
      ],
    },

    {
      id: "w8-ch3",
      slug: "comparing-models",
      number: 3,
      title: "Comparing Models: Controlled Scientific Tournaments",
      estimatedMinutes: 15,
      introduction:
        "Data science is empirical science. You should never pick an algorithm simply because it is trendy. In this chapter, you will learn how to design a fair, controlled comparison between baselines, linear models, and candidate algorithms on the exact same cross-validation splits.",
      learningObjectives: [
        "Structure a model benchmark tournament loop in Python",
        "Compare candidate models using identical evaluation metrics and splits",
        "Balance performance gains against computational complexity and latency",
      ],
      sections: [
        {
          id: "w8-ch3-s1",
          title: "3.1 Designing the Tournament",
          content:
            "```python\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score, StratifiedKFold\n\nmodels = {\n    \"Baseline (Most Frequent)\": DummyClassifier(strategy=\"most_frequent\"),\n    \"Logistic Regression\": LogisticRegression(max_iter=1000),\n    \"Random Forest\": RandomForestClassifier(n_estimators=100, random_state=42)\n}\n\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\n\nfor name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=cv, scoring='f1_macro')\n    print(f\"{name:28} | F1: {scores.mean():.3f} (±{scores.std():.3f})\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Compare models on the exact same cross-validation folds.",
          "Consider inference latency, memory, and interpretability, not just score.",
        ],
        essentialSyntax: [],
        takeaways: ["A slightly simpler model with 95% accuracy is often preferred in production over a giant opaque model with 95.3% accuracy."],
        glossary: [
          {
            term: "Model Tournament",
            definition: "A standardized benchmarking process where multiple candidate algorithms are evaluated on identical data folds using identical metrics.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is StratifiedKFold passed explicitly to cross_val_score when comparing models?",
            answer: "To guarantee that all competing models are trained and tested on the exact same random fold splits, ensuring a fair head-to-head comparison.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q3-1",
          type: "concept",
          prompt: "When two models achieve virtually identical cross-validation scores, which one should an engineer generally prefer for production?",
          options: [
            "The simpler, faster, and more interpretable model",
            "The model with the largest number of parameters",
            "The model that took the longest time to train",
            "The model with the most complex neural layers"
          ],
          correctAnswer: "The simpler, faster, and more interpretable model",
          explanation: "Occam's razor applies: simpler models have fewer failure modes, lower deployment latency, and are easier to audit and maintain.",
        },
      ],
    },

    {
      id: "w8-ch4",
      slug: "feature-importance-and-interpretation",
      number: 4,
      title: "Feature Importance and Model Interpretability",
      estimatedMinutes: 15,
      introduction:
        "High-stakes systems (like medicine, law, security, and credit) cannot rely on mysterious black boxes. Regulators and users demand to know: **Why did the model make this decision?** In this chapter, you will extract feature importances, interpret regression coefficients, and understand model explainability.",
      learningObjectives: [
        "Extract and visualize feature coefficients in linear models",
        "Compute permutation feature importance in scikit-learn",
        "Identify risks of correlated features in importance rankings",
      ],
      sections: [
        {
          id: "w8-ch4-s1",
          title: "4.1 Coefficient Interpretation",
          content:
            "In linear models, the sign and magnitude of weights directly reveal feature impact:\n\n```python\nimport pandas as pd\n\nweights = pd.Series(model.named_steps['logreg'].coef_[0], index=feature_names)\nprint(\"Top Threat Indicators (Positive Weights):\")\nprint(weights.sort_values(ascending=False).head(5))\n\nprint(\"\\nTop Safety Indicators (Negative Weights):\")\nprint(weights.sort_values().head(5))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Linear model coefficients give transparent directional weights.",
          "Permutation importance measures how much metric drops when a feature is shuffled.",
        ],
        essentialSyntax: [
          {
            syntax: "from sklearn.inspection import permutation_importance",
            description: "Computes permutation importance for any black-box model.",
          },
        ],
        takeaways: ["Never deploy a model without understanding which features drive its predictions."],
        glossary: [
          {
            term: "Interpretability",
            definition: "The degree to which a human can understand the cause of a decision made by an AI model.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does a negative coefficient weight in a spam classification model signify?",
            answer: "It means higher values of that feature decrease the probability of being classified as spam (an indicator of legitimacy).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q4-1",
          type: "concept",
          prompt: "What does permutation feature importance measure?",
          options: [
            "The drop in model performance when a specific feature's values are randomly shuffled",
            "The memory size of the feature",
            "The alphabetization of the column name",
            "The correlation between features"
          ],
          correctAnswer: "The drop in model performance when a specific feature's values are randomly shuffled",
          explanation: "If shuffling a feature's values destroys model accuracy, the model relied heavily on that feature.",
        },
      ],
    },

    {
      id: "w8-ch5",
      slug: "reproducibility-and-seeds",
      number: 5,
      title: "Scientific Reproducibility: Seeds and Experiment Tracking",
      estimatedMinutes: 12,
      introduction:
        "The cornerstone of the scientific method is **reproducibility**: another researcher must be able to run your exact code on your data and obtain the exact same numbers. In this chapter, you will master random seeds, version pinning, and experiment logging.",
      learningObjectives: [
        "Fix pseudo-random number generator seeds across NumPy, Python, and scikit-learn",
        "Document software dependency versions with exact pin specifications",
        "Maintain clean experiment records and audit trails",
      ],
      sections: [
        {
          id: "w8-ch5-s1",
          title: "5.1 Global Seed Management",
          content:
            "```python\nimport random\nimport numpy as np\nimport os\n\nSEED = 42\nos.environ['PYTHONHASHSEED'] = str(SEED)\nrandom.seed(SEED)\nnp.random.seed(SEED)\n```\nAlways pass `random_state=42` to all stochastic estimators (e.g. `RandomForestClassifier(random_state=SEED)`).",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Seed PRNGs to guarantee identical experimental outcomes.",
          "Lock dependencies with requirements.txt or pnpm-lock.yaml.",
        ],
        essentialSyntax: [],
        takeaways: ["An experiment that cannot be reproduced is not science."],
        glossary: [
          {
            term: "Reproducibility",
            definition: "The ability of an independent experimenter to replicate the findings of a study using the original data and methodology.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why can the same model produce slightly different results on two runs if a seed is omitted?",
            answer: "Because algorithms rely on pseudo-random numbers for weight initialization, data shuffling, and bootstrap sampling.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q5-1",
          type: "concept",
          prompt: "Why is fixing random seeds vital for scientific integrity in data science?",
          options: [
            "It guarantees that results can be verified and audited independently by peers",
            "It makes models train 10x faster",
            "It eliminates all overfitting",
            "It is required by the Python compiler"
          ],
          correctAnswer: "It guarantees that results can be verified and audited independently by peers",
          explanation: "Reproducibility ensures that published scores and findings are verifiable benchmarks rather than random artifacts.",
        },
      ],
    },

    {
      id: "w8-ch6",
      slug: "responsible-machine-learning",
      number: 6,
      title: "Responsible Machine Learning: Bias, Fairness and Ethics",
      estimatedMinutes: 18,
      introduction:
        "Machine learning models do not operate in a vacuum; they affect human lives. If historical training data contains human biases, machine learning will not only learn those biases — it will amplify them. In this chapter, you will study demographic parity, representation gaps, data privacy, and ethical AI stewardship.",
      learningObjectives: [
        "Explain how historical and sampling bias enter machine learning models",
        "Define fairness criteria: Demographic Parity, Equalized Odds",
        "Identify data privacy risks (PII) and harmful misuse scenarios",
        "Implement human-in-the-loop oversight principles",
      ],
      sections: [
        {
          id: "w8-ch6-s1",
          title: "6.1 How Bias Infiltrates Models",
          content:
            "1. **Historical Bias**: Data reflects existing societal inequities (e.g. hiring algorithms trained on historical resumes that favored male applicants).\n2. **Representation Bias**: Certain demographic groups are underrepresented in training data (e.g. facial recognition systems trained primarily on lighter skin tones).\n3. **Measurement Bias**: Proxies that correlate with protected attributes (e.g. using postal zip codes as a proxy for creditworthiness, encoding historical racial segregation).",
        },
        {
          id: "w8-ch6-s2",
          title: "6.2 The Principles of Responsible ML",
          content:
            "- **Fairness**: Models must not systematically disadvantage protected demographic groups.\n- **Transparency**: Clear documentation of training data origins, limitations, and error rates.\n- **Privacy**: Protecting personally identifiable information (PII) and respecting consent.\n- **Accountability & Human Oversight**: Critical decisions must include human review and recourse.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Algorithms are not neutral; they reflect their training data.",
          "Audit models across subgroups for disparate error rates.",
          "Keep human-in-the-loop oversight for high-consequence decisions.",
        ],
        essentialSyntax: [],
        takeaways: ["Technical excellence without ethical responsibility creates harmful technology."],
        glossary: [
          {
            term: "Algorithmic Bias",
            definition: "Systematic and repeatable errors in a computer system that create unfair outcomes, such as privileging one arbitrary group of users over others.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is simply removing 'race' or 'gender' columns from a dataset often insufficient to eliminate bias?",
            answer: "Because other correlated features (such as zip code, school, or purchasing history) act as proxy variables that allow the model to reconstruct the protected attribute.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q6-1",
          type: "concept",
          prompt: "What is representation bias in machine learning?",
          options: [
            "When the training dataset fails to proportionally represent certain demographic groups in the population",
            "When a neural network has too few layers",
            "When features are represented as strings instead of floats",
            "When a chart has small text"
          ],
          correctAnswer: "When the training dataset fails to proportionally represent certain demographic groups in the population",
          explanation: "Representation bias occurs when the composition of the training data does not reflect the diversity of the deployment environment.",
        },
      ],
    },

    {
      id: "w8-ch7",
      slug: "model-improvement",
      number: 7,
      title: "Model Improvement: Error Diagnosis and Iteration",
      estimatedMinutes: 15,
      introduction:
        "When a model underperforms, what should you do? Beginners blindly swap algorithms or add more neural layers. Professionals conduct **error analysis**: inspecting the exact samples the model failed on to uncover actionable diagnostic insights.",
      learningObjectives: [
        "Conduct systematic error analysis by isolating and examining false predictions",
        "Categorize failure modes into data labeling errors, ambiguous edge cases, and feature deficits",
        "Select targeted interventions: data cleaning, feature engineering, or regularization",
      ],
      sections: [
        {
          id: "w8-ch7-s1",
          title: "7.1 The Error Analysis Workflow",
          content:
            "```python\n# Isolate False Negatives (actual spam missed by model)\nfn_mask = (y_test == 1) & (y_pred == 0)\nfalse_negatives = df_test[fn_mask]\n\nprint(f\"Inspecting {len(false_negatives)} missed threats:\")\nfor idx, row in false_negatives[['raw_text', 'keyword_matches']].head(5).iterrows():\n    print(\"Text:\", row['raw_text'])\n```\nOften, error inspection reveals obvious patterns: for example, all missed threats contained misspelled keywords or unusual link shorteners. This directly guides new feature engineering!",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Inspect errors manually; don't just stare at aggregate metrics.",
          "Data-centric improvements (better features, cleaner labels) beat algorithm tweaks 9 out of 10 times.",
        ],
        essentialSyntax: [],
        takeaways: ["Spend more time improving data quality and informative features than tuning hyperparameter decimals."],
        glossary: [
          {
            term: "Error Analysis",
            definition: "The systematic manual examination of samples where an algorithm produced incorrect predictions to identify root causes.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is inspecting individual misclassified samples often more useful than tuning hyperparameter settings?",
            answer: "Because errors often reveal fundamental flaws like mislabeled ground-truth data, missing critical features, or edge cases that no hyperparameter tweak could fix.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q7-1",
          type: "concept",
          prompt: "What is the primary action in error analysis?",
          options: [
            "Manually inspecting individual misclassified samples to understand why the model failed",
            "Deleting the dataset",
            "Swapping to a deep neural network immediately",
            "Increasing the learning rate"
          ],
          correctAnswer: "Manually inspecting individual misclassified samples to understand why the model failed",
          explanation: "Error analysis diagnoses root causes by closely examining specific prediction mistakes.",
        },
      ],
    },

    {
      id: "w8-ch8",
      slug: "evaluation-report",
      number: 8,
      title: "Model Evaluation Report & Governance Deliverable",
      estimatedMinutes: 20,
      introduction:
        "In this capstone chapter of Workshop 8, you will assemble a professional Model Evaluation and Governance Report synthesizing cross-validation metrics, feature importances, subgroup fairness audits, error analysis findings, and operational deployment recommendations.",
      learningObjectives: [
        "Structure a formal Model Card / Governance Audit deliverable",
        "Document performance metrics, confidence intervals, and intended use cases",
        "Transparently state model limitations and required human oversight safeguards",
      ],
      sections: [
        {
          id: "w8-ch8-s1",
          title: "8.1 Professional Model Card Schema",
          content:
            "Every production model should include a **Model Card** (developed by Google Research):\n1. **Model Details**: Architecture, version, date, author organisation (Center of Excellence).\n2. **Intended Use**: Primary intended users, use cases, and out-of-scope uses.\n3. **Factors & Subgroups**: Performance broken down across message types and domains.\n4. **Metrics**: Cross-validated F1, Precision, Recall, and confusion matrix.\n5. **Training & Evaluation Data**: Datasets, preprocessing, and filtering.\n6. **Ethical Considerations & Limitations**: Known blind spots, failure modes, and required human review.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Model Cards provide transparent documentation for AI accountability.",
          "Document what the model is NOT designed for as clearly as what it can do.",
        ],
        essentialSyntax: [],
        takeaways: ["A responsible data scientist documents limitations with complete honesty."],
        glossary: [
          {
            term: "Model Card",
            definition: "A standardized short document providing benchmarked evaluation in a variety of conditions, such as across different demographic groups, and detailing limitations.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the purpose of documenting 'Out-of-Scope Use Cases' in a Model Card?",
            answer: "To prevent dangerous misuse of the model in contexts it was never trained or validated for (e.g. using a message threat model for legal court evidence).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w8-q8-1",
          type: "concept",
          prompt: "What is a Model Card?",
          options: [
            "A standardized document detailing a model's performance, intended use, and ethical limitations",
            "A business card for machine learning engineers",
            "A physical credit card used to pay cloud bills",
            "A graphics card driver"
          ],
          correctAnswer: "A standardized document detailing a model's performance, intended use, and ethical limitations",
          explanation: "Model Cards are structured documentation artifacts that explain a model's capabilities, evaluation benchmarks, and boundaries.",
        },
      ],
    },
  ],
};
