import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
    { id: 1, name: "Classic Burger", title: "The Classic", description: "Juicy beef patty with cheese, lettuce, and tomato.", price: 12.99, currency: "$", stock: 20, available: true, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80" },
    { id: 2, name: "Cheese Fries", title: "Cheesy Goodness", description: "Crispy fries topped with melted cheese and bacon bits.", price: 5.99, currency: "$", stock: 50, available: true, category: "Sides", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=100&q=80" },
    { id: 3, name: "Chicken Wings", title: "Spicy Wings", description: "Spicy buffalo chicken wings with ranch dip.", price: 10.99, currency: "$", stock: 15, available: false, category: "Chicken", image: "https://images.unsplash.com/photo-1567620832389-428d5960d10b?auto=format&fit=crop&w=100&q=80" },
];

export default function Products() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-modern-negra text-white">
                    All <span className="text-yellow">Products</span>
                </h2>
                <button
                    onClick={() => navigate('/products/create')}
                    className="bg-yellow text-black font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity font-sans"
                >
                    Add New Product
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white whitespace-nowrap">
                        <thead className="bg-yellow/20 text-yellow font-sans uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-5 font-bold">Image</th>
                                <th className="px-6 py-5 font-bold">Name</th>
                                <th className="px-6 py-5 font-bold">Category</th>
                                <th className="px-6 py-5 font-bold">Price</th>
                                <th className="px-6 py-5 font-bold">Stock</th>
                                <th className="px-6 py-5 font-bold">Status</th>
                                <th className="px-6 py-5 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow/10 font-sans text-sm">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-yellow/20">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-base">{product.name}</div>
                                        <div className="text-xs text-white/50">{product.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs border border-white/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-yellow">{product.currency}{product.price}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        {product.available ?
                                            <span className="text-green-400 flex items-center gap-1 text-xs uppercase font-bold tracking-wider">
                                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                                Active
                                            </span>
                                            :
                                            <span className="text-red-400 flex items-center gap-1 text-xs uppercase font-bold tracking-wider">
                                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                                Unavailable
                                            </span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
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
        </div>
    )
}
