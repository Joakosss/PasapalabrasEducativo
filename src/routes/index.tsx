import { useRoscoStore } from '@/store/useRoscoStore'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FaPlay, FaGamepad, FaPaintbrush } from 'react-icons/fa6'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { roscoPlaying, clearRoscoPlaying } = useRoscoStore()
  const PendingGame = roscoPlaying.every((letter) => letter.description !== '')

  return (
    <div className="flex flex-col  lg:flex-row  items-center justify-center h-screen">
      {/* Titulo */}
      <div className="md:w-[50%]">
        <h1 className="font-extrabold text-[clamp(3.5rem,5vw,5rem)] text-center text-blue-800">
          Pasapalabras
        </h1>
        <h1 className="font-extrabold text-[clamp(3.5rem,5vw,5rem)] text-center text-blue-800">
          Educativo
        </h1>
      </div>

      {/* Botones */}
      <div className="flex flex-col items-center justify-center bg-white shadow-md  rounded-lg gap-2">
        {/* Si tenemos un juego en nuestro store pendiente aparece este boton c: */}
        {PendingGame && (
          <Link
            to="/game"
            className="
          flex items-center gap-2 justify-center text-center
          text-white bg-blue-500 font-bold w-90 h-16 rounded-lg
          hover:bg-blue-400 hover:text-blue-800
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]"
          >
            <FaPlay size={45} />
            ¡Continuar Jugando!
          </Link>
        )}
        <Link
          to="/game"
          onClick={() => {
            clearRoscoPlaying()
          }}
          className="
          flex items-center gap-2 justify-center text-center
          text-white bg-blue-500 font-bold w-90 h-16 rounded-lg
          hover:bg-blue-400 hover:text-blue-800
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]"
        >
          <FaGamepad size={45} />
          ¡A Jugar!
        </Link>

        <Link
          to="/disenio"
          className="
          flex items-center gap-2 justify-center text-center
          text-white bg-cyan-500  font-bold w-90 h-16 rounded-lg
          hover:bg-cyan-400 hover:text-cyan-700
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]"
        >
          <FaPaintbrush size={45} />
          Crear/Editar Rosco
        </Link>
      </div>
    </div>
  )
}
