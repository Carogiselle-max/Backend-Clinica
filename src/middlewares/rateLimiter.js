const rateLimit = require('express-rate-limit')

const globalLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message:{
        success:false,
        message:'Demasiadas peticiones. Por favor intenta nuevamente...'
    },
    standardHeaders: true,
    legacyHeaders: false
})

const authLimiter = rateLimit({
    windowMs: 30*60*1000,
    max: 5,
    message:{
        success:false,
        message:'Demasiadas peticiones. Por favor intenta nuevamente...'
    },
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = {
    authLimiter,
    globalLimiter
}