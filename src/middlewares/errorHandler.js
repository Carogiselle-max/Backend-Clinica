const { cleanUploadsFiles } = require("../Utils/fileCleanup")


const errorHandler= (err,req,res,next)=>{
    console.error('Error: ', err)
    cleanUploadsFiles(req)
    if(err.name==='ValidationError'){
        const errors = Object.values(err.errors).map(e = e.message)
        return res.status(400).json({
            ok:false,
            message:'Error de Validación',
            errors
        })
    }
    if(err.message && err.message.includes('Solo se Permiten Imágenes')){
        return res.status(400).json({
            ok:false,
            message: err.message
        })
    }
    if(err.name=== 'MulterError'){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({
                ok:false,
                message: 'El Archivo Excede el Tamaño Permitido de 2MB'
            })
        }
    }
}

module.exports= errorHandler