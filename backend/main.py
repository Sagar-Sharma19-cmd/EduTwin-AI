from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import StudentInput, PredictionResult
from predict import predict_student, models, DATA_DIR, MODELS_DIR

# ── Create FastAPI app ──
app = FastAPI(
    title="EduTwin AI API",
    description="ML backend for EduTwin Student Digital Twin Platform",
    version="1.0.0"
)

# ── CORS Middleware Configuration ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Startup Validation Check ──
@app.on_event("startup")
def startup_validation():
    print("==================================================")
    print("🚀 EDUTWIN AI - STARTUP VALIDATION DIAGNOSTICS")
    print("==================================================")
    
    # Check model pickle files
    required_models = [
        "linear_regression",
        "logistic_regression",
        "naive_bayes",
        "svm",
        "decision_tree",
        "random_forest",
        "kmeans",
        "gmm"
    ]
    
    missing_models = []
    loaded_models_count = 0
    for model_name in required_models:
        model_file = MODELS_DIR / f"{model_name}.pkl"
        if not model_file.exists():
            missing_models.append(model_name)
            print(f"  ❌ Model File Missing: {model_name}.pkl")
        elif models.get(model_name) is None:
            missing_models.append(model_name)
            print(f"  ❌ Model Failed to Load: {model_name}.pkl")
        else:
            loaded_models_count += 1
            print(f"  ✅ Model Loaded: {model_name}.pkl")
            
    # Check dataset files
    dataset_encoded = DATA_DIR / "student_encoded.csv"
    dataset_mat = DATA_DIR / "student-mat.csv"
    dataset_exists = dataset_encoded.exists() and dataset_mat.exists()
    
    if dataset_exists:
        print("  ✅ Original & Encoded Datasets Found in data/")
    else:
        print("  ❌ Dataset Files Missing from data/ folder")
        
    print("--------------------------------------------------")
    print(f"📊 Summary: {loaded_models_count}/8 Models Loaded Successfully.")
    
    if missing_models:
        print("  ⚠️ WARNING: The following critical models are missing or failed to load:")
        print(f"     {', '.join(missing_models)}")
        print("     The backend will use heuristic fallback mechanisms for these models.")
    else:
        print("  🎉 All systems nominal. Ready to serve predictions.")
    print("==================================================")


# ── ROUTES ──

@app.get("/")
def home():
    return {
        "message": "Welcome to EduTwin AI API!",
        "status":  "running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    # Return status of ALL models loaded
    models_loaded_status = {}
    required_models = [
        "linear_regression",
        "logistic_regression",
        "naive_bayes",
        "svm",
        "decision_tree",
        "random_forest",
        "kmeans",
        "gmm"
    ]
    
    for m in required_models:
        models_loaded_status[m] = models.get(m) is not None
        
    all_loaded = all(models_loaded_status.values())
    
    return {
        "status": "healthy" if all_loaded else "degraded",
        "models_loaded": models_loaded_status,
        "total_models": len(required_models),
        "dataset": "UCI Student Performance - 395 students"
    }


@app.post("/predict", response_model=PredictionResult)
def predict(student: StudentInput):
    """
    Takes student data and returns detailed prediction results,
    weekly forecasts, study plans, and model insights.
    """
    result = predict_student(student.dict())
    return result


@app.get("/sample-weak", response_model=PredictionResult)
def sample_weak():
    """
    Demo prediction for a weak student profile.
    Values: G1=6, G2=7, failures=2, absences=15, studytime=1
    """
    weak_student = StudentInput(
        name="Rahul",
        G1=6.0,
        G2=7.0,
        failures=2,
        absences=15,
        studytime=1
    )
    return predict_student(weak_student.dict())


@app.get("/sample-strong", response_model=PredictionResult)
def sample_strong():
    """
    Demo prediction for a strong student profile.
    Values: G1=16, G2=17, failures=0, absences=2, studytime=3
    """
    strong_student = StudentInput(
        name="Priya",
        G1=16.0,
        G2=17.0,
        failures=0,
        absences=2,
        studytime=3
    )
    return predict_student(strong_student.dict())


@app.get("/model-accuracies")
def model_accuracies():
    """
    Return all model accuracy metrics computed against the test set.
    """
    return {
        "linear_regression": {"metric": "R²", "value": 0.80},
        "logistic_regression": {"metric": "Accuracy", "value": "100%"},
        "naive_bayes": {"metric": "Accuracy", "value": "100%"},
        "svm": {"metric": "Accuracy", "value": "97%"},
        "decision_tree": {"metric": "Accuracy", "value": "100%"},
        "random_forest": {"metric": "Accuracy", "value": "89%"},
        "kmeans": {"metric": "Silhouette Score", "value": 0.45},
        "gmm": {"metric": "BIC Score", "value": 1159.57}
    }


@app.get("/dataset-info")
def dataset_info():
    """
    Return dataset metadata and statistics.
    """
    return {
        "name": "UCI Student Performance Dataset",
        "source": "archive.ics.uci.edu",
        "total_students": 395,
        "features": 33,
        "target": "G3 - Final Grade (0-20)",
        "pass_rate": "67.1%",
        "avg_grade": 10.4
    }


@app.get("/models")
def list_models():
    """List all available ML models"""
    return {
        "models": [
            "linear_regression",
            "logistic_regression",
            "random_forest",
            "svm",
            "kmeans",
            "gmm"
        ]
    }


@app.get("/sample")
def sample_prediction():
    """Sample prediction with dummy data for testing"""
    sample = {
        "attendance": 75,
        "score": 12,
        "study_hours": 2,
        "days_since_revision": 4,
        "failures": 0,
        "absences": 3,
        "G1": 11,
        "G2": 12
    }
    result = predict_student(sample)
    return {
        "input": sample,
        "prediction": result
    }