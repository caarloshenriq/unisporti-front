import axios from 'axios'
// import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient() {
  // const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers: {
    //   Authorization: `Bearer ${cookies["@masterRevestimentos.token"]}`,
    // },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          console.log('oiee')
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
