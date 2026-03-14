-- ============================================================
-- Migration 002: Row Level Security Policies
-- Hair Classic Luxury Salon App
-- ============================================================

-- ─── PROFILES ───────────────────────────────────────────────
alter table profiles enable row level security;

create policy "profiles_select_own"
  on profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = id);

-- Admins can read all
create policy "profiles_admin_all"
  on profiles for all
  using (exists (
    select 1 from profiles p2
    where p2.id = auth.uid() and p2.role = 'admin'
  ));

-- ─── SALONS ─────────────────────────────────────────────────
alter table salons enable row level security;

create policy "salons_public_read"
  on salons for select
  using (true);

create policy "salons_owner_all"
  on salons for all
  using (owner_id = auth.uid());

-- ─── STYLISTS ───────────────────────────────────────────────
alter table stylists enable row level security;

create policy "stylists_public_read"
  on stylists for select
  using (is_active = true);

create policy "stylists_own_profile"
  on stylists for all
  using (profile_id = auth.uid());

create policy "stylists_salon_owner"
  on stylists for all
  using (
    salon_id in (
      select id from salons where owner_id = auth.uid()
    )
  );

-- ─── SERVICES ───────────────────────────────────────────────
alter table services enable row level security;

create policy "services_public_read"
  on services for select
  using (is_active = true);

create policy "services_salon_owner_manage"
  on services for all
  using (
    salon_id in (
      select id from salons where owner_id = auth.uid()
    )
  );

-- ─── BOOKINGS ───────────────────────────────────────────────
alter table bookings enable row level security;

create policy "bookings_client_read_own"
  on bookings for select
  using (client_id = auth.uid());

create policy "bookings_client_create"
  on bookings for insert
  with check (client_id = auth.uid());

create policy "bookings_client_cancel"
  on bookings for update
  using (client_id = auth.uid() and status = 'pending');

create policy "bookings_stylist_read"
  on bookings for select
  using (
    stylist_id in (
      select id from stylists where profile_id = auth.uid()
    )
  );

create policy "bookings_stylist_update"
  on bookings for update
  using (
    stylist_id in (
      select id from stylists where profile_id = auth.uid()
    )
  );

create policy "bookings_salon_owner_all"
  on bookings for all
  using (
    salon_id in (
      select id from salons where owner_id = auth.uid()
    )
  );

-- ─── HAIR PASSPORTS ─────────────────────────────────────────
alter table hair_passports enable row level security;

create policy "passport_client_own"
  on hair_passports for all
  using (client_id = auth.uid());

-- Stylists with a confirmed booking can read the passport
create policy "passport_stylist_read"
  on hair_passports for select
  using (
    exists (
      select 1 from bookings b
      join stylists s on b.stylist_id = s.id
      where b.client_id = hair_passports.client_id
        and s.profile_id = auth.uid()
        and b.status in ('confirmed', 'in_progress', 'completed')
    )
  );

-- ─── REVIEWS ────────────────────────────────────────────────
alter table reviews enable row level security;

create policy "reviews_public_read"
  on reviews for select
  using (true);

create policy "reviews_client_create"
  on reviews for insert
  with check (
    client_id = auth.uid()
    and exists (
      select 1 from bookings b
      where b.id = booking_id
        and b.client_id = auth.uid()
        and b.status = 'completed'
    )
  );

create policy "reviews_client_update_own"
  on reviews for update
  using (client_id = auth.uid());

-- ─── CONCIERGE OPTIONS ──────────────────────────────────────
alter table concierge_options enable row level security;

create policy "concierge_public_read"
  on concierge_options for select
  using (is_active = true);

create policy "concierge_salon_manage"
  on concierge_options for all
  using (
    salon_id in (
      select id from salons where owner_id = auth.uid()
    )
  );

-- ─── MEMBERSHIP TIERS ───────────────────────────────────────
alter table membership_tiers enable row level security;

create policy "tiers_public_read"
  on membership_tiers for select
  using (true);

create policy "tiers_admin_manage"
  on membership_tiers for all
  using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ─── WAITLIST ────────────────────────────────────────────────
alter table waitlist enable row level security;

create policy "waitlist_client_own"
  on waitlist for all
  using (client_id = auth.uid());
