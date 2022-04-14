const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Diet', {
        name: {
            type: DataTypes.STRING
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          }
    },)
}

