import React, { FormEvent, ReactNode } from 'react'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (e: FormEvent) => Promise<void>
  title: string
  children: ReactNode
  type: 'read' | 'register' | 'update' | 'delete' | 'payment'
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  type,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-w-sm relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        {type === 'read' ? (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 text-sm absolute bottom-4 right-4 hover:text-gray-700"
            >
              Fechar
            </button>
          </div>
        ) : type === 'register' || type === 'update' ? (
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        ) : type === 'delete' ? (
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Confirmar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CustomModal
