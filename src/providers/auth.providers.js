const { User } = require("../models/index.models");

const validateUser = async (body) => {
  try {
    const foundUser = await User.findAll({
      where: {
        email: body.email,
      },
    });
    if (foundUser.length == 0) {
      return null;
    }
    return foundUser;
  } catch (err) {
    throw new Error(err)
  }
};

module.exports = { validateUser };
