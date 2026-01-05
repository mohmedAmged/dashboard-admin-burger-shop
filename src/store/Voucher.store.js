import { create } from 'zustand'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const useVoucherStore = create((set) => ({
    vouchers: [],
    loading: false,
    error: null,

    // GET ALL VOUCHERS 
    getAllVouchers: async () => {
        set({ loading: true, error: null })

        try {
            const res = await api.get('/vouchers')

            set({
                vouchers: res.data.data,
                loading: false,
            })
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to fetch vouchers'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
    // CREATE VOUCHER
    createVoucher: async (voucherData) => {
        set({ loading: true, error: null })

        try {
            const res = await api.post('/vouchers/create', voucherData)

            set((state) => ({
                vouchers: [...state.vouchers, res.data.data],
                loading: false,
            }))
            toast.success(res.data.message);
            console.log(res.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to create voucher'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },
    // UPDATE VOUCHER
    updateVoucher: async (id, voucherData) => {
        set({ loading: true, error: null })

        try {
            const res = await api.put(`/vouchers/update/${id}`, voucherData)

            set((state) => ({
                vouchers: state.vouchers.map((v) => 
                    v._id === id ? res.data.data : v
                ),
                loading: false,
            }))
            toast.success(res.data.message);
            console.log(res.data.data)
            return res.data.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to update voucher'

            toast.error(message)

            set({
                loading: false,
                error: message,
            })

            throw error
        }
    },

    // DELETE VOUCHER
    deleteVoucher: async (id) => {
        set({ loading: true, error: null })

        try {
            const res = await api.delete(`/vouchers/delete/${id}`)

            set((state) => ({
                vouchers: state.vouchers.filter((v) => v._id !== id),
                loading: false,
            }))
            console.log(res.data);
            toast.success(res.data.message,
                { style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff2d4',
                }},
            );
            return res.data
        } catch (error) {
            const message =
                error.response?.data?.error || 'Failed to delete voucher'

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