const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');



const Admin = sequelize.define('Admin', {
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});



module.exports = Admin;