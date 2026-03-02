import { createServerSupabaseClient } from "@/lib/supabase-server";
import MenuClient from "@/components/MenuClient";

export const revalidate = 60;

export default async function JelovnikPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: groups }, { data: items }] = await Promise.all([
    supabase.from("menu_groups").select("*").order("sort_order"),
    supabase
      .from("menu_items")
      .select("*")
      .eq("is_available", true)
      .order("sort_order"),
  ]);

  const menu = (groups ?? [])
    .map((g) => ({
      id: g.id,
      label: g.name,
      subtitle: "",
      items: (items ?? [])
        .filter((i) => i.group_id === g.id)
        .map((i) => ({
          name: i.name,
          desc: i.description ?? "",
          price: i.price != null ? String(i.price) : "",
          image_url: i.image_url,
        })),
    }))
    .filter((g) => g.items.length > 0);

  return <MenuClient menu={menu} />;
}
