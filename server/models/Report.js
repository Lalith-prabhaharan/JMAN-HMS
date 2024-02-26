const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db/connect');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const Report = sequelize.define('Report', {
    report_id: {
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
    file_name: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    timestamps: false,
});

module.exports = Report;