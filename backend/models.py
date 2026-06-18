from pydantic import BaseModel
from typing import List, Dict

# ── INPUT: what frontend sends to API ──
class StudentInput(BaseModel):
    name: str = "Student"
    G1: float              # 1st period grade (REQUIRED, 0-20)
    G2: float              # 2nd period grade (REQUIRED, 0-20)
    studytime: int = 2     # study time (1-4 scale)
    failures: int = 0      # number of past class failures
    absences: int = 0      # number of absences
    sex: str = "M"         # 'F' or 'M'
    address: str = "U"     # 'U' (urban) or 'R' (rural)
    Medu: int = 2          # mother's education (0-4)
    Fedu: int = 2          # father's education (0-4)
    traveltime: int = 1    # home to school travel time (1-4)
    activities: str = "no" # extra-curricular activities ('yes' or 'no')
    higher: str = "yes"    # wants to take higher education ('yes' or 'no')
    internet: str = "yes"  # internet access at home ('yes' or 'no')
    
    # Keep old fields for backward compatibility
    attendance: float = 75.0
    score: float = 12.0
    study_hours: float = 2.0
    days_since_revision: float = 3.0

# ── OUTPUT: what API sends back ──
class PredictionResult(BaseModel):
    student_name: str
    predicted_grade: float
    grade_out_of_20: str
    pass_fail: str
    pass_probability: float
    struggle_risk: int
    risk_level: str
    forget_in_days: int
    cluster_group: str
    cluster_description: str
    weekly_forecast: List[Dict]
    study_plan: List[Dict]
    model_insights: Dict
    recommendation: str
    sdg_impact: str
    processing_time_ms: float

# Subclass/alias for backward compatibility
PredictionOutput = PredictionResult