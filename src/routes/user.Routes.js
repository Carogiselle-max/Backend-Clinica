// src/routes/user.Routes.js
const express = require("express");
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
} = require("../controllers/user.controller");

const router = express.Router();


//router.use(verifyAuth, verifyAdmin); // 


// Rutas de usuarios
router.get("/", getAllUsers);                     // Obtener todos los usuarios
router.get("/:id", getUserById);                 // Obtener usuario por ID
router.patch("/:id/role", updateUserRole);       // Actualizar rol de usuario
router.delete("/:id", deleteUser);               // Eliminar usuario

module.exports = router;


//RUTAS PRIVADAS PARA ADMINISTRACIÓN DE USUARIOS
//router.get('/', getAllUsers);
//GET USER BY ID
//router.get('/:id', validateUserId, getUserById)
//router.patch('/:id/role', validateMongoID, validateUpdateRole, updateUserRole);
//router.delete('/:id',validateMongoID, deleteUser);
