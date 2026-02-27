import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = ({ title, subtitle, children, showBack = true, brandColor = '#3b82f6', heroIcon: HeroIcon = ShieldCheck }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-12 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #eff6ff 100%)' }}>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] lg:max-w-5xl z-10 grid lg:grid-cols-2 bg-white/60 backdrop-blur-3xl rounded-[40px] border border-white shadow-2xl shadow-blue-500/10 overflow-hidden"
            >
                {/* Hero Section (Desktop) */}
                <div
                    style={{ background: `linear-gradient(135deg, ${brandColor} 0%, #1e1b4b 100%)` }}
                    className="hidden lg:flex flex-col p-12 text-white relative overflow-hidden"
                >
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <HeroIcon className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-black tracking-tighter">vArogra</span>
                        </div>

                        <div className="mt-auto">
                            <h2 className="text-4xl font-black leading-tight mb-4">
                                {title}
                            </h2>
                            <p className="text-white/70 text-base font-medium leading-relaxed mb-6">
                                {subtitle || "Secure access to the vArogra healthcare grid. Optimized for quality care and administrative efficiency."}
                            </p>
                            <div className="h-1 w-12 bg-white/30 rounded-full" />
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
                </div>

                {/* Form Content */}
                <div className="p-8 lg:p-12 bg-white/80 flex flex-col min-h-[500px]">
                    {showBack && (
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">Return</span>
                        </button>
                    )}

                    <div className="lg:hidden mb-8 text-center">
                        <div
                            style={{ background: brandColor }}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl shadow-xl shadow-blue-500/10 mb-4 text-white"
                        >
                            <HeroIcon size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900">{title}</h1>
                        {subtitle && <p className="text-slate-400 text-sm font-medium mt-1">{subtitle}</p>}
                    </div>

                    <div className="hidden lg:block mb-8">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Secure Authentication</h3>
                        <div className="h-1 w-8 bg-slate-900 rounded-full" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        {children}
                    </div>

                    <div className="mt-12 pt-6 border-t border-slate-100/50 text-center">
                        <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                            vArogra Healthcare OS • Verified Session
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;

