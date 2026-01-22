import { useEffect, useState } from "react"

export default function Galeria() {





    interface Imagen {
        id: string
        author: string
        width: number
        height: number
        url: string
        download_url: string
    }

    const [imagenes, setImagenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchImagenes = async () => {
      try {
       const res = await fetch("https://picsum.photos/v2/list?page=1&limit=12")


        if (!res.ok) throw new Error("Error al cargar imágenes")

        const data = await res.json()
        setImagenes(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchImagenes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Cargando imágenes...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    )
  }
  return (
     <section className="p-6">
      <h1 className="text-3xl dark:text-white font-bold mb-6 text-center">
        Galería de Imágenes
      </h1>

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      ">
        {imagenes.map((img:Imagen) => (
          <div
            key={img.id}
            className="
              overflow-hidden
              rounded-xl
              shadow-lg
              hover:scale-105
              transition-transform
              duration-300
            "
          >
            <img
             src={img.download_url}
             
              className="
                w-full
                h-56
                object-cover
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}