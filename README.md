<div align="center">

# 🪞 EduTwin AI

### AI-Powered Student Digital Twin Platform

**Predicts where every student will struggle — before it happens.**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Scikit Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[![SDG 4](https://img.shields.io/badge/SDG_4-Quality_Education-c5192d?style=flat-square)](https://sdgs.un.org/goals/goal4)
[![SDG 10](https://img.shields.io/badge/SDG_10-Reduced_Inequalities-dd1367?style=flat-square)](https://sdgs.un.org/goals/goal10)
[![Status](https://img.shields.io/badge/Status-Completed-22C55E?style=flat-square)]()

</div>

---

## 📌 About The Project

**EduTwin AI** creates a living digital AI model — a *digital twin* — for every student. The twin continuously learns from a student's demographics, past performance, study habits, and learning patterns to:

- **Predict the final grade** (G3) a student will achieve using regression models
- **Classify pass/fail risk** using binary classification models
- **Detect struggle probability** with an ensemble of 8 ML models
- **Cluster students** into cognitive peer groups for collaborative learning
- **Forecast 7-day topic-wise struggle risk** so teachers can intervene early
- **Track memory decay** using Ebbinghaus forgetting curve simulations
- **Generate personalised AI study plans** adapting to each student's profile

> Built as part of the **AI/ML Course** at **PES University, Section C, Academic Year 2025–26**

---

## 🚨 The Problem

Every student studies blindly:
- They revise the **wrong topics** at the wrong time
- They don't know their **real knowledge gaps** until exam results arrive
- Teachers with 60+ students **cannot track everyone individually**
- Poor and rural students have **zero access to personalised guidance**

**EduTwin AI fixes this** by creating a cognitive digital twin that knows each student better than they know themselves.

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        EDUTWIN AI PLATFORM                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐  │
│   │  UCI Dataset │     │  Preprocessing│     │  Feature        │  │
│   │  (649 × 33)  │────▶│  + Encoding   │────▶│  Scaling        │  │
│   └─────────────┘     └──────────────┘     └────────┬────────┘  │
│                                                      │           │
│                         ┌────────────────────────────▼────────┐  │
│                         │         ML MODEL ENSEMBLE           │  │
│                         │                                     │  │
│                         │  ┌─────────────┐ ┌──────────────┐   │  │
│                         │  │ Linear Reg. │ │ Logistic Reg.│   │  │
│                         │  └─────────────┘ └──────────────┘   │  │
│                         │  ┌─────────────┐ ┌──────────────┐   │  │
│                         │  │ Naive Bayes │ │     SVM      │   │  │
│                         │  └─────────────┘ └──────────────┘   │  │
│                         │  ┌─────────────┐ ┌──────────────┐   │  │
│                         │  │Decision Tree│ │Random Forest │   │  │
│                         │  └─────────────┘ └──────────────┘   │  │
│                         │  ┌─────────────┐ ┌──────────────┐   │  │
│                         │  │   K-Means   │ │     GMM      │   │  │
│                         │  └─────────────┘ └──────────────┘   │  │
│                         └────────────────────────────┬────────┘  │
│                                                      │           │
│   ┌──────────────────┐                    ┌──────────▼────────┐  │
│   │   React + Vite   │◀───── REST API ───▶│  FastAPI Backend  │  │
│   │   Frontend UI    │    (localhost:8000) │  (Uvicorn ASGI)   │  │
│   │ (localhost:5173) │                    └───────────────────┘  │
│   └──────────────────┘                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🤖 ML Models Implemented

### Supervised Learning — Regression

| Model | Algorithm | Purpose | Accuracy |
|-------|-----------|---------|----------|
| Linear Regression | Ordinary Least Squares | Predict student's final grade (G3) on 0–20 scale | R² = 0.83 |
| Polynomial Regression | Degree-2 Polynomial Features | Capture non-linear performance relationships | R² = 0.85 |

### Supervised Learning — Classification

| Model | Algorithm | Purpose | Accuracy |
|-------|-----------|---------|----------|
| Logistic Regression | Binary Logistic | Pass/Fail classification (threshold: G3 ≥ 10) | 82% |
| Naive Bayes | Gaussian NB | Learning style and risk category classification | 85% |
| Support Vector Machine | RBF Kernel SVM | Detect sudden performance drops with margin maximisation | 89% |
| Decision Tree | CART with Gini Impurity | Personalised study plan generation engine | 84% |
| Random Forest | 100-tree Bagging Ensemble | Primary struggle predictor (highest accuracy) | 93% |

### Unsupervised Learning — Clustering

| Model | Algorithm | Purpose |
|-------|-----------|---------|
| K-Means | Lloyd's Algorithm (k=4) | Group students into cognitive peer clusters |
| Gaussian Mixture Model | Expectation-Maximisation | Soft-cluster learning styles with probabilistic assignments |

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.11+ | Core language |
| FastAPI | Latest | REST API framework (async, auto-docs) |
| Uvicorn | Latest | ASGI server |
| Scikit-learn | Latest | ML model training and inference |
| Pandas | Latest | Data manipulation and preprocessing |
| NumPy | Latest | Numerical computations |
| Pydantic | v2 | Request/response validation |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2 | Component-based UI framework |
| Vite | 5.0 | Lightning-fast build tool and dev server |
| Recharts | 3.8 | Interactive data visualisation charts |
| React Router | 7.0 | Client-side page routing |
| Axios | 1.16 | HTTP client for API communication |
| Inter + Plus Jakarta Sans | — | Professional typography (Google Fonts) |

### Development Tools
| Tool | Purpose |
|------|---------|
| Jupyter Notebook | EDA, model training, and experimentation |
| Google Antigravity IDE | Primary development environment |
| GitHub | Version control and collaboration |

---

## 📁 Project Structure

```
EduTwin/
│
├── 📂 data/                              # Datasets
│   ├── student-mat.csv                    # Raw UCI dataset (649 students × 33 features)
│   ├── student_clean.csv                  # After EDA cleaning
│   ├── student_encoded.csv                # After label encoding categorical features
│   ├── student_scaled.csv                 # After StandardScaler normalisation
│   ├── X_train.csv                        # Training features (80% split)
│   ├── X_test.csv                         # Testing features (20% split)
│   ├── y_train_reg.csv                    # Training labels — regression (G3 score)
│   ├── y_test_reg.csv                     # Testing labels — regression
│   ├── y_train_clf.csv                    # Training labels — classification (pass/fail)
│   └── y_test_clf.csv                     # Testing labels — classification
│
├── 📂 notebooks/                          # Jupyter Notebooks (weekly progression)
│   ├── Week1_EDA.ipynb                    # Exploratory Data Analysis + visualisations
│   ├── Week2_Regression.ipynb             # Linear + Polynomial Regression
│   ├── Week2_Classification.ipynb         # Logistic Regression + Naive Bayes
│   ├── Week3_SVM_DT_Ensemble.ipynb        # SVM + Decision Tree + Random Forest
│   ├── Week4_Clustering.ipynb             # K-Means + GMM clustering
│   └── 📂 charts/                         # Exported visualisation images
│
├── 📂 models/                             # Trained model pickle files (.pkl)
│   ├── linear_regression.pkl              # Linear Regression model
│   ├── polynomial_regression.pkl          # Polynomial Regression (degree 2)
│   ├── logistic_regression.pkl            # Logistic Regression classifier
│   ├── naive_bayes.pkl                    # Gaussian Naive Bayes classifier
│   ├── svm.pkl                            # Support Vector Machine (RBF kernel)
│   ├── decision_tree.pkl                  # Decision Tree classifier
│   ├── random_forest.pkl                  # Random Forest ensemble (100 trees)
│   ├── xgboost.pkl                        # XGBoost gradient boosting
│   ├── kmeans.pkl                         # K-Means clustering (k=4)
│   ├── gmm.pkl                            # Gaussian Mixture Model
│   └── pca.pkl                            # PCA dimensionality reduction
│
├── 📂 backend/                            # FastAPI REST API
│   ├── main.py                            # API routes + CORS + startup validation
│   ├── predict.py                         # Prediction engine (loads all 8 models)
│   ├── models.py                          # Pydantic schemas (StudentInput, PredictionResult)
│   ├── requirements.txt                   # Python dependencies
│   └── test_cases.py                      # Automated test suite
│
├── 📂 frontend/                           # React + Vite UI
│   ├── index.html                         # Entry HTML with font preloads
│   ├── package.json                       # Node dependencies
│   ├── vite.config.js                     # Vite configuration
│   └── 📂 src/
│       ├── main.jsx                       # React entry point
│       ├── App.jsx                        # App shell (auth, routing, layout)
│       ├── App.css                        # Complete design system (2400+ lines)
│       ├── 📂 utils/
│       │   └── profile.js                 # Cognitive profile classification helper
│       ├── 📂 components/
│       │   ├── Sidebar.jsx                # Navigation sidebar with user card
│       │   └── Topbar.jsx                 # Top header with breadcrumbs + live badge
│       └── 📂 pages/
│           ├── Login.jsx                  # Dark glassmorphic login page
│           ├── Onboarding.jsx             # 4-step cognitive calibration wizard
│           ├── Dashboard.jsx              # KPI cards + charts + risk monitor
│           ├── MyTwin.jsx                 # Cognitive radar + study plan + insights
│           ├── Forecast.jsx               # 7-day struggle forecast + heatmap
│           ├── Predictor.jsx              # Real-time ML prediction engine UI
│           └── Models.jsx                 # Model accuracies + architecture flow
│
└── README.md                              # This file
```

---

## 🖥️ Frontend Pages

### 1. Login Page
Dark glassmorphic authentication screen with email/password fields, social login buttons, and ambient glow effects.

### 2. Onboarding (4-Step Cognitive Calibration)
| Step | Title | Inputs |
|------|-------|--------|
| 1 | Personal Profile | Name, Age, Gender, Address (Urban/Rural) |
| 2 | Academic Foundation | Grade Level, Higher Education Goal, Simulation Objective |
| 3 | Cognitive Calibration | Learning Style Modality, Daily Study Hours |
| 4 | Risk & Diagnosis | Past Failures, Extracurricular Activities, Struggling Subjects |

The onboarding parameters directly influence all dashboard visualisations — **different users see different data**.

### 3. Dashboard
- Welcome banner with student name and cohort
- 4 KPI metric cards (Total Students, At-Risk, Prediction Accuracy, Topics Flagged)
- Line chart: Class Performance vs Twin Prediction (8 weeks)
- Doughnut chart: Risk distribution (Low/Medium/High)
- Student Risk Monitor with progress bars
- Alerts feed + Forgetting curve retention tracker
- Model accuracy comparison bars

### 4. My Twin
- Profile hero card with avatar, Twin Match %, and Daily Study hours
- Cognitive Radar Profile (6-subject Actual vs Self-Estimate overlay)
- Twin Path vs Actual Progress line chart
- Topic Memory Decay horizontal bar chart
- AI-optimised daily study plan
- Academic Insights with twin alignment ring

### 5. Forecast
- 7-day struggle risk forecast with per-day progress bars
- Daily struggle probability bar chart
- Weekly summary statistics
- AI Recommended Actions (with mark-as-done checkboxes)
- Struggle Heatmap Matrix (5 subjects × 5 weekdays)

### 6. Predictor
- Full input form with 15+ student parameters
- Quick demo buttons: "Try Weak Student" / "Try Strong Student"
- Real-time API call to FastAPI backend
- Results display: Predicted Grade, Struggle Risk gauge, Pass/Fail status
- Expandable breakdown showing predictions from all 8 models
- 4-week performance trajectory chart
- AI study plan + 7-day forecast grid

### 7. Models
- Model accuracy horizontal bar chart
- 8 model cards with descriptions, metrics, and use cases
- CSS-only data pipeline flow diagram

---

## 🔌 API Documentation

The FastAPI backend serves the following endpoints at `http://localhost:8000`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API information and status |
| `GET` | `/health` | Health check with model loading status |
| `POST` | `/predict` | **Primary endpoint** — predict student outcomes |
| `GET` | `/sample-weak` | Demo prediction for a weak student profile |
| `GET` | `/sample-strong` | Demo prediction for a strong student profile |
| `GET` | `/model-accuracies` | Returns accuracy metrics for all models |
| `GET` | `/dataset-info` | Dataset statistics and feature information |
| `GET` | `/models` | List of loaded model names and types |
| `GET` | `/sample` | Sample input data format |

### POST `/predict` — Request Body

```json
{
  "name": "Sagar Sharma",
  "age": 17,
  "sex": "M",
  "address": "U",
  "studytime": 2,
  "failures": 0,
  "absences": 4,
  "G1": 14,
  "G2": 13,
  "traveltime": 1,
  "Medu": 4,
  "Fedu": 3,
  "internet": "yes",
  "activities": "yes",
  "higher": "yes"
}
```

### POST `/predict` — Response

```json
{
  "student_name": "Sagar Sharma",
  "predicted_grade": 14.2,
  "struggle_risk": 23.5,
  "pass_probability": 0.92,
  "cluster_group": 2,
  "risk_level": "Low",
  "model_details": {
    "linear_regression": { "predicted_grade": 13.8, "status": "ok" },
    "random_forest": { "predicted_grade": 14.5, "status": "ok" },
    "...": "..."
  },
  "recommendations": ["..."],
  "weekly_forecast": ["..."],
  "study_plan": ["..."]
}
```

> 📖 **Interactive API docs** available at `http://localhost:8000/docs` (Swagger UI)

---

## 📊 Dataset

**UCI Student Performance Dataset** — [Source](https://archive.ics.uci.edu/dataset/320/student+performance)

| Property | Value |
|----------|-------|
| Students | 649 |
| Features | 33 (demographic, social, academic) |
| Target (Regression) | G3 — Final grade (0–20) |
| Target (Classification) | Pass/Fail (G3 ≥ 10) |
| Train/Test Split | 80/20 stratified |

### Key Features Used
`age`, `sex`, `address`, `studytime`, `failures`, `absences`, `G1` (period 1 grade), `G2` (period 2 grade), `traveltime`, `Medu` (mother's education), `Fedu` (father's education), `internet`, `activities`, `higher`

---

## 🚀 How To Run Locally

### Prerequisites
- **Python 3.11+** with `pip`
- **Node.js 18+** with `npm`
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Sagar-Sharma19-cmd/EduTwin-AI.git
cd EduTwin-AI
```

### 2. Start the Backend (FastAPI)

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Mac / Linux
# .venv\Scripts\activate         # Windows

# Install Python dependencies
pip install -r backend/requirements.txt

# Start the API server
cd backend
uvicorn main:app --reload --port 8000
```

> The API will be live at `http://localhost:8000`
> Swagger docs at `http://localhost:8000/docs`

### 3. Start the Frontend (React + Vite)

```bash
# In a new terminal, from the project root
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

> The UI will be live at `http://localhost:5173`

### 4. Run Jupyter Notebooks (Optional)

```bash
# From the project root with venv activated
pip install jupyter matplotlib seaborn xgboost
jupyter notebook
```

> Open notebooks from the `notebooks/` folder to explore EDA, model training, and evaluations.

---

## 🧪 Running Tests

```bash
cd backend
python -m pytest test_cases.py -v
```

The test suite covers:
- API health checks
- Prediction endpoint validation
- Model loading verification
- Edge case handling (missing fields, boundary values)
- Weak and strong student demo endpoints

---

## 🌍 SDG Impact

### SDG 4 — Quality Education
- Every student receives AI-personalised academic guidance regardless of background
- 7-day struggle predictor prevents exam failures through proactive intervention
- Forgetting curve engine (Ebbinghaus model) ensures long-term topic retention
- AI-generated daily study plans eliminate guesswork from revision
- Cognitive radar profiles expose overconfidence biases before exams

### SDG 10 — Reduced Inequalities
- Students without access to private tutors receive the same quality of academic insights
- Urban/Rural address parameter is factored into predictions for equitable assessments
- Platform is free, open-source, and deployable by any school or institution
- Peer clustering groups students for collaborative learning across socioeconomic lines

---

## 📅 Development Timeline

| Week | Module | Topics Covered | Status |
|------|--------|----------------|--------|
| 1 | EDA & Preprocessing | Data cleaning, encoding, scaling, train/test split | ✅ Complete |
| 2 | Regression | Linear Regression, Polynomial Regression | ✅ Complete |
| 2 | Classification I | Logistic Regression, Gaussian Naive Bayes | ✅ Complete |
| 3 | Classification II | SVM (RBF), Decision Tree, Random Forest | ✅ Complete |
| 4 | Clustering | K-Means, Gaussian Mixture Models, PCA | ✅ Complete |
| 5 | Backend API | FastAPI endpoints, model loading, prediction engine | ✅ Complete |
| 6 | Frontend UI | React + Vite, 7 pages, Recharts visualisations | ✅ Complete |
| 7 | Integration | API ↔ UI connection, dynamic profiling, testing | ✅ Complete |

---

## 👨‍💻 Author

**Sagar Sharma**
PES University | Section C — Education
AI/ML Course | Academic Year 2025–26

---

## 📄 License & Credits

This project is built for academic purposes at PES University.

**Dataset Credits:**
- UCI Machine Learning Repository — [Student Performance Dataset](https://archive.ics.uci.edu/dataset/320/student+performance)
- P. Cortez and A. Silva, "Using Data Mining to Predict Secondary School Student Performance," 2008

---

<div align="center">

**⭐ If you found this helpful, please star the repo! ⭐**

*EduTwin AI — Because every student deserves to know where they're going, before they get lost.*

</div>
