const { DataTypes } = require('sequelize');

const RecetaCategoriaModel = (sequelize) => {
    const RecetaCategoria = sequelize.define(
        'RecetaCategoria',
        {
            receta_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            categoria_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
        {
            timestamps: false,
            tableName: 'recetas_categorias'
        }
    );

    return RecetaCategoria;
};

module.exports = RecetaCategoriaModel;