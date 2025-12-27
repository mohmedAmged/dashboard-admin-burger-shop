import React, { useState } from 'react'
import { useAuthStore } from '../store/Auth.store';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { signIn, loading } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn(formData);
        navigate('/');
        window.location.reload();
    };
    return (
        <div className='min-h-screen py-28 2xl:px-0 px-5 container mx-auto radial-gradient'>
            <div className=" flex items-center justify-center p-4">
                <div className="max-w-md w-full border border-yellow/20 bg-black/50 rounded-3xl shadow-lg p-8 ">
                    <h2 className="text-3xl font-modern-negra text-white mb-6 text-center sm:text-4xl">Sign In</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium color-white mb-1">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                type="email"
                                className="w-full px-4 py-2 border border-yellow/30 rounded-lg bg-transparent text-sm font-medium text-white focus:outline-none focus:ring-0"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium color-white mb-1">Password</label>
                            <div className="relative">
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer">
                                    {
                                        !showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>

                                    }

                                </button>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData?.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-yellow/30 rounded-lg bg-transparent text-sm font-medium text-white focus:outline-none focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-yellow px-6 py-3 text-lg font-bold text-black hover:opacity-90 cursor-pointer mt-4">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white capitalize">
                        sign in as <span className="font-bold text-yellow">admin</span>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
