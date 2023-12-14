const HttpResponse = require("../handlers/HttpResponse");
const { accountService } = require("../services/index.services");

const createAccount = async (req, res) => {
  const action = "Crear cuenta";
  try {
    const userId = req.params.userId;
    const currency = req.params.currency.toLowerCase();
    //Verificar moneda adecuada y comparar id's
    if (currency != "ars" && currency != "usd")
      return HttpResponse.badRequest(res, {
        action,
        message: "Moneda incorrecta (solo usd/ars)",
      });
    if (req.user.id == userId) {
      // Crear cuenta para el usuario
      const account = await accountService.createAccount(currency, userId);
      if (!account) throw new Error("No se pudo crear la cuenta");
      return HttpResponse.created(res, { action, account });
    }
    return HttpResponse.forbidden(res);
  } catch (error) {
    console.error(error);
    return HttpResponse.serverError(res, { action, error });
  }
};

const getAccounts = async (req, res) => {
  try {
    const userId = req.params.userId;
    //comparar id's
    if (req.user.id == userId) {
      //buscar cuentas
      const accounts = await accountService.getAccounts(userId);
      if (!accounts)
        return HttpResponse.notFound(res, {
          action: "Ver cuentas",
          message: "No se encontraron cuentas",
        });
      return HttpResponse.success(res, { accounts });
    }
    return HttpResponse.forbidden(res);
  } catch (error) {
    console.error(error);
    return HttpResponse.serverError(res, { error });
  }
};

const updateAccount = async (req, res) => {
  const { userId, accountId } = req.params;
  try {
    if (req.user.id == userId) {
      const update = await accountService.updateAccount(req.body, accountId);
      if (!update)
        return HttpResponse.notFound(res, {
          action: "Modificar cuenta",
          message: "No se encontro cuenta",
        });
      return HttpResponse.success(res, { update });
    }
    return HttpResponse.forbidden(res);
  } catch (error) {
    return HttpResponse.serverError(res, error);
  }
};

const deleteAccount = async (req, res) => {
  const action = "Eliminar cuenta";
  const { userId, accountId } = req.params;
  try {
    if (req.user.id == userId) {
      const deletedAccount = await accountService.deleteAccount(
        userId,
        accountId
      );
      if (!deletedAccount)
        return HttpResponse.notFound(res, {action});
      return HttpResponse.noContent(res, {action});
    }
    return HttpResponse.forbidden(res)
  } catch (error) {
    return  HttpResponse.serverError(res, error)
  }
};

const getAllDeletedAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllDeletedAccounts();
    if (!accounts)
      return HttpResponse.notFound(res, {
        action: "Ver cuentas borradas",
        message: "No se encontraron cuentas",
      });
    return HttpResponse.success(res, accounts);
  } catch (error) {
    return HttpResponse.serverError(res, error)
  }
};

module.exports = {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getAllDeletedAccounts,
};
