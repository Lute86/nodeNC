const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const Transaction = require("./transactions.model");

const Card = sequelize.define("Cards", {
  numero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cvv: {
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activa',
  },
  expiracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  limite: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
},{
  paranoid: true,
  timestamps: true, 
  deletedAt: "deletedAt", 
});

Card.hasMany(Transaction, {onDelete:"CASCADE", foreignKey: { allowNull: false }})
Transaction.belongsTo(Card, { foreignKey: { allowNull: false } });

module.exports = Card