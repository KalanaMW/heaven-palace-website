"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { createClient } from '@/utils/supabase/client'; 
import { Award, Calendar, LogOut, User, Camera, Edit2, Save, MapPin, Star, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]); // State for real bookings
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/'); 
        return;
      }

      // 1. Get Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      // 2. Get Bookings (Joined with Rooms to get image/name)
      const { data: bookingData, error } = await supabase
        .from('bookings')
        .select(`
            *,
            rooms (
                name,
                images
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookingData) setBookings(bookingData);
      
      setLoading(false);
    };
    getData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  // Calculate Loyalty Progress (Mock logic based on point balance)
  const currentPoints = profile?.points || 0;
  const nextTierPoints = 15000;
  const progress = Math.min((currentPoints / nextTierPoints) * 100, 100);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-gold" size={40}/></div>;

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[450px] w-full">
        <Image src="/images/home/hero-bg.jpg" alt="Profile Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-gray-50/90"></div>

        <div className="absolute inset-0 container mx-auto px-6 pt-32 flex flex-col items-center md:items-start">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-brand-gold/20 backdrop-blur-sm shadow-2xl flex items-center justify-center text-5xl font-serif text-white font-bold">
                        {profile?.full_name?.charAt(0)}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-brand-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition shadow-lg">
                        <Camera size={16} />
                    </label>
                </div>

                <div className="text-center md:text-left text-white">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="bg-brand-gold/20 border border-brand-gold/50 text-brand-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                            {profile?.tier || 'Member'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{profile?.full_name}</h1>
                    <p className="text-white/70 text-sm flex items-center justify-center md:justify-start gap-2">
                        <MapPin size={14} /> Sri Lanka
                    </p>
                </div>

                <div className="ml-auto mt-6 md:mt-0">
                    <button onClick={handleSignOut} className="bg-red-500/10 hover:bg-red-500 text-white border border-red-500/50 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition backdrop-blur-sm">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-6 pb-24 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: LOYALTY */}
            <div className="space-y-8">
                <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h3 className="font-serif text-lg mb-1">Relax & Reward</h3>
                        <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Membership Status</p>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-brand-gold">{currentPoints.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 mb-1">pts</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-gold to-yellow-200 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            You are <strong>{(nextTierPoints - currentPoints).toLocaleString()} points</strong> away from Platinum Tier.
                        </p>
                        <button className="w-full py-3 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition flex justify-center items-center gap-2">
                            <Award size={16} /> View Rewards Catalog
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: DETAILS & BOOKINGS */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Personal Information */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-brand-dark">Personal Information</h3>
                        <button onClick={() => setIsEditing(!isEditing)} className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            {isEditing ? <><Save size={14}/> Save</> : <><Edit2 size={14}/> Edit Details</>}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                            <p className="text-brand-dark font-medium p-2">{profile?.full_name}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                            <p className="text-gray-500 font-medium p-2">{profile?.email}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                            <p className="text-brand-dark font-medium p-2">{profile?.phone || 'Not Provided'}</p>
                        </div>
                    </div>
                </div>

                {/* My Stays (REAL DATA) */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="font-serif text-xl text-brand-dark mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-brand-gold"/> My Stays
                    </h3>

                    {bookings.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p className="mb-4">No bookings yet.</p>
                            <button onClick={() => router.push('/accommodation')} className="px-6 py-3 bg-brand-blue text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                Find a Room
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    {/* Room Image */}
                                    <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                        <Image 
                                            src={booking.rooms?.images?.[0] || '/images/home/room-1.jpg'} 
                                            alt="Room" 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-brand-dark text-lg">{booking.rooms?.name || 'Unknown Room'}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">ID: {String(booking.id).slice(0, 8)}...</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 
                                                    booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                                <p className="text-brand-blue font-bold mt-2 text-sm">LKR {booking.total_price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
