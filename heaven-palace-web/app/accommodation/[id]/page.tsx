"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Wifi, Coffee, Wind, Check, ArrowLeft, MapPin, Shield, 
  CreditCard, Star, Droplets, Tv, Utensils, Sun 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- MOCK DATABASE (Simulating Backend Data) ---
const ROOM_DETAILS_DB = [
  {
    id: 1,
    name: "Standard Double Room",
    price: 15000,
    heroImage: "/images/accommodation/room-standard.jpg",
    gallery: ["/images/home/room-2.jpg", "/images/home/room-1.jpg", "/images/accommodation/room-bath.jpg"],
    description: "A cozy sanctuary perfect for couples or solo travelers. Featuring traditional Sri Lankan teak furniture and a private balcony overlooking our spice garden.",
    longDescription: "Immerse yourself in the tranquility of Kandy. Our Standard Double Room is designed to be a cool, quiet refuge after a day of exploring the city. The room features handcrafted teak furniture made by local artisans and high-thread-count cotton linens. The private balcony offers a direct view of our organic spice garden—perfect for enjoying your morning cup of Ceylon tea.",
    size: "28 m²",
    view: "Spice Garden View",
    amenities: {
        tech: ["High-Speed Fiber WiFi", "42-inch Smart TV", "Universal Power Sockets"],
        comfort: ["King Size Teak Bed", "Silent Split AC", "Blackout Curtains", "Mosquito Vaporizer"],
        bathroom: ["Hot Water (Solar + Heater)", "Rain Shower", "Ayurvedic Toiletries", "Hair Dryer"],
        food: ["Mini Fridge", "Tea/Coffee Maker", "Complimentary Bottled Water", "Room Service Menu"]
    }
  },
  {
    id: 2,
    name: "Deluxe Queen with Mountain View",
    price: 18500,
    heroImage: "/images/accommodation/room-deluxe.jpg",
    gallery: ["/images/home/room-1.jpg", "/images/accommodation/room-standard.jpg", "/images/home/room-2.jpg"],
    description: "Wake up to the mist rolling over the Hanthana mountain range. This spacious room offers a seating area and a work desk.",
    longDescription: "The Deluxe Queen room offers one of the best views in Kandy. Floor-to-ceiling windows frame the majestic Hanthana Mountain range. This room is specifically designed for the modern traveler, featuring a dedicated ergonomic workspace, making it ideal for digital nomads. In the evenings, watch the sunset paint the mountains in gold from your private seating area.",
    size: "35 m²",
    view: "Hanthana Mountains",
    amenities: {
        tech: ["Dedicated 50Mbps WiFi", "50-inch 4K TV", "Work Desk with Lamp"],
        comfort: ["Queen Orthopedic Mattress", "Seating Area", "Climate Control AC", "Soundproofing"],
        bathroom: ["Luxury Rain Shower", "Bathrobes & Slippers", "Premium Spa Products", "Makeup Mirror"],
        food: ["Mini Bar", "Nespresso Machine", "Welcome Fruit Basket", "Breakfast in Bed Option"]
    }
  },
  {
    id: 3,
    name: "Deluxe Double with Bath",
    price: 24000,
    heroImage: "/images/accommodation/room-bath.jpg",
    gallery: ["/images/home/room-2.jpg", "/images/accommodation/room-deluxe.jpg", "/images/home/room-1.jpg"],
    description: "Our signature romantic room. Features a freestanding bathtub next to a large window.",
    longDescription: "Indulge in pure luxury. This room is the crown jewel of Heaven Palace, designed specifically for romance and relaxation. The highlight is the freestanding soaking tub positioned by the window, allowing you to bathe while gazing at the Kandy night sky (with privacy blinds). The room features warm ambient lighting, soft carpets, and an extra-spacious layout.",
    size: "45 m²",
    view: "City & Garden",
    amenities: {
        tech: ["High-Speed WiFi", "Bluetooth Sound System", "Mood Lighting Control"],
        comfort: ["Super King Bed", "Luxury Linens (400 TC)", "Lounge Area", "Evening Turndown Service"],
        bathroom: ["Freestanding Bathtub", "Separate Shower Cubicle", "Bath Salts & Oils", "Plush Bathrobes"],
        food: ["Stocked Mini Bar", "Espresso Machine", "Chocolates on Arrival", "Sparkling Water"]
    }
  },
  {
    id: 4,
    name: "Family Suite (Triple)",
    price: 28000,
    heroImage: "/images/accommodation/room-family.jpg",
    gallery: ["/images/home/room-1.jpg", "/images/accommodation/room-standard.jpg", "/images/home/room-2.jpg"],
    description: "Space for the whole family. Includes a separate living area and easy access to the garden.",
    longDescription: "Traveling with family requires space and convenience. Our Family Suite is located on the ground floor for easy stroller/wheelchair access. It features a main sleeping area and a separate seating area that converts to a sleeping space. The room opens directly onto the hotel lawn, allowing children to play safely within sight. We also provide board games and children's books.",
    size: "55 m²",
    view: "Pool & Garden",
    amenities: {
        tech: ["WiFi (Multiple Devices)", "2 Smart TVs", "Game Console Connection"],
        comfort: ["2 Queen Beds", "Living Room Sofa", "Ground Floor Access", "Baby Cot Available"],
        bathroom: ["Family Sized Bathroom", "Low-height Sink for Kids", "Baby Bath Tub", "Non-slip Mats"],
        food: ["Microwave", "Large Fridge", "Dining Table", "Kid-friendly Snacks"]
    }
  }
];

