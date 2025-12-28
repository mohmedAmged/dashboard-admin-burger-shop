import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './dashboard/Sidebar'
import Products from './dashboard/Products'
import CreateProduct from './dashboard/CreateProduct'
import Users from './dashboard/Users'
import Orders from './dashboard/Orders'
import UpdateProduct from './dashboard/UpdateProduct'
import OrderDetails from './dashboard/OrderDetails'

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
                    <h1 className="text-xl font-modern-negra text-yellow tracking-wide">Burger Shop</h1>
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
                        <Route path="/" element={
                            <div className="flex flex-col items-center justify-center py-10 lg:py-20 text-center animate-fade-in">
                                <h1 className="text-4xl lg:text-6xl font-modern-negra text-yellow mb-6">Welcome Admin!</h1>
                                <p className="text-lg lg:text-xl text-white/70 max-w-2xl px-4">
                                    Manage your users, products, and orders from this dashboard. Select an option from the sidebar to get started.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 lg:mt-16 w-full max-w-4xl px-4">
                                    <div className="bg-black/40 border border-yellow/10 p-6 lg:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-2xl lg:text-3xl font-modern-negra text-white mb-2">Users</h3>
                                        <p className="text-yellow text-3xl lg:text-4xl font-bold">1,234</p>
                                    </div>
                                    <div className="bg-black/40 border border-yellow/10 p-6 lg:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-2xl lg:text-3xl font-modern-negra text-white mb-2">Products</h3>
                                        <p className="text-yellow text-3xl lg:text-4xl font-bold">56</p>
                                    </div>
                                    <div className="bg-black/40 border border-yellow/10 p-6 lg:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                        <h3 className="text-2xl lg:text-3xl font-modern-negra text-white mb-2">Orders</h3>
                                        <p className="text-yellow text-3xl lg:text-4xl font-bold">892</p>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="users" element={<Users />} />
                        <Route path="products" element={<Products />} />
                        <Route path="products/create" element={<CreateProduct />} />
                        <Route path="products/update/:slug" element={<UpdateProduct />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:id" element={<OrderDetails />} />
                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
