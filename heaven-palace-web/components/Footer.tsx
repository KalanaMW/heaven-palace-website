'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, ArrowRight, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const supabase = createClient();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Insert into DB
    const { error } = await supabase.from('subscribers').insert([{ email }]);

    if (error) {
        // Ignore unique constraint error (user already subscribed)
        if ((error as any).code === '23505') {
            setStatus('success');
        } else {
            setStatus('error');
        }
    } else {
        setStatus('success');
        setEmail('');
    }
  };

  return (
    <footer className="relative bg-brand-dark text-white pt-24 pb-12 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-10 z-0">
        <Image src="/images/home/footer-bg.jpg" alt="Footer" fill className="object-cover" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-8">
               <span className="text-white font-serif text-2xl font-bold tracking-widest">HEAVEN PALACE</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Unwind in nature's embrace. The premier wellness destination in Kandy.
            </p>
            <div className="flex space-x-4">
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition cursor-pointer"><Facebook size={14}/></div>
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition cursor-pointer"><Instagram size={14}/></div>
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-blue transition cursor-pointer"><Twitter size={14}/></div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
               <li className="hover:text-white transition"><Link href="/accommodation">Accommodation</Link></li>
               <li className="hover:text-white transition"><Link href="/dining">Dining</Link></li>
               <li className="hover:text-white transition"><Link href="/offers">Special Offers</Link></li>
               <li className="hover:text-white transition"><Link href="/experiences">Experiences</Link></li>
            </ul>
          </div>

           {/* Address */}
           <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Contact</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              No. 39/1, Maragahawela Road,<br/>
              Rajapihilla, Pattiyawatta,<br/>
              Kandy, Sri Lanka
            </p>
            <p className="text-sm font-bold text-white mt-4">Hotline: +94 77 777 3808</p>
          </div>

          {/* NEWSLETTER SUBSCRIPTION (DYNAMIC) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Join Our Community</h4>
            <p className="text-xs text-gray-400 mb-4">Subscribe to receive exclusive offers and the latest wellness tips.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input 
                    type="email" 
                    placeholder="Your Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'success'}
                    className="bg-white/10 border border-white/20 text-white text-xs p-3 focus:outline-none focus:border-brand-gold transition placeholder:text-gray-500 disabled:opacity-50"
                />
                <button 
                    disabled={status === 'loading' || status === 'success'}
                    className={`text-white text-xs font-bold uppercase tracking-widest py-3 px-6 transition flex items-center justify-center gap-2 ${
                        status === 'success' ? 'bg-green-600' : 'bg-brand-blue hover:bg-blue-700'
                    }`}
                >
                    {status === 'loading' && <Loader2 size={14} className="animate-spin"/>}
                    {status === 'success' && <><Check size={14}/> Subscribed</>}
                    {status === 'idle' && <>Subscribe <ArrowRight size={14} /></>}
                    {status === 'error' && "Try Again"}
                </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
           <p>&copy; 2025 Heaven Palace Kandy. All Rights Reserved</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
