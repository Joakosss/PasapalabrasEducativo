import type { GameLetter } from '@/Models/Letra'
import type { RoscoBaseProps } from './RoscoBase'
import RoscoBase from './RoscoBase'

interface PropsRoscoGame
  extends Omit<RoscoBaseProps<GameLetter>, 'renderItem' | 'items'> {
  IsRoscoJson: GameLetter[]
}

export default function RoscoGame({
  IsRoscoJson,
  ...baseProps // Contiene: roscoRef, radio, anguloPorLetra, children
}: PropsRoscoGame) {
  return (
    <RoscoBase<GameLetter> // Pasamos el tipo genérico para que 'letra' esté tipada
      {...baseProps}
      items={IsRoscoJson}
      renderItem={(letra, _, __, estiloLetra) => (
        <div
          style={estiloLetra}
          className={`w-11 h-11 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-white cursor-pointer bg-gray-500 ${
            letra.state === 'Correcto' && 'bg-green-700'
          } ${letra.state === 'Pasado' && 'bg-yellow-400'}`}
        >
          {letra.letter}
        </div>
      )}
    />
  )
}
