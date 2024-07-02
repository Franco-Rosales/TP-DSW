const Sequelize = require('sequelize');
const categoriasModel = require('../models/categoriasModels');
const comentariosModel = require('../models/comentariosModels');
const ingredientesModel = require('../models/ingredientesModels');
const recetasModel = require('../models/recetasModels');
const ingredientesRecetasModel = require('../models/ingredientesRecetasMedidasModels');
const recetasCategoriasModel = require('../models/recetasCategoriasModels');
const contactoModel = require('../models/contactoModel');
const pasosPreparacionModel = require('../models/pasosPreparacionModels');
const valoracionesModel = require('../models/valoracionesModel');
const chefsModel = require('../models/chefsModels');
const recetaIngredientesModel = require('../models/recetaIngredienteModels');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './datos/recetas.db',
});

const categorias = categoriasModel(sequelize);
const comentarios = comentariosModel(sequelize);
const ingredientes = ingredientesModel(sequelize);
const recetas = recetasModel(sequelize);
const ingredientesRecetas = ingredientesRecetasModel(sequelize);
const recetasCategorias = recetasCategoriasModel(sequelize);
const contacto = contactoModel(sequelize);
const pasosPreparacion = pasosPreparacionModel(sequelize);
const valoraciones = valoracionesModel(sequelize);
const chefs = chefsModel(sequelize);
const recetaIngredientes = recetaIngredientesModel(sequelize);


const iniciar = async (reset = false) => {
    try {
        await sequelize.sync({ force: reset });
        console.log('Base de datos sincronizada');
        if (reset) {
            console.log('Base de datos inicializada sin datos.');
        }
    } catch (error) {
        console.error('Error al sincronizar la base de datos', error);
    }
};

const db = { iniciar, categorias, comentarios, ingredientes, recetas, recetaIngredientes, recetasCategorias, contacto, pasosPreparacion, valoraciones, chefs };
module.exports = db;