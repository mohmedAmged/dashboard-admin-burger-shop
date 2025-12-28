import React, { useEffect, useState } from 'react';
import { useOrdersStore } from '../../store/Orders.store';
import { useNavigate } from 'react-router-dom';
import OrderStatusModal from './OrderStatusModal';
import toast from 'react-hot-toast';

const getStatusColor = (status) => {
    switch (status) {
        case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'PENDING': return 'text-yellow bg-yellow/10 border-yellow/20';
        case 'PREPARING': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'SHIPPED': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
        case 'CANCELLED': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-white bg-white/10 border-white/20';
    }
};

export default function Orders() {
    const { orders, getAllOrders, updateOrderStatus } = useOrdersStore();
    const navigate = useNavigate();
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    const handleUpdateStatus = async (id, statusData) => {
        await updateOrderStatus(id, statusData);
        setIsUpdateOpen(false);
        toast.success('Order status updated successfully');
        window.location.reload();
        // Store updates order list automatically
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-modern-negra text-white mb-8 text-center md:text-left">
                Manage <span className="text-yellow">Orders</span>
            </h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg max-w-[100vw] md:max-w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white whitespace-nowrap">
                        <thead className="bg-yellow/20 text-yellow font-sans uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-5 font-bold">Order ID</th>
                                <th className="px-6 py-5 font-bold">Date</th>
                                <th className="px-6 py-5 font-bold">Customer</th>
                                <th className="px-6 py-5 font-bold">Total</th>
                                <th className="px-6 py-5 font-bold">Payment</th>
                                <th className="px-6 py-5 font-bold">Status</th>
                                <th className="px-6 py-5 font-bold">Delivery Address</th>
                                <th className="px-6 py-5 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow/10 font-sans text-sm">
                            {orders.map((order) => (
                                <tr key={order?._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-yellow">#{order?._id.slice(0, 6)}...</td>
                                    <td className="px-6 py-4 text-white/60">{new Date(order?.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-yellow">
                                                {order?.user?.name.charAt(0)}
                                            </div>
                                            {order?.user?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">{order?.totalPrice}EGP</td>
                                    <td className="px-6 py-4 text-white/70">{order?.paymentMethod}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order?.status)}`}>
                                            {order?.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/60 max-w-xs truncate" title={order?.deliveryAddress}>
                                        {order?.deliveryAddress}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-end gap-2">
                                            {order?.status !== 'DELIVERED' && (
                                                <button
                                                    onClick={() => {
                                                        setOrderToUpdate(order);
                                                        setIsUpdateOpen(true);
                                                    }}
                                                    className="p-2 rounded-lg bg-yellow/20 text-yellow hover:bg-yellow hover:text-black transition-colors cursor-pointer"
                                                    title="Update Status"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                    </svg>
                                                </button>
                                            )
                                            }
                                            <button
                                                onClick={() => navigate(`/orders/${order._id}`)}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                                                title="View Details"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="md:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order?._id} className="bg-black/50 border border-yellow/20 rounded-2xl p-5 space-y-4 shadow-lg backdrop-blur-sm">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-yellow border border-yellow/20">
                                    {order?.user?.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{order?.user?.name}</h3>
                                    <p className="text-yellow font-mono text-sm">#{order?._id.slice(0, 6)}...</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order?.status)}`}>
                                {order?.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="block text-white/50 text-xs uppercase tracking-wide mb-1">Total</span>
                                <span className="font-bold text-yellow text-lg">{order?.totalPrice}EGP</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="block text-white/50 text-xs uppercase tracking-wide mb-1">Date</span>
                                <span className="font-medium text-white">{new Date(order?.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                            <div className="flex justify-between">
                                <span className="text-white/50">Payment</span>
                                <span className="text-white">{order?.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Details</span>
                                <span className="text-white truncate max-w-[150px]">{order?.deliveryAddress}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            {order?.status !== 'DELIVERED' && (
                                <button
                                    onClick={() => {
                                        setOrderToUpdate(order);
                                        setIsUpdateOpen(true);
                                    }}
                                    className="flex-1 py-2.5 rounded-xl bg-yellow text-black font-bold hover:bg-yellow/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    Update
                                </button>
                            )}
                            <button
                                onClick={() => navigate(`/orders/${order._id}`)}
                                className={`flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/10 ${order?.status === 'DELIVERED' ? 'w-full' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Update Modal */}
            <OrderStatusModal
                key={orderToUpdate?._id}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                order={orderToUpdate}
                onUpdate={handleUpdateStatus}
            />
        </div>
    )
}
