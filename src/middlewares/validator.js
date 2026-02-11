const { body, params, validationResult } = require('express-validator');
const User = require('../models/User');
const {deleteOneFile, cleanUploadsFiles}=require('../Utils/fileCleanup');
const Role_ADMIN = process.env.ADMIN

const handleValidationError = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            message:'Error De Validacion',
            errors: errors.mapped()
        })
    }
    next();
}

const handleValidationErrorWithFiles = (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        if(req.file){
            deleteOneFile(req.file.path)
        }
        if (req.files && Array.isArray(req.files)) {
            cleanUploadsFiles(req)
        }
        return res.status(400).json({
            ok:false,
            message:'Errores de Validación',
            errors: errors.mapped()
        })
    }
    next()
}

const validateRegister = [
    body('name')
    .notEmpty().witheMessage('Se requiere tu nombre')
    .isString().witheMessage('Solo texto')
    .isLength({min:2, max:20}).withe('Minimo de caracteres: 2, Maximo: 20')
    .trim(),

    body('surname')
    .notEmpty().witheMessage('Se requiere tu apellido')
    .isString().witheMessage('Solo texto')
    .isLength({min:3, max:20}).withe('Minimo de caracteres: 3, Maximo: 20')
    .trim(),

    body('email')
    .notEmpty().witheMessage('Se requiere tu email')
    .isEmail().witheMessage('El email no tiene el formato válido')
    .normalizeEmail()
    .custom(async (email)=>{
        const user = await User.findOne({email});
        if (user) {
            throw new Error('El usuario ya existe!')
        }
    })
    .trim(),

    body('password')
    .notEmpty().witheMessage('Se require la contaseña')
    .isLength({min:8}).withe('Minimo de caracteres: 8'),
    
    handleValidationError
]


// const validateLogin = [

//     handleValidationError
// ]


// const validateUserId = [


//     handleValidationError
// ]


// const validateUptateRole = [


//     handleValidationError
// ]


// const validateAdmin = [


//     handleValidationErrorWithFiles
// ]

// const validateDoctor = [


//     handleValidationErrorWithFiles
// ]

// const validateSecretary = [


//     handleValidationErrorWithFiles
// ]



module.exports = {
    validateRegister,
    // validateLogin,
    // validateUserId,
    // validateUptateRole,
    // validateAdmin,
    // validateDoctor,
    // validateSecretary,
}