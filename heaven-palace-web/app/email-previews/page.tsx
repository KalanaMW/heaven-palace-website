'use client';

import { useState } from 'react';
import { Mail, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type EmailTemplate = {
    id: string;
    category: string;
    subject: string;
    component: React.ReactNode;
};

// --- SHARED EMAIL COMPONENTS (Visual Simulation) ---
const EmailContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-100 p-8 min-h-[600px] flex justify-center font-sans">
        <div className="bg-white w-full max-w-[600px] shadow-sm overflow-hidden">
            {children}
        </div>
    </div>
);

const EmailHeader = () => (
    <div className="bg-[#004878] p-6 text-center">
        <h1 className="text-white font-serif text-2xl tracking-widest">HEAVEN PALACE</h1>
    </div>
);

const EmailFooter = () => (
    <div className="bg-[#1a1a1a] p-6 text-center text-gray-400 text-xs">
        <p className="mb-4">No. 39/1, Maragahawela Road, Kandy, Sri Lanka</p>
        <div className="flex justify-center gap-4 mb-4 text-white">
            <span>Facebook</span> • <span>Instagram</span> • <span>Website</span>
        </div>
        <p>You are receiving this email because you subscribed or booked with us.</p>
        <p className="underline mt-2 cursor-pointer">Unsubscribe</p>
    </div>
);

const EmailButton = ({ text }: { text: string }) => (
    <button className="bg-[#c5a47e] text-white py-3 px-6 text-sm font-bold uppercase tracking-widest mt-4 hover:bg-[#b08d66]">
        {text}
    </button>
);

// --- TEMPLATE 1: WELCOME SERIES ---

