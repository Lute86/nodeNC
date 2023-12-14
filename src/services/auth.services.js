const { authProvider } = require("../providers/index.providers");
const bcrypt = require("bcrypt");

const validateUser = async (body) => {
  try {
    const userFound = await authProvider.validateUser(body);
    if (!userFound) return null;
    const compare = await bcrypt.compare(body.password, userFound[0].password); //sqlite[0]
    if(!compare) return "PasswordError"
    return userFound;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { validateUser };
