/*
    PATH: /api/Medicos
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

//GET
router.get('/', validarJWT, getMedicos)

//POST
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').isMongoId(),
    validarCampos
], crearMedicos)

//PUT
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    validarCampos
], actualizarMedicos)

//DELETE
router.delete('/:id', [validarJWT], borrarMedicos)

module.exports = router