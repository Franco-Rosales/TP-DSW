const { DataTypes } = require('sequelize');

const RecetaIngredienteModel = (sequelize) => {
    const RecetaIngrediente = sequelize.define(
        'RecetaIngrediente',
        {
            receta_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'recetas',
                    key: 'id'
                }
            },
            ingrediente_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'ingredientes',
                    key: 'id'
                }
            },
            cantidad: {
                type: DataTypes.DECIMAL(10, 2)
            },
            unidad: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            tableName: 'receta_ingredientes'
        }
    );

    RecetaIngrediente.associate = (models) => {
        RecetaIngrediente.belongsTo(models.Receta, { foreignKey: 'receta_id' });
        RecetaIngrediente.belongsTo(models.Ingrediente, { foreignKey: 'ingrediente_id' });
    };

    return RecetaIngrediente;
};

module.exports = RecetaIngredienteModel;