"use client";

import Image from "next/image";
import { Heart, Sparkles, MessageCircle, Gift } from "lucide-react";

type HeroProps = {
  onSuggestionClick: (text: string) => void;
};

const SUGGESTED_QUERIES = [
  {
    text: "hi",
    label: "Start soft",
    icon: MessageCircle,
    color: "rose",
  },
  {
    text: "i'm bored",
    label: "Let’s talk",
    icon: Sparkles,
    color: "pink",
  },
  {
    text: "do you have something to tell me?",
    label: "Curious mood",
    icon: Gift,
    color: "purple",
  },
  {
    text: "you seem suspicious today",
    label: "Tease mode",
    icon: Heart,
    color: "red",
  },
] as const;

export function Hero({ onSuggestionClick }: HeroProps) {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-8 py-10">

      {/* Brand Intro */}
      <div className="space-y-4 flex flex-col items-center">
        <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-rose-600">
          Meet Galchu
        </p>

        <Image
          src="/galchu-logo.png"
          alt="Galchu Logo"
          width={110}
          height={110}
          className="rounded-full"
        />

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-800">
          A tiny little surprise waiting for you.
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-xl">
          This isn’t just a chat.  
          It’s something a little personal.  
          Start talking and see where it goes.
        </p>
      </div>

      {/* Suggestions */}
      <div className="w-full">
        <p className="mb-4 text-xs uppercase tracking-widest text-rose-500 font-medium">
          Try saying
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {SUGGESTED_QUERIES.map(({ text, label, icon: Icon, color }) => (
            <button
              key={text}
              type="button"
              onClick={() => onSuggestionClick(text)}
              className="group rounded-2xl border border-rose-100 bg-rose-50/70 hover:bg-rose-100 transition-all px-4 py-4 text-left shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                    {label}
                  </p>
                  <p className="text-sm text-slate-700 mt-1 leading-snug">
                    {text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
