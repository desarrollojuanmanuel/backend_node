/*
    PATH: /api/hospitales
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

//GET
router.get('/', validarJWT, getHospitales)

//POST
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
], crearHospitales)

//PUT
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
], actualizarHospitales)

//DELETE
router.delete('/:id', validarJWT, borrarHospitales)

module.exports = router