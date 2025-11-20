'use client';

import { Mail, Phone, Award, MoreHorizontal } from 'lucide-react';

const GUESTS = [
    { id: 1, name: 'Dr. Perera', email: 'dr.perera@gmail.com', tier: 'Platinum', visits: 12, spend: 'LKR 850k', tags: ['Vegan', 'Spa Lover', 'Late Check-out'] },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@uk.co', tier: 'Gold', visits: 5, spend: 'LKR 420k', tags: ['Yoga', 'High Floor'] },
    { id: 3, name: 'Mike Ross', email: 'mike.r@usa.net', tier: 'Silver', visits: 2, spend: 'LKR 95k', tags: ['Digital Nomad', 'Strong WiFi'] },
    { id: 4, name: 'Amani T.', email: 'amani@colombo.lk', tier: 'Member', visits: 1, spend: 'LKR 25k', tags: [] },
];

export default function GuestsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Guest Database</h1>
            <p className="text-sm text-gray-500">Manage "Relax & Reward" Loyalty Program members.</p>
        </div>
        <div className="flex gap-2">
            <div className="px-4 py-2 bg-white border rounded text-center">
                <p className="text-xs text-gray-400 uppercase">Platinum</p>
                <p className="font-bold text-brand-blue">12</p>
            </div>
            <div className="px-4 py-2 bg-white border rounded text-center">
                <p className="text-xs text-gray-400 uppercase">Gold</p>
                <p className="font-bold text-brand-gold">45</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUESTS.map((guest) => (
            <div key={guest.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition">
                <div className="absolute top-4 right-4 text-gray-300 cursor-pointer hover:text-brand-dark">
                    <MoreHorizontal />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center font-serif text-xl">
                        {guest.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-brand-dark">{guest.name}</h3>
                        <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1 font-bold uppercase tracking-wider ${
                            guest.tier === 'Platinum' ? 'bg-gray-800 text-white' : 
                            guest.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-600'
                        }`}>
                            <Award size={12} /> {guest.tier}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-gray-50 py-4">
                    <div className="text-center border-r border-gray-50">
                        <p className="text-xs text-gray-400 uppercase">Visits</p>
                        <p className="font-bold text-xl">{guest.visits}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase">Total Spend</p>
                        <p className="font-bold text-xl text-brand-blue">{guest.spend}</p>
                    </div>
                </div>

                {/* Preferences Tags (The Intelligent Part) */}
                <div className="mb-6">
                    <p className="text-xs text-gray-400 mb-2">Preferences & Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {guest.tags.length > 0 ? guest.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                                {tag}
                            </span>
                        )) : <span className="text-[10px] text-gray-400 italic">No preferences logged</span>}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                        <Mail size={14} /> Email
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                        <Phone size={14} /> Call
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
