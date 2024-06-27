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
                type: DataTypes.DATE
            }
        },
        {
            timestamps: false,
            tableName: 'comentarios'
        }
    );

    // Definición de relaciones
    Comentario.associate = (models) => {
        // Relación muchos a uno con Usuario
        Comentario.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });

        // Relación muchos a uno con Receta
        Comentario.belongsTo(models.Receta, { foreignKey: 'receta_id' });
    };

    return Comentario;
};

module.exports = ComentarioModel;