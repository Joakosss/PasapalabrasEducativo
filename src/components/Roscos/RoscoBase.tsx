export interface RoscoBaseProps<T> {
  items: T[]
  radio: number
  roscoRef: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
  renderItem: (
    item: T,
    index: number,
    stylePosicion: React.CSSProperties,
    styleLetra: React.CSSProperties,
  ) => React.ReactNode
}

function RoscoBase<T extends { letter: string }>({
  items,
  radio,
  roscoRef,
  children,
  renderItem,
}: RoscoBaseProps<T>) {
  const anguloPorLetra = 360 / items.length
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div
          ref={roscoRef}
          className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] xl:w-[800px] xl:h-[800px]  rounded-full border-2 border-gray-400"
        >
          <section className="flex flex-col items-center justify-center gap-7 h-[90%]">
            {children}
          </section>

          {radio > 0 &&
            items.map((letra, index) => {
              const angulo = anguloPorLetra * index

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
                <div key={letra.letter} style={estiloPosicion}>
                  {/* Aquí delegamos la renderización al padre */}
                  {renderItem(letra, index, estiloPosicion, estiloLetra)}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default RoscoBase
