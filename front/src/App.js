import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { ListarReceta } from './components/Recetas/Listado'
import { Chefs } from './components/Chefs/Chefs';
import { EditarChef } from './components/Chefs/EditarChef';
import { EditarReceta } from './components/Recetas/EditarReceta';
import { Noticias } from './components/Noticias/Noticias';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="receta/:id" element={<EditarReceta/>}/>
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/chef/:id" element={<EditarChef/>}/>
        <Route path="/noticias" element={<Noticias/>}/>
      </Routes>
  );
}

export default App;
