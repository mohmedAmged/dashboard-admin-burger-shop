import React, { useEffect } from 'react'
import { useProductStore } from '../../store/Products.store';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    const { slug } = useParams();
    const { getAllProducts, products } = useProductStore();
    const productChoosen = products?.find((product) => product?.slug === slug);
    useEffect(() => {
        getAllProducts()
    }, [])
    console.log(productChoosen);

    const { updateProduct, loading } = useProductStore();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        name: productChoosen?.name,
        title: productChoosen?.title,
        description: productChoosen?.description,
        price: productChoosen?.price,
        currency: 'EGP',
        stock: productChoosen?.stock,
        category: productChoosen?.category,
        image: productChoosen?.image,
        available: productChoosen?.available,
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProduct(slug, formData);
        console.log(formData);
        navigate('/products')
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-modern-negra text-white mb-8 text-center md:text-left">
                Update <span className="text-yellow">{productChoosen?.name}</span>
            </h2>

            <form onSubmit={handleSubmit} className="border border-yellow/20 bg-black/50 rounded-3xl p-8 shadow-lg space-y-6 backdrop-blur-sm">
                {/* Grid for inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Product Name</label>
                        <input
                            name="name"
                            value={formData?.name}
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
                            value={formData?.title}
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
                            value={formData?.description}
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
                            value={formData?.price}
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
                            value={formData?.currency}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all cursor-pointer appearance-none"
                        >
                            <option value="EGP" className="text-black">EGP</option>
                        </select>
                    </div>

                    {/* Stock */}
                    <div className="space-y-2">
                        <label className="text-white text-sm font-bold uppercase tracking-wide block">Stock Quantity</label>
                        <input
                            name="stock"
                            value={formData?.stock}
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
                            value={formData?.category}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                            placeholder="e.g. Burgers"
                        />
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <label className="text-white text-sm font-bold uppercase tracking-wide block">Image URL</label>
                            <input
                                name="image"
                                value={formData?.image}
                                onChange={handleChange}
                                type="text"
                                className="w-full bg-white/5 border border-yellow/20 rounded-lg p-3 text-white focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="md:col-span-2 flex items-center gap-3">
                        <input
                            name="available"
                            type="checkbox"
                            id="available"
                            checked={formData?.available}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-yellow/20 bg-white/5 text-yellow focus:ring-yellow focus:ring-1 cursor-pointer accent-yellow"
                        />
                        <label htmlFor="available" className="text-white cursor-pointer select-none">Available for sale</label>
                    </div>

                </div>

                <button type="submit" className="w-full py-4 mt-6 bg-yellow text-black font-bold text-lg rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-yellow/20">
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    )
}
