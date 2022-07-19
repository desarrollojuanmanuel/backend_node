const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')



//importal el modelo
const Hospital = require('../models/hospital.model')

/*-------------------------------GET HOSPITALES------------------------------------------*/
const getHospitales = async (req = request, res = response) => {

    res.json({
        ok: true,
        hospitales: await Hospital.find().populate('usuario','nombre')
    })
}
/*-------------------------------FIN GET HOSPITALES---------------------------------------*/

/*-------------------------------POST CREAR HOSPITALES------------------------------------------*/
const crearHospitales = async (req = request, res = response) => {

    const hospital = new Hospital({ ...req.body, usuario: req.uid })
    try {
        await hospital.save()
        res.json({
            ok: true,
            hospital,
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(error), res)
    }

}
/*-------------------------------FIN POST CREAR HOSPITALES--------------------------------------*/

/*-------------------------------PUT ACTUALIZAR HOSPITALES------------------------------------------*/
const actualizarHospitales = async (req = request, res = response) => {

    res.json({
        ok: true,
        hospitales: ""
    })
}
/*-------------------------------FIN PUT ACTUALIZAR HOSPITALES--------------------------------------*/

/*-------------------------------DELETE BORRAR HOSPITALES------------------------------------------*/
const borrarHospitales = async (req = request, res = response) => {

    res.json({
        ok: true,
        hospitales: ""
    })
}
/*-------------------------------FIN DELETE BORRAR HOSPITALES--------------------------------------*/

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}