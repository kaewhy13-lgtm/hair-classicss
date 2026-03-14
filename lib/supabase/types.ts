// Supabase Database Types — generated from schema
// Run `npx supabase gen types typescript --local > lib/supabase/types.ts` to regenerate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type MembershipTier = "none" | "gold" | "platinum" | "diamond";
export type UserRole = "client" | "stylist" | "salon_owner" | "admin";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";
export type ConciergeCategory = "beverage" | "transport" | "music" | "other";

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  membership_tier: MembershipTier;
  membership_expires_at: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Salon {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  cover_url: string | null;
  description: string | null;
  timezone: string;
  created_at: string;
}

export interface Stylist {
  id: string;
  profile_id: string;
  salon_id: string;
  bio: string | null;
  specializations: string[];
  certifications: string[];
  years_experience: number | null;
  portfolio_images: string[];
  hourly_rate: number | null;
  buffer_minutes: number;
  is_active: boolean;
  created_at: string;
  profile?: Profile;
}

export interface Service {
  id: string;
  salon_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  category: string | null;
  image_url: string | null;
  requires_consultation: boolean;
  is_active: boolean;
}

export interface Booking {
  id: string;
  client_id: string;
  stylist_id: string;
  service_id: string;
  salon_id: string;
  starts_at: string;
  ends_at: string;
  status: BookingStatus;
  notes: string | null;
  total_amount: number | null;
  deposit_amount: number | null;
  stripe_payment_intent_id: string | null;
  concierge_addons: ConciergeAddon[];
  created_at: string;
  updated_at: string;
  stylist?: Stylist;
  service?: Service;
  client?: Profile;
}

export interface HairPassport {
  id: string;
  client_id: string;
  hair_type: string | null;
  hair_texture: string | null;
  current_color: string | null;
  color_formula: Record<string, string> | null;
  allergies: string[];
  sensitivities: string[];
  treatment_history: TreatmentRecord[];
  style_preferences: string[];
  lifestyle_notes: string | null;
  photos: PassportPhoto[];
  updated_at: string;
}

export interface TreatmentRecord {
  date: string;
  service: string;
  stylist: string;
  formula?: string;
  notes?: string;
}

export interface PassportPhoto {
  url: string;
  date: string;
  caption?: string;
}

export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  stylist_id: string;
  rating: number;
  comment: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  created_at: string;
  client?: Profile;
}

export interface ConciergeAddon {
  id: string;
  name: string;
  category: ConciergeCategory;
  price: number;
}

export interface MembershipTierConfig {
  id: string;
  name: MembershipTier;
  monthly_price: number;
  annual_price: number;
  perks: string[];
  priority_booking: boolean;
  exclusive_stylists: boolean;
  stripe_price_id_monthly: string;
  stripe_price_id_annual: string;
}
