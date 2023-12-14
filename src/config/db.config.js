const { Sequelize } = require('sequelize');
require('dotenv').config()

const connectionString = process.env.DB_STRING; // Replace with your ElephantSQL connection string
const sequelize = new Sequelize(connectionString, {
  dialect: process.env.DB_DIALECT_P,
  logging: false, // Disable logging for better performance
});

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    await sequelize.sync({ force: false }); //force=>true in dev ONLY
  } catch (error) {
    console.error("Connection to DB FAILED", error);
  }
};

module.exports = { sequelize, initializeDB };