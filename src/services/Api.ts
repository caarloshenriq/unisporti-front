import axios from 'axios'
import { AuthTokenError } from './errors/AuthTokenError'
import { getCookie } from 'cookies-next'

export function setupAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  api.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${getCookie('token')}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          console.log('Usuário não autenticado')
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      return Promise.reject(error)
    }
  )

  return api
}
