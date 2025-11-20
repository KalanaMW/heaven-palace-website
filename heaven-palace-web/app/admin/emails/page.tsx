'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Star, Calendar, MapPin } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type EmailTemplate = {
    id: string;
    category: string;
    subject: string;
    component: React.ReactNode;
};

// --- SHARED EMAIL COMPONENTS ---
// Note: In a real app, these would be inline styles for email compatibility
const EmailContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-200 p-8 min-h-[600px] flex justify-center font-sans">
        <div className="bg-white w-full max-w-[600px] shadow-xl overflow-hidden">
            {children}
        </div>
    </div>
);

const EmailHeader = () => (
    <div className="bg-brand-blue p-8 text-center">
        <h1 className="text-white font-serif text-2xl tracking-[0.2em]">HEAVEN PALACE</h1>
    </div>
);

const EmailFooter = () => (
    <div className="bg-brand-dark p-6 text-center text-gray-400 text-xs">
        <p className="mb-4">No. 39/1, Maragahawela Road, Kandy, Sri Lanka</p>
        <p>You are receiving this because you are a valued guest.</p>
        <p className="underline mt-2 cursor-pointer">Unsubscribe</p>
    </div>
);

const EmailButton = ({ text }: { text: string }) => (
    <button className="bg-brand-gold text-white py-3 px-6 text-sm font-bold uppercase tracking-widest mt-4 hover:brightness-110">
        {text}
    </button>
);

// --- TEMPLATE 1: WELCOME ---
const WelcomeEmail1 = () => (
    <EmailContainer>
        <EmailHeader />
        {/* Ensure you have this image in public/images/emails/welcome-hero.jpg */}
        <div className="relative h-56 w-full bg-gray-300">
             <Image 
                src="/images/emails/welcome-hero.jpg" 
                alt="Welcome" 
                fill 
                className="object-cover"
                // Fallback to gray if image missing
                onError={(e) => { (e as any).currentTarget.style.display='none' }} 
             />
             <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-200 -z-10">
                Image: /images/emails/welcome-hero.jpg
             </div>
        </div>
        <div className="p-10 text-gray-700">
            <h2 className="text-2xl font-serif text-brand-blue mb-4">Welcome to Serenity</h2>
            <p className="mb-4">Dear Guest,</p>
            <p className="mb-6 leading-relaxed text-sm">
                Thank you for joining the Heaven Palace family. We are thrilled to share our world of wellness and authentic Sri Lankan hospitality with you.
            </p>
            <div className="bg-blue-50 p-6 border-l-4 border-brand-blue mb-6">
                <h3 className="font-bold text-brand-blue mb-1">A Special Gift</h3>
                <p className="text-sm">Use code <strong>WELCOME10</strong> for 10% off your first booking.</p>
            </div>
            <div className="text-center">
                 <EmailButton text="Book Your Stay" />
            </div>
        </div>
        <EmailFooter />
    </EmailContainer>
);

// --- TEMPLATE 2: BOOKING CONFIRMATION ---
const BookingConfirmation = () => (
    <EmailContainer>
        <EmailHeader />
        <div className="bg-green-50 p-6 text-center border-b border-green-100">
            <div className="flex justify-center text-green-600 mb-2"><Star size={24} fill="currentColor" /></div>
            <h2 className="text-xl font-bold text-green-800">Booking Confirmed</h2>
            <p className="text-sm text-green-700 mt-1">Ref: #HP-2025-8892</p>
        </div>
        <div className="p-8 text-gray-700">
            <p className="mb-6 text-center text-sm">We can't wait to welcome you to paradise.</p>
            
            <div className="bg-gray-50 p-6 rounded border border-gray-200 mb-6 text-sm">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                    <Calendar className="text-brand-gold" />
                    <div>
                        <p className="font-bold uppercase text-xs text-gray-500">Check-in</p>
                        <p className="font-medium">Dec 15, 2025 (2:00 PM)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <MapPin className="text-brand-gold" />
                    <div>
                        <p className="font-bold uppercase text-xs text-gray-500">Room Type</p>
                        <p className="font-medium">Deluxe Double with Bath</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4">
                <span className="font-bold text-sm">Total Paid</span>
                <span className="text-xl font-serif text-brand-blue">LKR 45,000</span>
            </div>

            <div className="mt-8 text-center">
                <EmailButton text="Manage Booking" />
            </div>
        </div>
        <EmailFooter />
    </EmailContainer>
);


// --- PAGE COMPONENT ---

export default function EmailAdminPage() {
    const [activeTemplate, setActiveTemplate] = useState<string>('welcome-1');

    const templates: EmailTemplate[] = [
        { id: 'welcome-1', category: 'Marketing', subject: 'Welcome Series: Intro', component: <WelcomeEmail1 /> },
        { id: 'conf-1', category: 'Transactional', subject: 'Booking Confirmation', component: <BookingConfirmation /> },
    ];

    const currentTemplate = templates.find(t => t.id === activeTemplate);

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            
            {/* TEMPLATE SELECTOR (Inner Sidebar) */}
            <div className="w-72 bg-white border-r pr-6 overflow-y-auto">
                <h2 className="text-lg font-serif font-bold text-brand-dark mb-6">Templates</h2>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Marketing</h3>
                        {templates.filter(t => t.category === 'Marketing').map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTemplate(t.id)}
                                className={`w-full text-left px-4 py-3 text-sm rounded-lg transition mb-2 ${
                                    activeTemplate === t.id 
                                    ? 'bg-brand-blue text-white shadow-md' 
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {t.subject}
                            </button>
                        ))}
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Transactional</h3>
                        {templates.filter(t => t.category === 'Transactional').map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTemplate(t.id)}
                                className={`w-full text-left px-4 py-3 text-sm rounded-lg transition mb-2 ${
                                    activeTemplate === t.id 
                                    ? 'bg-brand-blue text-white shadow-md' 
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {t.subject}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* PREVIEW AREA */}
            <div className="flex-1 pl-12 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200 ml-6">
                <div className="sticky top-0 bg-gray-50 pt-8 pb-4 z-10 flex justify-between items-center pr-8 border-b border-gray-200 mb-8">
                    <div>
                        <h2 className="text-2xl font-serif text-brand-dark">Template Preview</h2>
                        <p className="text-sm text-gray-500">Subject: {currentTemplate?.subject}</p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-bold hover:bg-gray-50">
                        Send Test Email
                    </button>
                </div>
                
                <div className="pb-12">
                    {currentTemplate?.component}
                </div>
            </div>
        </div>
    );
}
