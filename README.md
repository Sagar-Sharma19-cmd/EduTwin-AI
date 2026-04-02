# 🪞 EduTwin AI
### *Your AI-Powered Student Digital Twin Platform*

> **Predicts where every student will struggle — before it happens.**

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-orange?style=flat-square&logo=scikit-learn)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)
![SDG](https://img.shields.io/badge/SDG-4%20%2B%2010-brightgreen?style=flat-square)

---

## 📌 About The Project

**EduTwin AI** creates a living digital AI model — a *digital twin* — for every student.

The twin continuously learns from a student's attendance, test scores, study hours, and learning patterns. It then **predicts exactly which topics the student will struggle with 7 days in advance** — before the struggle happens — so teachers can intervene early and students can study smarter.

This project directly addresses:
- 🎓 **SDG 4 — Quality Education**: Personalised AI guidance for every student
- ⚖️ **SDG 10 — Reduced Inequalities**: Closing the gap between students who have private tutors and those who don't

> Built as part of the AI/ML course at **PES University, Section C, 2025-26**

---

## 🚨 The Problem

Every student studies blindly:
- They revise the **wrong topics**
- They don't know their **real knowledge gaps**
- They only find out they were lost when **exam results arrive**
- Poor and rural students have **zero personalised guidance**

Teachers with 60+ students **cannot track everyone individually**.

**EduTwin AI fixes this.**

---

## 💡 How It Works

```
Student Data (attendance, scores, study time)
            ↓
    Digital Twin Builder (ML Pipeline)
            ↓
  ┌─────────────────────────────────┐
  │  7-Day Struggle Predictor       │  ← XGBoost + LightGBM
  │  Forgetting Curve Engine        │  ← Ebbinghaus + Regression  
  │  Knowledge Gap Radar            │  ← Classification Models
  │  Personalised Daily Study Plan  │  ← Decision Tree Engine
  │  Peer Study Group Matcher       │  ← K-Means Clustering
  │  Adaptive Quiz Agent            │  ← Q-Learning (RL)
  └─────────────────────────────────┘
            ↓
  Teacher Dashboard + Student App
```

---

## 🤖 ML Models Used

| Unit | Algorithm | Purpose in EduTwin |
|------|-----------|-------------------|
| **Unit 2** | Linear Regression | Predict student score next week |
| **Unit 2** | Polynomial Regression | Non-linear performance forecasting |
| **Unit 2** | Logistic Regression | Pass / Fail classification |
| **Unit 2** | Naive Bayes | Learning style classifier |
| **Unit 3** | SVM | Detect sudden performance drops |
| **Unit 3** | Decision Tree | Personalised study plan engine |
| **Unit 3** | Random Forest | Ensemble struggle predictor |
| **Unit 3** | XGBoost + LightGBM | High-accuracy 7-day forecast |
| **Unit 3** | Grid Search + CV | Hyperparameter tuning |
| **Unit 4** | K-Means Clustering | Group students for peer learning |
| **Unit 4** | Gaussian Mixture Models | Soft-cluster learning styles |
| **Unit 4** | Q-Learning (RL) | Adaptive quiz difficulty agent |

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11** — Core language
- **Scikit-learn** — ML models
- **XGBoost / LightGBM** — Ensemble models
- **Pandas / NumPy** — Data processing
- **FastAPI** — REST API backend
- **Firebase** — Realtime database

### Frontend
- **React.js** — Web interface
- **Tailwind CSS** — Styling
- **Chart.js / Plotly** — Data visualisations
- **Folium** — India inequality map

### Tools
- **Google Antigravity** — IDE
- **Jupyter Notebook** — EDA and ML development
- **GitHub** — Version control
- **Render** — Free deployment

---

## 📊 Datasets Used

| Dataset | Source | Size | Used For |
|---------|--------|------|----------|
| UCI Student Performance | [Kaggle / UCI](https://archive.ics.uci.edu/dataset/320/student+performance) | 649 × 33 | Core ML models |
| Open University Learning Analytics (OULAD) | [Open University](https://analyse.kmi.open.ac.uk/open-dataset) | 32,593 × 28 | Dropout prediction |
| UDISE+ India Education Data | [Govt of India](https://udiseplus.gov.in) | District-wise | SDG 10 inequality map |

> ✅ All structured tabular datasets — No LLM, NLP, or image data used

---

## 📁 Project Structure

```
EduTwin/
│
├── 📂 data/
│   ├── student-mat.csv          # Raw dataset
│   ├── student_clean.csv        # After EDA
│   ├── student_encoded.csv      # After label encoding
│   ├── student_scaled.csv       # After feature scaling
│   ├── X_train.csv              # Training features
│   ├── X_test.csv               # Testing features
│   └── y_train/y_test files     # Target variables
│
├── 📂 notebooks/
│   ├── Week1_EDA.ipynb          # Exploratory Data Analysis
│   ├── Week1_Preprocessing.ipynb # Data preprocessing
│   ├── Week2_Regression.ipynb   # Linear/Polynomial Regression
│   ├── Week3_Classification.ipynb # Logistic Regression + Naive Bayes
│   ├── Week4_SVM_DT.ipynb       # SVM + Decision Tree
│   ├── Week5_Ensemble.ipynb     # Random Forest + XGBoost
│   ├── Week6_Clustering.ipynb   # K-Means + GMM
│   └── Week7_RL.ipynb           # Q-Learning Agent
│
├── 📂 models/
│   └── (saved ML models)
│
├── 📂 backend/
│   └── (FastAPI application)
│
├── 📂 frontend/
│   └── (React.js application)
│
└── README.md
```

---

## 📅 Development Progress

| Week | Task | Status |
|------|------|--------|
| **Week 1** | Project setup + EDA + Data Preprocessing | ✅ Done |
| **Week 2** | Linear & Polynomial Regression models | 🔄 In Progress |
| **Week 3** | Classification — Logistic Regression + Naive Bayes | ⏳ Upcoming |
| **Week 4** | SVM + Decision Tree + Hyperparameter Tuning | ⏳ Upcoming |
| **Week 5** | Ensemble — Random Forest + XGBoost + LightGBM | ⏳ Upcoming |
| **Week 6** | Unsupervised — K-Means + GMM Clustering | ⏳ Upcoming |
| **Week 7** | Reinforcement Learning — Q-Learning Agent | ⏳ Upcoming |
| **Week 8** | FastAPI Backend — REST APIs for all models | ⏳ Upcoming |
| **Week 9** | React.js Frontend — Dashboard + Charts | ⏳ Upcoming |
| **Week 10** | Full Integration + Testing | ⏳ Upcoming |
| **Week 11** | Deployment on Render + Final Polish | ⏳ Upcoming |

---

## 🌍 SDG Impact

### SDG 4 — Quality Education
- Every student gets AI-personalised guidance regardless of background
- 7-day struggle predictor prevents exam failures
- Forgetting curve engine ensures long-term retention
- Daily AI study plans remove guesswork

### SDG 10 — Reduced Inequalities
- Rich students have private tutors — EduTwin gives ALL students the same advantage for free
- India district-wise dropout inequality heatmap
- Bridges the gap between urban and rural students
- Free deployment accessible to any school

---

## 🚀 How To Run Locally

```bash
# Clone the repo
git clone https://github.com/Sagar-Sharma19-cmd/EduTwin-AI.git
cd EduTwin-AI

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install pandas numpy matplotlib seaborn scikit-learn xgboost lightgbm jupyter

# Open notebooks
jupyter notebook
```

---

## 👨‍💻 About

**Sagar Sharma**
PES University | Section C — Education
AI/ML Course | Academic Year 2025–26

---

## 📄 License

This project is built for academic purposes at PES University.
Dataset credits: UCI Machine Learning Repository, Open University, Government of India (UDISE+)

---

<div align="center">

**⭐ If you found this helpful, please star the repo! ⭐**

*EduTwin AI — Because every student deserves to know where they're going, before they get lost.*

</div>
