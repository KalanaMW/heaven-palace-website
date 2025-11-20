"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

// Image cache-busting version (set `NEXT_PUBLIC_IMAGE_VERSION` in .env.local)
const IMG_VERSION = process.env.NEXT_PUBLIC_IMAGE_VERSION ?? '1';

// --- DATA MOCKUPS ---

const ROOMS = [
  {
    id: 1,
    name: "Deluxe Double with Bath",
    size: "45 m²",
    description: "Unwind in a space that feels like home. Enjoy a warm bath after a hike in the Hanthana mountains, surrounded by the sounds of nature.",
    image: "/images/home/room-2.jpg",
    link: "/accommodation/deluxe-double-bath"
  },
  {
    id: 2,
    name: "Deluxe Queen Room",
    size: "35 m²",
    description: "A luxury escape featuring premium linens and a private balcony overlooking our spice garden. Perfect for a peaceful retreat.",
    image: "/images/home/room-1.jpg",
    link: "/accommodation/deluxe-queen"
  }
];

const EXPERIENCES = [
  {
    id: 1,
    title: "Temple of the Tooth",
    image: "/images/home/exp-1.jpg",
    link: "/experiences/temple"
  },
  {
    id: 2,
    title: "Udawatta Kele Trek",
    image: "/images/home/exp-2.jpg",
    link: "/experiences/trek"
  },
  {
    id: 3,
    title: "Royal Botanical Gardens",
    image: "/images/home/exp-3.jpg",
    link: "/experiences/gardens"
  }
];

const OFFERS = [
  {
    id: 1,
    title: "Romantic Escape Package",
    valid: "December 31st, 2025",
    description: "Includes room decoration with fresh local flowers, a couple's Ayurvedic treatment, and private candlelit dinner.",
    image: "/images/offers/romantic.jpg"
  },
  {
    id: 2,
    title: "Work & Relax Package",
    valid: "December 31st, 2025",
    description: "Extended stay discounts, high-speed fiber WiFi, workspace setup, and evening tea service.",
    image: "/images/offers/family.jpg"
  }
];

// --- SECTIONS ---

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image 
          src="/images/home/hero-bg.jpg" 
          alt="Heaven Palace Kandy Night View" 
          fill 
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>
      
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6">
        <div className="max-w-3xl mt-20">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm mb-4 animate-fade-in-up">
            Welcome to the Hill Capital
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 drop-shadow-lg">
            Escape, Unwind, and <br /> Experience Kandy's Serenity
          </h1>
          <div className="h-1 w-20 bg-brand-gold mb-8"></div>
          <p className="text-white/90 text-lg font-light max-w-xl mb-8">
            A boutique sanctuary where ancient Sri Lankan hospitality meets modern wellness.
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center animate-bounce">
        <span className="text-white text-xs tracking-widest uppercase mb-2">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white/50"></div>
      </div>
    </section>
  );
};

const WelcomeIntro = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center relative">
          {/* Image Side */}
          <div className="w-full lg:w-7/12 h-[500px] relative">
             <Image 
              src="/images/home/welcome-intro.jpg" 
              alt="Welcome Reception" 
              fill
              className="object-cover shadow-xl"
             />
          </div>

          {/* Content Box Overlap */}
          <div className="w-full lg:w-5/12 bg-white p-10 lg:-ml-20 z-10 shadow-2xl mt-[-50px] lg:mt-0 relative border-l-4 border-brand-gold">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-4">Ayubowan to Heaven Palace</span>
            <h2 className="text-4xl font-serif text-brand-dark mb-6 leading-snug">
              Unwind In Nature’s <br/> Embrace
            </h2>
            <p className="text-gray-600 font-sans leading-relaxed mb-8">
              Located just minutes from the sacred Temple of the Tooth, Heaven Palace is more than a hotel—it's a wellness lifestyle. We combine the cool climate of Kandy with authentic Sri Lankan warmth to provide a starting point for your cultural journey.
            </p>
            <Link href="/about" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-blue transition">
              Read Our Story <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Accommodation = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
          Luxurious Spaces Designed for <br/> Ultimate Comfort
        </h2>
        <Link href="/accommodation" className="text-xs font-bold uppercase tracking-widest text-brand-blue flex items-center justify-center gap-2">
          View All Rooms <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map((room) => (
            <div key={room.id} className="group bg-white shadow-lg hover:shadow-xl transition duration-500">
              <div className="relative h-[350px] overflow-hidden">
                <Image 
                  src={room.image} 
                  alt={room.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-brand-blue/90 p-6 text-white translate-y-2 group-hover:translate-y-0 transition">
                  <h3 className="text-2xl font-serif mb-1">{room.name}</h3>
                  <p className="text-xs opacity-80 uppercase tracking-wider">Room Size: {room.size}</p>
                </div>
              </div>
              <div className="p-8 border-t border-gray-100">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                <Link href={room.link} className="text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:text-brand-blue transition flex items-center">
                  Book Now <ChevronRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dining = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Side */}
          <div className="w-full md:w-1/2 order-2 md:order-1 pl-0 md:pl-12">
            <h2 className="text-4xl font-serif text-brand-dark mb-6">
              A Culinary Journey <br/> Through Spice & Tradition
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Indulge in the authentic flavors of the hill country. From traditional <strong>Rice & Curry</strong> prepared in clay pots to high tea served on our terrace overlooking the mountains. We source our organic vegetables from local farmers in the Nuwara Eliya district.
            </p>
            <Link href="/dining" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-blue transition">
              View Menu <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2 order-1 md:order-2 relative">
             <div className="relative h-[400px] md:h-[500px] w-full">
                <div className="absolute right-0 top-0 w-10/12 h-full bg-blue-50 overflow-hidden">
                   <Image 
                      src="/images/home/dining-main.jpg" 
                      alt="Sri Lankan Cuisine" 
                      fill 
                      className="object-cover"
                   />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Offers = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">
          Unwind in Luxury with <br/> Exclusive Offers
        </h2>
        <Link href="/offers" className="text-xs font-bold uppercase tracking-widest text-brand-blue inline-flex items-center">
          See All Offers <ChevronRight className="w-3 h-3 ml-2" />
        </Link>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="relative group h-[450px]">
              <Image 
                src={offer.image} 
                alt={offer.title} 
                fill 
                className="object-cover brightness-90 group-hover:brightness-100 transition duration-500"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white p-8 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-serif text-brand-dark mb-2">{offer.title}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Offer Valid Till: {offer.valid}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark flex items-center">
                  Read More <ChevronRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE ASSEMBLY ---

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <WelcomeIntro />
      <Accommodation />
      <Dining />
      <Offers />
      <Testimonials /> {/* ADDED HERE */}
      <Footer />
    </main>
  );
}
