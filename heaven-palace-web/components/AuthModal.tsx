'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { X, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for visibility
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState(''); // NEW: phone field
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // LOGIN LOGIC
                setError(null);
                const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (authError) {
                    setError(authError.message);
                    setLoading(false);
                    return;
                }

                // CHECK ROLE (Admin vs User)
                if (authData?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', authData.user.id)
                        .single();

                    onClose();
                    router.refresh();

                    if (profile?.role === 'admin') {
                        router.push('/admin/dashboard'); // Admin Redirect
                    } else {
                        router.push('/profile'); // User Redirect
                    }
                }
            } else {
                // SIGNUP LOGIC
                const { error: signError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            phone: phone, // Save Phone to Metadata
                        },
                    },
                });

                if (signError) {
                    setError(signError.message);
                } else {
                    // SUCCESS: No alert, just go to profile
                    // Note: This requires "Confirm Email" to be disabled in Supabase settings
                    onClose();
                    router.refresh();
                    router.push('/profile');
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message || 'Unexpected error');
        }

        setLoading(false);
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-full transition z-10">
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif text-brand-dark mb-2">
                            {isLogin ? 'Welcome Back' : 'Join Heaven Palace'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {isLogin ? 'Log in to access your Relax & Reward points.' : 'Sign up to unlock 10% off.'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-xs p-3 rounded mb-4 text-center font-bold">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleAuth}>
                        {!isLogin && (
                            <>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Full Name"
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input 
                                        type="tel"
                                        placeholder="Phone (+94 7X...)"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="email" 
                                placeholder="Email Address"
                                required 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"} // Dynamic Type
                                placeholder="Password"
                                required 
                                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Eye Toggle Button */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-brand-blue transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="text-right">
                            <button type="button" className="text-xs text-brand-blue hover:underline">Forgot Password?</button>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-brand-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-brand-blue transition mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin"/> : (isLogin ? 'Login' : 'Create Account')} 
                            {!loading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-xs text-gray-500 mb-4">Or continue with</p>
                        <div className="flex gap-3 justify-center">
                            
                            {/* GOOGLE BUTTON */}
                            <button 
                                onClick={() => handleSocialLogin('google')}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '20px', width: '20px'}} viewBox="0 0 32 32">
                                    <g fill="none">
                                        <path d="m30.7 16.340875c0-1.0635937-.0954375-2.0863125-.2727187-3.06825h-14.1272813v5.8022813h8.0727188c-.3477188 1.8749999-1.4044688 3.4636874-2.9931563 4.527375v3.7635937h4.8477188c2.8364062-2.6113125 4.4727187-6.4568438 4.4727187-11.025z" fill="#4285f4"></path>
                                        <path d="m16.3 31c4.05 0 7.4454375-1.34325 9.9271875-3.6340312l-4.8477187-3.7635938c-1.3430626.9-3.0613126 1.43175-5.0794688 1.43175-3.9068438 0-7.21363125-2.6386875-8.39323125-6.184125h-5.01135v3.8864063c2.46825 4.9022812 7.54094995 8.2635937 13.40458125 8.2635937z" fill="#34a853"></path>
                                        <path d="m7.90675 18.8499062c-.3-.9-.4704-1.8613125-.4704-2.85s.1704-1.95.4704-2.85v-3.88635933h-5.01135c-1.0158 2.02504693-1.5954 4.31592183-1.5954 6.73635933 0 2.4204376.5796 4.7113126 1.5954 6.7363125z" fill="#fbbc04"></path>
                                        <path d="m16.3 6.96595c2.2021875 0 4.1794688.75675 5.7340313 2.2431l4.3023749-4.3023c-2.5977187-2.4204-5.9932499-3.90675-10.0364062-3.90675-5.8636313 0-10.93633125 3.36135-13.40458125 8.26365l5.01135 3.88635c1.1796-3.5454 4.48638745-6.18405 8.39323125-6.18405z" fill="#e94235"></path>
                                    </g>
                                </svg>
                                <span className="text-xs font-bold text-gray-700">Google</span>
                            </button>

                            {/* FACEBOOK BUTTON */}
                            <button 
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-[#f0f6ff] transition flex items-center justify-center gap-2 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{display: 'block', height: '20px', width: '20px'}}>
                                    <path d="m31.9361277 15.9680639c0-8.81884234-7.1492215-15.9680639-15.9680638-15.9680639-8.81884234 0-15.9680639 7.14922156-15.9680639 15.9680639 0 7.4883832 5.15576846 13.7721357 12.1108184 15.497964v-10.6181237h-3.29261481v-4.8798403h3.29261481v-2.1026747c0-5.4348902 2.4597205-7.95401195 7.7956087-7.95401195 1.0117366 0 2.7573653.19864271 3.4714571.3966467v4.42315365c-.3768463-.0396008-1.0315369-.0594012-1.8446307-.0594012-2.6181238 0-3.6298603.9919362-3.6298603 3.5704591v1.7258284h5.2158084l-.8961277 4.8798403h-4.3196807v10.9713373c7.9067465-.9548902 14.0333733-7.6870259 14.0333733-15.8511776z" fill="#0866ff"></path>
                                </svg>
                                <span className="text-xs font-bold text-gray-700">Facebook</span>
                            </button>

                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-brand-blue font-bold hover:underline">
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
                
                <div className="bg-brand-gold/10 p-4 text-center">
                    <p className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                        {isLogin ? 'Member Benefits Await' : 'Join 2,000+ Happy Guests'}
                    </p>
                </div>
            </div>
        </div>
    );
}
