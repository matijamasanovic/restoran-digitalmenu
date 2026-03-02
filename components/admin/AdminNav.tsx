"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 font-bold text-stone-800 hover:text-amber-600 transition"
          >
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white text-sm">
              🍽
            </div>
            <span className="text-sm font-bold tracking-tight">Menu Admin</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className="text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 px-3 py-1.5 rounded-lg transition"
            >
              Jelovnik
            </Link>
            <Link
              href="/menu"
              target="_blank"
              className="text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              Pregledaj sajt
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5">
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] font-bold">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {userEmail}
            </span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 border border-stone-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Odjava
          </button>
        </div>
      </div>
    </header>
  );
}
