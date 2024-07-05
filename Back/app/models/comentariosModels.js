const { DataTypes } = require('sequelize');

const ComentarioModel = (sequelize) => {
    const Comentario = sequelize.define(
        'Comentario',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            contenido: {
                type: DataTypes.TEXT
            },
            fecha_creacion: {
                type: DataTypes.DATEONLY
            },
            receta_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'recetas',
                    key: 'id'
                }
            },
            chef_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'chefs',
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            tableName: 'comentarios'
        }
    );

    Comentario.associate = (models) => {
        Comentario.belongsTo(models.Receta, { foreignKey: 'receta_id' });
        Comentario.belongsTo(models.Chef, { foreignKey: 'chef_id' });
    };

    return Comentario;
};

module.exports = ComentarioModel;