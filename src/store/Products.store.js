import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    // GET ALL PRODUCTS 
    getAllProducts: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/products')

            set({
                products: res.data.data,
                loading: false,
            })
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to fetch products'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
    // CREATE PRODUCT
    createProduct: async (productData) => {
        set({ loading: true, error: null })

        try {
            const res = await api.post('/products/create', productData)

            set({
                products: [res.data.data],
                loading: false,
            })
            toast.success(res.data.message);
            console.log(res.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to create product'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
    // UPDATE PRODUCT
    updateProduct: async (slug, productData) => {
        set({ loading: true, error: null })

        try {
            const res = await api.put(`/products/update/${slug}`, productData)

            set({
                products: res.data.data,
                loading: false,
            })
            toast.success(res.data.message);
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to update product'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },

    // DELETE PRODUCT
    deleteProduct: async (slug) => {
        set({ loading: true, error: null })

        try {
            const res = await api.delete(`/products/remove/${slug}`)

            set({
                products: res.data.data,
                loading: false,
            })
            console.log(res.data.data);
            toast.success(res.data.message);
            // window.location.reload();
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to delete product'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
})
)