export default function RoomDetails() {
  const params = useParams();
  const id = Number(params.id);
  const room = ROOM_DETAILS_DB.find(r => r.id === id);

  if (!room) return <div className="h-screen flex items-center justify-center">Room Not Found</div>;

  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* --- HERO SECTION (Parallax Feel) --- */}
      <section className="relative h-[80vh] w-full">
        <Image 
          src={room.heroImage} 
          alt={room.name} 
          fill 
          className="object-cover brightness-75 fixed-bg" // 'fixed-bg' class needs custom CSS for true parallax or just object-cover
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10">
            <div className="container mx-auto">
                <Link href="/accommodation" className="inline-flex items-center text-xs font-bold uppercase tracking-widest mb-6 hover:text-brand-gold transition">
                    <ArrowLeft size={16} className="mr-2" /> Back to All Rooms
                </Link>
                <h1 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">{room.name}</h1>
                <div className="flex gap-6 text-sm font-bold uppercase tracking-widest opacity-90">
                    <span className="flex items-center gap-2"><MapPin size={16} className="text-brand-gold"/> {room.view}</span>
                    <span className="flex items-center gap-2"><Star size={16} className="text-brand-gold"/> {room.size}</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- MAIN CONTENT WITH SIDEBAR --- */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16 relative">
            
            {/* LEFT COLUMN: SCROLLABLE CONTENT */}
            <div className="w-full lg:w-2/3 space-y-16">
                
                {/* 1. Description */}
                <section id="description">
                    <h2 className="text-2xl font-serif text-brand-dark mb-6">Experience the Room</h2>
                    <p className="text-gray-600 leading-relaxed text-lg font-light">
                        {room.longDescription}
                    </p>
                </section>

                {/* 2. Gallery Grid */}
                <section id="gallery">
                    <h3 className="text-xl font-serif text-brand-dark mb-6">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                        <div className="relative h-full w-full rounded-xl overflow-hidden row-span-2 group">
                            <Image src={room.gallery[0]} alt="Main View" fill className="object-cover transition duration-700 group-hover:scale-110" />
                        </div>
                        <div className="relative h-full w-full rounded-xl overflow-hidden group">
                            <Image src={room.gallery[1]} alt="Detail 1" fill className="object-cover transition duration-700 group-hover:scale-110" />
                        </div>
                        <div className="relative h-full w-full rounded-xl overflow-hidden group">
                            <Image src={room.gallery[2]} alt="Detail 2" fill className="object-cover transition duration-700 group-hover:scale-110" />
                        </div>
                    </div>
                </section>

                {/* 3. Detailed Amenities */}
                <section id="amenities" className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-serif text-brand-dark mb-8">Room Amenities</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Tech */}
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-brand-blue mb-4 uppercase text-xs tracking-widest">
                                <Wifi size={16} /> Technology
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {room.amenities.tech.map((item, i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-green-500"/>{item}</li>)}
                            </ul>
                        </div>

                        {/* Comfort */}
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-brand-blue mb-4 uppercase text-xs tracking-widest">
                                <Wind size={16} /> Comfort
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {room.amenities.comfort.map((item, i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-green-500"/>{item}</li>)}
                            </ul>
                        </div>

                        {/* Bathroom */}
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-brand-blue mb-4 uppercase text-xs tracking-widest">
                                <Droplets size={16} /> Bathroom
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {room.amenities.bathroom.map((item, i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-green-500"/>{item}</li>)}
                            </ul>
                        </div>

                         {/* Food */}
                         <div>
                            <h4 className="flex items-center gap-2 font-bold text-brand-blue mb-4 uppercase text-xs tracking-widest">
                                <Utensils size={16} /> Refreshments
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {room.amenities.food.map((item, i) => <li key={i} className="flex gap-2"><Check size={14} className="mt-1 text-green-500"/>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4. House Rules */}
                <section id="policies">
                    <h3 className="text-xl font-serif text-brand-dark mb-6">Policies & Conditions</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <Shield className="text-brand-gold shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Cancellation Policy</h4>
                                <p className="text-xs text-gray-500 mt-1">Free cancellation up to 24 hours before check-in. Late cancellations are subject to a one-night charge.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border rounded-lg">
                            <CreditCard className="text-brand-gold shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Payment</h4>
                                <p className="text-xs text-gray-500 mt-1">Pay at hotel available. Credit card required only for guarantee. We accept Visa, Master, and Amex.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* RIGHT COLUMN: STICKY SIDEBAR */}
            <div className="w-full lg:w-1/3">
                <div className="sticky top-32">
                    <div className="bg-white shadow-2xl p-8 border-t-4 border-brand-blue rounded-b-xl">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Best Price</span>
                            <div className="text-right">
                                <span className="block text-3xl font-bold text-brand-dark">LKR {room.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <p className="text-right text-xs text-gray-400 mb-6">per night / including taxes</p>

                        <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 text-sm text-brand-dark font-bold">
                                <Check size={16} className="text-green-600" /> <span>Breakfast Included</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Check size={16} className="text-green-600" /> <span>Welcome Drink</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Check size={16} className="text-green-600" /> <span>Access to Swimming Pool</span>
                            </div>
                        </div>

                        <Link 
                            href={`/booking?room=${room.id}`}
                            className="block w-full bg-brand-blue text-white text-center py-4 font-bold uppercase tracking-widest text-xs hover:bg-blue-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Book This Room
                        </Link>
                        
                        <div className="mt-6 text-center border-t pt-4">
                            <p className="text-xs font-bold text-gray-600 mb-2">Need Help?</p>
                            <p className="text-brand-gold font-bold text-lg">+94 77 777 3808</p>
                            <p className="text-[10px] text-gray-400">Available on WhatsApp</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
