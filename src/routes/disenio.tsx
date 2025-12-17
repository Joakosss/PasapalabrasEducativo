import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import useBuildRosco from '@/hooks/useBuildRosco'
import EditLetterModal from '@/components/EditForm/EditLetterModal'
import ModalStartEdit from '@/components/ModalStartEdit'

import type { Letter } from '@/Models/Letra'
import RoscoEdit from '@/components/Roscos/RoscoEdit'
import { useRoscoStore } from '@/store/useRoscoStore'
import { FaDownload } from 'react-icons/fa'
export const Route = createFileRoute('/disenio')({
  component: RouteComponent,
})

function RouteComponent() {
  const { roscoEditing: IsRoscoJson } = useRoscoStore()
  const [isRoscoName, setIsRoscoName] = useState('Nuevo Rosco')
  const [isOpen, setIsOpen] = useState<boolean>(false) // Para abrir y cerrar el modal
  const [isSelected, setIsSelected] = useState<string>('A') // Para abrir y cerrar el modal
  const [isStarted, setIsStarted] = useState<boolean>(true) // Para abrir y cerrar el modal de inicio

  // --- LÓGICA DE LAYOUT ---
  const { radio, roscoRef } = useBuildRosco()

  const handleDownloadRosco = (rosco: Letter[]) => {
    const json = JSON.stringify(rosco, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${isRoscoName}.json` // nombre del archivo Esto tenemos que modificarlo
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen">
      {isStarted && (
        <ModalStartEdit
          setIsStarted={setIsStarted}
          setIsRoscoName={setIsRoscoName}
          key={'StartModal'}
        />
      )}

      {/* Rosco completo en el componente */}
      <RoscoEdit
        IsRoscoJson={IsRoscoJson}
        setIsOpen={setIsOpen}
        setIsSelected={setIsSelected}
        radio={radio}
        roscoRef={roscoRef}
        key={'RoscoEditando'}
      >
        {/* Titulo */}
        <input
          className="text-3xl font-extrabold py-2 text-center  text-blue-800 cursor-pointer border-2"
          value={isRoscoName}
          onChange={(e) => setIsRoscoName(e.target.value)}
        />

        <h2 className="text-5xl font-extrabold pt-5 text-center text-blue-800">
          Editando
        </h2>

        {/* Boton de guardar */}
        <div className="flex justify-center">
          <button
            type="button"
            className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-blue-400 hover:text-blue-800"
            onClick={() => {
              handleDownloadRosco(IsRoscoJson)
            }}
          >
            <FaDownload />
            Guardar
          </button>
        </div>
      </RoscoEdit>

      {/* Aqui tengo el modal mi amorrr C: */}
      {isOpen && (
        <EditLetterModal
          letra={isSelected}
          setModal={setIsOpen}
          JsonRosco={IsRoscoJson}
        />
      )}
    </div>
  )
}
