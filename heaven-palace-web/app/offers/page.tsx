'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OFFERS_DATA = [
  {
    id: 1,
    title: "Romantic Escape Package",
    subtitle: "Celebrate Love in Paradise",
    image: "/images/offers/romantic.jpg",
    validity: "Valid until Dec 31, 2025",
    description: "Ignite the romance with a specially curated getaway. Enjoy room decoration with flowers, a couple's Ayurvedic spa treatment, and a private candlelit dinner under the stars.",
    inclusions: [
        "Deluxe Double Room with Bath",
        "60-min Couple Spa Treatment",
        "Private Candlelit Dinner",
        "Daily Breakfast in Bed"
    ],
    price: "From LKR 45,000 / Night"
  },
  {
    id: 2,
    title: "Early Bird Discount",
    subtitle: "Plan Ahead & Save",
    image: "/images/offers/early-bird.jpg",
    validity: "Book 30 days in advance",
    description: "Secure your sanctuary early and enjoy exclusive savings. The perfect excuse to plan your wellness retreat in Kandy ahead of time.",
    inclusions: [
        "15% Off Best Available Rate",
        "Complimentary Room Upgrade (Subject to availability)",
        "Welcome Drink on Arrival",
        "Free Cancellation up to 7 days"
    ],
    price: "15% OFF"
  },
  {
    id: 3,
    title: "Monsoon Wellness Retreat",
    subtitle: "Restore Your Balance",
    image: "/images/offers/wellness.jpg",
    validity: "Seasonal (June - Aug)",
    description: "Embrace the healing power of the monsoon season. A holistic program designed to boost immunity and restore mental clarity through Ayurveda.",
    inclusions: [
        "Consultation with Ayurvedic Doctor",
        "Daily Herbal Treatments",
        "Organic Full Board Meals",
        "Morning Yoga Sessions"
    ],
    price: "From LKR 35,000 / Night"
  },
  {
    id: 4,
    title: "Work & Relax Staycation",
    subtitle: "Your Office With A View",
    image: "/images/offers/family.jpg",
    validity: "Min Stay 3 Nights",
    description: "Combine productivity with tranquility. High-speed 50Mbps WiFi, ergonomic workspace setup, and evening relaxation to wind down after work.",
    inclusions: [
        "High-Speed Dedicated Internet",
        "20% Off Food & Beverage",
        "Daily Evening Head Massage (15 min)",
        "Late Checkout till 4:00 PM"
    ],
    price: "From LKR 20,000 / Night"
  }
];

export default function Offers() {
  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="/images/home/hero-bg.jpg" 
          alt="Offers Hero" 
          fill 
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
            <span className="uppercase tracking-[0.3em] text-sm mb-4 block">Exclusive Deals</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Special Offers</h1>
            <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-20 text-center container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-serif text-brand-dark mb-6">Curated Experiences For You</h2>
          <p className="text-gray-600 font-light leading-relaxed">
              Whether you are looking for a romantic getaway, a wellness retreat, or a productive workation, 
              Heaven Palace offers exclusive packages designed to enhance your stay in Kandy.
          </p>
      </section>

      {/* Offers Grid */}
      <section className="pb-24 container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16">
              {OFFERS_DATA.map((offer, index) => (
                  <div key={offer.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      
                      {/* Image Side */}
                      <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] group overflow-hidden shadow-2xl">
                          <Image 
                            src={offer.image} 
                            alt={offer.title} 
                            fill 
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-6 left-6 bg-brand-gold text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                              {offer.price}
                          </div>
                      </div>

                      {/* Content Side */}
                      <div className="w-full lg:w-1/2">
                          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest mb-2 block">{offer.subtitle}</span>
                          <h3 className="text-3xl font-serif text-brand-dark mb-4">{offer.title}</h3>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-6">
                              <div className="flex items-center gap-2">
                                  <Calendar size={14} /> {offer.validity}
                              </div>
                          </div>

                          <p className="text-gray-600 mb-6 leading-relaxed">
                              {offer.description}
                          </p>

                          <div className="bg-gray-50 p-6 mb-8 border border-gray-100">
                              <h4 className="text-sm font-bold text-brand-dark mb-4 uppercase tracking-wide">Package Inclusions:</h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {offer.inclusions.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                          <CheckCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                          {item}
                                      </li>
                                  ))}
                              </ul>
                          </div>

                          <button className="bg-brand-dark hover:bg-brand-blue text-white text-xs font-bold py-4 px-8 uppercase tracking-widest transition duration-300 w-full md:w-auto">
                              Book This Offer
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      <Footer />
    </main>
  );
}
