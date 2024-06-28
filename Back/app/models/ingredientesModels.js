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
            cantidad: {
                type: DataTypes.FLOAT
            },
            unidad: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            tableName: 'ingredientes'
        }
    );

    // Definición de relaciones
    Ingrediente.associate = (models) => {
        // Relación muchos a uno con Receta
        Ingrediente.belongsTo(models.Receta, { foreignKey: 'receta_id' });

        // Relación muchos a muchos con Medidas
        Ingrediente.belongsToMany(models.Medida, {
            through: 'IngredientesRecetasMedidas',
            foreignKey: 'ingrediente_id'
        });
    };

    return Ingrediente;
};

module.exports = IngredienteModel;