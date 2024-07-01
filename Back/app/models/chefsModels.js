const { DataTypes } = require('sequelize');

const ChefModel = (sequelize) => {
    const Chef = sequelize.define(
        'Chef',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            biografia: {
                type: DataTypes.TEXT
            },
            cantidad_recetas: {
                type: DataTypes.INTEGER
            },
            fecha_nacimiento: {
                type: DataTypes.DATEONLY
            },
        },
        {
            timestamps: false,
            tableName: 'chefs'
        }
    );

    Chef.associate = (models) => {
        Chef.hasMany(models.Receta, { foreignKey: 'chef_id' });
    };

    return Chef;

}

module.exports = ChefModel;