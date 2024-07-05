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
                type: DataTypes.DATEONLY
            },
            chef_id: { 
                type: DataTypes.INTEGER,
                references: {
                    model: 'chefs', 
                    key: 'id'
                }
            },
            categoria_id: { 
                type: DataTypes.INTEGER,
                references: {
                    model: 'categorias', 
                    key: 'id'
                }
            },
            dificultad_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'dificultades', 
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

        Receta.belongsToMany(models.Ingrediente, {
            through: models.RecetaIngrediente,
            foreignKey: 'receta_id'
        });

        Receta.hasMany(models.Comentario, { foreignKey: 'receta_id' });

        Receta.hasMany(models.Valoracion, { foreignKey: 'receta_id' });

        Receta.belongsTo(models.Chef, { foreignKey: 'chef_id' });

        Receta.belongsTo(models.Dificultad, { foreignKey: 'dificultad_id' });
        
        Receta.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
    };

    return Receta;
};

module.exports = RecetaModel;