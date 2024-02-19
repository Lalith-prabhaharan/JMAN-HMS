const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_DB_URL, {
  logging: false,  
  dialectOptions: {
    ssl: {  
      require: true,
    }
  }
});

module.exports = {sequelize};