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

export default api