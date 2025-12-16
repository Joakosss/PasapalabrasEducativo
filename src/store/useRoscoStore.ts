import type { GameLetter, Letter } from '@/Models/Letra'
import { getNextLetter } from '@/utils/Game'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import VacioJson from '../Vacio.json'
/* -------------------------------------------------------------
Este modulo se construye para manejar los estados de los roscos
De esta menera se evita que se pierdan los datos al recargar la pagina
o si al usuario se le cae el internet o se le apaga el pc
---------------------------------------------------------------- */

interface RoscoStoreType {
  /* Datos de los roscos */
  roscoPlaying: GameLetter[]
  roscoEditing: Letter[]
  roscoCountPlaying: number
  roscoPlayingWinner: boolean
  /* Funciones de los roscos */
  setRoscoPlaying: (roscoPlaying: GameLetter[]) => void
  setRoscoEditing: (roscoEditing: Letter[]) => void
  setRoscoCountPlaying: (roscoCountPlaying: number) => void
  clearRoscoPlaying: () => void
  clearRoscoEditing: () => void
  handleNextTurnPlaying: (newState: GameLetter['state']) => void
}

export const useRoscoStore = create<RoscoStoreType>()(
  persist(
    (set, get) => ({
      roscoPlaying: VacioJson as GameLetter[],
      roscoEditing: VacioJson as Letter[],
      roscoCountPlaying: 0,
      roscoPlayingWinner: false,
      setRoscoPlaying: (roscoPlaying: GameLetter[]) =>
        set({ roscoPlaying: roscoPlaying, roscoCountPlaying: 0 }),

      setRoscoEditing: (roscoEditing: Letter[]) => set({ roscoEditing }),
      setRoscoCountPlaying: (roscoCountPlaying: number) =>
        set({ roscoCountPlaying }),
      clearRoscoPlaying: () =>
        set(() => ({
          roscoPlaying: VacioJson as GameLetter[],
          roscoCountPlaying: 0,
          roscoPlayingWinner: false,
        })),
      clearRoscoEditing: () =>
        set(() => ({ roscoEditing: VacioJson as Letter[] })),

      /* Logica de siguiente letra/turno */
      handleNextTurnPlaying: (newState: GameLetter['state']) => {
        const { roscoPlaying, roscoCountPlaying } = get()
        const updatedRosco = roscoPlaying.map((item, idx) =>
          idx === roscoCountPlaying ? { ...item, state: newState } : item,
        )

        /* Verificamos si ya ganamos en una constante */
        const isWinner = updatedRosco.every(
          (letter) => letter.state === 'Correcto',
        )

        let nextContador = roscoCountPlaying

        if (!isWinner) {
          nextContador = getNextLetter(nextContador, updatedRosco)
        }

        set({
          roscoPlaying: updatedRosco,
          roscoCountPlaying: nextContador,
          roscoPlayingWinner: isWinner,
        })
      },
    }),
    {
      name: 'roscoStore',
      partialize: (state) => ({
        roscoPlaying: state.roscoPlaying,
        roscoEditing: state.roscoEditing,
        roscoCountPlaying: state.roscoCountPlaying,
      }),
    },
  ),
)
