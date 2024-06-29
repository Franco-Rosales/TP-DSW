import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>
  );
}

export default App;
