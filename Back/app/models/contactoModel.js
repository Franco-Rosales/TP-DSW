const { DataTypes } = require('sequelize');

const ContactoModel = (sequelize) => {
    const contacto = sequelize.define(
        'contacto',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING
            },
            apellido: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            telefono : {
                type: DataTypes.STRING
            
            },
            mensaje : {
                type: DataTypes.STRING
            },
            fecha_agregado: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW
            },
            domicilio_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'domicilios', 
                    key: 'id'
                }
            }
        },
        {
            timestamps: false,
            tableName: 'contacto'
        }
    ); 

    contacto.associate = (models) => {
        contacto.hasOne(models.Domicilio, {
            foreignKey: 'domicilio_id'
        });
    };

    return contacto;
};

module.exports = ContactoModel;