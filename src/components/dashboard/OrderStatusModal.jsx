import React, { useState } from 'react';

const ORDER_STATUSES = ['PENDING', 'PREPARING', 'SHIPPED', 'DELIVERED'];

export default function OrderStatusModal({ isOpen, onClose, order, onUpdate }) {
    const [selectedStatus, setSelectedStatus] = useState('');

    if (!isOpen || !order) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED': return 'border-green-400 bg-green-400/10 text-green-400';
            case 'PENDING': return 'border-yellow bg-yellow/10 text-yellow';
            case 'PREPARING': return 'border-blue-400 bg-blue-400/10 text-blue-400';
            case 'SHIPPED': return 'border-purple-400 bg-purple-400/10 text-purple-400';
        }
    };

    const handleSubmit = () => {
        if (selectedStatus && onUpdate) {
            onUpdate(order._id, { status: selectedStatus });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-yellow/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <h3 className="text-2xl font-modern-negra text-white">Update <span className="text-yellow">Status</span></h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Current Status</label>
                        <div className={`px-4 py-3 rounded-xl border ${getStatusColor(order.status)} inline-block`}>
                            {order.status}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">New Status</label>
                        <div className="relative">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow/50 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select status</option>
                                {ORDER_STATUSES.map(status => (
                                    <option key={status} value={status} className="bg-[#1a1a1a]">{status}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-white/50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-xl text-white/70 hover:bg-white/5 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedStatus}
                            className="px-6 py-2 rounded-xl bg-yellow text-black font-bold hover:bg-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
