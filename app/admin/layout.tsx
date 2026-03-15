import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "salon_owner")) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col md:flex-row pt-[64px]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-parchment-mid border-r border-dark/10 p-8 flex flex-col">
        <div className="mb-10">
          <p className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-taupe mb-2">Management</p>
          <h2 className="font-display text-2xl font-light text-dark">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-6">
          <Link href="/admin/dashboard" className="font-body text-[13px] font-medium tracking-wide uppercase text-taupe hover:text-dark transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/bookings" className="font-body text-[13px] font-medium tracking-wide uppercase text-taupe hover:text-dark transition-colors">
            Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
