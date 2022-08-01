const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req = request, res = response) => {

    const { password, email } = req.body

    try {
        //encriptar password

        const usuario = await Usuario.findOne({ email })
        if (usuario === null) {
            return statusResponse(400, body400(`Contraseña o email no son validos`), res)
        }
        const pass = bcrypt.compareSync(password, usuario.password)
        if (!pass) {
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
        return statusResponse(500, bodyError(process.env.ERROR_ADMIN), res)
    }
}

const googleSingIn = async (req = request, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token)
        const usuario = new Usuario({
            nombre: name,
            email: email,
            password: "",
            img: picture,
            google: true
        })

        const usuarioe = await Usuario.findOne({ email })

        if (usuarioe === null) {
            const salt = bcrypt.genSaltSync() // data aleatoria
            usuario.password = bcrypt.hashSync("@@@", salt)
            await usuario.save()
        }

        else {
            const pass = bcrypt.compareSync("@@@", usuarioe.password)
            usuario.id = usuarioe.id
        }

        // genear el token
        const token = await generarJWT(usuario.id)

        return res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return statusResponse(400, bodyError("Token invalido"), res)
    }


}

const renewToken = async (req = request, res = response) => {
    // genear el token
    const token = await generarJWT(req.uid)
    return res.json({
        ok: true,

    })
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}