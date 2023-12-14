require('dotenv').config();

const config = {
  development: {
    dialect: process.env.DB_DIALECT_D,
    storage: process.env.DB_STORAGE
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT_P,
  },
};

module.exports = config