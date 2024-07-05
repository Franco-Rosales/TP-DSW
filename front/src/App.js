import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Recetas } from './components/Recetas/Recetas';
import { Chefs } from './components/Chefs/Chefs';
import { Ingredientes } from './components/Ingredientes/Ingredientes';
import { RecetaIngrediente } from './components/RecetasIngredientes/RecetaIngrediente';
import { Noticias } from './components/Noticias/Noticias';
import { Comentarios } from './components/Comentarios/Comentarios';
import { Categorias } from './components/Categorias/Categorias';
import { Contacto } from './components/Contacto/Contacto';
import { Footer } from './components/Footer/Footer';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Receta } from './components/Recetas/Receta';
import { Chef } from './components/Chefs/Chef';
import { Ingrediente } from './components/Ingredientes/Ingrediente';
import { RecetasIngredientes } from './components/RecetasIngredientes/RecetasIngredientes';
import { Noticia } from './components/Noticias/Noticia';
import { Comentario } from './components/Comentarios/Comentario';
import { Categoria } from './components/Categorias/Categoria';
import { Contactos } from './components/Contacto/Contactos';
import { Domicilio } from './components/Domicilio.jsx/Domicilio';
import { Domicilios } from './components/Domicilio.jsx/Domicilios';
import { Dificultades } from './components/Dificultades/Dificultades';


function App() {
  return (
    <>
    <NavBar/>
    <div className='content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/receta/:id" element={<Receta />} />
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/chef/:id" element={<Chef/>}/>
        <Route path="/ingredientes" element={<Ingredientes/>}/>
        <Route path="/ingrediente/:id" element={<Ingrediente/>}/>
        <Route path="/recetas-ingredientes" element={<RecetasIngredientes/>}/>
        <Route path="/recetas-ingredientes/:id" element={<RecetaIngrediente/>}/>
        <Route path="/noticias" element={<Noticias/>}/>
        <Route path="/noticias/:id" element={<Noticia/>}/>
        <Route path="/comentarios" element={<Comentarios/>}/>
        <Route path="/comentarios/:id" element={<Comentario/>}/>
        <Route path="/categorias" element={<Categorias/>}/>
        <Route path="/categorias/:id" element={<Categoria/>}/>
        <Route path='/contacto' element={<Contactos/>} />
        <Route path='/contacto/:id' element={<Contacto/>} />
        <Route path="/dificultades" element={<Dificultades/>}/>
        <Route path="/domicilios" element={<Domicilios/>}/>
        <Route path="/domicilio/:id" element={<Domicilio/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
