const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')

// importar modelos
const Medicos = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

/*-------------------------------GET Medicos------------------------------------------*/
const getMedicos = async (req = request, res = response) => {

    res.json({
        ok: true,
        Medicos:  await Medicos.find().populate('hospital','nombre').populate('usuario','nombre')
    })
}
/*-------------------------------FIN GET Medicos---------------------------------------*/

/*-------------------------------POST CREAR Medicos------------------------------------------*/
const crearMedicos = async (req = request, res = response) => {

    try {
        const medicos = new Medicos({ ...req.body, usuario: req.uid })
        //console.log(Hospital.findOne({_id:req.body.idHospital}))
        await medicos.save()
        res.json({
            ok: true,
            medicos
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError("hable cone l admin"), res)
    }
}
/*-------------------------------FIN POST CREAR Medicos--------------------------------------*/

/*-------------------------------PUT ACTUALIZAR Medicos------------------------------------------*/
const actualizarMedicos = async (req = request, res = response) => {

    res.json({
        ok: true,
        Medicos: "PUT"
    })
}
/*-------------------------------FIN PUT ACTUALIZAR Medicos--------------------------------------*/

/*-------------------------------DELETE BORRAR Medicos------------------------------------------*/
const borrarMedicos = async (req = request, res = response) => {
    console.log("llego")
    res.json({
        ok: true,
        Medicos: "DELETE"
    })
}
/*-------------------------------FIN DELETE BORRAR Medicos--------------------------------------*/

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}