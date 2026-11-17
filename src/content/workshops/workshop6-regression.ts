import { Workshop } from "@/types/curriculum";

export const workshop6Regression: Workshop = {
  id: "w6-regression",
  slug: "regression",
  number: 6,
  title: "Supervised Learning I: Regression",
  subtitle: "Continuous Target Prediction & Linear Mathematical Modeling",
  durationMinutes: 120,
  difficulty: "Intermediate",
  executionMode: "browser-python-scientific",
  targetAudience: "Students developing predictive models for continuous numerical metrics and outcomes.",
  prerequisites: [
    "Completion of Workshop 5 (Machine Learning 101)",
    "Familiarity with basic algebraic equations of lines (y = mx + b)",
  ],
  learningOutcomes: [
    "Define regression problems with continuous numerical targets",
    "Understand the mathematical intuition of Ordinary Least Squares (OLS) line fitting",
    "Train single and multiple linear regression models with scikit-learn",
    "Calculate and interpret regression metrics: MAE, MSE, RMSE, and $R^2$",
    "Diagnose model residuals to verify regression assumptions",
    "Understand the bias-variance tradeoff: underfitting vs overfitting",
    "Build an end-to-end regression model to predict continuous system metrics",
  ],
  projectSlug: "regression-metric-predictor",
  projectTitle: "Continuous Server Response Time & Threat Severity Predictor",
  chapters: [
    {
      id: "w6-ch1",
      slug: "understanding-regression",
      number: 1,
      title: "Understanding Regression: Continuous Numerical Targets",
      estimatedMinutes: 15,
      introduction:
        "Whenever the question asks 'How much?' or 'How many?', you are facing a **regression problem**. In this chapter, you will learn to distinguish regression from classification, understand continuous numerical targets, and map real-world regression applications.",
      learningObjectives: [
        "Differentiate regression from classification based on target variable type",
        "Formulate regression problems across finance, healthcare, engineering, and data systems",
        "Identify continuous numerical targets in real tabular datasets",
      ],
      sections: [
        {
          id: "w6-ch1-s1",
          title: "1.1 Continuous Targets vs Discrete Classes",
          content:
            "- **Classification**: Target $y \\in \\{0, 1\\}$ or a finite set of labels (e.g. 'Spam' vs 'Clean').\n- **Regression**: Target $y \\in \\mathbb{R}$, taking any real numerical value along a continuum (e.g. processing delay: 4.82 seconds; estimated threat score: 78.4).\n\nBecause the target is continuous, predicting the exact value down to infinite decimal places is impossible. Instead, regression models are evaluated by how close their predictions are to the true values (error magnitude).",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Regression predicts continuous quantities.",
          "Predictions are evaluated on error magnitude, not percentage correct.",
        ],
        essentialSyntax: [],
        takeaways: ["Verify that your target variable is numeric and continuous before applying regression."],
        glossary: [
          {
            term: "Regression",
            definition: "A set of statistical processes for estimating the relationships between a dependent continuous variable and one or more independent variables.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why can't classification accuracy be used to evaluate a regression model?",
            answer: "Because continuous numbers rarely match exactly. An accuracy test checking if predicted delay == true delay would yield 0% even if predictions are only 0.001 seconds away.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q1-1",
          type: "concept",
          prompt: "Which of the following is a regression task?",
          options: [
            "Predicting the delivery delay of a message in seconds",
            "Predicting whether an email is phishing or legitimate",
            "Sorting customer support tickets into billing, technical, or sales",
            "Detecting credit card fraud as true or false"
          ],
          correctAnswer: "Predicting the delivery delay of a message in seconds",
          explanation: "Delivery delay in seconds is a continuous numerical measurement.",
        },
      ],
    },

    {
      id: "w6-ch2",
      slug: "linear-regression-intuition",
      number: 2,
      title: "Linear Regression Intuition: The Line of Best Fit",
      estimatedMinutes: 20,
      introduction:
        "Linear Regression is the foundational workhorse of statistical learning. In this chapter, you will understand how a straight line models the relationship between inputs and outputs, what slope and intercept mean, and how Ordinary Least Squares (OLS) finds the best line.",
      learningObjectives: [
        "Explain the linear equation $\\hat{y} = w_1 x_1 + w_2 x_2 + ... + w_p x_p + b$",
        "Interpret slope (weights / coefficients) and intercept (bias)",
        "Define residuals ($e_i = y_i - \\hat{y}_i$) and the Ordinary Least Squares objective",
      ],
      sections: [
        {
          id: "w6-ch2-s1",
          title: "2.1 The Equation of a Line",
          content:
            "In simple linear regression with one feature:\n$$\n\\hat{y} = w \\cdot x + b\n$$\n- **$\\hat{y}$ (y-hat)**: The predicted target value.\n- **$x$**: The input feature.\n- **$w$ (weight / slope)**: The expected change in $y$ for every 1-unit increase in $x$.\n- **$b$ (bias / intercept)**: The value of $y$ when $x = 0$.\n\nIn multiple linear regression with $p$ features, this extends into a hyperplane:\n$$\n\\hat{y} = b + w_1 x_1 + w_2 x_2 + ... + w_p x_p\n$$",
        },
        {
          id: "w6-ch2-s2",
          title: "2.2 Ordinary Least Squares (OLS)",
          content:
            "For each data point $i$, the difference between actual value $y_i$ and prediction $\\hat{y}_i$ is the **residual**:\n$$\ne_i = y_i - \\hat{y}_i\n$$\nOLS finds the optimal weights $w$ and bias $b$ that minimize the **Residual Sum of Squares (RSS)**:\n$$\n\\text{RSS} = \\sum_{i=1}^n (y_i - \\hat{y}_i)^2\n$$\nSquaring the errors accomplishes two things: it penalizes large errors heavily, and prevents positive and negative errors from canceling each other out.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Linear regression fits a hyperplane through data points.",
          "Weights indicate feature impact and direction (+ or -).",
          "OLS minimizes the sum of squared residuals.",
        ],
        essentialSyntax: [],
        takeaways: ["Look at coefficient weights to understand how features influence predictions."],
        glossary: [
          {
            term: "Residual",
            definition: "The vertical difference between an observed data value and the value predicted by the regression line.",
          },
          {
            term: "OLS",
            definition: "Ordinary Least Squares: a method for estimating unknown parameters in a linear regression model by minimizing the sum of squared residuals.",
          },
        ],
        revisionQuestions: [
          {
            question: "If a regression weight $w_1 = +4.5$, what happens to predicted $\\hat{y}$ when feature $x_1$ increases by 2 units?",
            answer: "Predicted $\\hat{y}$ increases by $4.5 \\times 2 = 9.0$ units.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q2-1",
          type: "concept",
          prompt: "What mathematical objective does Ordinary Least Squares (OLS) minimize?",
          options: [
            "The sum of squared residuals between observed and predicted values",
            "The total number of samples",
            "The variance of the feature matrix",
            "The correlation coefficient"
          ],
          correctAnswer: "The sum of squared residuals between observed and predicted values",
          explanation: "OLS finds the line that minimizes $\\sum (y_i - \\hat{y}_i)^2$.",
        },
      ],
    },

    {
      id: "w6-ch3",
      slug: "training-a-regression-model",
      number: 3,
      title: "Training a Regression Model with Scikit-Learn",
      estimatedMinutes: 18,
      introduction:
        "Now you will put mathematics into practice using Python. In this chapter, you will use `LinearRegression` from `sklearn.linear_model` to train a model, extract coefficients, and generate continuous predictions.",
      learningObjectives: [
        "Train a model using `LinearRegression().fit(X_train, y_train)`",
        "Inspect learned coefficients via `.coef_` and intercept via `.intercept_`",
        "Generate and visualize predictions on test data using `.predict(X_test)`",
      ],
      sections: [
        {
          id: "w6-ch3-s1",
          title: "3.1 Code Walkthrough",
          content:
            "```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# 1. Train-test split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 2. Fit Linear Regression\nreg = LinearRegression()\nreg.fit(X_train, y_train)\n\n# 3. Inspect learned parameters\nprint(\"Intercept (b):\", reg.intercept_)\nprint(\"Coefficients (w):\", reg.coef_)\n\n# 4. Generate predictions on test set\ny_pred = reg.predict(X_test)\nprint(\"First 5 Predictions:\", np.round(y_pred[:5], 2))\nprint(\"First 5 Actuals:    \", np.round(y_test[:5], 2))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "LinearRegression finds analytical OLS solutions.",
          "coef_ gives feature weights; intercept_ gives the baseline offset.",
        ],
        essentialSyntax: [
          {
            syntax: "reg = LinearRegression()\nreg.fit(X_train, y_train)",
            description: "Initializes and trains linear regression model.",
          },
          {
            syntax: "reg.coef_ / reg.intercept_",
            description: "Attributes holding learned weights and bias.",
          },
        ],
        takeaways: ["Attributes with a trailing underscore (like coef_) are learned during fit()."],
        glossary: [
          {
            term: "LinearRegression",
            definition: "The scikit-learn estimator implementing Ordinary Least Squares linear regression.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why do learned attributes in scikit-learn (like `coef_` and `intercept_`) end with an underscore?",
            answer: "It is a scikit-learn convention distinguishing parameters estimated from data from user-specified hyperparameters.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q3-1",
          type: "concept",
          prompt: "In scikit-learn's LinearRegression, where are the learned feature weights stored after calling .fit()?",
          options: ["reg.coef_", "reg.weights", "reg.slopes", "reg.parameters"],
          correctAnswer: "reg.coef_",
          explanation: "The fitted coefficients are stored in the attribute `.coef_`.",
        },
      ],
    },

    {
      id: "w6-ch4",
      slug: "evaluating-regression",
      number: 4,
      title: "Evaluating Regression: MAE, MSE, RMSE and R²",
      estimatedMinutes: 20,
      introduction:
        "How do you evaluate whether a regression model is good? In this chapter, you will master the four essential regression evaluation metrics: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and the Coefficient of Determination ($R^2$).",
      learningObjectives: [
        "Compute and interpret Mean Absolute Error (MAE)",
        "Explain why RMSE penalizes large outlier errors more heavily than MAE",
        "Interpret $R^2$ as the proportion of variance explained by the model",
        "Perform residual analysis to check for homoscedasticity and non-linear patterns",
      ],
      sections: [
        {
          id: "w6-ch4-s1",
          title: "4.1 The Core Regression Metrics",
          content:
            "1. **MAE (Mean Absolute Error)**:\n   $$\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^n |y_i - \\hat{y}_i|$$\n   Intuition: 'On average, our prediction is off by X units.' Easy for stakeholders to understand.\n\n2. **RMSE (Root Mean Squared Error)**:\n   $$\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}$$\n   Intuition: In the same units as $y$, but severely penalizes large errors.\n\n3. **$R^2$ (Coefficient of Determination)**:\n   $$R^2 = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}$$\n   Intuition: Proportions of target variance explained by features. $R^2 = 1.0$ is perfect; $0.0$ equals the naive mean baseline; negative values mean worse than the mean baseline!",
        },
        {
          id: "w6-ch4-s2",
          title: "4.2 Code Implementation",
          content:
            "```python\nfrom sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score\n\nmae = mean_absolute_error(y_test, y_pred)\nrmse = root_mean_squared_error(y_test, y_pred)\nr2 = r2_score(y_test, y_pred)\n\nprint(f\"MAE:  {mae:.2f}\")\nprint(f\"RMSE: {rmse:.2f}\")\nprint(f\"R²:   {r2:.3f}\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "MAE: Average absolute error in target units.",
          "RMSE: Sensitive to large errors.",
          "R²: Scale-free metric of variance explained (0.0 to 1.0).",
        ],
        essentialSyntax: [
          {
            syntax: "mean_absolute_error(y_true, y_pred)",
            description: "Computes MAE.",
          },
          {
            syntax: "r2_score(y_true, y_pred)",
            description: "Computes R² score.",
          },
        ],
        takeaways: ["Report both MAE (for human interpretability) and RMSE (for sensitivity to outliers)."],
        glossary: [
          {
            term: "R² Score",
            definition: "The proportion of the variation in the dependent variable that is predictable from the independent variables.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does an $R^2$ score of 0.82 indicate?",
            answer: "It means the model explains 82% of the variance in the target variable around its mean.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q4-1",
          type: "concept",
          prompt: "If a model has an MAE of 5.0 and an RMSE of 18.0, what does the large difference indicate?",
          options: [
            "The model has a few rare predictions with very large errors (outliers)",
            "The model is 100% accurate",
            "The calculation was done in the wrong units",
            "The dataset is too small"
          ],
          correctAnswer: "The model has a few rare predictions with very large errors (outliers)",
          explanation: "Because RMSE squares errors before averaging, large isolated errors inflate RMSE substantially relative to MAE.",
        },
      ],
    },

    {
      id: "w6-ch5",
      slug: "overfitting-and-generalisation",
      number: 5,
      title: "Overfitting, Underfitting and Generalisation",
      estimatedMinutes: 15,
      introduction:
        "The central challenge in all machine learning is the tension between bias and variance. In this chapter, you will learn why overly complex models memorize noise (overfitting), why overly simple models miss real patterns (underfitting), and how to achieve optimal generalisation.",
      learningObjectives: [
        "Diagnose underfitting (high training error, high test error)",
        "Diagnose overfitting (low training error, high test error)",
        "Explain the Bias-Variance tradeoff intuitively",
      ],
      sections: [
        {
          id: "w6-ch5-s1",
          title: "5.1 The Bias-Variance Tradeoff",
          content:
            "1. **Underfitting (High Bias)**: The model is too simple to capture the underlying pattern (e.g. fitting a straight line to a complex wavy curve). Both training and test errors are high.\n2. **Overfitting (High Variance)**: The model is overly complex (e.g. a 20-degree polynomial or unconstrained decision tree). It fits training noise and quirks perfectly, but fails miserably on unseen test data.\n3. **Optimal Model**: Strikes the sweet spot that minimizes total error on unseen data.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Overfitting: Learns training noise; fails on test data.",
          "Underfitting: Too simple to capture real trends.",
          "Always monitor the gap between training score and testing score.",
        ],
        essentialSyntax: [],
        takeaways: ["A large gap between high train accuracy and low test accuracy is the signature of overfitting."],
        glossary: [
          {
            term: "Generalisation",
            definition: "The ability of a machine learning model to make accurate predictions on new, previously unseen data.",
          },
        ],
        revisionQuestions: [
          {
            question: "How do you detect if a model is overfitting using train and test metrics?",
            answer: "If the training error is near zero but test error is significantly higher, the model is overfitting.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q5-1",
          type: "concept",
          prompt: "What is indicated when a model achieves R² = 0.99 on training data, but R² = 0.42 on test data?",
          options: ["Severe overfitting", "Underfitting", "Data leakage", "Perfect generalisation"],
          correctAnswer: "Severe overfitting",
          explanation: "A massive drop in performance from training to testing demonstrates high variance / overfitting.",
        },
      ],
    },

    {
      id: "w6-ch6",
      slug: "regression-practical-project",
      number: 6,
      title: "Regression Practical Project: Response Time Predictor",
      estimatedMinutes: 25,
      introduction:
        "In this capstone chapter of Workshop 6, you will build, evaluate, and interpret a complete end-to-end multiple regression pipeline that predicts server message processing delay based on word count, keyword indicators, and network load.",
      learningObjectives: [
        "Train, validate, and compare candidate linear regression pipelines",
        "Compute MAE, RMSE, and $R^2$ on test data",
        "Generate a residual plot to verify model assumptions",
        "Communicate model limitations and expected error margins",
      ],
      sections: [
        {
          id: "w6-ch6-s1",
          title: "6.1 Practical Pipeline Walkthrough",
          content:
            "Follow the complete pipeline:\n\n```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error, r2_score\n\n# 1. Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 2. Build Pipeline\nmodel = Pipeline([\n    ('scaler', StandardScaler()),\n    ('regressor', LinearRegression())\n])\nmodel.fit(X_train, y_train)\n\n# 3. Evaluate\ny_pred = model.predict(X_test)\nprint(f\"Test MAE: {mean_absolute_error(y_test, y_pred):.2f} ms\")\nprint(f\"Test R²:  {r2_score(y_test, y_pred):.3f}\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete hands-on mastery of regression workflow.",
          "Linear regression provides interpretable feature coefficients.",
        ],
        essentialSyntax: [],
        takeaways: ["Always communicate predictions along with an expected error margin (± MAE)."],
        glossary: [
          {
            term: "Residual Plot",
            definition: "A scatter plot of residuals against predicted values, used to detect non-linearity, unequal error variances, and outliers.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does a random cloud of points around zero in a residual plot indicate?",
            answer: "It indicates that the linear model assumptions are well-satisfied and errors are distributed normally without systematic bias.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w6-q6-1",
          type: "concept",
          prompt: "What does an MAE of 3.2 ms mean for a server latency prediction model?",
          options: [
            "On average, the model's latency prediction is within 3.2 milliseconds of the actual latency",
            "The server was down for 3.2 ms",
            "The model took 3.2 ms to train",
            "The model has 3.2% error"
          ],
          correctAnswer: "On average, the model's latency prediction is within 3.2 milliseconds of the actual latency",
          explanation: "MAE directly expresses the average magnitude of absolute error in the native units of the target variable.",
        },
      ],
    },
  ],
};
