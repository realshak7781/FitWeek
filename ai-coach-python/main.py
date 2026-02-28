from fastapi import FastAPI
from models import WorkoutSessionDTO
from graph import architect_brain # Import the compiled graph

app = FastAPI(title="FitWeek AI Architect")

@app.get("/health")
def health():
    return {"status": "The Architect is awake"}

@app.post("/analyze")
async def analyze_workout(session: WorkoutSessionDTO):
    print(f"Received session for processing: {session.title}")

    # Initialize the state for the Graph
    initial_state = {
        "workout_data": session.dict(),
        "research_plan": [],
        "research_results": [],
        "final_notes": "",
        "is_validated": False
    }

    # Run the Graph asynchronously
    # This will trigger: Planner -> Researcher -> Auditor -> (Loop?) -> Writer
    final_state = await architect_brain.ainvoke(initial_state)

    return {
        "aiCoachNotes": final_state["final_notes"],
        "status": "success"
    }