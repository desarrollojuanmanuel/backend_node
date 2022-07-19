/*
    PATH: /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getUsuarios, CrearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller')

const router = Router()

//GET
router.get('/',  getUsuarios)
//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos,
], CrearUsuario)
//PUT
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos,
], actualizarUsuario)
//DELETE
router.delete('/:id', validarJWT,eliminarUsuario)

module.exports = router