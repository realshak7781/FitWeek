import {useState,useEffect} from "react";
import type {WorkoutSession} from "./typesUtil/types";
import {getAllWorkouts} from "./services/api";


function App() {
    const [workouts,setWorkouts]=useState<WorkoutSession[]>([]);
    const [isLoading,setLoading]=useState<boolean>(true);

    // when the main component mounts , i want to run getAllWorkouts once

    useEffect(() => {

        const fetchWorkouts = async () => {
            try{
                const response: WorkoutSession[] = await getAllWorkouts();
                setWorkouts(response);
            }catch (error) {
                console.error("Error loading workouts:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchWorkouts();
    }, []);

    if(isLoading){
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
            <header className="max-w-5xl mx-auto mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter">
                    FIT<span className="text-blue-500">WEEK</span>
                </h1>
                <p className="text-slate-400 mt-2 font-medium">Your AI-Powered Workout Architect</p>
            </header>

            <main className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <div
                            key={workout.id}
                            className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                                    {workout.title}
                                </h2>
                                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
                  {workout.workoutDate}
                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm text-slate-300 italic bg-blue-500/5 border-l-2 border-blue-500 pl-3 py-1">
                                    "{workout.aiCoachNotes}"
                                </div>

                                <div className="pt-4 border-t border-slate-700">
                                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Volume</p>
                                    <p className="text-2xl font-light">
                                        {workout.setLogs.length} <span className="text-sm text-slate-500">Sets Logged</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                        <p className="text-slate-500 text-lg">No sessions found. Time to hit the gym!</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App