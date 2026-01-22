export default function Footer() {
  return (
     <footer className="mt-auto   py-4">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-600">
        <p className="font-medium">
          Proyecto Portafolio y Galería
        </p>

        <p className="mt-1">
          Cristhian David Quispe Bermudez
        </p>

        <p className="mt-1">
          Materia: Desarrollo de Aplicaciones Web
        </p>

        <p className="mt-2 text-xs text-slate-400">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}