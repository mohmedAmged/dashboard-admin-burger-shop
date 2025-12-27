import React from 'react';

const orders = [
    { id: "ORD-7821", total: 25.50, status: "Pending", address: "123 Main St, New York, NY 10001", payment: "Credit Card", user: "John Doe", date: "2024-10-25" },
    { id: "ORD-7822", total: 42.00, status: "Delivered", address: "456 Park Ave, New York, NY 10022", payment: "PayPal", user: "Jane Smith", date: "2024-10-24" },
    { id: "ORD-7823", total: 18.99, status: "Processing", address: "789 Broadway, New York, NY 10003", payment: "Credit Card", user: "Alice Johnson", date: "2024-10-26" },
    { id: "ORD-7824", total: 55.00, status: "Cancelled", address: "321 5th Ave, New York, NY 10016", payment: "Cash", user: "Robert Brown", date: "2024-10-23" },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'Pending': return 'text-yellow bg-yellow/10 border-yellow/20';
        case 'Processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-white bg-white/10 border-white/20';
    }
};

export default function Orders() {
    return (
        <div className="w-full">
            <h2 className="text-4xl font-modern-negra text-white mb-8">
                Manage <span className="text-yellow">Orders</span>
            </h2>

            <div className="overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg">
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
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-yellow">#{order.id}</td>
                                    <td className="px-6 py-4 text-white/60">{order.date}</td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-yellow">
                                                {order.user.charAt(0)}
                                            </div>
                                            {order.user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-white/70">{order.payment}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/60 max-w-xs truncate" title={order.address}>
                                        {order.address}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 rounded-lg bg-yellow/20 text-yellow hover:bg-yellow hover:text-black transition-colors" title="Update Status">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                </svg>
                                            </button>
                                            <button className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors" title="View Details">
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
        </div>
    )
}
