import { User } from './User'

export interface Modality {
  id_modality: number
  id_instructor: User
  description: string
  max_participants: number
  active: boolean
}
