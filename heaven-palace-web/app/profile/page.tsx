"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { createClient } from '@/utils/supabase/client'; 
import { Award, Calendar, LogOut, User, Camera, Edit2, Save, MapPin, Star, X, Gift, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  
  // Rewards State
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState<any[]>([]);
  const [points, setPoints] = useState(0);

  // Edit Form State
  const [formData, setFormData] = useState({ full_name: '', phone: '' });

  useEffect(() => {
        const getData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/');
                return;
            }

            // 1. Get Profile (Safe Mode)
            let { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            // SELF-HEAL: If profile is missing, create it immediately
            if (!profileData) {
                    console.log('Profile missing. Creating default profile...');
                    const { data: newProfile, error: createError } = await supabase
                            .from('profiles')
                            .insert([{
                                    id: user.id,
                                    email: user.email,
                                    full_name: user.user_metadata?.full_name || 'New Guest',
                                    role: 'user'
                            }])
                            .select()
                            .single();

                    if (newProfile) {
                            profileData = newProfile;
                    } else if (createError) {
                            console.error('Failed to create profile:', createError.message || createError);
                    }
            }

            if (profileData) {
                    setProfile(profileData);
                    // Safe setting of form data
                    setFormData({ 
                            full_name: profileData.full_name || '', 
                            phone: profileData.phone || '' 
                    });
                    setAvatarUrl(profileData.avatar_url);
            }

            // 2. Get Bookings
            const { data: bookingData } = await supabase
                .from('bookings')
                .select(`*, rooms (name, images)`)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (bookingData) {
                    setBookings(bookingData);
          
                    // Calculate Points
                    const totalSpent = bookingData
                        .filter(b => b.status === 'Confirmed')
                        .reduce((sum, b) => sum + b.total_price, 0);
          
                    setPoints(Math.floor(totalSpent / 100));
            }

            // 3. Fetch Rewards Catalog
            const { data: rewardData } = await supabase.from('rewards').select('*');
            if(rewardData) setRewards(rewardData);
      
            setLoading(false);
        };
        getData();
    }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  const handleUpdateProfile = async () => {
            if (!profile?.id) {
                alert('Profile not available. Please sign out and sign in again.');
                return;
            }

            const { error } = await supabase
                .from('profiles')
                .update({ full_name: formData.full_name, phone: formData.phone })
                .eq('id', profile.id);

            if (!error) {
                    setProfile({ ...profile, ...formData });
                    setIsEditing(false);
            } else {
                    console.error('Profile update failed:', error);
            }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || !e.target.files[0]) return;
            if (!profile?.id) {
                alert('Profile missing; cannot upload avatar.');
                return;
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${profile.id}-${Math.random()}.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file);

            if (uploadError) {
                    console.error('Avatar upload failed:', uploadError);
                    alert('Error uploading avatar');
                    return;
            }

            // Get URL
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);

            // Update Profile (guarded)
            const { error: updateError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
            if (updateError) console.error('Failed to update profile avatar_url:', updateError);
            setAvatarUrl(publicUrl);
  };

  // Claim Reward Logic (Simple Alert for now)
  const handleClaim = (reward: any) => {
      if (points >= reward.points_cost) {
          alert(`You have claimed: ${reward.title}! Show this screen at reception.`);
          // Ideally, you'd deduct points in DB here
      } else {
          alert("Not enough points yet!");
      }
  };

  const nextTierPoints = 15000;
  const progress = Math.min((points / nextTierPoints) * 100, 100);

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-gold" size={40}/></div>;

    // If we finished loading but profile is missing, show a helpful fallback
    if (!profile) return (
        <div className="h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-serif text-brand-dark mb-4">Account Setup Incomplete</h2>
                <p className="text-gray-500 mb-6">We couldn't load your profile data. Please try signing out and back in.</p>
                <button onClick={handleSignOut} className="bg-brand-blue text-white px-6 py-3 rounded uppercase text-xs font-bold">
                        Sign Out & Retry
                </button>
        </div>
    );

    return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[450px] w-full">
        <Image src="/images/home/hero-bg.jpg" alt="Profile Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-gray-50/90"></div>

        <div className="absolute inset-0 container mx-auto px-6 pt-32 flex flex-col items-center md:items-start">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-brand-gold/20 backdrop-blur-sm shadow-2xl flex items-center justify-center text-5xl font-serif text-white font-bold relative">
                        {avatarUrl ? (
                            <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                        ) : (
                            profile?.full_name?.charAt(0)
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-brand-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition shadow-lg z-10">
                        <Camera size={16} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                    </label>
                </div>

                <div className="text-center md:text-left text-white">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="bg-brand-gold/20 border border-brand-gold/50 text-brand-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                            {profile?.tier || 'Member'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{profile?.full_name}</h1>
                    <p className="text-white/70 text-sm flex items-center justify-center md:justify-start gap-2">
                        <MapPin size={14} /> Sri Lanka
                    </p>
                </div>

                <div className="ml-auto mt-6 md:mt-0">
                    <button onClick={handleSignOut} className="bg-red-500/10 hover:bg-red-500 text-white border border-red-500/50 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition backdrop-blur-sm">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-6 pb-24 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: LOYALTY */}
            <div className="space-y-8">
                <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h3 className="font-serif text-lg mb-1">Relax & Reward</h3>
                        <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Membership Status</p>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-brand-gold">{points.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 mb-1">pts</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-gold to-yellow-200 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Earn 1 point for every 100 LKR spent.
                        </p>
                        <button 
                            onClick={() => setShowRewards(true)}
                            className="w-full py-3 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition flex justify-center items-center gap-2"
                        >
                            <Award size={16} /> View Rewards Catalog
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT: DETAILS & BOOKINGS */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Personal Information */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-brand-dark">Personal Information</h3>
                        <button 
                            onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                            className="text-brand-blue text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                            {isEditing ? <><Save size={14}/> Save</> : <><Edit2 size={14}/> Edit Details</>}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                            {isEditing ? (
                                <input className="border p-2 w-full rounded" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                            ) : (
                                <p className="text-brand-dark font-medium p-2">{profile?.full_name}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                            <p className="text-gray-500 font-medium p-2">{profile?.email}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                            {isEditing ? (
                                <input className="border p-2 w-full rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            ) : (
                                <p className="text-brand-dark font-medium p-2">{profile?.phone || 'Not Provided'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* My Stays (REAL DATA) */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="font-serif text-xl text-brand-dark mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-brand-gold"/> My Stays
                    </h3>

                    {bookings.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p className="mb-4">No bookings yet.</p>
                            <button onClick={() => router.push('/accommodation')} className="px-6 py-3 bg-brand-blue text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                                Find a Room
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    {/* Room Image */}
                                    <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                                        <Image 
                                            src={booking.rooms?.images?.[0] || '/images/home/room-1.jpg'} 
                                            alt="Room" 
                                            fill 
                                            className="object-cover" 
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-brand-dark text-lg">{booking.rooms?.name || 'Unknown Room'}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">ID: {String(booking.id).slice(0, 8)}...</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 
                                                    booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                                <p className="text-brand-blue font-bold mt-2 text-sm">LKR {booking.total_price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
      </div>

      <Footer />

      {/* REWARDS MODAL */}
      {showRewards && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowRewards(false)}></div>
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden max-h-[80vh] flex flex-col animate-fade-in-up">
                  
                  {/* Header */}
                  <div className="p-6 border-b flex justify-between items-center bg-brand-dark text-white">
                      <div>
                        <h2 className="text-2xl font-serif">Rewards Catalog</h2>
                        <p className="text-xs text-gray-400">Your Balance: <span className="text-brand-gold font-bold text-sm">{points} pts</span></p>
                      </div>
                      <button onClick={() => setShowRewards(false)} className="hover:bg-white/10 p-2 rounded-full transition"><X size={24}/></button>
                  </div>

                  {/* Grid */}
                  <div className="p-6 overflow-y-auto bg-gray-50">
                      {rewards.length === 0 ? (
                          <div className="text-center py-10 text-gray-500">Loading rewards...</div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {rewards.map(reward => {
                                  const canClaim = points >= reward.points_cost;
                                  const percent = Math.min((points / reward.points_cost) * 100, 100);

                                  return (
                                      <div key={reward.id} className={`border rounded-xl p-5 bg-white shadow-sm transition relative overflow-hidden ${canClaim ? 'border-green-500 ring-1 ring-green-500/20' : 'border-gray-200 opacity-90'}`}>
                                          
                                          <div className="flex justify-between items-start mb-3">
                                              <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-lg">
                                                  <Gift size={24}/>
                                              </div>
                                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${canClaim ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                  {reward.points_cost} pts
                                              </span>
                                          </div>

                                          <h4 className="font-bold text-brand-dark text-lg mb-2">{reward.title}</h4>
                                          <p className="text-xs text-gray-500 mb-6 min-h-[40px]">{reward.description}</p>

                                          {/* Progress Bar logic */}
                                          {!canClaim && (
                                              <div className="mb-4">
                                                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                                      <span>Progress</span>
                                                      <span>Need {reward.points_cost - points} more</span>
                                                  </div>
                                                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                      <div className="bg-brand-gold h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                                  </div>
                                              </div>
                                          )}

                                          <button 
                                            onClick={() => handleClaim(reward)}
                                            disabled={!canClaim}
                                            className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2 ${
                                                canClaim 
                                                ? 'bg-brand-dark text-white hover:bg-brand-blue shadow-lg' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                          >
                                              {canClaim ? 'Claim Reward' : 'Locked'}
                                          </button>
                                      </div>
                                  );
                              })}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </main>
  );
}
