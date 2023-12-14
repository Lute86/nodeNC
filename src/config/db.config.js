const { Sequelize } = require('sequelize');
require('dotenv').config()

const connectionString = process.env.DB_STRING; // Replace with your ElephantSQL connection string
const sequelize = new Sequelize(connectionString);

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