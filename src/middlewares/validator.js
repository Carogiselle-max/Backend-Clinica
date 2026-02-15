const { body, param, validationResult } = require('express-validator');
const User = require('../models/User');
const {deleteOneFile, cleanUploadsFiles}=require('../Utils/fileCleanup');

const handleValidationErrors = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            message:'Errores De Validacion',
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
    .notEmpty().withMessage('Se requiere tu nombre')
    .isString().withMessage('Solo texto')
    .isLength({min:2, max:20}).withMessage('Minimo de caracteres: 2, Maximo: 20')
    .trim(),

    body('surname')
    .notEmpty().withMessage('Se requiere tu apellido')
    .isString().withMessage('Solo texto')
    .isLength({min:3, max:20}).withMessage('Minimo de caracteres: 3, Maximo: 20')
    .trim(),

    body('email')
    .notEmpty().withMessage('Se requiere tu email')
    .isEmail().withMessage('El email no tiene el formato válido')
    .normalizeEmail()
    .custom(async (email)=>{
        const user = await User.findOne({email});
        if (user) {
            throw new Error('El usuario ya existe!')
        }
    })
    .trim(),

    body('password')
    .notEmpty().withMessage('Se require la contaseña')
    .isLength({min:8}).withMessage('Minimo de caracteres: 8'),
    
    handleValidationErrorWithFiles
]


const validateLogin = [
    body('email')
    .notEmpty().withMessage('Se requiere tu email')
    .isEmail().withMessage('El email ingresado no es válido')
    .normalizeEmail()
    .custom(async (email)=>{
        const user = await User.findOne({email});
        if (user) {
            throw new Error('Credencial Incorrecta!')
        }
    })
    .trim(),

    body('password')
    .notEmpty().withMessage('Se require la contaseña')
    .isLength({min:8}).withMessage('Minimo de caracteres: 8'),

    handleValidationErrors
]


const validateVerifyEmail=[
    body('email')
    .isEmail().withMessage('Email es inválido')
    .normalizeEmail()
    .custom( async (email)=>{
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Usuario no Encontado!')
        }
    })
    ,
    body('code')
    .isLength({min:6,max:6}).withMessage('El Código debe tener 6 digitos')
    .isNumeric().withMessage('El Código es numérico')
    ,

    handleValidationErrors
]

const validateUserId = [
    param('id')
        .isMongoId().withMessage('El id proporcionado no es Válido')
        .custom(async (id)=>{
            const user = await User.findById(id);
            if(!user){
                throw new Error('El Usuario no existe o no fue encontradoa')
            }
        }),
    
    handleValidationErrors
]


// const validateUptateRole = [

//     handleValidationErrors
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
    validateLogin,
    validateVerifyEmail,
    validateUserId,
    // validateUptateRole,
    // validateAdmin,
    // validateDoctor,
    // validateSecretary,
}