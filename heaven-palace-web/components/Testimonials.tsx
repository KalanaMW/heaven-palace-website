'use client';

import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "David & Sarah",
    location: "United Kingdom",
    image: "/images/testimonials/guest-1.jpg",
    text: "We came to Kandy for the culture but stayed for the peace. After a chaotic day at the Perahera, returning to Heaven Palace felt like a sanctuary. The Ayurvedic spa treatment is a must!",
    rating: 5,
    type: "Cultural Traveler"
  },
  {
    id: 2,
    name: "Dilshan Perera",
    location: "Colombo, Sri Lanka",
    image: "/images/testimonials/guest-2.jpg",
    text: "The perfect weekend escape from Colombo. The 'Work & Relax' package was exactly what I needed. fast WiFi for my Zoom calls and a view of the Hanthana mountains that beats any office.",
    rating: 5,
    type: "Digital Nomad"
  },
  {
    id: 3,
    name: "The Jayawardena Family",
    location: "Negombo, Sri Lanka",
    image: "/images/testimonials/guest-3.jpg",
    text: "Authentic Sri Lankan hospitality at its best. The staff remembered our kids' names and the chef made a special non-spicy curry just for them. We will definitely return.",
    rating: 5,
    type: "Family Staycation"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 block">Guest Stories</span>
        <h2 className="text-4xl font-serif text-brand-dark mb-6">Memories from Paradise</h2>
        <div className="w-20 h-1 bg-brand-blue mx-auto"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-gray-50 p-8 rounded-xl relative group hover:-translate-y-2 transition duration-500 border border-gray-100">
              <Quote className="absolute top-8 right-8 text-brand-gold/20 w-12 h-12" />
              
              <div className="flex items-center gap-1 mb-6 text-brand-gold">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                   {/* In a real app, use real images. For now, a gray placeholder if image missing */}
                   <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill 
                    className="object-cover"
                   />
                   <div className="absolute inset-0 flex items-center justify-center bg-brand-blue text-white font-serif text-lg">
                      {review.name.charAt(0)}
                   </div>
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-brand-dark font-bold">{review.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
