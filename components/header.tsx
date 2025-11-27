// components/header.tsx
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onClearChat: () => void;
}

export function Header({ onClearChat }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      {/* Left side: logo + name + badge */}
      <div className="flex items-center gap-3">
        <Image
          src="/mila-logo.svg"
          alt="MILA Logo"
          width={40}
          height={40}
          className="rounded-xl shadow-sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            MILA
          </span>
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
            Beta
          </span>
        </div>
      </div>

      {/* Right side: New Search button */}
      <Button
        variant="outline"
        size="sm"
        className="rounded-full text-xs font-medium gap-1.5 border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-700 transition-colors shadow-sm"
        onClick={onClearChat}
      >
        <Plus className="w-3.5 h-3.5" />
        New Search
      </Button>
    </header>
  );
}
