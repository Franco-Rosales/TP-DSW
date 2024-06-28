const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// Importar los controladores y rutas
const db = require('./app/db/setup');
const valoracionesRoutes = require('./app/routes/valoraciones.routes');
const comentariosRoutes = require('./app/routes/comentarios.routes');
const ingredientesRoutes = require('./app/routes/ingredientes.routes');
const medidasRoutes = require('./app/routes/medidas.routes');
const pasosPreparacionRoutes = require('./app/routes/pasosPreparacion.routes');
const recetasRoutes = require('./app/routes/recetas.routes');
const usuariosRoutes = require('./app/routes/usuarios.routes');
const categoriasRoutes = require('./app/routes/categorias.routes');

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
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/medidas', medidasRoutes);
app.use('/api/pasos-preparacion', pasosPreparacionRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/categorias', categoriasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});