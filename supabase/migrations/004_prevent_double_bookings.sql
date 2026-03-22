-- ============================================================
-- Migration 004: Prevent Double Bookings
-- Replaces application-level checks with a robust database trigger
-- to prevent race conditions when two clients book the same slot
-- ============================================================

CREATE OR REPLACE FUNCTION check_booking_overlap()
RETURNS TRIGGER AS $$
DECLARE
  v_buffer_minutes integer;
  v_conflict_count integer;
BEGIN
  -- We don't care about cancelled/no_show
  IF NEW.status IN ('cancelled', 'no_show') THEN
    RETURN NEW;
  END IF;

  -- Get stylist buffer
  SELECT buffer_minutes INTO v_buffer_minutes FROM stylists WHERE id = NEW.stylist_id;
  IF v_buffer_minutes IS NULL THEN
    v_buffer_minutes := 15;
  END IF;

  -- Use an explicit transaction-level advisory lock to serialize inserts/updates for the same stylist.
  -- hashtext produces a 32-bit integer, perfect for pg_advisory_xact_lock.
  PERFORM pg_advisory_xact_lock(hashtext(NEW.stylist_id::text));

  -- Check overlaps
  SELECT COUNT(*)
  INTO v_conflict_count
  FROM bookings
  WHERE stylist_id = NEW.stylist_id
    AND id != NEW.id -- exclude self when updating
    AND status NOT IN ('cancelled', 'no_show')
    -- new start must be BEFORE existing end + buffer
    AND NEW.starts_at < (ends_at + (v_buffer_minutes || ' minutes')::interval)
    -- new end must be AFTER existing start - buffer
    AND NEW.ends_at > (starts_at - (v_buffer_minutes || ' minutes')::interval);

  IF v_conflict_count > 0 THEN
    RAISE EXCEPTION 'Double booking detected for stylist % at %', NEW.stylist_id, NEW.starts_at;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists (for idempotency during dev)
DROP TRIGGER IF EXISTS trg_check_booking_overlap ON bookings;

CREATE TRIGGER trg_check_booking_overlap
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION check_booking_overlap();
