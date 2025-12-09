import { createFileRoute, Link } from '@tanstack/react-router'
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
  const [isContWinner, setIsContWinner] = useState<boolean>(false)

  let ANGULO_POR_LETRA = 360 / IsRoscoJson.length
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
        if (item.estado !== 'correcto') {
          break
        }
        proximoIndice = (proximoIndice + 1) % roscoActualizado.length
      }

      // Paso 4: Verificamos si el juego ha terminado
      const todosCorrectos = roscoActualizado.every(
        (item) => item.estado === 'correcto',
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
      if (item.estado !== 'correcto') {
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
            className='absolute inset-0 z-0 pointer-events-none'
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
        <RoscoPlaying
          ANGULO_POR_LETRA={ANGULO_POR_LETRA}
          IsRoscoJson={IsRoscoJson}
          radio={radio}
          roscoRef={roscoRef}
          key={'RoscoEditando'}
        >

          <h2 className="text-5xl font-extrabold text-center text-blue-900 z-1">
            {IsRoscoJson[isContador].tipo === 'Contiene'
              ? `${IsRoscoJson[isContador].tipo} la letra ${IsRoscoJson[isContador].letra}`
              : `${IsRoscoJson[isContador].tipo} con la letra ${IsRoscoJson[isContador].letra}`}
          </h2>

          {/* Descripcion de la letra */}
          <p className='text-2xl lg:text-4xl font-bold text-center text-blue-900 w-[70%]'>{IsRoscoJson[isContador].descripcion}</p>

          {/* Botones */}
          <div className="flex flex-row justify-center items-center gap-3">
            <button
              type="button"
              className="
            flex items-center gap-2 justify-center text-center
            text-white bg-blue-500 text-2xl font-bold w-40 h-16 rounded-lg
            hover:bg-lime-600  cursor-pointer z-1"
              onClick={() =>
                handleNext()
              }
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
          {IsRoscoJson[isContador - 1] && IsRoscoJson[isContador - 1].estado === 'correcto' &&
            <div className="flex flex-col items-center justify-center text-2xl font-bold">
              <p className='text-blue-900/70'>Letra con {IsRoscoJson[isContador - 1].letra}</p>
              <p className='text-blue-900'>"{IsRoscoJson[isContador - 1].correcto}"</p>
            </div>
          }

        </RoscoPlaying>

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
  children: React.ReactNode
}

function RoscoPlaying({
  roscoRef,
  radio,
  IsRoscoJson,
  ANGULO_POR_LETRA,
  children,
}: PropsRosco) {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div
          ref={roscoRef}
          className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] xl:w-[800px] xl:h-[800px]  rounded-full border-2 border-gray-400"
        >

          <section className='flex flex-col items-center justify-center gap-7 h-[90%]'>
            {children}
          </section>


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
                <div key={letra.descripcion} style={estiloPosicion}>
                  {/* Este div visible contiene la letra y la mantiene derecha */}
                  <div
                    style={estiloLetra}
                    className={`w-11 h-11 md:w-14 md:h-14 xl:w-20 xl:h-20 text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-full flex items-center justify-center font-bold text-white bg-blue-700  ${letra.estado === 'correcto' && 'bg-green-700 '} ${letra.estado === 'pendiente' && 'bg-yellow-300'}`}
                  >
                    {letra.letra}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
