'use client';

import Image from 'next/image';
import { Edit2, Power } from 'lucide-react';

const ROOMS_ADMIN = [
    { id: 1, name: "Standard Double", price: 15000, stock: 5, status: "Active", image: "/images/home/room-2.jpg" },
    { id: 2, name: "Deluxe Queen", price: 18500, stock: 3, status: "Active", image: "/images/home/room-1.jpg" },
    { id: 3, name: "Deluxe with Bath", price: 24000, stock: 2, status: "Maintenance", image: "/images/accommodation/room-bath.jpg" },
];

export default function AdminRooms() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Room Inventory</h1>
          <button className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider">
              + Add New Room Type
          </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-brand-dark text-white font-bold uppercase tracking-wider text-xs">
                <tr>
                    <th className="p-4">Room Type</th>
                    <th className="p-4">Base Price (LKR)</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {ROOMS_ADMIN.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                        <td className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 relative rounded overflow-hidden">
                                    <Image src={room.image} alt={room.name} fill className="object-cover" />
                                </div>
                                <span className="font-bold text-brand-dark">{room.name}</span>
                            </div>
                        </td>
                        <td className="p-4 font-mono text-brand-blue font-bold">
                            {room.price.toLocaleString()}
                        </td>
                        <td className="p-4">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{room.stock} Units</span>
                        </td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                room.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {room.status}
                            </span>
                        </td>
                        <td className="p-4 text-right flex justify-end gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-600">
                                <Edit2 size={12} /> Edit Price
                            </button>
                            <button className={`p-1.5 rounded text-white ${room.status === 'Active' ? 'bg-red-400 hover:bg-red-500' : 'bg-green-400 hover:bg-green-500'}`}>
                                <Power size={14} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
