import React, { useState, useEffect } from 'react';
import { useVoucherStore } from '../../store/Voucher.store';
import { useUsersStore } from '../../store/Users.store';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateVoucher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vouchers, getAllVouchers, updateVoucher, loading } = useVoucherStore();
    const { users, getAllUsers } = useUsersStore();
    const [formData, setFormData] = useState({
        code: '',
        type: 'PERCENTAGE',
        value: '',
        maxDiscount: '',
        minOrderValue: '',
        isGlobal: true,
        allowedUsers: [],
        maxTotalUsage: '',
        oncePerUser: true,
        startDate: '',
        endDate: '',
        status: 'ACTIVE'
    });

    useEffect(() => {
        getAllUsers();
        if (vouchers.length === 0) {
            getAllVouchers();
        }
    }, [getAllVouchers, getAllUsers, vouchers.length]);

    useEffect(() => {
        const voucher = vouchers.find(v => v._id === id);
        if (voucher) {
            // Format dates (YYYY-MM-DDThh:mm)
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().slice(0, 16);
            };

            // eslint-disable-next-line react-hooks/exhaustive-deps
            setFormData({
                code: voucher?.code,
                type: voucher?.type,
                value: voucher?.value,
                maxDiscount: voucher?.maxDiscount || '',
                minOrderValue: voucher?.minOrderValue || '',
                isGlobal: voucher?.isGlobal,
                allowedUsers: voucher?.allowedUsers || [],
                maxTotalUsage: voucher?.maxTotalUsage || '',
                oncePerUser: voucher?.oncePerUser,
                startDate: formatDate(voucher?.startDate),
                endDate: formatDate(voucher?.endDate),
                status: voucher?.status
            });
        }
    }, [vouchers, id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUserSelect = (userId) => {
        setFormData(prev => {
            const currentUsers = prev.allowedUsers || [];
            if (currentUsers.includes(userId)) {
                return { ...prev, allowedUsers: currentUsers.filter(id => id !== userId) };
            } else {
                return { ...prev, allowedUsers: [...currentUsers, userId] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVoucher(id, formData);
            navigate('/vouchers');
        } catch (error) {
            console.error("Error updating voucher:", error);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-modern-negra text-white mb-8 text-center md:text-left">
                Update <span className="text-yellow">Voucher</span>
            </h2>

            <form onSubmit={handleSubmit} className="border border-yellow/20 bg-black/50 rounded-3xl p-8 shadow-lg space-y-6 backdrop-blur-sm">
                {/* All inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Code */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Voucher Code</label>
                        <input
                            name="code"
                            value={formData?.code}
                            onChange={handleChange}
                            type="text"
                            required
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all font-mono"
                            placeholder="e.g. SUMMER50"
                        />
                    </div>

                    {/* Type */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Discount Type</label>
                        <select
                            name="type"
                            value={formData?.type}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all cursor-pointer appearance-none"
                        >
                            <option value="PERCENTAGE" className="text-black">Percentage (%)</option>
                            <option value="FIXED" className="text-black">Fixed Amount (EGP)</option>
                        </select>
                    </div>

                    {/* Value */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Discount Value</label>
                        <div className="relative">
                            <input
                                name="value"
                                value={formData?.value}
                                onChange={handleChange}
                                type="number"
                                required
                                min="0"
                                className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                                placeholder="e.g. 50"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">
                                {formData?.type === 'PERCENTAGE' ? '%' : 'EGP'}
                            </span>
                        </div>
                    </div>

                    {/* Max Discount */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Max Discount (Optional)</label>
                        <input
                            name="maxDiscount"
                            value={formData?.maxDiscount}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="Max amount to discount"
                        />
                    </div>

                    {/* Min Order Value */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Min Order Value</label>
                        <input
                            name="minOrderValue"
                            value={formData?.minOrderValue}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="Min cart total required"
                        />
                    </div>

                    {/* Max Total Usage */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Total Usage Limit</label>
                        <input
                            name="maxTotalUsage"
                            value={formData?.maxTotalUsage}
                            onChange={handleChange}
                            type="number"
                            min="0"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="0 for unlimited"
                        />
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Start Date</label>
                        <input
                            name="startDate"
                            value={formData?.startDate}
                            onChange={handleChange}
                            type="datetime-local"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all scheme-dark"
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">End Date</label>
                        <input
                            name="endDate"
                            value={formData?.endDate}
                            onChange={handleChange}
                            type="datetime-local"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all scheme-dark"
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Status</label>
                        <select
                            name="status"
                            value={formData?.status}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all cursor-pointer appearance-none"
                        >
                            <option value="ACTIVE" className="text-black">Active</option>
                            <option value="DISABLED" className="text-black">Disabled</option>
                        </select>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                    {/* Is Global */}
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 h-fit">
                        <input
                            name="isGlobal"
                            type="checkbox"
                            id="isGlobal"
                            checked={formData?.isGlobal}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-yellow/20 bg-white/5 text-yellow focus:ring-yellow focus:ring-1 cursor-pointer accent-yellow"
                        />
                        <div>
                            <label htmlFor="isGlobal" className="text-white font-bold cursor-pointer select-none block">Global Voucher</label>
                            <span className="text-white/50 text-xs">Available to all users</span>
                        </div>
                    </div>

                    {/* Once Per User */}
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 h-fit">
                        <input
                            name="oncePerUser"
                            type="checkbox"
                            id="oncePerUser"
                            checked={formData?.oncePerUser}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-yellow/20 bg-white/5 text-yellow focus:ring-yellow focus:ring-1 cursor-pointer accent-yellow"
                        />
                        <div>
                            <label htmlFor="oncePerUser" className="text-white font-bold cursor-pointer select-none block">Once Per User</label>
                            <span className="text-white/50 text-xs">Limit single use per customer</span>
                        </div>
                    </div>

                    {/* Allowed Users Selection */}
                    {!formData?.isGlobal && (
                        <div className="md:col-span-2 space-y-2 animate-fade-in">
                            <label className="text-white text-sm font-bold uppercase tracking-wide block">Select Allowed Users</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto bg-white/5 border border-yellow/20 rounded-xl p-4 custom-scrollbar">
                                {users?.map(user => (
                                    <div
                                        key={user?._id}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${formData?.allowedUsers?.includes(user?._id)
                                                ? 'bg-yellow/20 border-yellow'
                                                : 'bg-black/20 border-white/10 hover:bg-white/5'
                                            }`}
                                        onClick={() => handleUserSelect(user?._id)}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData?.allowedUsers?.includes(user?._id)
                                                ? 'border-yellow bg-yellow'
                                                : 'border-white/50'
                                            }`}>
                                            {formData?.allowedUsers?.includes(user?._id) && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-black">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className={`text-sm font-bold truncate ${formData?.allowedUsers?.includes(user?._id) ? 'text-yellow' : 'text-white'}`}>
                                                {user?.name}
                                            </span>
                                            <span className="text-xs text-white/50 truncate">{user?.email}</span>
                                        </div>
                                    </div>
                                ))}
                                {users?.length === 0 && (
                                    <div className="col-span-full text-center py-4 text-white/50">No users found.</div>
                                )}
                            </div>
                            <p className="text-xs text-white/50 text-right">Selected: {formData?.allowedUsers?.length} users</p>
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full py-4 bg-yellow text-black font-bold text-lg rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-yellow/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Updating Voucher...' : 'Update Voucher'}
                    </button>
                    <button type="button" onClick={() => navigate('/vouchers')} className="w-full mt-3 py-3 text-white/50 bg-transparent hover:text-white transition-colors cursor-pointer">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
