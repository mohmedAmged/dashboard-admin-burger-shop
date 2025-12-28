import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/Auth.store';
import Cookies from 'js-cookie'

export default function Sidebar({ isOpen, onClose }) {
    const [productsOpen, setProductsOpen] = useState(false);
    const location = useLocation();
    const {signOut} = useAuthStore();

    return (
        <aside className={`fixed top-0 left-0 w-64 h-full min-h-screen bg-black/90 lg:bg-black/50 border-r border-yellow/20 flex flex-col p-6 backdrop-blur-md z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-modern-negra text-yellow tracking-wide lg:text-center w-full">Burger Shop</h2>
                <button
                    onClick={onClose}
                    className="lg:hidden text-white/50 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav className="flex-1 space-y-4">
                {/* Users */}
                <NavLink
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    to="/users"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-yellow text-black font-bold shadow-[0_0_20px_rgba(247,172,92,0.4)]' : 'text-white hover:bg-white/10'}`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span className="font-sans">Users</span>
                </NavLink>

                {/* Products */}
                <div>
                    <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${location.pathname.includes('products') ? 'text-yellow font-bold' : 'text-white hover:bg-white/10'}`}
                    >
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                            <span className="font-sans">Products</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 transition-transform duration-300 ${productsOpen || location.pathname.includes('products') ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>

                    {(productsOpen || location.pathname.includes('products')) && (
                        <div className="ml-8 mt-2 space-y-2 border-l border-white/20 pl-4">
                            <NavLink
                                to="/products"
                                end
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `block py-2 text-sm font-sans transition-colors ${isActive ? 'text-yellow font-bold' : 'text-white/70 hover:text-white'}`}
                            >
                                All Products
                            </NavLink>
                            <NavLink
                                to="/products/create"
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => `block py-2 text-sm font-sans transition-colors ${isActive ? 'text-yellow font-bold' : 'text-white/70 hover:text-white'}`}
                            >
                                Create Product
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Orders */}
                <NavLink
                    to="/orders"
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-yellow text-black font-bold shadow-[0_0_20px_rgba(247,172,92,0.4)]' : 'text-white hover:bg-white/10'}`
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="font-sans">Orders</span>
                </NavLink>

            </nav>

            {/* Logout */}
            <div className="pt-6 border-t border-yellow/20">
                <button
                    className="flex items-center gap-3 text-white/70 hover:text-white w-full font-sans transition-colors cursor-pointer"
                    onClick={() => {
                        signOut();
                        Cookies.remove('adminToken')
                        Cookies.remove('adminData');

                        window.location.reload();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Logout
                </button>
            </div>

        </aside>
    );
}
