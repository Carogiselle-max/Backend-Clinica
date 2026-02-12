const express = require('express');
const routes = express.Routes();
const { register, login, verifyEmail, logout } = require('../controllers/auth.controller');
const { uploadProfilePic } = require('../config/multer');
const { validateRegister, validateLogin, validateVerifyEmail } = require('../middlewares/validator');
const { authLimiter } = require('../middlewares/rateLimiter');
const { verifyAuth } = require('../middlewares/auth');


// public endpoints
routes.post('/register', authLimiter, validateRegister, register);
routes.post('/login', authLimiter, validateLogin, login);
routes.post('/Verify-email', authLimiter, validateVerifyEmail, verifyEmail);

// private endpoints
routes.post('/logout', verifyAuth, logout)

module.exports= routes