const errorHandler = require("../handlers/ErrorHandler");
const HttpResponse = require("../handlers/HttpResponse");
const { userService } = require("../services/index.services");

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    return HttpResponse.created(res, newUser);
  } catch (error) {
    return errorHandler(error, res, "Crear usuario")
  }
};

const getUser = async (req, res) => {
  const action = "Buscar usuario"
  try {
    const user = await userService.getUser(req.params.userId);
    if (!user) {
      return HttpResponse.notFound(res, { action: action, error: "Usuario no encontrado" });
    } 
    return HttpResponse.success(res, user);
    
  } catch (error) {
      return errorHandler(error, res, action);
  }
};

const getAllUsers = async (req, res) => {
  const action = "Buscar usuario"
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      return HttpResponse.notFound(res, { action: action, message: "No se encontraron" });
    } else {
      return HttpResponse.success(res, users);
    }
  } catch (error) {
      return errorHandler(error, res, action);
  }
}

const updateUser = async (req, res) => {
  const action = "Actualizar usuario"
  try {
    if(req.params.userId == req.user.id) {
      const updatedUser = await userService.updateUser(req.params.userId, req.body);
      if(updatedUser=="PasswordError") return HttpResponse.badRequest(res, {action, message:"Contraseña incorrecta"})
      if(!updatedUser) return HttpResponse.notFound(res, {action, message: "Usuario no encontrado"})
      return HttpResponse.success(res, updatedUser)
    }
    return HttpResponse.forbidden(res)
  } catch (error) {
    return errorHandler(error, res, action);
  }
}

const deleteUser = async(req, res) => {
  const action = "Eliminar usuario"
  try {
    if(req.params.userId == req.user.id) {
      const deletedUser = await userService.deleteUser(req.params.userId);
      if(!deletedUser) return HttpResponse.notFound(res, {action, message: "Usuario no encontrado"})
      return HttpResponse.noContent(res, action)
    }
    return HttpResponse.forbidden(res)
  } catch (error) {
    return errorHandler(error, res, action);
  }
}

const recoverUser = async(req, res) => {
  const action = "Recuperar usuario"
  try {
    const user = await userService.recoverUser(req.params.userId);
    if(!user) return HttpResponse.notFound(res, {action, message: "Usuario no encontrado"})
    return HttpResponse.success(res, user)
  } catch (error) {
    return errorHandler(error, res, action);
  }
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser, recoverUser };
