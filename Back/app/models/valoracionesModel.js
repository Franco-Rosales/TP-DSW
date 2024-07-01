const { DataTypes } = require('sequelize');

const DificultadModel = (sequelize) => {
    const Dificultad = sequelize.define(
        'Dificultad',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            descripcion: {
                type: DataTypes.STRING
            },
            valor: {
                type: DataTypes.INTEGER
            },
            fechaCarga: {
                type: DataTypes.DATEONLY
            },
        },
        {
            timestamps: false,
            tableName: 'dificultad'
        }
    );

    // Definición de relaciones
    Dificultad.associate = (models) => {
        // Relación muchos a uno con Receta
        Dificultad.belongsTo(models.Receta, { foreignKey: 'receta_id' });
    };

    return Dificultad;
};

module.exports = DificultadModel;