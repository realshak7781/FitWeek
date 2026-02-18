import axios from "axios";
import type {WorkoutSession} from "../typesUtil/types.js";

const api= axios.create({
    baseURL : 'http://localhost:8080/api',
    headers : {
        'Content-Type': 'application/json',
    }
})

// api function to get all the workouts from the backend

export const getAllWorkouts= async() : Promise<WorkoutSession[]>=>{
    try{
        const response = await api.get<WorkoutSession[]>("/workouts");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch workouts:", error);
        throw error;
    }
}

export const createWorkout = async (workout: WorkoutSession): Promise<WorkoutSession> => {
    try {
        const response = await api.post<WorkoutSession>('/workouts', workout);
        return response.data;
    } catch (error) {
        console.error("Failed to save workout:", error);
        throw error;
    }
};

export default api;