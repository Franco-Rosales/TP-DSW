const { DataTypes } = require('sequelize');

const DomicilioModel = (sequelize) => {
    const Domicilio = sequelize.define(
        'Domicilio', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nro_calle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        barrio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_carga: {
            type: DataTypes.DATEONLY
        }
    });

    Domicilio.associate = (models) => {
        Domicilio.belongsTo(models.Contacto, { foreignKey: 'domicilio_id' });
    };

    return Domicilio;
};

module.exports = DomicilioModel;
