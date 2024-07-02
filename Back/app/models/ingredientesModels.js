const { DataTypes } = require('sequelize');

const IngredienteModel = (sequelize) => {
    const Ingrediente = sequelize.define(
        'Ingrediente',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING
            },
            popularidad: {
                type: DataTypes.INTEGER,
            },
            fecha_agregado: {
                type: DataTypes.DATEONLY
            }
        },
        {
            timestamps: false,
            tableName: 'ingredientes'
        }
    );

    Ingrediente.associate = (models) => {
        Ingrediente.belongsToMany(models.Receta, {
            through: models.RecetaIngrediente,
            foreignKey: 'ingrediente_id'
        });
    }

    return Ingrediente;
};

module.exports = IngredienteModel;