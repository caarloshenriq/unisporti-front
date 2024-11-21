import { Role } from './Role'

export interface User {
  id_user?: number
  email: string
  first_name: string
  last_name: string
  cpf: string
  phone: string
  role: string
  active: boolean
  birth_date: Date
}
