"use client";

import { useState, useEffect } from "react";
import type { MenuGroup } from "@/lib/types/menu";

interface Props {
  group?: MenuGroup;
  onSave: (name: string, id?: string) => void;
  onClose: () => void;
}

export default function GroupModal({ group, onSave, onClose }: Props) {
  const [name, setName] = useState(group?.name ?? "");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), group?.id);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="font-bold text-stone-800 text-lg">
              {group ? "Uredi grupu" : "Nova grupa"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
              Naziv grupe
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Hladna predjela"
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 text-stone-800 rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:bg-white transition placeholder:text-stone-300"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm font-semibold py-2.5 rounded-xl transition"
            >
              Otkaži
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white text-sm font-bold py-2.5 rounded-xl transition shadow-sm"
            >
              {group ? "Sačuvaj" : "Kreiraj grupu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
