"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { createClient } from "@/lib/supabase/client";
import { useChampagneToast } from "@/components/ui/ChampagneToast";
import type { Stylist, Service } from "@/lib/supabase/types";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const steps = [
  { label: "Stylist" },
  { label: "Service" },
  { label: "Date & Time" },
  { label: "Confirm" },
];

const stepTransition = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, zIndex: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit: (direction: number) => ({ x: direction < 0 ? 40 : -40, opacity: 0, zIndex: 0, transition: { duration: 0.3 } }),
};

export default function BookingPage() {
  const {
    booking, setBookingStylist, setBookingService,
    setBookingDate, setBookingTimeSlot, setBookingStep,
  } = useAppStore();

  const [direction, setDirection] = useState(1);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [salonId, setSalonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { show, ToastComponent } = useChampagneToast();

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: salons } = await supabase.from("salons").select("id").limit(1);
      if (salons?.length) setSalonId(salons[0].id);

      const { data: dbStylists } = await supabase
        .from("stylists")
        .select("*, profiles!inner(full_name)")
        .eq("is_active", true);
      if (dbStylists) setStylists(dbStylists as any[]);

      const { data: dbServices } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true);
      if (dbServices) setServices(dbServices);

      setLoading(false);
    }
    fetchData();
  }, []);

  const goNext = useCallback(async () => {
    if (booking.step === steps.length - 1) {
      setSubmitting(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        show("Please sign in to complete your booking.", "error");
        setSubmitting(false);
        router.push("/login");
        return;
      }
      if (!salonId) {
        show("Booking system temporarily unavailable.", "error");
        setSubmitting(false);
        return;
      }

      const startsAt = new Date(booking.selectedDate!);
      const [hours, minutes] = booking.selectedTimeSlot!.split(":");
      startsAt.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      const endsAt = new Date(startsAt);
      endsAt.setMinutes(endsAt.getMinutes() + booking.selectedService!.duration_minutes);

      const { data: newBooking, error } = await supabase.from("bookings").insert({
        client_id: user.id,
        stylist_id: booking.selectedStylist!.id,
        service_id: booking.selectedService!.id,
        salon_id: salonId,
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
        status: "pending",
        total_amount: booking.selectedService!.price,
        deposit_amount: booking.selectedService!.price / 2,
      }).select().single();

      if (error || !newBooking) {
        setSubmitting(false);
        show(error?.message || "Failed to create booking", "error");
        return;
      }

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booking_id: newBooking.id, amount: newBooking.deposit_amount }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to initialize checkout");
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          throw new Error("No checkout URL returned");
        }
      } catch (err: any) {
        setSubmitting(false);
        show(err.message, "error");
      }
      return;
    }

    setDirection(1);
    setBookingStep(Math.min(booking.step + 1, steps.length - 1));
  }, [booking, setBookingStep, salonId, router, show]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setBookingStep(Math.max(booking.step - 1, 0));
  }, [booking.step, setBookingStep]);

  const canProceed = useCallback(() => {
    switch (booking.step) {
      case 0: return !!booking.selectedStylist;
      case 1: return !!booking.selectedService;
      case 2: return !!booking.selectedDate && !!booking.selectedTimeSlot;
      case 3: return true;
      default: return false;
    }
  }, [booking]);

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ECEAE4",
      paddingTop: "100px",
      paddingBottom: "120px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      {ToastComponent}
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "72px", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#A08060",
            marginBottom: "20px",
          }}>
            The Booking Atelier
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "18px",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}>
            Reserve Your Appointment
          </h1>
          <p style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "14px",
            color: "#8A7F78",
            maxWidth: "380px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Experience bespoke hair artistry tailored to your individual style.
          </p>
        </div>

        {/* ── Step Indicator — square markers ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          marginBottom: "64px",
          paddingBottom: "0",
        }}>
          {/* Connecting hairline */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            height: "1px",
            backgroundColor: "rgba(26,24,20,0.10)",
            zIndex: 0,
          }} />
          {/* Progress fill */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: `${(booking.step / (steps.length - 1)) * (100 - 0)}%`,
            height: "1px",
            backgroundColor: "#A08060",
            zIndex: 0,
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          }} />

          {steps.map((step, i) => {
            const done    = i < booking.step;
            const active  = i === booking.step;
            return (
              <div key={step.label} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                zIndex: 1,
              }}>
                {/* Square marker */}
                <div style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: done ? "#A08060" : active ? "#1A1814" : "#ECEAE4",
                  border: done ? "1px solid #A08060" : active ? "1px solid #1A1814" : "1px solid rgba(26,24,20,0.20)",
                  color: done || active ? "#F5F4F0" : "#8A7F78",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  transition: "all 0.4s ease",
                }}>
                  {done ? <Check style={{ width: "12px", height: "12px" }} /> : i + 1}
                </div>
                <span style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "#1A1814" : "#8A7F78",
                  fontWeight: active ? 600 : 400,
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Step Content — tonal panel (no hard border, tonal layering) ── */}
        <div style={{
          backgroundColor: "#F5F4F0",
          padding: "52px 48px",
          minHeight: "420px",
          position: "relative",
        }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={booking.step}
              custom={direction}
              variants={stepTransition}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ position: "absolute", inset: 0, padding: "52px 48px", overflowY: "auto" }}
            >
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "26px",
                fontWeight: 300,
                color: "#1A1814",
                marginBottom: "36px",
                letterSpacing: "-0.01em",
              }}>
                {booking.step === 0 && "Choose Your Stylist"}
                {booking.step === 1 && "Select a Service"}
                {booking.step === 2 && "Choose Date & Time"}
                {booking.step === 3 && "Confirm Details"}
              </h2>

              {/* STEP 0 — Stylist */}
              {booking.step === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {loading && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "40px", paddingBottom: "40px" }}>
                      <Loader2 style={{ width: "20px", height: "20px", color: "#8A7F78" }} className="animate-spin" />
                    </div>
                  )}
                  {stylists.map((stylist, idx) => {
                    const selected = booking.selectedStylist?.id === stylist.id;
                    return (
                      <button
                        key={stylist.id}
                        onClick={() => setBookingStylist(stylist)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "24px 0",
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(26,24,20,0.08)",
                          borderTop: idx === 0 ? "1px solid rgba(26,24,20,0.08)" : "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "20px",
                          transition: "background 0.2s",
                        }}
                      >
                        {/* Square initial — dark or gold when selected */}
                        <div style={{
                          width: "44px",
                          height: "44px",
                          backgroundColor: selected ? "#A08060" : "#1A1814",
                          color: "#F5F4F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "18px",
                          flexShrink: 0,
                          fontWeight: 300,
                          transition: "background 0.3s",
                        }}>
                          {((stylist as any).profiles?.full_name || "S").charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 300, color: "#1A1814", marginBottom: "4px", letterSpacing: "-0.01em" }}>
                            {(stylist as any).profiles?.full_name || "Stylist"}
                          </p>
                          <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "12px", color: "#8A7F78", lineHeight: 1.6, marginBottom: "12px" }}>
                            {stylist.bio}
                          </p>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {stylist.specializations.slice(0, 2).map(s => (
                              <span key={s} style={{
                                fontSize: "9px",
                                fontFamily: "'Jost', system-ui, sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                padding: "3px 10px",
                                backgroundColor: selected ? "rgba(160,128,96,0.10)" : "rgba(26,24,20,0.05)",
                                color: selected ? "#A08060" : "#8A7F78",
                                border: `1px solid ${selected ? "rgba(160,128,96,0.20)" : "transparent"}`,
                                transition: "all 0.3s",
                              }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        {selected && (
                          <div style={{ flexShrink: 0, color: "#A08060", paddingTop: "2px" }}>
                            <Check style={{ width: "16px", height: "16px" }} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 1 — Service */}
              {booking.step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {services.map((service, idx) => {
                    const selected = booking.selectedService?.id === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setBookingService(service)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "24px 0",
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "1px solid rgba(26,24,20,0.08)",
                          borderTop: idx === 0 ? "1px solid rgba(26,24,20,0.08)" : "none",
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div>
                            <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A08060", marginBottom: "6px" }}>
                              {service.category}
                            </p>
                            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "19px", fontWeight: 300, color: "#1A1814", letterSpacing: "-0.01em" }}>
                              {service.name}
                            </p>
                          </div>
                          {selected && <Check style={{ width: "16px", height: "16px", color: "#A08060", flexShrink: 0, marginTop: "4px" }} />}
                        </div>
                        <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "13px", color: "#8A7F78", lineHeight: 1.7, marginBottom: "16px" }}>
                          {service.description}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "11px", color: "#8A7F78", letterSpacing: "0.10em" }}>
                            {service.duration_minutes} min
                          </span>
                          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: 400, color: "#1A1814" }}>
                            £{service.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2 — Date & Time */}
              {booking.step === 2 && (
                <div>
                  {/* Date */}
                  <div style={{ marginBottom: "40px" }}>
                    <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#A08060", marginBottom: "20px" }}>
                      Select Date
                    </p>
                    <div style={{ display: "flex", gap: "0", overflowX: "auto", paddingBottom: "4px" }}>
                      {dates.map(date => {
                        const selected = booking.selectedDate?.toDateString() === date.toDateString();
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => setBookingDate(date)}
                            style={{
                              flexShrink: 0,
                              width: "68px",
                              height: "84px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: selected ? "#1A1814" : "transparent",
                              border: selected ? "1px solid #1A1814" : "1px solid rgba(26,24,20,0.10)",
                              borderRight: "none",
                              color: selected ? "#F5F4F0" : "#1A1814",
                              cursor: "pointer",
                              transition: "all 0.25s ease",
                              gap: "4px",
                            }}
                          >
                            <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", opacity: selected ? 0.7 : 0.5 }}>
                              {date.toLocaleDateString("en-GB", { weekday: "short" })}
                            </span>
                            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 300, lineHeight: 1 }}>
                              {date.getDate()}
                            </span>
                            <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", opacity: selected ? 0.7 : 0.5 }}>
                              {date.toLocaleDateString("en-GB", { month: "short" })}
                            </span>
                          </button>
                        );
                      })}
                      {/* Close last border */}
                      <div style={{ width: "1px", flexShrink: 0, background: "rgba(26,24,20,0.10)" }} />
                    </div>
                  </div>

                  {/* Time Slots */}
                  {booking.selectedDate && (
                    <div>
                      <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#A08060", marginBottom: "20px" }}>
                        Select Time
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                        {timeSlots.map(slot => {
                          const selected = booking.selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setBookingTimeSlot(slot)}
                              style={{
                                padding: "15px 0",
                                textAlign: "center",
                                backgroundColor: selected ? "#1A1814" : "transparent",
                                border: selected ? "1px solid #1A1814" : "1px solid rgba(26,24,20,0.10)",
                                color: selected ? "#F5F4F0" : "#1A1814",
                                fontFamily: "'Jost', system-ui, sans-serif",
                                fontSize: "13px",
                                fontWeight: 400,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3 — Confirm */}
              {booking.step === 3 && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "40px" }}>
                    {[
                      booking.selectedStylist && { label: "Stylist", value: (booking.selectedStylist as any).profiles?.full_name || "Stylist" },
                      booking.selectedService && { label: "Service", value: booking.selectedService.name },
                      booking.selectedService && { label: "Duration", value: `${booking.selectedService.duration_minutes} min` },
                      booking.selectedDate && booking.selectedTimeSlot && {
                        label: "When",
                        value: `${booking.selectedDate.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })} at ${booking.selectedTimeSlot}`,
                      },
                    ].filter(Boolean).map((item: any, i) => (
                      <div key={item.label} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        padding: "18px 0",
                        borderBottom: "1px solid rgba(26,24,20,0.07)",
                        fontFamily: "'Jost', system-ui, sans-serif",
                        fontSize: "14px",
                      }}>
                        <span style={{ color: "#8A7F78", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}>{item.label}</span>
                        <span style={{ color: "#1A1814", fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {booking.selectedService && (
                    <div style={{ background: "#E5E2DB", padding: "28px 28px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontFamily: "'Jost', system-ui, sans-serif", fontSize: "13px" }}>
                        <span style={{ color: "#8A7F78" }}>Total Service</span>
                        <span style={{ color: "#4A4440" }}>£{booking.selectedService.price}</span>
                      </div>
                      <div style={{ height: "1px", background: "rgba(26,24,20,0.07)", marginBottom: "12px" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Jost', system-ui, sans-serif" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1814", marginBottom: "3px" }}>Deposit Due Today</p>
                          <p style={{ fontSize: "11px", color: "#8A7F78" }}>Balance payable at the salon</p>
                        </div>
                        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: 300, color: "#1A1814" }}>
                          £{booking.selectedService.price / 2}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "32px",
        }}>
          <button
            onClick={goPrev}
            disabled={booking.step === 0}
            style={{
              padding: "15px 24px",
              backgroundColor: "transparent",
              border: "1px solid rgba(26,24,20,0.18)",
              color: "#1A1814",
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: booking.step === 0 ? "not-allowed" : "pointer",
              opacity: booking.step === 0 ? 0 : 1,
              transition: "all 0.25s ease",
              pointerEvents: booking.step === 0 ? "none" : "auto",
            }}
          >
            <ArrowLeft style={{ width: "12px", height: "12px" }} />
            Back
          </button>

          <button
            onClick={goNext}
            disabled={!canProceed() || submitting}
            style={{
              padding: "15px 36px",
              backgroundColor: canProceed() ? "#1A1814" : "rgba(26,24,20,0.25)",
              color: "#F5F4F0",
              border: "none",
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: canProceed() && !submitting ? "pointer" : "not-allowed",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {submitting ? (
              <>
                <Loader2 style={{ width: "12px", height: "12px" }} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {booking.step === steps.length - 1 ? "Confirm Booking" : "Continue"}
                {booking.step < steps.length - 1 && <ArrowRight style={{ width: "12px", height: "12px" }} />}
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
