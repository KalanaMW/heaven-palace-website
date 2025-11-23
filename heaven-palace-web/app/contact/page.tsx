'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Train, Car, Navigation, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[50vh] w-full flex items-center justify-center">
        <Image 
          src="/images/home/hero-bg.jpg" 
          alt="Contact Heaven Palace" 
          fill 
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white px-6">
            <span className="uppercase tracking-[0.3em] text-sm mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Location & Contact</h1>
            <div className="h-1 w-20 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
            
            {/* LEFT: Contact Info & Form */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-serif text-brand-dark mb-8">We'd love to hear from you</h2>
                <p className="text-gray-600 mb-12 leading-relaxed">
                    Whether you need help planning your Kandy itinerary, have questions about our Ayurvedic treatments, or want to arrange a special surprise, our team is here 24/7.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded text-brand-blue"><Phone size={20}/></div>
                        <div>
                            <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider mb-1">Phone</h4>
                            <p className="text-gray-600 text-sm">+94 77 777 3808</p>
                            <p className="text-gray-600 text-sm">+94 81 222 4455</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded text-brand-blue"><Mail size={20}/></div>
                        <div>
                            <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider mb-1">Email</h4>
                            <p className="text-gray-600 text-sm">reservations@heavenpalace.com</p>
                            <p className="text-gray-600 text-sm">info@heavenpalace.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded text-brand-blue"><MapPin size={20}/></div>
                        <div>
                            <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider mb-1">Address</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                No. 39/1, Maragahawela Road,<br/>
                                Rajapihilla, Pattiyawatta,<br/>
                                Kandy 20000, Sri Lanka
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded text-green-600"><MessageCircle size={20}/></div>
                        <div>
                            <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider mb-1">WhatsApp</h4>
                            <p className="text-gray-600 text-sm text-green-600 font-bold cursor-pointer hover:underline">
                                Chat with us
                            </p>
                            <p className="text-[10px] text-gray-400">Avg. response: 5 mins</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                    <h3 className="font-serif font-bold text-xl mb-6">Send us a Message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Name" className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue text-sm" />
                            <input type="email" placeholder="Email" className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue text-sm" />
                        </div>
                        <input type="text" placeholder="Subject" className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue text-sm" />
                        <textarea placeholder="How can we help you?" className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue h-32 text-sm"></textarea>
                        <button className="bg-brand-dark text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition w-full">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT: Map & Transport Info */}
            <div className="w-full lg:w-1/2 space-y-8">
                
                {/* Embedded Map (Using Kandy coordinates placeholder) */}
                <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1030309943044!2d80.59177187476122!3d7.342325892666322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3432f6b56a409%3A0x53743dcd24ac9fe8!2sHeaven%20Palace!5e0!3m2!1sen!2slk!4v1763725077517!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition duration-700"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg flex items-center gap-2">
                        <Navigation size={16} className="text-brand-blue" />
                        <a href="#" className="text-xs font-bold text-brand-dark hover:underline">Get Directions</a>
                    </div>
                </div>

                {/* Attractions Distance */}
                <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
                    <h3 className="font-serif font-bold text-lg mb-6">Nearby Attractions</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                            <span className="text-sm text-gray-600">Temple of the Tooth</span>
                            <span className="text-xs font-bold text-brand-blue">1.5 km (10 min)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                            <span className="text-sm text-gray-600">Kandy Lake</span>
                            <span className="text-xs font-bold text-brand-blue">1.2 km (8 min)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                            <span className="text-sm text-gray-600">Royal Botanical Gardens</span>
                            <span className="text-xs font-bold text-brand-blue">6.5 km (25 min)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Kandy City Centre (KCC)</span>
                            <span className="text-xs font-bold text-brand-blue">2.0 km (15 min)</span>
                        </div>
                    </div>
                </div>

                {/* How to Reach (Sri Lankan Context) */}
                <div className="bg-brand-dark text-white p-8 rounded-xl">
                    <h3 className="font-serif font-bold text-lg mb-6">Getting Here</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-brand-gold">
                                <Train size={18} /> <span className="text-xs font-bold uppercase">By Train</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Take the scenic train from Colombo Fort to Kandy Station. We offer free pickup from the station (notify us 24h prior).
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-brand-gold">
                                <Car size={18} /> <span className="text-xs font-bold uppercase">By Car</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Approx 3.5 hours from Colombo via the Kandy Road. We have free secure parking on-site for guests.
                            </p>
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
