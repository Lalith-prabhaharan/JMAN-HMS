const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_DB_URL, {
  logging: false,  
  dialectOptions: {
    ssl: {  
      require: true,
    }
  }
});

module.exports = {sequelize};const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}