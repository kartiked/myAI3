import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OWNER_NAME } from "@/config";

interface HeaderProps {
  onClearChat: () => void;
}

export function Header({ onClearChat }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Logo tile */}
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center shadow-lg ring-1 ring-white/20">
          <div className="absolute inset-0 rounded-xl bg-white/10" />
          <Image
            src="/mila-logo.svg"   // ← your new logo
            alt="MILA Logo"
            width={36}
            height={36}
            className="rounded-md shadow-sm"
          />
        </div>

        {/* Brand text */}
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              MILA
            </span>
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
              Beta
            </span>
          </div>
        </div>
      </div>

      {/* New chat button */}
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
