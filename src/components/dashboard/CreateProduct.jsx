import React, { useState } from 'react';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        price: '',
        currency: 'USD',
        stock: '',
        category: '',
        available: true,
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Create Product:", formData);
        // Logic to submit
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-modern-negra text-white mb-8">
                Create <span className="text-yellow">New Product</span>
            </h2>

            <form onSubmit={handleSubmit} className="border border-yellow/20 bg-black/50 rounded-3xl p-8 shadow-lg space-y-6 backdrop-blur-sm">
                {/* Grid for inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Product Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="e.g. Classic Burger"
                        />
                    </div>
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Title (Subtitle)</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="e.g. The Best in Town"
                        />
                    </div>

                    {/* Description - Full Width */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all resize-none"
                            placeholder="Product details..."
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Price</label>
                        <input
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="0.00"
                        />
                    </div>
                    {/* Currency */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all cursor-pointer appearance-none"
                        >
                            <option value="USD" className="text-black">USD ($)</option>
                            <option value="EUR" className="text-black">EUR (€)</option>
                            <option value="GBP" className="text-black">GBP (£)</option>
                        </select>
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Stock Quantity</label>
                        <input
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            type="number"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="0"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Category</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="e.g. Burgers"
                        />
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Product Image</label>
                        <div className="border-2 border-dashed border-yellow/30 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center gap-2 text-white/50 group-hover:text-white/80 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p>{formData.image ? `Selected: ${formData.image.name}` : "Click to upload or drag and drop"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="md:col-span-2 flex items-center gap-3">
                        <input
                            name="available"
                            type="checkbox"
                            id="available"
                            checked={formData.available}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-yellow/20 bg-white/5 text-yellow focus:ring-yellow focus:ring-1 cursor-pointer accent-yellow"
                        />
                        <label htmlFor="available" className="text-white cursor-pointer select-none">Available for sale</label>
                    </div>

                </div>

                <button type="submit" className="w-full py-4 mt-6 bg-yellow text-black font-bold text-lg rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-yellow/20">
                    Create Product
                </button>
            </form>
        </div>
    )
}
