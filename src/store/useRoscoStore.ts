import type { GameLetter, Letter } from '@/Models/Letra'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/* -------------------------------------------------------------
Este modulo se construye para manejar los estados de los roscos
De esta menera se evita que se pierdan los datos al recargar la pagina
o si al usuario se le cae el internet o se le apaga el pc
---------------------------------------------------------------- */

interface RoscoStoreType {
  roscoPlaying: GameLetter[]
  roscoEditing: Letter[]
  setRoscoPlaying: (roscoPlaying: GameLetter[]) => void
  setRoscoEditing: (roscoEditing: Letter[]) => void
  clearRoscoPlaying: () => void
  clearRoscoEditing: () => void
}

export const useRoscoStore = create<RoscoStoreType>()(
  persist(
    (set) => ({
      roscoPlaying: [] as GameLetter[],
      roscoEditing: [] as Letter[],
      setRoscoPlaying: (roscoPlaying: GameLetter[]) =>
        set(() => ({ roscoPlaying })),
      setRoscoEditing: (roscoEditing: Letter[]) =>
        set(() => ({ roscoEditing })),
      clearRoscoPlaying: () => set(() => ({ roscoPlaying: [] })),
      clearRoscoEditing: () => set(() => ({ roscoEditing: [] })),
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
