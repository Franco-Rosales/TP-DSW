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
            nombre: {
                type: DataTypes.STRING
            },
            edad_recomendada: {
                type: DataTypes.INTEGER
            },
            descripcion: {
                type: DataTypes.STRING
            },
            fechaCarga: {
                type: DataTypes.DATEONLY
            },
        },
        {
            timestamps: false,
            tableName: 'dificultades'
        }
    );

    Dificultad.associate = (models) => {
        Dificultad.hasMany(models.Receta, { foreignKey: 'dificultad_id' });
    };

    return Dificultad;
};

module.exports = DificultadModel;
