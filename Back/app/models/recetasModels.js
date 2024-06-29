const { DataTypes } = require('sequelize');

const RecetaModel = (sequelize) => {
    const Receta = sequelize.define(
        'Receta',
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
            instrucciones: {
                type: DataTypes.TEXT
            },
            tiempo_preparacion: {
                type: DataTypes.INTEGER
            },
            fecha_creacion: {
                type: DataTypes.DATE
            },
            chef_id: { 
                type: DataTypes.INTEGER,
                references: {
                    model: 'chefs', 
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            tableName: 'recetas'
        }
    );

    // Definición de relaciones
    Receta.associate = (models) => {
        // Relación muchos a muchos con Categorías
        Receta.belongsToMany(models.Categoria, {
            through: 'RecetasCategorias',
            foreignKey: 'receta_id'
        });

        // Relación uno a muchos con Ingredientes
        Receta.hasMany(models.Ingrediente, { foreignKey: 'receta_id' });

        // Relación uno a muchos con Pasos de Preparación
        Receta.hasMany(models.PasoPreparacion, { foreignKey: 'receta_id' });

        // Relación uno a muchos con Comentarios
        Receta.hasMany(models.Comentario, { foreignKey: 'receta_id' });

        // Relación uno a muchos con Valoraciones
        Receta.hasMany(models.Valoracion, { foreignKey: 'receta_id' });

        Receta.belongsTo(models.Chef, { foreignKey: 'chef_id' });
    };

    return Receta;
};

module.exports = RecetaModel;