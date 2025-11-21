"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Trash2, Plus } from 'lucide-react';
import { Coffee, Car, Map, Star, Wifi, Utensils } from 'lucide-react';

// Icon Mapper for UI
const ICON_MAP: any = { coffee: Coffee, car: Car, map: Map, star: Star, wifi: Wifi, food: Utensils };

export default function AdminAddons() {
  const supabase = createClient();
  const [addons, setAddons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, icon: 'star' });

  const fetchAddons = async () => {
    const { data } = await supabase.from('addons').select('*').order('id');
    if (data) setAddons(data);
    setLoading(false);
  };

  useEffect(() => { fetchAddons(); }, []);

  const handleAdd = async () => {
    if (!newItem.name) return;
    const { error } = await supabase.from('addons').insert([newItem]);
    if (!error) {
      setIsAdding(false);
      setNewItem({ name: '', description: '', price: 0, icon: 'star' });
      fetchAddons();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this add-on?')) {
      await supabase.from('addons').delete().eq('id', id);
      fetchAddons();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Manage Add-ons</h1>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold uppercase flex items-center gap-2">
              <Plus size={16}/> New Add-on
          </button>
      </div>

      {/* ADD FORM */}
      {isAdding && (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input type="text" placeholder="Name (e.g. Breakfast)" className="border p-2 rounded" onChange={e => setNewItem({...newItem, name: e.target.value})} />
                <input type="text" placeholder="Description" className="border p-2 rounded" onChange={e => setNewItem({...newItem, description: e.target.value})} />
                <input type="number" placeholder="Price (LKR)" className="border p-2 rounded" onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} />
                <select className="border p-2 rounded" onChange={e => setNewItem({...newItem, icon: e.target.value})}>
                    <option value="star">Select Icon</option>
                    <option value="coffee">Coffee</option>
                    <option value="car">Car</option>
                    <option value="map">Map</option>
                    <option value="wifi">Wifi</option>
                    <option value="food">Food</option>
                </select>
            </div>
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded text-xs font-bold">Save Item</button>
        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 gap-4">
          {addons.map(item => {
              const IconComp = ICON_MAP[item.icon] || Star;
              return (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded text-brand-blue">
                            <IconComp size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-brand-dark">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="font-bold text-brand-blue">LKR {item.price.toLocaleString()}</span>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                    </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}
