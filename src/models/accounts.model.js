const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const Transaction = require("./transactions.model");
const Card = require("./cards.model");

const Account = sequelize.define(
  "Accounts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: "ahorro",
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    deletedAt: "deletedAt",
    hooks: {
      beforeDestroy: async (account, options) => {
        account.activa = false;
        await account.save({
          fields: ["activa"],
          transaction: options.transaction,
        });
      },
      beforeUpdate: async (account) => {
        const immutableAttributes = ["moneda", "tipo"];
        for (const attribute of immutableAttributes) {
          if (account.changed(attribute)) {
            throw new Error(
              `Cannot modify the ${attribute} attribute`
            );
          }
        }
      },
    },
  }
);

Account.hasMany(Transaction, {
  onDelete: "CASCADE",
  foreignKey: { allowNull: false },
});
Transaction.belongsTo(Account, { foreignKey: { allowNull: false } });
Account.hasMany(Card, {
  onDelete: "CASCADE",
  foreignKey: { allowNull: false },
});
Card.belongsTo(Account, { foreignKey: { allowNull: false } });

module.exports = Account;
