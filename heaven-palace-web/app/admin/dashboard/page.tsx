'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Users, CreditCard, CalendarCheck, Clock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    totalBookings: 0,
    pendingCount: 0,
    guestsCount: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Fetch Bookings with joins
      const { data: bookings } = await supabase
        .from('bookings')
        .select(`*, profiles (full_name), rooms (name)`)
        .order('created_at', { ascending: false });

      if (bookings) {
        // Calculate Revenue (Only Confirmed)
        const totalRevenue = bookings
            .filter((b: any) => b.status === 'Confirmed')
            .reduce((sum: number, b: any) => sum + (b.total_price || 0), 0);

        // Count Pending
        const pending = bookings.filter((b: any) => b.status === 'Pending').length;

        // Estimate guests (or sum actual guests if present)
        const guests = bookings.reduce((acc: number, b: any) => acc + (b.guests || 2), 0);

        setStats({
            revenue: totalRevenue,
            totalBookings: bookings.length,
            pendingCount: pending,
            guestsCount: guests
        });

        // Recent 5 bookings
        setRecentBookings(bookings.slice(0, 5));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto" /> Loading Dashboard...</div>;

  return (
    <div className="font-sans text-brand-dark">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of Heaven Palace performance.</p>
        </div>
        <div className="bg-white border px-4 py-2 rounded text-sm font-bold shadow-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* KPI CARDS (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-brand-blue"><CreditCard size={24} /></div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-1">LKR {stats.revenue.toLocaleString()}</h3>
        </div>

        {/* Pending Requests (Action Item) */}
        <div className={`p-6 rounded-xl shadow-sm border border-gray-100 ${stats.pendingCount > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${stats.pendingCount > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    <Clock size={24} />
                </div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Pending Approvals</p>
            <h3 className="text-2xl font-bold mt-1">{stats.pendingCount}</h3>
            {stats.pendingCount > 0 && <span className="text-xs text-yellow-700 font-bold">Action Required</span>}
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-600"><CalendarCheck size={24} /></div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Total Reservations</p>
            <h3 className="text-2xl font-bold mt-1">{stats.totalBookings}</h3>
        </div>

        {/* Guests Estimate */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Users size={24} /></div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Total Guests</p>
            <h3 className="text-2xl font-bold mt-1">~{stats.guestsCount}</h3>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg">Recent Reservations</h3>
              <Link href="/admin/bookings" className="text-xs text-brand-blue font-bold hover:underline flex items-center gap-1">
                  View All <ArrowRight size={12} />
              </Link>
          </div>
          
          {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No bookings yet.</div>
          ) : (
              <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase">
                      <tr>
                          <th className="p-4">Guest Name</th>
                          <th className="p-4">Room</th>
                          <th className="p-4">Total</th>
                          <th className="p-4 text-right">Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {recentBookings.map((booking) => (
                          <tr key={booking.id}>
                              <td className="p-4 font-bold text-brand-dark">
                                  {booking.profiles?.full_name || 'Unknown'}
                              </td>
                              <td className="p-4 text-gray-500">{booking.rooms?.name}</td>
                              <td className="p-4 font-mono">LKR {booking.total_price?.toLocaleString?.() || '0'}</td>
                              <td className="p-4 text-right">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                  }`}>
                                      {booking.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
    </div>
  );
}
