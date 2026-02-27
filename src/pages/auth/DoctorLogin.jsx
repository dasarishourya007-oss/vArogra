import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const { loginDoctor, completeLogin } = useAuth(); // We will create this

    const [code, setCode] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Master Login Shortcut
        if (code === '123' && pin === 'dsa') {
            const result = await loginDoctor(code, pin);
            if (result.success) {
                completeLogin(result.doctor);
                navigate('/dashboard/doctor');
                return;
            }
        }

        const result = await loginDoctor(code.toUpperCase(), pin);
        if (result.success) {
            completeLogin(result.user || result.doctor); // Ensuring user/doctor object is passed
            navigate('/dashboard/doctor');
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <AuthLayout
            title="Doctor Portal"
            subtitle="Access your clinical dashboard and patient records securely."
            showBack={true}
            brandColor="#2563eb"
            heroIcon={ShieldCheck}
        >
            <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-500 text-xs font-black py-3 px-4 rounded-2xl text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Doctor ID (e.g., DOC-123)"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all shadow-sm group-hover:bg-slate-100/50"
                        />
                    </div>

                    <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Clinical Passkey"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all shadow-sm group-hover:bg-slate-100/50"
                        />
                    </div>
                </div>

                <div className="text-right">
                    <button
                        type="button"
                        onClick={() => navigate('/recovery/doctor')}
                        className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                    >
                        Forgot Passkey?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                    Establish Secure Link
                </button>

                <div className="flex items-center justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/register/doctor')}
                        className="text-[11px] font-black text-slate-900 hover:text-blue-600 uppercase tracking-widest transition-colors"
                    >
                        Request Credentials
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/status/doctor')}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest underline decoration-slate-200 underline-offset-4"
                    >
                        Check Approval
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default DoctorLogin;
