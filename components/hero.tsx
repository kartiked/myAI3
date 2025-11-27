// components/hero.tsx

"use client";

type HeroProps = {
  onSuggestionClick: (text: string) => void;
};

const SUGGESTED_QUERIES = [
  "Solo woman landing in Delhi at 11pm tonight, budget ₹4–6k. Which area is safest for a one-night stay?",
  "2 adults, New York, 1–3 March. I want a quiet but central area under $250/night.",
  "Family of 4 with an early morning flight from Delhi. Should we stay in Dwarka or Aerocity?",
  "Group of friends doing a last-minute trip to NYC. Which areas balance nightlife and safety?"
];

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

      {/* “MILA's Voice” concept blurb */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-left max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          MILA&apos;s Voice – Local Insight
        </div>
        <p className="text-slate-600">
          Whenever MILA uses local survey data, she highlights it under
          <span className="font-semibold"> “MILA&apos;s Voice”</span> so you
          know it&apos;s coming from real locals rather than generic internet
          reviews.
        </p>
      </div>

      {/* Suggested prompts */}
      <div className="w-full text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Try asking
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SUGGESTED_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onSuggestionClick(q)}
              className="text-left rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-700 hover:border-[#003580]/40 hover:bg-[#f3f6ff] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
