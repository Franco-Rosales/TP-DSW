const { DataTypes } = require('sequelize');

const NoticiasModel = (sequelize) => {
    const Noticias = sequelize.define(
        'Noticias',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.TEXT
            },
            fecha: {
                type: DataTypes.DATE
            },
            // Relacionamos la noticia con el chef
            chef_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: 'noticias'
        }
    );

    Noticias.associate = (models) => {
        Noticias.belongsTo(models.Chef, { foreignKey: 'chef_id', as: 'chef' });
    };

    return Noticias;
}

module.exports = NoticiasModel;
