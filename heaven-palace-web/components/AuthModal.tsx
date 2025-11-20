'use client';

import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-full transition"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif text-brand-dark mb-2">
                            {isLogin ? 'Welcome Back' : 'Join Heaven Palace'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {isLogin 
                                ? 'Log in to access your Relax & Reward points.' 
                                : 'Sign up to unlock 10% off your first booking.'}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-blue text-sm"
                            />
                        </div>

                        {isLogin && (
                            <div className="text-right">
                                <a href="#" className="text-xs text-brand-blue hover:underline">Forgot Password?</a>
                            </div>
                        )}

                        {/* MOCK LOGIN - Links to Profile */}
                        <Link href="/profile" onClick={onClose}>
                            <button className="w-full bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition mt-2 flex items-center justify-center gap-2">
                                {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={16} />
                            </button>
                        </Link>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-xs text-gray-500 mb-4">Or continue with</p>
                        <div className="flex gap-4 justify-center">
                            <button className="flex-1 py-2 border rounded hover:bg-gray-50 text-xs font-bold text-brand-dark">Google</button>
                            <button className="flex-1 py-2 border rounded hover:bg-gray-50 text-xs font-bold text-brand-dark">Facebook</button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button 
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-brand-blue font-bold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
                
                {/* Footer Banner */}
                <div className="bg-brand-gold/10 p-4 text-center">
                    <p className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                        {isLogin ? 'Member Benefits Await' : 'Join 2,000+ Happy Guests'}
                    </p>
                </div>
            </div>
        </div>
    );
}
