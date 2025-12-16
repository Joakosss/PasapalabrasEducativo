import type { Letter } from '@/Models/Letra'
import { useState } from 'react'
import { capitalize } from '@/utils/Capitalize'
import { useRoscoStore } from '@/store/useRoscoStore'

interface UseEditLetterProps {
  letra: string
  JsonRosco: Letter[]
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function useEditLetter({ letra, JsonRosco, setModal }: UseEditLetterProps) {
  const { setRoscoEditing } = useRoscoStore()

  const thisLetter = JsonRosco.find((item) => item.letter === letra)

  // Creo un state para el formulario completo
  const [formData, setFormData] = useState<Letter>({
    letter: letra,
    type: thisLetter!.type,
    description: thisLetter!.description,
    correct: thisLetter!.correct,
    deleted: thisLetter!.deleted,
  })

  const handleEvaluateWord = (
    type: Letter['type'],
    correct: Letter['correct'],
    Letter: Letter['letter'],
  ) => {
    const mayusLetter = Letter.toUpperCase()
    const minusLetter = Letter.toLowerCase()
    const containRegex = new RegExp(`[${mayusLetter}${minusLetter}]`)
    const startRegex = new RegExp(`^[${mayusLetter}${minusLetter}]`)

    if (type === 'Contiene' && containRegex.test(correct)) {
      return true
    }
    if (type === 'Parte' && startRegex.test(correct)) {
      return true
    }
    alert('La palabra no cumple con el tipo seleccionado')
    return false
  }

  /* Esto se utiliza para actualizar el form cuando se utiliza un elemento del form */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: capitalize(e.target.value),
    })
  }

  /* Actualiza el state con los datos del rosco completo */
  const handleSave = (updatedFormData: Letter) => {
    const index = JsonRosco.findIndex((item) => item.letter === letra)
    if (index !== -1) {
      //-1 es pq si no encuentra el index devuelve -1 y no hace nada
      const newJsonRosco = JsonRosco.map((item, i) => {
        if (i !== index) {
          return item
        }
        return {
          ...item, // <-- Mantiene propiedades viejas (ej: 'id', 'respuesta', etc.)
          ...updatedFormData, // <-- Sobrescribe con las propiedades nuevas (ej: 'pregunta')
        }
      })
      setRoscoEditing(newJsonRosco)
      setModal(false)
    }
  }

  /* El submite del form */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      formData.description === '' ||
      formData.type === '' ||
      formData.correct === ''
    ) {
      alert('Faltan Cosas >:L')
      return
    }
    const isValid = handleEvaluateWord(formData.type, formData.correct, letra)
    if (!isValid) {
      return
    }

    /* Guarda los cambios */
    handleSave(formData)
  }

  /* Cambia el estado deleted */
  const handleDelete = (newDeleted: boolean) => {
    const updatedFormData = {
      ...formData,
      deleted: newDeleted,
    }
    handleSave(updatedFormData)
  }

  /* Lleva para trabajar los datos del hook al componente que lo llama */
  return {
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
  }
}

export default useEditLetter
