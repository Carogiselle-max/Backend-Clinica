const User = require('../models/User')
const { sendVerificationEmail }=require('../Utils/emialService')
const jwt = require('jsonwebtoken')
const { deleteOneFile } = require('../Utils/fileCleanup')


const register = async (req,res,next)=>{
    try {
        const {name, surname, email, password, confirmPassword}= req.body;
        const newUser=await User.create({
            name,
            surname,
            email,
            password,
            profilePic: req.file ? req.file.filename : null
        })
        const code = newUser.generateVerificationCode();
        await newUser.save();
        try {
            await sendVerificationEmail(email,name,code)
        } catch (error) {
            await User.findByIdAndDelete(newUser._id);
            if (req.file) {
                (req.file.path)
            }
            return res.status(500).json({
                ok:false,
                message: 'Error al enviar el email de verificación. Reintenta'
            })
        }
        return res.status(201).json({
            ok:true,
            message:'Usuario Registrado Exitosamente!',
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role,
                photo:newUser.profilePic,
            }
        })
    } catch (error) {
        next(error)
    }
}


// const login = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }


// const verifiEmail = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }


// const logout = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }


// const getUserProfile = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }


// const updateProfilePhoto = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }


// const updateUserProfile = async (req,res,next)=>{
//     try {
        
//     } catch (error) {
//         next(error)
//     }
// }

module.exports={
    register,
    // login,
    // verifiEmail,
    // logout,
    // getUserProfile,
    // updateProfilePhoto,
    // updateUserProfile,
}