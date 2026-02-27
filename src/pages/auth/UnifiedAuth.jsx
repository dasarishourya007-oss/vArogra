import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Lock, User, Calendar as CalendarIcon,
    MapPin, ChevronDown, Loader2, ArrowLeft,
    ShieldCheck, Facebook, Twitter, Chrome, Apple
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UnifiedAuth = () => {
    const navigate = useNavigate();
    const { loginPatient, registerPatient, loginSocial } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupData, setSignupData] = useState({
        name: '', email: '', password: '', address: '', age: '', birthDate: '', gender: 'Male'
    });

    useEffect(() => {
        if (signupData.birthDate) {
            const bDate = new Date(signupData.birthDate);
            const today = new Date();
            let age = today.getFullYear() - bDate.getFullYear();
            const m = today.getMonth() - bDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) age--;
            setSignupData(prev => ({ ...prev, age: age >= 0 ? age.toString() : '' }));
        }
    }, [signupData.birthDate]);

    const handleSocialLogin = async (provider) => {
        setErrorMsg('');
        setIsLoading(true);
        try {
            const result = await loginSocial(provider, 'patient');
            if (result.success) navigate('/dashboard/patient');
            else setErrorMsg(result.message || `${provider} login failed.`);
        } catch (err) {
            setErrorMsg("Social login failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuth = async (e) => {
        if (e) e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);
        try {
            let result;
            if (isLogin) {
                result = await loginPatient(email, password);
            } else {
                result = await registerPatient(signupData);
            }

            if (result.success) {
                navigate('/dashboard/patient');
            } else {
                setErrorMsg(result.message || (isLogin ? "Login failed" : "Registration failed"));
            }
        } catch (err) {
            setErrorMsg("Authentication error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #f8fafc 40%, #eff6ff 100%)' }}>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] lg:max-w-6xl z-10 grid lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[48px] border border-white shadow-2xl shadow-blue-500/10 overflow-hidden"
            >
                {/* Left Side: Illustration / Info (Desktop Only) */}
                <div className="hidden lg:flex flex-col p-16 bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="text-white w-7 h-7" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">vArogra</span>
                        </div>

                        <div className="mt-auto">
                            <h2 className="text-5xl font-black leading-tight mb-6">
                                Your Secure <br />
                                <span className="text-blue-200">Health Grid</span>
                            </h2>
                            <p className="text-blue-100/80 text-lg font-medium max-w-md leading-relaxed mb-8">
                                Connect with top clinicians, manage prescriptions, and track your wellness journey in real-time.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                                    <div className="text-3xl font-black mb-1">10k+</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Verified Doctors</div>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                                    <div className="text-3xl font-black mb-1">24/7</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Live Support</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 blur-[100px] opacity-30" />
                    <div className="absolute top-40 -right-20 w-60 h-60 bg-indigo-400 blur-[100px] opacity-20" />
                </div>

                {/* Right Side: Auth Form */}
                <div className="p-8 lg:p-16 flex flex-col justify-center bg-white/80">
                    {/* Brand Header (Mobile Only) */}
                    <div className="text-center mb-10 lg:hidden">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20 mb-4">
                            <ShieldCheck className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">vArogra</h1>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-slate-500 font-medium text-sm">
                            {isLogin ? "Log in to continue your secure session." : "Join the healthcare revolution today."}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Error Toast */}
                        <AnimatePresence>
                            {errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mb-6 bg-red-50 border border-red-100 text-red-500 text-xs font-black py-3 px-4 rounded-2xl text-center"
                                >
                                    {errorMsg}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    onSubmit={handleAuth}
                                    className="space-y-4"
                                >
                                    <AuthInput
                                        icon={<Mail size={18} />}
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <AuthInput
                                        icon={<Lock size={18} />}
                                        type="password"
                                        placeholder="Security Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div className="flex items-center justify-between text-xs px-1 py-2">
                                        <label className="flex items-center gap-2 text-slate-500 cursor-pointer text-[11px] font-bold uppercase tracking-wider">
                                            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-200 bg-slate-50 text-blue-600 focus:ring-blue-500/20" />
                                            Remember Me
                                        </label>
                                        <button type="button" className="text-blue-600 font-black hover:text-blue-700 uppercase tracking-wider text-[11px]">Forgot Passkey?</button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Authorize Link"}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="signup"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onSubmit={handleAuth}
                                    className="space-y-4"
                                >
                                    <AuthInput
                                        icon={<User size={18} />}
                                        placeholder="Full Name"
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                        required
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <AuthInput
                                            icon={<Mail size={16} />}
                                            type="email"
                                            placeholder="Email"
                                            value={signupData.email}
                                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                            required
                                        />
                                        <AuthInput
                                            icon={<Lock size={16} />}
                                            type="password"
                                            placeholder="Password"
                                            value={signupData.password}
                                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <AuthInput
                                            icon={<CalendarIcon size={18} />}
                                            placeholder="Date of Birth"
                                            value={signupData.birthDate}
                                            readOnly
                                            onClick={() => setShowCalendar(!showCalendar)}
                                        />
                                        {showCalendar && (
                                            <div className="absolute top-full left-0 z-50 mt-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl">
                                                <input
                                                    type="date"
                                                    className="bg-transparent text-slate-900 border-none outline-none h-10 w-40"
                                                    onChange={(e) => {
                                                        setSignupData({ ...signupData, birthDate: e.target.value });
                                                        setShowCalendar(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <AuthInput
                                        icon={<MapPin size={18} />}
                                        placeholder="Address / Region"
                                        value={signupData.address}
                                        onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                                        required
                                    />

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/10 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify Identity"}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Social Auth */}
                    <div className="mt-10">
                        <div className="relative flex items-center justify-center mb-10">
                            <div className="h-px bg-slate-100 w-full absolute" />
                            <span className="bg-white px-6 text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase z-10">Instant Verification</span>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <SocialButton icon={<Chrome className="w-5 h-5" />} onClick={() => handleSocialLogin('google')} />
                            <SocialButton icon={<Facebook className="w-5 h-5" />} onClick={() => handleSocialLogin('facebook')} />
                            <SocialButton icon={<Twitter className="w-5 h-5" />} onClick={() => handleSocialLogin('x')} />
                            <SocialButton icon={<Apple className="w-5 h-5" />} onClick={() => handleSocialLogin('apple')} />
                        </div>
                    </div>

                    {/* Footer Switcher */}
                    <div className="text-center mt-10">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                            {isLogin ? "Need a new link?" : "Already Authorized?"}{' '}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
                                className="text-blue-600 font-black hover:underline cursor-pointer ml-1"
                            >
                                {isLogin ? "Start Setup" : "Return to Log"}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Floating Back Button (Desktop) */}
            <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.1, x: -5 }}
                className="fixed top-8 left-8 w-12 h-12 bg-white text-slate-900 rounded-full shadow-lg items-center justify-center hidden lg:flex border border-slate-100"
            >
                <ArrowLeft size={20} />
            </motion.button>
        </div>
    );
};

const AuthInput = ({ icon, ...props }) => (
    <div className="group relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            {icon}
        </div>
        <input
            {...props}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all hover:bg-slate-100/50"
        />
    </div>
);

const SocialButton = ({ icon, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.02)', borderColor: 'rgba(0,0,0,0.05)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center justify-center h-14 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
    >
        {icon}
    </motion.button>
);

export default UnifiedAuth;
