"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Phone, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { useChampagneToast } from "@/components/ui/ChampagneToast";

const signupSchema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  email:     z.string().email("Please enter a valid email address"),
  phone:     z.string().optional(),
});
type SignupForm = z.infer<typeof signupSchema>;

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.1, 1], delay: i * 0.12 }
  }),
};

const inputStyle: React.CSSProperties = {
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
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Jost', system-ui, sans-serif",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.20em",
  textTransform: "uppercase",
  color: "#8A7F78",
  marginBottom: "8px",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "16px",
  height: "16px",
  color: "#8A7F78",
};

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { show, ToastComponent } = useChampagneToast();

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: data.full_name,
          phone:     data.phone ?? null,
        },
      },
    });

    if (error) {
      show(error.message, "error");
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  const fields = [
    { id: "full_name" as const, label: "Full Name",        Icon: User,  type: "text",  placeholder: "Your full name",  error: errors.full_name },
    { id: "email"     as const, label: "Email Address",     Icon: Mail,  type: "email", placeholder: "your@email.com",  error: errors.email     },
    { id: "phone"     as const, label: "Phone (Optional)",  Icon: Phone, type: "tel",   placeholder: "+44 7000 000000", error: errors.phone     },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      backgroundColor: "#ECEAE4",
    }}>
      {ToastComponent}

      {/* ── Left panel: image ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.05) 60%)",
        }} />
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
            &ldquo;Your journey to<br />perfect hair starts here.&rdquo;
          </p>
          <p style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(245,244,240,0.50)",
          }}>
            — Hair Classic London
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
          {/* Brand */}
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "48px" }}>
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
              <motion.div variants={fadeUp} custom={1} style={{ marginBottom: "36px" }}>
                <p style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#8A7F78",
                  marginBottom: "14px",
                }}>
                  Begin your journey
                </p>
                <h1 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "#1A1814",
                  marginBottom: "10px",
                }}>
                  Create Account
                </h1>
                <p style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "13px",
                  color: "#4A4440",
                  lineHeight: 1.7,
                }}>
                  Join Hair Classic and unlock your personal hair journey.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit(onSubmit)}>
                {fields.map(({ id, label, Icon, type, placeholder, error }) => (
                  <div key={id} style={{ marginBottom: "20px" }}>
                    <label htmlFor={id} style={labelStyle}>{label}</label>
                    <div style={{ position: "relative" }}>
                      <Icon style={iconStyle} />
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        {...register(id)}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(26,24,20,0.30)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(26,24,20,0.12)")}
                      />
                    </div>
                    {error && (
                      <p style={{ fontSize: "11px", color: "#c44", marginTop: "6px" }}>{error.message}</p>
                    )}
                  </div>
                ))}

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
                  {loading ? "CREATING…" : "CREATE ACCOUNT"}
                  {!loading && <ArrowRight style={{ width: "14px", height: "14px" }} />}
                </button>
              </motion.form>

              {/* Divider + Sign in link */}
              <div style={{
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(26,24,20,0.08)",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "12px",
                  color: "#8A7F78",
                }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{
                    color: "#A08060",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <motion.div initial="hidden" animate="visible" style={{ textAlign: "center" }}>
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
                Verify your email
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "14px",
                color: "#4A4440",
                lineHeight: 1.7,
              }}>
                We&apos;ve sent a verification link to{" "}
                <span style={{ color: "#1A1814", fontWeight: 500 }}>{getValues("email")}</span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
