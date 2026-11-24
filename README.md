# CENTER OF EXCELLENCE | DATA SCIENCE & ARTIFICIAL INTELLIGENCE (CoE | DSAI)
### Interactive Learning Platform — Python, Data Science and Machine Learning

Official interactive educational platform and digital reference handbook for the **Python, Data Science & Machine Learning Workshop Series** conducted exclusively by the **Center of Excellence | Data Science & Artificial Intelligence (CoE | DSAI)**.

---

## 🌟 Platform Overview

This platform is not merely a website displaying workshop listings. It is a comprehensive, self-contained digital learning environment designed for:
- **Live Workshops**: Coordinated delivery with instructor agendas, minute-by-minute timers, and teaching checkpoints.
- **Independent Practice**: Browser-based interactive Python runtime running Pyodide WebAssembly.
- **Deep Revision**: Self-contained theoretical explanations from first principles, line-by-line code execution walkthroughs, and common mistake diagnoses.
- **End-to-End Progression**: Continuous path from Python fundamentals to full-cycle Machine Learning and Streamlit application deployment.

---

## 🧭 Complete 10-Workshop Curriculum Sequence

| # | Workshop Title | Difficulty | Duration | Mode | Chapters |
|---|---|---|---|---|---|
| **W1** | **Python Foundations: Build Inbox Guardian** | Beginner | 120m | In-Browser Python | 8 Chapters + Capstone |
| **W2** | **Git & GitHub: Version Control for Team Projects** | Beginner | 120m | Interactive Simulator | 9 Chapters + Team Project |
| **W3** | **Data Handling with NumPy & Pandas** | Beginner | 120m | Scientific Python | 8 Chapters + Wrangling Pipeline |
| **W4** | **Make Data Speak: Visualization & Exploratory Analysis** | Beginner | 120m | Scientific Python | 8 Chapters + EDA Report |
| **W5** | **Machine Learning 101: The End-to-End Workflow** | Intermediate | 120m | Scientific Python | 8 Chapters + Pipeline Benchmark |
| **W6** | **Supervised Learning I: Regression** | Intermediate | 120m | Scientific Python | 6 Chapters + Latency Predictor |
| **W7** | **Supervised Learning II: Classification** | Intermediate | 120m | Scientific Python | 6 Chapters + Threat Classifier |
| **W8** | **Model Evaluation, Improvement & Responsible ML** | Intermediate | 120m | Scientific Python | 8 Chapters + Model Card Audit |
| **W9** | **Turn Your Model into a Demo with Streamlit** | Intermediate | 120m | Streamlit Simulator | 8 Chapters + Deployed Web App |
| **W10**| **Project Sprint & Showcase: From Notebook to Portfolio** | Advanced | 120m | Portfolio Project | 8 Chapters + Showcase Pitch |

**Total Curriculum:** 10 Workshops, 79 Detailed Chapters, 10 Capstone Deliverables.

---

## 🛡️ Capstone Project: Inbox Guardian

**Inbox Guardian** is the core Workshop 1 capstone application. It is a rule-based message security scanner built entirely using core Python constructs:
- Case-normalized substring detection (`.lower()`, `in` operator)
- Risk scoring thresholds (`if` / `elif` / `else`)
- In-memory database of scan records (list of dictionaries)
- Security metrics aggregation (total scans, threat ratio)
- Interactive command-line menu loop (`while True`)

> **Educational Boundary**: Inbox Guardian is intentionally designed as a rule-based heuristic system. In Workshops 5 through 8, students contrast these manual rules with machine learning models that learn statistical patterns directly from labeled training data.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.x (App Router, Turbopack, Server & Client Components)
- **UI Library**: React 19.x & TypeScript in strict mode
- **Styling**: Tailwind CSS 4.x with centralized visual tokens
- **Code Editor**: CodeMirror 6 with Python language extension & One Dark theme
- **Python Engine**: Pyodide (WebAssembly) executing inside a dedicated Web Worker
- **State & Persistence**: LocalStorage & IndexedDB with real-time update events
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x LTS or higher
- `pnpm` (preferred) or `npm`

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd "CoDSAI Workshop"

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
# Generate optimized production build (all 109 static & dynamic routes)
pnpm build

# Start production server
pnpm start
```

---

## 🏛️ Official Brand Guidelines & Logo Asset Slot

The official identity of this platform is strictly:
**CENTER OF EXCELLENCE | DATA SCIENCE & ARTIFICIAL INTELLIGENCE (CoE | DSAI)**

Expected logo asset locations:
- Primary: `/public/logo/codsai-logo.png`
- Fallback: `/public/branding/codsai-logo.png`

The application includes an `OrganisationLogo` component that:
- Preserves the original image aspect ratio (`object-fit: contain`)
- Supports transparent backgrounds across light and dark surfaces
- Displays the official logo PNG across headers, navigation, and footers
- Changing the logo is a single configuration or asset replacement operation without altering code structure.

---

## 📄 License & Organization

Conducted and maintained by the **Center of Excellence | Data Science & Artificial Intelligence (CoE | DSAI)**.  
All curriculum materials, interactive simulators, and worked examples are designed for educational training and long-term reference.
