"use client";

import Image from 'next/image';
import { Map, Camera, Compass, Mountain, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ACTIVITIES = [
  {
    id: 1,
    title: "Temple of the Tooth Ritual",
    category: "Culture",
    duration: "3 Hours",
    price: "LKR 5,000 / person",
    image: "/images/home/exp-1.jpg",
    description: "Join a guided tour of the Sri Dalada Maligawa during the evening 'Thewawa' ceremony. Understand the history of Buddhism in Sri Lanka."
  },
  {
    id: 2,
    title: "Udawatta Kele Forest Trek",
    category: "Nature",
    duration: "2 Hours",
    price: "LKR 3,500 / person",
    image: "/images/home/exp-2.jpg",
    description: "A guided nature walk in the royal forest sanctuary behind the temple. Spot endemic birds, giant lianas, and mischievous monkeys."
  },
  {
    id: 3,
    title: "Hanthana Mountain Hike",
    category: "Adventure",
    duration: "Half Day",
    price: "LKR 6,000 / person",
    image: "/images/home/exp-3.jpg",
    description: "For the adventurous soul. Hike up the Hanthana range for panoramic views of Kandy city and the Knuckles mountain range."
  },
  {
    id: 4,
    title: "Ceylon Tea Museum Tour",
    category: "Heritage",
    duration: "2 Hours",
    price: "LKR 4,000 / person",
    image: "/images/home/exp-4.jpg",
    description: "Visit the historic Hantana Tea Factory. Learn the tea-making process and enjoy a cup of the finest BOPF tea."
  }
];

export default function ExperiencesPage() {
  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <Image
          src="/images/home/exp-2.jpg"
          alt="Experiences Hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 block">Discover Kandy</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Curated Experiences</h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif text-brand-dark mb-6">More Than Just A Stay</h2>
          <p className="text-gray-600 leading-relaxed">
            Kandy is a city of kings, culture, and nature. We have partnered with certified local guides to offer you authentic experiences that go beyond the typical tourist trail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ACTIVITIES.map((item) => (
            <div key={item.id} className="flex flex-col shadow-lg rounded-xl overflow-hidden group">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark rounded">
                  {item.category}
                </div>
              </div>
              <div className="p-8 bg-white flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold text-brand-dark mb-3">{item.title}</h3>
                <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1"><Clock size={14}/> {item.duration}</span>
                  <span className="flex items-center gap-1"><Compass size={14}/> Guide Inc.</span>
                </div>
                <p className="text-gray-600 text-sm mb-6 flex-1">
                  {item.description}
                </p>
                <div className="flex justify-between items-center border-t pt-6">
                  <span className="font-bold text-brand-blue">{item.price}</span>
                  <button className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-gold transition flex items-center gap-2">
                    Book Now <Map size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
