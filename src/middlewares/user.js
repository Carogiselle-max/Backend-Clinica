

const { body, param, validationResult } = require('express-validator');
const User = require("../models/User");


// Validar ID de usuario (para GET, PATCH, DELETE)
const validateUserId = [
  param("id")
    .isMongoId()
    .withMessage("ID inválido")
    .custom(async (id) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
    })
];

// Validar actualización de rol (PATCH)
const validateUpdateRole = [
  body("role")
    .notEmpty()
    .withMessage("El rol es obligatorio")
    .isIn(["admin", "doctor", "patient"])
    .withMessage("Rol inválido")
];

module.exports = {
  validateUserId,
  validateUpdateRole
};
