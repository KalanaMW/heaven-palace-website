'use client';

import { Search, Filter, Download } from 'lucide-react';

const BOOKINGS = [
    { id: 'HP-8821', guest: 'Kamal Gunawardena', room: 'Deluxe Double', checkIn: 'Nov 21', checkOut: 'Nov 23', status: 'Confirmed', source: 'Website (Direct)', amount: 'LKR 45,000' },
    { id: 'HP-8820', guest: 'Sarah Jenkins', room: 'Villa Suite', checkIn: 'Nov 20', checkOut: 'Nov 25', status: 'Checked In', source: 'Booking.com', amount: 'LKR 120,000' },
    { id: 'HP-8819', guest: 'Rajiv Malhotra', room: 'Standard Queen', checkIn: 'Nov 22', checkOut: 'Nov 24', status: 'Pending', source: 'Agoda', amount: 'LKR 28,000' },
    { id: 'HP-8818', guest: 'Emma Watson', room: 'Deluxe Double', checkIn: 'Dec 01', checkOut: 'Dec 05', status: 'Confirmed', source: 'Website (Direct)', amount: 'LKR 90,000' },
];

export default function BookingsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-brand-dark">Reservations</h1>
        <button className="bg-brand-dark text-white px-4 py-2 rounded text-sm font-bold hover:bg-black">
            + New Reservation
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search by Guest Name or ID..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-brand-blue text-sm"
            />
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                <Filter size={16} /> Status
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                <Download size={16} /> Export
            </button>
        </div>
      </div>

      {/* Intelligent Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-xs">
                <tr>
                    <th className="p-6">Booking ID</th>
                    <th className="p-6">Guest Details</th>
                    <th className="p-6">Dates</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Source</th>
                    <th className="p-6 text-right">Amount</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {BOOKINGS.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition">
                        <td className="p-6 font-mono text-gray-500">{b.id}</td>
                        <td className="p-6 font-bold text-brand-dark">{b.guest}<br/><span className="text-xs font-normal text-gray-400">{b.room}</span></td>
                        <td className="p-6 text-gray-600">{b.checkIn} - {b.checkOut}</td>
                        <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                b.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                b.status === 'Checked In' ? 'bg-green-100 text-green-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {b.status}
                            </span>
                        </td>
                        <td className="p-6">
                            {b.source.includes('Direct') ? (
                                <span className="text-brand-gold font-bold flex items-center gap-1">★ Direct</span>
                            ) : (
                                <span className="text-gray-400">{b.source}</span>
                            )}
                        </td>
                        <td className="p-6 text-right font-bold text-brand-dark">{b.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
