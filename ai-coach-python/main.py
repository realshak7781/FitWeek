from fastapi import FastAPI
from models import WorkoutSessionDTO

app = FastAPI(title="FitWeek AI Architect")

@app.get("/health")
def health():
    return {"status": "The Architect is awake"}

@app.post("/analyze")
async def analyze_workout(session: WorkoutSessionDTO):
    print(f"Received session: {session.title}")

    return {
        "aiCoachNotes": "Infrastructure connected. The Architect is ready to learn your patterns.",
        "status": "success"
    }