import type { GameLetter } from '@/Models/Letra'
import { useRoscoStore } from '@/store/useRoscoStore'
import { useRef } from 'react'

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalStartGame({ setIsOpen }: Props) {
  /* Importamos nuestra funcion para guardar el rosco en nuestro store */
  const { setRoscoPlaying } = useRoscoStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onlyRoscoPlayable = (rosco: GameLetter[]) => {
    return rosco.filter((item) => !item.deleted)
  }

  const handleLoadGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as GameLetter[]
        const roscoPlayable = onlyRoscoPlayable(json)
        setRoscoPlaying(roscoPlayable)
        setIsOpen(false)
      } catch (error) {
        console.error('Error al leer el archivo JSON:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div
      id="EditModal"
      className="absolute flex flex-col items-center justify-center min-h-screen disabled bg-[url(./img/fondo1.webp)] bg-blue-100 bg-blend-overlay inset-0 z-89"
    >
      <div>
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
          text-white bg-blue-500 text-4xl font-bold w-90 h-16 rounded-lg
          hover:bg-blue-400 hover:text-blue-800
          md:text-5xl md:h-24 md:w-120"
          onClick={() => fileInputRef.current?.click()}
        >
          Subir rosco c:
        </button>
      </div>
    </div>
  )
}

export default ModalStartGame
