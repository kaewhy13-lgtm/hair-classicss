-- ============================================================
-- Migration 004: Admin Booking RLS
-- Hair Classic Luxury Salon App
-- ============================================================

-- Allow global admins to manage all bookings
create policy "bookings_admin_all"
  on bookings for all
  using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );
