import json
import random
import os
import numpy as np

def generate_student_dataset(num_samples=2500, seed=42):
    """
    Generates a realistic, highly correlated student performance dataset.
    Features model academic metrics, behavioral indicators, and environmental factors.
    """
    np.random.seed(seed)
    random.seed(seed)

    parental_levels = ["High School", "Bachelor's", "Master's", "Doctorate"]

    data = []
    
    for i in range(1, num_samples + 1):
        # Academic & Behavioral Core Features
        study_hours = float(np.round(np.random.normal(loc=18, scale=7), 1))
        study_hours = max(2.0, min(40.0, study_hours))

        attendance_pct = float(np.round(np.random.normal(loc=82, scale=12), 1))
        attendance_pct = max(40.0, min(100.0, attendance_pct))

        past_gpa = float(np.round(np.random.normal(loc=3.1, scale=0.6), 2))
        past_gpa = max(1.0, min(4.0, past_gpa))

        sleep_hours = float(np.round(np.random.normal(loc=7.0, scale=1.2), 1))
        sleep_hours = max(3.5, min(10.0, sleep_hours))

        screen_time = float(np.round(np.random.normal(loc=4.5, scale=2.0), 1))
        screen_time = max(1.0, min(12.0, screen_time))

        quiz_scores = float(np.round(np.random.normal(loc=76, scale=14), 1))
        quiz_scores = max(30.0, min(100.0, quiz_scores))

        online_courses = int(np.random.choice([0, 1, 2, 3, 4, 5], p=[0.2, 0.3, 0.25, 0.15, 0.07, 0.03]))
        extracurricular = int(np.random.choice([0, 1], p=[0.45, 0.55]))
        parental_edu = str(np.random.choice(parental_levels, p=[0.3, 0.4, 0.2, 0.1]))
        stress_level = int(max(1, min(10, int(np.random.normal(loc=5.5, scale=2)))))

        # Target Calculation Formula (ground truth with realistic noise & non-linear features)
        # Weights: Attendance (25%), Past GPA (25%), Quiz Scores (20%), Study Hours (15%), Sleep (5%), Stress (-5%), Screen Time (-5%)
        base_score = (
            (attendance_pct * 0.25) +
            (past_gpa * 25.0 * 0.25) +
            (quiz_scores * 0.20) +
            ((study_hours / 40.0 * 100) * 0.15) +
            ((sleep_hours / 8.0 * 100 if sleep_hours <= 8 else (16 - sleep_hours) / 8.0 * 100) * 0.05) -
            (stress_level * 1.2) -
            (screen_time * 0.8) +
            (online_courses * 1.5) +
            (extracurricular * 2.0)
        )
        
        # Add random noise
        noise = np.random.normal(0, 3.5)
        final_grade = float(np.round(max(35.0, min(99.5, base_score + noise)), 1))

        # Risk Classification
        if final_grade >= 75.0:
            risk_level = "Low"
        elif final_grade >= 58.0:
            risk_level = "Moderate"
        else:
            risk_level = "High"

        student = {
            "id": f"STU-{1000 + i}",
            "study_hours": study_hours,
            "attendance_pct": attendance_pct,
            "past_gpa": past_gpa,
            "sleep_hours": sleep_hours,
            "screen_time_hours": screen_time,
            "quiz_scores_avg": quiz_scores,
            "online_courses": online_courses,
            "extracurricular": extracurricular,
            "parental_education": parental_edu,
            "stress_level": stress_level,
            "final_grade": final_grade,
            "risk_level": risk_level
        }
        data.append(student)

    return data

if __name__ == "__main__":
    dataset = generate_student_dataset(num_samples=2500)
    print(f"Generated {len(dataset)} synthetic student records successfully.")
    
    # Save output dataset
    out_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "studentDataset.json")
    
    with open(out_file, "w") as f:
        json.dump(dataset[:200], f, indent=2) # Keep first 200 for fast frontend dashboard rendering
        
    full_out_file = os.path.join(os.path.dirname(__file__), "full_student_dataset.json")
    with open(full_out_file, "w") as f:
        json.dump(dataset, f, indent=2)
        
    print(f"Saved dataset artifacts to {out_file} and {full_out_file}")
