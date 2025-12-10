import type { GameLetter } from '@/Models/Letra'
import { useRef } from 'react'

type Props = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
  SetIsRoscoJson: React.Dispatch<React.SetStateAction<GameLetter[]>>
}

function ModalStartEdit({ setIsStarted, SetIsRoscoJson }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleNewGame = () => {
    setIsStarted(false)
  }
  const handleLoadGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as GameLetter[]
        SetIsRoscoJson(json)
        setIsStarted(false)
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
            text-white bg-blue-500 text-5xl font-bold w-100 h-24 rounded-lg
            hover:bg-blue-400 hover:text-blue-800
            md:w-120"
          onClick={() => fileInputRef.current?.click()}
        >
          Editar rosco
        </button>
      </div>
      <div>
        <button
          type="button"
          className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-5xl font-bold w-100 h-24 rounded-lg
            hover:bg-blue-400 hover:text-blue-800
            md:w-120"
          onClick={handleNewGame}
        >
          Nuevo Juego
        </button>
      </div>
    </div>
  )
}

export default ModalStartEdit
