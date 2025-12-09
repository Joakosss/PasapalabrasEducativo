import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  letra: string
  JsonRosco: EditLetra[]
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  SetIsRoscoJson: React.Dispatch<React.SetStateAction<EditLetra[]>>
}

function Modal({ letra, JsonRosco, setModal, SetIsRoscoJson }: Props) {
  const thisLetter = JsonRosco.find((item) => item.letra === letra)
  const [formData, setFormData] = useState<EditLetra>({
    letra: letra,
    tipo: thisLetter?.tipo,
    descripcion: thisLetter?.descripcion,
    correcto: thisLetter?.correcto,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.descripcion === undefined || formData.tipo === undefined || formData.correcto === undefined) {
      console.log(formData)
      alert('Faltan Cosas >:L')
      return
    }

    const index = JsonRosco.findIndex((item) => item.letra === letra)
    if (index !== -1) {
      //-1 es pq si no encuentra el index devuelve -1 y no hace nada
      const newJsonRosco = JsonRosco.map((item, i) => {
        if (i !== index) {
          return item
        }
        return {
          ...item, // <-- Mantiene propiedades viejas (ej: 'id', 'respuesta', etc.)
          ...formData, // <-- Sobrescribe con las propiedades nuevas (ej: 'pregunta')
        }
      })
      SetIsRoscoJson(newJsonRosco)
      setModal(false)
    }
  }

  return (
    <div
      id="EditModal"
      className="absolute flex items-center justify-center bg-gray-400/50 inset-0 z-1 w-full h-full"
    >
      <form className="space-y-4 w-[40%]" onSubmit={handleSubmit}>
        <div className="relative p-4">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow-sm ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Letra {letra}
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer "
                onClick={() => setModal(false)}
              >
                <IoClose />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 flex flex-col gap-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Palabra correcta
              </label>
              <div className="flex items-center">
                <input
                  id="PalabraCorrecta"
                  value={formData.correcto}
                  name="correcto"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  onChange={handleChange}
                />

              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                ¿La palabra ... con la letra {letra}?
              </label>
              <div className="flex gap-10">
                <div className="flex items-center">
                  <input
                    id="tipo-1"
                    type="radio"
                    value="Contiene"
                    name="tipo"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    checked={formData.tipo === 'Contiene'}
                    onChange={handleChange}
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 ">
                    Contiene
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="tipo-2"
                    type="radio"
                    value="Parte"
                    name="tipo"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    checked={formData.tipo === 'Parte'}
                    onChange={handleChange}
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 ">
                    Parte
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Describe la palabra
                </label>
                <textarea
                  id="Descripcion"
                  name="descripcion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  onChange={handleChange}
                  value={formData.descripcion}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Modal
