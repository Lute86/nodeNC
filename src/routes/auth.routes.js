const express = require("express");
const {
  authController,
  userController,
} = require("../controllers/index.controller");
const {
  validateLogin,
  validateRegistration,
} = require("../middleware/validations/loginValidation.mdw");
const { authenticateToken } = require("../middleware/auth.mdw");
const HttpResponse = require("../handlers/HttpResponse");
const authRouter = express.Router();


authRouter.post("/login", validateLogin, authController.validateUser);
authRouter.post("/register", validateRegistration, userController.createUser);
authRouter.get("/token", authenticateToken, (req, res) => {
  return HttpResponse.success(res);
});
module.exports = authRouter;
