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
      {isContWinner && (
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
}

function RoscoPlaying({
  roscoRef,
  radio,
  IsRoscoJson,
  ANGULO_POR_LETRA,
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
                <div key={letra.descripcion} style={estiloPosicion}>
                  {/* Este div visible contiene la letra y la mantiene derecha */}
                  <div
                    style={estiloLetra}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-blue-700  ${letra.estado === 'correcto' && 'bg-green-700 '} ${letra.estado === 'pendiente' && 'bg-yellow-300'}`}
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
