const express = require('express');
const routes = express.Routes();
const { register } = require('../controllers/auth.controllers');
const { uploadProfilePic } = require('../config/multer');
const { validateRegister } = require('../middlewares/validator');
const { authLimiter } = require('../middlewares/rateLimiter');



ruotes.post('/register', authLimiter, uploadProfilePic, validateRegister, register)


module.exports= routes