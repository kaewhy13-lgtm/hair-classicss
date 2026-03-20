import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateTimeSlots, isSlotInPast } from "@/lib/utils";
import { format, addMinutes } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const stylistId = searchParams.get("stylist_id");
    const dateStr   = searchParams.get("date");
    const serviceId = searchParams.get("service_id");

    if (!stylistId || !dateStr || !serviceId) {
      return NextResponse.json({ error: "stylist_id, date, and service_id are required" }, { status: 400 });
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    // Fetch stylist buffer and service duration
    const [{ data: stylist }, { data: service }] = await Promise.all([
      supabase.from("stylists").select("buffer_minutes").eq("id", stylistId).single(),
      supabase.from("services").select("duration_minutes").eq("id", serviceId).single(),
    ]);

    if (!stylist || !service) {
      return NextResponse.json({ error: "Stylist or service not found" }, { status: 404 });
    }

    // Get all booked slots for this stylist on this date
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const { data: existingBookings } = await supabase
      .from("bookings")
      .select("starts_at, ends_at")
      .eq("stylist_id", stylistId)
      .not("status", "in", '("cancelled","no_show")')
      .gte("starts_at", dayStart.toISOString())
      .lte("ends_at", dayEnd.toISOString());

    // Generate all potential slots (9am–6pm, every 30 min)
    const allSlots = generateTimeSlots(date, "09:00", "18:00", 30);
    const bufferMin = stylist.buffer_minutes ?? 15;
    const serviceDuration = service.duration_minutes;

    const availableSlots = allSlots.filter((slot) => {
      // Skip past slots
      if (isSlotInPast(date, slot)) return false;

      // Parse this slot
      const [h, m] = slot.split(":").map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(h, m, 0, 0);
      const slotEnd = addMinutes(slotStart, serviceDuration);

      // Check against existing bookings with buffer
      for (const booking of existingBookings ?? []) {
        const bStart = new Date(booking.starts_at);
        const bEnd   = new Date(booking.ends_at);
        const bufferStart = addMinutes(bStart, -bufferMin);
        const bufferEnd   = addMinutes(bEnd, bufferMin);

        // Overlap check
        if (slotStart < bufferEnd && slotEnd > bufferStart) {
          return false;
        }
      }

      return true;
    });

    return NextResponse.json({ availableSlots, date: dateStr });
  } catch (err) {
    console.error("[GET /api/availability]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
