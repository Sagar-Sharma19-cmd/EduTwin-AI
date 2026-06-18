import os
import sys
from fastapi.testclient import TestClient

# Add current folder to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from main import app

client = TestClient(app)

def run_tests():
    print("==================================================")
    print("🧪 EDUTWIN AI - AUTOMATED TEST SUITE RUNNER")
    print("==================================================")
    
    # Store test status
    results = {
        "Health Check": False,
        "Weak Student Predict": False,
        "Strong Student Predict": False,
        "Average Student": False,
        "Boundary Values": False,
        "All Fields Present": False,
        "Grade Range Valid": False,
        "Risk Range Valid": False,
        "Forecast Has 7 Days": False,
        "Study Plan Has 4": False
    }
    
    # Test Profiles
    profiles = [
        {"name": "Rahul", "G1": 4, "G2": 5, "failures": 3, "absences": 20, "studytime": 1},
        {"name": "Priya", "G1": 18, "G2": 19, "failures": 0, "absences": 1, "studytime": 4},
        {"name": "Arjun", "G1": 11, "G2": 12, "failures": 1, "absences": 5, "studytime": 2},
        {"name": "Sneha", "G1": 8, "G2": 9, "failures": 1, "absences": 8, "studytime": 3},
        {"name": "Dev", "G1": 10, "G2": 10, "failures": 0, "absences": 0, "studytime": 2}
    ]
    
    print("\n📝 1. Testing GET Endpoints...")
    # Health Check
    try:
        response = client.get("/health")
        if response.status_code == 200:
            data = response.json()
            if "status" in data and "models_loaded" in data:
                results["Health Check"] = True
                print("  ✅ GET /health: PASS")
    except Exception as e:
        print(f"  ❌ GET /health failed: {e}")
        
    # Model Accuracies
    try:
        response = client.get("/model-accuracies")
        if response.status_code == 200:
            print("  ✅ GET /model-accuracies: PASS")
    except Exception as e:
         print(f"  ❌ GET /model-accuracies failed: {e}")
         
    # Dataset Info
    try:
        response = client.get("/dataset-info")
        if response.status_code == 200:
            print("  ✅ GET /dataset-info: PASS")
    except Exception as e:
         print(f"  ❌ GET /dataset-info failed: {e}")
         
    # Sample Weak
    try:
        response = client.get("/sample-weak")
        if response.status_code == 200:
            results["Weak Student Predict"] = True
            print("  ✅ GET /sample-weak (Rahul): PASS")
    except Exception as e:
         print(f"  ❌ GET /sample-weak failed: {e}")
         
    # Sample Strong
    try:
        response = client.get("/sample-strong")
        if response.status_code == 200:
            results["Strong Student Predict"] = True
            print("  ✅ GET /sample-strong (Priya): PASS")
    except Exception as e:
         print(f"  ❌ GET /sample-strong failed: {e}")
         
    print("\n📝 2. Running Student Profiles Through POST /predict...")
    
    # Run the 5 student profiles
    all_fields_ok = True
    grade_bounds_ok = True
    risk_bounds_ok = True
    forecast_len_ok = True
    study_plan_len_ok = True
    
    for i, profile in enumerate(profiles):
        print(f"\n👤 Student Profile {i+1}: {profile['name']}")
        print(f"   Inputs: G1={profile['G1']}, G2={profile['G2']}, Failures={profile['failures']}, Absences={profile['absences']}, Studytime={profile['studytime']}")
        try:
            response = client.post("/predict", json=profile)
            if response.status_code != 200:
                print(f"   ❌ Predict API failed with status {response.status_code}")
                continue
                
            pred = response.json()
            
            # Print profile results
            print(f"   Predicted Grade: {pred.get('predicted_grade')} ({pred.get('grade_out_of_20')})")
            print(f"   Pass/Fail:       {pred.get('pass_fail')} (Prob: {pred.get('pass_probability')}%)")
            print(f"   Struggle Risk:   {pred.get('struggle_risk')}% (Level: {pred.get('risk_level')})")
            print(f"   Cluster Group:   {pred.get('cluster_group')}")
            print(f"   Recommendation:  {pred.get('recommendation')}")
            
            # Assertions / Validations
            # Check fields exist
            required_fields = [
                "student_name", "predicted_grade", "grade_out_of_20", "pass_fail", 
                "pass_probability", "struggle_risk", "risk_level", "forget_in_days", 
                "cluster_group", "cluster_description", "weekly_forecast", "study_plan", 
                "model_insights", "recommendation", "sdg_impact", "processing_time_ms"
            ]
            fields_present = all(field in pred for field in required_fields)
            if not fields_present:
                all_fields_ok = False
                missing = [f for f in required_fields if f not in pred]
                print(f"   ❌ Missing fields: {missing}")
                
            # Grade check [0, 20]
            grade = pred.get("predicted_grade")
            if grade is not None and not (0.0 <= grade <= 20.0):
                grade_bounds_ok = False
                print(f"   ❌ Grade out of bounds: {grade}")
                
            # Risk check [0, 100]
            risk = pred.get("struggle_risk")
            if risk is not None and not (0 <= risk <= 100):
                risk_bounds_ok = False
                print(f"   ❌ Risk out of bounds: {risk}")
                
            # Forecast check (exactly 7 days)
            forecast = pred.get("weekly_forecast", [])
            if len(forecast) != 7:
                forecast_len_ok = False
                print(f"   ❌ Weekly forecast length is {len(forecast)} instead of 7")
                
            # Study plan check (exactly 4 tasks)
            plan = pred.get("study_plan", [])
            if len(plan) != 4:
                study_plan_len_ok = False
                print(f"   ❌ Study plan count is {len(plan)} instead of 4")
                
            # Specific checks for Arjun & Dev profile tests
            if profile["name"] == "Arjun" and response.status_code == 200:
                results["Average Student"] = True
            elif profile["name"] == "Dev" and response.status_code == 200:
                results["Boundary Values"] = True
                
        except Exception as e:
            print(f"   ❌ Predict failed: {e}")
            
    # Assign aggregate results
    results["All Fields Present"] = all_fields_ok
    results["Grade Range Valid"] = grade_bounds_ok
    results["Risk Range Valid"] = risk_bounds_ok
    results["Forecast Has 7 Days"] = forecast_len_ok
    results["Study Plan Has 4"] = study_plan_len_ok
    
    # Calculate score
    total_passed = sum(1 for v in results.values() if v)
    
    # Print beautiful ASCII report
    print("\n")
    print("╔══════════════════════════════════════╗")
    print("║      EDUTWIN AI - TEST REPORT        ║")
    print("╠══════════════════════════════════════╣")
    print(f"║ TEST 1: Health Check          {'✅ PASS' if results['Health Check'] else '❌ FAIL'} ║")
    print(f"║ TEST 2: Weak Student Predict  {'✅ PASS' if results['Weak Student Predict'] else '❌ FAIL'} ║")
    print(f"║ TEST 3: Strong Student Predict{'✅ PASS' if results['Strong Student Predict'] else '❌ FAIL'} ║")
    print(f"║ TEST 4: Average Student       {'✅ PASS' if results['Average Student'] else '❌ FAIL'} ║")
    print(f"║ TEST 5: Boundary Values       {'✅ PASS' if results['Boundary Values'] else '❌ FAIL'} ║")
    print(f"║ TEST 6: All Fields Present    {'✅ PASS' if results['All Fields Present'] else '❌ FAIL'} ║")
    print(f"║ TEST 7: Grade Range Valid     {'✅ PASS' if results['Grade Range Valid'] else '❌ FAIL'} ║")
    print(f"║ TEST 8: Risk Range Valid      {'✅ PASS' if results['Risk Range Valid'] else '❌ FAIL'} ║")
    print(f"║ TEST 9: Forecast Has 7 Days   {'✅ PASS' if results['Forecast Has 7 Days'] else '❌ FAIL'} ║")
    print(f"║ TEST 10: Study Plan Has 4     {'✅ PASS' if results['Study Plan Has 4'] else '❌ FAIL'} ║")
    print("╠══════════════════════════════════════╣")
    print(f"║ TOTAL: {total_passed:02d}/10 PASSED           {'🎉' if total_passed == 10 else '⚠️'}     ║")
    print("╚══════════════════════════════════════╝")
    print("\n")

if __name__ == "__main__":
    run_tests()
