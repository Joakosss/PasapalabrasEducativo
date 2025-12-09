import { createFileRoute, Link } from '@tanstack/react-router'
import { FaGamepad, FaPaintbrush } from "react-icons/fa6";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col  lg:flex-row  items-center justify-center h-screen">
      {/* Titulo */}
      <div className='md:w-[50%]'>
        <h1 className='font-extrabold text-[clamp(4rem,5vw,5rem)] text-center text-blue-800'>Pasapalabras</h1>
        <h1 className='font-extrabold text-[clamp(4rem,5vw,5rem)] text-center text-blue-800'>Educativo</h1>
      </div>

      {/* Botones */}
      <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg gap-2" >
        <Link
          to="/game"
          className="
          flex items-center gap-2 justify-center text-center
          text-white bg-blue-500 text-4xl font-bold w-100 h-16 rounded-lg
          hover:bg-blue-400 hover:text-blue-800
          md:text-5xl md:h-24 md:w-120"
        >
          <FaGamepad size={45} />
          ¡A Jugar!
        </Link>

        <Link
          to="/disenio"
          className="
          flex items-center gap-2 justify-center text-center
          text-white bg-cyan-500 text-4xl font-bold w-100 h-16 rounded-lg
          hover:bg-cyan-400 hover:text-cyan-700
          md:text-5xl md:h-24 md:w-120"
        >
          <FaPaintbrush size={45} />
          Crear/Editar Rosco
        </Link>
      </div>
    </div>
  )
}
