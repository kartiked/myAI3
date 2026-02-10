"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onClearChat: () => void;
}

export function Header({ onClearChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-rose-50/70 border-b border-rose-100">
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/galchu-logo.svg"
            alt="Galchu Logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <span className="text-lg font-semibold tracking-tight text-rose-900">
            Galchu
          </span>
        </div>

        {/* New chat */}
        <Button
          variant="outline"
          size="sm"
          onClick={onClearChat}
          className="rounded-full text-xs border-rose-200 bg-white hover:bg-rose-50 hover:text-rose-700 transition"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          New chat
        </Button>
      </div>
    </header>
  );
}
