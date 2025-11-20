'use client';

import { Star, Check, X, MessageSquare } from 'lucide-react';

const REVIEWS_DB = [
    { id: 1, guest: "John Doe", rating: 5, text: "Amazing stay! The spa was incredible.", status: "Pending", bookingId: "HP-8821", date: "Today" },
    { id: 2, guest: "Sarah Smith", rating: 2, text: "Too noisy. Construction nearby.", status: "Pending", bookingId: "HP-8800", date: "Yesterday" },
    { id: 3, guest: "Amal Perera", rating: 5, text: "Best hopper breakfast in Kandy.", status: "Approved", bookingId: "HP-8750", date: "Nov 15" },
];

export default function AdminReviews() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8">Reputation Management</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {REVIEWS_DB.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 items-start">
                
                {/* Rating Box */}
                <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg min-w-[100px]">
                    <span className="text-3xl font-bold text-brand-dark">{review.rating}.0</span>
                    <div className="flex text-brand-gold mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-brand-dark">{review.guest}</h3>
                            <p className="text-xs text-gray-400">Stay Verified • {review.bookingId} • {review.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            review.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            review.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {review.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    {review.status === 'Pending' && (
                        <>
                            <button className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Approve">
                                <Check size={18} />
                            </button>
                            <button className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Reject">
                                <X size={18} />
                            </button>
                        </>
                    )}
                    <button className="p-2 bg-blue-50 text-brand-blue rounded hover:bg-blue-100" title="Reply">
                        <MessageSquare size={18} />
                    </button>
                </div>

            </div>
        ))}
      </div>
    </div>
  );
}
