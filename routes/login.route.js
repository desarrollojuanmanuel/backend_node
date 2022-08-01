/*
    PATH: /api/login
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { login, googleSingIn, renewToken } = require('../controllers/login.controller')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos
], login)


router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn)

router.get('/renew', validarJWT , renewToken)

module.exports = router