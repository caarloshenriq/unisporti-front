import { Role } from './Role'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  cpf: string
  phone: string
  role: Role
  active: boolean
  birthDate: Date
}
