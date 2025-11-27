import Link from "next/link";
import { OWNER_NAME } from "@/config";

export function Footer() {
    return (
        <footer className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <span>
                    © {new Date().getFullYear()} {OWNER_NAME}. All rights reserved.
                </span>
                <div className="flex items-center gap-4">
                    <Link href="/terms" className="hover:text-slate-900 transition-colors underline decoration-slate-300 underline-offset-4">
                        Terms of Use
                    </Link>
                    <span>·</span>
                    <span>
                        Powered by <span className="font-semibold text-slate-700">Ringel.AI</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
