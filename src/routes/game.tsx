import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import VacioJson from '../Vacio.json'
import ModalStartGame from '@/components/ModalStartGame'
import { FireworksBackground } from '@/components/ui/shadcn-io/fireworks-background'
import RoscoGame from '@/components/Roscos/RoscoGame'
import type { GameLetter } from '@/Models/Letra'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  const [IsRoscoJson, SetIsRoscoJson] = useState<GameLetter[]>(
    VacioJson as GameLetter[],
  )
  const [isOpen, setIsOpen] = useState<boolean>(true) // Usar este para el modal de subir tu juego
  const [isContador, setIsContador] = useState<number>(0)
  const [isContWinner, setIsContWinner] = useState<boolean>(false)

  // --- LÓGICA DE LAYOUT ---
  const [radio, setRadio] = useState(0)
  const roscoRef = useRef<HTMLDivElement | null>(null)

  // para medir el tamaño del div contenedor.
  useEffect(() => {
    if (roscoRef.current) {
      setRadio(roscoRef.current.offsetWidth / 2)
    }
  }, [])

  const handleNext = () => {
    // Paso 2: Actualizamos el rosco con la letra ahora correcta
    SetIsRoscoJson((prevRosco) => {
      const roscoActualizado = prevRosco.map((item, index) =>
        index === isContador ? { ...item, estado: 'correcto' } : item,
      )

      // Paso 3: Buscamos la próxima letra pendiente
      let proximoIndice = (isContador + 1) % roscoActualizado.length // Empezamos en el siguiente
      for (let i = 0; i < roscoActualizado.length; i++) {
        const item = roscoActualizado[proximoIndice]
        if (item.state !== 'Correcto') {
          break
        }
        proximoIndice = (proximoIndice + 1) % roscoActualizado.length
      }

      // Paso 4: Verificamos si el juego ha terminado
      const todosCorrectos = roscoActualizado.every(
        (item) => item.state === 'Correcto',
      )
      if (todosCorrectos) {
        setIsContWinner(true)
        setIsContador(0) // Vuelve a A para que no pase a una letra inexistente
      } else {
        setIsContador(proximoIndice) // si no estan todos correctos ve el proximo indice pendiente y va ahi
      }
      //Paso 5: Teminamos
      return roscoActualizado
    })
  }

  const handlePass = () => {
    let proximoIndice = (isContador + 1) % IsRoscoJson.length // Empezamos en el siguiente
    for (let i = 0; i < IsRoscoJson.length; i++) {
      const item = IsRoscoJson[proximoIndice]
      if (item.state !== 'Correcto') {
        break
      }
      proximoIndice = (proximoIndice + 1) % IsRoscoJson.length
    }

    SetIsRoscoJson((prev) =>
      prev.map((item, index) =>
        index === isContador ? { ...item, estado: 'pendiente' } : item,
      ),
    )
    setIsContador(proximoIndice)
  }

  return (
    <>
      {/* Modal de Fireworks */}
      {isContWinner && (
        <div className="fixed inset-0 z-50 bg-blue-950/80">
          <FireworksBackground
            population={15}
            fireworkSize={{ min: 2, max: 6 }}
            className="absolute inset-0 z-0 pointer-events-none"
          />
          <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Link
              to="/disenio"
              className="
                flex items-center gap-2 justify-center text-center
                text-white bg-blue-500 text-4xl font-bold w-100 h-24 rounded-lg
                hover:bg-blue-400 hover:text-blue-800 cursor-pointer shadow-lg"
            >
              Terminar Juego
            </Link>
          </div>
        </div>
      )}

      {/* Seccion del juego */}
      <section className="flex flex-col items-center justify-center h-screen gap-0 md:gap-7">
        {/* Rosco */}
        <RoscoGame
          IsRoscoJson={IsRoscoJson}
          radio={radio}
          roscoRef={roscoRef}
          key={'RoscoJugando'}
        >
          <h2 className="text-5xl font-extrabold text-center text-blue-900 z-1">
            {IsRoscoJson[isContador].type === 'Contiene'
              ? `${IsRoscoJson[isContador].type} la letra ${IsRoscoJson[isContador].letter}`
              : `${IsRoscoJson[isContador].type} con la letra ${IsRoscoJson[isContador].letter}`}
          </h2>

          {/* Descripcion de la letra */}
          <p className="text-2xl lg:text-4xl font-bold text-center text-blue-900 w-[70%]">
            {IsRoscoJson[isContador].description}
          </p>

          {/* Botones */}
          <div className="flex flex-row justify-center items-center gap-3">
            <button
              type="button"
              className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-lime-600  cursor-pointer z-1"
              onClick={() => handleNext()}
            >
              Siguiente
            </button>
            <button
              type="button"
              className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-blue-400 hover:text-blue-800 cursor-pointer z-1"
              onClick={() => handlePass()}
            >
              Pasar
            </button>
          </div>

          {/* Letra correcta anterior */}
          {IsRoscoJson[isContador - 1] &&
            IsRoscoJson[isContador - 1].state === 'Correcto' && (
              <div className="flex flex-col items-center justify-center text-2xl font-bold">
                <p className="text-blue-900/70">
                  Letra con {IsRoscoJson[isContador - 1].letter}
                </p>
                <p className="text-blue-900">
                  "{IsRoscoJson[isContador - 1].correct}"
                </p>
              </div>
            )}
        </RoscoGame>
      </section>
      {isOpen && (
        <ModalStartGame SetIsRoscoJson={SetIsRoscoJson} setIsOpen={setIsOpen} />
      )}
    </>
  )
}
