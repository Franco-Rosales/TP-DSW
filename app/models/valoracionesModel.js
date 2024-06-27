const { DataTypes } = require('sequelize');

const ValoracionModel = (sequelize) => {
    const Valoracion = sequelize.define(
        'Valoracion',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            valor: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            tableName: 'valoraciones'
        }
    );

    // Definición de relaciones
    Valoracion.associate = (models) => {
        // Relación muchos a uno con Usuario
        Valoracion.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });

        // Relación muchos a uno con Receta
        Valoracion.belongsTo(models.Receta, { foreignKey: 'receta_id' });
    };

    return Valoracion;
};

module.exports = ValoracionModel;