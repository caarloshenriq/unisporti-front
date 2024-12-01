import { useEffect, useMemo, useState } from 'react'
import { api } from '@/services/ApiClient'
import { UserPlan } from '@/types/UserPlan'
import { User } from '@/types/User'
import { Plan } from '@/types/Plan'
import { Modality } from '@/types/Modality'
import { Training } from '@/types/Training'

export function useUserModalityData() {
  const [userPlanData, setUserPlanData] = useState<UserPlan[]>([])
  const [usersData, setUsersData] = useState<User[]>([])
  const [modalityData, setModalityData] = useState<Modality[]>([])
  const [planData, setPlanData] = useState<Plan[]>([])
  const [trainingData, setTrainingData] = useState<Training[]>([])

  // Fetch User Plans
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await api.get('/user-plan')
        setUserPlanData(response.data)
      } catch (error) {
        console.error('Erro ao buscar os planos do usuário:', error)
      }
    }
    fetchUserPlan()
  }, [])

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/user')
        setUsersData(response.data)
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error)
      }
    }
    fetchUsers()
  }, [])

  // Fetch Plans
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await api.get('/plan')
        setPlanData(response.data)
      } catch (error) {
        console.error('Erro ao buscar os planos:', error)
      }
    }
    fetchPlan()
  }, [])

  // Fetch Modalities
  useEffect(() => {
    const fetchModality = async () => {
      try {
        const response = await api.get('/modality')
        setModalityData(response.data)
      } catch (error) {
        console.error('Erro ao buscar as modalidades:', error)
      }
    }
    fetchModality()
  }, [])

  useEffect(() => {
    const fetchModality = async () => {
      try {
        const response = await api.get('/training')
        setTrainingData(response.data)
      } catch (error) {
        console.error('Erro ao buscar as modalidades:', error)
      }
    }
    fetchModality()
  }, [])

  const userPlan = useMemo(() => userPlanData, [userPlanData])
  const users = useMemo(() => usersData, [usersData])
  const plans = useMemo(() => planData, [planData])
  const modalities = useMemo(() => modalityData, [modalityData])
  const trainings = useMemo(() => trainingData, [trainingData])

  return { userPlan, users, plans, modalities, trainings }
}

export function getRoleLabel(status: String) {
  switch (status) {
    case 'P':
      return 'Pendente'
    case 'C':
      return 'Cancelado'
    case 'D':
      return 'Finalizado'
    default:
      return 'Desconhecido'
  }
}
