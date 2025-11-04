import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import Ejemplo from '../Ejemplo.json'
import Modal from '@/components/Modal'

export const Route = createFileRoute('/disenio')({
  component: RouteComponent,
})

function RouteComponent() {
  const [IsRoscoJson, SetIsRoscoJson] = useState<EditLetra[]>(Ejemplo)
  const [isOpen, setIsOpen] = useState<boolean>(false) // Para abrir y cerrar el modal
  const [isSelected, setIsSelected] = useState<string>('A') // Para abrir y cerrar el modal
  
  const NUM_LETRAS = Ejemplo.length
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
                  <div
                    key={letra.descripcion}
                    style={estiloPosicion}
                    onClick={() => {
                      setIsOpen(true)
                      setIsSelected(letra.letra)
                    }}
                    // Este div invisible gira y posiciona la letra
                  >
                    {/* Este div visible contiene la letra y la mantiene derecha */}
                    <div
                      style={estiloLetra}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white hover:cursor-pointer ${letra.descripcion ? 'bg-green-700 hover:bg-green-900' : 'bg-gray-500 hover:bg-gray-700'}`}
                    >
                      {letra.letra}
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
      {/* Aqui tengo el modal mi amorrr C: */}
      {isOpen && <Modal letra={isSelected} setModal={setIsOpen} JsonRosco={IsRoscoJson}/>}
    </>
  )
}
