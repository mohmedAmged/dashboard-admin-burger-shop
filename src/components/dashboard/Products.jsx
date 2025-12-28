import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/Products.store';



export default function Products() {
    const navigate = useNavigate();
    const { getAllProducts, products, deleteProduct } = useProductStore()
    useEffect(() => {
        getAllProducts()
    }, [deleteProduct, getAllProducts])
    console.log(products);
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl md:text-4xl font-modern-negra text-white text-center md:text-left">
                    All <span className="text-yellow">Products</span>
                </h2>
                <button
                    onClick={() => navigate('/products/create')}
                    className="bg-yellow text-black font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity font-sans w-full md:w-auto"
                >
                    Add New Product
                </button>
            </div>

            {/* Desktop Table View */}
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-yellow/20 bg-black/50 shadow-lg max-w-[100vw] md:max-w-full">
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
                            {products?.map((product) => (
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
                                            {product?.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-yellow">{product?.price}{product?.currency}</td>
                                    <td className="px-6 py-4">{product?.stock}</td>
                                    <td className="px-6 py-4">
                                        {product?.available ?
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
                                            <button
                                                onClick={() => navigate(`/products/update/${product.slug}`)} className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteProduct(product.slug)}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
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

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products?.map((product) => (
                    <div key={product.id} className="bg-black/50 border border-yellow/20 rounded-2xl p-4 space-y-4 shadow-lg backdrop-blur-sm flex flex-col">
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                            <div className="absolute top-2 right-2">
                                {product?.available ?
                                    <span className="px-2 py-1 rounded-md bg-green-400/20 text-green-400 text-xs font-bold uppercase backdrop-blur-md border border-green-400/20">
                                        Active
                                    </span>
                                    :
                                    <span className="px-2 py-1 rounded-md bg-red-400/20 text-red-400 text-xs font-bold uppercase backdrop-blur-md border border-red-400/20">
                                        Unavailable
                                    </span>
                                }
                            </div>
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-bold text-lg text-white leading-tight">{product.name}</h3>
                                    <p className="text-white/50 text-xs">{product.title}</p>
                                </div>
                                <span className="font-mono text-yellow font-bold text-lg">{product.price}<span className="text-sm">{product.currency}</span></span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/70 border border-white/10">
                                    {product?.category}
                                </span>
                                <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/70 border border-white/10">
                                    Stock: {product?.stock}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex gap-2">
                            <button
                                onClick={() => navigate(`/products/update/${product.slug}`)}
                                className="flex-1 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors text-sm font-bold"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteProduct(product.slug)}
                                className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-sm font-bold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
