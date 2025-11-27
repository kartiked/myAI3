// components/hero.tsx

"use client";

import { Shield, MapPin, Users, PartyPopper } from "lucide-react"; // icons for the cards

type HeroProps = {
  onSuggestionClick: (text: string) => void;
};

const SUGGESTED_QUERIES = [
  {
    text:
      "Solo woman landing in Delhi at 11pm tonight, budget ₹4–6k. Which area is safest for a one-night stay?",
    label: "Safety first",
    icon: Shield,
    cardClass:
      "bg-sky-50/90 hover:bg-sky-50 border-sky-100 hover:border-sky-200",
    iconClass: "text-sky-700",
  },
  {
    text:
      "2 adults, New York, 1–3 March. I want a quiet but central area under $250/night.",
    label: "Quiet & central",
    icon: MapPin,
    cardClass:
      "bg-emerald-50/90 hover:bg-emerald-50 border-emerald-100 hover:border-emerald-200",
    iconClass: "text-emerald-700",
  },
  {
    text:
      "Family of 4 with an early morning flight from Delhi. Should we stay in Dwarka or Aerocity?",
    label: "Family & airport",
    icon: Users,
    cardClass:
      "bg-amber-50/90 hover:bg-amber-50 border-amber-100 hover:border-amber-200",
    iconClass: "text-amber-700",
  },
  {
    text:
      "Group of friends doing a last-minute trip to NYC. Which areas balance nightlife and safety?",
    label: "Nightlife & safety",
    icon: PartyPopper,
    cardClass:
      "bg-violet-50/90 hover:bg-violet-50 border-violet-100 hover:border-violet-200",
    iconClass: "text-violet-700",
  },
] as const;

export function Hero({ onSuggestionClick }: HeroProps) {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
      {/* Title */}
      <div className="space-y-2">
        <p className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
          Meet MILA
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          Micro-local insights for your last-minute stay.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          MILA blends live hotel options with{" "}
          <span className="font-semibold">micro-local survey data</span> on
          safety, noise, late-night food, and transport so you don&apos;t end up
          in the wrong neighborhood at the wrong hour.
        </p>
      </div>
      {/* Suggested prompts */}
      <div className="w-full text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Try asking
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUGGESTED_QUERIES.map(
            ({ text, label, icon: Icon, cardClass, iconClass }) => (
              <button
                key={text}
                type="button"
                onClick={() => onSuggestionClick(text)}
                className={`group relative overflow-hidden rounded-2xl border px-3 py-3 sm:px-4 sm:py-3.5 text-left text-xs sm:text-sm transition-colors ${cardClass}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 shadow-sm">
                    <Icon className={`w-4 h-4 ${iconClass}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {label}
                    </p>
                    <p className="text-slate-800 leading-snug">{text}</p>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
