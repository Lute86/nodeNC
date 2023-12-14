const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Transaction = sequelize.define('Transactions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
},{
  paranoid: true,
  timestamps: true, 
  deletedAt: "deletedAt", 
});

module.exports = Transaction