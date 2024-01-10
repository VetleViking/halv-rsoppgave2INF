const {Model, DataTypes} = require("sequelize");

module.exports = class Lærere extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "Lærere",
            createdAt: false,
            updatedAt: false,
            sequelize
        })
    }
}