const { Op } = require("sequelize");
const { Account, User } = require("../models/index.models");

const createAccount = async (currency, userId) => {
  try {
    const account = await Account.create({
      moneda: currency,
      tipo: "ahorro",
      balance: 0.0,
      estado: "activa",
      UserId: userId,
    });
    return account;
  } catch (err) {
    throw new Error(err);
  }
};

const getAccounts = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: Account,
    });
    const accounts = user.Accounts;
    return accounts;
  } catch (error) {
    throw new Error(error);
  }
};

const updateAccount = async (updates, accountId) => {
  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return null;
    }
    const updatedAccount = await account.update(updates)
    return updatedAccount.dataValues
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAccount = async (userId, accountId) => {
  try {
    const deletedAccount = await Account.findByPk(accountId);
    if (!deletedAccount) return null;
    if (userId != deletedAccount.UserId)
      throw new Error("Id usuario invalido");
    await deletedAccount.destroy();
    return deletedAccount.dataValues;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllDeletedAccounts = async () => {
  try {
    const deletedAccounts = await Account.findAll({
      paranoid: false,
      where: {
        deletedAt: { [Op.ne]: null }, // Filter records where deletedAt is not null
      },
    });
    return deletedAccounts;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAccount,
  getAccounts,
  deleteAccount,
  getAllDeletedAccounts,
  updateAccount,
};
