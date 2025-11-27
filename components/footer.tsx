// components/footer.tsx

"use client";

import Link from "next/link";
import { OWNER_NAME } from "@/config";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-100 bg-white/90">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-1 text-center">
        <p className="text-[11px] text-slate-500">
          MILA is a beta project. Hotel and neighborhood suggestions are based
          on limited survey data and third-party APIs and may be incomplete or
          inaccurate. Always use your own judgment and consult official
          advisories, especially for safety-critical decisions.
        </p>
        <p className="text-[11px] text-slate-500">
          © {new Date().getFullYear()} {OWNER_NAME} ·{" "}
          <Link href="/terms" className="underline">
            Terms of Use
          </Link>
        </p>
      </div>
    </footer>
  );
}
