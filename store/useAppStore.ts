import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, Booking, Service, Stylist, ConciergeAddon } from "@/lib/supabase/types";

// ─── Booking Wizard State ──────────────────────────────────
interface BookingState {
  selectedStylist: Stylist | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTimeSlot: string | null;
  selectedAddons: ConciergeAddon[];
  bookingNotes: string;
  step: number;
}

// ─── App Store ─────────────────────────────────────────────
interface AppState {
  // Auth
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;

  // Booking wizard
  booking: BookingState;
  setBookingStylist: (stylist: Stylist | null) => void;
  setBookingService: (service: Service | null) => void;
  setBookingDate: (date: Date | null) => void;
  setBookingTimeSlot: (slot: string | null) => void;
  toggleAddon: (addon: ConciergeAddon) => void;
  setBookingNotes: (notes: string) => void;
  setBookingStep: (step: number) => void;
  resetBooking: () => void;

  // UI
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultBookingState: BookingState = {
  selectedStylist:  null,
  selectedService:  null,
  selectedDate:     null,
  selectedTimeSlot: null,
  selectedAddons:   [],
  bookingNotes:     "",
  step:             0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      profile: null,
      setProfile: (profile) => set({ profile }),

      // Booking wizard
      booking: defaultBookingState,
      setBookingStylist:  (stylist) => set((s) => ({ booking: { ...s.booking, selectedStylist: stylist } })),
      setBookingService:  (service) => set((s) => ({ booking: { ...s.booking, selectedService: service } })),
      setBookingDate:     (date)    => set((s) => ({ booking: { ...s.booking, selectedDate: date, selectedTimeSlot: null } })),
      setBookingTimeSlot: (slot)    => set((s) => ({ booking: { ...s.booking, selectedTimeSlot: slot } })),
      setBookingNotes:    (notes)   => set((s) => ({ booking: { ...s.booking, bookingNotes: notes } })),
      setBookingStep:     (step)    => set((s) => ({ booking: { ...s.booking, step } })),
      toggleAddon: (addon) =>
        set((s) => {
          const addons = s.booking.selectedAddons;
          const exists = addons.find((a) => a.id === addon.id);
          return {
            booking: {
              ...s.booking,
              selectedAddons: exists
                ? addons.filter((a) => a.id !== addon.id)
                : [...addons, addon],
            },
          };
        }),
      resetBooking: () => set({ booking: defaultBookingState }),

      // UI
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: "hair-classic-store",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
