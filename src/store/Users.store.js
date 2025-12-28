import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useUsersStore = create((set) => ({
    users: [],
    loading: false,
    error: null,

    // GET ALL USERS 
    getAllUsers: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/users')

            set({
                users: res.data.data,
                loading: false,
            })
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to fetch users'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
}))
