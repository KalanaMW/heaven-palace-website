"use client";

import { useState } from 'react';
import { Star, Send, ThumbsUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <ThumbsUp size={40} />
            </div>
            <h1 className="text-3xl font-serif text-brand-dark mb-4">Isthuthi! (Thank You)</h1>
            <p className="text-gray-500 max-w-md">
                Your feedback helps us keep Heaven Palace a true sanctuary. Your review has been sent to our management team for moderation.
            </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        
        <div className="bg-white p-8 md:p-12 shadow-xl rounded-xl border-t-4 border-brand-gold">
            <h1 className="text-3xl font-serif text-brand-dark mb-2">How was your stay?</h1>
            <p className="text-gray-500 mb-8 text-sm">
                We hope you found peace and rejuvenation. Please share your experience with us.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                
                {/* Star Rating */}
                <div className="mb-8 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Overall Rating</p>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="transition duration-200"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <Star 
                                    size={40} 
                                    className={star <= (hover || rating) ? "fill-brand-gold text-brand-gold" : "text-gray-300"} 
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-brand-blue mt-2 h-5">
                        {rating === 5 ? "Absolutely Perfect!" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating > 0 ? "Needs Improvement" : ""}
                    </p>
                </div>

                {/* Intelligent Field: Booking Ref */}
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Booking Reference ID</label>
                    <input type="text" placeholder="e.g., HP-8821" className="w-full border p-3 rounded focus:border-brand-blue outline-none bg-gray-50" required />
                    <p className="text-[10px] text-gray-400 mt-1">Found in your confirmation email. This ensures verified reviews.</p>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                    <input type="text" className="w-full border p-3 rounded focus:border-brand-blue outline-none" />
                </div>

                <div className="mb-8">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Experience</label>
                    <textarea 
                        className="w-full border p-3 rounded focus:border-brand-blue outline-none h-32" 
                        placeholder="Tell us about the room, the food, or the Ayurvedic spa..."
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-brand-blue" />
                        <span className="text-sm text-gray-500">I allow Heaven Palace to post this review on the website.</span>
                    </label>
                </div>

                <button type="submit" className="w-full bg-brand-dark text-white py-4 font-bold uppercase tracking-widest hover:bg-brand-blue transition flex justify-center gap-2">
                    Submit Review <Send size={18} />
                </button>

            </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
