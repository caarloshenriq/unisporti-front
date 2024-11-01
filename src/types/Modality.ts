import { User } from './User'

export interface Modality {
  idModality: number
  instructor: User
  description: string
  maxParticipants: number
  active: boolean
}
