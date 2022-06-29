
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')


/*-------------------------------GET USUARIOS---------------------------------------*/

const getUsuarios = async (req = request, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email rol google')
    res.json({
        ok: true,
        usuarios
    })
}

/*-------------------------------FIN GET USUARIOS---------------------------------------*/

/*-------------------------------CREAR USUARIOS---------------------------------------*/
const CrearUsuario = async (request, res = response) => {
    // Desestructuracion del body del post request
    const { password, email } = request.body

    try { // TRY
        //valida si un email es existente
        const existEmail = await Usuario.findOne({ email })
        if (existEmail) {
            return statusResponse(400, body400(`EL correo ${email} ya se ecuentra registrado`), res)
        }
        //Mapea el post de la peticion
        const usuario = new Usuario(request.body)
        //encriptar password
        const salt = bcrypt.genSaltSync() // data aleatoria
        usuario.password = bcrypt.hashSync(password, salt)
        //Guardar Usuario
        await usuario.save()
        //Respuesta response al cliente
        const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            usuario,
            token
        })
        //en caso de error
    } catch (error) { // CATCH

        return statusResponse(500, bodyError(error), res)
    }
}

/*-------------------------------FIN CREAR USUARIOS---------------------------------------*/

/*-------------------------------ACTUALIZAR USUARIOS---------------------------------------*/

const actualizarUsuario = async (req = request, res = response) => {

    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return statusResponse(400, body400(`No existe usuario por el id`), res)
        }
        //Actualizaciones
        const { password, google, ...campos } = req.body

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(error), res)
    }
}
/*-------------------------------FIN ACTUALIZAR USUARIOS---------------------------------------*/

const eliminarUsuario = async (req = request, res = response) => {
    const _id = req.params.id
    try {
        const usuarioDB = await Usuario.findById(_id)
        if (!usuarioDB) {
            return statusResponse(400, body400(`No existe usuario por el id`), res)
        }
        await Usuario.findByIdAndDelete(_id)
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(error), res)
    }
}

module.exports = {
    getUsuarios,
    CrearUsuario,
    actualizarUsuario,
    eliminarUsuario
}