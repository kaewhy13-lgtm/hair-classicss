"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient }   from "@/lib/supabase/client";
import { useChampagneToast } from "@/components/ui/ChampagneToast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type Form = z.infer<typeof schema>;

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

export default function LoginPage() {
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const { show, ToastComponent } = useChampagneToast();

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) show(error.message, "error");
    else        setSent(true);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      backgroundColor: "#ECEAE4",
    }}>
      {ToastComponent}

      {/* ── Left panel: full-bleed image ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1527799820374-87891c6b5b37?w=1000&auto=format&fit=crop&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        {/* Dark gradient overlay at bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.05) 60%)",
        }} />
        {/* Quote at bottom */}
        <div style={{
          position: "absolute",
          bottom: "48px",
          left: "48px",
          right: "48px",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "36px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#F5F4F0",
            lineHeight: 1.3,
            marginBottom: "12px",
          }}>
            &ldquo;Great hair is the<br />best accessory.&rdquo;
          </p>
          <p style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.50)",
          }}>
            — Our Philosophy
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 48px",
        backgroundColor: "#ECEAE4",
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ width: "100%", maxWidth: "380px" }}
        >
          {/* Brand wordmark */}
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "56px" }}>
            <Link href="/" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1A1814",
              textDecoration: "none",
            }}>
              Hair Classic
            </Link>
          </motion.div>

          {!sent ? (
            <>
              {/* Header */}
              <motion.div variants={fadeUp} custom={1} style={{ marginBottom: "40px" }}>
                <p style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#8A7F78",
                  marginBottom: "14px",
                }}>
                  Welcome back
                </p>
                <h1 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "40px",
                  fontWeight: 300,
                  color: "#1A1814",
                  marginBottom: "12px",
                }}>
                  Sign in
                </h1>
                <p style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#4A4440",
                  lineHeight: 1.7,
                }}>
                  Enter your email and we&apos;ll send you a magic link — no password required.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "20px" }}>
                  <label htmlFor="email" style={{
                    display: "block",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "#8A7F78",
                    marginBottom: "8px",
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "#8A7F78",
                    }} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      style={{
                        width: "100%",
                        padding: "14px 14px 14px 42px",
                        backgroundColor: "#F5F4F0",
                        border: "1px solid rgba(26,24,20,0.12)",
                        borderRadius: "0",
                        fontFamily: "'Jost', system-ui, sans-serif",
                        fontSize: "13px",
                        color: "#1A1814",
                        outline: "none",
                        transition: "border-color 0.3s",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(26,24,20,0.30)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(26,24,20,0.12)")}
                    />
                  </div>
                  {errors.email && (
                    <p style={{ fontSize: "11px", color: "#c44", marginTop: "6px" }}>{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "15px 24px",
                    backgroundColor: "#1A1814",
                    color: "#F5F4F0",
                    border: "none",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                    transition: "opacity 0.3s, background 0.3s",
                  }}
                >
                  {loading ? "SENDING…" : "SEND MAGIC LINK"}
                  {!loading && <ArrowRight style={{ width: "14px", height: "14px" }} />}
                </button>
              </motion.form>

              {/* Sign up link */}
              <motion.p variants={fadeUp} custom={3} style={{
                marginTop: "32px",
                textAlign: "center",
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "12px",
                color: "#8A7F78",
              }}>
                Don&apos;t have an account?{" "}
                <Link href="/signup" style={{
                  color: "#A08060",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}>
                  Create one
                </Link>
              </motion.p>
            </>
          ) : (
            /* Sent state */
            <motion.div
              initial="hidden"
              animate="visible"
              style={{ textAlign: "center" }}
            >
              <motion.div variants={fadeUp} custom={0} style={{
                width: "64px",
                height: "64px",
                border: "1px solid rgba(160,128,96,0.30)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                backgroundColor: "#E5E2DB",
              }}>
                <Mail style={{ width: "24px", height: "24px", color: "#A08060" }} />
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "32px",
                fontWeight: 300,
                color: "#1A1814",
                marginBottom: "12px",
              }}>
                Check your inbox
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "14px",
                color: "#4A4440",
                lineHeight: 1.7,
              }}>
                We&apos;ve sent a magic link to{" "}
                <span style={{ color: "#1A1814", fontWeight: 500 }}>{getValues("email")}</span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
