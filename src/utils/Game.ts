import type { GameLetter } from '@/Models/Letra'

export const getNextLetter = (
  currentLetter: number,
  currentRosco: GameLetter[],
) => {
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
