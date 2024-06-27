const { DataTypes } = require('sequelize');

const MedidaModel = (sequelize) => {
    const Medida = sequelize.define(
        'Medida',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            tableName: 'medidas'
        }
    );

    // Definición de relaciones
    Medida.associate = (models) => {
        // Relación muchos a muchos con Ingredientes
        Medida.belongsToMany(models.Ingrediente, {
            through: 'IngredientesRecetasMedidas',
            foreignKey: 'medida_id'
        });
    };

    return Medida;
};

module.exports = MedidaModel;