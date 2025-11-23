'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/client';

export default function Offers() {
  const supabase = createClient();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Data
  useEffect(() => {
    const getOffers = async () => {
        const { data } = await supabase
            .from('offers')
            .select('*')
            .order('id', { ascending: true }); // Order by ID to keep the specific sequence
        
        if(data) setOffers(data);
        setLoading(false);
    };
    getOffers();
  }, []);

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />
      
      {/* --- HERO SECTION (Static High Quality) --- */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="/images/home/hero-bg.jpg" 
          alt="Offers Hero" 
          fill 
          className="object-cover brightness-50"
          priority // Ensures hero loads fast and clear
        />
        <div className="relative z-10 text-center text-white px-6">
            <span className="uppercase tracking-[0.3em] text-sm mb-4 block">Exclusive Deals</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Special Offers</h1>
            <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* --- INTRO TEXT --- */}
      <section className="py-20 text-center container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-serif text-brand-dark mb-6">Curated Experiences For You</h2>
          <p className="text-gray-600 font-light leading-relaxed">
              Whether you are looking for a romantic getaway, a wellness retreat, or a productive workation, 
              Heaven Palace offers exclusive packages designed to enhance your stay in Kandy.
          </p>
      </section>

      {/* --- DYNAMIC OFFERS GRID --- */}
      <section className="pb-24 container mx-auto px-6">
          {loading ? (
            <div className="text-center py-24">
                <Loader2 className="animate-spin mx-auto text-brand-gold" size={40} />
                <p className="text-gray-400 text-xs mt-4 uppercase tracking-widest">Loading Offers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-24"> {/* Increased gap for premium spacing */}
                {offers.map((offer, index) => (
                    // ALTERNATING LAYOUT LOGIC: index % 2 === 1 flips the row
                    <div key={offer.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        
                        {/* IMAGE SIDE */}
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] group overflow-hidden shadow-2xl">
                            <Image 
                              src={offer.image || '/images/home/offer-1.jpg'} 
                              alt={offer.title} 
                              fill 
                              className="object-cover transition duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw" // Optimization for clarity
                            />
                            <div className="absolute top-8 left-8 bg-brand-gold text-white px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">
                                {offer.price_label}
                            </div>
                        </div>

                        {/* CONTENT SIDE */}
                        <div className="w-full lg:w-1/2">
                            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-3 block">{offer.subtitle}</span>
                            <h3 className="text-4xl font-serif text-brand-dark mb-6 leading-tight">{offer.title}</h3>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-100 pb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-brand-gold" /> 
                                    <span>Valid: {offer.valid_until || 'Limited Time'}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">
                                {offer.description}
                            </p>

                            {/* Inclusions List */}
                            {offer.inclusions && (
                                <div className="bg-gray-50 p-8 mb-8 border border-gray-100">
                                    <h4 className="text-xs font-bold text-brand-dark mb-6 uppercase tracking-widest">Package Inclusions:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {offer.inclusions.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                                <CheckCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <Link 
                                href="/booking" 
                                className="inline-block bg-brand-dark hover:bg-brand-blue text-white text-xs font-bold py-4 px-10 uppercase tracking-widest transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Book This Offer
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
          )}
      </section>

      <Footer />
    </main>
  );
}
