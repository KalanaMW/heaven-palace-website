'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Wifi, Coffee, Wind, Maximize, Users, Check, Star, ArrowRight, Bath, Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- ROOM DATA WITH "SRI LANKAN CONTEXT" ---
const ROOMS = [
  {
    id: 1,
    name: "Standard Double Room",
    price: "LKR 15,000",
    priceNote: "per night / including taxes",
    size: "28 m²",
    occupancy: "2 Adults",
    view: "Garden View",
    description: "A cozy sanctuary perfect for couples or solo travelers. Featuring traditional Sri Lankan teak furniture and a private balcony overlooking our spice garden.",
    image: "/images/accommodation/room-standard.jpg",
    amenities: ["Free High-Speed WiFi", "Air Conditioning", "Hot Water Shower", "Tea/Coffee Maker"],
    badges: ["Breakfast Included", "Free Cancellation"]
  },
  {
    id: 2,
    name: "Deluxe Queen with Mountain View",
    price: "LKR 18,500",
    priceNote: "per night / including taxes",
    size: "35 m²",
    occupancy: "2 Adults, 1 Child",
    view: "Hanthana Mountain View",
    description: "Wake up to the mist rolling over the Hanthana mountain range. This spacious room offers a seating area, a work desk for digital nomads, and a luxury rain shower.",
    image: "/images/accommodation/room-deluxe.jpg",
    amenities: ["Mountain View Balcony", "Work Desk", "Mini Fridge", "King Size Bed", "Smart TV"],
    badges: ["Breakfast Included", "No Pre-payment Needed"]
  },
  {
    id: 3,
    name: "Deluxe Double with Bath",
    price: "LKR 24,000",
    priceNote: "per night / including taxes",
    size: "45 m²",
    occupancy: "2 Adults",
    view: "Panoramic City View",
    description: "Our signature romantic room. Features a freestanding bathtub next to a large window, perfect for relaxing after a visit to the Temple of the Tooth.",
    image: "/images/accommodation/room-bath.jpg",
    amenities: ["Private Bathtub", "Bathrobes & Slippers", "Premium Toiletries", "Soundproofing"],
    badges: ["Breakfast & Dinner Included", "Welcome Drink"]
  },
  {
    id: 4,
    name: "Family Suite (Triple)",
    price: "LKR 28,000",
    priceNote: "per night / including taxes",
    size: "55 m²",
    occupancy: "3 Adults or 2 Adults + 2 Kids",
    view: "Garden & Pool View",
    description: "Space for the whole family. Includes a separate living area and easy access to the garden, making it safe and convenient for children.",
    image: "/images/accommodation/room-family.jpg",
    amenities: ["2 Queen Beds", "Living Area", "Ground Floor Access", "Microwave"],
    badges: ["Kids Stay Free (under 5)", "Breakfast Included"]
  }
];

export default function Accommodation() {
  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="/images/home/room-1.jpg" // Reusing home image or add new hero
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

      {/* INTRO TEXT */}
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

      {/* ROOMS LIST */}
      <section className="pb-24 container mx-auto px-6">
          <div className="flex flex-col gap-20">
              {ROOMS.map((room, index) => (
                  <div key={room.id} className={`flex flex-col lg:flex-row gap-0 shadow-2xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      
                      {/* IMAGE SIDE */}
                      <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto group overflow-hidden">
                          <Image 
                            src={room.image} 
                            alt={room.name} 
                            fill 
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          {/* BADGES OVERLAY */}
                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                              {room.badges.map(badge => (
                                  <span key={badge} className="bg-green-600/90 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                      <Check size={10} /> {badge}
                                  </span>
                              ))}
                          </div>
                      </div>

                      {/* CONTENT SIDE */}
                      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center relative">
                          
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <h3 className="text-2xl md:text-3xl font-serif text-brand-dark mb-2">{room.name}</h3>
                                  <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-wider">
                                      <span className="flex items-center gap-1"><Maximize size={12}/> {room.size}</span>
                                      <span className="flex items-center gap-1"><Users size={12}/> {room.occupancy}</span>
                                  </div>
                              </div>
                          </div>

                          {/* Price Block */}
                          <div className="mb-6">
                              <span className="text-2xl font-bold text-brand-blue block">{room.price}</span>
                              <span className="text-xs text-gray-400">{room.priceNote}</span>
                          </div>

                          <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                              {room.description}
                          </p>

                          {/* Amenities List */}
                          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                              {room.amenities.map((amenity, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                      <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
                                      {amenity}
                                  </div>
                              ))}
                          </div>

                          {/* CTA Buttons */}
                          <div className="flex gap-4 mt-auto">
                              <Link href={`/booking?room=${room.id}`} className="flex-1 bg-brand-dark hover:bg-brand-blue text-white text-center text-xs font-bold py-4 uppercase tracking-widest transition duration-300">
                                  Book Now
                              </Link>
                              <Link href={`/accommodation/${room.id}`} className="flex-1 border border-brand-dark hover:bg-gray-50 text-brand-dark text-center text-xs font-bold py-4 uppercase tracking-widest transition duration-300">
                                  Details
                              </Link>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* DIRECT BOOKING BANNER */}
      <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-2xl font-serif mb-4">Why Book Direct?</h2>
              <p className="opacity-80 mb-8 max-w-2xl mx-auto">
                  Avoid the hidden fees of online travel agencies. When you book directly with Heaven Palace, you are guaranteed the lowest rate and exclusive perks.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Star size={16} className="text-brand-gold"/> Best Rate Guarantee</span>
                  <span className="flex items-center gap-2"><Coffee size={16} className="text-brand-gold"/> Free High Tea</span>
                  <span className="flex items-center gap-2"><Wind size={16} className="text-brand-gold"/> Early Check-in (Subject to availability)</span>
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
