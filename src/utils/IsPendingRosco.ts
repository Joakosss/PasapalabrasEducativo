import type { GameLetter, Letter } from '@/Models/Letra'
import VacioJson from '../Vacio.json'

function IsPendingRosco(rosco: GameLetter[] | Letter[]) {
  return JSON.stringify(rosco) !== JSON.stringify(VacioJson)
}

export default IsPendingRosco
