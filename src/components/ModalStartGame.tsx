import { useRef } from 'react'

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  SetIsRoscoJson: React.Dispatch<React.SetStateAction<EditLetra[]>>
}

function ModalStartGame({ setIsOpen, SetIsRoscoJson }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleLoadGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string) as EditLetra[]
        SetIsRoscoJson(json)
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
      className="absolute flex flex-col items-center justify-center bg-slate-800 inset-0 z-1"
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
          className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-3xl px-5 py-2.5 me-2 mb-2 cursor-pointer"
          onClick={() => 
            fileInputRef.current?.click()}
        >
          Subir rosco c:
        </button>
      </div>
    </div>
  )
}

export default ModalStartGame
