"use client";

import Image from "next/image";
import { Heart, Moon, Sparkles, MessageCircle } from "lucide-react";

type HeroProps = {
  onSuggestionClick: (text: string) => void;
};

const SUGGESTED_QUERIES = [
  {
    text: "hey galchu, i had a long day and just wanna talk",
    icon: Heart,
    bg: "bg-rose-50 hover:bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    text: "i’m tired but i don’t wanna sleep yet",
    icon: Moon,
    bg: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    text: "can you distract me a little?",
    icon: Sparkles,
    bg: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    text: "just checking in 🩶",
    icon: MessageCircle,
    bg: "bg-slate-50 hover:bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export function Hero({ onSuggestionClick }: HeroProps) {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
      {/* Intro */}
      <div className="flex justify-center">
  <Image
    src="/galchu-logo.png"
    alt="Galchu"
    width={96}
    height={96}
    priority
  />
</div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-rose-900 tracking-tight">
          Galchu
        </h1>

        <p className="text-sm sm:text-base text-rose-700 max-w-md">
          A soft place to land.  
          Talk. Pause. Be a little honest.
        </p>
      </div>
    
      <div className="w-full">
        <p className="mb-3 text-xs uppercase tracking-widest text-rose-500 font-medium">
          Try saying
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {SUGGESTED_QUERIES.map(({ text, icon: Icon, bg, iconColor }) => (
            <button
              key={text}
              onClick={() => onSuggestionClick(text)}
              className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${bg}`}
            >
              <div className="mt-0.5">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <span className="text-slate-700">{text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
