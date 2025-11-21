"use client";

import Image from 'next/image';
import { Utensils, Coffee, Wine, Leaf, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DiningPage() {
  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image
          src="/images/dining/restaurant.jpg"
          alt="Dining Hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 block">Taste of Kandy</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Rasa (Taste) Restaurant</h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* CONCEPT */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2 block">Our Philosophy</span>
            <h2 className="text-3xl font-serif text-brand-dark mb-6">Farm to Table, <br/>Heart to Plate</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe the best way to understand Sri Lankan culture is through its food. Our chefs source organic vegetables daily from local farmers in <strong>Nuwara Eliya</strong> and spices directly from the <strong>Matale Spice Gardens</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether it's the famous 'Kandy Perahera' feast or a simple Hopper for breakfast, every dish tells a story.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-full"><Leaf size={18}/></div>
                <span className="text-sm font-bold text-gray-700">Organic Sourcing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-full"><Coffee size={18}/></div>
                <span className="text-sm font-bold text-gray-700">Ceylon Tea Lounge</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative h-[400px]">
            <div className="absolute inset-0 bg-gray-200 rounded-xl overflow-hidden transform rotate-3">
              <Image src="/images/dining/food-1.jpg" alt="Food" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* MENUS */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-brand-dark text-center mb-16">Dining Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Breakfast */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-2 transition duration-500">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Coffee size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">The Kandy Breakfast</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">06:30 AM - 10:30 AM</p>
              <p className="text-gray-600 text-sm mb-6">
                A grand spread of String Hoppers, Kiribath (Milk Rice), and Pol Sambol, served alongside western classics and fresh tropical fruits.
              </p>
              <button className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">View Menu</button>
            </div>

            {/* All Day */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-2 transition duration-500">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
                <Utensils size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Rasa A La Carte</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">11:00 AM - 10:00 PM</p>
              <p className="text-gray-600 text-sm mb-6">
                Signature Rice & Curry clay pot feasts, grilled lake fish, and international comfort food. Don't miss our Black Pork Curry.
              </p>
              <button className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">View Menu</button>
            </div>

            {/* High Tea / Bar */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-2 transition duration-500">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Wine size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Sunset Terrace</h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">04:00 PM - 11:00 PM</p>
              <p className="text-gray-600 text-sm mb-6">
                Enjoy High Tea with mountain views in the afternoon, and signature Arrack cocktails as the city lights come alive at night.
              </p>
              <button className="text-brand-blue text-xs font-bold uppercase tracking-widest hover:underline">View Drink List</button>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-6">
          <Clock size={40} className="mx-auto text-brand-gold mb-6" />
          <h2 className="text-3xl font-serif mb-4">Reserve a Table</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our restaurant is open to both in-house guests and visitors.
            Reservations are recommended for dinner.
          </p>
          <a href="tel:+94777773808" className="bg-brand-gold text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition">
            Call to Book: +94 77 777 3808
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
