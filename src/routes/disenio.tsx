import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

// Define las letras
const LETRAS = 'ABCDEFGHIJLMNOPQRSTUVXYZ'.split('')
const NUM_LETRAS = LETRAS.length
const ANGULO_POR_LETRA = 360 / NUM_LETRAS

export const Route = createFileRoute('/disenio')({
  component: RouteComponent,
})

function RouteComponent() {
  // --- LÓGICA DE LAYOUT ---
  const [radio, setRadio] = useState(0)
  const roscoRef = useRef<HTMLDivElement | null>(null)

  // para medir el tamaño del div contenedor.
  useEffect(() => {
    if (roscoRef.current) {
      setRadio(roscoRef.current.offsetWidth / 2)
    }
  }, [])

  return (
    <>
      <header className="flex items-center justify-center">
        <h2 className="text-3xl font-bold pt-5 ">Editando :D</h2>
      </header>
      <div className="flex items-center justify-center h-150">
        <div
          ref={roscoRef}
          className="relative w-[500px] h-[500px] rounded-full border-2 border-gray-400"
        >
          {radio > 0 &&
            LETRAS.map((letra, index) => {
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
                <div
                  key={letra}
                  style={estiloPosicion}
                  // Este div invisible gira y posiciona la letra
                >
                  {/* Este div visible contiene la letra y la mantiene derecha */}
                  <div
                    style={estiloLetra}
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-blue-700"
                  >
                    {letra}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
