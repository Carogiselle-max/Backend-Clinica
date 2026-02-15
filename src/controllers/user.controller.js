const User = require("../models/User");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      ok: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener usuarios"
    });
  }
};



// get /users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    res.json({
      ok: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener usuario"
    });
  }
};

// patch /users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    res.json({
      ok: true,
      message: "Rol actualizado correctamente",
      user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al actualizar rol"
    });
  }
};

// deleye /users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({
      ok: true,
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al eliminar usuario"
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
};