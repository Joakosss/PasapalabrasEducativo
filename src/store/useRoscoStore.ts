import type { GameLetter, Letter } from '@/Models/Letra'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    (set,get) => ({
      roscoPlaying: [] as GameLetter[],
      roscoEditing: [] as Letter[],
      roscoCountPlaying: 0,
      setRoscoPlaying: (roscoPlaying: GameLetter[]) => set({ roscoPlaying }),

      setRoscoEditing: (roscoEditing: Letter[]) => set({ roscoEditing }),
      setRoscoCountPlaying: (roscoCountPlaying: number) => set({ roscoCountPlaying }),
      clearRoscoPlaying: () => set(() => ({ roscoPlaying: [] })),
      clearRoscoEditing: () => set(() => ({ roscoEditing: [] })),
      handleNextTurnPlaying:()=>void
    }),
    {
      name: 'roscoStore',
      partialize: (state) => ({
        roscoPlaying: state.roscoPlaying,
        roscoEditing: state.roscoEditing,
      }),
    },
  ),
)
