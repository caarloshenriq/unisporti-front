import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import axios from 'axios'


export default async function Login() {
  const handleLogin = async (formData: FormData) => {
  "use server"
  const cpf = formData.get('cpf')
  const password = formData.get('password')
  console.log(cpf, password)

  if (cpf && password) {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'api/auth/login', {
        cpf,
        password,
      })

      const cookieStore = await cookies()
      cookieStore.set('token', response.data.token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      })
    } catch (error) {
      console.error(error)
      return
    }
    redirect('/dashboard')
  }}


  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-uniporrabg p-8 rounded-lg shadow-md">
        <div className='flex flex-col items-center justify-center'>
        <img src="logo.png" alt="" className='w-28 h-28 items-center' />
        </div>
        <form action={handleLogin}>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              required
              maxLength={14}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
