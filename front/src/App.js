import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { ListarReceta } from './components/Recetas/Listado'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/listar" element={<ListarReceta />} />
      </Routes>
  );
}

export default App;
