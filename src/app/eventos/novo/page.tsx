'use client';

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function CreateEvent() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventTime, setEventTime] = useState<string>('');

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Função de submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      name: eventName,
      date: eventDate,
      time: eventTime,
    };

    console.log('Evento Cadastrado:', eventData);
    alert("Evento cadastrado com sucesso!");

    setEventName('');
    setEventDate('');
    setEventTime('');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex items-center justify-center h-full p-8">
          <div className="bg-white p-10 shadow-lg rounded-lg max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Novo Evento</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="eventName">Nome do Evento:</label>
                <input
                  type="text"
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  placeholder="Digite o nome do evento"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="eventDate">Data do Evento:</label>
                <input
                  type="date"
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2" htmlFor="eventTime">Hora do Evento:</label>
                <input
                  type="time"
                  id="eventTime"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full border-gray-300 border rounded-md p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-uniporraGreen2 text-white font-semibold rounded-md px-4 py-2 transition-colors"
              >
                Cadastrar Evento
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
