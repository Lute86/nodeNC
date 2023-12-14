const { Sequelize } = require('sequelize');
const dbConfig = require('./config');
const environment = process.env.NODE_ENV;

const sequelize = new Sequelize(dbConfig[environment]);

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