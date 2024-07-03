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


function App() {
  return (
    <>
    <NavBar/>
    <div className='content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/chefs" element={<Chefs/>}/>
        <Route path="/ingredientes" element={<Ingredientes/>}/>
        <Route path="/recetas-ingredientes" element={<RecetaIngrediente/>}/>
        <Route path="/noticias" element={<Noticias/>}/>
        <Route path="/comentarios" element={<Comentarios/>}/>
        <Route path="/categorias" element={<Categorias/>}/>
        <Route path='/contacto' element={<Contacto/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
