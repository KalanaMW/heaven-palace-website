"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Calendar, CheckCircle, XCircle, Clock, Loader2, Filter } from 'lucide-react';

export default function AdminBookings() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchBookings = async () => {
    setLoading(true);
        // Fetch ALL bookings first (Supabase Policy allows Admin to see all)
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                profiles (full_name, email, phone),
                rooms (name)
            `)
            .order('created_at', { ascending: false });

        if (error) {
                console.error("Error fetching bookings:", error.message || error);
        }
        if (data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  // Handle Status Update
  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI Update
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));

    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    
    if (error) {
        alert("Update failed");
        fetchBookings(); // Revert
    } else {
        // TRIGGER EMAIL HERE IF NEEDED (e.g. Booking Confirmed Email)
        // We can reuse the /api/send logic here if you want "Booking Confirmed" email.
    }
  };

  // Client-Side Filtering
  const displayedBookings = statusFilter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status.toLowerCase() === statusFilter.toLowerCase());

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto"/> Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Reservations</h1>
          
          {/* STATUS FILTER */}
          <div className="flex bg-white p-1 rounded-lg border">
              {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition ${
                        statusFilter === status 
                        ? 'bg-brand-blue text-white shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                      {status}
                  </button>
              ))}
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-xs border-b">
                <tr>
                    <th className="p-4">Booking Ref</th>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Room Details</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {displayedBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-mono text-xs text-gray-400">
                            {String(booking.id).slice(0, 8).toUpperCase()}
                        </td>
                        <td className="p-4">
                            <p className="font-bold text-brand-dark">{booking.profiles?.full_name || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">{booking.profiles?.email}</p>
                        </td>
                        <td className="p-4">
                            <p className="font-medium">{booking.rooms?.name}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Calendar size={12}/> 
                                {booking.check_in} <span className="mx-1">→</span> {booking.check_out}
                            </div>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-brand-blue">
                            {booking.total_price?.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {booking.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                            {booking.status === 'Pending' && (
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => updateStatus(booking.id, 'Confirmed')} className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Confirm">
                                        <CheckCircle size={16} />
                                    </button>
                                    <button onClick={() => updateStatus(booking.id, 'Cancelled')} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Cancel">
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {displayedBookings.length === 0 && (
            <div className="p-12 text-center text-gray-400">
                No bookings found.
            </div>
        )}
      </div>
    </div>
  );
}
