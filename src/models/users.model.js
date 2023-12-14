const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const Account = require("./accounts.model");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha:true
    }
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isAlpha:true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  dni: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cuil:{
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutorial:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},{
  paranoid: true,
  timestamps: true, 
  deletedAt: "deletedAt", 
});

User.hasMany(Account, {onDelete:"CASCADE", foreignKey: { allowNull: false }})
Account.belongsTo(User, { foreignKey: { allowNull: false } })

module.exports = User;
