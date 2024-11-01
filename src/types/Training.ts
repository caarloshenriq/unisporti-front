import { Modality } from './Modality'
import { Place } from './Place'

export interface Training {
  idTraining: number
  modality: Modality
  place: Place
  description: string
  weekDay: number
  startTime: string
  endTime: string
  active: boolean
}
