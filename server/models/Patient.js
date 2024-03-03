const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');
const Doctor = require('./Doctor'); 



const Patient = sequelize.define('Patient', {
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    entry_date: {
        type: DataTypes.DATEONLY,
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
        allowNull: false
        // unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
        // unique: true
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blood_group: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    diseases_description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    history: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    doctor_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    doc_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Doctor,
            key: 'doc_id'
        }
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    risk: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    timestamps: false
});





module.exports = Patient;