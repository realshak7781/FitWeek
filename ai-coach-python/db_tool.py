import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

if not DB_URL:
    raise EnvironmentError("DATABASE_URL not found in .env. Check your Docker container.")

engine = create_engine(DB_URL)

def get_exercise_history_7_days(exercise_name: str):
    # This query pulls all sets for the exercise in the last 7 days
    # 'w.workout_date >= CURRENT_DATE - INTERVAL '7 days'' ensures the window is accurate
    query = text("""
                 SELECT s.weight, s.reps, s.rpe, w.workout_date
                 FROM set_logs s
                          JOIN workout_sessions w ON s.workout_session_id = w.id
                 WHERE s.exercise_name = :name
                   AND w.workout_date >= CURRENT_DATE - INTERVAL '7 days'
                 ORDER BY w.workout_date DESC
                 """)
    try:
        with engine.connect() as conn:
            result = conn.execute(query, {"name": exercise_name}).fetchall()
            return result
    except Exception as e:
        print(f"DB Memory Error: {e}")
        return []