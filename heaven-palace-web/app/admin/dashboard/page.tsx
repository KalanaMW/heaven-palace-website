'use client';

import { Users, CreditCard, CalendarCheck, TrendingUp, ArrowUpRight, ArrowDownRight, Bell } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="font-sans text-brand-dark">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Manager. Here is today's overview.</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border p-2 rounded-full shadow-sm hover:bg-gray-50 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold">
                Nov 21, 2025
            </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-brand-blue"><CreditCard size={24} /></div>
                <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">+12.5% <ArrowUpRight size={12} /></span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Total Revenue (Nov)</p>
            <h3 className="text-2xl font-bold mt-1">LKR 4.2M</h3>
        </div>

        {/* Occupancy Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Users size={24} /></div>
                <span className="flex items-center text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded">-2.4% <ArrowDownRight size={12} /></span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Occupancy Rate</p>
            <h3 className="text-2xl font-bold mt-1">78%</h3>
        </div>

        {/* Direct Booking Card (Project Goal) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-brand-gold">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-yellow-50 rounded-lg text-brand-gold"><TrendingUp size={24} /></div>
                <span className="text-xs text-gray-400">Target: 40%</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Direct Bookings</p>
            <h3 className="text-2xl font-bold mt-1">32%</h3>
            <p className="text-[10px] text-gray-400 mt-2">Growth due to new Website</p>
        </div>

        {/* Arrivals Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-lg text-green-600"><CalendarCheck size={24} /></div>
                <span className="text-xs text-brand-blue font-bold">5 Pending</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Arrivals Today</p>
            <h3 className="text-2xl font-bold mt-1">12 Guests</h3>
        </div>
      </div>

      {/* SPLIT SECTION: Recent Activity & Today's Check-ins */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Today's Check-ins */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg">Today's Check-ins</h3>
                <button className="text-xs text-brand-blue font-bold hover:underline">View All Bookings</button>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Room</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr>
                        <td className="p-4 font-bold text-brand-dark">Mr. Aravinda Perera</td>
                        <td className="p-4 text-gray-500">Deluxe Queen (204)</td>
                        <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Arriving Soon</span></td>
                        <td className="p-4 text-right"><button className="bg-brand-blue text-white px-3 py-1 rounded text-xs">Check In</button></td>
                    </tr>
                    <tr>
                        <td className="p-4 font-bold text-brand-dark">Sarah Jenkins</td>
                        <td className="p-4 text-gray-500">Villa Suite (101)</td>
                        <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Checked In</span></td>
                        <td className="p-4 text-right"><button className="text-gray-400 hover:text-brand-dark text-xs">Details</button></td>
                    </tr>
                    <tr>
                        <td className="p-4 font-bold text-brand-dark">Liu Wei</td>
                        <td className="p-4 text-gray-500">Standard Double (205)</td>
                        <td className="p-4"><span className="bg-red-50 text-red-500 px-2 py-1 rounded text-xs font-bold">Payment Pending</span></td>
                        <td className="p-4 text-right"><button className="text-brand-blue hover:underline text-xs">Process</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Marketing Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-serif font-bold text-lg mb-6">System Activity</h3>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                    <div>
                        <p className="text-sm font-bold text-brand-dark">New Direct Booking</p>
                        <p className="text-xs text-gray-500">Booking #8821 via Website. Total: LKR 45,000</p>
                        <p className="text-[10px] text-gray-400 mt-1">2 mins ago</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-brand-gold shrink-0"></div>
                    <div>
                        <p className="text-sm font-bold text-brand-dark">Loyalty Tier Upgrade</p>
                        <p className="text-xs text-gray-500">Guest John Doe reached <strong>Gold Tier</strong>.</p>
                        <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
                    <div>
                        <p className="text-sm font-bold text-brand-dark">Positive Review (5★)</p>
                        <p className="text-xs text-gray-500">"Amazing spa experience!" on Google.</p>
                        <p className="text-[10px] text-gray-400 mt-1">5 hours ago</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
