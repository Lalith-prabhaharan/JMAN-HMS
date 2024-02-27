const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');
const Doctor = require('./Doctor');
const Patient = require('./Patient'); 
const Prescription = sequelize.define('Prescription', {
    p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'patient_id'
        }
    },
    doc_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Doctor,
            key: 'doc_id'
        }
    },
    time_stamp: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    medication: {
        type: DataTypes.STRING(2000),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Prescription;