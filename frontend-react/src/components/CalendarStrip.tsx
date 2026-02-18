interface Props {
    selectedDate: string;
    onSelectDate : (date : string) => void;
}

export function CalendarStrip ({selectedDate, onSelectDate} : Props){
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0] ?? "";
    }).reverse();

    return (
        <section>
            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Focus Week</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {days.map((date) => {
                    const dateObj = new Date(date);
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.split('-')[2];

                    return (
                        <button
                            key={date}
                            onClick={() => onSelectDate(date)}
                            className={`flex-shrink-0 w-20 py-4 rounded-2xl border transition-all ${
                                selectedDate === date
                                    ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/20"
                                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                            }`}
                        >
                            <span className="block text-[10px] uppercase font-bold opacity-60">{dayName}</span>
                            <span className="block text-2xl font-black">{dayNum}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}