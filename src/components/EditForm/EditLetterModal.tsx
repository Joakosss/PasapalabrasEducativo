import useEditLetter from '@/hooks/useEditLetter'
import type { Letter } from '@/Models/Letra'
import { FaFloppyDisk, FaTrash, FaTrashArrowUp } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

type EditLetterModalProps = {
  letra: string
  JsonRosco: Letter[]
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  SetIsRoscoJson: React.Dispatch<React.SetStateAction<Letter[]>>
}

function EditLetterModal({
  letra,
  JsonRosco,
  setModal,
  SetIsRoscoJson,
}: EditLetterModalProps) {
  /* Utilizamos nuestro custom HOOK de editar letras C; */
  const { formData, handleChange, handleDelete, handleSubmit } = useEditLetter({
    letra,
    JsonRosco,
    setModal,
    SetIsRoscoJson,
  })

  /* Opciones de radio */
  const radioOptions = [
    { value: 'Contiene', label: 'Contiene' },
    { value: 'Parte', label: 'Parte' },
  ]

  return (
    <div
      id="EditModal"
      className="absolute flex items-center justify-center bg-gray-400/50 inset-0 z-1 w-full h-full"
      onClick={() => setModal(false)}
    >
      <form
        className="space-y-4 w-[40%] z-4"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow-sm ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 ">
                Letra {letra}
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer "
                onClick={() => setModal(false)}
              >
                <IoClose />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* <!-- Modal body --> */}
            {/* Input Palabra correcta */}
            <div className="p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <MyLabel forHtml="PalabraCorrecta">Palabra correcta</MyLabel>
                <div className="flex items-center">
                  <input
                    id="PalabraCorrecta"
                    value={formData.correct}
                    name="correct"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  w-full text-xl h-12 p-2"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Radio Select tipo de palabra */}
              <div className="flex flex-col gap-1">
                <MyLabel forHtml="type">
                  ¿La palabra ... con la letra {letra}?
                </MyLabel>

                <div className="flex flex-row items-center gap-5">
                  {radioOptions.map((option) => (
                    <div className="flex items-center" key={option.value}>
                      <input
                        id={option.value}
                        type="radio"
                        value={option.value}
                        name="type"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                        checked={formData.type === option.value}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={option.value}
                        className="ms-2 text-xl font-medium text-gray-700 "
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Descripcion */}
              <div className="flex flex-col gap-1">
                <MyLabel forHtml="description">Describe la palabra</MyLabel>
                <textarea
                  id="description"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  w-full text-xl h-30 p-2"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              {/* Botones de guardar y eliminar */}
              <div className="flex flex-row gap-2 ">
                {formData.deleted ? (
                  <button
                    type="button"
                    onClick={() => handleDelete(false)}
                    className="flex justify-center items-center gap-5 w-full text-white bg-blue-700 hover:bg-blue-500 font-bold rounded-lg text-lg h-10 text-center cursor-pointer"
                  >
                    <FaTrashArrowUp size={20} />
                    Reactivar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDelete(true)}
                    className="flex justify-center items-center gap-5 w-full text-white bg-red-600 hover:bg-red-500 font-bold rounded-lg text-lg h-10 text-center cursor-pointer"
                  >
                    <FaTrash size={20} />
                    Eliminar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex justify-center items-center gap-5 w-full text-white bg-green-600 hover:bg-green-500 font-bold rounded-lg text-lg h-10 text-center cursor-pointer"
                >
                  <FaFloppyDisk size={20} />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditLetterModal

function MyLabel({
  forHtml,
  children,
}: {
  forHtml: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={forHtml} className="text-xl font-semibold text-gray-800 ">
      {children}
    </label>
  )
}
