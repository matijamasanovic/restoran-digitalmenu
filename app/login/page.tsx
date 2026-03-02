"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Pogrešan email ili lozinka.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 mb-4 shadow-md shadow-amber-200">
              <span className="text-3xl">🍽</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
              Dobrodošli
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Prijavite se u admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-800 rounded-xl px-4 py-3 text-sm
                           placeholder:text-stone-300 focus:outline-none transition"
                placeholder="admin@restoran.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
                Lozinka
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-800 rounded-xl px-4 py-3 text-sm
                           placeholder:text-stone-300 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-red-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold
                         rounded-xl py-3 text-sm transition-all duration-150 mt-2 shadow-sm shadow-amber-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Prijavljivanje...
                </>
              ) : (
                "Prijava"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-300 mt-6">
          Restoran admin panel
        </p>
      </div>
    </div>
  );
}
