import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

// Example basic setup. If DodoPayments SDK provides a constructEvent method,
// it should be used here instead of manual verification.
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("dodo-signature");
  
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // NOTE: Verify signature using process.env.DODOPAYMENTS_WEBHOOK_SECRET
  // Assuming successful verification:
  let event: any;
  try {
    event = JSON.parse(body);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case "payment.succeeded": {
        const bookingId = event.data?.metadata?.booking_id;

        if (bookingId) {
          await supabase
            .from("bookings")
            .update({ status: "confirmed" })
            .eq("id", bookingId);
        }
        break;
      }

      case "payment.failed": {
        const bookingId = event.data?.metadata?.booking_id;
        console.error(`[DodoPay] Payment failed for booking ${bookingId}`);
        break;
      }

      case "subscription.canceled": {
        const customerId = event.data?.customer_id;

        if (customerId) {
          await supabase
            .from("profiles")
            .update({ membership_tier: "none", membership_expires_at: null })
            .eq("stripe_customer_id", customerId); // keeping existing column name for now, representing dodo customer id
        }
        break;
      }

      case "subscription.active":
      case "subscription.renewed": {
        const customerId = event.data?.customer_id;
        const productId = event.data?.product_id;

        // Map product ID to tier
        const tierMap: Record<string, string> = {
          [process.env.DODO_GOLD_MONTHLY_PRODUCT_ID!]:     "gold",
          [process.env.DODO_GOLD_ANNUAL_PRODUCT_ID!]:      "gold",
          [process.env.DODO_PLATINUM_MONTHLY_PRODUCT_ID!]: "platinum",
          [process.env.DODO_PLATINUM_ANNUAL_PRODUCT_ID!]:  "platinum",
          [process.env.DODO_DIAMOND_MONTHLY_PRODUCT_ID!]:  "diamond",
          [process.env.DODO_DIAMOND_ANNUAL_PRODUCT_ID!]:   "diamond",
        };

        const tier = productId ? (tierMap[productId] ?? "none") : "none";
        
        // Example: add 1 month/year based on event (simplified here)
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        if (customerId) {
          await supabase
            .from("profiles")
            .update({ membership_tier: tier, membership_expires_at: expiresAt.toISOString() })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }
  } catch (err) {
    console.error("[DodoPay Webhook] Handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
