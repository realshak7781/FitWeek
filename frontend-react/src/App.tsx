import {useState,useEffect} from "react";
import type {WorkoutSession} from "./typesUtil/types";
import {getAllWorkouts} from "./services/api";
import {CalendarStrip} from "./components/CalendarStrip";
import {WorkoutCard} from "./components/WorkoutCard";
import {EmptyState} from "./components/EmptyState"


function App() {
    const [workouts,setWorkouts]=useState<WorkoutSession[]>([]);
    const [isLoading,setLoading]=useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0] ?? "");

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
        </div>
    );
}

export default App