import os
import json
import random
from datetime import datetime, timedelta

def generate_synthetic_fest_data(num_records=1420):
    """Generates synthetic dataset of 1420 participant registration logs for analysis."""
    random.seed(42)
    categories = [
        "Cyber Code & Hackathons", 
        "Robo Wars & Mech Bay", 
        "Esports & Gaming", 
        "Creative & AI Arts", 
        "Star Night & Cultural"
    ]
    colleges = [
        "Usha Martin University", "BIT Sindri", "NIT Jamshedpur", 
        "VIT Vellore", "IIT Guwahati", "Ranchi University", "KIIT Bhubaneswar"
    ]
    
    start_date = datetime(2026, 9, 1, 0, 0, 0)
    data = []

    for i in range(1, num_records + 1):
        ticket_id = f"UMU-2026-{1000 + i}"
        category = random.choice(categories)
        college = random.choices(colleges, weights=[40, 15, 12, 10, 8, 8, 7])[0]
        
        # Simulate registration timestamp with peak in evening (18:00 - 22:00)
        day_offset = random.randint(0, 30)
        hour_weights = [1]*6 + [3]*6 + [8]*6 + [15]*4 + [5]*2  # High weight between 16-20
        hour = random.choices(range(24), weights=hour_weights)[0]
        minute = random.randint(0, 59)
        reg_time = start_date + timedelta(days=day_offset, hours=hour, minutes=minute)

        # Reminder A/B cohort test (instrumentation insight)
        reminded = random.choice([True, True, True, False]) # 75% reminded
        
        # No-show probability logic
        if reminded:
            checked_in = random.random() < 0.88  # 12% no-show
        else:
            checked_in = random.random() < 0.64  # 36% no-show

        data.append({
            "ticket_id": ticket_id,
            "college": college,
            "category": category,
            "registration_timestamp": reg_time.strftime("%Y-%m-%d %H:%M:%S"),
            "hour_of_day": hour,
            "reminded": reminded,
            "check_in_status": "CHECKED_IN" if checked_in else "NO_SHOW",
            "checked_in": 1 if checked_in else 0
        })

    return data

def run_pandas_analysis():
    """Performs pandas data analysis on funnel drop-off, peak registration windows, and no-show reduction."""
    try:
        import pandas as pd
        import numpy as np

        print("⚡ Loading Martinovation TechFest Dataset (1,420 Participant Records)...")
        data = generate_synthetic_fest_data(1420)
        df = pd.DataFrame(data)

        print("\n--- 1. OVERALL CONVERSION METRICS ---")
        total_regs = len(df)
        total_checked_in = df['checked_in'].sum()
        checkin_rate = (total_checked_in / total_regs) * 100
        print(f"Total Registrations: {total_regs}")
        print(f"Total Checked In: {total_checked_in}")
        print(f"Check-in Conversion Rate: {checkin_rate:.2f}%")

        print("\n--- 2. PEAK REGISTRATION WINDOW ANALYSIS ---")
        hourly = df.groupby('hour_of_day').size().reset_index(name='registrations')
        peak_hour = hourly.loc[hourly['registrations'].idxmax()]
        print(f"Peak Registration Hour: {peak_hour['hour_of_day']}:00 - {peak_hour['hour_of_day']+1}:00 ({peak_hour['registrations']} registrations)")
        
        # Group into 4-hour windows
        df['time_window'] = pd.cut(df['hour_of_day'], bins=[-1, 4, 8, 12, 16, 20, 24], labels=[
            '00:00-04:00', '04:00-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-24:00'
        ])
        window_summary = df.groupby('time_window').size()
        print("\nRegistrations by 4-Hour Window:")
        print(window_summary)

        print("\n--- 3. NO-SHOW RATE REDUCTION INSIGHT ---")
        cohort = df.groupby('reminded')['checked_in'].mean().reset_index()
        cohort['no_show_rate'] = (1 - cohort['checked_in']) * 100
        
        no_show_control = cohort[cohort['reminded'] == False]['no_show_rate'].values[0]
        no_show_treated = cohort[cohort['reminded'] == True]['no_show_rate'].values[0]
        reduction_pct = no_show_control - no_show_treated

        print(f"No-Show Rate (Control - No Automated Pass Reminder): {no_show_control:.2f}%")
        print(f"No-Show Rate (Treated - Automated Pass & QR Reminders): {no_show_treated:.2f}%")
        print(f"🔥 SURFACED INSIGHT: Reduced No-Show Rate by {reduction_pct:.2f}%!")

        print("\n--- 4. CATEGORY ATTENDANCE BREAKDOWN ---")
        cat_summary = df.groupby('category').agg(
            registrations=('ticket_id', 'count'),
            checked_in=('checked_in', 'sum')
        )
        cat_summary['attendance_rate_pct'] = (cat_summary['checked_in'] / cat_summary['registrations']) * 100
        print(cat_summary)

        # Export analysis output
        os.makedirs("analytics", exist_ok=True)
        df.to_csv("analytics/fest_attendance_data.csv", index=False)
        print("\n✅ Dataset successfully exported to analytics/fest_attendance_data.csv")

    except ImportError:
        print("Pandas library not installed in runtime environment. Exporting raw JSON dataset.")
        data = generate_synthetic_fest_data(1420)
        os.makedirs("analytics", exist_ok=True)
        with open("analytics/fest_attendance_data.json", "w") as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    run_pandas_analysis()
