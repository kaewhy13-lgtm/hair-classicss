"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useChampagneToast } from "@/components/ui/ChampagneToast";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { show, ToastComponent } = useChampagneToast();
  const supabase = createClient();

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*, profiles!client_id(full_name), services(name), stylists(profiles!inner(full_name))")
      .order("starts_at", { ascending: true });
    
    if (error) {
      show("Failed to load bookings", "error");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (error) {
      show(`Failed to update status: ${error.message}`, "error");
    } else {
      show(`Booking marked as ${newStatus}`, "success");
      fetchBookings(); // Refresh data
    }
  }

  return (
    <div>
      {ToastComponent}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-taupe mb-2">Management</p>
          <h1 className="font-display text-4xl font-light text-dark">All Bookings</h1>
        </div>
        <button onClick={fetchBookings} className="text-[11px] uppercase tracking-widest font-body text-taupe border border-linen px-4 py-2 hover:bg-linen transition-colors">
          Refresh
        </button>
      </div>

      <div className="bg-linen border border-dark/10 p-8">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm border-collapse">
              <thead>
                <tr className="border-b border-dark/10 text-taupe uppercase text-[10px] tracking-[0.2em]">
                  <th className="py-4 font-medium px-4">Date & Time</th>
                  <th className="py-4 font-medium px-4">Client</th>
                  <th className="py-4 font-medium px-4">Service</th>
                  <th className="py-4 font-medium px-4">Stylist</th>
                  <th className="py-4 font-medium px-4">Status</th>
                  <th className="py-4 font-medium px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-dark/5 hover:bg-parchment-mid transition-colors">
                    <td className="py-5 px-4 text-dark whitespace-nowrap">
                      {format(new Date(booking.starts_at), "MMM d, yyyy")} <br/>
                      <span className="text-taupe text-xs">{format(new Date(booking.starts_at), "h:mm a")}</span>
                    </td>
                    <td className="py-5 px-4 font-medium text-dark">{booking.profiles?.full_name || 'N/A'}</td>
                    <td className="py-5 px-4 text-taupe">{booking.services?.name || 'N/A'}</td>
                    <td className="py-5 px-4 text-taupe">{booking.stylists?.profiles?.full_name || 'N/A'}</td>
                    <td className="py-5 px-4">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      {booking.status === 'pending' && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => updateStatus(booking.id, 'confirmed')} title="Confirm" className="text-green-600 hover:text-green-800">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => updateStatus(booking.id, 'cancelled')} title="Cancel" className="text-red-600 hover:text-red-800">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                      {booking.status === 'confirmed' && (
                        <button onClick={() => updateStatus(booking.id, 'completed')} className="text-xs uppercase tracking-wider text-taupe hover:text-dark border-b border-taupe px-1 pb-1">
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-body text-taupe text-sm text-center py-12">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
