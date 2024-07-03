import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { Chefs } from './components/Chefs/Chefs';
import { Ingredientes } from './components/Ingredientes/Ingredientes';
import { RecetaIngrediente } from './components/RecetasIngredientes/RecetaIngrediente';
import { Chefs } from './components/Chefs/Chefs';
import { Noticias } from './components/Noticias/Noticias';
import { EditarNoticia } from './components/Noticias/EditarNoticia';
import { Comentarios } from './components/Comentarios/Comentarios';
import { Categorias } from './components/Categorias/Categorias';
import { Contacto } from './components/Contacto/Contacto';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/ingredientes" element={<Ingredientes/>}/>
        <Route path="/recetas-ingredientes" element={<RecetaIngrediente/>}/>
        <Route path="/noticias" element={<Noticias/>}/>
        <Route path="/noticia/:id" element={<EditarNoticia/>}/>
        <Route path="/comentarios" element={<Comentarios/>}/>
        <Route path="/categorias" element={<Categorias/>}/>
        <Route path='/contacto' element={<Contacto/>} />
      </Routes>
  );
}

export default App;
