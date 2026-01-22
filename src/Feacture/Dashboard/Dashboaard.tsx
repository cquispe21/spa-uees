import { Link } from "react-router-dom"

export default function Dashboaard() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
        
      

        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            Proyecto Portafolio
          </span>
        </h1>

        <p className="mt-4 text-center text-lg text-slate-300 sm:text-xl">
          UEES — <span className="font-semibold text-slate-100">CRISTHIAN QUISPE</span>
        </p>

      
     <div className="mt-6 w-full grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link to="/galeria" className="rounded-xl col-span-3   border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-slate-400">Sección</p>
              <p className="mt-1 text-lg font-semibold">Galeria</p>
            </Link>
           
          </div>

       
        <div className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} — Proyecto Portafolio UEEES - Cristhian Quispe
        </div>
      </section>
    </main>
  );
}