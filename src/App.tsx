

import { Routes, Route } from "react-router-dom";
import Inicio from "./Feacture/Inicio/Inicio";
import "./App.css";
import Galeria from "./Feacture/Galeria/Galeria";
import Dashboaard from "./Feacture/Dashboard/Dashboaard";
import Nosotros from "./Feacture/Nosotros/Nosotros";
import Contacto from "./Feacture/Contacto/Nosotros";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Inicio />} >
       <Route index element={<Dashboaard />} />


       <Route path="/galeria" element={<Galeria />} />
       <Route path="/nosotros" element={<Nosotros />} />
       <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}

export default App;
