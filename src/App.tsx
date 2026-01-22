

import { Routes, Route } from "react-router-dom";
import Inicio from "./Feacture/Inicio/Inicio";
import "./App.css";
import Galeria from "./Feacture/Galeria/Galeria";
import Dashboaard from "./Feacture/Dashboard/Dashboaard";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Inicio />} >
       <Route index element={<Dashboaard />} />


       <Route path="/galeria" element={<Galeria />} />
      </Route>
    </Routes>
  );
}

export default App;
