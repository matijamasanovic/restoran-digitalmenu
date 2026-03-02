import { createServerSupabaseClient } from "@/lib/supabase-server";
import MenuEditor from "@/components/admin/MenuEditor";
import type { MenuGroup, MenuItem } from "@/lib/types/menu";

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: groups }, { data: items }] = await Promise.all([
    supabase.from("menu_groups").select("*").order("sort_order"),
    supabase.from("menu_items").select("*").order("sort_order"),
  ]);

  const groupsWithItems: MenuGroup[] = (groups ?? []).map((g) => ({
    ...g,
    items: (items ?? []).filter((i: MenuItem) => i.group_id === g.id),
  }));

  return <MenuEditor initialGroups={groupsWithItems} />;
}
