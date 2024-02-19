const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');
const Doctor = require('./Doctor');
const Patient = require('./Patient'); 
const Prescription = sequelize.define('Prescription', {
    p_id: {
        type: DataTypes.STRING(1000),
        primaryKey: true,
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
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'patient_id'
        }
    },
    p_timing: {
        type: DataTypes.DATE,
        allowNull: false
    },
    medication: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Prescription;