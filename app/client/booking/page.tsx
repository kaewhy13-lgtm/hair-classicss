"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Scissors, Calendar, CreditCard } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import type { Stylist, Service } from "@/lib/supabase/types";

// ─── Mock data (replace with Supabase queries) ────────────
const mockStylists: Stylist[] = [
  { id: "1", profile_id: "p1", salon_id: "s1", bio: "Colour specialist with a passion for transformative balayage.", specializations: ["Balayage", "Highlights", "Colour"], certifications: ["L'Oréal Master Colourist"], years_experience: 12, portfolio_images: [], hourly_rate: 120, buffer_minutes: 15, is_active: true, created_at: new Date().toISOString() },
  { id: "2", profile_id: "p2", salon_id: "s1", bio: "Precision cut artist trained in London and Paris.", specializations: ["Precision Cuts", "Bob", "Layers"], certifications: ["Vidal Sassoon Certified"], years_experience: 9, portfolio_images: [], hourly_rate: 100, buffer_minutes: 15, is_active: true, created_at: new Date().toISOString() },
  { id: "3", profile_id: "p3", salon_id: "s1", bio: "Texture and smoothing expert. Your frizz-free future starts here.", specializations: ["Keratin", "Brazilian Blowout", "Extensions"], certifications: ["Keratin Research Pro"], years_experience: 15, portfolio_images: [], hourly_rate: 140, buffer_minutes: 20, is_active: true, created_at: new Date().toISOString() },
];

const mockServices: Service[] = [
  { id: "s1", salon_id: "sal1", name: "Balayage & Toner", description: "Hand-painted colour technique for natural-looking sun-kissed locks.", duration_minutes: 180, price: 280, category: "Colour", image_url: null, requires_consultation: false, is_active: true },
  { id: "s2", salon_id: "sal1", name: "Precision Cut",    description: "Architectural cut tailored to your face shape and lifestyle.", duration_minutes: 60,  price: 95,  category: "Cut",    image_url: null, requires_consultation: false, is_active: true },
  { id: "s3", salon_id: "sal1", name: "Keratin Treatment",description: "Professional smoothing treatment lasting up to 4 months.",    duration_minutes: 120, price: 240, category: "Treatment", image_url: null, requires_consultation: false, is_active: true },
  { id: "s4", salon_id: "sal1", name: "Bridal Styling",   description: "Bespoke styling for your most important day.",                duration_minutes: 90,  price: 160, category: "Styling", image_url: null, requires_consultation: true, is_active: true },
];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const steps = [
  { label: "Stylist",   icon: Scissors  },
  { label: "Service",   icon: Scissors  },
  { label: "Date & Time", icon: Calendar },
  { label: "Payment",   icon: CreditCard },
];

const stylistNames: Record<string, string> = { "1": "Isabelle Marchand", "2": "James Thurston", "3": "Anika Sharma" };

const stepTransition = {
  enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1, zIndex: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: (direction: number) => ({ x: direction < 0 ? 30 : -30, opacity: 0, zIndex: 0, transition: { duration: 0.3 } }),
};

