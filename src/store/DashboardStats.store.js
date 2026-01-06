import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useDashboardStatsStore = create((set) => ({
    stats: null,
    loading: false,
    error: null,

    getDashboardStats: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/dashboard-stats') 
            
            set({
                stats: res.data.data || res.data, 
                loading: false,
            })
            return res.data
        } catch (error) {
            const message = error.response?.data?.error || 'Failed to fetch dashboard stats'
            toast.error(message)
            set({
                loading: false,
                error: message,
            })
            throw error
        }
    },
}))