const WelcomeEmail1 = () => (
    <EmailContainer>
        <EmailHeader />
        <div className="relative h-48 bg-gray-300">
            {/* Placeholder for Hero Image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-blue-50">HERO IMAGE (Welcome)</div>
        </div>
        <div className="p-8 text-gray-700">
            <h2 className="text-2xl font-serif text-[#004878] mb-4">Welcome to Your Serene Escape</h2>
            <p className="mb-4">Dear [Guest Name],</p>
            <p className="mb-6 leading-relaxed">
                Thank you for joining the Heaven Palace family. We are thrilled to share our world of wellness and authentic Sri Lankan hospitality with you.
            </p>
            <div className="bg-blue-50 p-6 border-l-4 border-[#004878] mb-6">
                <h3 className="font-bold text-[#004878] mb-2">A Special Gift For You</h3>
                <p className="text-sm mb-2">Use code <strong>WELCOME10</strong> for 10% off your first booking.</p>
            </div>
            <EmailButton text="Book Your Stay" />
        </div>
        <EmailFooter />
    </EmailContainer>
);

const WelcomeEmail2 = () => (
    <EmailContainer>
        <EmailHeader />
        <div className="p-8 text-gray-700">
            <h2 className="text-2xl font-serif text-[#004878] mb-4">Discover Kandy's Hidden Gem</h2>
            <p className="mb-4">Did you know Heaven Palace is built on the principles of sustainability and community?</p>
            <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 p-4 text-center rounded">
                    <span className="block font-bold text-[#c5a47e]">Eco-Friendly</span>
                    <span className="text-xs">Solar Powered & Plastic Free</span>
                </div>
                <div className="bg-gray-50 p-4 text-center rounded">
                    <span className="block font-bold text-[#c5a47e]">Local Love</span>
                    <span className="text-xs">Farm-to-Table Dining</span>
                </div>
            </div>
            <p className="mb-6">Experience a stay that feels good and does good.</p>
            <div className="text-center">
                <a href="#" className="text-[#004878] underline text-sm">Take a Virtual Tour</a>
            </div>
        </div>
        <EmailFooter />
    </EmailContainer>
);

// --- TEMPLATE 2: BOOKING CONFIRMATION ---

const BookingConfirmation = () => (
    <EmailContainer>
        <EmailHeader />
        <div className="bg-green-50 p-4 text-center border-b border-green-100">
            <div className="flex justify-center text-green-600 mb-2"><Star size={24} fill="currentColor" /></div>
            <h2 className="text-xl font-bold text-green-800">Booking Confirmed!</h2>
            <p className="text-sm text-green-700">Ref: #HP-2025-8892</p>
        </div>
        <div className="p-8">
            <p className="mb-6">Dear [Guest Name], <br/> We can't wait to welcome you to paradise.</p>
            
            <div className="bg-gray-50 p-6 rounded mb-6">
                <div className="flex items-start gap-4 mb-4">
                    <Calendar className="text-[#c5a47e] shrink-0" />
                    <div>
                        <p className="font-bold text-sm uppercase">Check-in</p>
                        <p>Dec 15, 2025 (2:00 PM)</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                    <Calendar className="text-[#c5a47e] shrink-0" />
                    <div>
                        <p className="font-bold text-sm uppercase">Check-out</p>
                        <p>Dec 18, 2025 (11:00 AM)</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="text-[#c5a47e] shrink-0" />
                    <div>
                        <p className="font-bold text-sm uppercase">Room Type</p>
                        <p>Deluxe Double with Bath</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
                <span className="font-bold">Total Paid</span>
                <span className="text-xl font-serif text-[#004878]">LKR 45,000</span>
            </div>

            <div className="mt-8 flex gap-4">
                <EmailButton text="Manage Booking" />
                <button className="border border-gray-300 text-gray-600 py-3 px-6 text-sm font-bold uppercase tracking-widest mt-4">Add to Calendar</button>
            </div>
        </div>
        <EmailFooter />
    </EmailContainer>
);

const PreArrival = () => (
    <EmailContainer>
        <EmailHeader />
        <div className="p-8">
            <h2 className="text-xl font-serif text-[#004878] mb-2">See you in 7 days!</h2>
            <p className="text-sm text-gray-500 mb-6">The countdown begins.</p>

            <div className="bg-[#004878] text-white p-6 rounded mb-6">
                <h3 className="font-bold mb-2">Concierge Suggestions</h3>
                <p className="text-sm opacity-90 mb-4">Customize your stay before you arrive.</p>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">⚪ Book a Spa Treatment</li>
                    <li className="flex items-center gap-2">⚪ Reserve a Romantic Dinner</li>
                    <li className="flex items-center gap-2">⚪ Arrange Airport Pickup</li>
                </ul>
            </div>

            <div className="text-center">
                 <p className="text-sm font-bold mb-2">Weather Forecast for your stay</p>
                 <div className="flex justify-center gap-4 text-sm">
                    <span>☀️ Thu: 28°C</span>
                    <span>⛅ Fri: 26°C</span>
                    <span>🌧️ Sat: 24°C</span>
                 </div>
            </div>
        </div>
        <EmailFooter />
    </EmailContainer>
);


// --- MAIN PAGE COMPONENT ---

export default function EmailPreviews() {
    const [activeTemplate, setActiveTemplate] = useState<string>('welcome-1');

    const templates: EmailTemplate[] = [
        { id: 'welcome-1', category: 'Welcome Series', subject: 'Welcome to Heaven Palace', component: <WelcomeEmail1 /> },
        { id: 'welcome-2', category: 'Welcome Series', subject: 'Discover Our Story', component: <WelcomeEmail2 /> },
        { id: 'conf-1', category: 'Booking', subject: 'Booking Confirmation', component: <BookingConfirmation /> },
        { id: 'conf-2', category: 'Booking', subject: '7 Days Before Arrival', component: <PreArrival /> },
    ];

    const currentTemplate = templates.find(t => t.id === activeTemplate);

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r h-screen overflow-y-auto fixed left-0 top-0">
                <div className="p-6 border-b bg-brand-dark text-white">
                    <h1 className="font-bold uppercase tracking-widest text-sm">Email System</h1>
                    <p className="text-xs opacity-50 mt-1">Campaign Templates</p>
                </div>
                <div className="p-4 space-y-6">
                    {['Welcome Series', 'Booking'].map(cat => (
                        <div key={cat}>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">{cat}</h3>
                            <div className="space-y-1">
                                {templates.filter(t => t.category === cat).map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setActiveTemplate(t.id)}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between transition ${
                                            activeTemplate === t.id 
                                            ? 'bg-brand-blue text-white' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="truncate">{t.subject}</span>
                                        {activeTemplate === t.id && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Preview Area */}
            <div className="ml-80 w-full p-12">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-serif text-brand-dark">{currentTemplate?.subject}</h2>
                            <p className="text-sm text-gray-500 mt-1">Category: {currentTemplate?.category}</p>
                        </div>
                        <div className="bg-white border px-4 py-2 rounded text-xs text-gray-500 shadow-sm">
                            Status: <span className="text-green-600 font-bold">Active Template</span>
                        </div>
                    </div>
                    
                    {/* The Email Render */}
                    <div className="border shadow-2xl rounded-lg overflow-hidden">
                        {currentTemplate?.component}
                    </div>
                </div>
            </div>
        </div>
    );
}
