'use client';

import { useEffect, useState } from 'react';
import { Star, Check, X, MessageSquare, Send } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminReviews() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Reply UI state
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*').order('id', { ascending: false });
    if (data) setReviews(data as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSendReply = async (review: any) => {
    if (!replyText) return;
    setSending(true);

    const emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h1 style="color: #004878;">Heaven Palace Response</h1>
            <p>Dear ${review.guest_name || review.guest || 'Guest'},</p>
            <p>Thank you for your review.</p>
            <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #c5a47e;">
                "${replyText}"
            </blockquote>
            <p>We hope to welcome you back soon.</p>
            <p><strong>The Management</strong></p>
        </div>
    `;

    // Send email via our API (for testing it sends to admin address)
    const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to: 'asithau1221@gmail.com', // replace with dynamic guest email if available
            subject: 'Response to your review at Heaven Palace',
            html: emailHtml
        })
    });

    if (response.ok) {
        await supabase.from('reviews').update({ admin_reply: replyText }).eq('id', review.id);
        setReplyingId(null);
        setReplyText('');
        fetchReviews();
        alert('Reply sent and saved!');
    } else {
        alert('Failed to send email.');
    }

    setSending(false);
  };

  if (loading) return <div className="p-12 text-center">Loading reviews...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-brand-dark mb-8">Reputation Management</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 items-start">
                
                {/* Rating Box */}
                <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg min-w-[100px]">
                    <span className="text-3xl font-bold text-brand-dark">{review.rating}.0</span>
                    <div className="flex text-brand-gold mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-brand-dark">{review.guest_name || review.guest}</h3>
                            <p className="text-xs text-gray-400">Stay Verified • {review.booking_id || review.bookingId} • {new Date(review.created_at || review.date || Date.now()).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            review.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            review.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {review.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{review.comment || review.text}"</p>

                    {/* Existing admin reply */}
                    {review.admin_reply && (
                      <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600 border-l-2 border-brand-gold">
                          <strong>Response:</strong> {review.admin_reply}
                      </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    {review.status === 'Pending' && (
                        <>
                            <button onClick={async () => { await supabase.from('reviews').update({ status: 'Approved' }).eq('id', review.id); fetchReviews(); }} className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Approve">
                                <Check size={18} />
                            </button>
                            <button onClick={async () => { await supabase.from('reviews').update({ status: 'Rejected' }).eq('id', review.id); fetchReviews(); }} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Reject">
                                <X size={18} />
                            </button>
                        </>
                    )}

                    <button 
                        onClick={() => setReplyingId(review.id)}
                        className="p-2 bg-blue-50 text-brand-blue rounded hover:bg-blue-100" 
                        title="Reply via Email"
                    >
                        <MessageSquare size={18} />
                    </button>
                </div>

                {/* Reply box */}
                {replyingId === review.id && (
                  <div className="w-full mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fade-in">
                      <textarea 
                          className="w-full p-3 border rounded text-sm mb-2 focus:outline-none focus:border-brand-blue"
                          placeholder="Write your reply here..."
                          rows={3}
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2 justify-end">
                          <button onClick={() => { setReplyingId(null); setReplyText(''); }} className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
                          <button onClick={() => handleSendReply(review)} disabled={sending} className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded flex items-center gap-2">
                              {sending ? 'Sending...' : <><Send size={12}/> Send Reply</>}
                          </button>
                      </div>
                  </div>
                )}

            </div>
        ))}
      </div>
    </div>
  );
}
