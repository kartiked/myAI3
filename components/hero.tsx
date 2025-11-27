import { Shield, Moon, Briefcase, UtensilsCrossed } from "lucide-react";

interface HeroProps {
    onSuggestionClick: (text: string) => void;
}

export function Hero({ onSuggestionClick }: HeroProps) {
    const suggestions = [
        {
            icon: Shield,
            label: "Safety is important",
            text: "I'm traveling alone and safety is my top priority. Which areas should I look at?",
            color: "text-emerald-600",
            bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100",
        },
        {
            icon: Moon,
            label: "Quiet places",
            text: "I want a quiet neighborhood away from the noise. Any recommendations?",
            color: "text-indigo-600",
            bg: "bg-indigo-50 hover:bg-indigo-100 border-indigo-100",
        },
        {
            icon: Briefcase,
            label: "Business vibe",
            text: "I'm on a business trip. I need a place with good connectivity and a professional vibe.",
            color: "text-blue-600",
            bg: "bg-blue-50 hover:bg-blue-100 border-blue-100",
        },
        {
            icon: UtensilsCrossed,
            label: "Good food nearby",
            text: "I'm a foodie! Suggest hotels in areas known for great restaurants and cafes.",
            color: "text-amber-600",
            bg: "bg-amber-50 hover:bg-amber-100 border-amber-100",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 max-w-lg">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Find your perfect stay, <span className="text-gradient-gold">instantly.</span>
                </h1>
                <p className="text-slate-500 text-lg">
                    Local insights, safety checks, and live availability for Delhi & NYC.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestions.map((s) => (
                    <button
                        key={s.label}
                        onClick={() => onSuggestionClick(s.text)}
                        className={`flex items-center gap-3 p-4 text-left rounded-xl border transition-all duration-200 group ${s.bg}`}
                    >
                        <div className={`p-2 rounded-lg bg-white shadow-sm ${s.color}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-semibold text-sm ${s.color}`}>{s.label}</span>
                            <span className="text-xs text-slate-600 mt-0.5">
                                Click to ask
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
