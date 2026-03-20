import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const createBookingSchema = z.object({
  stylist_id:       z.string().uuid(),
  service_id:       z.string().uuid(),
  salon_id:         z.string().uuid(),
  starts_at:        z.string().datetime(),
  notes:            z.string().optional(),
  concierge_addons: z.array(z.object({
    id:       z.string(),
    name:     z.string(),
    category: z.enum(["beverage", "transport", "music", "other"]),
    price:    z.number(),
  })).default([]),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    const parsed = createBookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
    }

    const { stylist_id, service_id, salon_id, starts_at, notes, concierge_addons } = parsed.data;

    // Fetch service for duration + price
    const { data: service, error: serviceError } = await supabase
      .from("services")
      .select("duration_minutes, price")
      .eq("id", service_id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Fetch stylist buffer time
    const { data: stylist } = await supabase
      .from("stylists")
      .select("buffer_minutes")
      .eq("id", stylist_id)
      .single();

    const startDate = new Date(starts_at);

    // Prevent past bookings
    if (startDate <= new Date()) {
      return NextResponse.json({ error: "Cannot book in the past" }, { status: 400 });
    }

    const endsAt = new Date(startDate.getTime() + service.duration_minutes * 60000);

    // Check for conflicts (including buffer time)
    const bufferMs = (stylist?.buffer_minutes ?? 15) * 60000;
    const conflictStart = new Date(startDate.getTime() - bufferMs).toISOString();
    const conflictEnd   = new Date(endsAt.getTime() + bufferMs).toISOString();

    const { data: conflicts } = await supabase
      .from("bookings")
      .select("id")
      .eq("stylist_id", stylist_id)
      .not("status", "in", '("cancelled","no_show")')
      .lt("starts_at", conflictEnd)
      .gt("ends_at", conflictStart);

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json({ error: "Time slot is no longer available" }, { status: 409 });
    }

    const addonTotal = concierge_addons.reduce((sum, a) => sum + a.price, 0);
    const totalAmount = service.price + addonTotal;
    const depositAmount = totalAmount * 0.5;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        client_id:              user.id,
        stylist_id,
        service_id,
        salon_id,
        starts_at,
        ends_at:                endsAt.toISOString(),
        total_amount:           totalAmount,
        deposit_amount:         depositAmount,
        notes,
        concierge_addons,
        status:                 "pending",
      })
      .select()
      .single();

    if (bookingError) {
      return NextResponse.json({ error: bookingError.message }, { status: 500 });
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("bookings")
      .select("*, service:services(name, price, duration_minutes), stylist:stylists(*, profile:profiles(full_name))")
      .eq("client_id", user.id)
      .order("starts_at", { ascending: true });

    if (status) {
      query = query.eq("status", status);
    }

    const { data: bookings, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("[GET /api/bookings]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
