type Quote = {
    text : string
    author:string
}


export function EmptyState() {
    const quotes = [
        { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
        { text: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
        { text: "Very little is needed to make a happy life; it is all within yourself.", author: "Marcus Aurelius" },
        { text: "A man's spirit is his self. That entity which is his consciousness.", author: "Howard Roark" },
        { text: "If it is not right, do not do it; if it is not true, do not say it.", author: "Marcus Aurelius" }
    ];

    // Randomly select a quote on each render
    const quote : Quote = quotes[Math.floor(Math.random() * quotes.length)] || quotes[0]!;

    return (
        <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
            <div className="max-w-xs text-center">
                <span className="text-blue-500 text-4xl font-serif block mb-4 opacity-50">“</span>
                <p className="text-slate-300 text-lg font-medium leading-relaxed italic mb-4">
                    {quote.text}
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                    — {quote.author}
                </p>
            </div>
        </div>
    );
}