const {Model, DataTypes} = require("sequelize");

module.exports = class Elever extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: "Elever",
            createdAt: false,
            updatedAt: false,
            sequelize
        })
    }
}