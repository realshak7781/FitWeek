import {useState,useEffect} from "react";
import type {WorkoutSession} from "./typesUtil/types";
import {getAllWorkouts} from "./services/api";
import {CalendarStrip} from "./components/CalendarStrip";
import {WorkoutCard} from "./components/WorkoutCard";
import {EmptyState} from "./components/EmptyState"
import {AddWorkoutForm} from "./components/AddWorkoutForm";


function App() {
    const [workouts,setWorkouts]=useState<WorkoutSession[]>([]);
    const [isLoading,setLoading]=useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0] ?? "");
    const [showForm, setShowForm] = useState(false);
    const today = new Date().toISOString().split("T")[0];
    // when the main component mounts , i want to run getAllWorkouts once

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

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const givenDayWorkouts:WorkoutSession[]= workouts.filter(w=>{
        return w.workoutDate===selectedDate;
    })

    const recentWorkouts:WorkoutSession[] = [...workouts]
        .sort((a, b) => b.workoutDate.localeCompare(a.workoutDate))
        .slice(0, 3);

    if(isLoading){
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <header><h1 className="text-4xl font-black italic">FIT<span className="text-blue-500">WEEK</span></h1></header>

                <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

                {/*workout Card start*/}
                <section className="min-h-[300px]">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-bold">Daily Log</h2>
                        <span className="text-slate-500 font-mono text-sm">{selectedDate}</span>

                        {/*Implementing the + add workout button*/}
                        {selectedDate === today && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                            >
                                + Log Session
                            </button>
                        )}

                    </div>
                    <div className="space-y-4">
                        {
                            givenDayWorkouts.length >0 ?  (
                                givenDayWorkouts.map(w => <WorkoutCard key={w.id} workout={w} />)
                            ) : (
                                <EmptyState/>
                            )
                        }
                    </div>
                </section>
            {/*    workout end*/}

            {/*    Footer showing the last three workout sessions*/}

                <section className="pt-10 border-t border-slate-900">
                    <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-6">Recent Gains</h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {recentWorkouts.map(w => <WorkoutCard key={w.id} workout={w} isCompact={true} />)}
                    </div>
                </section>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-md">
                    <div className="max-w-xl w-full">
                        <AddWorkoutForm onComplete={() => {
                            setShowForm(false);
                            fetchWorkouts();
                        }} />
                        <button
                            onClick={() => setShowForm(false)}
                            className="cursor-pointer mt-6 text-slate-500 hover:text-red-400 text-xs uppercase tracking-widest font-bold w-full transition-colors"
                        >
                            [ Cancel Session ]
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App