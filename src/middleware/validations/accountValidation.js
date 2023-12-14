const { check } = require("express-validator");
const checkValidationResult = require("./validator");

function createImmutableValidation(fieldName) {
  return check(fieldName).custom((value, { req }) => {
    if (req.body[fieldName] !== undefined) {
      throw new Error(`${fieldName} es inmutable`);
    }
    return true;
  });
}

const validateMoneda = createImmutableValidation("moneda");
const validateTipo = createImmutableValidation("tipo");
const validateBalance = createImmutableValidation("balance");

const validateActiva = check("activa")
  .trim()
  .isBoolean().withMessage('Activa solo acepta booleano (true/false)')
  .optional();

const validateAccountUpdate = [
  validateMoneda,
  validateTipo,
  validateBalance,
  validateActiva,
  checkValidationResult,
];

module.exports = { validateAccountUpdate };
