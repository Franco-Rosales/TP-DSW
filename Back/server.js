const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Importar los controladores y rutas
const db = require('./app/db/setup');
const categoriasRoutes = require('./app/routes/categoriasRoutes');
const comentariosRoutes = require('./app/routes/comentariosRoutes');
const ingredientesRoutes = require('./app/routes/ingredientesRoutes');
const contactoRoutes = require('./app/routes/contactoRoutes');
const recetasRoutes = require('./app/routes/recetasRoutes');
const chefsRoutes = require('./app/routes/chefsRoutes');
const recetaIngredientesRoute = require('./app/routes/recetasIngredientesRoutes');
const noticiasRoutes = require('./app/routes/noticiasRoutes');
const dificultadesRoutes = require('./app/routes/dificultadesRoutes');
const domiciliosRoutes = require('./app/routes/domiciliosRoutes');
// Inicializar la aplicación Express
const app = express();

// Middleware para procesar datos JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Iniciar la base de datos
// Usa db.iniciar(true) para resetear estructura y datos si es necesario
db.iniciar();



// Rutas

app.use('/api/noticias', noticiasRoutes); 
app.use('/api/categorias', categoriasRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/chefs', chefsRoutes);
app.use('/api/recetas-ingredientes', recetaIngredientesRoute);
app.use('/api/dificultades', dificultadesRoutes);
app.use('/api/domicilios', domiciliosRoutes);

// Otras rutas aquí si las tienes
// app.use('/api/otra-ruta', otraRuta);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});