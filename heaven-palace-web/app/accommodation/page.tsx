'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Coffee, Wind, Maximize, Users, Check, Star, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Added
import AuthModal from '@/components/AuthModal'; // Added
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/client';

export default function Accommodation() {
  const supabase = createClient();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false); // To open modal

  // Fetch Real Data
  useEffect(() => {
    const getRooms = async () => {
      const { data } = await supabase.from('rooms').select('*').order('id');
      if (data) setRooms(data as any[]);
            const { data: authData } = await supabase.auth.getUser();
            setUser(authData.user || null);
            setLoading(false);
    };
    getRooms();
  }, [supabase]);

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="/images/home/room-1.jpg" 
          alt="Accommodation Hero" 
          fill 
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
            <span className="uppercase tracking-[0.3em] text-sm mb-4 block animate-fade-in">Stay with us</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Accommodation</h1>
            <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* INTRO TEXT & AMENITIES GRID (Keep existing code here...) */}
      <section className="py-20 text-center container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-serif text-brand-dark mb-6">Your Home in the Hills</h2>
          <p className="text-gray-600 font-light leading-relaxed">
              Each of our rooms is designed to blend modern luxury with the natural beauty of Kandy. 
              We guarantee <strong>generator-backed power</strong> (crucial in Sri Lanka), 
              high-pressure hot water, and the fastest fiber internet in the area.
          </p>
          
          {/* GENERAL AMENITIES GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-b border-gray-100 py-8">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Wifi size={24} className="text-brand-blue" />
                  <span className="text-xs uppercase tracking-widest">Fiber WiFi</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Wind size={24} className="text-brand-blue" />
                  <span className="text-xs uppercase tracking-widest">Air Conditioned</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Coffee size={24} className="text-brand-blue" />
                  <span className="text-xs uppercase tracking-widest">Tea/Coffee</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Users size={24} className="text-brand-blue" />
                  <span className="text-xs uppercase tracking-widest">24/7 Service</span>
              </div>
          </div>
      </section>

      {/* ROOMS LIST (Dynamic) */}
      <section className="pb-24 container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-blue" size={40} /></div>
          ) : (
            <div className="flex flex-col gap-20">
                {rooms.map((room, index) => (
                    <div key={room.id} className={`flex flex-col lg:flex-row gap-0 shadow-2xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        
                        {/* IMAGE SIDE */}
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto group overflow-hidden">
                            <Image 
                              src={room.images ? room.images[0] : '/images/home/room-1.jpg'} 
                              alt={room.name} 
                              fill 
                              className="object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                <span className="bg-green-600/90 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                    Instant Confirmation
                                </span>
                            </div>
                        </div>

                        {/* CONTENT SIDE */}
                        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center relative">
                            <h3 className="text-2xl md:text-3xl font-serif text-brand-dark mb-2">{room.name}</h3>
                            <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-wider mb-4">
                                <span className="flex items-center gap-1"><Maximize size={12}/> {room.size}</span>
                                <span className="flex items-center gap-1"><Users size={12}/> {room.occupancy}</span>
                            </div>

                            <div className="mb-6">
                                <span className="text-2xl font-bold text-brand-blue block">LKR {room.price.toLocaleString()}</span>
                                <span className="text-xs text-gray-400">per night / including taxes</span>
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                                {room.description}
                            </p>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                                {room.amenities && room.amenities.slice(0, 4).map((amenity: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
                                        {amenity}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <button 
                                    onClick={() => {
                                        if (!user) {
                                            setIsAuthOpen(true);
                                        } else {
                                            router.push(`/booking?room=${room.id}`);
                                        }
                                    }}
                                    className="flex-1 bg-brand-dark hover:bg-brand-blue text-white text-center text-xs font-bold py-4 uppercase tracking-widest transition duration-300"
                                >
                                    Book Now
                                </button>
                                <Link href={`/accommodation/${room.id}`} className="flex-1 border border-brand-dark hover:bg-gray-50 text-brand-dark text-center text-xs font-bold py-4 uppercase tracking-widest transition duration-300">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          )}
      </section>

      <Footer />
      {/* Auth Modal for non-logged in users */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
