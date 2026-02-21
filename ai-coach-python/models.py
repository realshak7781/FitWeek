from pydantic import BaseModel, Field
from typing import List, Optional

class SetLogDTO(BaseModel):
    exerciseName: str
    weight: float
    reps: int
    rpe: int

class WorkoutSessionDTO(BaseModel):
    title: str
    workoutDate: str
    setLogs: List[SetLogDTO]
    aiCoachNotes: Optional[str] = None