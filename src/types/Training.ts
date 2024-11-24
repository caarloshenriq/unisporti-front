import { Modality } from './Modality'
import { Place } from './Place'

export interface Training {
  id_training?: number
  id_modality: number
  id_place: number
  description: string
  week_day: number
  start_hour: number
  end_hour: number
  active: boolean
}
