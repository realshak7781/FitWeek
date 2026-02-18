import {SetLog} from "../typesUtil/types";

export function SetTable({sets} : {sets : SetLog[]}){

    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                    <th className="px-4 py-2 font-bold">Exercise</th>
                    <th className="px-4 py-2 font-bold text-center">Reps</th>
                    <th className="px-4 py-2 font-bold text-center">Weight</th>
                    <th className="px-4 py-2 font-bold text-center text-blue-500">RPE</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                {sets.map((set) => (
                    <tr key={set.id || Math.random()} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-300">{set.exerciseName}</td>
                        <td className="px-4 py-3 text-center text-slate-400 font-mono">{set.reps}</td>
                        <td className="px-4 py-3 text-center text-slate-400 font-mono">{set.weight}kg</td>
                        <td className="px-4 py-3 text-center">
                <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs font-bold border border-blue-500/20">
                  {set.rpe}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}