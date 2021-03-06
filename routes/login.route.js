/*
    PATH: /api/login
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { login } = require('../controllers/login.controller')

const router = Router()

router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos
], login)

module.exports = router