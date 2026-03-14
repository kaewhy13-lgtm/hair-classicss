"use client";

import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, TrendingUp, Scissors, Clock, CheckCircle, XCircle } from "lucide-react";
import { ElegantCard, GoldDivider } from "@/components/ui";
import { staggerContainer, slideUp } from "@/styles/animations";
import { formatCurrency, formatBookingDate, formatBookingTime } from "@/lib/utils";
import type { Salon, Booking, Stylist } from "@/lib/supabase/types";

interface Props {
  salon:          Salon | null;
  recentBookings: Booking[];
  stylists:       Stylist[];
}

const statusColors: Record<string, string> = {
  confirmed:   "text-green-400 bg-green-400/10",
  pending:     "text-gold bg-gold/10",
  completed:   "text-muted bg-white/[0.06]",
  cancelled:   "text-red-400 bg-red-400/10",
  no_show:     "text-red-400 bg-red-400/10",
  in_progress: "text-blue-400 bg-blue-400/10",
};

export function SalonDashboardClient({ salon, recentBookings, stylists }: Props) {
  // Calculate KPIs from data
  const todayBookings   = recentBookings.filter(b => new Date(b.starts_at).toDateString() === new Date().toDateString());
  const weekRevenue     = recentBookings
    .filter(b => b.status === "completed" && b.total_amount)
    .reduce((acc, b) => acc + (b.total_amount ?? 0), 0);
  const confirmedCount  = recentBookings.filter(b => b.status === "confirmed").length;
  const occupancyRate   = stylists.length > 0
    ? Math.round((todayBookings.length / (stylists.length * 8)) * 100)
    : 0;

  const kpis = [
    { icon: Calendar,   label: "Today's Bookings",  value: todayBookings.length.toString(),      change: "" },
    { icon: TrendingUp, label: "Week Revenue",       value: formatCurrency(weekRevenue),          change: "" },
    { icon: Users,      label: "Active Stylists",    value: stylists.filter(s => s.is_active).length.toString(), change: "" },
    { icon: BarChart3,  label: "Occupancy",          value: `${occupancyRate}%`,                 change: "" },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10">
          <motion.p variants={slideUp} className="text-gold text-xs tracking-[0.15em] uppercase font-medium mb-1">
            Salon Owner
          </motion.p>
          <motion.h1 variants={slideUp} className="font-display text-4xl font-semibold text-ivory">
            {salon?.name ?? "Your Salon"} Dashboard
          </motion.h1>
        </motion.div>

        {/* KPI cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpis.map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={slideUp}>
              <ElegantCard hover className="text-center p-5">
                <Icon className="h-5 w-5 text-gold mx-auto mb-3" />
                <div className="text-2xl font-display font-semibold text-ivory mb-1">{value}</div>
                <div className="text-xs text-muted">{label}</div>
              </ElegantCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent bookings */}
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="lg:col-span-2">
            <ElegantCard gold>
              <h2 className="font-display text-xl font-semibold text-ivory mb-6">Recent Bookings</h2>
              {recentBookings.length === 0 ? (
                <p className="text-muted text-sm text-center py-8">No bookings yet.</p>
              ) : (
                <div className="space-y-3 overflow-auto max-h-[480px]">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/10 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-gold-gradient flex items-center justify-center shrink-0">
                        <Scissors className="h-4 w-4 text-obsidian" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-ivory text-sm font-medium truncate">
                          {(booking.client as { full_name?: string } | undefined)?.full_name ?? "Client"}
                        </p>
                        <p className="text-muted text-xs">
                          {(booking.service as { name?: string } | undefined)?.name} · {formatBookingDate(booking.starts_at)} {formatBookingTime(booking.starts_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {booking.total_amount && (
                          <span className="text-ivory text-sm font-semibold">{formatCurrency(booking.total_amount)}</span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[booking.status] ?? "text-muted"}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ElegantCard>
          </motion.div>

          {/* Stylists column */}
          <motion.div variants={slideUp} initial="hidden" animate="visible">
            <ElegantCard className="h-full">
              <h2 className="font-display text-xl font-semibold text-ivory mb-6">Stylists</h2>
              <div className="space-y-4">
                {stylists.length === 0 && (
                  <p className="text-muted text-sm">No stylists added yet.</p>
                )}
                {stylists.map((stylist) => {
                  const profile = stylist.profile as { full_name?: string; avatar_url?: string } | undefined;
                  return (
                    <div key={stylist.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                        <span className="text-obsidian font-bold text-xs">
                          {profile?.full_name?.split(" ").map(n => n[0]).slice(0, 2).join("") ?? "??"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-ivory text-sm font-medium truncate">{profile?.full_name ?? "—"}</p>
                        <p className="text-muted text-xs truncate">{stylist.specializations.slice(0, 2).join(", ")}</p>
                      </div>
                      {stylist.is_active
                        ? <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                        : <XCircle    className="h-4 w-4 text-muted shrink-0" />
                      }
                    </div>
                  );
                })}
              </div>

              <GoldDivider className="my-5" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Today&apos;s Confirmed</span>
                  <span className="text-ivory font-medium">{confirmedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Salon Timezone</span>
                  <span className="text-ivory">{salon?.timezone ?? "Europe/London"}</span>
                </div>
              </div>
            </ElegantCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
