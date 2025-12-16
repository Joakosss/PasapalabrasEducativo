import type { GameLetter } from '@/Models/Letra'

function usePendingPlayingGame(roscoPlaying: GameLetter[]) {
  return roscoPlaying.every((letter) => letter.description !== '')
}

export default usePendingPlayingGame
