import {WorkoutSession} from "../typesUtil/types";

interface Props {
    workout: WorkoutSession;
    isCompact?:boolean;
}

export function WorkoutCard({workout,isCompact=false}:Props){
    if (isCompact) {
        return (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm hover:border-blue-500/30 transition-colors">
                <p className="font-bold text-blue-400 mb-1">{workout.title}</p>
                <p className="text-slate-500 text-[10px] uppercase">{workout.workoutDate}</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{workout.title}</h3>
                <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">
          ID: {workout.id}
        </span>
            </div>
            <div className="bg-blue-500/10 border-l-2 border-blue-500 p-3 italic text-blue-300 text-sm mb-4">
                "{workout.aiCoachNotes}"
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                {workout.setLogs.length} sets completed
            </div>
        </div>
    );
}