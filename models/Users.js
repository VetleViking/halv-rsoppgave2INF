const {Model, DataTypes} = require("sequelize");

module.exports = class Users extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING
            }, 
            password: {
                type: DataTypes.STRING
            },
        },
        {
            tableName: "Users",
            createdAt: false,
            updatedAt: false,
            sequelize
        })
    }
}