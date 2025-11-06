
type Props = {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
}



function ModalStartEdit({ setIsStarted }: Props) {
  const handleNewGame = ()=> {
    setIsStarted(false)
  }
  const handleLoadGame = ()=> {
    setIsStarted(false)
  }


  return (
    <div
      id="EditModal"
      className="absolute flex items-center justify-center bg-slate-800 inset-0 z-1"
    >
      <div className="grid grid-cols-2 gap-5">
        <div>
          {/* Input oculto */}
          <input
            type="file"
            //ref={fileInputRef}
            className="hidden"
            //onChange={SetIsRoscoJson}
          />

          {/* Botón visible con tu estilo */}
          <button
            type="button"
            onClick={handleLoadGame}
            className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            >
            Editar rosco
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
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
