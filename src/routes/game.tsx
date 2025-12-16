import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import ModalStartGame from '@/components/ModalStartGame'
import { FireworksBackground } from '@/components/ui/shadcn-io/fireworks-background'
import RoscoGame from '@/components/Roscos/RoscoGame'
import { useRoscoStore } from '@/store/useRoscoStore'
import useBuildRosco from '@/hooks/useBuildRosco'
import usePendingPlayingGame from '@/utils/IsPendingRosco'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  const { radio, roscoRef } = useBuildRosco()

  const {
    roscoPlaying,
    roscoCountPlaying,
    roscoPlayingWinner: isWinner,
    handleNextTurnPlaying,
  } = useRoscoStore() //funciones del rosco store

  const [isOpen, setIsOpen] = useState<boolean>(true) // Usar este para el modal de subir tu juego

  return (
    <>
      {/* Modal de subir rosco */}
      {!usePendingPlayingGame(roscoPlaying) && isOpen && (
        <ModalStartGame setIsOpen={setIsOpen} />
      )}

      {/* Modal de Fireworks */}
      {isWinner && <EndGame />}

      {/* Seccion del juego */}
      <section className="flex flex-col items-center justify-center h-screen gap-0 md:gap-7">
        {/* Rosco */}
        <RoscoGame
          IsRoscoJson={roscoPlaying}
          radio={radio}
          roscoRef={roscoRef}
          key={'RoscoJugando'}
        >
          <h2 className="text-5xl font-extrabold text-center text-blue-900 z-1">
            {roscoPlaying[roscoCountPlaying].type === 'Contiene'
              ? `${roscoPlaying[roscoCountPlaying].type} la letra ${roscoPlaying[roscoCountPlaying].letter}`
              : `${roscoPlaying[roscoCountPlaying].type} con la letra ${roscoPlaying[roscoCountPlaying].letter}`}
          </h2>

          {/* Descripcion de la letra */}
          <p className="text-2xl lg:text-4xl font-bold text-center text-blue-900 w-[70%]">
            {roscoPlaying[roscoCountPlaying].description}
          </p>

          {/* Botones */}
          <div className="flex flex-row justify-center items-center gap-3">
            <button
              type="button"
              className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-lime-600  cursor-pointer z-1"
              onClick={() => handleNextTurnPlaying('Correcto')}
            >
              Siguiente
            </button>
            <button
              type="button"
              className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-blue-400 hover:text-blue-800 cursor-pointer z-1"
              onClick={() => handleNextTurnPlaying('Pasado')}
            >
              Pasar
            </button>
          </div>

          {/* Letra correcta anterior */}
          {roscoPlaying[roscoCountPlaying - 1] &&
            roscoPlaying[roscoCountPlaying - 1].state === 'Correcto' && (
              <div className="flex flex-col items-center justify-center text-2xl font-bold">
                <p className="text-blue-900/70">
                  Letra con {roscoPlaying[roscoCountPlaying - 1].letter}
                </p>
                <p className="text-blue-900">
                  "{roscoPlaying[roscoCountPlaying - 1].correct}"
                </p>
              </div>
            )}
        </RoscoGame>
      </section>
    </>
  )
}

function EndGame() {
  const { clearRoscoPlaying } = useRoscoStore()
  return (
    <div className="fixed inset-0 z-91 bg-blue-950/80">
      <FireworksBackground
        population={15}
        fireworkSize={{ min: 2, max: 6 }}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link
          to="/"
          onClick={() => clearRoscoPlaying()}
          className="
                flex items-center gap-2 justify-center text-center
                text-white bg-blue-500 text-4xl font-bold w-100 h-24 rounded-lg
                hover:bg-blue-400 hover:text-blue-800 cursor-pointer shadow-lg"
        >
          Terminar Juego
        </Link>
      </div>
    </div>
  )
}
