import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL } from '../functions/baseUrl'

const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('adminToken')
      Cookies.remove('adminData')
      
      const protectedPaths = ['/', '/users', '/products', '/vouchers', '/orders']
      const currentPath = window.location.pathname
      
      const isProtected = protectedPaths.some(path => currentPath.startsWith(path))
      
      if (isProtected) {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default api