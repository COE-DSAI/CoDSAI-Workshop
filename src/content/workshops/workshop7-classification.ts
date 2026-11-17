import { Workshop } from "@/types/curriculum";

export const workshop7Classification: Workshop = {
  id: "w7-classification",
  slug: "classification",
  number: 7,
  title: "Supervised Learning II: Classification",
  subtitle: "Discrete Category Prediction, Logistic Regression & Metric Trade-Offs",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Students building decision systems for fraud detection, medical diagnosis, security threat screening, and sentiment analysis.",
  prerequisites: [
    "Completion of Workshops 5 and 6",
    "Understanding of binary outcomes, train/test splitting, and evaluation metrics",
  ],
  learningOutcomes: [
    "Distinguish between binary and multiclass classification problems",
    "Understand why linear regression fails for discrete classification",
    "Master the Sigmoid function and probability thresholding in Logistic Regression",
    "Construct and interpret a Confusion Matrix: TP, FP, TN, FN",
    "Compute and balance Accuracy, Precision, Recall, and F1-Score based on real-world costs of false positives vs false negatives",
    "Adjust decision thresholds using predicted probability distributions (`predict_proba`)",
    "Train, evaluate, and diagnose an intelligent Machine Learning threat classifier",
  ],
  projectSlug: "ml-spam-classifier",
  projectTitle: "Machine Learning Spam & Phishing Classification Engine",
  chapters: [
    {
      id: "w7-ch1",
      slug: "what-is-classification",
      number: 1,
      title: "What is Classification? Classes and Boundaries",
      estimatedMinutes: 15,
      introduction:
        "Classification is the process of predicting which discrete category an observation belongs to. In this chapter, you will learn to formalize classification tasks, differentiate binary from multiclass classification, and identify decision boundaries.",
      learningObjectives: [
        "Define classification formally with discrete target labels $y \\in \\{C_1, C_2, ..., C_k\\}$",
        "Distinguish between binary classification ($k=2$) and multiclass classification ($k > 2$)",
        "Explain the geometric concept of a decision boundary separating classes in feature space",
      ],
      sections: [
        {
          id: "w7-ch1-s1",
          title: "1.1 The Classification Problem",
          content:
            "Unlike regression where targets are continuous numbers, in **classification** the target is a discrete label:\n- **Binary Classification**: Exactly two possible classes (Positive: 1 vs Negative: 0; Spam vs Clean; Malicious vs Benign).\n- **Multiclass Classification**: Three or more mutually exclusive classes (Phishing: 0 vs Commercial: 1 vs Personal: 2 vs Urgent: 3).\n\nGeometrically, a classification algorithm finds a **decision boundary** in feature space that separates the points belonging to different classes.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Classification assigns inputs into discrete categories.",
          "Decision boundaries divide feature space into class regions.",
        ],
        essentialSyntax: [],
        takeaways: ["Map labels to standard integers (0 and 1) for binary algorithms."],
        glossary: [
          {
            term: "Decision Boundary",
            definition: "A hypersurface that partitions the underlying vector space into two or more sets, one for each class.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why can't we use standard Linear Regression directly for binary classification?",
            answer: "Linear regression predicts continuous numbers from $-\\infty$ to $+\\infty$, which can produce nonsensical probabilities like -0.4 or 1.8, and is heavily distorted by extreme outliers.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q1-1",
          type: "concept",
          prompt: "Which of the following is a binary classification problem?",
          options: [
            "Predicting whether a transaction is Fraudulent (1) or Legitimate (0)",
            "Predicting the temperature in Celsius tomorrow",
            "Predicting stock price at market close",
            "Grouping customers into 5 unlabelled clusters"
          ],
          correctAnswer: "Predicting whether a transaction is Fraudulent (1) or Legitimate (0)",
          explanation: "Because there are exactly two mutually exclusive categorical outcomes.",
        },
      ],
    },

    {
      id: "w7-ch2",
      slug: "classification-workflow",
      number: 2,
      title: "The Classification Workflow: Stratified Splitting",
      estimatedMinutes: 15,
      introduction:
        "Classification datasets are frequently **imbalanced**: in cybersecurity, 98% of messages may be legitimate and only 2% malicious. In this chapter, you will learn how naive random splits break imbalanced data and why you must use **stratified sampling**.",
      learningObjectives: [
        "Explain class imbalance and its dangers in dataset splitting",
        "Use `stratify=y` in `train_test_split()` to preserve class proportions",
        "Encode text categories numerically using `LabelEncoder` or integer mappings",
      ],
      sections: [
        {
          id: "w7-ch2-s1",
          title: "2.1 Stratified Splitting",
          content:
            "If your dataset has only 20 spam messages out of 1000, pure random splitting might place 18 spam messages in training and only 2 in testing! This causes severe evaluation instability.\n\n**Stratified splitting** ensures that both train and test sets have the **exact same percentage of each class** as the original dataset:\n\n```python\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.20, random_state=42, stratify=y  # CRITICAL!\n)\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Class imbalance is ubiquitous in security, fraud, and medical domains.",
          "Always pass stratify=y when splitting classification data.",
        ],
        essentialSyntax: [
          {
            syntax: "train_test_split(X, y, stratify=y)",
            description: "Splits data while preserving class proportions.",
          },
        ],
        takeaways: ["Never perform an unstratified split on imbalanced classification datasets."],
        glossary: [
          {
            term: "Stratification",
            definition: "The arrangement of sampling such that subgroups (strata) of the population are represented in the same proportions in all splits.",
          },
        ],
        revisionQuestions: [
          {
            question: "What happens if you forget `stratify=y` on a dataset with 1% rare disease cases?",
            answer: "The test set might accidentally receive zero positive disease cases, making evaluation completely useless.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q2-1",
          type: "concept",
          prompt: "What does `stratify=y` ensure during `train_test_split()`?",
          options: [
            "Both training and test sets maintain the exact same proportion of class labels as the full dataset",
            "The data is sorted alphabetically",
            "All missing values are filled automatically",
            "The features are normalized to mean 0"
          ],
          correctAnswer: "Both training and test sets maintain the exact same proportion of class labels as the full dataset",
          explanation: "Stratification guarantees proportional class representation across subsets.",
        },
      ],
    },

    {
      id: "w7-ch3",
      slug: "intro-logistic-regression",
      number: 3,
      title: "Introduction to Logistic Regression: Sigmoid & Probabilities",
      estimatedMinutes: 20,
      introduction:
        "Despite its name, **Logistic Regression is a classification algorithm**, not a regression algorithm! In this chapter, you will master the elegant Sigmoid (logistic) function that squashes real numbers into well-calibrated probabilities between 0.0 and 1.0.",
      learningObjectives: [
        "Explain why Logistic Regression is a classification algorithm",
        "Understand the Sigmoid activation function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$",
        "Interpret output probabilities via `.predict_proba()`",
        "Set decision thresholds (default 0.5) to convert probabilities into binary classes",
      ],
      sections: [
        {
          id: "w7-ch3-s1",
          title: "3.1 The Sigmoid Function",
          content:
            "Instead of predicting a raw continuous number $z = w^T x + b$, Logistic Regression passes $z$ through the **Sigmoid function**:\n$$\n\\sigma(z) = \\frac{1}{1 + e^{-z}}\n$$\n- When $z \\to +\\infty$, $\\sigma(z) \\to 1.0$\n- When $z = 0$, $\\sigma(z) = 0.5$\n- When $z \\to -\\infty$, $\\sigma(z) \\to 0.0$\n\nThe output $P(y=1|x) = \\sigma(w^T x + b)$ is a valid mathematical probability strictly between 0 and 1!",
        },
        {
          id: "w7-ch3-s2",
          title: "3.2 Code Implementation: predict vs predict_proba",
          content:
            "```python\nfrom sklearn.linear_model import LogisticRegression\n\nclf = LogisticRegression()\nclf.fit(X_train, y_train)\n\n# Get raw probabilities [P(class=0), P(class=1)]\nprobs = clf.predict_proba(X_test)\nprint(\"Predicted Probabilities for sample 0:\", probs[0])\n# e.g. [0.12, 0.88] -> 88% probability of Spam!\n\n# Get default binary prediction (threshold >= 0.5)\npreds = clf.predict(X_test)\nprint(\"Predicted class:\", preds[0])  # 1\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Logistic Regression models probability of class membership.",
          "Sigmoid maps $(-\\infty, +\\infty)$ to $(0, 1)$.",
          "predict_proba() yields raw probabilities; predict() applies the 0.5 threshold.",
        ],
        essentialSyntax: [
          {
            syntax: "clf.predict_proba(X_test)",
            description: "Returns array of shape (n_samples, n_classes) with class probabilities.",
          },
        ],
        takeaways: ["Always inspect predict_proba() to understand model confidence."],
        glossary: [
          {
            term: "Sigmoid Function",
            definition: "An S-shaped mathematical curve that maps any real number into a value between 0 and 1.",
          },
        ],
        revisionQuestions: [
          {
            question: "If Logistic Regression calculates $P(y=1|x) = 0.74$, what will `.predict()` output by default?",
            answer: "It will output `1`, because 0.74 exceeds the default decision threshold of 0.5.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q3-1",
          type: "concept",
          prompt: "What mathematical range is guaranteed for the output of the Sigmoid function?",
          options: ["Strictly between 0 and 1", "Between -1 and +1", "Between 0 and infinity", "Any real number"],
          correctAnswer: "Strictly between 0 and 1",
          explanation: "The Sigmoid function asymptotes at 0 and 1, bounding all outputs between 0 and 1.",
        },
      ],
    },

    {
      id: "w7-ch4",
      slug: "confusion-matrix",
      number: 4,
      title: "The Confusion Matrix: TP, FP, TN, and FN",
      estimatedMinutes: 20,
      introduction:
        "In classification, raw accuracy is deeply misleading. To understand what a model actually gets right and wrong, you must inspect the **Confusion Matrix**. In this chapter, you will master True Positives, False Positives, True Negatives, and False Negatives.",
      learningObjectives: [
        "Construct a $2 \\times 2$ Confusion Matrix",
        "Define and differentiate True Positives (TP), False Positives (FP), True Negatives (TN), False Negatives (FN)",
        "Map real-world costs to FP (false alarm) vs FN (missed threat)",
      ],
      sections: [
        {
          id: "w7-ch4-s1",
          title: "4.1 The 4 Quadrants of Reality",
          content:
            "| | Predicted Negative (0) | Predicted Positive (1) |\n|---|---|---|\n| **Actual Negative (0: Clean)** | **True Negative (TN)**: Clean email allowed | **False Positive (FP)**: Clean email blocked (False Alarm) |\n| **Actual Positive (1: Spam)** | **False Negative (FN)**: Phishing email missed! | **True Positive (TP)**: Phishing email caught! |\n\n```python\nfrom sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay\n\ncm = confusion_matrix(y_test, y_pred)\nprint(cm)\n# Display visualization\nConfusionMatrixDisplay(cm, display_labels=['Clean', 'Spam']).plot()\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Confusion Matrix exposes all 4 possible classification outcomes.",
          "False Positive = Type I error (False Alarm).",
          "False Negative = Type II error (Missed Threat).",
        ],
        essentialSyntax: [
          {
            syntax: "confusion_matrix(y_true, y_pred)",
            description: "Computes 2x2 confusion matrix.",
          },
        ],
        takeaways: ["Different applications have drastically different costs for FP vs FN."],
        glossary: [
          {
            term: "Confusion Matrix",
            definition: "A specific table layout that allows visualization of the performance of an algorithm.",
          },
        ],
        revisionQuestions: [
          {
            question: "In spam filtering, what is the consequence of a False Positive?",
            answer: "An important legitimate email (e.g. university acceptance or job offer) is accidentally sent to the spam trash folder.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q4-1",
          type: "concept",
          prompt: "What is an event where an actual malicious phishing email is marked as 'Clean' and delivered to the inbox?",
          options: ["False Negative (FN)", "False Positive (FP)", "True Negative (TN)", "True Positive (TP)"],
          correctAnswer: "False Negative (FN)",
          explanation: "The ground truth was positive (threat), but the model falsely predicted negative (clean).",
        },
      ],
    },

    {
      id: "w7-ch5",
      slug: "classification-metrics",
      number: 5,
      title: "Classification Metrics: Accuracy, Precision, Recall and F1",
      estimatedMinutes: 20,
      introduction:
        "Depending on your business goal, you must optimize for either Precision or Recall. In this chapter, you will master the mathematical formulas, intuition, and trade-offs between Accuracy, Precision, Recall, and the harmonic mean F1-Score.",
      learningObjectives: [
        "Compute Accuracy = $(TP + TN) / (TP + TN + FP + FN)$",
        "Compute Precision = $TP / (TP + FP)$ ('When model predicts positive, how often is it right?')",
        "Compute Recall = $TP / (TP + FN)$ ('Out of all actual positives, how many did we catch?')",
        "Compute F1-Score as the harmonic mean of Precision and Recall",
        "Interpret a `classification_report` in scikit-learn",
      ],
      sections: [
        {
          id: "w7-ch5-s1",
          title: "5.1 Precision vs Recall",
          content:
            "- **Precision**: Focuses on **minimizing False Positives**. When you flag something, you must be certain. (Crucial when false alarms are costly: e.g. YouTube copyright takedowns).\n$$\\text{Precision} = \\frac{TP}{TP + FP}$$\n\n- **Recall (Sensitivity)**: Focuses on **minimizing False Negatives**. You cannot afford to miss a positive! (Crucial in security breaches and cancer screening).\n$$\\text{Recall} = \\frac{TP}{TP + FN}$$\n\n- **F1-Score**: Harmonic mean that balances both:\n$$F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$",
        },
        {
          id: "w7-ch5-s2",
          title: "5.2 Scikit-Learn Classification Report",
          content:
            "```python\nfrom sklearn.metrics import classification_report\n\nprint(classification_report(y_test, y_pred, target_names=['Clean', 'Threat']))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Accuracy is deceptive on imbalanced datasets.",
          "Precision cares about purity of positive predictions.",
          "Recall cares about finding all actual positive cases.",
          "F1-score balances Precision and Recall.",
        ],
        essentialSyntax: [
          {
            syntax: "classification_report(y_true, y_pred)",
            description: "Produces text report of precision, recall, f1-score per class.",
          },
        ],
        takeaways: ["Never optimize accuracy in isolation on imbalanced classification tasks."],
        glossary: [
          {
            term: "F1-Score",
            definition: "The harmonic mean of precision and recall, providing a balanced single metric.",
          },
        ],
        revisionQuestions: [
          {
            question: "In medical disease screening, why do doctors prioritize Recall over Precision?",
            answer: "Because a False Negative (missing a sick patient) can be fatal, whereas a False Positive merely results in a confirmatory follow-up test.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q5-1",
          type: "concept",
          prompt: "If a model predicts 10 items as 'Spam', and 9 of them are actually spam, what is the Precision?",
          options: ["90% (0.90)", "10% (0.10)", "100%", "Cannot be determined"],
          correctAnswer: "90% (0.90)",
          explanation: "Precision = TP / (TP + FP) = 9 / 10 = 0.90 (90%).",
        },
      ],
    },

    {
      id: "w7-ch6",
      slug: "classification-practical-project",
      number: 6,
      title: "Classification Practical Project: Intelligent Threat Classifier",
      estimatedMinutes: 30,
      introduction:
        "In this capstone chapter of Workshop 7, you will train, evaluate, and tune a real machine-learning spam and phishing classifier, generate the confusion matrix, calculate Precision/Recall trade-offs, and compare it against the Workshop 1 rule-based Inbox Guardian scanner.",
      learningObjectives: [
        "Train Logistic Regression classifier on message features",
        "Generate and analyze Confusion Matrix and Classification Report",
        "Tune decision threshold from 0.5 to 0.7 to reduce False Positives",
        "Deliver an evidence-based comparison between rules and machine learning",
      ],
      sections: [
        {
          id: "w7-ch6-s1",
          title: "6.1 Practical Code Walkthrough",
          content:
            "```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# 1. Stratified split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)\n\n# 2. Pipeline\nclf = Pipeline([\n    ('scale', StandardScaler()),\n    ('logreg', LogisticRegression(random_state=42))\n])\nclf.fit(X_train, y_train)\n\n# 3. Predict\ny_pred = clf.predict(X_test)\nprint(\"=== CLASSIFICATION REPORT ===\")\nprint(classification_report(y_test, y_pred))\n\nprint(\"=== CONFUSION MATRIX ===\")\nprint(confusion_matrix(y_test, y_pred))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete hands-on classification pipeline.",
          "Confusion matrices and F1 scores provide honest, reliable model assessment.",
        ],
        essentialSyntax: [],
        takeaways: ["Adjusting the decision threshold aligns model behavior with business risk tolerance."],
        glossary: [
          {
            term: "Threshold Tuning",
            definition: "The practice of selecting a non-default probability cutoff to optimize for specific metric priorities (e.g. high recall).",
          },
        ],
        revisionQuestions: [
          {
            question: "What happens to Precision and Recall when you increase the decision threshold from 0.5 to 0.8?",
            answer: "Precision increases (fewer false alarms), but Recall decreases (more true threats are missed).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w7-q6-1",
          type: "concept",
          prompt: "What does raising the probability decision threshold from 0.5 to 0.8 achieve?",
          options: [
            "It makes the model more conservative, increasing Precision at the cost of Recall",
            "It makes the model catch more spam",
            "It speeds up execution time",
            "It resets the weights"
          ],
          correctAnswer: "It makes the model more conservative, increasing Precision at the cost of Recall",
          explanation: "Requiring 80% certainty before flagging reduces false alarms (raising precision), but allows more borderline threats to pass through (lowering recall).",
        },
      ],
    },
  ],
};
