'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Plus, Trash2, Save, X, UploadCloud, Loader2, Edit2, Share2 } from 'lucide-react';

export default function AdminOffers() {
  const supabase = createClient();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    price_label: '',
    valid_until: '',
    image_file: null as File | null,
    existing_image: ''
  });

  const fetchOffers = async () => {
    const { data } = await supabase.from('offers').select('*').order('id', { ascending: true });
    if (data) setOffers(data);
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, []);

  // OPEN EDIT MODE
  const handleEdit = (offer: any) => {
      setEditingId(offer.id);
      setFormData({
          title: offer.title,
          subtitle: offer.subtitle || '',
          description: offer.description || '',
          price_label: offer.price_label || '',
          valid_until: offer.valid_until || '',
          image_file: null,
          existing_image: offer.image
      });
      setIsFormOpen(true);
  };

  // SAVE (Create or Update)
  const handleSave = async () => {
    if (!formData.title) return alert("Title required");
    setProcessing(true);

    try {
        let imageUrl = formData.existing_image;

        // 1. Upload New Image if selected
        if (formData.image_file) {
            const fileName = `${Date.now()}-${(formData.image_file as File).name}`;
            const { error: uploadError } = await supabase.storage
                .from('offer_images')
                .upload(fileName, formData.image_file as File);

            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('offer_images').getPublicUrl(fileName);
            imageUrl = data.publicUrl;
        }

        // 2. Database Operation
        if (editingId) {
            // UPDATE
            await supabase.from('offers').update({
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                price_label: formData.price_label,
                valid_until: formData.valid_until,
                image: imageUrl
            }).eq('id', editingId);
        } else {
            // INSERT
            await supabase.from('offers').insert([{
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                price_label: formData.price_label,
                valid_until: formData.valid_until,
                image: imageUrl,
                inclusions: ['Breakfast Included', 'Free Cancellation']
            }]);
        }

        // Reset
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({ title: '', subtitle: '', description: '', price_label: '', valid_until: '', image_file: null, existing_image: '' });
        fetchOffers();

    } catch (error: any) {
        alert("Error: " + (error?.message || String(error)));
    } finally {
        setProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
      if(confirm("Delete this offer?")) {
          await supabase.from('offers').delete().eq('id', id);
          fetchOffers();
      }
  };

  // --- SHARE LOGIC ---
  const handleShare = async (offer: any) => {
      if(!confirm(`Send "${offer.title}" to subscribers?`)) return;
      setProcessing(true);

      // 1. Get Subscribers
      const { data: subscribers } = await supabase.from('subscribers').select('email');
      
      if (!subscribers || subscribers.length === 0) {
          alert("No subscribers found!");
          setProcessing(false);
          return;
      }

      // 2. Send Emails Loop (test-send to admin email for demo)
      const testEmail = 'admin@heavenpalace.com';

      const emailHtml = `
        <div style="font-family: 'Helvetica', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
            <img src="${offer.image}" style="width: 100%; height: 250px; object-fit: cover;" />
            <div style="padding: 30px; text-align: center;">
                <h3 style="color: #c5a47e; letter-spacing: 2px; margin: 0;">EXCLUSIVE OFFER</h3>
                <h1 style="color: #004878; font-size: 32px; margin: 10px 0;">${offer.title}</h1>
                <p style="color: #666; font-size: 16px; line-height: 1.6;">${offer.description}</p>
                
                <div style="background: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 8px;">
                    <p style="margin: 0; font-weight: bold; color: #004878;">Limited Time Price</p>
                    <p style="margin: 5px 0 0 0; font-size: 28px; color: #c5a47e; font-weight: bold;">${offer.price_label}</p>
                </div>

                <a href="http://localhost:3000/offers" style="background-color: #004878; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
                    Claim This Offer
                </a>
            </div>
            <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
                Heaven Palace Hotel, Kandy
            </div>
        </div>
      `;

      try {
          await fetch('/api/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  to: 'asithau1221@gmail.com',
                  subject: `✨ New Offer: ${offer.title}`,
                  html: emailHtml
              })
          });

          alert(`Campaign sent to subscribers!`);
      } catch (e) {
          console.error('Send failed', e);
          alert('Failed to send campaign.');
      } finally {
          setProcessing(false);
      }
  };

  if(loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Manage Offers</h1>
          <button 
            onClick={() => { setEditingId(null); setIsFormOpen(!isFormOpen); }} 
            className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold uppercase flex items-center gap-2"
          >
              <Plus size={16}/> {isFormOpen ? 'Close Form' : 'New Offer'}
          </button>
      </div>

      {isFormOpen && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-8 animate-fade-in">
              <h3 className="font-bold mb-4 text-brand-dark">{editingId ? 'Edit Offer' : 'Create Campaign'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <input type="text" placeholder="Title" value={formData.title} className="w-full border p-2 rounded text-sm" onChange={e => setFormData({...formData, title: e.target.value})} />
                    <input type="text" placeholder="Subtitle" value={formData.subtitle} className="w-full border p-2 rounded text-sm" onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                    <input type="text" placeholder="Price Label" value={formData.price_label} className="w-full border p-2 rounded text-sm" onChange={e => setFormData({...formData, price_label: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <input type="text" placeholder="Valid Until" value={formData.valid_until} className="w-full border p-2 rounded text-sm" onChange={e => setFormData({...formData, valid_until: e.target.value})} />
                    <div className="border p-2 rounded text-sm">
                        <span className="text-gray-400 text-xs block mb-1">Image</span>
                        <input type="file" accept="image/*" onChange={e => setFormData({...formData, image_file: e.target.files?.[0] || null})} />
                    </div>
                  </div>
              </div>
              <textarea placeholder="Description..." value={formData.description} className="border p-2 rounded w-full mb-4 text-sm h-20" onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              
              <button onClick={handleSave} disabled={processing} className="bg-green-600 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2">
                  {processing ? <Loader2 className="animate-spin" size={14}/> : <Save size={14}/>} 
                  {processing ? 'Saving...' : 'Save Offer'}
              </button>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map(offer => (
              <div key={offer.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 relative">
                  <div className="w-32 h-32 relative rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <Image src={offer.image || '/images/home/offer-1.jpg'} alt={offer.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-brand-dark leading-tight">{offer.title}</h4>
                        <p className="text-xs text-brand-blue font-bold uppercase mt-1">{offer.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{offer.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                          <span className="bg-brand-gold/10 text-brand-gold text-[10px] font-bold px-2 py-1 rounded">{offer.price_label}</span>
                          
                          <div className="flex gap-2">
                              <button onClick={() => handleShare(offer)} className="p-1.5 text-blue-500 bg-blue-50 rounded hover:bg-blue-100" title="Share via Email">
                                  <Share2 size={14}/>
                              </button>
                              <button onClick={() => handleEdit(offer)} className="p-1.5 text-gray-500 bg-gray-100 rounded hover:bg-gray-200" title="Edit">
                                  <Edit2 size={14}/>
                              </button>
                              <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-red-500 bg-red-50 rounded hover:bg-red-100" title="Delete">
                                  <Trash2 size={14} />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
