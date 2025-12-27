import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './dashboard/Sidebar'
import Products from './dashboard/Products'
import CreateProduct from './dashboard/CreateProduct'
import Users from './dashboard/Users'
import Orders from './dashboard/Orders'

export default function Home() {
    return (
        <div className="flex min-h-screen radial-gradient text-white font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-10 overflow-x-hidden">

                {/* Content Routes */}
                <Routes>
                    <Route path="/" element={
                        <div className="flex flex-col items-center justify-center p-20 text-center animate-fade-in">
                            <h1 className="text-6xl font-modern-negra text-yellow mb-6">Welcome Admin!</h1>
                            <p className="text-xl text-white/70 max-w-2xl">
                                Manage your users, products, and orders from this dashboard. Select an option from the sidebar to get started.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
                                <div className="bg-black/40 border border-yellow/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                    <h3 className="text-3xl font-modern-negra text-white mb-2">Users</h3>
                                    <p className="text-yellow text-4xl font-bold">1,234</p>
                                </div>
                                <div className="bg-black/40 border border-yellow/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                    <h3 className="text-3xl font-modern-negra text-white mb-2">Products</h3>
                                    <p className="text-yellow text-4xl font-bold">56</p>
                                </div>
                                <div className="bg-black/40 border border-yellow/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                    <h3 className="text-3xl font-modern-negra text-white mb-2">Orders</h3>
                                    <p className="text-yellow text-4xl font-bold">892</p>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/create" element={<CreateProduct />} />
                    <Route path="orders" element={<Orders />} />
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    )
}
