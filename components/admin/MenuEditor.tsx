"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import type { MenuGroup, MenuItem } from "@/lib/types/menu";
import GroupCard from "./GroupCard";
import GroupModal from "./GroupModal";
import ItemModal from "./ItemModal";

interface Props {
  initialGroups: MenuGroup[];
}

export default function MenuEditor({ initialGroups }: Props) {
  const [groups, setGroups] = useState<MenuGroup[]>(initialGroups);
  const [groupModal, setGroupModal] = useState<{
    open: boolean;
    group?: MenuGroup;
  }>({ open: false });
  const [itemModal, setItemModal] = useState<{
    open: boolean;
    item?: MenuItem;
    groupId?: string;
  }>({ open: false });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const totalItems = groups.reduce((n, g) => n + (g.items?.length ?? 0), 0);

  // ─── Group CRUD ─────────────────────────────────────────
  async function saveGroup(name: string, id?: string) {
    setSaving(true);
    if (id) {
      const { data } = await supabase
        .from("menu_groups")
        .update({ name })
        .eq("id", id)
        .select()
        .single();
      if (data)
        setGroups((gs) =>
          gs.map((g) => (g.id === id ? { ...g, name: data.name } : g))
        );
    } else {
      const sort_order = groups.length;
      const { data } = await supabase
        .from("menu_groups")
        .insert({ name, sort_order })
        .select()
        .single();
      if (data) setGroups((gs) => [...gs, { ...data, items: [] }]);
    }
    setSaving(false);
    setGroupModal({ open: false });
  }

  async function deleteGroup(id: string) {
    if (!confirm("Obrisati ovu grupu i sve njene stavke?")) return;
    await supabase.from("menu_groups").delete().eq("id", id);
    setGroups((gs) => gs.filter((g) => g.id !== id));
  }

  // ─── Item CRUD ───────────────────────────────────────────
  async function saveItem(
    data: Omit<MenuItem, "id" | "created_at">,
    id?: string
  ) {
    setSaving(true);
    if (id) {
      const { data: updated } = await supabase
        .from("menu_items")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      if (updated) {
        setGroups((gs) =>
          gs.map((g) =>
            g.id === data.group_id
              ? {
                  ...g,
                  items: (g.items ?? []).map((i) =>
                    i.id === id ? updated : i
                  ),
                }
              : g
          )
        );
      }
    } else {
      const sort_order =
        groups.find((g) => g.id === data.group_id)?.items?.length ?? 0;
      const { data: created } = await supabase
        .from("menu_items")
        .insert({ ...data, sort_order })
        .select()
        .single();
      if (created) {
        setGroups((gs) =>
          gs.map((g) =>
            g.id === data.group_id
              ? { ...g, items: [...(g.items ?? []), created] }
              : g
          )
        );
      }
    }
    setSaving(false);
    setItemModal({ open: false });
  }

  async function deleteItem(itemId: string, groupId: string) {
    if (!confirm("Obrisati ovu stavku?")) return;
    await supabase.from("menu_items").delete().eq("id", itemId);
    setGroups((gs) =>
      gs.map((g) =>
        g.id === groupId
          ? { ...g, items: (g.items ?? []).filter((i) => i.id !== itemId) }
          : g
      )
    );
  }

  async function toggleAvailable(item: MenuItem) {
    const newVal = !item.is_available;
    await supabase
      .from("menu_items")
      .update({ is_available: newVal })
      .eq("id", item.id);
    setGroups((gs) =>
      gs.map((g) =>
        g.id === item.group_id
          ? {
              ...g,
              items: (g.items ?? []).map((i) =>
                i.id === item.id ? { ...i, is_available: newVal } : i
              ),
            }
          : g
      )
    );
  }

  // ─── Drag to reorder groups ──────────────────────────────
  const [dragGroupId, setDragGroupId] = useState<string | null>(null);

  function onGroupDragStart(id: string) {
    setDragGroupId(id);
  }

  async function onGroupDrop(targetId: string) {
    if (!dragGroupId || dragGroupId === targetId) return;
    const from = groups.findIndex((g) => g.id === dragGroupId);
    const to = groups.findIndex((g) => g.id === targetId);
    const reordered = [...groups];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    const updated = reordered.map((g, i) => ({ ...g, sort_order: i }));
    setGroups(updated);
    setDragGroupId(null);
    await Promise.all(
      updated.map((g) =>
        supabase
          .from("menu_groups")
          .update({ sort_order: g.sort_order })
          .eq("id", g.id)
      )
    );
  }

  // ─── Drag to reorder items ───────────────────────────────
  const [dragItemId, setDragItemId] = useState<string | null>(null);
  const [dragItemGroupId, setDragItemGroupId] = useState<string | null>(null);

  function onItemDragStart(itemId: string, groupId: string) {
    setDragItemId(itemId);
    setDragItemGroupId(groupId);
  }

  async function onItemDrop(targetItemId: string, targetGroupId: string) {
    if (
      !dragItemId ||
      dragItemId === targetItemId ||
      dragItemGroupId !== targetGroupId
    )
      return;
    const group = groups.find((g) => g.id === targetGroupId);
    if (!group?.items) return;
    const items = [...group.items];
    const from = items.findIndex((i) => i.id === dragItemId);
    const to = items.findIndex((i) => i.id === targetItemId);
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    const updated = items.map((item, i) => ({ ...item, sort_order: i }));
    setGroups((gs) =>
      gs.map((g) => (g.id === targetGroupId ? { ...g, items: updated } : g))
    );
    setDragItemId(null);
    setDragItemGroupId(null);
    await Promise.all(
      updated.map((item) =>
        supabase
          .from("menu_items")
          .update({ sort_order: item.sort_order })
          .eq("id", item.id)
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-800">Jelovnik</h1>
          <p className="text-stone-400 text-sm mt-0.5">
            {groups.length} {groups.length === 1 ? "grupa" : "grupe"} ·{" "}
            {totalItems} {totalItems === 1 ? "stavka" : "stavki"}
          </p>
        </div>
        <button
          onClick={() => setGroupModal({ open: true })}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold
                     text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-amber-200"
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
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nova grupa
        </button>
      </div>

      {/* Saving indicator */}
      {saving && (
        <div className="fixed top-20 right-4 z-50 bg-white border border-stone-200 text-stone-600 text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          Čuvanje...
        </div>
      )}

      {/* Empty state */}
      {groups.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🍽</span>
          </div>
          <p className="text-stone-700 font-semibold text-lg">
            Jelovnik je prazan
          </p>
          <p className="text-stone-400 text-sm mt-1 mb-5">
            Kreirajte prvu grupu da biste počeli
          </p>
          <button
            onClick={() => setGroupModal({ open: true })}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            + Dodaj prvu grupu
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Hint */}
          <p className="text-xs text-stone-400 flex items-center gap-1.5">
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
                d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Prevucite ⠿ da promijenite redosljed
          </p>

          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEditGroup={() => setGroupModal({ open: true, group })}
              onDeleteGroup={() => deleteGroup(group.id)}
              onAddItem={() => setItemModal({ open: true, groupId: group.id })}
              onEditItem={(item) =>
                setItemModal({ open: true, item, groupId: group.id })
              }
              onDeleteItem={(itemId) => deleteItem(itemId, group.id)}
              onToggleAvailable={toggleAvailable}
              onGroupDragStart={() => onGroupDragStart(group.id)}
              onGroupDragOver={(e) => e.preventDefault()}
              onGroupDrop={() => onGroupDrop(group.id)}
              onItemDragStart={(itemId) => onItemDragStart(itemId, group.id)}
              onItemDrop={(itemId) => onItemDrop(itemId, group.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {groupModal.open && (
        <GroupModal
          group={groupModal.group}
          onSave={saveGroup}
          onClose={() => setGroupModal({ open: false })}
        />
      )}
      {itemModal.open && (
        <ItemModal
          item={itemModal.item}
          groupId={itemModal.groupId!}
          onSave={saveItem}
          onClose={() => setItemModal({ open: false })}
        />
      )}
    </div>
  );
}
