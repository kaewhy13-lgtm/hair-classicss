import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-09-30.acacia" });

export async function POST(request: Request) {
  const body        = await request.text();
  const headersList = await headers();
  const sig         = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[Stripe Webhook] Invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const bookingId = intent.metadata.booking_id;

        if (bookingId) {
          await supabase
            .from("bookings")
            .update({ status: "confirmed" })
            .eq("id", bookingId);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const bookingId = intent.metadata.booking_id;
        console.error(`[Stripe] Payment failed for booking ${bookingId}:`, intent.last_payment_error?.message);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;

        await supabase
          .from("profiles")
          .update({ membership_tier: "none", membership_expires_at: null })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const priceId = sub.items.data[0]?.price.id;

        // Map price ID to tier
        const tierMap: Record<string, string> = {
          [process.env.STRIPE_GOLD_MONTHLY_PRICE_ID!]:     "gold",
          [process.env.STRIPE_GOLD_ANNUAL_PRICE_ID!]:      "gold",
          [process.env.STRIPE_PLATINUM_MONTHLY_PRICE_ID!]: "platinum",
          [process.env.STRIPE_PLATINUM_ANNUAL_PRICE_ID!]:  "platinum",
          [process.env.STRIPE_DIAMOND_MONTHLY_PRICE_ID!]:  "diamond",
          [process.env.STRIPE_DIAMOND_ANNUAL_PRICE_ID!]:   "diamond",
        };

        const tier = priceId ? (tierMap[priceId] ?? "none") : "none";
        const expiresAt = new Date((sub.current_period_end) * 1000).toISOString();

        await supabase
          .from("profiles")
          .update({ membership_tier: tier, membership_expires_at: expiresAt })
          .eq("stripe_customer_id", customerId);
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    console.error("[Stripe Webhook] Handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