export default function BookingPage() {
  const {
    booking, setBookingStylist, setBookingService,
    setBookingDate, setBookingTimeSlot, setBookingStep,
  } = useAppStore();

  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setBookingStep(Math.min(booking.step + 1, steps.length - 1));
  }, [booking.step, setBookingStep]);

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
      paddingTop: "80px",
      paddingBottom: "100px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "40px",
            fontWeight: 300,
            color: "#1A1814",
            marginBottom: "16px",
          }}>
            Reserve Your Appointment
          </h1>
          <p style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "14px",
            color: "#4A4440",
            maxWidth: "400px",
            margin: "0 auto",
          }}>
            Experience bespoke hair artistry tailored to your individual style.
          </p>
        </div>

        {/* ── Step Indicator ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          marginBottom: "60px",
        }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute",
            top: "16px",
            left: "0",
            right: "0",
            height: "1px",
            backgroundColor: "rgba(26,24,20,0.1)",
            zIndex: 0,
          }} />

          {steps.map((step, i) => (
            <div key={step.label} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              zIndex: 1,
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: i <= booking.step ? "#1A1814" : "#ECEAE4",
                border: i <= booking.step ? "none" : "1px solid rgba(26,24,20,0.2)",
                color: i <= booking.step ? "#F5F4F0" : "#8A7F78",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                transition: "all 0.3s",
              }}>
                {i < booking.step ? <Check style={{ width: "16px", height: "16px" }} /> : i + 1}
              </div>
              <span style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: i === booking.step ? "#1A1814" : "#8A7F78",
                fontWeight: i === booking.step ? 500 : 400,
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Step Content ── */}
        <div style={{
          backgroundColor: "#F5F4F0",
          border: "1px solid rgba(26,24,20,0.12)",
          padding: "48px 40px",
          minHeight: "400px",
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
              style={{ position: "absolute", inset: 0, padding: "48px 40px", overflowY: "auto" }}
            >
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "28px",
                fontWeight: 300,
                color: "#1A1814",
                marginBottom: "32px",
              }}>
                {booking.step === 0 && "Choose Your Stylist"}
                {booking.step === 1 && "Select a Service"}
                {booking.step === 2 && "Choose Date & Time"}
                {booking.step === 3 && "Confirm Details"}
              </h2>

              {/* STEP 0 */}
              {booking.step === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {mockStylists.map(stylist => {
                    const selected = booking.selectedStylist?.id === stylist.id;
                    return (
                      <button
                        key={stylist.id}
                        onClick={() => setBookingStylist(stylist)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "20px",
                          backgroundColor: selected ? "#E5E2DB" : "transparent",
                          border: selected ? "1px solid rgba(26,24,20,0.3)" : "1px solid rgba(26,24,20,0.1)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "20px",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "#1A1814",
                          color: "#F5F4F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "20px",
                          flexShrink: 0,
                        }}>
                          {stylistNames[stylist.id]?.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#1A1814", marginBottom: "4px" }}>
                            {stylistNames[stylist.id]}
                          </p>
                          <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "12px", color: "#4A4440", lineHeight: 1.5, marginBottom: "12px" }}>
                            {stylist.bio}
                          </p>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {stylist.specializations.slice(0, 2).map(s => (
                              <span key={s} style={{
                                fontSize: "9px",
                                fontFamily: "'Jost', system-ui, sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                padding: "4px 8px",
                                backgroundColor: "rgba(26,24,20,0.05)",
                                color: "#4A4440"
                              }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        {selected && <Check style={{ width: "20px", height: "20px", color: "#1A1814" }} />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 1 */}
              {booking.step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {mockServices.map(service => {
                    const selected = booking.selectedService?.id === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setBookingService(service)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "20px",
                          backgroundColor: selected ? "#E5E2DB" : "transparent",
                          border: selected ? "1px solid rgba(26,24,20,0.3)" : "1px solid rgba(26,24,20,0.1)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <div>
                            <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "4px" }}>
                              {service.category}
                            </p>
                            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#1A1814" }}>
                              {service.name}
                            </p>
                          </div>
                          {selected && <Check style={{ width: "20px", height: "20px", color: "#1A1814" }} />}
                        </div>
                        <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "13px", color: "#4A4440", lineHeight: 1.5, marginBottom: "16px" }}>
                          {service.description}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "12px", color: "#8A7F78" }}>
                            {service.duration_minutes} min
                          </span>
                          <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1814" }}>
                            £{service.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2 */}
              {booking.step === 2 && (
                <div>
                  <div style={{ marginBottom: "32px" }}>
                    <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "16px" }}>
                      Select Date
                    </p>
                    <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
                      {dates.map(date => {
                        const selected = booking.selectedDate?.toDateString() === date.toDateString();
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => setBookingDate(date)}
                            style={{
                              flexShrink: 0,
                              width: "72px",
                              height: "80px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: selected ? "#1A1814" : "transparent",
                              border: selected ? "1px solid #1A1814" : "1px solid rgba(26,24,20,0.1)",
                              color: selected ? "#F5F4F0" : "#1A1814",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            <span style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "10px", textTransform: "uppercase", opacity: selected ? 0.8 : 0.6 }}>
                              {date.toLocaleDateString("en-GB", { weekday: "short" })}
                            </span>
                            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", marginTop: "4px" }}>
                              {date.getDate()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {booking.selectedDate && (
                    <div>
                      <p style={{ fontFamily: "'Jost', system-ui, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8A7F78", marginBottom: "16px" }}>
                        Select Time
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {timeSlots.map(slot => {
                          const selected = booking.selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setBookingTimeSlot(slot)}
                              style={{
                                padding: "14px 0",
                                textAlign: "center",
                                backgroundColor: selected ? "#E5E2DB" : "transparent",
                                border: selected ? "1px solid rgba(26,24,20,0.5)" : "1px solid rgba(26,24,20,0.1)",
                                color: "#1A1814",
                                fontFamily: "'Jost', system-ui, sans-serif",
                                fontSize: "13px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all 0.2s",
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

              {/* STEP 3 */}
              {booking.step === 3 && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", fontFamily: "'Jost', system-ui, sans-serif", fontSize: "14px" }}>
                    {booking.selectedStylist && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#8A7F78" }}>Stylist</span>
                        <span style={{ color: "#1A1814", fontWeight: 500 }}>{stylistNames[booking.selectedStylist.id]}</span>
                      </div>
                    )}
                    {booking.selectedService && (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#8A7F78" }}>Service</span>
                          <span style={{ color: "#1A1814", fontWeight: 500 }}>{booking.selectedService.name}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#8A7F78" }}>Duration</span>
                          <span style={{ color: "#1A1814" }}>{booking.selectedService.duration_minutes} min</span>
                        </div>
                      </>
                    )}
                    {booking.selectedDate && booking.selectedTimeSlot && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#8A7F78" }}>When</span>
                        <span style={{ color: "#1A1814", fontWeight: 500 }}>
                          {booking.selectedDate.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" })} at {booking.selectedTimeSlot}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ height: "1px", backgroundColor: "rgba(26,24,20,0.1)", marginBottom: "32px" }} />

                  {booking.selectedService && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px", fontFamily: "'Jost', system-ui, sans-serif", fontSize: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#8A7F78" }}>Total</span>
                        <span style={{ color: "#1A1814" }}>£{booking.selectedService.price}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 500 }}>
                        <span style={{ color: "#1A1814" }}>Deposit (Due Today)</span>
                        <span style={{ color: "#1A1814" }}>£{booking.selectedService.price / 2}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation Buttons ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
        }}>
          <button
            onClick={goPrev}
            disabled={booking.step === 0}
            style={{
              padding: "16px 24px",
              backgroundColor: "transparent",
              border: "1px solid rgba(26,24,20,0.2)",
              color: "#1A1814",
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: booking.step === 0 ? "not-allowed" : "pointer",
              opacity: booking.step === 0 ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back
          </button>

          <button
            onClick={goNext}
            disabled={!canProceed()}
            style={{
              padding: "16px 32px",
              backgroundColor: "#1A1814",
              color: "#F5F4F0",
              border: "none",
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: canProceed() ? "pointer" : "not-allowed",
              opacity: canProceed() ? 1 : 0.5,
              transition: "all 0.3s",
            }}
          >
            {booking.step === steps.length - 1 ? "Confirm Booking" : "Continue"}
            {booking.step < steps.length - 1 && <ArrowRight style={{ width: "14px", height: "14px" }} />}
          </button>
        </div>

      </div>
    </div>
  );
}
