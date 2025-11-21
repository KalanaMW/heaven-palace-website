'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Save, X, UploadCloud, Loader2, Share2 } from 'lucide-react';

export default function AdminOffers() {
  const supabase = createClient();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    price_label: '',
    image_file: null as File | null
  });

  // Fetch
  const fetchOffers = async () => {
    const { data } = await supabase.from('offers').select('*').order('id');
    if (data) setOffers(data);
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, []);

  // Create Offer
  const handleCreate = async () => {
    if (!formData.title || !formData.image_file) return alert("Title and Image required");
    setUploading(true);

    // 1. Upload Image
    const fileName = `${Date.now()}-${formData.image_file.name}`;
    const { error: uploadError } = await supabase.storage
        .from('offer_images')
        .upload(fileName, formData.image_file);

    if (uploadError) {
        alert("Image upload failed");
        setUploading(false);
        return;
    }

    const { data: { publicUrl } } = supabase.storage.from('offer_images').getPublicUrl(fileName);

    // 2. Insert Data
    const { error: dbError } = await supabase.from('offers').insert([{
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        price_label: formData.price_label,
        image: publicUrl,
        inclusions: ['Breakfast', 'WiFi'] // Default inclusions
    }]);

    if (!dbError) {
        setFormData({ title: '', subtitle: '', description: '', price_label: '', image_file: null });
        setIsAdding(false);
        fetchOffers();
    }
    setUploading(false);
  };

  // Delete Offer
  const handleDelete = async (id: number) => {
      if(confirm("Delete this offer?")) {
          await supabase.from('offers').delete().eq('id', id);
          fetchOffers();
      }
  };

    // Share/Email Offer to subscribers (uses /api/send)
    const handleShareOffer = async (offer: any) => {
        if (!confirm(`Send "${offer.title}" to all subscribers?`)) return;

        const { data: subscribers } = await supabase.from('subscribers').select('email');
        if (!subscribers || subscribers.length === 0) return alert('No subscribers found!');

        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <img src="${offer.image}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;" />
                    <h1 style="color:#004878; margin-top:20px;">${offer.title}</h1>
                    <h3 style="color:#c5a47e; text-transform:uppercase;">${offer.subtitle}</h3>
                    <p style="font-size:16px; line-height:1.6;">${offer.description}</p>
                    <div style="background:#f9f9f9; padding:15px; text-align:center; margin:20px 0;">
                            <span style="font-size:24px; font-weight:bold; color:#004878;">${offer.price_label}</span>
                    </div>
                    <a href="http://localhost:3000/offers" style="display:block; background:#004878; color:white; text-decoration:none; text-align:center; padding:15px; border-radius:5px; font-weight:bold;">Book Now</a>
            </div>
        `;

        // For free testing tier, send to one admin address; production can send to subscribers.map(s=>s.email)
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: 'asithau1221@gmail.com',
                subject: `Exclusive Deal: ${offer.title}`,
                html: emailHtml
            })
        });

        if (response.ok) alert('Campaign sent successfully!');
        else alert('Failed to send campaign.');
    };

  if(loading) return <div className="p-12 text-center">Loading Offers...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Manage Offers</h1>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold uppercase flex items-center gap-2">
              <Plus size={16}/> New Offer
          </button>
      </div>

      {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-8">
              <h3 className="font-bold mb-4">Create New Offer</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Title (e.g. Romantic Escape)" className="border p-2 rounded" onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Subtitle (e.g. For Couples)" className="border p-2 rounded" onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                  <input type="text" placeholder="Price Label (e.g. 15% OFF)" className="border p-2 rounded" onChange={e => setFormData({...formData, price_label: e.target.value})} />
                  <input type="file" className="border p-2 rounded" onChange={e => setFormData({...formData, image_file: e.target.files?.[0] || null})} />
              </div>
              <textarea placeholder="Description" className="border p-2 rounded w-full mb-4" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              <button onClick={handleCreate} disabled={uploading} className="bg-green-600 text-white px-6 py-2 rounded font-bold flex gap-2">
                  {uploading && <Loader2 className="animate-spin" />} Save Offer
              </button>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map(offer => (
              <div key={offer.id} className="bg-white p-4 rounded-xl shadow border flex gap-4">
                  <div className="w-32 h-32 relative rounded-lg overflow-hidden shrink-0">
                      <Image src={offer.image || '/images/home/offer-1.jpg'} alt={offer.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                      <h4 className="font-bold text-brand-dark">{offer.title}</h4>
                      <p className="text-xs text-brand-blue font-bold uppercase">{offer.subtitle}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{offer.description}</p>
                      <div className="flex justify-between items-center mt-4">
                                                    <span className="bg-brand-gold text-white text-xs px-2 py-1 rounded">{offer.price_label}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleShareOffer(offer)} className="text-blue-400 hover:text-blue-600 mr-2" title="Share with Subscribers">
                                                            <Share2 size={18} />
                                                        </button>
                                                        <button onClick={() => handleDelete(offer.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                                                    </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
