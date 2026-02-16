const fs = require('fs');
const path = require('path');

const deleteOneFile = (filePath) => {
    try{
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            console.log(`Archivo eliminado: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error en la eliminacion del archivo ${filePath}: ${error.message}`);
    }
}

const cleanUploadsFiles = (req)=>{
    if(req.file){
        deleteOneFile(req.file.path)
    }
    if(req.files && Array.isArray(req.files)){
        req.files.forEach(file => deleteOneFile(file.path))
    }
}

module.exports={
    deleteOneFile,
    cleanUploadsFiles
}