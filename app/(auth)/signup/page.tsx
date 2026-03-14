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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-parchment">
      {ToastComponent}

      {/* ── Left panel: image ── */}
      <div className="relative overflow-hidden min-h-[40vh] md:min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=85')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
          <p className="font-display text-3xl md:text-4xl font-light italic text-white/95 leading-snug mb-3">
            &ldquo;Your journey to<br />perfect hair starts here.&rdquo;
          </p>
          <p className="font-body text-[10px] font-medium tracking-[0.26em] uppercase text-white/50">
            — Hair Classic London
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 bg-parchment">
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full max-w-[380px]"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <Link href="/" className="font-display text-base font-normal tracking-[0.22em] uppercase text-dark no-underline">
              Hair Classic
            </Link>
          </motion.div>

          {!sent ? (
            <>
              {/* Header */}
              <motion.div variants={fadeUp} custom={1} className="mb-9">
                <p className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-taupe mb-3.5">
                  Begin your journey
                </p>
                <h1 className="font-display text-4xl font-light text-dark mb-2.5">
                  Create Account
                </h1>
                <p className="font-body text-[13px] text-taupe leading-[1.7]">
                  Join Hair Classic and unlock your personal hair journey.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit(onSubmit)}>
                {fields.map(({ id, label, Icon, type, placeholder, error }) => (
                  <div key={id} className="mb-5">
                    <label htmlFor={id} className="block font-body text-[10px] font-medium tracking-[0.20em] uppercase text-taupe mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        {...register(id)}
                        className="w-full py-3.5 pr-3.5 pl-10 bg-parchment-mid border border-dark/10 rounded-none font-body text-[13px] text-dark outline-none transition-colors duration-300 focus:border-dark/30 placeholder:text-taupe"
                      />
                    </div>
                    {error && (
                      <p className="text-[11px] text-red-500 mt-1.5">{error.message}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 mt-2 bg-dark text-parchment border-none font-body text-[10px] font-medium tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 hover:bg-dark-mid disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "CREATING…" : "CREATE ACCOUNT"}
                  {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </motion.form>

              {/* Divider + Sign in link */}
              <div className="mt-8 pt-6 border-t border-dark/10 text-center">
                <p className="font-body text-[12px] text-taupe">
                  Already have an account?{" "}
                  <Link href="/login" className="text-gold no-underline transition-colors duration-300 hover:text-dark">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <motion.div initial="hidden" animate="visible" className="text-center">
              <motion.div variants={fadeUp} custom={0} className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-7 bg-linen">
                <Mail className="w-6 h-6 text-gold" />
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-light text-dark mb-3">
                Verify your email
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="font-body text-[14px] text-taupe leading-[1.7]">
                We&apos;ve sent a verification link to{" "}
                <span className="text-dark font-medium">{getValues("email")}</span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
