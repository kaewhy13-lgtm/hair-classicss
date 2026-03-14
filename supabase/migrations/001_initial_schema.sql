-- ============================================================
-- Migration 001: Initial Schema
-- Hair Classic Luxury Salon App
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── PROFILES ───────────────────────────────────────────────
create table if not exists profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  full_name             text not null,
  phone                 text,
  avatar_url            text,
  role                  text not null default 'client'
                          check (role in ('client', 'stylist', 'salon_owner', 'admin')),
  membership_tier       text not null default 'none'
                          check (membership_tier in ('none', 'gold', 'platinum', 'diamond')),
  membership_expires_at timestamptz,
  stripe_customer_id    text unique,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at before update on profiles
  for each row execute function update_updated_at();

-- ─── SALONS ─────────────────────────────────────────────────
create table if not exists salons (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid references profiles(id) on delete set null,
  name        text not null,
  slug        text unique not null,
  address     text,
  phone       text,
  email       text,
  logo_url    text,
  cover_url   text,
  description text,
  timezone    text not null default 'Europe/London',
  created_at  timestamptz not null default now()
);

-- ─── STYLISTS ───────────────────────────────────────────────
create table if not exists stylists (
  id                 uuid primary key default gen_random_uuid(),
  profile_id         uuid unique references profiles(id) on delete cascade,
  salon_id           uuid references salons(id) on delete cascade,
  bio                text,
  specializations    text[] not null default '{}',
  certifications     text[] not null default '{}',
  years_experience   integer check (years_experience >= 0),
  portfolio_images   text[] not null default '{}',
  hourly_rate        numeric(10,2) check (hourly_rate >= 0),
  buffer_minutes     integer not null default 15 check (buffer_minutes >= 0),
  is_active          boolean not null default true,
  created_at         timestamptz not null default now()
);

-- ─── SERVICES ───────────────────────────────────────────────
create table if not exists services (
  id                    uuid primary key default gen_random_uuid(),
  salon_id              uuid references salons(id) on delete cascade,
  name                  text not null,
  description           text,
  duration_minutes      integer not null check (duration_minutes > 0),
  price                 numeric(10,2) not null check (price >= 0),
  category              text,
  image_url             text,
  requires_consultation boolean not null default false,
  is_active             boolean not null default true
);

-- ─── BOOKINGS ───────────────────────────────────────────────
create table if not exists bookings (
  id                        uuid primary key default gen_random_uuid(),
  client_id                 uuid not null references profiles(id) on delete cascade,
  stylist_id                uuid not null references stylists(id),
  service_id                uuid not null references services(id),
  salon_id                  uuid not null references salons(id),
  starts_at                 timestamptz not null,
  ends_at                   timestamptz not null,
  status                    text not null default 'pending'
                              check (status in ('pending','confirmed','in_progress','completed','cancelled','no_show')),
  notes                     text,
  total_amount              numeric(10,2) check (total_amount >= 0),
  deposit_amount            numeric(10,2) check (deposit_amount >= 0),
  stripe_payment_intent_id  text,
  concierge_addons          jsonb not null default '[]',
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),

  constraint valid_booking_times check (ends_at > starts_at)
);

create trigger bookings_updated_at before update on bookings
  for each row execute function update_updated_at();

-- ─── HAIR PASSPORTS ─────────────────────────────────────────
create table if not exists hair_passports (
  id                uuid primary key default gen_random_uuid(),
  client_id         uuid unique not null references profiles(id) on delete cascade,
  hair_type         text,
  hair_texture      text,
  current_color     text,
  color_formula     jsonb,
  allergies         text[] not null default '{}',
  sensitivities     text[] not null default '{}',
  treatment_history jsonb not null default '[]',
  style_preferences text[] not null default '{}',
  lifestyle_notes   text,
  photos            jsonb not null default '[]',
  updated_at        timestamptz not null default now()
);

-- ─── REVIEWS ────────────────────────────────────────────────
create table if not exists reviews (
  id               uuid primary key default gen_random_uuid(),
  booking_id       uuid unique not null references bookings(id) on delete cascade,
  client_id        uuid not null references profiles(id),
  stylist_id       uuid not null references stylists(id),
  rating           integer not null check (rating between 1 and 5),
  comment          text,
  before_photo_url text,
  after_photo_url  text,
  created_at       timestamptz not null default now()
);

-- ─── CONCIERGE OPTIONS ──────────────────────────────────────
create table if not exists concierge_options (
  id          uuid primary key default gen_random_uuid(),
  salon_id    uuid not null references salons(id) on delete cascade,
  name        text not null,
  description text,
  price       numeric(10,2) not null default 0 check (price >= 0),
  category    text check (category in ('beverage', 'transport', 'music', 'other')),
  is_active   boolean not null default true
);

-- ─── MEMBERSHIP TIERS ───────────────────────────────────────
create table if not exists membership_tiers (
  id                        uuid primary key default gen_random_uuid(),
  name                      text unique not null check (name in ('gold', 'platinum', 'diamond')),
  monthly_price             numeric(10,2) not null,
  annual_price              numeric(10,2) not null,
  perks                     jsonb not null default '[]',
  priority_booking          boolean not null default false,
  exclusive_stylists        boolean not null default false,
  stripe_price_id_monthly   text,
  stripe_price_id_annual    text
);

-- ─── WAITLIST ────────────────────────────────────────────────
create table if not exists waitlist (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid not null references profiles(id) on delete cascade,
  stylist_id          uuid not null references stylists(id),
  service_id          uuid not null references services(id),
  preferred_date      date,
  preferred_time_start time,
  preferred_time_end   time,
  notified_at         timestamptz,
  created_at          timestamptz not null default now()
);
