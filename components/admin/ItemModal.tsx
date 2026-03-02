"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types/menu";

interface Props {
  item?: MenuItem;
  groupId: string;
  onSave: (data: Omit<MenuItem, "id" | "created_at">, id?: string) => void;
  onClose: () => void;
}

export default function ItemModal({ item, groupId, onSave, onClose }: Props) {
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(
    item?.price != null ? String(item.price) : ""
  );
  const [imageUrl, setImageUrl] = useState(item?.image_url ?? "");
  const [isAvailable, setIsAvailable] = useState(item?.is_available ?? true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");

    const ext = file.name.split(".").pop();
    const path = `items/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("menu-images")
      .upload(path, file, { upsert: true });

    if (error) {
      setUploadError("Greška pri uploadu: " + error.message);
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from("menu-images").getPublicUrl(path);
      setImageUrl(publicUrl);
    }
    setUploading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(
      {
        group_id: groupId,
        name: name.trim(),
        description: description.trim() || null,
        price: price !== "" ? parseFloat(price) : null,
        image_url: imageUrl || null,
        is_available: isAvailable,
        sort_order: item?.sort_order ?? 0,
      },
      item?.id
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-stone-100">
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">🍴</span>
            </div>
            <h2 className="font-bold text-stone-800 text-lg">
              {item ? "Uredi stavku" : "Nova stavka"}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">
              Fotografija
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl cursor-pointer transition overflow-hidden group
                ${
                  imageUrl
                    ? "border-stone-200"
                    : "border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50"
                }`}
              style={{ minHeight: "120px" }}
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="preview"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-sm font-semibold bg-black/30 px-3 py-1.5 rounded-lg">
                      Promijeni fotografiju
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  {uploading ? (
                    <div className="flex items-center gap-2 text-amber-500">
                      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-medium">Učitavanje...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-stone-200 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-stone-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-stone-400 font-medium">
                        Kliknite za upload fotografije
                      </p>
                      <p className="text-xs text-stone-300">JPG, PNG, WEBP</p>
                    </>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {uploadError && (
              <p className="text-red-500 text-xs mt-1">{uploadError}</p>
            )}
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="text-xs text-stone-400 hover:text-red-500 mt-1.5 transition flex items-center gap-1"
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Ukloni fotografiju
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
              Naziv <span className="text-red-400">*</span>
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Cezar salata"
              required
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-800 rounded-xl px-4 py-3 text-sm
                         focus:outline-none transition placeholder:text-stone-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
              Opis
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kratki opis jela (opcionalno)"
              rows={2}
              className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-800 rounded-xl px-4 py-3 text-sm
                         focus:outline-none transition resize-none placeholder:text-stone-300"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
              Cijena (€)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-semibold text-sm">
                €
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-400 focus:bg-white text-stone-800 rounded-xl pl-8 pr-4 py-3 text-sm
                           focus:outline-none transition placeholder:text-stone-300"
              />
            </div>
          </div>

          {/* Available toggle */}
          <div className="flex items-center justify-between bg-stone-50 border-2 border-stone-100 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-stone-700">Dostupnost</p>
              <p className="text-xs text-stone-400 mt-0.5">
                Prikaži stavku gostima na jelovniku
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAvailable((v) => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                isAvailable ? "bg-emerald-500" : "bg-stone-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  isAvailable ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm font-semibold py-3 rounded-xl transition"
            >
              Otkaži
            </button>
            <button
              type="submit"
              disabled={!name.trim() || uploading}
              className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white text-sm font-bold py-3 rounded-xl transition shadow-sm"
            >
              {item ? "Sačuvaj izmjene" : "Dodaj stavku"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
