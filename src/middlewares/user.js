//Verificar si el usuario es admin


const verifyAdmin = (req, res, next) => {
    if(req.user.role !== process.env.ADMIN_ROLE && req.user.role !== process.env.SUPER_ADMIN_ROLE){
        return res.status(403).json({
            ok:false,
            message: "Acceso denegado. Se requieren permisos de administrador"
        })
    }
    next()
}

//Verificar si el usuario es superadm
const verifySuperAdmin = (req,res,next) => {
    if(req.user.role !== process.env.SUPER_ADMIN_ROLE){
        return res.status(403).json({
            ok:false,
            message:'Acceso denegado. Se requieren permisos de super administrador'
        })
    }
    next();
}


module.exports = {
    verifyAdmin,
    verifySuperAdmin
}



