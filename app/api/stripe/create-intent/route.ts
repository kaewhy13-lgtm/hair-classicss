import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-09-30.acacia" });

const schema = z.object({
  booking_id: z.string().uuid(),
  amount:     z.number().positive().max(100000),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: unknown = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
    }

    const { booking_id, amount } = parsed.data;

    // Verify booking belongs to this client
    const { data: booking } = await supabase
      .from("bookings")
      .select("id, total_amount, status, client_id")
      .eq("id", booking_id)
      .single();

    if (!booking || booking.client_id !== user.id) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "cancelled") {
      return NextResponse.json({ error: "Cannot pay for a cancelled booking" }, { status: 400 });
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, full_name")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name:  profile?.full_name ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount * 100), // pence
      currency: "gbp",
      customer: customerId,
      metadata: { booking_id, user_id: user.id },
      automatic_payment_methods: { enabled: true },
    });

    // Save payment intent ID to booking
    await supabase
      .from("bookings")
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq("id", booking_id);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[POST /api/stripe/create-intent]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
