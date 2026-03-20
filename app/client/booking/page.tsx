
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

export default function BookingStepOne() {
  const [stylists, setStylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  // Multi-step booking state
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchStylists() {
      const supabase = createClient();
      const { data } = await supabase
        .from('stylists')
        .select('*, profiles!inner(full_name)')
        .eq('is_active', true);
      if (data && data.length > 0) {
        setStylists(data);
      } else {
        // Fallback for visual testing
        setStylists([
          { id: 'stylist-1', salon_id: 'salon-1', role: 'Artistic Director', bio: 'Master stylist with 10+ years experience.', profiles: { full_name: 'Julianne Moore' }, specializations: ['Cut', 'Style'] },
          { id: 'stylist-2', salon_id: 'salon-1', role: 'Master Colorist', bio: 'Balayage and highlights expert.', profiles: { full_name: 'David Beckham' }, specializations: ['Colour', 'Balayage'] }
        ]);
      }
      setLoading(false);
    }
    fetchStylists();
  }, []);

  useEffect(() => {
    async function fetchServices() {
      if (!selectedStylist || step !== 2) return;
      setServicesLoading(true);
      const supabase = createClient();
      
      const stylist = stylists.find(s => s.id === selectedStylist);
      if (!stylist?.salon_id) {
        setServicesLoading(false);
        return;
      }

      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('salon_id', stylist.salon_id)
        .eq('is_active', true);
        
      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices([
          { id: 'service-1', name: 'Precision Haircut', price: 95.00, duration_minutes: 60, description: 'Tailored with artistic precision' },
          { id: 'service-2', name: 'Balayage & Colour', price: 280.00, duration_minutes: 150, description: 'Hand-painted natural gradients' }
        ]);
      }
      setServicesLoading(false);
    }
    fetchServices();
  }, [step, selectedStylist, stylists]);

  const handleConfirm = async () => {
    if (!user || !selectedStylist || !selectedService || !selectedDate || !selectedTime) {
      alert("Please check all selections.");
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    
    const stylist = stylists.find(s => s.id === selectedStylist);
    const service = services.find(s => s.id === selectedService);
    
    if (!stylist?.salon_id || !service) {
      alert("Error resolving details.");
      setSubmitting(false);
      return;
    }

    const startDateTime = `${selectedDate}T${selectedTime}:00Z`;
    const duration = service.duration_minutes || 60;
    const endDateTime = new Date(new Date(startDateTime).getTime() + duration * 60000).toISOString();

    const { error } = await supabase
      .from('bookings')
      .insert({
        client_id: user.id,
        stylist_id: selectedStylist,
        service_id: selectedService,
        salon_id: stylist.salon_id,
        starts_at: startDateTime,
        ends_at: endDateTime,
        status: 'pending',
        total_amount: service.price
      });

    setSubmitting(false);
    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      setStep(4); // Go to Success Step
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-surface">
      <main className="pt-32 pb-48 px-6 max-w-5xl mx-auto min-h-screen flex flex-col items-center">
        {/*  Header Content  */}
        <header className="text-center mb-16 max-w-2xl">
          <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight mb-6">Reserve Your Appointment</h1>
          <p className="label text-taupe tracking-wide leading-relaxed">Experience bespoke hair artistry tailored to your individual style.</p>
        </header>

        {/*  Step Indicator  */}
        <div className="w-full max-w-3xl mb-24 flex items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <div className={`w-3 h-3 ${step >= 1 ? 'bg-gold' : 'border border-outline'}`}></div>
            <span className={`label text-[10px] uppercase tracking-[0.2em] ${step === 1 ? 'font-medium' : 'text-taupe'}`}>STYLIST</span>
          </div>
          <div className={`step-line h-px ${step >= 2 ? 'bg-gold' : 'bg-outline-variant'} flex-1 mx-4`}></div>
          <div className={`flex flex-col items-center gap-3 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-3 h-3 ${step >= 2 ? 'bg-gold' : 'border border-outline'}`}></div>
            <span className={`label text-[10px] uppercase tracking-[0.2em] ${step === 2 ? 'font-medium' : ''}`}>SERVICE</span>
          </div>
          <div className={`step-line h-px ${step >= 3 ? 'bg-gold' : 'bg-outline-variant'} flex-1 mx-4`}></div>
          <div className={`flex flex-col items-center gap-3 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-3 h-3 ${step >= 3 ? 'bg-gold' : 'border border-outline'}`}></div>
            <span className={`label text-[10px] uppercase tracking-[0.2em] ${step === 3 ? 'font-medium' : ''}`}>DATE & TIME</span>
          </div>
          <div className={`step-line h-px ${step >= 4 ? 'bg-gold' : 'bg-outline-variant'} flex-1 mx-4`}></div>
          <div className={`flex flex-col items-center gap-3 ${step >= 4 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-3 h-3 ${step >= 4 ? 'bg-gold' : 'border border-outline'}`}></div>
            <span className={`label text-[10px] uppercase tracking-[0.2em]`}>PAYMENT</span>
          </div>
        </div>

        {/*  Main Content  */}
        <section className="w-full bg-surface-container-low border border-outline-variant p-12 md:p-16 mb-12">
          {step === 1 && (
            <>
              <h2 className="font-display text-3xl font-light mb-12">Choose Your Stylist</h2>
              {loading ? (
                <p className="text-center text-taupe">Loading artists...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {stylists.map((stylist) => (
                    <div 
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist.id)}
                      className={`group relative cursor-pointer border p-8 bg-surface-container-lowest transition-all hover:border-secondary ${
                        selectedStylist === stylist.id ? 'border-secondary ring-1 ring-secondary' : 'border-outline-variant'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 p-4 transition-opacity ${
                        selectedStylist === stylist.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <div className="flex flex-col items-start gap-6">
                        <div className="w-16 h-16 bg-gold text-on-primary flex items-center justify-center text-2xl font-display font-light">
                          {stylist.profiles?.full_name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <h3 className="font-display text-xl mb-1">{stylist.profiles?.full_name || "Stylist"}</h3>
                          <p className="label text-[11px] uppercase tracking-[0.15em] text-secondary mb-4">
                            {stylist.role || "Stylist"}
                          </p>
                          <p className="text-taupe text-sm leading-relaxed mb-6">
                            {stylist.bio || "Bespoke artistry tailored for you."}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {stylist.specializations?.slice(0, 2).map((s: string) => (
                              <span key={s} className="label text-[9px] uppercase tracking-widest border border-outline-variant/30 px-3 py-1">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-3xl font-light mb-12">Select A Service</h2>
              {servicesLoading ? (
                <p className="text-center text-taupe">Loading services...</p>
              ) : services.length === 0 ? (
                <p className="text-center text-taupe">No services available for this salon.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`group relative cursor-pointer border p-8 bg-surface-container-lowest transition-all hover:border-secondary ${
                        selectedService === service.id ? 'border-secondary ring-1 ring-secondary' : 'border-outline-variant'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 p-4 transition-opacity ${
                        selectedService === service.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <div className="flex justify-between w-full items-start">
                          <h3 className="font-display text-xl">{service.name}</h3>
                          <span className="label text-secondary">£{service.price}</span>
                        </div>
                        <p className="text-taupe text-sm leading-relaxed">
                          {service.description || "Bespoke service tailored for you."}
                        </p>
                        <span className="label text-[10px] uppercase tracking-wider text-text-muted">
                          {service.duration_minutes} MIN
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-3xl font-light mb-12">Schedule Your Visit</h2>
              <div className="flex flex-col gap-8 max-w-md">
                <div>
                  <label className="label text-xs uppercase tracking-wider mb-2 block">Select Date</label>
                  <input 
                    type="date" 
                    className="input-luxury"
                    value={selectedDate || ''} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="label text-xs uppercase tracking-wider mb-4 block">Select Time</label>
                  <div className="grid grid-cols-4 gap-3">
                    {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border text-sm font-medium transition-all ${
                          selectedTime === time 
                            ? 'border-secondary bg-surface-container-lowest text-secondary' 
                            : 'border-outline-variant hover:border-secondary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="material-symbols-outlined text-6xl text-secondary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <h2 className="font-display text-4xl font-light mb-4">Booking Confirmed</h2>
              <p className="text-taupe mb-8 max-w-md leading-relaxed">
                Your appointment has been reserved. We look forward to welcoming you to Hair Classic.
              </p>
              <Link href="/client/dashboard" className="btn-primary">
                View Dashboard
              </Link>
            </div>
          )}
        </section>

        {/*  Bottom Action Bar  */}
        {step < 4 && (
          <div className="w-full max-w-3xl flex items-center justify-between border-t border-outline-variant pt-8">
            <button 
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              className={`btn-aura ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              Back
            </button>
            
            <button 
              onClick={() => step === 3 ? handleConfirm() : setStep(prev => prev + 1)}
              disabled={(step === 1 && !selectedStylist) || (step === 2 && !selectedService) || (step === 3 && (!selectedDate || !selectedTime)) || submitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? 'Processing...' : step === 3 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        )}
      </main>
{/*  Bottom Action Bar  */}

{/*  Global Footer  */}
<div className="w-full py-24 px-8 bg-[#fbf9f3] mt-auto">
<div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto gap-8">
<div className="text-lg font-light tracking-widest text-black font-headline">Hair Classic</div>
<div className="flex gap-8">
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Privacy Policy</a>
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Terms of Service</a>
<a className="font-label text-[10px] uppercase tracking-[0.2em] text-[#8A7F78] hover:text-[#75593c] transition-colors" href="/">Accessibility</a>
</div>
<div className="font-label text-[10px] uppercase tracking-[0.2em] text-[#75593c]">© 2024 Hair Classic. All Rights Reserved.</div>
</div>
</div>

    </div>
  );
}
