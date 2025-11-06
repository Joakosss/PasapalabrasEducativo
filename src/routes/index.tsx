import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="absolute flex flex-col items-center justify-center bg-slate-800 inset-0 z-1">
      <Link
        to="/disenio"
        className="text-white text-center bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-3xl w-100 px-5 py-2.5 me-2 mb-2 cursor-pointer"
      >
        Crear/Editar Rosco
      </Link>
      <Link
        to="/game"
        className="text-white text-center bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-3xl w-100 px-5 py-2.5 me-2 mb-2 cursor-pointer"
      >
        Jugar C:
      </Link>
    </div>
  )
}
