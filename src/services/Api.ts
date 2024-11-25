import axios from 'axios'
import { AuthTokenError } from './errors/AuthTokenError'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { parseCookies } from 'nookies'
import { JwtPayload } from '@/types/Jwt'

export function setupAPIClient() {
  function getRoleLabel(role: string) {
    switch (role) {
      case 'A':
        return 'api/secure/admin'
      case 'M':
        return 'api/secure/manager'
      case 'I':
        return 'api/secure/instructor'
      case 'U':
        return 'api/secure/user'
      default:
        return 'Desconhecido'
    }
  }
  const userInfo: JwtPayload = jwtDecode(parseCookies().token)
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + getRoleLabel(userInfo.role),
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
