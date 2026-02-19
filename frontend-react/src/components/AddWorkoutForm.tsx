import { useState } from "react";
import { createWorkout } from "../services/api";
import { WorkoutSession, SetLog } from "../typesUtil/types";

export function AddWorkoutForm({ onComplete }: { onComplete: () => void }) {
    // Principle: Force 'Today' by hardcoding the date initialization
    const today = new Date().toISOString().split("T")[0] ?? "";

    const [title, setTitle] = useState("");
    const [sets, setSets] = useState<SetLog[]>([
        { exerciseName: "", reps: 0, weight: 0, rpe: 0 }
    ]);

    const addSet = () => {
        setSets([...sets, { exerciseName: "", reps: 0, weight: 0, rpe: 0 }]);
    };

    const removeSet= (indexToRemove : number) : void  =>{
        const newSets=sets.filter((_, index) => index !== indexToRemove);
        setSets(newSets);
    }

    const isFormValid = title.trim() !== "" &&
        sets.length > 0 &&
        sets.some(s => s.exerciseName.trim() !== "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validSets = sets.filter(s => s.exerciseName.trim() !== "");

        if(validSets.length==0){
            alert("A workout must have at least one exercise name!");
            return;
        }
        const newWorkout: WorkoutSession = {
            title,
            workoutDate: today, // Hardcoded to prevent past manipulation
            aiCoachNotes: "Session logged live.",
            setLogs: sets
        };

        await createWorkout(newWorkout);
        onComplete(); // Refresh the list in App.tsx
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-3xl border border-blue-500/30">
            <h2 className="text-2xl font-black mb-6">LIVE SESSION: <span className="text-blue-500">{today}</span></h2>

            <input
                type="text"
                placeholder="Workout Title (e.g. Heavy Pull)"
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6 focus:border-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <div className="space-y-4 mb-8">
                {sets.map((set, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        {/* 1. Exercise Name (Takes up half the space) */}
                        <input
                            placeholder="Exercise"
                            className="col-span-6 bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:border-blue-500 outline-none"
                            value={set.exerciseName}
                            onChange={(e) => {
                                const newSets = [...sets];
                                if(newSets[index]) newSets[index].exerciseName = e.target.value;
                                setSets(newSets);
                            }}
                        />

                        {/* 2. Weight */}
                        <input
                            type="number"
                            step="any"
                            placeholder="kg"
                            className="col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:border-blue-500 outline-none text-center"
                            onChange={(e) => {
                                const newSets = [...sets];
                                if(newSets[index]) newSets[index].weight = Number(e.target.value);
                                setSets(newSets);
                            }}
                        />

                        {/* 3. Reps */}
                        <input
                            type="number"
                            placeholder="Reps"
                            className="col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:border-blue-500 outline-none text-center"
                            onChange={(e) => {
                                const newSets = [...sets];
                                if(newSets[index]) newSets[index].reps = Number(e.target.value);
                                setSets(newSets);
                            }}
                        />

                        {/* 4. RPE */}
                        <input
                            type="number"
                            placeholder="RPE"
                            className="col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:border-blue-500 outline-none text-center text-blue-500 font-bold"
                            onChange={(e) => {
                                const newSets = [...sets];
                                if(newSets[index]) newSets[index].rpe = Number(e.target.value);
                                setSets(newSets);
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => removeSet(index)}
                            className="col-span-1 text-slate-600 hover:text-red-500 transition-colors flex justify-center items-center font-bold text-lg"
                            title="Remove Set"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <button type="button" onClick={addSet} className="cursor-pointer w-full py-3 border border-dashed border-slate-700 rounded-xl text-slate-500 mb-4 hover:text-white transition-colors">
                + Add Another Set
            </button>

            <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                    isFormValid
                        ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/40 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
                }`}
            >
                {isFormValid ? "FINISH SESSION" : "COMPLETE ALL FIELDS"}
            </button>
        </form>
    );
}