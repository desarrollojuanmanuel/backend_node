/*
    PATH: /api/todo
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getTodos, getDocumentosColeccion } = require('../controllers/busqueda.controller')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

//GET
router.get('/:texto', validarJWT, getTodos)
//POST
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)
//PUT
router.put('/:id', [])
//DELETE
router.delete('/:id',[])

module.exports = router