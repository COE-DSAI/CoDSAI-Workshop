import { Workshop } from "@/types/curriculum";

export const workshop4Visualization: Workshop = {
  id: "w4-visualisation",
  slug: "visualisation",
  number: 4,
  title: "Make Data Speak: Visualization & Exploratory Analysis",
  subtitle: "Visual Intuition, Statistical Plotting & Exploratory Data Analysis (EDA)",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "browser-python-scientific",
  targetAudience: "Data analysts, domain specialists, and machine learning practitioners seeking to uncover data insights visually.",
  prerequisites: [
    "Completion of Workshop 3 (Data Handling with NumPy & Pandas)",
    "Understanding of Pandas DataFrames, Series, and summary statistics",
  ],
  learningOutcomes: [
    "Formulate focused investigative questions to steer Exploratory Data Analysis (EDA)",
    "Select the right chart type based on variable types (categorical vs continuous)",
    "Analyze univariate distributions using histograms, kernel density estimates, and boxplots",
    "Identify bivariate relationships and interactions using scatter plots and grouped bar charts",
    "Compute and interpret Pearson and Spearman correlation matrices without confusing correlation with causation",
    "Construct publication-quality figures using Matplotlib object-oriented APIs and Seaborn themes",
    "Detect outliers, data skews, and data collection anomalies visually",
    "Deliver an end-to-end evidence-based Exploratory Data Analysis report on real message metrics",
  ],
  projectSlug: "eda-insights-report",
  projectTitle: "Comprehensive Exploratory Data Analysis & Visual Insights Report",
  chapters: [
    {
      id: "w4-ch1",
      slug: "thinking-with-data",
      number: 1,
      title: "Thinking with Data: The Purpose of EDA",
      estimatedMinutes: 12,
      introduction:
        "Raw numbers rarely reveal their secrets when viewed in text tables. Exploratory Data Analysis (EDA), pioneered by mathematician John Tukey, is the detective work of data science. In this chapter, you will learn how to interrogate data, classify variable types, and select chart types based on analytical goals.",
      learningObjectives: [
        "Explain the primary goals of Exploratory Data Analysis (EDA)",
        "Classify variables into Numerical (Continuous/Discrete) and Categorical (Nominal/Ordinal)",
        "Map analytical questions to optimal visual chart types",
      ],
      sections: [
        {
          id: "w4-ch1-s1",
          title: "1.1 What is Exploratory Data Analysis?",
          content:
            "EDA is the practice of inspecting, visualizing, and summarizing dataset characteristics before applying statistical modeling or machine learning. It helps you:\n- Uncover hidden patterns and relationships\n- Spot anomalies, outliers, and data collection errors\n- Test foundational hypotheses\n- Guide feature engineering and algorithm selection",
        },
        {
          id: "w4-ch1-s2",
          title: "1.2 Taxonomy of Variables",
          content:
            "1. **Numerical - Continuous**: Measurements that can take any value in a range (e.g. response time in milliseconds: 142.6 ms).\n2. **Numerical - Discrete**: Countable integers (e.g. number of suspicious keywords: 3).\n3. **Categorical - Nominal**: Unordered distinct categories (e.g. sender domain: 'gmail.com', 'yahoo.com').\n4. **Categorical - Ordinal**: Ordered categories with ranking (e.g. risk level: 'Low' < 'Medium' < 'High').",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "EDA precedes all modeling.",
          "Chart choice is strictly dictated by data types: continuous vs discrete, numerical vs categorical.",
        ],
        essentialSyntax: [
          {
            syntax: "df.dtypes",
            description: "Checks data types across all columns.",
          },
        ],
        takeaways: ["Never feed data into a machine learning model without conducting thorough EDA first."],
        glossary: [
          {
            term: "EDA",
            definition: "Exploratory Data Analysis: an approach to analyzing data sets to summarize their main characteristics, often with visual methods.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why can summary statistics alone (like mean and variance) be misleading without visualization?",
            answer: "Because fundamentally different distributions (such as Anscombe's Quartet) can share identical summary statistics while exhibiting completely different patterns.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q1-1",
          type: "concept",
          prompt: "What type of variable is 'Risk Level' with values Low, Medium, High?",
          options: ["Categorical - Ordinal", "Categorical - Nominal", "Numerical - Continuous", "Discrete Integer"],
          correctAnswer: "Categorical - Ordinal",
          explanation: "Ordinal categorical variables have a natural, inherent ordering (Low < Medium < High).",
        },
      ],
    },

    {
      id: "w4-ch2",
      slug: "understanding-a-dataset",
      number: 2,
      title: "Understanding a Dataset: Initial Profiling Workflow",
      estimatedMinutes: 15,
      introduction:
        "Every EDA project begins with a structured initial inspection checklist. In this chapter, you will learn a systematic 5-step dataset health and profiling workflow.",
      learningObjectives: [
        "Perform a 5-step dataset triage: dimensions, schema, missingness, duplicates, and ranges",
        "Identify data collection anomalies and impossible values (e.g. negative word counts)",
        "Formulate data-driven hypotheses for visual investigation",
      ],
      sections: [
        {
          id: "w4-ch2-s1",
          title: "2.1 The 5-Step Triage Checklist",
          content:
            "1. **Dimensions**: `df.shape` (how many samples and features?)\n2. **Schema & Types**: `df.dtypes` and `df.info()` (are numbers parsed as strings?)\n3. **Missing Data**: `df.isnull().sum()` (what % of data is absent?)\n4. **Range & Outliers**: `df.describe()` (are min and max values physically possible?)\n5. **Uniqueness**: `df.nunique()` (are IDs truly unique?)",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Systematic triage catches data bugs early.",
          "Check min and max values for impossible entries.",
        ],
        essentialSyntax: [
          {
            syntax: "df.nunique()",
            description: "Counts distinct values per column.",
          },
        ],
        takeaways: ["Check for data hygiene before trusting visual charts."],
        glossary: [
          {
            term: "Data Profiling",
            definition: "The process of examining the data available in an existing data source and collecting statistics or informative summaries about that data.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does it indicate if a column 'user_age' has a minimum value of -5 in `df.describe()`?",
            answer: "It indicates a data entry error, sensor glitch, or sentinel missing value code that must be cleaned.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q2-1",
          type: "concept",
          prompt: "Which command reveals the count of unique values in each column of a DataFrame?",
          options: ["df.nunique()", "df.unique()", "df.count_unique()", "df.distinct()"],
          correctAnswer: "df.nunique()",
          explanation: "nunique() returns a Series with the count of distinct elements per column.",
        },
      ],
    },

    {
      id: "w4-ch3",
      slug: "univariate-visualisation",
      number: 3,
      title: "Univariate Visualisation: Histograms, Bars and Boxplots",
      estimatedMinutes: 15,
      introduction:
        "Univariate analysis examines one variable at a time. In this chapter, you will learn to use histograms to view frequency distributions, boxplots to detect outliers and quartiles, and bar charts for categorical frequencies.",
      learningObjectives: [
        "Construct and interpret histograms to assess distribution skewness and modality",
        "Read a 5-number summary on a Tukey boxplot (min, Q1, median, Q3, max, outliers)",
        "Plot bar charts for categorical frequency comparisons",
      ],
      sections: [
        {
          id: "w4-ch3-s1",
          title: "3.1 Histograms & Distribution Shapes",
          content:
            "A **histogram** groups continuous data into discrete bins along the x-axis and displays count frequencies on the y-axis:\n- **Normal (Bell-shaped)**: Symmetric around the mean.\n- **Right-skewed (Positive)**: Long tail extends to the right (common in income, message lengths).\n- **Bimodal**: Two distinct peaks, indicating two sub-populations.",
        },
        {
          id: "w4-ch3-s2",
          title: "3.2 Boxplots & Outlier Detection",
          content:
            "A **boxplot** displays the 5-number summary:\n- Box spans the **Interquartile Range (IQR)**: from 25th percentile (Q1) to 75th percentile (Q3).\n- Line inside the box marks the **Median** (50th percentile).\n- Whiskers extend to `1.5 * IQR`.\n- Individual points beyond the whiskers are flagged as **statistical outliers**.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Histograms show distribution shape and skewness.",
          "Boxplots provide quick quartile summaries and highlight extreme outliers.",
          "Bar charts compare discrete categorical counts.",
        ],
        essentialSyntax: [
          {
            syntax: "df['col'].plot(kind='hist', bins=20)",
            description: "Generates histogram of column.",
          },
          {
            syntax: "df.boxplot(column='metric')",
            description: "Generates boxplot.",
          },
        ],
        takeaways: ["Never use a line chart for categorical comparisons."],
        glossary: [
          {
            term: "IQR (Interquartile Range)",
            definition: "The range between the 75th and 25th percentiles (Q3 - Q1), representing the middle 50% of the data.",
          },
        ],
        revisionQuestions: [
          {
            question: "How is an outlier defined in a standard Tukey boxplot?",
            answer: "Any data point lying more than 1.5 times the IQR above Q3 or below Q1.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q3-1",
          type: "concept",
          prompt: "What does the middle line inside the box of a boxplot represent?",
          options: ["Median (50th percentile)", "Mean", "Mode", "Standard Deviation"],
          correctAnswer: "Median (50th percentile)",
          explanation: "The center line of a boxplot marks the median value of the distribution.",
        },
      ],
    },

    {
      id: "w4-ch4",
      slug: "relationships-between-variables",
      number: 4,
      title: "Relationships Between Variables: Bivariate Visualisation",
      estimatedMinutes: 15,
      introduction:
        "Bivariate analysis explores how two variables interact. In this chapter, you will use scatter plots to examine continuous vs continuous relationships, line charts for temporal sequences, and grouped comparisons.",
      learningObjectives: [
        "Create scatter plots to visualize linear and non-linear associations",
        "Add color hue encoding to reveal multi-class subgroups",
        "Plot line charts to track trends across ordered time dimensions",
      ],
      sections: [
        {
          id: "w4-ch4-s1",
          title: "4.1 Scatter Plots & Continuous Associations",
          content:
            "A scatter plot places variable X on the horizontal axis and variable Y on the vertical axis. Each sample is a point. Look for:\n- **Linear association**: Points cluster along a straight line\n- **Non-linear association**: Curvilinear or exponential clustering\n- **Homoscedasticity vs Heteroscedasticity**: Does the variance stay constant or fan out?",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Scatter plots reveal associations between two continuous variables.",
          "Color hue adds a third categorical dimension cleanly.",
        ],
        essentialSyntax: [
          {
            syntax: "df.plot.scatter(x='var1', y='var2')",
            description: "Generates scatter plot.",
          },
        ],
        takeaways: ["Look for clusters, trends, and spread across the axes."],
        glossary: [
          {
            term: "Bivariate Analysis",
            definition: "The analysis of two variables simultaneously to determine the empirical relationship between them.",
          },
        ],
        revisionQuestions: [
          {
            question: "What chart should you choose to compare sales volume across 12 consecutive months?",
            answer: "A line chart (or bar chart), with month on the x-axis and sales volume on the y-axis.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q4-1",
          type: "concept",
          prompt: "Which plot is ideal for visualizing the relationship between message length and spam risk score?",
          options: ["Scatter plot", "Pie chart", "Bar chart", "Histogram"],
          correctAnswer: "Scatter plot",
          explanation: "Scatter plots are designed to visualize the co-variation between two continuous variables.",
        },
      ],
    },

    {
      id: "w4-ch5",
      slug: "correlation-and-patterns",
      number: 5,
      title: "Correlation and Patterns: Heatmaps & Pitfalls",
      estimatedMinutes: 15,
      introduction:
        "How strongly are variables related? In this chapter, you will learn to compute Pearson's correlation coefficient (`r`), visualize correlation matrices using heatmaps, and avoid the critical trap of confusing correlation with causation.",
      learningObjectives: [
        "Interpret Pearson's correlation coefficient r (-1.0 to +1.0)",
        "Compute and display correlation matrices with `df.corr()`",
        "Explain why correlation does not imply causation with real-world counterexamples",
      ],
      sections: [
        {
          id: "w4-ch5-s1",
          title: "5.1 Pearson's Correlation Coefficient",
          content:
            "Pearson's $r$ quantifies linear correlation:\n- `+1.0`: Perfect positive linear correlation\n- `0.0`: No linear relationship\n- `-1.0`: Perfect negative linear correlation\n\n```python\ncorr_matrix = df[['message_length', 'keyword_matches', 'risk_score']].corr()\nprint(corr_matrix)\n```",
        },
        {
          id: "w4-ch5-s2",
          title: "5.2 Correlation is NOT Causation",
          content:
            "> [!WARNING]\n> **Correlation does not equal causation.**\n>\n> Two variables can be strongly correlated due to a lurking third variable (confounder) or pure coincidence. For example, ice cream sales and drowning incidents correlate strongly, but eating ice cream does not cause drowning — summer weather causes both!",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "r measures linear strength only (cannot detect non-linear curves).",
          "Always verify visual scatter plots alongside numerical r values.",
          "Beware confounding variables.",
        ],
        essentialSyntax: [
          {
            syntax: "df.corr()",
            description: "Calculates pairwise correlation of columns.",
          },
        ],
        takeaways: ["Never assert causal mechanisms based purely on statistical correlation."],
        glossary: [
          {
            term: "Pearson's r",
            definition: "A statistical measure of the strength and direction of linear association between two continuous variables.",
          },
        ],
        revisionQuestions: [
          {
            question: "If two variables have a correlation of 0.0, does it guarantee they are completely unrelated?",
            answer: "No. It only proves there is no LINEAR relationship. They could have a strong quadratic or non-linear relationship (e.g. y = x^2).",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q5-1",
          type: "concept",
          prompt: "What does a correlation coefficient of -0.85 indicate?",
          options: [
            "Strong negative linear relationship",
            "Weak relationship",
            "No relationship",
            "Error in calculation"
          ],
          correctAnswer: "Strong negative linear relationship",
          explanation: "Values close to -1 indicate a strong inverse linear relationship: as one variable increases, the other decreases.",
        },
      ],
    },

    {
      id: "w4-ch6",
      slug: "matplotlib-and-seaborn",
      number: 6,
      title: "Matplotlib & Seaborn: Aesthetic, Publication-Ready Plots",
      estimatedMinutes: 15,
      introduction:
        "Matplotlib is Python's foundational plotting library, and Seaborn provides high-level statistical visualization themes. In this chapter, you will master the Object-Oriented Matplotlib API (`fig, ax = plt.subplots()`), customize titles, labels, legends, and apply modern palettes.",
      learningObjectives: [
        "Differentiate between Matplotlib's pyplot state machine and the Object-Oriented (OO) Figure/Axes API",
        "Create multi-panel subplot grids",
        "Apply Seaborn themes, color palettes, and readable typographic labels",
      ],
      sections: [
        {
          id: "w4-ch6-s1",
          title: "6.1 The Object-Oriented Matplotlib Pattern",
          content:
            "Always use the Object-Oriented pattern for maintainable figures:\n\n```python\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nsns.set_theme(style=\"whitegrid\")\n\n# Create figure and axis objects explicitly\nfig, ax = plt.subplots(figsize=(8, 5))\n\n# Plot on the axis\nax.scatter(df['keyword_matches'], df['risk_score'], color='#2563EB', alpha=0.7)\n\n# Customize labels and typography\nax.set_title(\"Suspicious Keywords vs Risk Score\", fontsize=13, fontweight='bold', pad=12)\nax.set_xlabel(\"Count of Matched Indicators\", fontsize=11)\nax.set_ylabel(\"Calculated Risk Score (0-100)\", fontsize=11)\n\nplt.tight_layout()\nplt.show()\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Figure is the canvas; Axes is the plot area.",
          "Use fig, ax = plt.subplots() for clean modular code.",
          "sns.set_theme() provides accessible, polished default styling.",
        ],
        essentialSyntax: [
          {
            syntax: "fig, ax = plt.subplots(figsize=(w, h))",
            description: "Initializes figure and axis.",
          },
          {
            syntax: "ax.set_xlabel('Label') / ax.set_ylabel('Label')",
            description: "Sets axis labels.",
          },
        ],
        takeaways: ["Always label axes with clear units of measurement."],
        glossary: [
          {
            term: "Axes",
            definition: "The region of the image containing the data space, ticks, labels, and plot elements in Matplotlib.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is `fig, ax = plt.subplots()` preferred over `plt.plot()`?",
            answer: "The Object-Oriented approach gives precise control over multiple subplots, axes, and prevents state pollution between figures.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q6-1",
          type: "concept",
          prompt: "In Matplotlib, what does `fig` represent?",
          options: ["The entire top-level window/canvas", "An individual bar", "The x-axis line", "The legend title"],
          correctAnswer: "The entire top-level window/canvas",
          explanation: "Figure is the top-level container holding all subplots, canvases, and global graphic elements.",
        },
      ],
    },

    {
      id: "w4-ch7",
      slug: "communicating-findings",
      number: 7,
      title: "Communicating Findings: Visual Storytelling & Ethics",
      estimatedMinutes: 12,
      introduction:
        "A chart is only useful if human decision-makers understand what it means. In this chapter, you will learn data communication best practices: avoiding truncated y-axes, choosing accessible colorblind-safe palettes, and writing clear analytical takeaways.",
      learningObjectives: [
        "Identify deceptive visualization practices (truncated axes, disproportionate scales)",
        "Select accessible, colorblind-friendly color palettes (e.g. Viridis, ColorBrewer)",
        "Write executive summaries that link visual evidence to actionable recommendations",
      ],
      sections: [
        {
          id: "w4-ch7-s1",
          title: "7.1 Ethical Visualizations",
          content:
            "Never distort data to fit a narrative:\n- **Do not truncate bar chart y-axes**: Bar chart heights represent quantities; cutting the bottom exaggerates small differences dishonestly.\n- **Use accessible palettes**: Approximately 8% of men have color vision deficiency. Avoid red-green palettes; prefer blue-orange or viridis.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Honest charts start bar charts at zero.",
          "Use colorblind-safe palettes.",
          "Pair every visual with a clear textual insight.",
        ],
        essentialSyntax: [
          {
            syntax: "palette='colorblind'",
            description: "Applies colorblind safe palette in Seaborn.",
          },
        ],
        takeaways: ["Clarity and truthfulness trump visual complexity every time."],
        glossary: [
          {
            term: "Data Storytelling",
            definition: "The practice of building a narrative around data and its visualizations to help convey the meaning of the data in an engaging, actionable way.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is truncating the y-axis of a bar chart considered misleading?",
            answer: "Because the visual area of the bar encodes the magnitude. Truncating the axis artificially magnifies negligible differences.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q7-1",
          type: "concept",
          prompt: "Which color combination is safest for colorblind accessibility?",
          options: ["Blue and Orange", "Red and Green", "Light Pink and Light Green", "Red and Brown"],
          correctAnswer: "Blue and Orange",
          explanation: "Blue and orange provide strong luminance and hue contrast that is easily distinguishable by individuals with red-green color vision deficiencies.",
        },
      ],
    },

    {
      id: "w4-ch8",
      slug: "eda-practical-project",
      number: 8,
      title: "EDA Practical Project: Message Threat Intelligence Report",
      estimatedMinutes: 24,
      introduction:
        "In this capstone chapter of Workshop 4, you will synthesize all visual analysis techniques to conduct an end-to-end Exploratory Data Analysis on a real inbox threat dataset, generate publication-ready plots, and author an evidence-based security summary.",
      learningObjectives: [
        "Conduct complete EDA pipeline on tabular message dataset",
        "Generate univariate, bivariate, and correlation heatmaps",
        "Synthesize findings into an actionable executive report",
      ],
      sections: [
        {
          id: "w4-ch8-s1",
          title: "8.1 Project Deliverable Blueprint",
          content:
            "Your EDA report must answer three business questions:\n1. What is the frequency distribution of suspicious keywords across incoming messages?\n2. Do phishing messages have significantly higher word counts than regular emails?\n3. Which domains exhibit the highest average threat score?",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Complete synthesis of Exploratory Data Analysis skills.",
          "Visualizations provide the empirical justification for machine learning model selection.",
        ],
        essentialSyntax: [
          {
            syntax: "plt.savefig('report_figure.png', dpi=300)",
            description: "Exports high-resolution publication graphic.",
          },
        ],
        takeaways: ["An insightful EDA report is often more valuable than an uninterpretable black-box model."],
        glossary: [
          {
            term: "Executive Summary",
            definition: "A concise overview of research findings and key takeaways designed for rapid comprehension by stakeholders.",
          },
        ],
        revisionQuestions: [
          {
            question: "What is the final step of an EDA workflow?",
            answer: "Documenting findings, noting data limitations, and outlining concrete next steps for modeling or operational intervention.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w4-q8-1",
          type: "concept",
          prompt: "What file format is best for lossless high-resolution figure export in Matplotlib?",
          options: ["PNG with dpi=300 (or vector PDF/SVG)", "Low-quality GIF", "BMP", "TXT"],
          correctAnswer: "PNG with dpi=300 (or vector PDF/SVG)",
          explanation: "High DPI PNG or vector SVG/PDF formats preserve sharp line quality and readable text.",
        },
      ],
    },
  ],
};
