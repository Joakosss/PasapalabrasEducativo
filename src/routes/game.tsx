import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import VacioJson from '../Vacio.json'
import ModalStartGame from '@/components/ModalStartGame'
import { FireworksBackground } from '@/components/ui/shadcn-io/fireworks-background'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  const [IsRoscoJson, SetIsRoscoJson] = useState<GameLetra[]>(VacioJson)
  const [isOpen, setIsOpen] = useState<boolean>(true) // Usar este para el modal de subir tu juego
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isContador, setIsContador] = useState<number>(0)
  const [isContWinner, setIsContWinner] = useState<number>(0)

  const NUM_LETRAS = VacioJson.length
  const ANGULO_POR_LETRA = 360 / NUM_LETRAS
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
    if (IsRoscoJson[isContador].estado === 'pendiente' || IsRoscoJson[isContador].estado === undefined ) {
      if (isContador === NUM_LETRAS - 1) {
        setIsContador(-1)
      }

      SetIsRoscoJson((prev) =>
        prev.map((item, index) =>
          index === isContador ? { ...item, estado: 'correcto' } : item,
        ),
      )
      setIsContWinner((prev) => prev + 1)
      setIsContador((prev) => prev + 1)
      return
    }
    setIsContador(prev=>prev+1)
  }
  const handlePass = () => {
    if (isContador === NUM_LETRAS - 1) {
      setIsContador(-1)
    }
    SetIsRoscoJson((prev) =>
      prev.map((item, index) =>
        index === isContador ? { ...item, estado: 'pendiente' } : item,
      ),
    )
    setIsContador((prev) => prev + 1)
  }

  return (
    <>
      {isContWinner === NUM_LETRAS && (
        <div className="fixed inset-0 z-1 bg-slate-800/90">
          <FireworksBackground />
        </div>
      )}
      <section className="grid grid-cols-3 gap-5 pt-20 px-2">
        <div className="col-span-1">
          <h2 className="text-3xl font-bold text-center h-20">
            {IsRoscoJson[isContador].tipo === 'Contiene'
              ? `${IsRoscoJson[isContador].tipo} la letra ${IsRoscoJson[isContador].letra}`
              : `${IsRoscoJson[isContador].tipo} con la letra ${IsRoscoJson[isContador].letra}`}
          </h2>
          <p className="text-center border border-slate-500 min-h-80 text-xl font-medium py-2">
            {IsRoscoJson[isContador].descripcion}
          </p>
          <div className="flex mt-5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-xl px-5 py-2.5 w-full me-2 mb-2 cursor-pointer"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={() =>
                setTimeout(() => {
                  handleNext()
                }, 500)
              }
            >
              {isHover ? IsRoscoJson[isContador].correcto : 'Siguiente'}
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-green-500 font-medium rounded-lg text-xl px-5 py-2.5 w-full me-2 mb-2 cursor-pointer"
              onClick={() => handlePass()}
            >
              Pasar
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <RoscoPlaying
            ANGULO_POR_LETRA={ANGULO_POR_LETRA}
            IsRoscoJson={IsRoscoJson}
            radio={radio}
            roscoRef={roscoRef}
            setIsOpen={setIsOpen}
            key={'RoscoEditando'}
          />
        </div>
      </section>
      {isOpen && (
        <ModalStartGame SetIsRoscoJson={SetIsRoscoJson} setIsOpen={setIsOpen} />
      )}
    </>
  )
}

type PropsRosco = {
  roscoRef: React.RefObject<HTMLDivElement | null>
  radio: number
  IsRoscoJson: GameLetra[]
  ANGULO_POR_LETRA: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function RoscoPlaying({
  roscoRef,
  radio,
  IsRoscoJson,
  ANGULO_POR_LETRA,
  setIsOpen,
}: PropsRosco) {
  return (
    <>
      <div className="flex items-center justify-center h-150">
        <div
          ref={roscoRef}
          className="relative w-[500px] h-[500px] rounded-full border-2 border-gray-400"
        >
          {radio > 0 &&
            IsRoscoJson.map((letra, index) => {
              const angulo = ANGULO_POR_LETRA * index

              // 1. Estilo para el contenedor de la letra (el que rota)
              const estiloPosicion: React.CSSProperties = {
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                // El orden es clave:
                // 1. Mover al centro
                // 2. Girar
                // 3. Empujar hacia afuera (el radio)
                transform: `
              translate(-50%, -50%) 
              rotate(${angulo}deg) 
              translateY(-${radio}px)
              `,
              }

              // 2. Estilo para la letra (la que rota al revés)
              const estiloLetra = {
                transform: `rotate(-${angulo}deg)`,
              }

              return (
                <>
                  <div key={letra.descripcion} style={estiloPosicion}>
                    {/* Este div visible contiene la letra y la mantiene derecha */}
                    <div
                      style={estiloLetra}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white hover:cursor-pointer bg-blue-700 hover:bg-blue-800 ${letra.estado === 'correcto' && 'bg-green-700 hover:bg-green-800'} ${letra.estado === 'pendiente' && 'bg-yellow-300 hover:bg-yellow-400'}`}
                      onClick={() => {
                        setIsOpen(true)
                      }}
                    >
                      {letra.letra}
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}
