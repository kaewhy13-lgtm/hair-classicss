import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch recent bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("*, profiles!client_id(full_name), services(name), stylists(profiles!inner(full_name))")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Today's Appts", value: "12", icon: Calendar },
    { label: "Pending Conf.", value: "4", icon: Clock },
    { label: "Revenue (Today)", value: "£1,240", icon: DollarSign },
    { label: "New Clients", value: "3", icon: Users },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-light text-dark mb-10">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-linen border border-dark/10 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <p className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-taupe">
                  {stat.label}
                </p>
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <p className="font-display text-3xl font-light text-dark">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-linen border border-dark/10 p-8">
        <h2 className="font-display text-2xl font-light text-dark mb-6">Recent Bookings</h2>
        
        {recentBookings && recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm border-collapse">
              <thead>
                <tr className="border-b border-dark/10 text-taupe uppercase text-[10px] tracking-[0.2em]">
                  <th className="py-4 font-medium">Client</th>
                  <th className="py-4 font-medium">Service</th>
                  <th className="py-4 font-medium">Date & Time</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-dark/5 hover:bg-parchment-mid transition-colors">
                    <td className="py-5 font-medium text-dark">{booking.profiles?.full_name || 'N/A'}</td>
                    <td className="py-5 text-taupe">{booking.services?.name || 'N/A'}</td>
                    <td className="py-5 text-dark">
                      {format(new Date(booking.starts_at), "MMM d, yyyy")} <br/>
                      <span className="text-taupe text-xs">{format(new Date(booking.starts_at), "h:mm a")}</span>
                    </td>
                    <td className="py-5">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 text-right font-medium text-dark">£{booking.total_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="font-body text-taupe text-sm">No recent bookings found.</p>
        )}
      </div>
    </div>
  );
}
