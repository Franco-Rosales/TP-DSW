const { DataTypes } = require('sequelize');

const PasoPreparacionModel = (sequelize) => {
    const PasoPreparacion = sequelize.define(
        'PasoPreparacion',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descripcion: {
                type: DataTypes.TEXT
            },
            orden: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            tableName: 'pasos_preparacion'
        }
    );

    // Definición de relaciones
    PasoPreparacion.associate = (models) => {
        // Relación muchos a uno con Receta
        PasoPreparacion.belongsTo(models.Receta, { foreignKey: 'receta_id' });
    };

    return PasoPreparacion;
};

module.exports = PasoPreparacionModel;