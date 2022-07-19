/*
    PATH: /api/upload
*/

const { Router } = require('express')
const fileUpload = require('express-fileupload');
const { file_Upload, getImagen } = require('../controllers/uploads.controller')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()
router.use(fileUpload());
//PUT
router.put('/:tipo/:id', validarJWT, file_Upload)
//GET
router.get('/:tipo/:foto', getImagen)


module.exports = router