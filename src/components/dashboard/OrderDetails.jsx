import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrdersStore } from '../../store/Orders.store';
import OrderStatusModal from './OrderStatusModal';

const getStatusColor = (status) => {
    switch (status) {
        case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'PENDING': return 'text-yellow bg-yellow/10 border-yellow/20';
        case 'PREPARING': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'SHIPPED': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    }
};

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOrderDetails, currentOrder, loading, updateOrderStatus } = useOrdersStore();
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, [id, getOrderDetails]);

    const handleUpdateStatus = async (id, statusData) => {
        await updateOrderStatus(id, statusData);
        // Refresh details after update
        getOrderDetails(id);
    };

    if (loading) {
        return <div className="text-white p-10">Loading...</div>;
    }

    if (!currentOrder) {
        return <div className="text-white p-10">Order not found</div>;
    }

    const order = currentOrder;
    console.log(currentOrder);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 md:gap-0">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={() => navigate('/orders')}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h2 className="text-2xl md:text-4xl font-modern-negra text-white">
                        Order <span className="text-yellow">Details</span>
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider border w-full sm:w-auto text-center ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                    {order.status !== 'DELIVERED' && (
                        <button
                            onClick={() => setIsUpdateOpen(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-yellow text-black font-bold hover:bg-yellow/90 transition-colors w-full sm:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Update Status
                        </button>
                    )
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Customer & Order Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-black/50 rounded-3xl p-6 border border-yellow/20">
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            Customer Information
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-white/50">Name</span>
                                <span className="text-white font-medium">{order?.user?.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-white/50">Email</span>
                                <span className="text-white font-medium">{order?.user?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">Phone</span>
                                <span className="text-white font-medium">{order?.user?.phone || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery & Payment */}
                    <div className="bg-black/50 rounded-3xl p-6 border border-yellow/20">
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Delivery & Payment
                        </h4>
                        <div className="space-y-4">
                            <div className="group">
                                <span className="text-white/50 block text-xs mb-2 uppercase tracking-wide">Delivery Address</span>
                                <div className="text-white bg-white/5 p-4 rounded-xl text-sm leading-relaxed border border-white/5">
                                    {order.deliveryAddress}
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-white/50">Payment Method</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                                    {order.paymentMethod}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2">
                                <span className="text-white/50">Order Date</span>
                                <span className="text-white font-mono text-sm">
                                    {new Date(order.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Items & Summary */}
                <div className="flex flex-col h-full">
                    <div className="bg-black/50 rounded-3xl p-6 border border-yellow/20 flex-grow flex flex-col h-full">
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Order Items
                        </h4>

                        <div className="space-y-4 overflow-y-auto mb-6 custom-scrollbar pr-2 flex-grow">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-20 h-20 rounded-xl bg-black/50 overflow-hidden shrink-0 border border-white/10">
                                        {item?.product?.image ? (
                                            <img src={item?.product?.image} alt={item?.product?.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h5 className="text-lg font-bold text-white">{item?.product?.name}</h5>
                                        <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                                            <span className="text-white/50 bg-white/5 px-2 py-1 rounded-md text-sm">Qty: <span className="text-white font-bold">{item?.quantity || 1}

                                            </span>

                                            </span>
                                            <span className="text-white/50 bg-white/5 px-2 py-1 rounded-md text-sm">price: <span className="text-white font-bold">{item?.price}EGP * {item?.quantity || 1} = {item?.price * (item?.quantity || 1)}EGP
                                            </span>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <span className="text-white/50 text-sm font-medium uppercase tracking-wide">Total Amount</span>
                                <span className="text-3xl font-modern-negra text-yellow">{order.totalPrice} <span className="text-lg text-yellow/50">EGP</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OrderStatusModal
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                order={order}
                onUpdate={handleUpdateStatus}
            />
        </div>
    )
}
