import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './dashboard/Sidebar'
import Products from './dashboard/Products'
import CreateProduct from './dashboard/CreateProduct'
import Users from './dashboard/Users'
import Orders from './dashboard/Orders'
import UpdateProduct from './dashboard/UpdateProduct'
import OrderDetails from './dashboard/OrderDetails'
import Vouchers from './dashboard/Vouchers'
import CreateVoucher from './dashboard/CreateVoucher'
import UpdateVoucher from './dashboard/UpdateVoucher'
import HomePage from '../pages/HomePage'

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen radial-gradient text-white font-sans relative">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden">

                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-30">
                    <a href='/' className="text-xl font-modern-negra text-white tracking-wide">Burgro <span className="text-yellow">Shop</span>
                    </a>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 lg:p-10 overflow-x-hidden flex-1">
                    {/* Content Routes */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="users" element={<Users />} />
                        <Route path="products" element={<Products />} />
                        <Route path="products/create" element={<CreateProduct />} />
                        <Route path="products/update/:slug" element={<UpdateProduct />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:id" element={<OrderDetails />} />
                        <Route path="vouchers" element={<Vouchers />} />
                        <Route path="vouchers/create" element={<CreateVoucher />} />
                        <Route path="vouchers/update/:id" element={<UpdateVoucher />} />
                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
