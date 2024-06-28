const { DataTypes } = require('sequelize');

const UsuarioModel = (sequelize) => {
    const Usuario = sequelize.define(
        'Usuario',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            tableName: 'usuarios'
        }
    );

    // Definición de relaciones
    Usuario.associate = (models) => {
        // Relación uno a muchos con Comentarios
        Usuario.hasMany(models.Comentario, { foreignKey: 'usuario_id' });

        // Relación uno a muchos con Valoraciones
        Usuario.hasMany(models.Valoracion, { foreignKey: 'usuario_id' });
    };

    return Usuario;
};

module.exports = UsuarioModel;