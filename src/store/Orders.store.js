import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useOrdersStore = create((set) => ({
    orders: [],
    loading: false,
    error: null,

    // GET ALL ORDERS 
    getAllOrders: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/orders/all-orders')

            set({
                orders: res.data.data,
                loading: false,
            })
            console.log(res)
            toast.success(res.data.message);
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to fetch orders'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },

    // UPDATE ORDER STATUS
    updateOrderStatus: async (id, status) => {
        set({ loading: true, error: null })

        try {
            const res = await api.put(`/orders/${id}/status`, status)

            set({
                orders: res.data.data,
                loading: false,
            })
            toast.success(res.data.message);
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to update order status'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },

    // GET ORDER DETAILS
    getOrderDetails: async (orderId) => {
        set({ loading: true, currentOrder: null });
        try {
            const res = await api.get(`/orders/all-orders/${orderId}`);
            set({ currentOrder: res.data.data });
        } catch (err) {
            toast.error(err?.response?.data?.error);
        } finally {
            set({ loading: false });
        }
    },

}))
