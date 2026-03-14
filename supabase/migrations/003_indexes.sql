-- ============================================================
-- Migration 003: Performance Indexes
-- Hair Classic Luxury Salon App
-- ============================================================

-- Bookings — most common lookups
create index if not exists idx_bookings_client_id     on bookings(client_id);
create index if not exists idx_bookings_stylist_id    on bookings(stylist_id);
create index if not exists idx_bookings_salon_id      on bookings(salon_id);
create index if not exists idx_bookings_starts_at     on bookings(starts_at);
create index if not exists idx_bookings_status        on bookings(status);
-- Composite: find stylist availability quickly
create index if not exists idx_bookings_stylist_time  on bookings(stylist_id, starts_at, ends_at);

-- Profiles
create index if not exists idx_profiles_role           on profiles(role);
create index if not exists idx_profiles_stripe_cust    on profiles(stripe_customer_id);
create index if not exists idx_profiles_membership     on profiles(membership_tier);

-- Stylists
create index if not exists idx_stylists_salon_id       on stylists(salon_id);
create index if not exists idx_stylists_profile_id     on stylists(profile_id);
create index if not exists idx_stylists_is_active      on stylists(is_active);

-- Services
create index if not exists idx_services_salon_id       on services(salon_id);
create index if not exists idx_services_is_active      on services(is_active);

-- Reviews
create index if not exists idx_reviews_stylist_id      on reviews(stylist_id);
create index if not exists idx_reviews_client_id       on reviews(client_id);

-- Hair passports
create index if not exists idx_hair_passports_client   on hair_passports(client_id);

-- Waitlist
create index if not exists idx_waitlist_client         on waitlist(client_id);
create index if not exists idx_waitlist_stylist        on waitlist(stylist_id);
