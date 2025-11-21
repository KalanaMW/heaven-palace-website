'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Edit2, Loader2, Save, X, Plus, UploadCloud, Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminRooms() {
    const supabase = createClient();
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // Edit State - NOW HOLDS FULL OBJECT
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ name: '', price: 0, description: '', size: '', occupancy: '' }); 
    const [editImageFile, setEditImageFile] = useState<File | null>(null); // New file upload for edit
    const [saving, setSaving] = useState(false);

    // New Room / Upload States
    const [isAdding, setIsAdding] = useState(false);
    const [newRoom, setNewRoom] = useState({ name: '', price: 0 });
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const fetchRooms = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('rooms').select('*').order('id');
        if (data) setRooms(data as any[]);
        if (error) console.error('Error fetching rooms:', error);
        setLoading(false);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // --- IMAGE UPLOAD LOGIC ---
    const handleUploadAndSave = async () => {
        if (!file || !newRoom.name) return;
        setUploading(true);

        try {
            // 1. Upload Image to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('room_images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('room_images')
                .getPublicUrl(filePath);

            // 3. Insert Room Data to DB
            const { error: dbError } = await supabase
                .from('rooms')
                .insert([{ 
                    name: newRoom.name,
                    price: newRoom.price,
                    images: [publicUrl],
                    amenities: ['WiFi','AC'],
                    description: 'New Room Addition',
                    size: '30 m²'
                }]);

            if (dbError) throw dbError;

            setIsAdding(false);
            setFile(null);
            setNewRoom({ name: '', price: 0 });
            fetchRooms(); // Refresh List

        } catch (error) {
            console.error(error);
            alert('Error uploading room');
        } finally {
            setUploading(false);
        }
    };

    const startEditing = (room: any) => {
        setEditingId(room.id);
        setEditData({ 
            name: room.name, 
            price: room.price,
            description: room.description || '',
            size: room.size || '',
            occupancy: room.occupancy || ''
        });
        setEditImageFile(null);
    };

    // FULL UPDATE FUNCTION
    const handleUpdateRoom = async (room: any) => {
        setSaving(true);
        let imageUrl = room.images ? room.images[0] : null;

        // 1. If new image selected, upload it
        if (editImageFile) {
            const fileExt = editImageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('room_images')
                .upload(fileName, editImageFile);
            
            if (!uploadError) {
                const { data } = supabase.storage.from('room_images').getPublicUrl(fileName);
                imageUrl = data.publicUrl;
            }
        }

        // 2. Update Database
                const { error } = await supabase
                    .from('rooms')
                    .update({ 
                            name: editData.name, 
                            price: editData.price,
                            description: editData.description,
                            size: editData.size,
                            occupancy: editData.occupancy,
                            images: [imageUrl] // Updates the first image
                    })
                    .eq('id', room.id);

        if (!error) {
          setEditingId(null);
          fetchRooms();
        } else {
          alert('Update failed');
        }
        setSaving(false);
    };

    // DELETE FUNCTION
    const handleDeleteRoom = async (id: number) => {
        if(confirm("Are you sure? This cannot be undone.")) {
            const { error } = await supabase.from('rooms').delete().eq('id', id);
            if(!error) fetchRooms();
        }
    }

    if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto"/> Loading Inventory...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-brand-dark">Room Inventory (Live)</h1>
                    <button onClick={() => setIsAdding(!isAdding)} className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <Plus size={14} /> Add New Room
                    </button>
            </div>

            {/* ADD ROOM FORM */}
            {isAdding && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 animate-fade-in">
                    <h3 className="font-bold text-brand-dark mb-4">Add New Room</h3>
                    <div className="flex gap-4 items-end">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Room Name</label>
                            <input type="text" className="border p-2 rounded w-64" placeholder="e.g. Presidential Suite" onChange={e => setNewRoom({...newRoom, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Price (LKR)</label>
                            <input type="number" className="border p-2 rounded w-32" placeholder="0" onChange={e => setNewRoom({...newRoom, price: Number(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Image</label>
                            <input type="file" className="text-xs" onChange={e => setFile(e.target.files?.[0] || null)} />
                        </div>
                        <button onClick={handleUploadAndSave} disabled={uploading} className="bg-green-600 text-white px-4 py-2.5 rounded text-xs font-bold flex items-center gap-2 hover:bg-green-700 disabled:opacity-50">
                            {uploading ? <Loader2 className="animate-spin" size={14}/> : <UploadCloud size={14}/>} {uploading ? 'Uploading...' : 'Save Room'}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                        <thead className="bg-brand-dark text-white font-bold uppercase tracking-wider text-xs">
                                <tr>
                                        <th className="p-4">Room Type</th>
                                        <th className="p-4">Base Price (LKR)</th>
                                        <th className="p-4 text-right">Actions</th>
                                </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                                {rooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-gray-50">
                                                <td className="p-4">
                                                        {editingId === room.id ? (
                                                            <div className="flex flex-col gap-3">
                                                                <input 
                                                                    type="text" 
                                                                    value={editData.name} 
                                                                    onChange={e => setEditData({...editData, name: e.target.value})}
                                                                    className="border p-2 rounded w-full font-bold"
                                                                />
                                                                <textarea 
                                                                    value={editData.description}
                                                                    onChange={e => setEditData({...editData, description: e.target.value})}
                                                                    className="border p-2 rounded w-full text-xs h-20"
                                                                    placeholder="Description"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <input type="text" value={editData.size} onChange={e => setEditData({...editData, size: e.target.value})} className="border p-2 rounded w-1/2 text-xs" placeholder="Size (e.g. 35 m²)" />
                                                                    <input type="text" value={editData.occupancy} onChange={e => setEditData({...editData, occupancy: e.target.value})} className="border p-2 rounded w-1/2 text-xs" placeholder="Occupancy" />
                                                                </div>
                                                                <div className="flex items-center gap-2 text-xs">
                                                                    <span className="text-gray-500">Change Image:</span>
                                                                    <input type="file" onChange={e => setEditImageFile(e.target.files?.[0] || null)} />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-200 shrink-0">
                                                                    {room.images && <Image src={room.images[0]} alt={room.name} fill className="object-cover" />}
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-brand-dark">{room.name}</span>
                                                                    <div className="text-xs text-gray-500">{room.size} • {room.occupancy}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                </td>
                                                                                                <td className="p-4 font-mono text-brand-blue font-bold text-lg">
                                                                                                        {editingId === room.id ? (
                                                                                                            <input 
                                                                                                                type="number" 
                                                                                                                value={editData.price}
                                                                                                                onChange={(e) => setEditData({...editData, price: Number(e.target.value)})}
                                                                                                                className="border p-2 rounded w-32"
                                                                                                            />
                                                                                                        ) : (
                                                                                                            `LKR ${room.price.toLocaleString()}`
                                                                                                        )}
                                                                                                </td>
                                                <td className="p-4 text-right flex justify-end gap-2">
                                                                                                                {editingId === room.id ? (
                                                                                                                    <>
                                                                                                                        <button onClick={() => handleUpdateRoom(room)} disabled={saving} className="flex items-center gap-1 px-3 py-2 bg-green-100 hover:bg-green-200 rounded text-xs font-bold text-green-700">
                                                                                                                            {saving ? <Loader2 size={12} className="animate-spin"/> : <Save size={12} />} Save
                                                                                                                        </button>
                                                                                                                        <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-600">
                                                                                                                            <X size={12} /> Cancel
                                                                                                                        </button>
                                                                                                                    </>
                                                                                                                ) : (
                                                                                                                    <>
                                                                                                                        <button onClick={() => startEditing(room)} className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-600">
                                                                                                                                <Edit2 size={12} /> Edit
                                                                                                                        </button>
                                                                                                                        <button onClick={() => handleDeleteRoom(room.id)} className="p-2 text-red-400 hover:text-red-600">
                                                                                                                                <Trash2 size={16} />
                                                                                                                        </button>
                                                                                                                    </>
                                                                                                                )}
                                                </td>
                                        </tr>
                                ))}
                        </tbody>
                </table>
            </div>
        </div>
    );
}
