const { User } = require("../models/index.models");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    throw new Error(err);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findByPk(userId, { include: { all: true } });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUser = async (userId, updates, hashedPassword) => {
  try {
    const user = await User.findByPk(userId);
    if(!user) return null
    //comparar password(sin hash) ingresado con password del usuario
    const comparePassword = await bcrypt.compare(updates.password, user.dataValues.password)//datavalues =>sqlite
    if(!comparePassword) return "PasswordError"
    //Si el pass es valido inserta password con hash a los updates para que se guarde correctamente
    updates.password = hashedPassword
    const updatedUser = await user.update(updates)
    return updatedUser.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.destroy({ where: { id: userId } });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const recoverUser = async (userId) => {
  try {
    const deletedUser = await User.restore({ where: { id: userId } });
    if (!deletedUser) return null;
    return deletedUser
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser, recoverUser };
