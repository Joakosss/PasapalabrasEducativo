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
      className="absolute flex flex-col items-center justify-center min-h-screen w-full bg-[url(./img/fondo1.webp)] bg-blue-100/100 bg-blend-overlay inset-0 z-1"
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
          text-white bg-blue-500 text-4xl font-bold w-100 h-16 rounded-lg
          hover:bg-blue-400 hover:text-blue-800
          md:text-5xl md:h-24 md:w-120"
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
