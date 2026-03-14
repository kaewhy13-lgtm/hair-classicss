"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Calendar, TrendingUp, Settings,
  Shield, Tag, Bell, ChevronRight, MoreHorizontal,
  UserCheck, AlertTriangle, Package, Star
} from "lucide-react";
import { staggerContainer, slideUp, fadeIn } from "@/styles/animations";

// ─── Mock data ────────────────────────────────────────────────
const stats = [
  { label: "Total Clients",     value: "4,218",  change: "+12%", icon: Users,       positive: true  },
  { label: "Bookings This Month", value: "387",   change: "+8%",  icon: Calendar,    positive: true  },
  { label: "Monthly Revenue",   value: "£48,320", change: "+22%", icon: TrendingUp,  positive: true  },
  { label: "Active Members",    value: "214",    change: "-3%",  icon: Star,        positive: false },
];

const recentUsers = [
  { name: "Amelia Worthington",  email: "amelia@example.com",  role: "client",      tier: "Diamond", joined: "Today"     },
  { name: "Sophie Chen",         email: "sophie@example.com",  role: "client",      tier: "Gold",    joined: "Yesterday" },
  { name: "Marcus DeLeon",       email: "marcus@example.com",  role: "stylist",     tier: "–",       joined: "2 days ago" },
  { name: "Priya Kapoor",        email: "priya@example.com",   role: "client",      tier: "Platinum", joined: "3 days ago" },
  { name: "James Hartley",       email: "james@example.com",   role: "salon_owner", tier: "–",       joined: "1 week ago" },
];

const pendingActions = [
  { type: "warning", label: "3 bookings require manual confirmation",   action: "Review" },
  { type: "info",    label: "New stylist application: Elena Morozova",   action: "Approve" },
  { type: "warning", label: "Stripe webhook failed — 2 missed events",  action: "Fix" },
  { type: "info",    label: "Inventory low: Kerastase shampoo",         action: "Order" },
];

const tabs = ["Overview", "Users", "Bookings", "Promotions", "Settings"];

const tierColors: Record<string, string> = {
  Diamond: "text-blue-300 border-blue-300/30 bg-blue-300/5",
  Platinum: "text-cream/70 border-cream/20 bg-cream/5",
  Gold:     "text-gold border-gold/30 bg-gold/5",
  "–":      "text-muted/50 border-muted/10 bg-transparent",
};

const roleColors: Record<string, string> = {
  client:      "text-cream/60",
  stylist:     "text-gold/70",
  salon_owner: "text-blush/70",
  admin:       "text-copper/70",
};

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-espresso-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3 mb-4">
            <div className="h-7 w-7 rounded-sm bg-gold-gradient flex items-center justify-center">
              <Shield className="h-3.5 w-3.5 text-espresso-dark" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-gold/60 uppercase">Admin</span>
          </motion.div>
          <motion.h1 variants={slideUp} className="font-display text-4xl sm:text-5xl font-light text-cream">
            Control Panel
          </motion.h1>
          <motion.p variants={slideUp} className="text-cream/40 mt-2 text-sm">
            Manage clients, stylists, bookings, and promotions.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gold/10 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-[12px] font-medium tracking-[0.06em] uppercase transition-all duration-300 border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-gold text-gold"
                  : "border-transparent text-cream/40 hover:text-cream/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Stats Grid ──────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map(({ label, value, change, icon: Icon, positive }) => (
            <motion.div key={label} variants={slideUp}>
              <div className="border border-gold/10 hover:border-gold/20 transition-colors duration-400 rounded-sm p-5 bg-espresso-light/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-8 rounded-sm border border-gold/15 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-gold/70" />
                  </div>
                  <span className={`text-[11px] font-semibold tracking-wide ${positive ? "text-green-400/70" : "text-red-400/70"}`}>
                    {change}
                  </span>
                </div>
                <p className="font-display text-3xl font-light text-cream mb-1">{value}</p>
                <p className="text-[11px] tracking-wide text-muted/80 uppercase">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Pending Actions ─────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <motion.div variants={slideUp}>
              <div className="border border-gold/10 rounded-sm bg-espresso-light/15 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
                  <div className="flex items-center gap-2">
                    <Bell className="h-3.5 w-3.5 text-gold/60" />
                    <h2 className="text-[11px] tracking-[0.15em] text-cream/70 uppercase font-medium">
                      Pending Actions
                    </h2>
                  </div>
                  <span className="text-[10px] text-gold bg-gold/10 px-1.5 py-0.5 rounded-sm">
                    {pendingActions.length}
                  </span>
                </div>
                <div className="divide-y divide-gold/5">
                  {pendingActions.map(({ type, label, action }, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-espresso-light/10 transition-colors group">
                      {type === "warning"
                        ? <AlertTriangle className="h-4 w-4 text-amber-400/60 mt-0.5 shrink-0" />
                        : <Bell className="h-4 w-4 text-gold/50 mt-0.5 shrink-0" />
                      }
                      <div className="flex-1 min-w-0">
                        <p className="text-cream/70 text-[12px] leading-snug">{label}</p>
                        <button className="text-[11px] text-gold/60 hover:text-gold mt-1 tracking-wide uppercase transition-colors">
                          {action} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Recent Users ────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <motion.div variants={slideUp}>
              <div className="border border-gold/10 rounded-sm bg-espresso-light/15 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-3.5 w-3.5 text-gold/60" />
                    <h2 className="text-[11px] tracking-[0.15em] text-cream/70 uppercase font-medium">
                      Recent Registrations
                    </h2>
                  </div>
                  <button className="text-[11px] text-gold/50 hover:text-gold tracking-wide uppercase transition-colors">
                    View All →
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/5">
                        {["Name", "Role", "Tier", "Joined", ""].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-[10px] tracking-[0.12em] text-muted/60 uppercase font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                      {recentUsers.map(({ name, email, role, tier, joined }) => (
                        <tr key={email} className="hover:bg-espresso-light/10 transition-colors group">
                          <td className="px-5 py-3.5">
                            <p className="text-cream text-sm font-medium">{name}</p>
                            <p className="text-muted/50 text-[11px]">{email}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[11px] capitalize tracking-wide ${roleColors[role] ?? "text-muted"}`}>
                              {role.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`text-[11px] px-2 py-0.5 rounded-sm border ${tierColors[tier] ?? "text-muted"}`}>
                              {tier}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="text-[11px] text-muted/60">{joined}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted/50 hover:text-gold">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Quick Links ──────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
        >
          {[
            { label: "Manage Services",  icon: Package,    desc: "Edit pricing & durations"    },
            { label: "Promotions",       icon: Tag,        desc: "Create discount codes"       },
            { label: "System Settings",  icon: Settings,   desc: "Config & integrations"       },
            { label: "Audit Log",        icon: Shield,     desc: "View security events"        },
          ].map(({ label, icon: Icon, desc }) => (
            <motion.button
              key={label}
              variants={slideUp}
              className="group text-left border border-gold/10 hover:border-gold/25 rounded-sm p-5 bg-espresso-light/10 hover:bg-espresso-light/20 transition-all duration-400"
            >
              <Icon className="h-5 w-5 text-gold/50 group-hover:text-gold transition-colors mb-3" />
              <p className="text-cream text-sm font-medium mb-1">{label}</p>
              <p className="text-muted/60 text-[11px]">{desc}</p>
              <ChevronRight className="h-3.5 w-3.5 text-gold/0 group-hover:text-gold/60 mt-2 transition-all duration-300 group-hover:translate-x-0.5" />
            </motion.button>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
