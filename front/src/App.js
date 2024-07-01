import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
// import { ListarReceta } from './components/Recetas/Listado'
import { Chefs } from './components/Chefs/Chefs';
import { EditarChef } from './components/Chefs/EditarChef';
import { EditarReceta } from './components/Recetas/EditarReceta';
import { Noticias } from './components/Noticias/Noticias';
import { EditarNoticia } from './components/Noticias/EditarNoticia';
import { Comentarios } from './components/Comentarios/Comentarios';
import { EditarComentario } from './components/Comentarios/EditarComentario';
import { Categorias } from './components/Categorias/Categorias';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="receta/:id" element={<EditarReceta/>}/>
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/chef/:id" element={<EditarChef/>}/>
        <Route path="/noticias" element={<Noticias/>}/>
        <Route path="/noticia/:id" element={<EditarNoticia/>}/>
        <Route path="/comentarios" element={<Comentarios/>}/>
        <Route path="/comentarios/:id" element={<EditarComentario/>}/>
        <Route path="/categorias" element={<Categorias/>}/>
      </Routes>
  );
}

export default App;
