export interface SetLog {
    id? : number;
    exerciseName: string;
    reps: number;
    weight: number;
    rpe: number;
}

export interface WorkoutSession {
    id?:number;
    title:string;
    workoutDate: string;
    aiCoachNotes:string;
    setLogs:SetLog[];
}