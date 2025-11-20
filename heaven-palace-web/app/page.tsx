"use client";

// Use plain <img> for local files to avoid Next Image cache/config issues
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';

// Image cache-busting version (set `NEXT_PUBLIC_IMAGE_VERSION` in .env.local)
const IMG_VERSION = process.env.NEXT_PUBLIC_IMAGE_VERSION ?? '1';

// --- DATA MOCKUPS ---

const ROOMS = [
  {
    id: 1,
    name: "Deluxe Double with Bath",
    size: "45 m²",
    description: "Unwind in a space that feels like home, surrounded by the sights and sounds of nature with a private bath.",
    image: "/images/home/room-2.jpg",
    link: "/accommodation/deluxe-double-bath"
  },
  {
    id: 2,
    name: "Deluxe Queen Room",
    size: "35 m²",
    description: "Luxury escape with premium bedding, nature views & curated amenities for complete relaxation.",
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
    title: "Kandy Lake Walk",
    image: "/images/home/exp-2.jpg",
    link: "/experiences/lake"
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
    description: "Includes room decoration, couple's spa treatment, and private candlelit dinner.",
    image: "/images/home/offer-1.jpg"
  },
  {
    id: 2,
    title: "Work & Relax Package",
    valid: "December 31st, 2025",
    description: "Extended stay discounts, high-speed WiFi, workspace setup, and evening spa access.",
    image: "/images/home/offer-2.jpg"
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
           <span className="text-white font-serif text-2xl font-bold tracking-widest">HEAVEN PALACE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-sm tracking-widest uppercase font-light">
          <Link href="/" className="hover:text-brand-gold transition">Home</Link>
          <Link href="/location" className="hover:text-brand-gold transition">Location</Link>
          <Link href="/accommodation" className="hover:text-brand-gold transition">Accommodation</Link>
          <Link href="/dining" className="hover:text-brand-gold transition">Dining</Link>
          <Link href="/offers" className="hover:text-brand-gold transition">Offers</Link>
          <Link href="/contact" className="hover:text-brand-gold transition">Contact Us</Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/booking" className="bg-brand-blue hover:bg-blue-800 text-white text-xs font-bold py-3 px-6 uppercase tracking-widest transition duration-300">
            Reservation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-dark flex flex-col items-center justify-center space-y-8 text-white z-40">
             <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest">Home</Link>
             <Link href="/accommodation" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest">Accommodation</Link>
             <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest">Offers</Link>
             <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`/images/home/hero-bg.jpg?v=${IMG_VERSION}`}
          alt="Heaven Palace Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6">
        <div className="max-w-3xl mt-20">
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm mb-4 animate-fade-in-up">Heaven Palace - Kandy, Sri Lanka</p>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Escape, Unwind, and <br /> Experience Pure Serenity
          </h1>
          <div className="h-1 w-20 bg-white/50 mb-8"></div>
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
               <img
                src={`/images/home/welcome-intro.jpg?v=${IMG_VERSION}`}
                alt="Welcome"
                className="absolute inset-0 w-full h-full object-cover shadow-xl"
               />
          </div>

          {/* Content Box Overlap */}
          <div className="w-full lg:w-5/12 bg-white p-10 lg:-ml-20 z-10 shadow-2xl mt-[-50px] lg:mt-0 relative">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-4">Welcome to Heaven Palace</span>
            <h2 className="text-4xl font-serif text-brand-dark mb-6 leading-snug">
              Unwind In Nature’s <br/> Embrace
            </h2>
            <p className="text-gray-600 font-sans leading-relaxed mb-8">
              Heaven Palace is a Wellness & Lifestyle Boutique Hotel offering authentic Sri Lankan relaxation experiences. Located in the cultural heart of Kandy, we combine modern comfort with local cultural richness.
            </p>
            <Link href="/about" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-blue transition">
              Find Out More <ChevronRight className="w-4 h-4 ml-2" />
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
          Explore More <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map((room) => (
            <div key={room.id} className="group bg-white shadow-lg hover:shadow-xl transition duration-500">
              <div className="relative h-[350px] overflow-hidden">
                <img
                  src={`${room.image}?v=${IMG_VERSION}`}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-brand-blue/90 p-6 text-white translate-y-2 group-hover:translate-y-0 transition">
                  <h3 className="text-2xl font-serif mb-1">{room.name}</h3>
                  <p className="text-xs opacity-80 uppercase tracking-wider">Room Size: {room.size}</p>
                </div>
              </div>
              <div className="p-8 border-t border-gray-100">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                <Link href={room.link} className="text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:text-brand-blue transition flex items-center">
                  Explore <ChevronRight className="w-3 h-3 ml-2" />
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
              Experience Exceptional <br/> Dining with Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Indulge in a culinary journey at Heaven Palace. Our restaurant offers authentic Sri Lankan cuisine combined with international flavors. Enjoy fresh, locally sourced organic ingredients.
            </p>
            <Link href="/dining" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-blue transition">
              Find Out More <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/2 order-1 md:order-2 relative">
             <div className="relative h-[400px] md:h-[500px] w-full">
                <div className="absolute right-0 top-0 w-10/12 h-full bg-blue-50 overflow-hidden">
                   <img
                     src={`/images/home/dining-main.jpg?v=${IMG_VERSION}`}
                     alt="Dining"
                     className="absolute inset-0 w-full h-full object-cover"
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
          Explore More <ChevronRight className="w-3 h-3 ml-2" />
        </Link>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="relative group h-[450px]">
              <img
                src={`${offer.image}?v=${IMG_VERSION}`}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-500"
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

const Footer = () => {
  return (
    <footer className="relative bg-brand-dark text-white pt-24 pb-12">
        <div className="absolute inset-0 opacity-20 z-0">
        <img src={`/images/home/footer-bg.jpg?v=${IMG_VERSION}`} alt="Footer" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1">
            <div className="mb-8">
               <span className="text-white font-serif text-2xl font-bold tracking-widest">HEAVEN PALACE</span>
            </div>
            <div className="flex space-x-4">
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition"><Facebook size={14}/></div>
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition"><Instagram size={14}/></div>
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition"><Twitter size={14}/></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Contact</h4>
             <p className="text-xs text-gray-400 leading-relaxed">
              No. 39/1, Maragahawela Road,<br/>
              Kandy, Sri Lanka<br/><br/>
              +94 77 777 3808
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-xs text-gray-500 flex justify-between">
           <p>&copy; 2025 Heaven Palace Kandy.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <WelcomeIntro />
      <Accommodation />
      <Dining />
      <Offers />
      <Footer />
    </main>
  );
}
