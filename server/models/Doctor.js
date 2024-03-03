const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');



const Doctor = sequelize.define('Doctor', {
    doc_id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(520),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    department: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    year_of_exp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
});





module.exports = Doctor;