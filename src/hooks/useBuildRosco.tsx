import { useEffect, useRef, useState } from 'react'

function useBuildRosco() {
  const [radio, setRadio] = useState(0)
  const roscoRef = useRef<HTMLDivElement | null>(null)

  // para medir el tamaño del div contenedor.
  useEffect(() => {
    if (!roscoRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setRadio(entry.contentRect.width / 2)
      }
    })
    observer.observe(roscoRef.current)
    return () => observer.disconnect()
  }, [])
  return {
    radio,
    roscoRef,
  }
}

export default useBuildRosco
