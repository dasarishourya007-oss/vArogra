import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, ShieldCheck, Star, ArrowRight } from 'lucide-react';

/* ─── Portal Data ─── */
const portals = [
    {
        id: 'patient',
        title: 'Patient',
        description: 'Personal health records',
        route: '/login/patient',
        recommended: true,
        color: '#16a34a',          // green
        bgColor: '#dcfce7',
        svg: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M20 6C14.477 6 10 10.477 10 16c0 3.993 2.195 7.472 5.441 9.328L20 34l4.559-8.672C27.805 23.472 30 19.993 30 16c0-5.523-4.477-10-10-10z" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
                <path d="M16 16h8M20 12v8" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'doctor',
        title: 'Doctor',
        description: 'Clinical tools',
        route: '/login/doctor',
        color: '#2563eb',          // blue
        bgColor: '#dbeafe',
        accentLine: '#2563eb',
        svg: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <circle cx="20" cy="14" r="5" stroke="#2563eb" strokeWidth="2" />
                <path d="M20 19c-5 0-9 2.5-9 6v1h18v-1c0-3.5-4-6-9-6z" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="30" cy="30" r="5" stroke="#2563eb" strokeWidth="2" />
                <path d="M28 30h4M30 28v4" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'hospital',
        title: 'Hospital',
        description: 'Administration',
        route: '/login/hospital',
        color: '#16a34a',          // green
        bgColor: '#dcfce7',
        accentLine: '#16a34a',
        svg: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <rect x="8" y="14" width="24" height="20" rx="2" stroke="#16a34a" strokeWidth="2" />
                <path d="M15 34V26h10v8" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 20h4M20 18v4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 14V10a8 8 0 0116 0v4" stroke="#16a34a" strokeWidth="2" />
            </svg>
        ),
    },
    {
        id: 'pharmacy',
        title: 'Pharmacy',
        description: 'Inventory & Sales',
        route: '/login/medical-store',
        color: '#ea580c',          // orange
        bgColor: '#ffedd5',
        accentLine: '#ea580c',
        svg: (
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <rect x="8" y="18" width="24" height="16" rx="2" stroke="#ea580c" strokeWidth="2" />
                <path d="M14 18v-4a6 6 0 1112 0v4" stroke="#ea580c" strokeWidth="2" />
                <path d="M16 26h8M20 23v6" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
];

/* ─── Main Component ─── */
const LoginSelection = () => {
    const navigate = useNavigate();
    const patient = portals[0];
    const others = portals.slice(1);

    return (
        <div
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: 'linear-gradient(160deg, #f0fdf4 0%, #f8fafc 40%, #eff6ff 100%)' }}
            className="min-h-screen w-full flex flex-col overflow-hidden relative"
        >
            {/* Decorative blobs */}
            <div style={{ position: 'absolute', top: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #bbf7d0 0%, transparent 70%)', opacity: 0.6, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 80, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', opacity: 0.5, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -30, left: '30%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, #fed7aa 0%, transparent 70%)', opacity: 0.55, pointerEvents: 'none' }} />

            {/* Top Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px #16a34a44' }}>
                        <span style={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>v</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 20, color: '#0f172a', letterSpacing: '-0.5px' }}>vArogra</span>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6, borderRadius: 8, display: 'flex' }}>
                    <Settings size={22} />
                </button>
            </nav>

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                style={{ textAlign: 'center', padding: '28px 24px 20px' }}
            >
                <h1 style={{ fontSize: 30, fontWeight: 900, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.8px' }}>
                    Choose Your <span style={{ color: '#16a34a' }}>Portal</span>
                </h1>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, fontWeight: 500 }}>
                    Select the interface that best describes your role
                </p>
                <div style={{ width: 40, height: 3, background: '#e2e8f0', borderRadius: 99, margin: '14px auto 0' }} />
            </motion.div>

            {/* Cards Container */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Featured Patient Card */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(patient.route)}
                            className="bg-white rounded-[40px] border-2 border-emerald-100 p-8 shadow-xl shadow-emerald-500/5 cursor-pointer relative overflow-hidden h-full flex flex-col justify-center min-h-[320px] lg:min-h-[440px] group"
                        >
                            {/* Recommended badge */}
                            <div className="absolute top-6 right-6 bg-emerald-500 text-white rounded-full px-4 py-1.5 text-xs font-black flex items-center gap-2 z-10">
                                <Star size={12} fill="currentColor" /> RECOMMENDED
                            </div>

                            {/* Icon circle */}
                            <div className="w-24 h-24 rounded-[32px] bg-emerald-50 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-500">
                                {patient.svg}
                            </div>

                            <div>
                                <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Patient Portal</h1>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                                    Access your personal health records, book appointments, and manage medications.
                                </p>
                            </div>

                            <div className="mt-auto pt-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-500" size={20} />
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Secure Healthcare Link</span>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
                                    <ArrowRight size={24} />
                                </div>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Other Portals Grid */}
                    <div className="lg:col-span-7 grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                            {others.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(p.route)}
                                    className="bg-white/60 backdrop-blur-md rounded-[32px] border border-white p-6 flex items-center gap-6 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group lg:min-h-[120px]"
                                >
                                    <div
                                        style={{ background: p.bgColor }}
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:rotate-12 transition-transform"
                                    >
                                        {p.svg}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-slate-900 mb-1">{p.title}</h3>
                                        <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{p.description}</p>
                                    </div>
                                    <div
                                        style={{ color: p.color }}
                                        className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
                                    >
                                        <ArrowRight size={18} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Info / CTA Section for Desktop */}
                        <div className="hidden lg:flex bg-slate-900 rounded-[32px] p-8 text-white items-center justify-between overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-2">Healthcare Command Center</h4>
                                <p className="text-slate-400 text-sm font-medium max-w-[280px]">
                                    Join thousands of providers using vArogra to digitize their medical workflow.
                                </p>
                            </div>
                            <button className="relative z-10 px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-emerald-400 transition-colors uppercase tracking-widest">
                                Contact Sales
                            </button>
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[60px]" />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer – Secure & HIPAA Compliant */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px 24px 28px',
                    color: '#475569', fontSize: 13, fontWeight: 600,
                }}
            >
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                <ShieldCheck size={16} color="#16a34a" />
                <span>Secure &amp; HIPAA Compliant</span>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            </motion.div>
        </div>
    );
};

export default LoginSelection;
