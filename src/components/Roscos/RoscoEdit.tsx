import type { Letter } from '@/Models/Letra'
import type { RoscoBaseProps } from './RoscoBase'
import RoscoBase from './RoscoBase'

interface PropsRoscoEdit
  extends Omit<RoscoBaseProps<Letter>, 'renderItem' | 'items'> {
  IsRoscoJson: Letter[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function RoscoEdit({
  IsRoscoJson,
  setIsOpen,
  setIsSelected,
  ...baseProps // Contiene: roscoRef, radio, anguloPorLetra, children
}: PropsRoscoEdit) {
  return (
    <RoscoBase<Letter> // Pasamos el tipo genérico para que 'letra' esté tipada
      {...baseProps}
      items={IsRoscoJson}
      renderItem={(letra, _, __, estiloLetra) => (
        <div
          style={estiloLetra}
          className={`w-11 h-11 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-white cursor-pointer ${
            letra.deleted
              ? 'bg-red-600 text-red-300'
              : letra.description
                ? 'bg-green-700'
                : 'bg-gray-500'
          }`}
          onClick={() => {
            setIsOpen(true)
            setIsSelected(letra.letter)
          }}
        >
          {letra.letter}
        </div>
      )}
    />
  )
}
