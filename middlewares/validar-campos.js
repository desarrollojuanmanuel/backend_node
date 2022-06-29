const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return statusResponse(400, {
            ok: false,
            errors: errores.mapped()
        }, res)
    }

    next()
}

const statusResponse = (status, body = {}, res) => {
    return res.status(status).json(body)
}

module.exports = {
    validarCampos
}