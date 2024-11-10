export interface Question {
  id_question?: number
  id_poll: number
  question: string
  id_question_type: number
  createdAt?: Date
  updateAt?: Date
  active?: boolean
}
