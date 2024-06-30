import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { ListarReceta } from './components/Listado/Listado'
import { Chefs } from './components/Chefs/Chefs';
import { EditarChef } from './components/Chefs/EditarChef';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/listar" element={<ListarReceta />} />
        <Route path='/chefs' element={<Chefs/>}/>
        <Route path='/chef/:id' element={<EditarChef/>}/>
      </Routes>
  );
}

export default App;
