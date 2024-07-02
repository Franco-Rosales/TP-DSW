import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { Chefs } from './components/Chefs/Chefs';
import { EditarChef } from './components/Chefs/EditarChef';
import { EditarReceta } from './components/Recetas/EditarReceta';
import { Ingredientes } from './components/Ingredientes/Ingredientes';
import { EditarIngrediente } from './components/Ingredientes/EditarIngrediente';
import { RecetaIngrediente } from './components/RecetasIngredientes/RecetaIngrediente';
import { EditarRecetaIngrediente } from './components/RecetasIngredientes/EditarRecetaIngrediente';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="receta/:id" element={<EditarReceta/>}/>
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/chef/:id" element={<EditarChef/>}/>
        <Route path="/ingredientes" element={<Ingredientes/>}/>
        <Route path="/ingrediente/:id" element={<EditarIngrediente/>}/>
        <Route path="/recetas-ingredientes" element={<RecetaIngrediente/>}/>
        <Route path="/recetas-ingredientes/:id" element={<EditarRecetaIngrediente/>}/>
      </Routes>
  );
}

export default App;
