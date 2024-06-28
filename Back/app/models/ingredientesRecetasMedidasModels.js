const { DataTypes } = require('sequelize');

const IngredienteRecetaMedidaModel = (sequelize) => {
    const IngredienteRecetaMedida = sequelize.define(
        'IngredienteRecetaMedida',
        {
            ingrediente_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            receta_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            medida_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            cantidad: {
                type: DataTypes.FLOAT
            }
        },
        {
            timestamps: false,
            tableName: 'ingredientes_recetas_medidas'
        }
    );

    return IngredienteRecetaMedida;
};

module.exports = IngredienteRecetaMedidaModel;