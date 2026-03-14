import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter, isBefore, addMinutes } from "date-fns";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format currency as GBP/USD */
export function formatCurrency(amount: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Format a booking date/time elegantly */
export function formatBookingDate(isoString: string): string {
  return format(new Date(isoString), "EEEE, d MMMM yyyy");
}

export function formatBookingTime(isoString: string): string {
  return format(new Date(isoString), "h:mm a");
}

/** Time ago string */
export function timeAgo(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
}

/** Generate time slots between start and end with interval */
export function generateTimeSlots(
  date: Date,
  openTime: string,
  closeTime: string,
  intervalMinutes: number
): string[] {
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  const start = new Date(date);
  start.setHours(openH, openM, 0, 0);

  const end = new Date(date);
  end.setHours(closeH, closeM, 0, 0);

  const slots: string[] = [];
  let current = start;

  while (isBefore(current, end)) {
    slots.push(format(current, "HH:mm"));
    current = addMinutes(current, intervalMinutes);
  }

  return slots;
}

/** Check if a time slot is in the past */
export function isSlotInPast(date: Date, slot: string): boolean {
  const [h, m] = slot.split(":").map(Number);
  const slotDate = new Date(date);
  slotDate.setHours(h, m, 0, 0);
  return isBefore(slotDate, new Date());
}

/** Get initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Membership tier display config */
export const membershipConfig = {
  none: { label: "Standard", color: "#6B6B6B", emoji: "" },
  gold: { label: "Gold Member", color: "#C9A84C", emoji: "✦" },
  platinum: { label: "Platinum Member", color: "#B5C8D0", emoji: "✦✦" },
  diamond: { label: "Diamond Member", color: "#A8C4D4", emoji: "✦✦✦" },
} as const;
