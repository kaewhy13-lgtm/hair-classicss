import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SalonDashboardClient } from "./SalonDashboardClient";

export const metadata = { title: "Salon Dashboard" };

export default async function SalonDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (!profile || (profile.role !== "salon_owner" && profile.role !== "admin")) {
    redirect("/dashboard");
  }

  const [{ data: salon }, { data: bookings }, { data: stylists }] = await Promise.all([
    supabase.from("salons").select("*").eq("owner_id", user.id).single(),
    supabase
      .from("bookings")
      .select("*, service:services(name, price), client:profiles(full_name)")
      .eq("salon_id", (await supabase.from("salons").select("id").eq("owner_id", user.id).single()).data?.id ?? "")
      .order("starts_at", { ascending: false })
      .limit(20),
    supabase
      .from("stylists")
      .select("*, profile:profiles(full_name, avatar_url)")
      .eq("salon_id", (await supabase.from("salons").select("id").eq("owner_id", user.id).single()).data?.id ?? ""),
  ]);

  return (
    <SalonDashboardClient
      salon={salon}
      recentBookings={bookings ?? []}
      stylists={stylists ?? []}
    />
  );
}
