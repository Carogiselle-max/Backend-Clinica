const multer = require('multer');
const path = require('path');
const fs = require('fs');

const profileStorage= multer.diskStorage({
    destination: ( fil,reqe, cb) =>{
        const uploadPath = path.join(__dirname, '../../uploads/user/profile');
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, {recursive:true})
        }
        cb(null, uploadPath)
    },
    filename: ( fil,reqe, cb)=>{
        const uniqueSuffix = Date.now() + '-profile-' + crypto.randomUUID() + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})

const DNIStorage = multer.diskStorage({
    destination: (file,req,cb)=>{
        const uploadPath = path.join(__dirname, '../../uploads/doc')
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive:true})
        }
        cb(null, uploadPath)
    },
    filename:(file,req,cb)=>{
        const uniqueSuffix= Date.now() + '-DNI-' + crypto.randomUUID() + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})

const fileFilter = ( fil,reqe, cb) =>{
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes de tipo jpeg, jpg, png o webp'));
    }
}

const uploadDNI = multer({
    storage: DNIStorage,
    limits:{fileSize: 2*1024*1024},
    fileFilter: fileFilter
}).array('documentsImg', 2)

const uploadProfilePic = multer({
    storage: profileStorage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: fileFilter
}).single('profilePic');

module.exports={
    uploadProfilePic
}