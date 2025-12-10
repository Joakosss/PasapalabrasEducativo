import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import VacioJson from '../Vacio.json'
import Modal from '@/components/EditForm/EditLetterModal'
import ModalStartEdit from '@/components/ModalStartEdit'

import type { Letter } from '@/Models/Letra'
import RoscoEdit from '@/components/Roscos/RoscoEdit'
export const Route = createFileRoute('/disenio')({
  component: RouteComponent,
})

function RouteComponent() {
  const [IsRoscoJson, SetIsRoscoJson] = useState<Letter[]>(
    VacioJson as Letter[],
  )
  const [isOpen, setIsOpen] = useState<boolean>(false) // Para abrir y cerrar el modal
  const [isSelected, setIsSelected] = useState<string>('A') // Para abrir y cerrar el modal
  const [isStarted, setIsStarted] = useState<boolean>(true) // Para abrir y cerrar el modal de inicio

  // --- LÓGICA DE LAYOUT ---
  const [radio, setRadio] = useState(0)
  const roscoRef = useRef<HTMLDivElement | null>(null)

  // para medir el tamaño del div contenedor.
  useEffect(() => {
    if (roscoRef.current) {
      setRadio(roscoRef.current.offsetWidth / 2)
    }
  }, [])

  const handleDownloadRosco = (rosco: Letter[]) => {
    const json = JSON.stringify(rosco, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'rosco.json'
    a.click()

    URL.revokeObjectURL(url)
  }

  //Eliminamos las letras que eliminamos para que no las renderize
  useEffect(() => {
    SetIsRoscoJson((prev) => {
      return prev.filter((letra) => !letra.deleted)
    })
  }, [])

  return (
    <div className="h-screen">
      {isStarted && (
        <ModalStartEdit
          setIsStarted={setIsStarted}
          SetIsRoscoJson={SetIsRoscoJson}
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
            Guardar
          </button>
        </div>
      </RoscoEdit>

      {/* Aqui tengo el modal mi amorrr C: */}
      {isOpen && (
        <Modal
          letra={isSelected}
          setModal={setIsOpen}
          JsonRosco={IsRoscoJson}
          SetIsRoscoJson={SetIsRoscoJson}
        />
      )}
    </div>
  )
}
