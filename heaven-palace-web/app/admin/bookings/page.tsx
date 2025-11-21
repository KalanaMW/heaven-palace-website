"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Calendar, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

export default function AdminBookings() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Fetch Bookings with Relations (Join tables)
  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        profiles:user_id (full_name, email, phone),
        rooms:room_id (name)
      `)
      .order('created_at', { ascending: false });

    if (data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  // Update Status
  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      fetchBookings(); // Refresh list
    } else {
        alert("Error updating booking");
    }
  };

  const filteredBookings = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto"/> Loading Reservations...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Reservations</h1>
          <div className="flex gap-2">
              {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === status ? 'bg-brand-blue text-white' : 'bg-white border text-gray-500'}`}
                  >
                      {status}
                  </button>
              ))}
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-brand-dark text-white font-bold uppercase tracking-wider text-xs">
                <tr>
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Guest Details</th>
                    <th className="p-4">Room & Dates</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-xs text-gray-500">#{String(booking.id).slice(0,6)}</td>
                        <td className="p-4">
                            <p className="font-bold text-brand-dark">{booking.profiles?.full_name || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">{booking.profiles?.email}</p>
                            <p className="text-xs text-brand-blue">{booking.profiles?.phone}</p>
                        </td>
                        <td className="p-4">
                            <p className="font-bold text-brand-dark">{booking.rooms?.name}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Calendar size={12}/> 
                                {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                            </div>
                        </td>
                        <td className="p-4 font-mono font-bold text-brand-blue">
                            LKR {booking.total_price.toLocaleString()}
                        </td>
                        <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center w-fit gap-1 ${
                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {booking.status === 'Pending' && <Clock size={10} />}
                                {booking.status === 'Confirmed' && <CheckCircle size={10} />}
                                {booking.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                            {booking.status === 'Pending' && (
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => updateStatus(booking.id, 'Confirmed')}
                                        className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded" 
                                        title="Confirm Booking"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(booking.id, 'Cancelled')}
                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded" 
                                        title="Cancel Booking"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            )}
                            {booking.status === 'Confirmed' && (
                                <button className="text-xs font-bold text-brand-blue hover:underline">Send Invoice</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredBookings.length === 0 && (
            <div className="p-8 text-center text-gray-400">No bookings found in this category.</div>
        )}
      </div>
    </div>
  );
}
