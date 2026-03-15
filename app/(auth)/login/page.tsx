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
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2 bg-parchment">
      {ToastComponent}

      {/* ── Left panel: full-bleed image ── */}
      <div className="relative overflow-hidden min-h-[40vh] md:min-h-[calc(100vh-64px)]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527799820374-87891c6b5b37?w=1000&auto=format&fit=crop&q=85')" }}
        />
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        
        {/* Quote at bottom */}
        <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
          <p className="font-display text-3xl md:text-4xl font-light italic text-white/95 leading-snug mb-3">
            &ldquo;Great hair is the<br />best accessory.&rdquo;
          </p>
          <p className="font-body text-[10px] font-medium tracking-[0.26em] uppercase text-white/50">
            — Our Philosophy
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
          {!sent ? (
            <>
              {/* Header */}
              <motion.div variants={fadeUp} custom={1} className="mb-10">
                <p className="font-body text-[10px] font-medium tracking-[0.28em] uppercase text-taupe mb-3.5">
                  Welcome back
                </p>
                <h1 className="font-display text-4xl font-light text-dark mb-3">
                  Sign in
                </h1>
                <p className="font-body text-[13px] text-taupe leading-[1.7]">
                  Enter your email and we&apos;ll send you a magic link — no password required.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label htmlFor="email" className="block font-body text-[10px] font-medium tracking-[0.20em] uppercase text-taupe mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className="w-full py-3.5 pr-3.5 pl-10 bg-parchment-mid border border-dark/10 rounded-none font-body text-[13px] text-dark outline-none transition-colors duration-300 focus:border-dark/30 placeholder:text-taupe"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-dark text-parchment border-none font-body text-[10px] font-medium tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 hover:bg-dark-mid disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "SENDING…" : "SEND MAGIC LINK"}
                  {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </motion.form>

              {/* Sign up link */}
              <motion.p variants={fadeUp} custom={3} className="mt-8 text-center font-body text-[12px] text-taupe">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-gold no-underline transition-colors duration-300 hover:text-dark">
                  Create one
                </Link>
              </motion.p>
            </>
          ) : (
            /* Sent state */
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={fadeUp} custom={0} className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-7 bg-linen">
                <Mail className="w-6 h-6 text-gold" />
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl font-light text-dark mb-3">
                Check your inbox
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="font-body text-[14px] text-taupe leading-[1.7]">
                We&apos;ve sent a magic link to{" "}
                <span className="text-dark font-medium">{getValues("email")}</span>
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
