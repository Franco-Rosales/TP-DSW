const { DataTypes } = require('sequelize');

const CategoriaModel = (sequelize) => {
    const Categoria = sequelize.define(
        'Categoria',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING
            },
            descripcion: {
                type: DataTypes.STRING
            },
            fecha_agregado: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW
            }

        },
        {
            timestamps: false,
            tableName: 'categorias'
        }
    );

    // Definición de relaciones
    Categoria.associate = (models) => {
        // Relación muchos a muchos con Recetas
        Categoria.belongsToMany(models.Receta, {
            through: 'RecetasCategorias',
            foreignKey: 'categoria_id'
        });
    };

    return Categoria;
};

module.exports = CategoriaModel;