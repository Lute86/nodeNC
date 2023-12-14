const { accountProvider } = require("../providers/index.providers");

const createAccount = async (currency, userId) => {
  try {
    const account = await accountProvider.createAccount(currency, userId);
    return account;
  } catch (error) {
    throw new Error(error);
  }
};

const getAccounts = async (userId) => {
  try {
    const accounts = await accountProvider.getAccounts(userId);
    return accounts;
  } catch (error) {
    throw new Error(error);
  }
};

const updateAccount = async (updates, accountId) => {
  try {
    if (updates.balance) {
      delete updates.balance;
    }
    const accounts = await accountProvider.updateAccount(updates, accountId);
    return accounts;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAccount = async (userId, accountId) => {
  try {
    const deletedAccount = await accountProvider.deleteAccount(
      userId,
      accountId
    );
    return deletedAccount;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllDeletedAccounts = async () => {
  try {
    const deletedAccounts = await accountProvider.getAllDeletedAccounts();
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
