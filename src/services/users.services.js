const { userProvider } = require("../providers/index.providers");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const createdUser =  await userProvider.createUser(user);
    return createdUser
  } catch (error) {
    throw new Error(error)
  }
};

const getUser = async (userId) => {
  try {
    const user = await userProvider.getUser(userId);
    return user;
  } catch (error) {
    throw new Error(error)
  }
};

const getAllUsers = async () => {
  try {
    const users = await userProvider.getAllUsers();
    return users;
  } catch (error) {
    throw new Error(error)
  }
};

const updateUser = async (userId, user) => {
  try {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    if(user.newPassword) hashedPassword = await bcrypt.hash(user.newPassword, 10)
    const updatedUser = await userProvider.updateUser(userId, user, hashedPassword);
    return updatedUser;
  } catch (error) {
    throw new Error(error)
  }
}

const deleteUser = async (userId) => {
  try {
    const user = await userProvider.deleteUser(userId);
    return user;
  } catch (error) {
    throw new Error(error)
  }
}

const recoverUser = async (userId) => {
  try {
    const user = await userProvider.recoverUser(userId);
    return user;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser, recoverUser };
