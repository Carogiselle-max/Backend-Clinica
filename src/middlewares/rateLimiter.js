const rateLimit = require('express-rate-limit')

const authLimiter = retaLimit({
    windowMs: 30*60*1000,
    max: 3,
    message:{
        success:false,
        message:'Demaciadas peticiones. Por faor intenta nuevamente en 30 min.'
    },
    standarHeaders: true,
    legacyHeader: false
})

module.exports = {
    authLimiter
}