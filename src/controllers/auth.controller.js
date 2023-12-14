const { createToken } = require("../middleware/auth.mdw");
const errorHandler = require("../handlers/ErrorHandler");
const HttpResponse = require("../handlers/HttpResponse");
const { authService } = require("../services/index.services");


const validateUser = async (req, res) => {
  const action = "Validar usuario"
  try {
    const user = await authService.validateUser(req.body);
    if(!user){
      return HttpResponse.notFound(res, {action, message:"Usuario no encontrado"})
    }
    if(user=="PasswordError") return HttpResponse.badRequest(res, {action, message:"Contraseña incorrecta"})
    const generatedToken = createToken(user)
    res.cookie('jwt', generatedToken, { httpOnly: true }); // revisar funcionamiento
    return HttpResponse.success(res, {user, token:generatedToken}) 
  } catch (error) {
    return errorHandler(error, res, action);
  }
};


module.exports = { validateUser };
