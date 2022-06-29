const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')

const login = async (req = request, res = response) => {

    const { password, email } = req.body

    try {
                //encriptar password

        const usuario = await Usuario.findOne({email})
        if(usuario === null){
            return statusResponse(400, body400(`Contraseña o email no son validos`), res)
        }
        const pass = bcrypt.compareSync(password, usuario.password)
        if(!pass){
            return statusResponse(400, body400(`Contraseña o email no son validos`), res)
        }

        // genear el token
        const token = await generarJWT(usuario.id)
        return res.json({
            ok: true,
            msj: token
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(error), res)
    }
}

module.exports = {
    login
}