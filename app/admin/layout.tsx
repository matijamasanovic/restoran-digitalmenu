import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <AdminNav userEmail={user.email ?? ""} />
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
