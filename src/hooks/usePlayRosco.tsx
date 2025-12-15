import type { GameLetter } from '@/Models/Letra'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRoscoStore } from '../store/useRoscoStore'

interface usePlayRoscoProps {
  initialData: GameLetter[]
}

function usePlayRosco({ initialData }: usePlayRoscoProps) {
  /* importamos nuestro store C: */
  const { setRoscoPlaying, roscoPlaying, clearRoscoPlaying } = useRoscoStore()

  const [IsRoscoJson, SetIsRoscoJson] = useState<GameLetter[]>(initialData)
  const [isContador, setIsContador] = useState<number>(0)
  // --- LÓGICA DE LAYOUT ---
  const [radio, setRadio] = useState(0)
  const roscoRef = useRef<HTMLDivElement | null>(null)

  /* Calculo de victoria y letras*/
  const isWinner = useMemo(
    () => IsRoscoJson.every((item) => item.state === 'Correcto'),
    [IsRoscoJson],
  )

  /* Buscamo el siguiente pasado | undefined */
  const getNextLetter = (currentLetter: number, currentRosco: GameLetter[]) => {
    let next = (currentLetter + 1) % currentRosco.length
    for (let i = 0; i < currentRosco.length; i++) {
      const item = currentRosco[next]
      if (item.state !== 'Correcto') {
        break
      }
      next = (next + 1) % currentRosco.length
    }
    return next
  }

  const handleNextTurn = (newState: GameLetter['state']) => {
    setRoscoPlaying((prev) => {
      const updated = prev.map((item, idx) =>
        idx === isContador ? { ...item, state: newState } : item,
      )

      // Si no han ganado todos, movemos el contador
      if (!updated.every((item) => item.state === 'Correcto')) {
        setIsContador(getNextLetter(isContador, updated))
      }
      return updated
    })
  }

  // para medir el tamaño del div contenedor.
  useEffect(() => {
    if (!roscoRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setRadio(entry.contentRect.width / 2)
      }
    })
    observer.observe(roscoRef.current)
    return () => observer.disconnect()
  }, [])
  return {
    IsRoscoJson,
    isContador,
    radio,
    roscoRef,
    isWinner,
    handleNextTurn,
  }
}

export default usePlayRosco
