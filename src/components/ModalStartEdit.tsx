import type { GameLetter } from '@/Models/Letra'
import { useRoscoStore } from '@/store/useRoscoStore'
import IsPendingRosco from '@/utils/IsPendingRosco'
import { useRef } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaArrowRotateLeft, FaPenToSquare } from 'react-icons/fa6'

type Props = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
  setIsRoscoName: React.Dispatch<React.SetStateAction<string>>
}

function ModalStartEdit({ setIsStarted, setIsRoscoName }: Props) {
  const { roscoEditing, clearRoscoEditing, setRoscoEditing } = useRoscoStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleNewGame = () => {
    clearRoscoEditing()
    setIsStarted(false)
  }
  const handleLoadGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as GameLetter[]
        setRoscoEditing(json)
        setIsStarted(false)
        /* Aqui podemos acceder a el titulo del archivo */
        setIsRoscoName(file.name.replace(/\.json$/i, ''))
      } catch (error) {
        console.error('Error al leer el archivo JSON:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div
      id="EditModal"
      className="absolute flex flex-col items-center justify-center inset-0 z-1 min-h-screen w-full bg-[url(./img/fondo1.webp)] bg-blue-100 bg-blend-overlay gap-5"
    >
      {/* Input oculto */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleLoadGame}
      />

      {/* Botón visible con tu estilo */}
      <button
        type="button"
        className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 md:w-120 text-[clamp(2rem,2.5vw,3rem)] font-bold w-100 h-24 rounded-lg
            hover:bg-blue-400 hover:text-blue-800"
        onClick={() => fileInputRef.current?.click()}
      >
        <FaPlay />
        Editar rosco
      </button>

      <button
        type="button"
        className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 md:w-120 text-[clamp(2rem,2.5vw,3rem)] font-bold w-100 h-24 rounded-lg
            hover:bg-blue-400 hover:text-blue-800"
        onClick={handleNewGame}
      >
        <FaPenToSquare />
        Nuevo Juego
      </button>
      {IsPendingRosco(roscoEditing) && (
        <button
          type="button"
          className="
        flex items-center gap-2 justify-center text-center
        text-white bg-blue-500 md:w-120 text-[clamp(2rem,2.5vw,3rem)] font-bold w-100 h-24 rounded-lg
        hover:bg-blue-400 hover:text-blue-800"
          onClick={() => setIsStarted(false)}
        >
          <FaArrowRotateLeft />
          Seguir Editando
        </button>
      )}
    </div>
  )
}

export default ModalStartEdit
