"use client";

import Link from "next/link";
import { OWNER_NAME } from "@/config";

export function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-[11px] text-slate-400">
      <p>
        Galchu is a personal project, built with care.  
        Not a replacement for real conversations.
      </p>
      <p className="mt-1">
        © {new Date().getFullYear()} {OWNER_NAME} ·{" "}
        <Link href="/terms" className="underline hover:text-slate-600">
          Terms
        </Link>
      </p>
    </footer>
  );
}
