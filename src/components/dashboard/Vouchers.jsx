import React, { useEffect } from 'react';
import { useVoucherStore } from '../../store/Voucher.store';
import { useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';

const getStatusColor = (status) => {
    switch (status) {
        case 'ACTIVE': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'DISABLED': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-white bg-white/10 border-white/20';
    }
};

export default function Vouchers() {
    const { vouchers, getAllVouchers, deleteVoucher, loading } = useVoucherStore();
    const navigate = useNavigate();

    useEffect(() => {
        getAllVouchers();
    }, [getAllVouchers]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this voucher? This action cannot be undone.')) {
            await deleteVoucher(id);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl md:text-4xl font-modern-negra text-white text-center md:text-left">
                    Manage <span className="text-yellow">Vouchers</span>
                </h2>
                <button
                    onClick={() => navigate('/vouchers/create')}
                    className="px-6 py-3 bg-yellow text-black font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-yellow/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Voucher
                </button>
            </div>
            { loading ? <Loader title={"vouchers"}/> :
                <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg max-w-[100vw] md:max-w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white whitespace-nowrap">
                        <thead className="bg-yellow/20 text-yellow font-sans uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-5 font-bold">Code</th>
                                <th className="px-6 py-5 font-bold">Type</th>
                                <th className="px-6 py-5 font-bold">Value</th>
                                <th className="px-6 py-5 font-bold">Usage</th>
                                <th className="px-6 py-5 font-bold">Dates</th>
                                <th className="px-6 py-5 font-bold">Status</th>
                                <th className="px-6 py-5 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow/10 font-sans text-sm">
                            {vouchers?.map((voucher) => (
                                <tr key={voucher?._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-yellow">{voucher?.code}</td>
                                    <td className="px-6 py-4 text-white/70">{voucher?.type}</td>
                                    <td className="px-6 py-4 font-bold">
                                        {voucher?.value}{voucher?.type === 'PERCENTAGE' ? '%' : ' EGP'}
                                    </td>
                                    <td className="px-6 py-4 text-white/60">
                                        {voucher?.usedCount} / {voucher?.maxTotalUsage || '∞'}
                                    </td>
                                    <td className="px-6 py-4 text-white/60 text-xs">
                                        <div>Start: {voucher?.startDate ? new Date(voucher?.startDate).toLocaleDateString() : 'N/A'}</div>
                                        <div>End: {voucher?.endDate ? new Date(voucher?.endDate).toLocaleDateString() : 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(voucher?.status)}`}>
                                            {voucher?.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/vouchers/update/${voucher._id}`)}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                                                title="Edit Voucher"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(voucher?._id)}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                title="Delete Voucher"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
                {vouchers?.map((voucher) => (
                    <div key={voucher?._id} className="bg-black/50 border border-yellow/20 rounded-2xl p-5 space-y-4 shadow-lg backdrop-blur-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-yellow text-lg font-mono tracking-wider">{voucher?.code}</h3>
                                <p className="text-white/60 text-xs uppercase">{voucher?.type}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(voucher?.status)}`}>
                                {voucher?.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="block text-white/50 text-xs uppercase tracking-wide mb-1">Value</span>
                                <span className="font-bold text-white text-lg">
                                    {voucher?.value}{voucher?.type === 'PERCENTAGE' ? '%' : ' EGP'}
                                </span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <span className="block text-white/50 text-xs uppercase tracking-wide mb-1">Usage</span>
                                <span className="font-medium text-white">
                                    {voucher?.usedCount} / {voucher?.maxTotalUsage || '∞'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                            <div className="flex justify-between">
                                <span className="text-white/50">Start Date</span>
                                <span className="text-white">{voucher?.startDate ? new Date(voucher?.startDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/50">End Date</span>
                                <span className="text-white">{voucher?.endDate ? new Date(voucher?.endDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button
                                onClick={() => navigate(`/vouchers/update/${voucher?._id}`)}
                                className="flex-1 py-2.5 rounded-xl bg-yellow text-black font-bold hover:bg-yellow/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(voucher?._id)}
                                className="flex-1 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
                </>
            }
            
        </div>
    )
}
