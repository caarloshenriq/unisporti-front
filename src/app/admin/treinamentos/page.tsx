'use client'

import CustomModal from '@/components/CustomModal';
import Header from '@/components/Header';
import Sidebar from '@/components/sidebar';
import { api } from '@/services/ApiClient';
import { Modality } from '@/types/Modality';
import { Place } from '@/types/Place';
import { Training } from '@/types/Training';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getWeekdayLabel } from './Training';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function Treinamentos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training>();
  const [placesData, setPlacesData] = useState<Place[]>([]);
  const [modalitiesData, setModalitiesData] = useState<Modality[]>([]);
  const [trainingData, setTrainingData] = useState<Training[]>([]);
  const [newTraining, setNewTraining] = useState<Training>({
    id_modality: 0,
    id_place: 0,
    description: '',
    week_day: 0,
    start_hour: 0,
    end_hour: 0,
    active: true,
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeResponse = await api.get('/place');
        setPlacesData(placeResponse.data);

        const modalityResponse = await api.get('/modality');
        setModalitiesData(modalityResponse.data);

        const trainingResponse = await api.get('/training');
        setTrainingData(trainingResponse.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  const places = useMemo(() => placesData, [placesData]);
  const modalities = useMemo(() => modalitiesData, [modalitiesData]);
  const trainings = useMemo(() => trainingData, [trainingData]);

  const createTraining = useCallback(async () => {
    try {
      await api.post('/training', newTraining);
      toast.success('Treinamento criado com sucesso!');
      setShowCreateModal(false);
      setSelectedTraining(undefined);
    } catch (error) {
      toast.error('Erro ao criar o treinamento!');
      console.error('Erro ao criar o treinamento:', error);
    }
  }, [newTraining]);

  const openDeleteModal = (training: Training) => {
    setSelectedTraining(training)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedTraining(undefined)
    setShowDeleteModal(false)
  }

  const openUpdateModal = (training: Training) => {
    setSelectedTraining(training)
    setShowUpdateModal(true)
  }

  const closeUpdateModal = () => {
    setShowUpdateModal(false)
  }

  const confirmDelete = async () => {
    if (selectedTraining) {
      try {
        await api.delete(`/training/${selectedTraining.id_training}`)
        closeDeleteModal()
        toast.success('Treino deletada com sucesso!')
      } catch (error) {
        console.error('Erro ao deletar a treino:', error)
        closeDeleteModal()
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-8 h-full overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Treinamentos</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Nome</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Dia da semana</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Inicio</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Fim</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Lugar</th>
                  <th className="py-2 px-4 border-b text-center font-semibold text-gray-700">Modalidade</th>
                  <th className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-uniporraGreen1 px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors text-white"
                    >
                      Novo
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainings.length > 0 ? (
                  trainings.map((training) => {
                    const place = places.find((place) => place.id_place === training.id_place);
                    const modality = modalities.find((modality) => modality.id_modality === training.id_modality);
                    return (
                      <tr key={training.id_modality} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 border-b text-center text-gray-700">{training.description}</td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">{getWeekdayLabel(training.week_day)}</td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {training.start_hour.toFixed(2).replace(".", ":")}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">
                          {training.end_hour.toFixed(2).replace(".", ":")}
                        </td>
                        <td className="py-3 px-4 border-b text-center text-gray-700">{place ? place.name : 'Lugar não encontrado'}</td>
                        <td className='py-3 px-4 border-b text-center text-gray-700'>{modality ? modality.description : 'Modalidade não encontrada'}</td>
                        <td className="py-3 px-4 border-b text-center">
                          <div className="flex justify-center space-x-4">
                            <span
                              onClick={() => openUpdateModal(training)}
                              className="cursor-pointer text-uniporraGreen1 hover:text-uniporraGreen2"
                              title="Editar"
                            >
                              <FiEdit size={20} />
                            </span>
                            <span
                              onClick={() => openDeleteModal(training)}
                              className="cursor-pointer text-red-600 hover:text-red-700"
                              title="Excluir"
                            >
                              <FiTrash size={20} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-gray-500">Nenhum lugar encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        <CustomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Novo Treinamento"
          onConfirm={createTraining}
          type='register'
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
              <input
                id="description"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
              />
            </div>
            <div className="flex flex-row">
              <div className="mr-2">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Horário de Início</label>
                <input
                  id="startTime"
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    const timeString = e.target.value.replace(":", ".");
                    setNewTraining({ ...newTraining, start_hour: parseFloat(timeString) });
                  }}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Horário de Fim</label>
                <input
                  id="endTime"
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    const timeString = e.target.value.replace(":", ".");
                    setNewTraining({ ...newTraining, end_hour: parseFloat(timeString) });
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="weekday" className="block text-sm font-medium text-gray-700">Dia da Semana</label>
              <select
                id="weekday"
                name="weekday"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setNewTraining({ ...newTraining, week_day: parseInt(e.target.value, 10) })}
              >
                <option value="">Selecione um dia</option>
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
                <option value={6}>Sábado</option>
              </select>
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700">Lugar</label>
              <select
                id="place"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setNewTraining({ ...newTraining, id_place: parseInt(e.target.value, 10) })}
              >
                <option value="">Selecione um lugar</option>
                {places.map((place) => (
                  <option key={place.id_place} value={place.id_place}>{place.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="modality" className="block text-sm font-medium text-gray-700">Modalidade</label>
              <select
                id="modality"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setNewTraining({ ...newTraining, id_modality: parseInt(e.target.value, 10) })}
              >
                <option value="">Selecione uma modalidade</option>
                {modalities.map((modality) => (
                  <option key={modality.id_modality} value={modality.id_modality}>{modality.description}</option>
                ))}
              </select>
            </div>
          </form>
        </CustomModal>
        <CustomModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          title="Confirmar Exclusão"
          type="delete"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir a modalidade{' '}
            <strong>{selectedTraining?.description}</strong>?
          </p>
        </CustomModal>

        <CustomModal
          isOpen={showUpdateModal}
          onClose={closeUpdateModal}
          title="Editar Treinamento"
          onConfirm={async () => {
            try {
              console.log(selectedTraining)
              await api.put(`/training`, selectedTraining);
              toast.success('Treinamento atualizado com sucesso!');
              closeUpdateModal();
            } catch (error) {
              toast.error('Erro ao atualizar o treinamento!');
              console.error('Erro ao atualizar o treinamento:', error);
            }
          }}
          type="update"
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
              <input
                id="description"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={selectedTraining?.description || ''}
                onChange={(e) => setSelectedTraining({ ...selectedTraining, description: e.target.value } as Training)}
              />
            </div>
            <div className="flex flex-row">
              <div className="mr-2">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Horário de Início</label>
                <input
                  id="startTime"
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={selectedTraining ? selectedTraining.start_hour.toFixed(2).replace(".", ":") : ''}
                  onChange={(e) => {
                    const timeString = e.target.value.replace(":", ".");
                    setSelectedTraining({ ...selectedTraining, start_hour: parseFloat(timeString) } as Training);
                  }}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Horário de Fim</label>
                <input
                  id="endTime"
                  type="time"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={selectedTraining ? selectedTraining.end_hour.toFixed(2).replace(".", ":") : ''}
                  onChange={(e) => {
                    const timeString = e.target.value.replace(":", ".");
                    setSelectedTraining({ ...selectedTraining, end_hour: parseFloat(timeString) } as Training);
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="weekday" className="block text-sm font-medium text-gray-700">Dia da Semana</label>
              <select
                id="weekday"
                name="weekday"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={selectedTraining?.week_day || ''}
                onChange={(e) => setSelectedTraining({ ...selectedTraining, week_day: parseInt(e.target.value, 10) } as Training)}
              >
                <option value="">Selecione um dia</option>
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
                <option value={6}>Sábado</option>
              </select>
            </div>
            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700">Lugar</label>
              <select
                id="place"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={selectedTraining?.id_place || ''}
                onChange={(e) => setSelectedTraining({ ...selectedTraining, id_place: parseInt(e.target.value, 10) } as Training)}
              >
                <option value="">Selecione um lugar</option>
                {places.map((place) => (
                  <option key={place.id_place} value={place.id_place}>{place.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="modality" className="block text-sm font-medium text-gray-700">Modalidade</label>
              <select
                id="modality"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={selectedTraining?.id_modality || ''}
                onChange={(e) => setSelectedTraining({ ...selectedTraining, id_modality: parseInt(e.target.value, 10) } as Training)}
              >
                <option value="">Selecione uma modalidade</option>
                {modalities.map((modality) => (
                  <option key={modality.id_modality} value={modality.id_modality}>{modality.description}</option>
                ))}
              </select>
            </div>
          </form>
        </CustomModal>

      </div>
    </div>
  );
}
