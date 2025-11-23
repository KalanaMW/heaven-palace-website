'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import AuthModal from './AuthModal';
import { createClient } from '@/utils/supabase/client';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>('');

  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check Auth State
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const currentUser = (data as any)?.user;
        if (currentUser) {
          setUser(currentUser);
          setUserName((currentUser.user_metadata as any)?.full_name?.split(' ')[0] || 'Guest');
        }
      } catch (err) {
        // ignore for now
      }
    };
    getUser();
  }, [supabase]);

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
          {/* <Link href="/location" className="hover:text-brand-gold transition">Location</Link> */}
          <Link href="/accommodation" className="hover:text-brand-gold transition">Accommodation</Link>
          <Link href="/dining" className="hover:text-brand-gold transition">Dining</Link>
          <Link href="/experiences" className="hover:text-brand-gold transition">Experiences</Link>
          <Link href="/offers" className="hover:text-brand-gold transition">Offers</Link>
          <Link href="/contact" className="hover:text-brand-gold transition">Contact</Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4"> {/* Reduced gap */}
          {/* LOGIN / USER STATE */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-3 text-white hover:text-brand-gold transition mr-2">
               <div className="text-right hidden xl:block">
                   <span className="block text-xs font-bold uppercase leading-none">{userName}</span>
                   <span className="block text-[10px] opacity-70 leading-none mt-1">My Account</span>
               </div>
               <div className="w-9 h-9 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark font-serif font-bold text-sm shadow-md border-2 border-white/20">
                 {userName.charAt(0)}
               </div>
            </Link>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 text-white hover:text-brand-gold transition mr-4"
            >
              <User size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Login</span>
            </button>
          )}

          {/* CTA Button */}
          <Link href="/booking" className="bg-brand-blue hover:bg-blue-800 text-white text-xs font-bold py-3 px-6 uppercase tracking-widest transition duration-300 rounded-sm shadow-lg">
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
             <Link href="/experiences" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-widest">Experiences</Link>
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
