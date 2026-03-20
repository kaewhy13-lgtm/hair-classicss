import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import DodoPayments from "dodopayments";
import { z } from "zod";

export const dynamic = "force-dynamic";

const dodopayments = new DodoPayments({
  bearerToken: process.env.DODOPAYMENTS_API_KEY || "test_token",
});

const schema = z.object({
  booking_id: z.string().uuid(),
  amount:     z.number().positive(),
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

    // Get client name for metadata
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    // Create DodoPayments checkout session
    const session = await dodopayments.payments.create({
      billing: {
        country: "GB",
      },
      customer: {
        email: user.email!,
        name: profile?.full_name || "Guest",
      },
      product_cart: [
        {
          product_id: process.env.DODO_DEPOSIT_PRODUCT_ID || "prod_dummy", // Assuming a generic deposit product
          amount: Math.round(amount * 100), // Ensure it's in cents/pence equivalent
          quantity: 1,
        }
      ],
      metadata: { booking_id, user_id: user.id },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`, // redirect after checkout
      payment_link: true,
    });

    // Save payment intent ID (or session ID) to booking
    await supabase
      .from("bookings")
      .update({ stripe_payment_intent_id: session.payment_id }) // repurposing the stripe column temporarily to store dodo session ID
      .eq("id", booking_id);

    return NextResponse.json({ checkoutUrl: session.payment_link });
  } catch (err) {
    console.error("[POST /api/checkout]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
