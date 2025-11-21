"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Award,
    Calendar,
    LogOut,
    Camera,
    Edit2,
    Save,
    MapPin,
    Star,
    ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    // --- STATE ---
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null); // Placeholder for avatar
    const [userInfo, setUserInfo] = useState({
        name: 'Mr. Aravinda Perera',
        email: 'aravinda.p@example.com',
        phone: '+94 77 123 4567',
        address: 'Colombo, Sri Lanka'
    });

    // Mock Booking Data
    const bookings = [
        {
            id: 'HP-8821',
            date: 'Nov 21 - 23, 2025',
            room: 'Deluxe Queen Mountain View',
            status: 'Upcoming',
            price: 'LKR 37,000',
            img: '/images/accommodation/room-deluxe.jpg'
        },
        {
            id: 'HP-7743',
            date: 'Aug 14 - 16, 2025',
            room: 'Standard Double Room',
            status: 'Completed',
            price: 'LKR 30,000',
            img: '/images/accommodation/room-standard.jpg'
        }
    ];

    // Loyalty Logic
    const currentPoints = 12500;
    const nextTierPoints = 15000;
    const progress = (currentPoints / nextTierPoints) * 100;

    // Handle Image Upload (Visual Only)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setAvatar(url);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* --- HERO SECTION WITH DIMMED BACKGROUND --- */}
            <section className="relative h-[450px] w-full">
                <Image
                    src="/images/home/hero-bg.jpg"
                    alt="Profile Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-gray-50/90"></div>

                <div className="absolute inset-0 container mx-auto px-6 pt-32 flex flex-col items-center md:items-start">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-full">

                        {/* Avatar Circle with Edit */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden relative bg-brand-gold/20 backdrop-blur-sm shadow-2xl">
                                {avatar ? (
                                    // next/image expects a string path or an imported static image; using a blob URL is fine for preview
                                    // but we render with a normal img fallback for blob URLs
                                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-white font-bold">
                                        {userInfo.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {/* Edit Icon Overlay */}
                            <label className="absolute bottom-0 right-0 bg-brand-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition shadow-lg">
                                <Camera size={16} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>

                        <div className="text-center md:text-left text-white">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <span className="bg-brand-gold/20 border border-brand-gold/50 text-brand-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                    Gold Member
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{userInfo.name}</h1>
                            <p className="text-white/70 text-sm flex items-center justify-center md:justify-start gap-2">
                                <MapPin size={14} /> {userInfo.address}
                            </p>
                        </div>

                        <div className="ml-auto mt-6 md:mt-0">
                            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition backdrop-blur-sm">
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT OVERLAP --- */}
            <div className="container mx-auto px-6 pb-24 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COL: LOYALTY & ACTIONS */}
                    <div className="space-y-8">

                        {/* Loyalty Card */}
                        <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10">
                            {/* Deco BG */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            <div className="relative z-10">
                                <h3 className="font-serif text-lg mb-1">Relax & Reward</h3>
                                <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Membership Status</p>

                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-brand-gold">{currentPoints.toLocaleString()}</span>
                                    <span className="text-sm text-gray-400 mb-1">pts</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                                    <div className="bg-gradient-to-r from-brand-gold to-yellow-200 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                    You are only <strong>{(nextTierPoints - currentPoints).toLocaleString()} points</strong> away from Platinum Tier.
                                    Unlock free spa treatments and late checkout.
                                </p>

                                <button className="w-full py-3 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition flex justify-center items-center gap-2">
                                    <Award size={16} /> View Rewards Catalog
                                </button>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h4 className="font-bold text-brand-dark text-sm uppercase tracking-widest mb-4">Quick Actions</h4>
                            <div className="space-y-2">
                                <Link href="/booking" className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-600 font-medium flex justify-between items-center">
                                    Book a Room <ChevronRight size={16} className="text-gray-400" />
                                </Link>
                                <Link href="/dining" className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-600 font-medium flex justify-between items-center">
                                    Reserve a Table <ChevronRight size={16} className="text-gray-400" />
                                </Link>
                                <Link href="/contact" className="block w-full text-left p-3 rounded-lg hover:bg.gray-50 text-sm text-gray-600 font-medium flex justify-between items-center">
                                    Contact Concierge <ChevronRight size={16} className="text-gray-400" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: DETAILS & BOOKINGS */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Personal Details Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-xl text-brand-dark">Personal Information</h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition"
                                >
                                    {isEditing ? (
                                        <>
                                            <Save size={14} /> Save Changes
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 size={14} /> Edit Details
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                    {isEditing ? (
                                        <input type="text" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} className="w-full border p-2 rounded text-brand-dark font-medium focus:border-brand-blue outline-none" />
                                    ) : (
                                        <p className="text-brand-dark font-medium border border-transparent p-2">{userInfo.name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <p className="text-gray-500 font-medium border border-transparent p-2 bg-gray-50 rounded cursor-not-allowed">{userInfo.email} <span className="text-[10px] text-brand-blue ml-2">(Verified)</span></p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                    {isEditing ? (
                                        <input type="text" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="w-full border p-2 rounded text-brand-dark font-medium focus:border-brand-blue outline-none" />
                                    ) : (
                                        <p className="text-brand-dark font-medium border border-transparent p-2">{userInfo.phone}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</label>
                                    {isEditing ? (
                                        <input type="text" value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} className="w-full border p-2 rounded text-brand-dark font-medium focus:border-brand-blue outline-none" />
                                    ) : (
                                        <p className="text-brand-dark font-medium border border-transparent p-2">{userInfo.address}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bookings List */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="font-serif text-xl text-brand-dark mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-brand-gold" /> My Stays
                            </h3>

                            <div className="space-y-6">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        {/* Room Image Thumbnail */}
                                        <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                                            <Image src={booking.img} alt="Room" fill className="object-cover" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-brand-dark text-lg">{booking.room}</h4>
                                                    <p className="text-sm text-gray-500">{booking.date}</p>
                                                    <p className="text-xs text-gray-400 mt-1">Ref: {booking.id}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        booking.status === 'Upcoming' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-green-50 text-green-700 border border-green-100'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                    <p className="text-brand-blue font-bold mt-2 text-sm">{booking.price}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 flex gap-3">
                                                {booking.status === 'Upcoming' ? (
                                                    <>
                                                        <button className="px-4 py-2 border border-brand-dark text-brand-dark rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark hover:text-white transition">
                                                            Manage Booking
                                                        </button>
                                                        <button className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition">
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="px-4 py-2 bg-brand-blue text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition">
                                                            Book Again
                                                        </button>
                                                        {/* ADD REVIEW BUTTON */}
                                                        <Link href="/feedback" className="px-4 py-2 border border-brand-gold text-brand-gold rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition flex items-center gap-2">
                                                            <Star size={14} /> Write Review
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
