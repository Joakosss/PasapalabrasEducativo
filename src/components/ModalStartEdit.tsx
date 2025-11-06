import { useRef } from 'react'

type Props = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
  SetIsRoscoJson: React.Dispatch<React.SetStateAction<EditLetra[]>>
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
        const json = JSON.parse(event.target?.result as string) as EditLetra[]
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
      className="absolute flex flex-col items-center justify-center bg-slate-800 inset-0 z-1"
    >
      <div className="grid grid-cols-2 gap-5">
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
            className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-3xl px-5 py-2.5 me-2 mb-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Editar rosco
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-3xl px-5 py-2.5 me-2 mb-2 cursor-pointer"
            onClick={handleNewGame}
          >
            Nuevo Juego
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalStartEdit
