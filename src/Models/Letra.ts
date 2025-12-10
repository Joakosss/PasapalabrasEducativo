export interface Letter {
  letter: string // Cual letra es tipo A B C
  type: "Parte"|"Contiene"|"" // Si parte o contiene
  description: string 
  correct: string //Palabra Correcta
  deleted: boolean //True es no jugar la letra --- False es jugar la letra
}

export interface GameLetter extends Letter {
  state?: "Correcto" | "Pasado" | undefined
}
