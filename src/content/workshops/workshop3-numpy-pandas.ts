import { Workshop } from "@/types/curriculum";

export const workshop3NumPyPandas: Workshop = {
  id: "w3-numpy-pandas",
  slug: "numpy-pandas",
  number: 3,
  title: "Data Handling with NumPy & Pandas",
  subtitle: "Vectorized Computing & Tabular Data Wrangling",
  durationMinutes: 120,
  difficulty: "Beginner",
  executionMode: "browser-python-scientific",
  targetAudience: "Students entering data analysis, exploratory data science, and applied machine learning.",
  prerequisites: [
    "Completion of Workshop 1 (Python Foundations)",
    "Familiarity with lists, dictionaries, and functions",
  ],
  learningOutcomes: [
    "Explain why NumPy ndarrays drastically outperform standard Python lists in memory and speed",
    "Create, reshape, slice, and index multi-dimensional NumPy arrays",
    "Apply vectorized mathematical operations, broadcasting, and boolean masking",
    "Construct, inspect, and manipulate Pandas Series and DataFrames",
    "Load, parse, and profile tabular datasets using read_csv(), head(), info(), and describe()",
    "Clean missing data (isnull, dropna, fillna), duplicate records, and invalid data types",
    "Filter, slice, query, and aggregate data using groupby() and pivot summaries",
    "Prepare structured feature matrices and target vectors ready for machine learning pipelines",
  ],
  projectSlug: "data-wrangling-pipeline",
  projectTitle: "Student Performance & Message Metrics Wrangling Pipeline",
  chapters: [
    {
      id: "w3-ch1",
      slug: "intro-numerical-data",
      number: 1,
      title: "Introduction to Numerical Data",
      estimatedMinutes: 12,
      introduction:
        "Standard Python lists are versatile, but they are inefficient for numerical computing with millions of numbers. In this chapter, you will understand why numerical arrays exist, how contiguous memory allocation enables lightning-fast calculations, and how to install and import scientific computing packages.",
      learningObjectives: [
        "Contrast Python list overhead with contiguous C-array memory in NumPy",
        "Explain the concept of vectorized operations vs Python loop iterations",
        "Import NumPy and Pandas using standard industry aliases (`import numpy as np`, `import pandas as pd`)",
      ],
      sections: [
        {
          id: "w3-ch1-s1",
          title: "1.1 The Limitations of Standard Python Lists",
          content:
            "A standard Python list is an array of pointers to arbitrary objects stored scattered across computer memory. When you compute `[x * 2 for x in my_list]`, Python must dereference each pointer, inspect its type at runtime, and allocate a new object. This dynamic type overhead makes large computations 50 to 100 times slower than compiled C or Fortran.\n\n**NumPy** solves this by storing numbers in **contiguous blocks of memory** with fixed, uniform data types (`float64`, `int32`), allowing modern CPU SIMD (Single Instruction, Multiple Data) vectorization.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "NumPy stores homogeneous data in contiguous memory.",
          "Vectorization replaces slow Python loops with optimized C routines.",
        ],
        essentialSyntax: [
          {
            syntax: "import numpy as np\nimport pandas as pd",
            description: "Standard conventional package imports.",
          },
        ],
        takeaways: ["Always use NumPy arrays when working with numerical matrices."],
        glossary: [
          {
            term: "Vectorization",
            definition: "The process of performing mathematical operations on entire arrays simultaneously rather than element-by-element loops.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is NumPy faster than standard Python lists for numerical operations?",
            answer: "NumPy arrays use contiguous memory blocks and homogeneous data types, avoiding Python object pointer overhead and leveraging C-level vectorization.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q1-1",
          type: "concept",
          prompt: "What is the standard community import alias for NumPy?",
          options: ["import numpy as np", "import numpy as n", "import numpy as num", "use numpy"],
          correctAnswer: "import numpy as np",
          explanation: "The global Python data science community standard is `import numpy as np`.",
        },
      ],
    },

    {
      id: "w3-ch2",
      slug: "numpy-arrays",
      number: 2,
      title: "NumPy Arrays: Creation, Shapes and Slicing",
      estimatedMinutes: 15,
      introduction:
        "The core object in NumPy is the multi-dimensional array (`ndarray`). In this chapter, you will learn to create arrays from lists, generate zeros, ones, and ranges, inspect array shapes and dimensions, and slice multi-dimensional matrices.",
      learningObjectives: [
        "Create 1D and 2D arrays using `np.array()`",
        "Generate initialized arrays using `np.zeros()`, `np.ones()`, and `np.arange()`",
        "Inspect `.shape`, `.ndim`, and `.dtype` attributes",
        "Slice rows and columns using 2D matrix notation `arr[row_slice, col_slice]`",
      ],
      sections: [
        {
          id: "w3-ch2-s1",
          title: "2.1 Array Creation and Dimensions",
          content:
            "An array can be 1-dimensional (like a vector) or 2-dimensional (like a table with rows and columns):\n\n```python\nimport numpy as np\n\n# 1D array\nvec = np.array([10, 20, 30, 40])\nprint(vec.shape)  # (4,)\n\n# 2D array (3 rows, 2 columns)\nmat = np.array([\n    [1, 2],\n    [3, 4],\n    [5, 6]\n])\nprint(mat.shape)  # (3, 2)\nprint(mat.ndim)   # 2 dimensions\n```",
        },
        {
          id: "w3-ch2-s2",
          title: "2.2 Slicing 2D Matrices",
          content:
            "In 2D slicing, provide `[row_range, col_range]` separated by a comma:\n- `mat[:, 0]`: All rows, first column (column vector)\n- `mat[0, :]`: First row, all columns\n- `mat[0:2, 0:2]`: Top-left 2x2 submatrix",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "ndarray is homogeneous: all elements share the same dtype.",
          ".shape gives a tuple of dimensions (rows, cols).",
          "2D slicing syntax is [rows, columns].",
        ],
        essentialSyntax: [
          {
            syntax: "np.zeros((rows, cols)) / np.ones((rows, cols))",
            description: "Creates matrix filled with 0.0 or 1.0.",
          },
          {
            syntax: "np.arange(start, stop, step)",
            description: "Array equivalent of Python range().",
          },
        ],
        takeaways: ["Remember that slicing an ndarray returns a view, not a copy."],
        glossary: [
          {
            term: "ndarray",
            definition: "The foundational n-dimensional array data structure provided by NumPy.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does `arr.shape` return for a matrix with 10 rows and 3 columns?",
            answer: "It returns the tuple `(10, 3)`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q2-1",
          type: "predict-output",
          prompt: "What will `np.arange(1, 5)` produce?",
          options: ["[1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "Error"],
          correctAnswer: "[1, 2, 3, 4]",
          explanation: "np.arange(start, stop) excludes the stop value, yielding array([1, 2, 3, 4]).",
        },
      ],
    },

    {
      id: "w3-ch3",
      slug: "numerical-operations",
      number: 3,
      title: "Numerical Operations, Broadcasting and Aggregations",
      estimatedMinutes: 15,
      introduction:
        "NumPy enables element-wise arithmetic without loops. In this chapter, you will master array arithmetic, broadcasting (operating on arrays of differing shapes), aggregation functions (mean, std, sum, min, max), and boolean masking.",
      learningObjectives: [
        "Perform element-wise arithmetic (+, -, *, /) directly on arrays",
        "Understand the rules of NumPy broadcasting",
        "Compute summary statistics: `np.mean()`, `np.std()`, `np.median()`, `np.sum()`",
        "Filter values using boolean masks: `arr[arr > 50]`",
      ],
      sections: [
        {
          id: "w3-ch3-s1",
          title: "3.1 Element-wise Operations and Aggregations",
          content:
            "Operations on arrays happen element by element instantly:\n\n```python\nimport numpy as np\nscores = np.array([85, 92, 78, 64, 99])\ncurved = scores + 5  # Adds 5 to every element via broadcasting\n\nprint(\"Mean score:\", np.mean(curved))\nprint(\"Standard deviation:\", np.std(curved))\nprint(\"Top score:\", np.max(curved))\n```",
        },
        {
          id: "w3-ch3-s2",
          title: "3.2 Boolean Masking",
          content:
            "Evaluating a condition on an array produces a boolean array of identical shape called a **mask**:\n\n```python\npassed_mask = scores >= 75  # [True, True, True, False, True]\nhigh_performers = scores[passed_mask]  # Filters only True entries\nprint(high_performers)  # [85, 92, 78, 99]\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Broadcasting expands smaller array shapes across larger arrays automatically.",
          "Aggregations compute reductions across axes (axis=0 columns, axis=1 rows).",
          "Boolean masking is the fastest way to filter numerical datasets.",
        ],
        essentialSyntax: [
          {
            syntax: "np.mean(arr, axis=0)",
            description: "Computes column-wise arithmetic mean.",
          },
          {
            syntax: "arr[condition]",
            description: "Boolean filtering.",
            example: "arr[arr > 0]",
          },
        ],
        takeaways: ["Never write a for loop to filter numbers in an array; always use boolean masks."],
        glossary: [
          {
            term: "Broadcasting",
            definition: "The mechanism that allows NumPy to perform arithmetic between arrays of different shapes.",
          },
        ],
        revisionQuestions: [
          {
            question: "How do you calculate the average of each column in a 2D matrix?",
            answer: "Use `np.mean(matrix, axis=0)`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q3-1",
          type: "predict-output",
          prompt: "What is `np.array([2, 4, 6]) * 2`?",
          options: ["array([4, 8, 12])", "array([2, 4, 6, 2, 4, 6])", "[4, 8, 12]", "Error"],
          correctAnswer: "array([4, 8, 12])",
          explanation: "In NumPy, multiplication by a scalar multiplies every element (vectorized). Unlike lists, it does not concatenate.",
        },
      ],
    },

    {
      id: "w3-ch4",
      slug: "intro-pandas",
      number: 4,
      title: "Introduction to Pandas: Series and DataFrames",
      estimatedMinutes: 15,
      introduction:
        "While NumPy handles raw numerical tensors, real-world data contains column names, dates, text categories, and missing values. Enter **Pandas**: Python's premier data analysis library. In this chapter, you will learn about Series (1D labelled column) and DataFrames (2D tabular matrix).",
      learningObjectives: [
        "Distinguish between a 1D Pandas Series and a 2D DataFrame",
        "Create DataFrames from Python dictionaries",
        "Inspect datasets using `.head()`, `.tail()`, `.info()`, and `.describe()`",
        "Access columns via dictionary-style indexing (`df['col']`)",
      ],
      sections: [
        {
          id: "w3-ch4-s1",
          title: "4.1 The DataFrame Architecture",
          content:
            "A **DataFrame** is a two-dimensional, size-mutable, tabular data structure with labelled axes (rows and columns). Each column is a **Pandas Series**:\n\n```python\nimport pandas as pd\n\ndata = {\n    'message_id': [101, 102, 103, 104],\n    'sender_domain': ['gmail.com', 'promo-win.net', 'bank-alerts.com', 'univ.edu'],\n    'keyword_matches': [0, 3, 4, 0],\n    'is_suspicious': [False, True, True, False]\n}\n\ndf = pd.DataFrame(data)\nprint(df)\n```",
        },
        {
          id: "w3-ch4-s2",
          title: "4.2 Essential Profiling Methods",
          content:
            "- `df.head(n)`: Views first n rows (default 5).\n- `df.info()`: Prints concise summary: column names, non-null counts, memory usage, and dtypes.\n- `df.describe()`: Generates descriptive summary statistics (count, mean, std, min, 25%, 50%, 75%, max) for numeric columns.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "A Series is a labelled 1D array.",
          "A DataFrame is a collection of Series sharing a common row index.",
          "info() and describe() give instant visibility into dataset quality.",
        ],
        essentialSyntax: [
          {
            syntax: "df = pd.DataFrame(dict_of_lists)",
            description: "Creates DataFrame from dictionary.",
          },
          {
            syntax: "df.info() / df.describe()",
            description: "Summarizes schema and statistical distribution.",
          },
        ],
        takeaways: ["Always run df.info() first when loading any new dataset."],
        glossary: [
          {
            term: "DataFrame",
            definition: "The primary 2D tabular data structure in Pandas with labeled axes.",
          },
        ],
        revisionQuestions: [
          {
            question: "What does `df.describe()` display by default?",
            answer: "Summary statistics (count, mean, standard deviation, percentiles, minimum, and maximum) for all numerical columns.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q4-1",
          type: "concept",
          prompt: "What data structure represents a single column extracted from a Pandas DataFrame?",
          options: ["Pandas Series", "Python list", "NumPy scalar", "Pandas Row"],
          correctAnswer: "Pandas Series",
          explanation: "Each column in a DataFrame is an instance of a Pandas Series.",
        },
      ],
    },

    {
      id: "w3-ch5",
      slug: "loading-and-understanding-data",
      number: 5,
      title: "Loading and Understanding CSV Datasets",
      estimatedMinutes: 15,
      introduction:
        "CSV (Comma Separated Values) is the universal file format for tabular data exchange. In this chapter, you will learn how to load datasets into Pandas with `pd.read_csv()`, handle delimiters, verify schemas, and assess data quality.",
      learningObjectives: [
        "Load local and remote CSV files using `pd.read_csv()`",
        "Inspect `.shape` to determine row and column dimensions",
        "Extract unique category lists with `.unique()` and counts with `.value_counts()`",
      ],
      sections: [
        {
          id: "w3-ch5-s1",
          title: "5.1 Loading CSV Datasets",
          content:
            "Loading a CSV into Pandas is a single command:\n\n```python\nimport pandas as pd\n\n# Load dataset\ndf = pd.read_csv('student_messages.csv')\nprint(f\"Loaded {df.shape[0]} rows and {df.shape[1]} columns.\")\n```",
        },
        {
          id: "w3-ch5-s2",
          title: "5.2 Categorical Distribution Inspection",
          content:
            "Use `.value_counts()` to inspect class balance:\n\n```python\nprint(df['status'].value_counts())\n# SAFE                     740\n# POTENTIALLY SUSPICIOUS   210\n# HIGH RISK                 50\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "pd.read_csv() parses structured CSV data into a DataFrame.",
          "value_counts() quickly reveals distribution balance or skew.",
        ],
        essentialSyntax: [
          {
            syntax: "pd.read_csv('path.csv')",
            description: "Reads CSV file into DataFrame.",
          },
          {
            syntax: "df['col'].value_counts()",
            description: "Returns frequency counts of unique values in a column.",
          },
        ],
        takeaways: ["Always inspect target variable balance with value_counts() before building models."],
        glossary: [
          {
            term: "Class Balance",
            definition: "The proportion of observations belonging to each discrete category in a dataset.",
          },
        ],
        revisionQuestions: [
          {
            question: "How do you count the frequency of each category in column 'category'?",
            answer: "Use `df['category'].value_counts()`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q5-1",
          type: "concept",
          prompt: "What does `df.shape` return for a DataFrame with 500 rows and 8 columns?",
          options: ["(500, 8)", "(8, 500)", "500", "4000"],
          correctAnswer: "(500, 8)",
          explanation: "shape returns (rows, columns).",
        },
      ],
    },

    {
      id: "w3-ch6",
      slug: "data-cleaning",
      number: 6,
      title: "Data Cleaning: Handling Missing and Duplicate Values",
      estimatedMinutes: 15,
      introduction:
        "Real-world data is messy, incomplete, and full of noise. Data scientists routinely spend 70% of their time cleaning data. In this chapter, you will identify missing (`NaN`) values, make informed decisions between dropping and imputing data, eliminate duplicates, and fix mismatched data types.",
      learningObjectives: [
        "Detect missing data using `df.isnull().sum()`",
        "Drop incomplete rows using `.dropna()`",
        "Impute missing values using `.fillna(value)` (e.g. median or mean)",
        "Identify and remove duplicate entries with `.drop_duplicates()`",
        "Convert column types using `.astype()`",
      ],
      sections: [
        {
          id: "w3-ch6-s1",
          title: "6.1 Detecting and Addressing Missing Values",
          content:
            "In Pandas, missing data is represented as `NaN` (Not a Number):\n\n```python\n# Count missing values per column\nprint(df.isnull().sum())\n\n# Strategy A: Drop rows with missing critical target labels\ncleaned_df = df.dropna(subset=['is_suspicious'])\n\n# Strategy B: Impute missing numerical values with median\nmedian_matches = df['keyword_matches'].median()\ndf['keyword_matches'] = df['keyword_matches'].fillna(median_matches)\n```",
        },
        {
          id: "w3-ch6-s2",
          title: "6.2 Deduplication",
          content:
            "Duplicate rows distort machine learning models by artificially magnifying specific samples:\n\n```python\ninitial_rows = len(df)\ndf = df.drop_duplicates()\nprint(f\"Removed {initial_rows - len(df)} duplicate records.\")\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "isnull().sum() locates missing data.",
          "dropna() removes rows; fillna() imputes values.",
          "drop_duplicates() cleans redundant records.",
        ],
        essentialSyntax: [
          {
            syntax: "df.isnull().sum()",
            description: "Reports count of missing values per column.",
          },
          {
            syntax: "df['col'].fillna(val, inplace=True)",
            description: "Replaces missing values with a designated constant or metric.",
          },
        ],
        takeaways: ["Never blindly drop rows with missing values without checking the proportion of data lost."],
        glossary: [
          {
            term: "Imputation",
            definition: "The replacement of missing data with substituted values (such as mean, median, or mode).",
          },
        ],
        revisionQuestions: [
          {
            question: "Why is median often preferred over mean when imputing missing values in skewed datasets?",
            answer: "The median is robust to extreme outliers, whereas the mean is heavily skewed by extreme values.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q6-1",
          type: "concept",
          prompt: "Which method eliminates all identical rows from a DataFrame?",
          options: ["df.drop_duplicates()", "df.clean_duplicates()", "df.unique_rows()", "df.remove_repeats()"],
          correctAnswer: "df.drop_duplicates()",
          explanation: "drop_duplicates() removes redundant rows.",
        },
      ],
    },

    {
      id: "w3-ch7",
      slug: "filtering-and-summarising",
      number: 7,
      title: "Filtering, Slicing and GroupBy Summaries",
      estimatedMinutes: 18,
      introduction:
        "Data science requires answering questions like 'What is the average risk score for messages from university domains versus commercial domains?'. In this chapter, you will master boolean queries, multi-condition filtering, sorting, and the famous **Split-Apply-Combine** `groupby()` workflow.",
      learningObjectives: [
        "Filter DataFrames using boolean masks and `.query()`",
        "Combine multiple conditions using bitwise operators (`&` for and, `|` for or)",
        "Sort data using `.sort_values()`",
        "Group records and calculate aggregated summaries with `df.groupby('col').mean()`",
      ],
      sections: [
        {
          id: "w3-ch7-s1",
          title: "7.1 Filtering with Boolean Masks",
          content:
            "When filtering DataFrames with multiple conditions, wrap each condition in parentheses `()` and use `&` (and) or `|` (or):\n\n```python\n# Messages with >= 3 matches AND from non-org domains\nthreats = df[(df['keyword_matches'] >= 3) & (df['sender_domain'] != 'univ.edu')]\n```",
        },
        {
          id: "w3-ch7-s2",
          title: "7.2 GroupBy: Split-Apply-Combine",
          content:
            "The `groupby()` method groups records by a categorical variable and applies an aggregation function:\n\n```python\n# Calculate mean matches and count per domain\nsummary = df.groupby('sender_domain')['keyword_matches'].agg(['count', 'mean'])\nprint(summary.sort_values(by='mean', ascending=False))\n```",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "Use & and | with parentheses for compound filtering.",
          "groupby() enables categorical aggregations across subgroups.",
          "sort_values(by='col', ascending=False) orders results.",
        ],
        essentialSyntax: [
          {
            syntax: "df[ (df['a'] > 1) & (df['b'] == 'x') ]",
            description: "Compound conditional filtering.",
          },
          {
            syntax: "df.groupby('category')['metric'].mean()",
            description: "Grouped metric aggregation.",
          },
        ],
        takeaways: ["Always verify that boolean filter conditions are enclosed in parentheses to avoid operator precedence errors."],
        glossary: [
          {
            term: "GroupBy",
            definition: "An operation involving splitting data into groups, applying a function, and combining the results.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why does `df[df['a'] > 1 and df['b'] == 2]` fail in Pandas?",
            answer: "Python's `and` evaluates truth value of whole arrays (ambiguous). Pandas requires the element-wise bitwise operator `&`.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q7-1",
          type: "concept",
          prompt: "Which operator represents logical AND when filtering a Pandas DataFrame?",
          options: ["&", "and", "&&", "+"],
          correctAnswer: "&",
          explanation: "Pandas uses bitwise `&` for element-wise boolean AND filtering across Series.",
        },
      ],
    },

    {
      id: "w3-ch8",
      slug: "preparing-data-for-ml",
      number: 8,
      title: "Preparing Data for Analysis and Machine Learning",
      estimatedMinutes: 18,
      introduction:
        "Raw data cannot be passed directly into a machine learning algorithm. Machine learning requires a clean, numerical feature matrix `X` and a target vector `y`. In this capstone chapter of Workshop 3, you will separate features from targets, encode simple categorical variables, and export cleaned datasets.",
      learningObjectives: [
        "Separate independent features matrix `X` from dependent target vector `y`",
        "Encode binary and categorical variables numerically",
        "Export cleaned DataFrames to CSV files using `.to_csv(index=False)`",
        "Recognize common feature preparation pitfalls (such as target leakage)",
      ],
      sections: [
        {
          id: "w3-ch8-s1",
          title: "8.1 Separating Features (X) and Target (y)",
          content:
            "Conventionally in data science:\n- **`X`** is a 2D DataFrame containing all predictive features (inputs).\n- **`y`** is a 1D Series containing the target label we want to predict.\n\n```python\n# Target variable\ny = df['is_suspicious']\n\n# Features matrix (all columns except target and identifier)\nX = df.drop(columns=['message_id', 'is_suspicious', 'raw_text'])\n\nprint(\"Feature matrix shape:\", X.shape)\nprint(\"Target vector shape:\", y.shape)\n```",
        },
        {
          id: "w3-ch8-s2",
          title: "8.2 Exporting Cleaned Data",
          content:
            "Save the prepared dataset for Workshop 4 and 5:\n\n```python\ndf_cleaned.to_csv('cleaned_inbox_data.csv', index=False)\n```\nAlways pass `index=False` to prevent Pandas from inserting an unwanted unnamed numeric index column.",
        },
      ],
      exercises: [],
      recap: {
        keyConcepts: [
          "X is the feature matrix (inputs); y is the target label (output).",
          "Remove uninformative identifiers (like user IDs or serial numbers) before modeling.",
          "Use to_csv(index=False) for clean export.",
        ],
        essentialSyntax: [
          {
            syntax: "X = df.drop(columns=['target'])\ny = df['target']",
            description: "Splits DataFrame into features and target.",
          },
          {
            syntax: "df.to_csv('output.csv', index=False)",
            description: "Exports cleaned DataFrame to CSV.",
          },
        ],
        takeaways: ["Never allow the target variable or downstream information to leak into feature matrix X."],
        glossary: [
          {
            term: "Feature Matrix (X)",
            definition: "The 2-dimensional collection of independent input variables used by a model to make predictions.",
          },
          {
            term: "Target Vector (y)",
            definition: "The 1-dimensional array of dependent ground-truth values that a model aims to predict.",
          },
        ],
        revisionQuestions: [
          {
            question: "Why should unique message IDs or customer IDs be removed from feature matrix X?",
            answer: "IDs are arbitrary identifiers with no generalized predictive relationship to the target label; leaving them causes memorization and overfitting.",
          },
        ],
      },
      selfAssessment: [
        {
          id: "w3-q8-1",
          type: "concept",
          prompt: "Why should `index=False` be included when exporting with `df.to_csv()`?",
          options: [
            "To prevent writing the auto-generated row numbers as an unwanted extra column",
            "To make the CSV read-only",
            "To sort the CSV automatically",
            "To compress the file size"
          ],
          correctAnswer: "To prevent writing the auto-generated row numbers as an unwanted extra column",
          explanation: "index=False prevents Pandas from generating an 'Unnamed: 0' index column upon subsequent loading.",
        },
      ],
    },
  ],
};
