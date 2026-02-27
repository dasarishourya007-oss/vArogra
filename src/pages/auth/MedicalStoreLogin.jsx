import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Store, Key, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import Button from '../../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const MedicalStoreLogin = ({ isEmbedded = false }) => {
    const navigate = useNavigate();
    const { loginMedicalStore, completeLogin } = useAuth();

    const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
    const [code, setCode] = useState('');
    const [pin, setPin] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [storeData, setStoreData] = useState(null);

    const handleInitialLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Master Login Shortcut
        if (code === '123' && pin === 'dsa') {
            setTimeout(async () => {
                const res = await loginMedicalStore(code, pin);
                setLoading(false);
                if (res && res.success) {
                    const userObj = { ...res.store, role: 'medical_store' };
                    completeLogin(userObj);
                    navigate('/dashboard/pharmacy');
                }
            }, 500);
            return;
        }

        // Simulate initial check
        setTimeout(async () => {
            const res = await loginMedicalStore(code.toUpperCase(), pin);
            if (res && res.success) {
                setStoreData(res.store);
                setStep(2);
                setLoading(false);
                alert(`Medical Store Login OTP: 1234`); // Simulation
            } else if (code.toUpperCase().startsWith('MSTR-')) {
                // Demo fallback if not in mock data
                const mockStore = {
                    name: 'Demo Medical Store',
                    code: code.toUpperCase(),
                    role: 'medical_store',
                    id: 'demo-store',
                    phone: '+91 98765 43210',
                    address: 'Hitech City, Hyderabad'
                };
                setStoreData(mockStore);
                setStep(2);
                setLoading(false);
                alert(`Medical Store Login OTP: 1234`);
            } else {
                setLoading(false);
                setError('Invalid Store Code. Code should start with MSTR-');
            }
        }, 1000);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
            const nextInput = document.getElementById(`store-otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if (otp.join('') === '1234') {
                const userObj = { ...storeData, role: 'medical_store' };
                completeLogin(userObj);
                navigate('/dashboard/pharmacy');
            } else {
                setLoading(false);
                setError('Invalid OTP. Please try again.');
            }
        }, 1200);
    };

    return (
        <AuthLayout
            title="Pharmacy Portal"
            subtitle="Manage your medical inventory, sales, and prescriptions link."
            showBack={true}
            brandColor="#ea580c"
            heroIcon={Store}
        >
            <div className="relative">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.form
                            key="s-step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleInitialLogin}
                            className="space-y-6"
                        >
                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-black py-3 px-4 rounded-2xl text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                                        <Store size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Store Code (e.g., MSTR-123)"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all shadow-sm group-hover:bg-slate-100/50"
                                    />
                                </div>

                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                                        <Key size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Security PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all shadow-sm group-hover:bg-slate-100/50"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-orange-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue to Verify"}
                            </button>

                            <div className="text-center pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/register/medical-store')}
                                    className="text-[11px] font-black text-slate-400 hover:text-orange-600 uppercase tracking-widest transition-colors"
                                >
                                    Register New Medical Store
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="s-step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleVerifyOtp}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-xl font-black text-slate-900 mb-2">Device Verification</h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-8">
                                    Enter the code sent to your store app
                                </p>

                                <div className="flex justify-center gap-3">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`store-otp-${i}`}
                                            type="number"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            className="w-14 h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-2xl font-black text-slate-900 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all"
                                        />
                                    ))}
                                </div>

                                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4">{error}</p>}

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Resend available in <span className="text-orange-500">0:59</span>
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.some(v => v === '')}
                                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify & Authorize"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors"
                            >
                                Use different credentials
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </AuthLayout>
    );
};

export default MedicalStoreLogin;
