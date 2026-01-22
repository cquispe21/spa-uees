export default function Nosotros() {
  return (
   <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-slate-800">
        Nosotros
      </h1>

      <p className="mb-4 text-slate-600">
        Este sitio web fue desarrollado como parte del proyecto académico de la
        materia <span className="font-medium">Desarrollo de Aplicaciones Web</span>.
      </p>

      <p className="text-slate-600">
        El objetivo principal es presentar un portafolio personal y una galería
        de imágenes, aplicando tecnologías modernas como React, Vite y Tailwind CSS.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          <strong>Integrante:</strong> Cristhian David Quispe Bermudez
        </p>
      </div>
    </section>
    );
}