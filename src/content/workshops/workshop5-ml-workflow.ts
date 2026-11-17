import { Workshop } from "@/types/curriculum";

export const workshop5MLWorkflow: Workshop = {
  id: "w5-ml-workflow",
  slug: "ml-workflow",
  number: 5,
  title: "Machine Learning 101: The End-to-End Workflow",
  subtitle: "From Traditional Programming to Data-Driven Learning",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Students moving from manual rule-based programming to foundational machine learning systems.",
  prerequisites: [
    "Completion of Workshops 1, 3, and 4",
    "Understanding of NumPy arrays, Pandas DataFrames, and train/test intuition",
  ],
  learningOutcomes: [
    "Contrast traditional rule-based programming with the machine learning paradigm",
    "Distinguish between Supervised (Regression, Classification) and Unsupervised Learning",
    "Structure feature matrices X and target labels y correctly",
    "Master the 7-step end-to-end Machine Learning lifecycle",
    "Perform rigorous train-test splitting and prevent catastrophic data leakage",
    "Establish trivial and heuristic baseline models as scientific benchmark anchors",
    "Build and execute your first scikit-learn Pipeline (impute -> scale -> fit -> predict)",
    "Interpret model predictions and communicate early performance metrics honestly",
  ],
  projectSlug: "first-ml-pipeline",
  projectTitle: "End-to-End Message Classifier Pipeline Benchmark",
  chapters: [
    {
      id: "w5-ch1",
      slug: "what-is-machine-learning",
      number: 1,
      title: "What is Machine Learning? The Paradigm Shift",
      estimatedMinutes: 12,
      introduction:
        "In Workshop 1, we built Inbox Guardian using manual rules: `if 'free' in message: risk += 1`. But what if a scammer invents new phrases we never anticipated? Machine Learning represents a profound paradigm shift: instead of humans writing rules by hand, the computer learns the rules automatically from historical data.",
      learningObjectives: [
        "Contrast traditional programming (Rules + Data = Answers) with Machine Learning (Data + Answers = Rules)",
        "Identify practical problems where traditional rule-based coding fails",
        "Formulate data science problems using Arthur Samuel and Tom Mitchell's formal definitions of ML",
      ],
      sections: [
        {
          id: "w5-ch1-s1",
          title: "1.1 The Two Paradigms of Computing",
          content:
            "**Traditional Programming**:\n```text\nRules (Code) + Data (Input) ---> [ Computer ] ---> Answers (Output)\n```\nA human engineer must anticipate every conceivable situation and manually code `if/else` logic. This works for arithmetic or tax calculations, but completely fails for facial recognition, spam detection, or language translation.\n\n**Machine Learning**:\n```text\nData (Input) + Answers (Labels) ---> [ ML Algorithm ] ---> Learned Rules (Model)\n```\nThe algorithm examines thousands of historical examples and automatically discovers the underlying statistical patterns and relationships.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Traditional programming requires explicit manual human rules.",
          "Machine learning infers mathematical patterns directly from example pairs.",
        ],
        essentialSyntax: [],
        takeaways: ["Use ML when problems are too complex or fluid for manual rules."],
        glossary: [
          {
            term: "Machine Learning",
            definition: "A field of study that gives computers the ability to learn without being explicitly programmed (Arthur Samuel, 1959).",
          },
        ],
        revisionQuestions: [
          {
            question: "Why did manual rule-based spam filters fail in the early 2000s?",
            answer: "Because spammers continuously modified their text, obfuscating words ('f-r-e-e', 'p-r-i-z-e'), outpacing human engineers' ability to write rules.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q1-1",
          type: "concept",
          prompt: "In Machine Learning, what are the primary inputs supplied to the learning algorithm?",
          options: ["Data and Historical Labels/Outcomes", "Handwritten rules only", "Compiled C++ binaries", "Only random numbers"],
          correctAnswer: "Data and Historical Labels/Outcomes",
          explanation: "In supervised machine learning, the algorithm receives training examples (data) alongside corresponding outcomes (labels) to learn a predictive model.",
        },
      ],
    },

    {
      id: "w5-ch2",
      slug: "supervised-and-unsupervised",
      number: 2,
      title: "Supervised and Unsupervised Learning",
      estimatedMinutes: 15,
      introduction:
        "Machine Learning is divided into major paradigms based on the type of supervision provided. In this chapter, you will learn the core differences between Supervised Learning (Regression vs Classification) and Unsupervised Learning (Clustering vs Dimensionality Reduction).",
      learningObjectives: [
        "Classify problems into Supervised vs Unsupervised learning based on label availability",
        "Distinguish between Regression (continuous numerical target) and Classification (discrete categorical target)",
        "Understand the intuition behind Unsupervised Clustering",
      ],
      sections: [
        {
          id: "w5-ch2-s1",
          title: "2.1 Supervised Learning",
          content:
            "In **Supervised Learning**, every training example is paired with a ground-truth teacher label `y`:\n1. **Regression**: Predicting a continuous numeric quantity (e.g. house price in dollars: \$425,000; message response delay: 3.4 seconds).\n2. **Classification**: Predicting a discrete categorical class:\n   - **Binary**: Two classes (Spam vs Legitimate; Default vs Repay)\n   - **Multiclass**: 3+ classes (Phishing vs Commercial vs Social vs Work)",
        },
        {
          id: "w5-ch2-s2",
          title: "2.2 Unsupervised Learning",
          content:
            "In **Unsupervised Learning**, the data has no teacher labels `y`. The algorithm must find inherent structure on its own:\n- **Clustering (e.g. K-Means)**: Grouping similar customers or documents together based on feature distance.\n- **Dimensionality Reduction (e.g. PCA)**: Compressing hundreds of features into a few core components.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Supervised: Data with ground-truth target labels y.",
          "Regression: Predicts numbers; Classification: Predicts categories.",
          "Unsupervised: Discovers natural clusters and patterns without labels.",
        ],
        essentialSyntax: [],
        takeaways: ["Always identify whether a target label exists before selecting an algorithm family."],
        glossary: [
          {
            term: "Supervised Learning",
            definition: "The machine learning task of learning a function that maps an input to an output based on example input-output pairs.",
          },
        ],
        revisionQuestions: [
          {
            question: "Is predicting whether an applicant will be approved for a loan classification or regression?",
            answer: "Classification, because the target outcome is a discrete category (Approved vs Rejected).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q2-1",
          type: "concept",
          prompt: "Predicting the continuous market price of a used car based on mileage and age is an example of:",
          options: ["Regression", "Classification", "Clustering", "Reinforcement Learning"],
          correctAnswer: "Regression",
          explanation: "Because car price is a continuous numerical target variable.",
        },
      ],
    },

    {
      id: "w5-ch3",
      slug: "features-and-labels",
      number: 3,
      title: "Features and Labels: Mathematical Representation",
      estimatedMinutes: 15,
      introduction:
        "Computers do not understand text, images, or audio directly; they understand numbers arranged in vectors and matrices. In this chapter, you will learn how data is represented mathematically as a feature matrix $X$ and a target vector $y$.",
      learningObjectives: [
        "Define features ($x_1, x_2, ..., x_p$) and target labels ($y$)",
        "Structure tabular observations into a 2D matrix $X \\in \\mathbb{R}^{n \\times p}$",
        "Distinguish between informative predictive signals and noisy or leaking attributes",
      ],
      sections: [
        {
          id: "w5-ch3-s1",
          title: "3.1 The Feature Matrix X and Target Vector y",
          content:
            "- $n$: The number of samples (rows / records / messages)\n- $p$: The number of features (columns / input measurements)\n\n$$\nX = \\begin{bmatrix}\nx_{11} & x_{12} & \\dots & x_{1p} \\\\\nx_{21} & x_{22} & \\dots & x_{2p} \\\\\n\\vdots & \\vdots & \\ddots & \\vdots \\\\\nx_{n1} & x_{n2} & \\dots & x_{np}\n\\end{bmatrix}, \\quad\ny = \\begin{bmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_n \\end{bmatrix}\n$$\n\nIn Python, $X$ is stored as a 2D NumPy array or Pandas DataFrame of shape `(n, p)`, and $y$ is a 1D array or Series of length `n`.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "X is the n x p feature matrix.",
          "y is the length n target vector.",
          "Every row represents an independent observation.",
        ],
        essentialSyntax: [
          {
            syntax: "X = df[feature_columns].values\ny = df['target'].values",
            description: "Converts DataFrame features and target to NumPy arrays.",
          },
        ],
        takeaways: ["Ensure the number of rows in X exactly equals the length of y."],
        glossary: [
          {
            term: "Feature",
            definition: "An individual measurable property or characteristic of a phenomenon being observed.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does the shape `(1000, 15)` tell you about feature matrix `X`?",
            answer: "There are 1,000 independent samples/rows and 15 distinct input features/columns.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q3-1",
          type: "concept",
          prompt: "In supervised learning, what does the variable conventionally named `y` represent?",
          options: ["The target ground-truth label we aim to predict", "The feature matrix", "The learning rate", "The accuracy score"],
          correctAnswer: "The target ground-truth label we aim to predict",
          explanation: "y is the conventional mathematical symbol for the dependent target variable.",
        },
      ],
    },

    {
      id: "w5-ch4",
      slug: "understanding-the-ml-workflow",
      number: 4,
      title: "The 7-Step End-to-End Machine Learning Workflow",
      estimatedMinutes: 15,
      introduction:
        "Machine learning is not just calling `.fit()`. Professional data scientists follow a disciplined, cyclic 7-step engineering workflow. In this chapter, you will learn the lifecycle from problem definition to post-deployment monitoring.",
      learningObjectives: [
        "Memorize and apply the 7 core stages of the ML lifecycle",
        "Formulate a business problem as a measurable ML objective",
        "Identify where most machine learning projects fail in practice",
      ],
      sections: [
        {
          id: "w5-ch4-s1",
          title: "4.1 The 7 Lifecycle Stages",
          content:
            "1. **Problem Definition**: What business decision will this model automate or inform?\n2. **Data Collection & Ingestion**: Gathering historical observations.\n3. **EDA & Data Cleaning**: Auditing distributions, missingness, and outliers.\n4. **Feature Engineering & Preprocessing**: Scaling numbers and encoding categories.\n5. **Model Training & Baseline Establishment**: Fitting baseline and candidate algorithms.\n6. **Rigorous Evaluation & Diagnosis**: Testing on unseen data using appropriate metrics.\n7. **Deployment & Monitoring**: Serving predictions in an app (like Streamlit) and tracking drift.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "The ML workflow is iterative, not linear.",
          "Always start with problem definition before writing a single line of model code.",
        ],
        essentialSyntax: [],
        takeaways: ["A model that predicts the wrong objective is useless, regardless of accuracy."],
        glossary: [
          {
            term: "Model Lifecycle",
            definition: "The end-to-end process of scoping, developing, validating, deploying, and maintaining a machine learning model.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should establishing a baseline model happen before training complex neural networks?",
            answer: "Because a simple baseline sets a minimum benchmark to prove that additional model complexity actually adds real value.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q4-1",
          type: "concept",
          prompt: "What is the very first step in any professional machine learning project?",
          options: ["Problem definition and scoping", "Writing neural network code", "Collecting 10 million rows", "Optimizing hyperparameters"],
          correctAnswer: "Problem definition and scoping",
          explanation: "Without a clear, well-defined problem and metric, modeling cannot succeed.",
        },
      ],
    },

    {
      id: "w5-ch5",
      slug: "training-and-testing",
      number: 5,
      title: "Training and Testing: Preventing Data Leakage",
      estimatedMinutes: 15,
      introduction:
        "The golden rule of machine learning is: **never evaluate a model on the data used to train it**. Testing on training data is like giving a student an exam with the exact questions and answers they memorized yesterday. In this chapter, you will master `train_test_split()`, random seeds, and preventing catastrophic data leakage.",
      learningObjectives: [
        "Explain why evaluating on training data produces deceptive, over-optimistic performance",
        "Split datasets into train and test sets using `scikit-learn`'s `train_test_split()`",
        "Fix the `random_state` parameter to guarantee reproducible experiments",
        "Define and identify data leakage risks in preprocessing",
      ],
      sections: [
        {
          id: "w5-ch5-s1",
          title: "5.1 The Train-Test Split",
          content:
            "We partition our historical data into two strictly isolated sets:\n- **Training Set (typically 80%)**: Exposed to the model to learn parameters and patterns.\n- **Test Set (typically 20%)**: Locked in a vault. Evaluated only once to simulate future unseen data in the real world.\n\n```python\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.20, random_state=42, stratify=y\n)\n\nprint(f\"Training samples: {len(X_train)} | Testing samples: {len(X_test)}\")\n```",
        },
        {
          id: "w5-ch5-s2",
          title: "5.2 Data Leakage",
          content:
            "> [!CAUTION]\n> **Data Leakage** occurs when information from outside the training dataset is used to train the model.\n>\n> For example: if you calculate the `mean()` of the entire dataset to impute missing values before splitting, test set values leak into the training process! Preprocessing scalers and imputers must always be fit **only on X_train**.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Never evaluate on training data.",
          "train_test_split(X, y, test_size=0.2, random_state=42) is the standard split.",
          "Fit transformers ONLY on X_train, then transform both X_train and X_test.",
        ],
        essentialSyntax: [
          {
            syntax: "train_test_split(X, y, test_size=0.2, random_state=42)",
            description: "Splits arrays into random train and test subsets.",
          },
        ],
        takeaways: ["Data leakage leads to models that look brilliant in experiments but fail catastrophically in production."],
        glossary: [
          {
            term: "Data Leakage",
            definition: "The spurious introduction of information about the target variable or test set into the training pipeline.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the purpose of setting `random_state=42` in `train_test_split`?",
            answer: "It seeds the pseudo-random number generator, ensuring the exact same split is produced every time the script runs (reproducibility).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q5-1",
          type: "concept",
          prompt: "Why must you NEVER evaluate a machine learning model on the data it trained on?",
          options: [
            "It measures rote memorization rather than true generalisation ability",
            "Python will throw a MemoryError",
            "It takes too long to compute",
            "Scikit-learn forbids it with an exception"
          ],
          correctAnswer: "It measures rote memorization rather than true generalisation ability",
          explanation: "Testing on training data cannot tell you if the model has learned generalizable patterns or merely memorized the training examples (overfitting).",
        },
      ],
    },

    {
      id: "w5-ch6",
      slug: "baseline-models",
      number: 6,
      title: "Baseline Models: The Scientific Anchor",
      estimatedMinutes: 12,
      introduction:
        "If someone claims: 'My machine learning spam model achieves 95% accuracy!', should you be impressed? What if 95% of all emails are naturally clean? A model that predicts 'CLEAN' for every email would also be 95% accurate while doing zero actual learning! In this chapter, you will master baseline models.",
      learningObjectives: [
        "Explain the accuracy paradox in imbalanced datasets",
        "Implement a majority-class classification baseline using `DummyClassifier`",
        "Implement a mean-prediction regression baseline using `DummyRegressor`",
      ],
      sections: [
        {
          id: "w5-ch6-s1",
          title: "6.1 The Dummy Estimator",
          content:
            "A **baseline model** is the simplest possible heuristic benchmark:\n- Classification: Always predict the most frequent class.\n- Regression: Always predict the historical mean target value.\n\n```python\nfrom sklearn.dummy import DummyClassifier\n\n# Baseline: always predict majority class\nbaseline = DummyClassifier(strategy=\"most_frequent\")\nbaseline.fit(X_train, y_train)\n\nprint(\"Baseline Accuracy:\", baseline.score(X_test, y_test))\n```\nIf your fancy machine learning algorithm cannot significantly beat this naive baseline, it has failed.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Baselines set the minimum performance floor.",
          "High raw accuracy on imbalanced data can be meaningless without a baseline comparison.",
        ],
        essentialSyntax: [
          {
            syntax: "DummyClassifier(strategy='most_frequent')",
            description: "Naive majority-class baseline.",
          },
        ],
        takeaways: ["Always compare candidate models against an honest naive baseline."],
        glossary: [
          {
            term: "Baseline Model",
            definition: "A simple, easily understood model that provides a reference point for evaluating more complex models.",
          },
        ],
        revisionQuestions: [
          {
            question: "If a fraud detection dataset has 99% legitimate transactions and 1% fraud, what is the accuracy of a naive baseline that predicts 'legitimate' every time?",
            answer: "99% accuracy, despite catching 0% of the actual fraud! This is why precision and recall are necessary.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q6-1",
          type: "concept",
          prompt: "What does `DummyClassifier(strategy='most_frequent')` do?",
          options: [
            "It always predicts whichever class label appeared most often in the training data",
            "It guesses completely at random",
            "It trains a decision tree",
            "It optimizes a neural network"
          ],
          correctAnswer: "It always predicts whichever class label appeared most often in the training data",
          explanation: "The most_frequent strategy simply memorizes and always outputs the majority class label.",
        },
      ],
    },

    {
      id: "w5-ch7",
      slug: "first-scikit-learn-pipeline",
      number: 7,
      title: "Your First Scikit-Learn Pipeline: Estimators & Fit/Predict",
      estimatedMinutes: 18,
      introduction:
        "Scikit-learn is the undisputed standard library for classical machine learning in Python. Its genius lies in its consistent, unified API: `.fit()`, `.transform()`, and `.predict()`. In this chapter, you will assemble your first complete scikit-learn Pipeline.",
      learningObjectives: [
        "Explain the Scikit-learn Estimator and Transformer API patterns",
        "Assemble preprocessing and modeling stages inside a `Pipeline`",
        "Execute the complete `.fit()` and `.predict()` cycle",
      ],
      sections: [
        {
          id: "w5-ch7-s1",
          title: "7.1 The Scikit-Learn API Philosophy",
          content:
            "1. **Estimators**: Objects that learn from data via `.fit(X_train, y_train)`.\n2. **Transformers**: Objects that transform feature matrices via `.transform(X)` (e.g. `StandardScaler`, `SimpleImputer`).\n3. **Predictors**: Estimators that generate predictions on new data via `.predict(X_test)`.",
        },
        {
          id: "w5-ch7-s2",
          title: "7.2 Building a Leak-Free Pipeline",
          content:
            "```python\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\n# Construct pipeline\npipe = Pipeline([\n    ('scaler', StandardScaler()),              # Stage 1: normalize features\n    ('classifier', LogisticRegression())       # Stage 2: predictive model\n])\n\n# Train entire pipeline in one line (fits scaler on X_train, then fits model)\npipe.fit(X_train, y_train)\n\n# Predict on unseen test data\npredictions = pipe.predict(X_test)\nprint(\"Model Test Accuracy:\", pipe.score(X_test, y_test))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "fit() learns parameters from data; predict() generates inferences.",
          "Pipelines encapsulate preprocessing and modeling, completely preventing data leakage.",
        ],
        essentialSyntax: [
          {
            syntax: "Pipeline([('step_name', Transformer()), ('model', Estimator())])",
            description: "Encapsulates sequential preprocessing and modeling.",
          },
          {
            syntax: "pipe.fit(X_train, y_train)\npipe.predict(X_test)",
            description: "Fits pipeline and generates predictions.",
          },
        ],
        takeaways: ["Always wrap preprocessing and modeling in a scikit-learn Pipeline."],
        glossary: [
          {
            term: "Pipeline",
            definition: "A scikit-learn construct that chains together multiple data transformation and modeling steps into a single atomic estimator.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does calling `pipe.predict(X_test)` automatically scale X_test using the training mean and standard deviation?",
            answer: "Because the pipeline manages the transform step internally, using the exact transformation statistics learned during `fit`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q7-1",
          type: "concept",
          prompt: "What method do all scikit-learn learning algorithms implement to learn from data?",
          options: [".fit()", ".train()", ".learn()", ".execute()"],
          correctAnswer: ".fit()",
          explanation: "In the scikit-learn API, all estimators use the `.fit()` method to learn parameters from training data.",
        },
      ],
    },

    {
      id: "w5-ch8",
      slug: "ml-workflow-practical",
      number: 8,
      title: "ML Workflow Practical: Benchmarking Model vs Rule Engine",
      estimatedMinutes: 21,
      introduction:
        "In this capstone chapter of Workshop 5, you will bridge Workshop 1 and Workshop 5: take the message dataset generated from Inbox Guardian, train a machine-learning classification pipeline, and evaluate its accuracy against our original human-written keyword rules.",
      learningObjectives: [
        "Load historical message dataset with keyword match counts and lengths",
        "Split into 80/20 train/test sets with random seed",
        "Fit a majority-class baseline and a Logistic Regression pipeline",
        "Directly compare machine-learned performance with manual rule-based thresholds",
      ],
      sections: [
        {
          id: "w5-ch8-s1",
          title: "8.1 Practical Benchmark Comparison",
          content:
            "Follow the complete benchmark script:\n\n```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.dummy import DummyClassifier\n\n# 1. Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 2. Baseline benchmark\nbaseline = DummyClassifier(strategy=\"most_frequent\")\nbaseline.fit(X_train, y_train)\nprint(f\"Baseline Accuracy: {baseline.score(X_test, y_test):.3f}\")\n\n# 3. Machine Learning Pipeline\nmodel = Pipeline([\n    ('scale', StandardScaler()),\n    ('logreg', LogisticRegression())\n])\nmodel.fit(X_train, y_train)\nprint(f\"ML Model Accuracy: {model.score(X_test, y_test):.3f}\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete execution of the 7-step ML workflow.",
          "Machine learning models provide measurable improvements over manual heuristics.",
        ],
        essentialSyntax: [
          {
            syntax: "model.score(X_test, y_test)",
            description: "Returns mean accuracy on test samples.",
          },
        ],
        takeaways: ["Machine learning turns historical data into measurable predictive advantage."],
        glossary: [
          {
            term: "Benchmark",
            definition: "A standardized reference test against which other models or systems can be measured and compared.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the primary conclusion of this practical benchmark?",
            answer: "That machine learning algorithms can statistically weight multiple weak indicators simultaneously to outperform brittle single-threshold human rules.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w5-q8-1",
          type: "concept",
          prompt: "What does a model score of 0.92 on the test set mean for a balanced binary classification problem?",
          options: [
            "The model correctly classified 92% of unseen test observations",
            "The model is 92% complete",
            "The data had 92 rows",
            "The algorithm took 92 milliseconds"
          ],
          correctAnswer: "The model correctly classified 92% of unseen test observations",
          explanation: "In scikit-learn classifiers, score() computes the proportion of correct classifications (accuracy).",
        },
      ],
    },
  ],
};
