"use client";

import Image from 'next/image';
import { Award, Calendar, LogOut, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  // Mock User Data
  const user = {
    name: "Mr. Aravinda Perera",
    tier: "Gold Member",
    points: 12500,
    nextTier: 15000,
    bookings: [
        { id: "HP-8821", date: "Nov 21, 2025", room: "Deluxe Queen", status: "Upcoming" },
        { id: "HP-7743", date: "Aug 14, 2025", room: "Standard Double", status: "Completed" }
    ]
  };

  const progress = (user.points / user.nextTier) * 100;

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-6">
        
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-serif text-brand-dark">My Account</h1>
              <button className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 flex items-center gap-2">
                  <LogOut size={14} /> Sign Out
              </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT: Loyalty Card */}
              <div className="bg-brand-dark text-white rounded-xl p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-2xl font-serif font-bold">
                          {user.name.charAt(0)}
                      </div>
                      <div>
                          <p className="text-sm opacity-70 uppercase tracking-widest">Welcome back</p>
                          <h2 className="text-xl font-bold">{user.name}</h2>
                      </div>
                  </div>

                  <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                          <span className="text-brand-gold font-bold uppercase text-sm flex items-center gap-2">
                              <Award size={16} /> {user.tier}
                          </span>
                          <span className="text-xs opacity-70">{user.points} / {user.nextTier} pts</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-gold h-full" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-[10px] mt-2 opacity-60">
                          You are {user.nextTier - user.points} points away from Platinum status (Free Spa Access).
                      </p>
                  </div>

                  <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded text-xs font-bold uppercase tracking-widest transition">
                      View Rewards Catalog
                  </button>
              </div>

              {/* CENTER: Personal Info */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-serif font-bold text-lg mb-6 flex items-center gap-2">
                      <User size={18} className="text-brand-blue" /> Personal Details
                  </h3>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                          <p className="font-medium text-gray-700">aravinda.p@example.com</p>
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Phone</label>
                          <p className="font-medium text-gray-700">+94 77 123 4567</p>
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Preferences</label>
                          <div className="flex gap-2 mt-1">
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] uppercase font-bold">Vegan</span>
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] uppercase font-bold">Quiet Room</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* RIGHT: Booking History */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-serif font-bold text-lg mb-6 flex items-center gap-2">
                      <Calendar size={18} className="text-brand-blue" /> My Stays
                  </h3>
                  <div className="space-y-4">
                      {user.bookings.map(booking => (
                          <div key={booking.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0">
                              <div>
                                  <p className="font-bold text-sm text-brand-dark">{booking.room}</p>
                                  <p className="text-xs text-gray-400">{booking.date}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                  booking.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                              }`}>
                                  {booking.status}
                              </span>
                          </div>
                      ))}
                  </div>
                  <button className="w-full mt-4 border border-brand-blue text-brand-blue py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition">
                      New Booking
                  </button>
              </div>

          </div>
      </div>
      <Footer />
    </main>
  );
}
