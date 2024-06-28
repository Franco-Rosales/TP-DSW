const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Importar los controladores y rutas
const db = require('./app/db/setup');
const valoracionesRoutes = require('./app/routes/valoracionesRoutes');
const categoriasRoutes = require('./app/routes/categoriasRoutes');
const comentariosRoutes = require('./app/routes/comentariosRoutes');
const ingredientesRecetasMedidasRoutes = require('./app/routes/ingredientesRecetasMedidasRoutes');
const ingredientesRoutes = require('./app/routes/ingredientesRoutes');
const medidasRoutes = require('./app/routes/medidasRoutes');
const pasosPreparacionRoutes = require('./app/routes/pasosPreparacionRoutes');
const recetasCategoriasRoutes = require('./app/routes/recetasCategoriasRoutes');
const recetasRoutes = require('./app/routes/recetasRoutes');
const usuariosRoutes = require('./app/routes/usuariosRoutes');

// Inicializar la aplicación Express
const app = express();

// Middleware para procesar datos JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Iniciar la base de datos
// Usa db.iniciar(true) para resetear estructura y datos si es necesario
db.iniciar();

// Rutas
app.use('/api/valoraciones', valoracionesRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/ingredientes-recetas-medidas', ingredientesRecetasMedidasRoutes);
app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/medidas', medidasRoutes);
app.use('/api/pasos-preparacion', pasosPreparacionRoutes);
app.use('/api/recetas-categorias', recetasCategoriasRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Otras rutas aquí si las tienes
// app.use('/api/otra-ruta', otraRuta);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});