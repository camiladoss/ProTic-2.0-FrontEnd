import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from 'pages/Index'
import Layout from 'Layouts/PublicLayout'
import Home from 'pages/Home'
import PrivateLayout from 'Layouts/PrivateLayout'
import GestionProyectos from "pages/GestionProyectos";
import CrearProyectos from "pages/CrearProyectos";
import CrearAvances from "pages/CrearAvances";
import Inscripciones from "pages/Inscripciones";
import GestionAvances from "pages/GestionAvances";
import HistorialAvances from "pages/HistorialAvances";
import Perfil from "pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route  path="/" element={<Layout/>}>
          <Route path="/" element={<Index/>} />
        </Route>
        <Route  path="/" element={<PrivateLayout/>}>
          <Route path="/home" element={<Home/>} />
          <Route path="/GestionProyectos" element={<GestionProyectos/>} />
          <Route path="/CrearProyectos" element={<CrearProyectos/>} />
          <Route path="/GestionAvances" element={<GestionAvances/>} />
          <Route path="/CrearAvances" element={<CrearAvances/>} />
          <Route path="/Inscripciones" element={<Inscripciones/>} />
          <Route path="/Historial" element={<HistorialAvances/>} />
          <Route path="/Perfil" element={<Perfil/>} />
        </Route>

      </Routes>     
  </BrowserRouter>
  );
}

export default App;
