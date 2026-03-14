import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientDashboard } from "./ClientDashboard";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, { data: bookings }, { data: passport }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("bookings")
      .select("*, stylist:stylists(*, profile:profiles(full_name, avatar_url)), service:services(name, duration_minutes, price)")
      .eq("client_id", user.id)
      .order("starts_at", { ascending: true })
      .gte("starts_at", new Date().toISOString())
      .limit(5),
    supabase.from("hair_passports").select("*").eq("client_id", user.id).single(),
  ]);

  return <ClientDashboard profile={profile} upcomingBookings={bookings ?? []} hairPassport={passport} />;
}
