// src/utils/submitPoll.ts

import { api } from '@/services/ApiClient'
import { Poll } from '@/types/Poll'
import { Question } from '@/types/Question'
import toast from 'react-hot-toast'

export const createPoll = async (poll: Poll, options: Question[]) => {
  try {
    const pollRes = await api.post('api/v1/poll', poll)

    const idPoll = pollRes.data.id_poll

    for (const option of options) {
      const question = { ...option, id_poll: idPoll }
      await api.post('api/v1/question', question)
    }
  } catch (error) {
    console.error(error)
  }
}
