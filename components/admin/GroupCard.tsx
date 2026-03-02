"use client";

import { useState } from "react";
import type { MenuGroup, MenuItem } from "@/lib/types/menu";

interface Props {
  group: MenuGroup;
  onEditGroup: () => void;
  onDeleteGroup: () => void;
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onToggleAvailable: (item: MenuItem) => void;
  onGroupDragStart: () => void;
  onGroupDragOver: (e: React.DragEvent) => void;
  onGroupDrop: () => void;
  onItemDragStart: (id: string) => void;
  onItemDrop: (id: string) => void;
}

export default function GroupCard({
  group,
  onEditGroup,
  onDeleteGroup,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onToggleAvailable,
  onGroupDragStart,
  onGroupDragOver,
  onGroupDrop,
  onItemDragStart,
  onItemDrop,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const itemCount = group.items?.length ?? 0;
  const availableCount = group.items?.filter((i) => i.is_available).length ?? 0;

  return (
    <div
      draggable
      onDragStart={onGroupDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
        onGroupDragOver(e);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => {
        setDragOver(false);
        onGroupDrop();
      }}
      className={`rounded-2xl border-2 bg-white transition-all duration-150 ${
        dragOver
          ? "border-amber-400 shadow-lg shadow-amber-100"
          : "border-stone-100 shadow-sm"
      }`}
    >
      {/* Group Header */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Drag handle */}
        <span
          className="text-stone-300 hover:text-stone-400 cursor-grab active:cursor-grabbing select-none text-xl leading-none"
          title="Prevuci da promijeniš redosljed"
        >
          ⠿
        </span>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-3 flex-1 text-left min-w-0"
        >
          <div
            className={`w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center transition-transform ${
              collapsed ? "" : "rotate-90"
            }`}
          >
            <svg
              className="w-3 h-3 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-stone-800 text-base truncate">
              {group.name}
            </h2>
            <p className="text-xs text-stone-400">
              {itemCount === 0
                ? "Nema stavki"
                : `${availableCount} od ${itemCount} dostupno`}
            </p>
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddItem}
            className="flex items-center gap-1.5 text-xs bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-600 font-semibold
                       px-3 py-1.5 rounded-lg transition-all border border-amber-200 hover:border-amber-500"
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
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Dodaj stavku
          </button>
          <button
            onClick={onEditGroup}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
            title="Uredi naziv grupe"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={onDeleteGroup}
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            title="Obriši grupu"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Items list */}
      {!collapsed && (
        <div className="border-t-2 border-stone-100">
          {itemCount === 0 ? (
            <div className="py-8 text-center">
              <p className="text-stone-400 text-sm">Nema stavki u ovoj grupi</p>
              <button
                onClick={onAddItem}
                className="mt-2 text-xs text-amber-500 hover:text-amber-600 font-medium transition"
              >
                + Dodaj prvu stavku
              </button>
            </div>
          ) : (
            <div className="divide-y-2 divide-stone-50">
              {(group.items ?? []).map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onEdit={() => onEditItem(item)}
                  onDelete={() => onDeleteItem(item.id)}
                  onToggle={() => onToggleAvailable(item)}
                  onDragStart={() => onItemDragStart(item.id)}
                  onDrop={() => onItemDrop(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ItemRow({
  item,
  onEdit,
  onDelete,
  onToggle,
  onDragStart,
  onDrop,
}: {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onDragStart: () => void;
  onDrop: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={() => {
        setDragOver(false);
        onDrop();
      }}
      className={`flex items-center gap-3 px-4 py-3 transition group ${
        dragOver ? "bg-amber-50" : "hover:bg-stone-50"
      } ${!item.is_available ? "opacity-50" : ""}`}
    >
      {/* Drag handle */}
      <span className="text-stone-300 hover:text-stone-400 cursor-grab active:cursor-grabbing select-none shrink-0 text-lg">
        ⠿
      </span>

      {/* Thumbnail */}
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-11 h-11 rounded-xl object-cover shrink-0 border-2 border-stone-100"
        />
      ) : (
        <div className="w-11 h-11 rounded-xl bg-stone-100 border-2 border-stone-100 flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 text-stone-300"
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
      )}

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-800 truncate">
          {item.name}
        </p>
        {item.description && (
          <p className="text-xs text-stone-400 truncate mt-0.5">
            {item.description}
          </p>
        )}
      </div>

      {/* Price */}
      {item.price != null && (
        <span className="text-sm font-bold text-stone-700 shrink-0 bg-stone-100 px-2.5 py-1 rounded-lg">
          €{Number(item.price).toFixed(2)}
        </span>
      )}

      {/* Available toggle */}
      <button
        onClick={onToggle}
        title={
          item.is_available ? "Označi kao nedostupno" : "Označi kao dostupno"
        }
        className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
          item.is_available
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
            : "bg-stone-100 text-stone-400 border border-stone-200 hover:bg-stone-200"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            item.is_available ? "bg-emerald-500" : "bg-stone-400"
          }`}
        />
        {item.is_available ? "Dostupno" : "Nedostupno"}
      </button>

      {/* Edit / Delete */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={onEdit}
          className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
          title="Uredi"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
          title="Obriši"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
