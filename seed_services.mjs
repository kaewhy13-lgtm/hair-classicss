import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let envStr = '';
try {
  envStr = fs.readFileSync('.env.local', 'utf8');
} catch (e) {
  try { envStr = fs.readFileSync('.env.template', 'utf8'); } catch(e) {}
}

const env = Object.fromEntries(
  envStr.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('='))
    .filter(parts => parts.length >= 2)
    .map(parts => [parts[0].trim(), parts.slice(1).join('=').trim()])
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const servicesData = [
  // --- CARE+ ---
  { name: 'Hair Spa', price: 500, category: 'Care+', duration_minutes: 45, description: 'Deep nourishing hair spa.' },
  { name: 'Hair Spa - Anti Hair Fall', price: 700, category: 'Care+', duration_minutes: 60, description: 'Targeted care to reduce hair fall.' },
  { name: 'Hair Spa - Anti Dandruff', price: 700, category: 'Care+', duration_minutes: 60, description: 'Soothing scalp treatment for dandruff.' },
  { name: 'Fiber Clinix', price: 1500, category: 'Care+', duration_minutes: 60, description: 'Advanced repair technology for strength.' },
  { name: 'K18 Treatment', price: 2000, category: 'Care+', duration_minutes: 30, description: 'Peptide prep and repair treatment.' },
  { name: 'Olaplex Treatment', price: 3000, category: 'Care+', duration_minutes: 60, description: 'Bond-building luxury repair mask.' },
  { name: 'Olaplex Hair Spa', price: 1000, category: 'Care+', duration_minutes: 60, description: 'Premium Olaplex infused hair spa.' },
  { name: 'Head Massage', price: 400, category: 'Care+', duration_minutes: 30, description: 'Relaxing Indian head massage.' },
  { name: 'Head Massage With Hair Wash', price: 500, category: 'Care+', duration_minutes: 45, description: 'Massage combined with a cleansing wash.' },

  // --- RIKA WAXING ---
  { name: 'Half Leg Waxing', price: 350, category: 'Rika Waxing', duration_minutes: 30 },
  { name: 'Full Leg Waxing', price: 700, category: 'Rika Waxing', duration_minutes: 45 },
  { name: 'Half Arms Waxing', price: 200, category: 'Rika Waxing', duration_minutes: 20 },
  { name: 'Full Arms Waxing', price: 400, category: 'Rika Waxing', duration_minutes: 30 },
  { name: 'Full Body Waxing', price: 2500, category: 'Rika Waxing', duration_minutes: 120 },
  { name: 'Upper Lip Waxing', price: 50, category: 'Rika Waxing', duration_minutes: 10 },
  { name: 'Full Face Waxing', price: 200, category: 'Rika Waxing', duration_minutes: 30 },
  { name: 'Side Locks Waxing', price: 100, category: 'Rika Waxing', duration_minutes: 15 },
  { name: 'Under Arms Waxing', price: 200, category: 'Rika Waxing', duration_minutes: 15 },
  { name: 'Neck Waxing', price: 150, category: 'Rika Waxing', duration_minutes: 15 },
  { name: 'Forehead Waxing', price: 50, category: 'Rika Waxing', duration_minutes: 10 },

  // --- FOR HIM ---
  { name: 'Hair Cut Boy', price: 150, category: 'For Him', duration_minutes: 30 },
  { name: 'Hair Cut Man', price: 200, category: 'For Him', duration_minutes: 45, description: 'Classic and modern styles for men.' },
  { name: 'Beard Trim', price: 100, category: 'For Him', duration_minutes: 30 },
  { name: 'Beard Colour', price: 200, category: 'For Him', duration_minutes: 30 },
  { name: 'Global Color Upto 4 Inch', price: 700, category: 'For Him', duration_minutes: 60 },
  { name: 'Highlights For Him', price: 2000, category: 'For Him', duration_minutes: 120 },
  { name: 'Hair Spa (For Him)', price: 500, category: 'For Him', duration_minutes: 45 },
  { name: 'Hair Spa - Anti Hair Fall (For Him)', price: 700, category: 'For Him', duration_minutes: 60 },
  { name: 'Hair Spa - Anti Dandruff (For Him)', price: 700, category: 'For Him', duration_minutes: 60 },

  // --- BEAUTY (Threading) ---
  { name: 'Eyebrows Threading', price: 50, category: 'Beauty', duration_minutes: 15 },
  { name: 'Lower Lip Threading', price: 20, category: 'Beauty', duration_minutes: 10 },
  { name: 'Chin Threading', price: 50, category: 'Beauty', duration_minutes: 10 },
  { name: 'Neck Threading', price: 50, category: 'Beauty', duration_minutes: 15 },
  { name: 'Forehead Threading', price: 20, category: 'Beauty', duration_minutes: 10 },
  { name: 'Full Face Threading', price: 200, category: 'Beauty', duration_minutes: 30 },
  { name: 'Side Lock Threading', price: 50, category: 'Beauty', duration_minutes: 15 }
];

async function seed() {
  console.log('Fetching first available salon...');
  const { data: salons, error: salonErr } = await supabase.from('salons').select('id').limit(1);

  if (salonErr) {
    console.error('Failed to fetch salons:', salonErr);
    return;
  }
  
  if (!salons || salons.length === 0) {
    console.warn('No salon found in database. Cannot associate new services.');
    return;
  }
  
  const salonId = salons[0].id;
  console.log(`Using Salon ID: ${salonId}`);

  console.log('Archiving old services...');
  await supabase.from('services').update({ is_active: false }).eq('salon_id', salonId);
  
  const insertData = servicesData.map(s => ({
    ...s,
    salon_id: salonId,
    is_active: true
  }));

  console.log('Inserting', insertData.length, 'new services...');
  const { error: insertErr } = await supabase.from('services').insert(insertData);
  
  if (insertErr) {
    console.error('Failed to insert services:', insertErr);
  } else {
    console.log('Successfully added all services!');
  }
}

seed();
