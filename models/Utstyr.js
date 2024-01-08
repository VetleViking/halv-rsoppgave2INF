const {Model, DataTypes} = require("sequelize");

module.exports = class Utstyr extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING, 
                defaultValue: "Sykkel"
            }, 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            hylle: {
                type: DataTypes.INTEGER
            },
            rad: {
                type: DataTypes.INTEGER
            },
            utleid: {
                type: DataTypes.BOOLEAN, 
                defaultValue: false
            },
            utlånsdato: {
                type: DataTypes.DATEONLY
            },
            ansvarlig: {
                type: DataTypes.STRING
            },
            låntaker: {
                type: DataTypes.STRING
            },
        },
        {
            tableName: "Utstyr",
            createdAt: false,
            updatedAt: false,
            sequelize
        })
    }
}