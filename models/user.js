const { INTEGER, STRING, Sequelize } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define('user', {
    id:{
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{
        type: STRING,
        allowNull: false
    },
    email : STRING
});

module.exports = User;