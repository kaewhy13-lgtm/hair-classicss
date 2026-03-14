"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar, Scissors, Star, ArrowRight, Clock, User, Crown,
  ChevronRight, BookOpen, Sparkles
} from "lucide-react";
import { ElegantCard, LuxuryButton, GoldDivider } from "@/components/ui";
import { staggerContainer, slideUp } from "@/styles/animations";
import { membershipConfig, formatBookingDate, formatBookingTime, formatCurrency } from "@/lib/utils";
import type { Profile, Booking, HairPassport } from "@/lib/supabase/types";

interface Props {
  profile:          Profile | null;
  upcomingBookings: Booking[];
  hairPassport:     HairPassport | null;
}

export function ClientDashboard({ profile, upcomingBookings, hairPassport }: Props) {
  const tier = profile?.membership_tier ?? "none";
  const { label: tierLabel, emoji } = membershipConfig[tier];

  const nextBooking = upcomingBookings[0];

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={slideUp} className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.15em] uppercase font-medium mb-1">
                Welcome Back
              </p>
              <h1 className="font-display text-4xl font-semibold text-ivory">
                {profile?.full_name?.split(" ")[0] ?? "Guest"}
              </h1>
            </div>
            {tier !== "none" && (
              <div className="flex items-center gap-2 glass-gold px-4 py-2 rounded-full">
                <Crown className="h-4 w-4 text-gold" />
                <span className="text-gold text-sm font-medium">
                  {emoji} {tierLabel}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* ─── Stats Row ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Calendar, label: "Upcoming",    value: upcomingBookings.length.toString() },
            { icon: Scissors, label: "Total Visits", value: "—" },
            { icon: Star,     label: "Loyalty Points", value: "—" },
            { icon: Clock,    label: "Hours in Chair",  value: "—" },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={slideUp}>
              <ElegantCard className="text-center p-5">
                <Icon className="h-5 w-5 text-gold mx-auto mb-3" />
                <div className="text-2xl font-display font-semibold text-ivory mb-1">{value}</div>
                <div className="text-xs text-muted">{label}</div>
              </ElegantCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <motion.div
            className="lg:col-span-2"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            <ElegantCard gold>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-ivory">Upcoming Appointments</h2>
                <Link href="/booking" className="text-gold text-xs hover:underline flex items-center gap-1">
                  Book new <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-10 w-10 text-muted mx-auto mb-3" />
                  <p className="text-muted text-sm">No upcoming appointments</p>
                  <LuxuryButton size="sm" className="mt-4" asChild>
                    <Link href="/booking">Book Now</Link>
                  </LuxuryButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="h-10 w-10 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0">
                        <Scissors className="h-5 w-5 text-obsidian" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ivory text-sm truncate">
                          {(booking.service as { name: string } | undefined)?.name ?? "Appointment"}
                        </p>
                        <p className="text-muted text-xs mt-0.5">
                          {formatBookingDate(booking.starts_at)} at {formatBookingTime(booking.starts_at)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            booking.status === "confirmed"
                              ? "bg-luxury-success/20 text-green-400"
                              : "bg-gold/10 text-gold"
                          }`}>
                            {booking.status}
                          </span>
                          {booking.total_amount && (
                            <span className="text-xs text-muted">{formatCurrency(booking.total_amount)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ElegantCard>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Hair Passport */}
            <motion.div variants={slideUp} initial="hidden" animate="visible">
              <ElegantCard>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-lg glass-gold flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ivory">Hair Passport</h3>
                </div>
                {hairPassport ? (
                  <div className="space-y-3">
                    {hairPassport.current_color && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Current Colour</span>
                        <span className="text-ivory">{hairPassport.current_color}</span>
                      </div>
                    )}
                    {hairPassport.hair_type && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Hair Type</span>
                        <span className="text-ivory">{hairPassport.hair_type}</span>
                      </div>
                    )}
                    {hairPassport.allergies.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Allergies</span>
                        <span className="text-red-400 text-xs">{hairPassport.allergies.join(", ")}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted text-sm">Complete your hair profile for personalised recommendations.</p>
                )}
                <LuxuryButton variant="outline" size="sm" fullWidth className="mt-4" asChild>
                  <Link href="/hair-passport">View Full Passport</Link>
                </LuxuryButton>
              </ElegantCard>
            </motion.div>

            {/* Membership upgrade */}
            {tier === "none" && (
              <motion.div variants={slideUp} initial="hidden" animate="visible">
                <ElegantCard gold glow>
                  <Crown className="h-6 w-6 text-gold mb-3" />
                  <h3 className="font-display text-lg font-semibold text-ivory mb-2">
                    Unlock Membership
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-4">
                    Priority booking, exclusive stylists, champagne on every visit.
                  </p>
                  <LuxuryButton size="sm" fullWidth asChild>
                    <Link href="/membership">Explore Tiers</Link>
                  </LuxuryButton>
                </ElegantCard>
              </motion.div>
            )}

            {/* AI Consultation CTA */}
            <motion.div variants={slideUp} initial="hidden" animate="visible">
              <ElegantCard className="text-center">
                <Sparkles className="h-8 w-8 text-gold mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold text-ivory mb-2">AI Consultation</h3>
                <p className="text-muted text-xs mb-4">
                  Upload a photo and get personalised style recommendations.
                </p>
                <LuxuryButton variant="ghost" size="sm" fullWidth asChild>
                  <Link href="/consultation">Try It Free</Link>
                </LuxuryButton>
              </ElegantCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
