const Sequelize = require('sequelize');
const categoriasModel = require('../models/categoriasModels');
const comentariosModel = require('../models/comentariosModels');
const ingredientesModel = require('../models/ingredientesModels');
const recetasModel = require('../models/recetasModels');
const contactoModel = require('../models/contactoModel');
const chefsModel = require('../models/chefsModels');
const noticiasModel = require('../models/noticiasModels');
const recetaIngredientesModel = require('../models/recetaIngredienteModels');
const domiciliosModel = require('../models/domiciliosModel');
const dificultadesModel = require('../models/dificultadesModel');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './datos/recetas.db',
});

const categorias = categoriasModel(sequelize);
const comentarios = comentariosModel(sequelize);
const ingredientes = ingredientesModel(sequelize);
const recetas = recetasModel(sequelize);
const contacto = contactoModel(sequelize);
const chefs = chefsModel(sequelize);
const noticias = noticiasModel(sequelize);
const recetasIngredientes = recetaIngredientesModel(sequelize);
const domicilios = domiciliosModel(sequelize);
const dificultades = dificultadesModel(sequelize);

recetasIngredientes.belongsTo(recetas, { foreignKey: 'receta_id' });
recetasIngredientes.belongsTo(ingredientes, { foreignKey: 'ingrediente_id' });

recetas.hasMany(recetasIngredientes, { foreignKey: 'receta_id' });
ingredientes.hasMany(recetasIngredientes, { foreignKey: 'ingrediente_id' });

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


const db = { iniciar, categorias, comentarios, ingredientes, recetas, contacto,chefs, noticias, recetasIngredientes, dificultades, domicilios };
module.exports = db;