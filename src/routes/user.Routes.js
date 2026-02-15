
const express = require('express');
const router = express.Router();

const { verifyAuth, verifyAdmin } = require('../middlewares/auth');

const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole
} = require('../controllers/user.controller');


const {
  validateUserId,
  validateUpdateRole
} = require('../middlewares/user');

// las rutas protegidas



// GET /users
router.get('/',  getAllUsers);
// GET /users/:id

router.get('/:id', validateUserId, getUserById);

// patch /users/:id
router.patch('/:id/role', validateUserId, validateUpdateRole, updateUserRole);

// DELETE /users/:id
router.delete('/:id', validateUserId, deleteUser);

module.exports = router;
