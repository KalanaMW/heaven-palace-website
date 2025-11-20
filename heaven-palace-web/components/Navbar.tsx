'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
           <span className="text-white font-serif text-2xl font-bold tracking-widest">HEAVEN PALACE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-sm tracking-widest uppercase font-light items-center">
          <Link href="/" className="hover:text-brand-gold transition">Home</Link>
          <Link href="/location" className="hover:text-brand-gold transition">Location</Link>
          <Link href="/accommodation" className="hover:text-brand-gold transition">Accommodation</Link>
          <Link href="/dining" className="hover:text-brand-gold transition">Dining</Link>
          <Link href="/offers" className="hover:text-brand-gold transition">Offers</Link>
          <Link href="/contact" className="hover:text-brand-gold transition">Contact</Link>
          
          {/* LOGIN BUTTON */}
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-2 text-white hover:text-brand-gold transition border-l border-white/20 pl-6"
          >
            <User size={16} />
            <span className="font-bold text-xs">Login</span>
          </button>
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
             <button onClick={() => {setIsMobileMenuOpen(false); setIsAuthOpen(true);}} className="text-xl uppercase tracking-widest text-brand-gold">Login / Join</button>
          </div>
        )}
      </div>
    </nav>

    {/* The Auth Modal Component */}
    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
