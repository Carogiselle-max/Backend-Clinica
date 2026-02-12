const express = require('express');
const routes = express.Routes();
const { register, login, verifyEmail } = require('../controllers/auth.controller');
const { uploadProfilePic } = require('../config/multer');
const { validateRegister, validateLogin, validateVerifyEmail } = require('../middlewares/validator');
const { authLimiter } = require('../middlewares/rateLimiter');


// public endpoints
routes.post('/register', authLimiter, validateRegister, register);
routes.post('/login', authLimiter, validateLogin, login);
routes.post('/Verify-email', authLimiter, validateVerifyEmail, verifyEmail);

// private endpoints

module.exports= routes