"use client";

import { useEffect, useState } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

type Review = {
  id: number;
  guest_name: string;
  rating: number;
  comment: string;
  location: string;
};

const Testimonials = () => {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_featured', true) // Only fetch approved ones
        .limit(3); // Limit to 3 for design consistency
      
      if (data) setReviews(data as Review[]);
      setLoading(false);
    };

    fetchFeaturedReviews();
  }, [supabase]);

  if (loading) return (
    <section className="py-24 bg-white text-center">
        <Loader2 className="animate-spin text-brand-gold mx-auto" />
    </section>
  );

  // If no reviews featured yet, hide section or show fallback
  if (reviews.length === 0) return null;

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
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-8 rounded-xl relative group hover:-translate-y-2 transition duration-500 border border-gray-100">
              <Quote className="absolute top-8 right-8 text-brand-gold/20 w-12 h-12" />
              
              <div className="flex items-center gap-1 mb-6 text-brand-gold">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 italic min-h-[80px]">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                {/* Initials Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-blue flex items-center justify-center text-white font-serif text-lg shadow-md">
                   {review.guest_name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-brand-dark font-bold">{review.guest_name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{review.location || 'Guest'}</p>
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
