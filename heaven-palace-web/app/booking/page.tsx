'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Coffee, Car, Map as MapIcon, Edit2, Star, Wifi, Utensils } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- MOCK DATA (Same as Details Page) ---
const ROOMS_DATA = [
  { id: 1, name: 'Standard Double', price: 15000, image: '/images/accommodation/room-standard.jpg' },
  { id: 2, name: 'Deluxe Queen', price: 18500, image: '/images/accommodation/room-deluxe.jpg' },
  { id: 3, name: 'Deluxe with Bath', price: 24000, image: '/images/accommodation/room-bath.jpg' },
  { id: 4, name: 'Family Suite', price: 28000, image: '/images/accommodation/room-family.jpg' },
];

const ADDONS = [
    { id: 'bf', name: 'Buffet Breakfast', price: 1500, icon: Coffee, desc: 'Traditional Sri Lankan & Western' },
    { id: 'pickup', name: 'Airport Pickup (CMB)', price: 25000, icon: Car, desc: 'Private AC Car from Katunayake' },
    { id: 'tour', name: 'Kandy City Tour', price: 5000, icon: MapIcon, desc: 'Temple, Lake & Viewpoint' }
];

// We need to wrap useSearchParams in Suspense for Next.js build optimization
function BookingContent() {
  const searchParams = useSearchParams();
  
  // --- STATE ---
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
    const [addonsList, setAddonsList] = useState<any[]>([]); // NEW STATE

    const supabase = createClient();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', notes: '' });

  // Initialize logic: Check URL for room ID
  useEffect(() => {
    const roomParam = searchParams.get('room');
    if (roomParam) {
        setSelectedRoomId(Number(roomParam));
        // If room is pre-selected, we assume step 1 is just dates, we don't need a room selection step
    }
  }, [searchParams]);

    // Fetch addons from Supabase
    useEffect(() => {
        const getAddons = async () => {
            const { data } = await supabase.from('addons').select('*').order('id');
            if (data) setAddonsList(data);
        };
        getAddons();
    }, []);

    // Handle booking confirmation and persist to DB
    const handleConfirmBooking = async () => {
        setIsSubmitting(true);

        // 1. Get current user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('Please login to complete your booking');
            setIsSubmitting(false);
            return;
        }

        // 2. Insert booking and get inserted row back
        const { data: booking, error } = await supabase
            .from('bookings')
            .insert([
                {
                    user_id: user.id,
                    room_id: selectedRoomId,
                    check_in: dates.checkIn,
                    check_out: dates.checkOut,
                    guests: guests,
                    total_price: total,
                    status: 'Pending'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error(error);
            alert('Booking failed. Please try again.');
        } else {
            // 3. SEND EMAIL (non-blocking)
            try {
                await fetch('/api/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: guestDetails.email || user.email,
                        subject: `Booking Confirmation #${String(booking.id).slice(0,8)}`,
                        html: `
                            <h1>Thank you for booking with Heaven Palace!</h1>
                            <p>Dear ${guestDetails.name || user.user_metadata?.full_name || ''},</p>
                            <p>We have received your booking request for <strong>${selectedRoom?.name || 'your selected room'}</strong>.</p>
                            <p><strong>Dates:</strong> ${dates.checkIn} to ${dates.checkOut}</p>
                            <p><strong>Total:</strong> LKR ${total.toLocaleString()}</p>
                            <p>Status: <strong>Pending Approval</strong></p>
                            <br/>
                            <p>Our team will contact you shortly via WhatsApp (${guestDetails.phone}) to confirm details.</p>
                        `
                    })
                });
            } catch (emailError) {
                console.error('Email sending failed', emailError);
                // Continue — do not block on email failures
            }

            setStep(4);
            // Optionally refresh or navigate
            router.refresh();
        }

        setIsSubmitting(false);
    };

  const selectedRoom = ROOMS_DATA.find(r => r.id === selectedRoomId);

  // Calculation Logic
  const start = dates.checkIn ? new Date(dates.checkIn) : null;
  const end = dates.checkOut ? new Date(dates.checkOut) : null;
  const nights = (start && end && end > start) 
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) 
      : 1;
  
    const roomPrice = selectedRoom?.price || 0;
    let total = roomPrice * nights;

    // Add-ons pricing computed from fetched addonsList
    selectedAddons.forEach((addonId) => {
        const addon = addonsList.find(a => a.id === addonId);
        if (!addon) return;
        // If the addon is breakfast (coffee icon) charge per guest per night
        if (addon.icon === 'coffee') {
            total += (addon.price * guests * nights);
        } else {
            // Otherwise charge once per booking
            total += addon.price;
        }
    });


  return (
    <>
        {/* DYNAMIC HERO SECTION BASED ON ROOM */}
        <section className="relative h-[40vh] w-full flex items-end">
            <Image 
                // Use selected room image or generic hero if none selected
                src={selectedRoom ? selectedRoom.image : "/images/home/hero-bg.jpg"} 
                alt="Booking Hero" 
                fill 
                className="object-cover brightness-50"
            />
            <div className="relative z-10 container mx-auto px-6 pb-12 text-white">
                <h1 className="text-4xl md:text-5xl font-serif mb-2">
                    {step === 4 ? "Booking Confirmed" : "Secure Your Stay"}
                </h1>
                {selectedRoom && (
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-gold">
                        <Check size={16} /> You are booking: {selectedRoom.name}
                    </div>
                )}
            </div>
        </section>

        <div className="bg-gray-50 min-h-screen pb-24">
            <div className="container mx-auto px-6 py-12">
                
                {/* PROGRESS STEPS */}
                {step < 4 && (
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex justify-between items-center relative">
                            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                            
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}>1</div>
                            
                            {/* If room is NOT pre-selected, we show Room Step, otherwise skip visually or keep it active */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}>2</div>
                            
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-brand-blue text-white' : 'bg-gray-200'}`}>3</div>
                        </div>
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mt-2">
                            <span>Dates</span>
                            <span>Add-ons</span>
                            <span>Details</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    
                    {/* LEFT COLUMN: FORMS */}
                    <div className="flex-1 bg-white p-8 shadow-lg rounded-xl h-fit">
                        
                        {/* STEP 1: DATES & ROOM (If not selected) */}
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-serif text-brand-dark mb-6">Date & Selection</h2>
                                
                                {/* If Room NOT selected via URL, show dropdown */}
                                {!selectedRoomId && (
                                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Room</label>
                                        <select 
                                            className="w-full border p-3 rounded bg-white"
                                            onChange={(e) => setSelectedRoomId(Number(e.target.value))}
                                        >
                                            <option value="">-- Choose a Room --</option>
                                            {ROOMS_DATA.map(r => (
                                                <option key={r.id} value={r.id}>{r.name} (LKR {r.price})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Check-in</label>
                                        <input 
                                            type="date" 
                                            className="w-full border p-4 rounded focus:border-brand-blue outline-none"
                                            onChange={(e) => setDates({...dates, checkIn: e.target.value})}
                                            value={dates.checkIn}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Check-out</label>
                                        <input 
                                            type="date" 
                                            className="w-full border p-4 rounded focus:border-brand-blue outline-none"
                                            onChange={(e) => setDates({...dates, checkOut: e.target.value})}
                                            value={dates.checkOut}
                                        />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Guests</label>
                                    <select 
                                        className="w-full border p-4 rounded focus:border-brand-blue outline-none"
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                    >
                                        <option value={1}>1 Adult</option>
                                        <option value={2}>2 Adults</option>
                                        <option value={3}>2 Adults + 1 Child</option>
                                        <option value={4}>Family (4 Pax)</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={() => setStep(2)}
                                    disabled={!dates.checkIn || !dates.checkOut || !selectedRoomId}
                                    className="w-full bg-brand-blue text-white py-4 font-bold uppercase tracking-widest hover:bg-blue-800 disabled:bg-gray-300 transition"
                                >
                                    Continue to Add-ons
                                </button>
                            </div>
                        )}

                        {/* STEP 2: ADD-ONS (Replaced Room Selection) */}
                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-serif text-brand-dark mb-6">Enhance your stay</h2>
                                <div className="space-y-4 mb-8">
                                    {addonsList.map((addon) => {
                                        const IconComp = addon.icon === 'coffee' ? Coffee : (addon.icon === 'car' ? Car : (addon.icon === 'map' ? MapIcon : (addon.icon === 'wifi' ? Wifi : (addon.icon === 'food' ? Utensils : Star))));
                                        return (
                                            <label key={addon.id} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-brand-blue transition">
                                                <div className="flex items-center gap-4">
                                                    <input 
                                                        type="checkbox" 
                                                        className="w-5 h-5 accent-brand-blue rounded"
                                                        checked={selectedAddons.includes(addon.id)}
                                                        onChange={(e) => {
                                                            if(e.target.checked) setSelectedAddons([...selectedAddons, addon.id]);
                                                            else setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                                                        }}
                                                    />
                                                    <div className="bg-blue-50 p-2 rounded text-brand-blue">
                                                        <IconComp size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-brand-dark">{addon.name}</p>
                                                        <p className="text-xs text-gray-500">{addon.description || addon.desc}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-bold text-gray-600">+ {addon.price.toLocaleString()}</span>
                                            </label>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(2)} className="w-1/3 border border-gray-300 py-4 font-bold uppercase tracking-widest text-xs">Back</button>
                                    <button onClick={() => setStep(3)} className="w-2/3 bg-brand-blue text-white py-4 font-bold uppercase tracking-widest hover:bg-blue-800">Continue to Details</button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: DETAILS */}
                        {step === 3 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-serif text-brand-dark mb-6">Guest Information</h2>
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full border p-3 rounded focus:border-brand-blue outline-none"
                                            placeholder="Mr. John Doe"
                                            value={guestDetails.name}
                                            onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                                            <input 
                                                type="email" 
                                                className="w-full border p-3 rounded focus:border-brand-blue outline-none"
                                                placeholder="john@example.com"
                                                value={guestDetails.email}
                                                onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone (WhatsApp)</label>
                                            <input 
                                                type="tel" 
                                                className="w-full border p-3 rounded focus:border-brand-blue outline-none"
                                                placeholder="+94 77 ..."
                                                value={guestDetails.phone}
                                                onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Special Requests</label>
                                        <textarea 
                                            className="w-full border p-3 rounded focus:border-brand-blue outline-none h-24"
                                            placeholder="I would like a quiet room, vegan breakfast..."
                                            value={guestDetails.notes}
                                            onChange={(e) => setGuestDetails({...guestDetails, notes: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(2)} className="w-1/3 border border-gray-300 py-4 font-bold uppercase tracking-widest text-xs">Back</button>
                                    <button onClick={handleConfirmBooking} disabled={isSubmitting} className="w-2/3 bg-brand-blue text-white py-4 font-bold uppercase tracking-widest hover:bg-blue-800 disabled:opacity-60">
                                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 4 && (
                            <div className="animate-fade-in text-center py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={40} className="text-green-600" />
                                </div>
                                <h2 className="text-3xl font-serif text-brand-dark mb-2">Booking Request Sent!</h2>
                                <p className="text-gray-500 mb-8">Reference ID: #HP-{Math.floor(Math.random() * 10000)}</p>
                                
                                <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                                    Thank you {guestDetails.name}. We have sent a confirmation email to <strong>{guestDetails.email}</strong>. 
                                    Our team will contact you via WhatsApp shortly to arrange the 50% advance payment.
                                </p>

                                <Link href="/" className="inline-block bg-brand-dark text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded hover:bg-black">
                                    Return Home
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: SUMMARY (Always Visible) */}
                    {step < 4 && selectedRoom && (
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white p-6 shadow-lg rounded-xl sticky top-24 border border-gray-100">
                                <div className="flex justify-between items-center border-b pb-4 mb-4">
                                    <h3 className="font-serif font-bold text-lg text-brand-dark">Your Reservation</h3>
                                    {/* Link back to change room */}
                                    <Link href="/accommodation" className="text-xs text-brand-blue underline font-bold flex items-center gap-1">
                                        Change <Edit2 size={10}/>
                                    </Link>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0">
                                        <Image src={selectedRoom.image} alt="Room" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-dark">{selectedRoom.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{guests} Guests</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 text-xs uppercase">Check-in</span>
                                        <span className="font-bold text-brand-dark">{dates.checkIn || 'Select Date'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 text-xs uppercase">Check-out</span>
                                        <span className="font-bold text-brand-dark">{dates.checkOut || 'Select Date'}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
                                    <div className="flex justify-between">
                                        <span>Room ({nights} nights)</span>
                                        <span>{(roomPrice * nights).toLocaleString()}</span>
                                    </div>
                                    {selectedAddons.map(addonId => {
                                        const addon = addonsList.find(a => a.id === addonId);
                                        if(!addon) return null;
                                        const price = (addon.icon === 'coffee') ? (addon.price * guests * nights) : addon.price;
                                        return (
                                            <div key={addonId} className="flex justify-between text-brand-blue">
                                                <span>{addon.name}</span>
                                                <span>{price.toLocaleString()}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-between border-t border-dashed pt-3 mt-3">
                                        <span className="font-bold text-brand-dark text-lg">Total (LKR)</span>
                                        <span className="font-bold text-brand-blue text-xl">{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
  );
}

export default function BookingPage() {
  return (
    <main className="font-sans">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
